(function () {
    'use strict';

    angular
        .module('app')
        .factory('userService', userService);

    /* @ngInject */
    userService.$inject = ['$q', '$firebaseArray'];

    function userService($q, $firebaseArray) {

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