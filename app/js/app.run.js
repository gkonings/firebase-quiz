(function () {
    'use strict';

    angular
        .module('app')
        .run(startup);

    /* @ngInject */
    startup.$inject = ['$firebaseAuth'];

    function startup($firebaseAuth) {

        var authObj = $firebaseAuth();
        authObj.$signInAnonymously().then(function (firebaseUser) {
        
        }).catch(function (error) {
            console.error("Authentication failed:", error);
        });


    }

})();

