(function () {
    'use strict';

    angular
        .module('app')
        .directive('countdown', countdown);

    /* @ngInject */
    countdown.$inject = ['$interval', '$timeout'];

    function countdown($interval, $timeout) {
        var directive = {
            bindToController: true,
            link: link,
            restrict: 'E',
            require: 'ngModel',
            replace: true,
            templateUrl: 'views/countdown.html'
        };

        return directive;

        function link(scope, el, attrs, ngModel) {

            scope.progress = 0;

            var watchOnce = scope.$watch(function () {
                return ngModel.$modelValue;
            }, init);

            function init(modeValue) {

                var totalSeconds = parseInt(modeValue);

                $interval(function () {
                    scope.progress++;
                }, (totalSeconds * 1000) / 100, 100).then(updateModel);

                function updateModel() {
                    $timeout(function () { // animation grace period
                        ngModel.$setViewValue(0);
                    }, 500);

                }
                watchOnce();
            }
        }


    }

})();