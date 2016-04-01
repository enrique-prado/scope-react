var HoursDataService = (function () {

        var urlBase = '/getdata?template=';
        var custQTemplate = 'userclientlist';
        var schedQTemplate = 'getschedentries';
        var rowsRange = '&startrow=0&rowcount=30';
        var custNameParam = '&cust_name=';
        var queueTypeParam = '&queue_type=';
        
        var defaultCustomers = [
                {value:1, label:"Neat"},
                {value:2, label:"SpokenDA"},
                {value:3, label:"Guthy"}
            ];
            
        var defaultSchedEntries = [
            { customer:"Neat", queueType:"global",  queue:"All Neat"},
            { customer:"SpokenDA", queueType:"global",  queue:"All Spoken"},
            { customer:"Guthy", queueType:"global",  queue:"All Guthy"},
            { customer:"Neat", queueType:"DN",  queue:"800-NEAT"},
            { customer:"Neat", queueType:"DN",  queue:"877-NEAT"},
            { customer:"Neat", queueType:"DN",  queue:"888-NEAT"},
            { customer:"SpokenDA", queueType:"DN",  queue:"800-SPKN"},
            { customer:"SpokenDA", queueType:"DN",  queue:"877-SPKN"},
            { customer:"Guthy", queueType:"DN",  queue:"800-GR"},
            { customer:"Guthy", queueType:"DN",  queue:"801-GR"},
            { customer:"Guthy", queueType:"DN",  queue:"802-GR"},
            { customer:"Guthy", queueType:"DN",  queue:"803-GR"},
            { customer:"Neat", queueType:"queue",  queue:"Sales NEAT"},
            { customer:"Neat", queueType:"queue",  queue:"Billing NEAT"},
            { customer:"Neat", queueType:"queue",  queue:"Support NEAT"},
            { customer:"Neat", queueType:"queue",  queue:"Operator NEAT"},
            { customer:"Neat", queueType:"queue",  queue:"Orders NEAT"},
            { customer:"SpokenDA", queueType:"queue",  queue:"Engineering SPKN"},                        
            { customer:"SpokenDA", queueType:"queue",  queue:"PM SPKN"},                        
            { customer:"SpokenDA", queueType:"queue",  queue:"Marketing SPKN"},                        
            { customer:"Guthy", queueType:"queue",  queue:"Returns GR"},                        
            { customer:"Guthy", queueType:"queue",  queue:"Sales GR"},                        
            { customer:"Guthy", queueType:"queue",  queue:"Billing GR"}                        
]
            
            

        function getCustomers () {
            //return $http.get(urlBase + custTemplate + rowsRange);
        };
        
        function getCustomersMock() {
            return defaultCustomers;
        }

        function getSchedEntries (custName, qType) {
            return $http.get(urlBase + schedQTemplate + custNameParam + custName +
                queueTypeParam + qType);
        };
        
        function getSchedEntriesMock (custName, qType) {
            console.log("getSchedEntriesMock called...");
            console.log("custName = " + custName + ", qType = " + qType);
            var schedEntries = [];
            
            for (var i = 0; i < defaultSchedEntries.length; i++) {
                if ((defaultSchedEntries[i].customer == custName) && (defaultSchedEntries[i].queueType == qType)) {
                    schedEntries.push(defaultSchedEntries[i].queue);
                    console.log(defaultSchedEntries[i].queue + " entry added");
                }
            }
            
            return schedEntries;
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
        getCustomers : getCustomersMock,
        getSchedEntries : getSchedEntriesMock
    }
})();

module.exports = HoursDataService;