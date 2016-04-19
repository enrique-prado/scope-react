var HoursDataService = (function () {

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
            
        var defaultSchedEntries = [
            { type:"DOW", selector: 1, start:"08:00:00", end: "19:00:00", app_id:"NEAT_ID", customer:"neat", queueType:"global",  queue:"All neat", state: 1},
            { type:"DOW", selector: 2, start:"08:00:00", end: "19:00:00", app_id:"NEAT_ID", customer:"neat", queueType:"global",  queue:"All neat", state: 1},
            { type:"DOW", selector: 3, start:"08:00:00", end: "19:00:00", app_id:"NEAT_ID", customer:"neat", queueType:"global",  queue:"All neat", state: 1},
            { type:"DOW", selector: 4, start:"08:00:00", end: "19:00:00", app_id:"NEAT_ID", customer:"neat", queueType:"global",  queue:"All neat", state: 1},
            { type:"DOW", selector: 5, start:"08:00:00", end: "19:00:00", app_id:"NEAT_ID", customer:"neat", queueType:"global",  queue:"All neat", state: 1},
            { type:"DOW", selector: 6, start:"10:00:00", end: "17:00:00", app_id:"NEAT_ID", customer:"neat", queueType:"global",  queue:"All neat", state: 1},
            { type:"DOW", selector: 7, start:"12:00:00", end: "17:00:00", app_id:"NEAT_ID", customer:"neat", queueType:"global",  queue:"All neat", state: 0},
            { type:"DOW", selector: 1, start:"09:00:00", end: "18:00:00", app_id:"SPKN_ID", customer:"SpokenDA", queueType:"global",  queue:"All Spoken", state: 1},
            { type:"DOW", selector: 2, start:"09:00:00", end: "18:00:00", app_id:"SPKN_ID", customer:"SpokenDA", queueType:"global",  queue:"All Spoken", state: 1},
            { type:"DOW", selector: 3, start:"09:00:00", end: "18:00:00", app_id:"SPKN_ID", customer:"SpokenDA", queueType:"global",  queue:"All Spoken", state: 1},
            { type:"DOW", selector: 4, start:"09:00:00", end: "18:00:00", app_id:"SPKN_ID", customer:"SpokenDA", queueType:"global",  queue:"All Spoken", state: 1},
            { type:"DOW", selector: 5, start:"09:00:00", end: "18:00:00", app_id:"SPKN_ID", customer:"SpokenDA", queueType:"global",  queue:"All Spoken", state: 1},
            { type:"DOW", selector: 6, start:"09:00:00", end: "18:00:00", app_id:"SPKN_ID", customer:"SpokenDA", queueType:"global",  queue:"All Spoken", state: 0},
            { type:"DOW", selector: 7, start:"09:00:00", end: "18:00:00", app_id:"SPKN_ID", customer:"SpokenDA", queueType:"global",  queue:"All Spoken", state: 0},
            { type:"DOW", selector: 1, start:"07:00:00", end: "17:00:00", app_id:"GUTHY_ID", customer:"Guthy", queueType:"global",  queue:"All Guthy", state: 1},
            { type:"DOW", selector: 2, start:"07:00:00", end: "17:00:00", app_id:"GUTHY_ID", customer:"Guthy", queueType:"global",  queue:"All Guthy", state: 1},
            { type:"DOW", selector: 3, start:"07:00:00", end: "17:00:00", app_id:"GUTHY_ID", customer:"Guthy", queueType:"global",  queue:"All Guthy", state: 1},
            { type:"DOW", selector: 4, start:"07:00:00", end: "17:00:00", app_id:"GUTHY_ID", customer:"Guthy", queueType:"global",  queue:"All Guthy", state: 1},
            { type:"DOW", selector: 5, start:"07:00:00", end: "17:00:00", app_id:"GUTHY_ID", customer:"Guthy", queueType:"global",  queue:"All Guthy", state: 1},
            { type:"DOW", selector: 6, start:"09:00:00", end: "17:00:00", app_id:"GUTHY_ID", customer:"Guthy", queueType:"global",  queue:"All Guthy", state: 1},
            { type:"DOW", selector: 7, start:"10:00:00", end: "17:00:00", app_id:"GUTHY_ID", customer:"Guthy", queueType:"global",  queue:"All Guthy", state: 1},
            
            { type:"DOW", selector: 1, start:"10:00:00", end: "17:00:00", app_id:"NEAT_ID", customer:"neat", queueType:"DN",  queue:"800-NEAT", state: 1},
            { type:"DOW", selector: 2, start:"11:00:00", end: "17:00:00", app_id:"NEAT_ID", customer:"neat", queueType:"DN",  queue:"877-NEAT", state: 1},
            { type:"DOW", selector: 3, start:"12:00:00", end: "17:00:00", app_id:"NEAT_ID", customer:"neat", queueType:"DN",  queue:"888-NEAT", state: 1},
            { type:"DOW", selector: 4, start:"13:00:00", end: "17:00:00", app_id:"NEAT_ID", customer:"neat", queueType:"DN",  queue:"888-NEAT", state: 1},
            { type:"DOW", selector: 5, start:"10:00:00", end: "17:00:00", app_id:"SPKN_ID", customer:"SpokenDA", queueType:"DN",  queue:"800-SPKN", state: 1},
            { type:"DOW", selector: 6, start:"11:00:00", end: "17:00:00", app_id:"SPKN_ID", customer:"SpokenDA", queueType:"DN",  queue:"877-SPKN", state: 1},
            { type:"DOW", selector: 7, start:"12:00:00", end: "17:00:00", app_id:"SPKN_ID", customer:"SpokenDA", queueType:"DN",  queue:"877-SPKN", state: 1},
            { type:"DOW", selector: 6, start:"09:00:00", end: "18:00:00", app_id:"GUTHY_ID", customer:"Guthy", queueType:"DN",  queue:"800-GR", state: 1},
            
            { type:"DOW", selector: 1, start:"10:00:00", end: "16:00:00", app_id:"NEAT_ID", customer:"neat", queueType:"queue",  queue:"Sales NEAT", state: 1},
            { type:"DOW", selector: 2, start:"11:00:00", end: "16:00:00", app_id:"NEAT_ID", customer:"neat", queueType:"queue",  queue:"Billing NEAT", state: 1},
            { type:"DOW", selector: 3, start:"12:00:00", end: "16:00:00", app_id:"NEAT_ID", customer:"neat", queueType:"queue",  queue:"Support NEAT", state: 1},
            { type:"DOW", selector: 4, start:"13:00:00", end: "16:00:00", app_id:"NEAT_ID", customer:"neat", queueType:"queue",  queue:"Operator NEAT", state: 1},
            { type:"DOW", selector: 5, start:"10:00:00", end: "15:00:00", app_id:"SPKN_ID", customer:"SpokenDA", queueType:"queue",  queue:"Engineering SPKN", state: 1},
            { type:"DOW", selector: 6, start:"11:00:00", end: "15:00:00", app_id:"SPKN_ID", customer:"SpokenDA", queueType:"queue",  queue:"PM SPKN", state: 1},
            { type:"DOW", selector: 7, start:"12:00:00", end: "14:00:00", app_id:"GUTHY_ID", customer:"Guthy", queueType:"queue",  queue:"Returns GR", state: 1},
            { type:"DOW", selector: 6, start:"09:00:00", end: "14:00:00", app_id:"GUTHY_ID", customer:"Guthy", queueType:"queue",  queue:"Sales GR", state: 1}
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
                            console.log('value = ' + custItem.value + ' ,label = ' + custItem.label);
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
        
        function getCustomersMock() {
            return new Promise(function(resolve, reject) {
                resolve(defaultCustomers);
            });
        }

        function getSchedEntries (custName, qType) {
            console.log("getSchedEntries called...");
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
                            console.log('Added SchedNav entry:');
                            console.log('appId: ' + newEntry.appId + ' , queue: ' + newEntry.queue);
                        }
                        
                        resolve(schedEntries); //Return final array
                    }
                    else {
                        console.log('ERROR retrieving dataService.getSchedEntries()');
                        resolve([]);
                    }            
                }
            
                xhr.onerror = reject;
                console.log("Fetching Sched NavMenu entries for customer " + custName + " sched type: " + qType);
                xhr.open("GET","/getdata?template=getschedentries" +
                    "&cust_name=" + custName + "&queue_type=" + qType +
                    "&startrow=0&rowcount=20", true);            
                xhr.send();
            });            
        };
        
        function getSchedEntriesMock (custName, qType) {
            console.log("getSchedEntriesMock called...");
            console.log("custName = " + custName + ", qType = " + qType);
            
            return new Promise(function(resolve, reject) {
            var schedEntries = [];
            var entriesDict = {};
            var key = {};
            var value = null;
            
            for (var i = 0; i < defaultSchedEntries.length; i++) {
                if ((defaultSchedEntries[i].customer == custName) && (defaultSchedEntries[i].queueType == qType)) {
                    key = defaultSchedEntries[i].queue; //use name of queue as dictionary key
                    if (!entriesDict.hasOwnProperty(key)) {
                        entriesDict[key] = defaultSchedEntries[i].app_id; //Only store one queue instance, no duplicates
                    }
                    
                    console.log(key + " entry added");
                }
            }
            
            //Conver dictionary to flat array
            for (key in entriesDict) {
                if (entriesDict.hasOwnProperty(key)) {
                    schedEntries.push({appId: entriesDict[key], queue: key});
                }
            }
            resolve(schedEntries);
            });
        };
        
        function getHours (custName, qType, queue) {
            console.log("getHours called...");
            console.log("custName = " + custName + ", qType = " + qType + ", queue = " + queue);

            return new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                
                xhr.onload = function() {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        console.log('dataService.getHours succeeds');
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
                            newEntry.day = weekDays[newEntry.day - 1]; //Replace day int selector value with actual string: 1 -> Monday, 1 -> Tuesday, etc.
                            newEntry.off = Boolean(Number(newEntry.off));
                            newEntry.open = new Date('Jan 1, 2016 ' + newEntry.open); //Converting to Date object, Month, day & year are irrelevant
                            newEntry.close = new Date('Jan 1, 2016 ' + newEntry.close); //Converting to Date object, Month, day & year are irrelevant
                            newEntry.deleted = Boolean(Number(newEntry.deleted));
                            newEntry.updated = false; // flag that indicates if record has been changed by user
                            hoursEntries.push(newEntry);
                            console.log('Added Hours entry:');
                            console.log('Day: ' + newEntry.day + ' , hours: ' + newEntry.open + ' - ' + newEntry.close);
                        }
                        resolve (hoursEntries); // Return final array
                    }
                    else {
                        console.log('ERROR retrieving dataService.getHours()');
                        resolve([]);                        
                    }
                }
                                                    
                xhr.onerror = reject;
                console.log("Fetching schedule list for cust_name " + custName + "queue_type: " + qType + " , queue_name: " + queue);
                xhr.open("GET","/getdata?template=gethoursforcustomer" +
                    "&cust_name=" + custName + "&queue_type=" + qType + "&queue_name=" + queue +
                    "&startrow=0&rowcount=30", true);            
                xhr.send();
            });             
        }
        
        function getHoursMock (custName, qType, queue) {
            console.log("getHoursMock called...");
            console.log("custName = " + custName + ", qType = " + qType + ", queue = " + queue);
            var hours = [];
            
            return new Promise(function(resolve, reject) {            
                for (var i = 0; i < defaultSchedEntries.length; i++) {
                    var entry = defaultSchedEntries[i];
                    if ((entry.customer == custName)  
                        && (entry.queueType == qType)
                        && (entry.queue == queue)) {
                            hours.push({
                                row_id: i,
                                off: false,
                                day: weekDays[entry.selector - 1],
                                open: new Date('Jan 1, 2016 ' + entry.start),
                                close: new Date('Jan 1, 2016 ' + entry.end),
                                deleted: false,
                                updated: false
                            });
                            console.log('Added Hours entry: ' + i);
                            console.log('Day: ' + entry.selector + ' , hours: ' + entry.start + ' - ' + entry.end);
                    }
                }
                
                resolve(hours);
            });                        
        }
        
        function insertHoursForCustomer(hourObj ) {
            console.log("insertHoursForCustomer called...");
            
            return new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                
                xhr.onload = function() {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        console.log('dataService.insertHoursForCustomer succeeds');
                        var result = xhr.response;
                        resolve(result); //Return status
                    }
                    else {
                        console.log('ERROR in dataService.insertHoursForCustomer(), status: ' + xhr.status);
                        resolve(xhr.status);
                    }            
                }
            
                xhr.onerror = reject;
                console.log("Inserting new hour entry for customer " + hourObj.custName );
                
                //Convert Date to time string
                var openTime = getTimeString(hourObj.open);
                var closeTime = getTimeString(hourObj.close);
                //var openTime = hourObj.open;
                //var closeTime = hourObj.close;
                var state = Number(hourObj.off);
                //var state = hourObj.state;
                var day = getDayIndex(hourObj.day) + 1; // DOW index start at 1 in DB
                //var day = hourObj.day; // DOW index start at 1 in DB

                console.log("Sending addHoursForCustomer: " + hourObj);
                
                xhr.open("GET","/getdata?template=addhoursforcustomer" +
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
        
        function updateHoursForCustomer(hourObj ) {
            console.log("updateHoursForCustomer called...");
            
            return new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                
                xhr.onload = function() {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        console.log('dataService.updateHoursForCustomer succeeds');
                        var result = xhr.response;
                        resolve(result); //Return status
                    }
                    else {
                        console.log('ERROR in dataService.updateHoursForCustomer(), status: ' + xhr.status);
                        resolve(xhr.status);
                    }            
                }
            
                xhr.onerror = reject;
                console.log("Updating new hour entry for customer " + hourObj.custName );
                var state = Number(hourObj.off);
                var deleted = Number(hourObj.deleted);
                var day = getDayIndex(hourObj.day) + 1; // DOW index start at 1 in DB
                //Convert Date to time string
                var openTime = getTimeString(hourObj.open);
                var closeTime = getTimeString(hourObj.close);
                xhr.open("GET","/getdata?template=updatehoursforcustomer" +
                    "&rowid=" + hourObj.row_id +
                    "&day_idx=" + day +
                    "&open=" + openTime +
                    "&close=" + closeTime +
                    "&deleted=" + deleted +
                    "&state_idx=" + state, true);
                                
                xhr.send();
            });                        
        }        
        
//Helper functions
    function getTimeString(date) {
        var h = addZero(date.getHours());
        var m = addZero(date.getMinutes());
        var s = addZero(date.getSeconds());
        var timeStr = h + ":" + m + ":" + s;
        return timeStr;
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
        insertHoursForCustomer : insertHoursForCustomer,
        updateHoursForCustomer : updateHoursForCustomer
    }
})();

module.exports = HoursDataService;