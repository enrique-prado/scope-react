var HoursDataService = (function () {
        var moment = require('moment');
        var urlBase = '/getdata?template=';
        var custQTemplate = 'userclientlist';
        var schedQTemplate = 'getschedentries';
        var rowsRange = '&startrow=0&rowcount=30';
        var custNameParam = '&cust_name=';
        var queueTypeParam = '&queue_type=';
        
        var defaultCustomers = [
                {value:1, label:"neat"},
                {value:2, label:"SpokenDA"},
                {value:3, label:"Guthy"}
            ];
            
        var weekDays = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ]
            
        function getCustomers () {
            return new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.onload = function() {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        console.log('dataService.getCustomers succeeds');
                        //parse response and make customers array
                        var custlist = xhr.response.replace(/\r\n/g,"\n");
                        var customers = custlist.split("\n");
                        var custResults = []
                        //get rid of the last line in customers if it is empty
                        if (customers[customers.length - 1] == '')
                            customers.length = customers.length - 1;
                        
                        for (var i = 0 ; i < customers.length; i++) {
                            var val = i + 1;
                            var custItem = {value: val, label: customers[i]};
                            custResults.push(custItem);
                            //console.log('value = ' + custItem.value + ' ,label = ' + custItem.label);
                        }
                        
                        console.log('num of customers is ' + custResults.length);
                        
                        resolve(custResults); // Resolve Promise returning customer array
                    }
                    else {
                        console.log('ERROR retrieving dataService.getCustomers()');
                        resolve([]);
                    }
                }
                
                xhr.onerror = reject;
                xhr.open('GET', '/getdata?template=userclientlist&startrow=0&rowcount=30', true);                
                xhr.send();
            });
        };
        

        function getSchedEntries (custName, qType) {
            console.log("getSchedEntries CALLED...");
            console.log("custName = " + custName + ", qType = " + qType);
            
            return new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                
                xhr.onload = function() {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        console.log('dataService.getSchedEntries succeeds');
                        //parse response and make entries array
                        var entryList = xhr.response.replace(/\r\n/g,"\n");
                        var entries = entryList.split("\n");
                        var schedEntries = [];
                        
                        //get rid of the last line in entries if it is empty
                        if (entries[entries.length - 1] == '')
                            entries.length = entries.length - 1;
                        
                        console.log('Number of entries returned: ' + entries.length);
                            
                        for (var i in entries) {
                            var newEntry = JSON.parse(entries[i]);
                            schedEntries.push(newEntry);
                            //console.log('Added SchedNav entry:');
                            //console.log('appId: ' + newEntry.appId + ' , queue: ' + newEntry.queue);
                        }
                        
                        resolve(schedEntries); //Return final array
                    }
                    else {
                        console.log('ERROR retrieving dataService.getSchedEntries()');
                        resolve([]);
                    }            
                }
            
                xhr.onerror = reject;
                //console.log("Fetching Sched NavMenu entries for customer " + custName + " sched type: " + qType);
                xhr.open("GET","/getdata?template=hop_getmenuentries" +
                    "&cust_name=" + custName + "&queue_type=" + qType +
                    "&startrow=0&rowcount=20", true);            
                xhr.send();
            });            
        };
        
       
        function getHoursOrExceptions(custName, qType, queue, isExceptionQuery) {
            //console.log("getHoursOrExceptions called...");
            //console.log("custName = " + custName + ", qType = " + qType + ", queue = " + queue);
            var qTemplate = isExceptionQuery ? 'hop_getexceptionsforcustomer' : 'hop_gethoursforcustomer';

            return new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                
                xhr.onload = function() {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        console.log('dataService.getHoursOrExceptions succeeds');
                        //parse response and make entries array
                        var entryList = xhr.response.replace(/\r\n/g,"\n");
                        var entries = entryList.split("\n");
                        var hoursEntries = [];
                        
                        //get rid of the last line in entries if it is empty
                        if (entries[entries.length - 1] == '')
                            entries.length = entries.length - 1;
                        
                        console.log('Number of entries returned: ' + entries.length);
                        
                        for (var i = 0; i < entries.length; i++) {
                            var newEntry = JSON.parse(entries[i]);
                            // newEntry.day may contain two different types of data depending on what we query for
                            // If querying for exceptions then it contains a date string, if querying for regular hours it contains a DOW index [1-7]
                            newEntry.day = isExceptionQuery ? new moment(parseDate(newEntry.day))  : weekDays[newEntry.day - 1]; 
                            newEntry.off = Boolean(Number(newEntry.off));
                            newEntry.open = new Date('Jan 1, 2016 ' + newEntry.open); //Converting to Date object, Month, day & year are irrelevant
                            newEntry.close = new Date('Jan 1, 2016 ' + newEntry.close); //Converting to Date object, Month, day & year are irrelevant
                            newEntry.deleted = Boolean(Number(newEntry.deleted));
                            newEntry.updated = false; // flag that indicates if record has been changed by user
                            hoursEntries.push(newEntry);
                            //console.log('Added Hours entry:');
                            //console.log('Day: ' + newEntry.day + ' , hours: ' + newEntry.open + ' - ' + newEntry.close);
                        }
                        console.log('NUMBER OF ENTRIES RETURNED: ' + hoursEntries.length)
                        resolve (hoursEntries); // Return final array
                    }
                    else {
                        console.log('ERROR retrieving dataService.getHoursOrExceptions()');
                        resolve([]);                        
                    }
                }
                                                    
                xhr.onerror = reject;
                //console.log("Fetching hours for cust_name " + custName + "queue_type: " + qType + " , queue_name: " + queue);
                xhr.open("GET","/getdata?template=" + qTemplate +
                    "&cust_name=" + custName + "&queue_type=" + qType + "&queue_name=" + queue +
                    "&startrow=0&rowcount=30", true);            
                xhr.send();
            });             
        }
        
        function getHours(custName, qType, queue) {
            console.log("getHours CALLED ...");
            console.log("custName = " + custName + ", qType = " + qType + ", queue = " + queue);

            return getHoursOrExceptions(custName, qType, queue, false);
        }           
        
        
        function getExceptions(custName, qType, queue) {
            console.log("getExceptions CALLED >>>>>>...");
            console.log("custName = " + custName + ", qType = " + qType + ", queue = " + queue);

            return getHoursOrExceptions(custName, qType, queue, true);
        }        
        
        function insertHourOrException(hourObj, isExceptionQuery ) {
            var qTemplate = isExceptionQuery ? 'hop_addexceptionforcustomer' : 'hop_addhoursforcustomer';
            
            return new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                
                xhr.onload = function() {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        console.log('dataService.insertHourOrException succeeds');
                        var result = xhr.response;
                        resolve(result); //Return status
                    }
                    else {
                        console.log('ERROR in dataService.insertHourOrException(), status: ' + xhr.status);
                        resolve(xhr.status);
                    }            
                }
            
                xhr.onerror = reject;
                //console.log("Inserting new hour entry for customer " + hourObj.custName );
                
                //Convert Date to time string
                var openTime = getTimeString(hourObj.open);
                var closeTime = getTimeString(hourObj.close);
                var state = Number(hourObj.off);
                // hourObj.day may contain two different types of data depending on what type of entry we are saving
                // If saving an exception then it contains a date object, if saving regular hours it contains a DOW string name.
                var day = isExceptionQuery ? getDateString(hourObj.day) : getDayIndex(hourObj.day) + 1; // DOW index range [1-7] in DB
               
                xhr.open("GET","/updatedata?template=" + qTemplate +
                    "&day_idx=" + day +
                    "&open=" + openTime +
                    "&close=" + closeTime +
                    "&appid=" + hourObj.appId +
                    "&cust_name=" + hourObj.custName + 
                    "&qtype=" + hourObj.qType +
                    "&qname=" + hourObj.qName +
                    "&state_idx=" + state, true);
                                
                xhr.send();
            });                        
        }
        
        function insertHourForCustomer(entryObj) {
            console.log("insertException called...");
            
            return insertHourOrException(entryObj, false);
        }
        
        function insertExceptionForCustomer(entryObj) {
            console.log("insertException called...");
            
            return insertHourOrException(entryObj, true);
        }
        
        function updateEntry( hourObj, isExceptionQuery ) {
            console.log("updateEntry called...");
            
            return new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                
                xhr.onload = function() {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        console.log('dataService.updateEntry succeeds');
                        var result = xhr.response;
                        resolve(result); //Return status
                    }
                    else {
                        console.log('ERROR in dataService.updateEntry(), status: ' + xhr.status);
                        resolve(xhr.status);
                    }            
                }
            
                xhr.onerror = reject;
                //console.log("Updating new hour entry for customer " + hourObj.custName );
                var state = Number(hourObj.off);
                var deleted = Number(hourObj.deleted);
                // hourObj.day may contain two different types of data depending on what type of entry we are saving
                // If saving an exception then it contains a date object, if saving regular hours it contains a DOW string name.
                var day = isExceptionQuery? getDateString(hourObj.day) : getDayIndex(hourObj.day) + 1; // DOW index start at 1 in DB
                //Convert Date to time string
                var openTime = getTimeString(hourObj.open);
                var closeTime = getTimeString(hourObj.close);
                xhr.open("GET","/updatedata?template=hop_updatehoursforcustomer" +
                    "&rowid=" + hourObj.row_id +
                    "&day_idx=" + day +
                    "&open=" + openTime +
                    "&close=" + closeTime +
                    "&deleted=" + deleted +
                    "&state_idx=" + state, true);
                                
                xhr.send();
            });                        
        }
        
    function updateHoursForCustomer(entry) {
        console.log("updateHoursForCustomer called...");
        return updateEntry(entry, false);
    }
    
    function updateExceptionForCustomer(entry) {
        console.log("updateExceptionForCustomer called...");
        return updateEntry(entry, true);        
    }        
        
    //Helper functions
    function parseDate(selector) {
        console.log('date to be parsed: ' + selector );
        //Check to see if date is in format of '____-mm-dd' and convert it to valid date
        if (selector.indexOf("____-") > -1 ) {
            var yearStr = new Date().getFullYear();
            var dateStr = yearStr + selector.replace("____", '' ) + ' 00:00:00';
            console.log('date to be converted: ' + dateStr );
            
            return new Date(dateStr);
        }
        // date string is already in valid format
        return new Date(selector);
    }
    
    function getTimeString(date) {
        var h = addZero(date.getHours());
        var m = addZero(date.getMinutes());
        var s = addZero(date.getSeconds());
        var timeStr = h + ":" + m + ":" + s;
        return timeStr;
    }
    
    function getDateString(date) {
        /*var year = date.getFullYear();
        var month = addZero(date.getMonth() + 1); //getMonth returns 0-11
        var day = addZero(date.getDate());
        var dateStr = year + '-' + month + '-' + day + ' 00:00:00';*/
        var dateStr = date.format('YYYY-MM-DD') + ' 00:00:00';
        return dateStr;        
    }        
    
    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    function getDayIndex(dowName) {
        for (var i = 0; i < weekDays.length; i++) {
            if (weekDays[i] == dowName) {
                return i;
            }
        }
        return -1; // Day string not found
    }
   
    // Public interface methods
    return {
        getCustomers : getCustomers,
        getSchedEntries : getSchedEntries,
        getHours : getHours,
        getExceptions : getExceptions,
        insertHourForCustomer : insertHourForCustomer,
        insertExceptionForCustomer : insertExceptionForCustomer,
        updateHoursForCustomer : updateHoursForCustomer,
        updateExceptionForCustomer : updateExceptionForCustomer
    }
})();

module.exports = HoursDataService;