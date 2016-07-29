(function () {
    'use strict';

    angular
        .module('app')
        .factory('userService', userService);

    /* @ngInject */
    userService.$inject = ['$q', '$firebaseArray', '$firebaseAuth'];

    function userService($q, $firebaseArray, $firebaseAuth) {

        var currentUser;

        var service = {
            getUser: getUser,
            createUser: createUser,
            addPoints: addPoints,
            getScore: getScore,
            publishScore: publishScore
        }
        return service;

        ////////////

        function getUser() {
            return currentUser;
        }

        function createUser(name) {

            var auth = $firebaseAuth();
            auth.$signInAnonymously();

            auth.$signInAnonymously().then(function (firebaseUser) {
                $scope.firebaseUser = firebaseUser;
            }).catch(function (error) {
                $scope.error = error;
            });

            currentUser = {
                name: name,
                score: 0,
            };
        }

        function addPoints(points) {
            if (currentUser) {
                currentUser.score += points;
            }
        }

        function getScore() {
            if (currentUser) {
                return currentUser.score;
            }
            return 0;
        }

        function publishScore() {
            if (currentUser) {
                var ref = firebase.database().ref().child("ranking");
                var ranking = $firebaseArray(ref);
                ranking.$add(currentUser);
            }
        }
    };
})();