(function () {
    'use strict';

    // depricated

    angular
        .module('app')
        .factory('questionDataservice', questionDataservice);

    /* @ngInject */
    questionDataservice.$inject = ['$firebaseArray', '$http', '$q'];

    function questionDataservice($firebaseArray, $http, $q) {

        var service = {
            getAll: getAll,
            get: get
        }
        return service;

        ////////////


        function getAll() {


            return $http.get(
                'https://quiz-8985e.firebaseio.com/questions.json',
                { cache: true }
            ).then(success, error);

            function success(response) {
                return response.data.sort(compareSortOrder);
            }

        }

        function get(nr) {
            var index = nr - 1;

            return getAll().then(success);

            function success(list) {
                if (index >= 0 && index < list.length) {
                    var question = list[index];
                    question.isLast = list.length <= nr;

                    return question;
                }
                return $q.reject();
            }

        }

        ////////////

        function error(error) {
            console.log(error.status + ": " + error.statusText)
            return $q.reject(error);
        }

        function sortOrder() { }

        function compareSortOrder(a, b) {
            if (a.sortOrder < b.sortOrder)
                return -1;
            if (a.sortOrder > b.sortOrder)
                return 1;
            return 0;
        }

    };
})();