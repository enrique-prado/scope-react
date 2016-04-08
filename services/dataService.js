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
            
        var defaultSchedEntries = [
            { type:"DOW", selector: 1, start:"08:00:00", end: "19:00,00", app_id:"NEAT_ID", customer:"neat", queueType:"global",  queue:"All neat", state: 1},
            { type:"DOW", selector: 2, start:"08:00:00", end: "19:00,00", app_id:"NEAT_ID", customer:"neat", queueType:"global",  queue:"All neat", state: 1},
            { type:"DOW", selector: 3, start:"08:00:00", end: "19:00,00", app_id:"NEAT_ID", customer:"neat", queueType:"global",  queue:"All neat", state: 1},
            { type:"DOW", selector: 4, start:"08:00:00", end: "19:00,00", app_id:"NEAT_ID", customer:"neat", queueType:"global",  queue:"All neat", state: 1},
            { type:"DOW", selector: 5, start:"08:00:00", end: "19:00,00", app_id:"NEAT_ID", customer:"neat", queueType:"global",  queue:"All neat", state: 1},
            { type:"DOW", selector: 6, start:"10:00:00", end: "17:00,00", app_id:"NEAT_ID", customer:"neat", queueType:"global",  queue:"All neat", state: 1},
            { type:"DOW", selector: 7, start:"12:00:00", end: "17:00,00", app_id:"NEAT_ID", customer:"neat", queueType:"global",  queue:"All neat", state: 0},
            { type:"DOW", selector: 1, start:"09:00:00", end: "18:00,00", app_id:"SPKN_ID", customer:"SpokenDA", queueType:"global",  queue:"All Spoken", state: 1},
            { type:"DOW", selector: 2, start:"09:00:00", end: "18:00,00", app_id:"SPKN_ID", customer:"SpokenDA", queueType:"global",  queue:"All Spoken", state: 1},
            { type:"DOW", selector: 3, start:"09:00:00", end: "18:00,00", app_id:"SPKN_ID", customer:"SpokenDA", queueType:"global",  queue:"All Spoken", state: 1},
            { type:"DOW", selector: 4, start:"09:00:00", end: "18:00,00", app_id:"SPKN_ID", customer:"SpokenDA", queueType:"global",  queue:"All Spoken", state: 1},
            { type:"DOW", selector: 5, start:"09:00:00", end: "18:00,00", app_id:"SPKN_ID", customer:"SpokenDA", queueType:"global",  queue:"All Spoken", state: 1},
            { type:"DOW", selector: 6, start:"09:00:00", end: "18:00,00", app_id:"SPKN_ID", customer:"SpokenDA", queueType:"global",  queue:"All Spoken", state: 0},
            { type:"DOW", selector: 7, start:"09:00:00", end: "18:00,00", app_id:"SPKN_ID", customer:"SpokenDA", queueType:"global",  queue:"All Spoken", state: 0},
            { type:"DOW", selector: 1, start:"07:00:00", end: "17:00,00", app_id:"GUTHY_ID", customer:"Guthy", queueType:"global",  queue:"All Guthy", state: 1},
            { type:"DOW", selector: 2, start:"07:00:00", end: "17:00,00", app_id:"GUTHY_ID", customer:"Guthy", queueType:"global",  queue:"All Guthy", state: 1},
            { type:"DOW", selector: 3, start:"07:00:00", end: "17:00,00", app_id:"GUTHY_ID", customer:"Guthy", queueType:"global",  queue:"All Guthy", state: 1},
            { type:"DOW", selector: 4, start:"07:00:00", end: "17:00,00", app_id:"GUTHY_ID", customer:"Guthy", queueType:"global",  queue:"All Guthy", state: 1},
            { type:"DOW", selector: 5, start:"07:00:00", end: "17:00,00", app_id:"GUTHY_ID", customer:"Guthy", queueType:"global",  queue:"All Guthy", state: 1},
            { type:"DOW", selector: 6, start:"09:00:00", end: "17:00,00", app_id:"GUTHY_ID", customer:"Guthy", queueType:"global",  queue:"All Guthy", state: 1},
            { type:"DOW", selector: 7, start:"10:00:00", end: "17:00,00", app_id:"GUTHY_ID", customer:"Guthy", queueType:"global",  queue:"All Guthy", state: 1},
            
            { type:"DOW", selector: 1, start:"10:00:00", end: "17:00,00", app_id:"NEAT_ID", customer:"neat", queueType:"DN",  queue:"800-NEAT", state: 1},
            { type:"DOW", selector: 2, start:"11:00:00", end: "17:00,00", app_id:"NEAT_ID", customer:"neat", queueType:"DN",  queue:"877-NEAT", state: 1},
            { type:"DOW", selector: 3, start:"12:00:00", end: "17:00,00", app_id:"NEAT_ID", customer:"neat", queueType:"DN",  queue:"888-NEAT", state: 1},
            { type:"DOW", selector: 4, start:"13:00:00", end: "17:00,00", app_id:"NEAT_ID", customer:"neat", queueType:"DN",  queue:"888-NEAT", state: 1},
            { type:"DOW", selector: 5, start:"10:00:00", end: "17:00,00", app_id:"SPKN_ID", customer:"SpokenDA", queueType:"DN",  queue:"800-SPKN", state: 1},
            { type:"DOW", selector: 6, start:"11:00:00", end: "17:00,00", app_id:"SPKN_ID", customer:"SpokenDA", queueType:"DN",  queue:"877-SPKN", state: 1},
            { type:"DOW", selector: 7, start:"12:00:00", end: "17:00,00", app_id:"SPKN_ID", customer:"SpokenDA", queueType:"DN",  queue:"877-SPKN", state: 1},
            { type:"DOW", selector: 6, start:"09:00:00", end: "18:00,00", app_id:"GUTHY_ID", customer:"Guthy", queueType:"DN",  queue:"800-GR", state: 1},
            
            { type:"DOW", selector: 1, start:"10:00:00", end: "16:00,00", app_id:"NEAT_ID", customer:"neat", queueType:"queue",  queue:"Sales NEAT", state: 1},
            { type:"DOW", selector: 2, start:"11:00:00", end: "16:00,00", app_id:"NEAT_ID", customer:"neat", queueType:"queue",  queue:"Billing NEAT", state: 1},
            { type:"DOW", selector: 3, start:"12:00:00", end: "16:00,00", app_id:"NEAT_ID", customer:"neat", queueType:"queue",  queue:"Support NEAT", state: 1},
            { type:"DOW", selector: 4, start:"13:00:00", end: "16:00,00", app_id:"NEAT_ID", customer:"neat", queueType:"queue",  queue:"Operator NEAT", state: 1},
            { type:"DOW", selector: 5, start:"10:00:00", end: "15:00,00", app_id:"SPKN_ID", customer:"SpokenDA", queueType:"queue",  queue:"Engineering SPKN", state: 1},
            { type:"DOW", selector: 6, start:"11:00:00", end: "15:00,00", app_id:"SPKN_ID", customer:"SpokenDA", queueType:"queue",  queue:"PM SPKN", state: 1},
            { type:"DOW", selector: 7, start:"12:00:00", end: "14:00,00", app_id:"GUTHY_ID", customer:"Guthy", queueType:"queue",  queue:"Returns GR", state: 1},
            { type:"DOW", selector: 6, start:"09:00:00", end: "14:00,00", app_id:"GUTHY_ID", customer:"Guthy", queueType:"queue",  queue:"Sales GR", state: 1}
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
            return defaultCustomers;
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
                        
                        console.log('Number of entries returned: ' + entries.length);
                        //get rid of the last line in entries if it is empty
                        if (entries[entries.length - 1] == '')
                            entries.length = entries.length - 1;
                            
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
                console.log("Fetching schedule list for customer " + custName + " sched type: " + qType);
                xhr.open("GET","/getdata?template=getschedentries" +
                    "&cust_name=" + custName + "&queue_type=" + qType +
                    "&startrow=0&rowcount=20", true);            
                xhr.send();
            });            
        };
        
        function getSchedEntriesMock (custName, qType) {
            console.log("getSchedEntriesMock called...");
            console.log("custName = " + custName + ", qType = " + qType);
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
            
            return schedEntries;
        };
        
        function getHoursMock (custName, qType, queue) {
            console.log("getHoursMock called...");
            console.log("custName = " + custName + ", qType = " + qType + ", queue = " + queue);
            var hours = [];
            
            for (var i = 0; i < defaultSchedEntries.length; i++) {
                var entry = defaultSchedEntries[i];
                if ((entry.customer == custName)  
                    && (entry.queueType == qType)
                    && (entry.queue == queue)) {
                        hours.push({
                            off: false,
                            day: entry.selector,
                            open: entry.start,
                            close: entry.end
                        });
                        console.log(entry.selector + " selector added");
                }
            }
            
            return hours;                        
        };

    /*      
         this.insertSchedEntry = function (entry) {s
            return $http.post(urlBase, cust);
        };

        this.updateSchedEntry = function (entry_id, entry) {
            return $http.put(urlBase + '/' + cust.ID, cust)
        };

        this.deleteSchedEntry = function (entry_id) {
            return $http.delete(urlBase + '/' + entry_id);
        };
    */
     
    // Public interface methods
    return {
        getCustomers : getCustomers,
        getSchedEntries : getSchedEntries,
        getHours : getHoursMock
    }
})();

module.exports = HoursDataService;