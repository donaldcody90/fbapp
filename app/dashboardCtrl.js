app.controller('dashboardCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data) {
    //initially set those objects to null to avoid undefined error
    //console.log($rootScope);
    
    Data.get('summary').then(function (results) {
            //Data.toast(results);
            console.log(results);
             $scope.summary=results;
            
    });
    Data.get('recent').then(function (results) {
            //Data.toast(results);
            console.log(results);
             $scope.posts=results;
            
    });

});