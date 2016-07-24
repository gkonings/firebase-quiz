(function () {
    'use strict';

    angular
        .module('app')
        .factory('userService', userService);

    /* @ngInject */
    userService.$inject = ['$q', '$firebaseAuth', '$firebaseArray'];

    function userService($q, $firebaseAuth, $firebaseArray) {

        var authObj;
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

            authObj = $firebaseAuth();
            return authObj.$signInAnonymously().then(function (firebaseUser) {
                currentUser = {
                    name: name,
                    score: 0,
                    uid: firebaseUser.uid
                };
            }).catch(function (error) {
                console.error("Authentication failed:", error);
                return $q.reject();
            });


        }

        function addPoints(points) {
            currentUser.score += points;
        }

        function getScore() {
            return currentUser.score;
        }

        function publishScore() {
            var ref = firebase.database().ref().child("ranking");
            var ranking = $firebaseArray(ref);
            ranking.$add(currentUser).then(function () {
                
                
            });
        }



    };
})();