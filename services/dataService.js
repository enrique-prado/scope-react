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
        getSchedEntries : getSchedEntries
    }
})();

module.exports = HoursDataService;