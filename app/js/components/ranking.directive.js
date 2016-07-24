(function () {
    'use strict';

    angular
        .module('app')
        .directive('ranking', ranking);

    /* @ngInject */
    ranking.$inject = ['$firebaseArray'];

    function ranking($firebaseArray) {
        var directive = {
            link: link,
            restrict: 'E',
            replace: true,
            templateUrl: 'views/ranking.html'
        };

        return directive;

        function link(scope) {

            init();

            function init() {
                var ref = firebase.database().ref().child("ranking");
                scope.ranking = $firebaseArray(ref);
            }
        }


    }

})();