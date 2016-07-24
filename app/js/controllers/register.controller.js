(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', registerController);

    /* @ngInject */
    registerController.$inject = ['$location', 'userService'];

    function registerController($location, userService) {

        var vm = this;

        vm.register = register;

        init();

        function init() { };

        function register(form) {
            if (form.$valid) {
                userService.createUser(form.name.$modelValue);
                $location.path('/question/1');
            }
        }
    };

})();