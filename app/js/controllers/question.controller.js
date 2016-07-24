(function () {
    'use strict';

    angular
        .module('app')
        .controller('QuestionController', questionController);

    /* @ngInject */
    questionController.$inject = ['$routeParams', '$location', '$firebaseObject', 'questionDataservice', 'userService'];

    function questionController($routeParams, $location, $firebaseObject, questionDataservice, userService) {

        var vm = this;
        var qId = parseInt($routeParams.qId);


        vm.setAnswer = setAnswer;
        vm.time = 15;

        init();

        function init() {

            if (!userService.getUser()) {
                redirect();
            }

            var ref = firebase.database().ref().child("questions").child(qId - 1);
            vm.q = $firebaseObject(ref);

            var unwatch = vm.q.$watch(function () {
                if (vm.q.$value === null) {
                    redirect();
                }
                unwatch();
            });

            

        }

        function setAnswer(answer) {

            if (answer && answer.points) {
                userService.addPoints(answer.points);
            }
            else {
                userService.addPoints(0);
            }
            if (vm.q.isLast) {
                $location.path('/result/');
            }
            else {
                $location.path('/question/' + (qId + 1));
            }
        }

        function redirect() {
            $location.path('/register');
        }


    };

})();