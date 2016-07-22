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
                controller: 'QuizController'
            }).
            when('/question/:qId', {
                templateUrl: 'views/question.html',
                controller: 'QuestionController'
            }).
            when('/result/', {
                templateUrl: 'views/result.html',
                controller: 'ResultController'
            }).
            when('/ranking/', {
                templateUrl: 'views/ranking.html',
                controller: 'RankingController'
            }).
            otherwise('/quiz');
    }

})();

