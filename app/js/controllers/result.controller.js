(function () {
    'use strict';

    angular
        .module('app')
        .controller('ResultController', resultController);

    /* @ngInject */
    resultController.$inject = ['$location', '$firebaseObject', 'userService'];
    function resultController($location, $firebaseObject, userService) {

        var vm = this;

        init();

        function init() {

            if (!userService.getUser()) {
                redirect();
            }

            vm.score = userService.getScore();

            userService.publishScore();

        }

        function redirect() {
            $location.path('/register');
        }


    };

})();