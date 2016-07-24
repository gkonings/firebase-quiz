(function () {
    'use strict';

    angular
        .module('app')
        .config(routes);

    /* @ngInject */
    routes.$inject = ['$routeProvider'];

    function routes($routeProvider) {

        $routeProvider.
            when('/quiz', {
                templateUrl: 'views/quiz.html',
                controller: 'QuizController',
                controllerAs: 'vm'
            }).
            when('/register/', {
                templateUrl: 'views/register.html',
                controller: 'RegisterController',
                controllerAs: 'vm'
            }).
            when('/question/:qId', {
                templateUrl: 'views/question.html',
                controller: 'QuestionController',
                controllerAs: 'vm'
            }).
            when('/result/', {
                templateUrl: 'views/result.html',
                controller: 'ResultController',
                controllerAs: 'vm'
            }).
            otherwise('/quiz');
    }

})();

