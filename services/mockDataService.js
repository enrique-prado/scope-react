var MockHoursDataService = (function () {
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
            
        var defaultSchedEntries = [
            { type:"DATE", selector: "____-12-25", start:"08:00:00", end: "19:00:00", app_id:"NEAT_ID", customer:"neat", queueType:"DN",  queue:"DN Exceptions", state: 1},
            { type:"DATE", selector: "2015-11-26 00:00:00", start:"08:00:00", end: "19:00:00", app_id:"NEAT_ID", customer:"neat", queueType:"global",  queue:"All neat", state: 1},
            { type:"DATE", selector: "____-07-04", start:"08:00:00", end: "19:00:00", app_id:"NEAT_ID", customer:"neat", queueType:"global",  queue:"All neat", state: 1},
            { type:"DATE", selector: "____-09-02", start:"08:00:00", end: "19:00:00", app_id:"NEAT_ID", customer:"neat", queueType:"global",  queue:"All neat", state: 1},
            { type:"DATE", selector: "____-05-25", start:"08:00:00", end: "19:00:00", app_id:"NEAT_ID", customer:"neat", queueType:"global",  queue:"All neat", state: 1},
            { type:"DATE", selector: "____-01-01", start:"10:00:00", end: "17:00:00", app_id:"NEAT_ID", customer:"neat", queueType:"global",  queue:"All neat", state: 1},
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
            { type:"DOW", selector: 7, start:"10:00:00", end: "17:00:00", app_id:"NEAT_ID", customer:"neat", queueType:"DN",  queue:"800-NEAT", state: 0},
            { type:"DOW", selector: 2, start:"11:00:00", end: "17:00:00", app_id:"NEAT_ID", customer:"neat", queueType:"DN",  queue:"877-NEAT", state: 1},
            { type:"DOW", selector: 3, start:"12:00:00", end: "17:00:00", app_id:"NEAT_ID", customer:"neat", queueType:"DN",  queue:"888-NEAT", state: 1},
            { type:"DOW", selector: 4, start:"13:00:00", end: "17:00:00", app_id:"NEAT_ID", customer:"neat", queueType:"DN",  queue:"888-NEAT", state: 1},
            { type:"DOW", selector: 1, start:"10:00:00", end: "17:00:00", app_id:"NEAT_ID", customer:"neat", queueType:"DN",  queue:"889-NEAT", state: 1},
            { type:"DOW", selector: 2, start:"11:00:00", end: "17:00:00", app_id:"NEAT_ID", customer:"neat", queueType:"DN",  queue:"890-NEAT", state: 1},
            { type:"DOW", selector: 3, start:"12:00:00", end: "17:00:00", app_id:"NEAT_ID", customer:"neat", queueType:"DN",  queue:"891-NEAT", state: 1},
            { type:"DOW", selector: 4, start:"13:00:00", end: "17:00:00", app_id:"NEAT_ID", customer:"neat", queueType:"DN",  queue:"892-NEAT", state: 1},            
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
            
            
        function getCustomersMock() {
            return new Promise(function(resolve, reject) {
                resolve(defaultCustomers);
            });
        }

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
        
        function getHoursMock (custName, qType, queue) {
            console.log("getHoursMock called...");
            console.log("custName = " + custName + ", qType = " + qType + ", queue = " + queue);
            var hours = [];
            
            return new Promise(function(resolve, reject) {            
                for (var i = 0; i < defaultSchedEntries.length; i++) {
                    var entry = defaultSchedEntries[i];
                    if ((entry.customer == custName)  
                        && (entry.queueType == qType)
                        && (entry.queue == queue)
                        && (entry.type == 'DOW')) {
                            hours.push({
                                row_id: i,
                                off: Boolean(entry.state),
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
        
        function getExceptionsMock (custName, qType, queue) {
            console.log("getExceptionsMock called...");
            console.log("custName = " + custName + ", qType = " + qType + ", queue = " + queue);
            var hours = [];
            
            return new Promise(function(resolve, reject) {            
                for (var i = 0; i < defaultSchedEntries.length; i++) {
                    var entry = defaultSchedEntries[i];
                    if ((entry.customer == custName)  
                        && (entry.queueType == qType)
                        && (entry.queue == queue)
                        && (entry.type == 'DATE')) {
                            hours.push({
                                row_id: i,
                                off: Boolean(entry.state),
                                day: new moment(parseDate(entry.selector)),
                                open: new Date('Jan 1, 2016 ' + entry.start),
                                close: new Date('Jan 1, 2016 ' + entry.end),
                                deleted: false,
                                updated: false
                            });
                            console.log('Added Exception entry: ' + i);
                            console.log('Day: ' + parseDate(entry.selector) + ' , hours: ' + entry.start + ' - ' + entry.end);
                    }
                }
                
                resolve(hours);
            });                        
        }        
        
        function promiseThatSuceeds() {
            return new Promise(function(resolve, reject) {
                resolve(true);
            });
        }
        
        function insertHourForCustomerMock(entryObj) {
            console.log("insertExceptionMock called...");
            
            return promiseThatSuceeds();
        }
        
        function insertExceptionForCustomerMock(entryObj) {
            console.log("insertExceptionForCustomerMock called...");
            
            return promiseThatSuceeds();
        }
        
        function updateEntryMock( hourObj, isExceptionQuery ) {
            console.log("updateEntryMock called...");
            
            return promiseThatSuceeds();
        }
        
    function updateHoursForCustomerMock(entry) {
        console.log("updateHoursForCustomerMock called...");
        return promiseThatSuceeds();
    }
    
    function updateExceptionForCustomerMock(entry) {
        console.log("updateExceptionForCustomerMock called...");
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
    
    // Public interface methods
    return {
        getCustomers : getCustomersMock,
        getSchedEntries : getSchedEntriesMock,
        getHours : getHoursMock,
        getExceptions : getExceptionsMock,
        insertHourForCustomer : insertHourForCustomerMock,
        insertExceptionForCustomer : insertExceptionForCustomerMock,
        updateHoursForCustomer : updateHoursForCustomerMock,
        updateExceptionForCustomer : updateExceptionForCustomerMock
    }
})();

module.exports = MockHoursDataService;