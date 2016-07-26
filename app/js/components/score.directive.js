(function () {
    'use strict';

    angular
        .module('app')
        .directive('score', score);

    /* @ngInject */
    //score.$inject = [];

    function score() {
        var directive = {
            link: link,
            restrict: 'E',
            replace: true,
            templateUrl: 'views/score.html',
            scope: {
                value: "="
            }
        };

        return directive;

        function link(scope) {

            if(scope.value > 5){
                scope.value = 0;
            }
            scope.stars = new Array(scope.value);
        }


    }

})();