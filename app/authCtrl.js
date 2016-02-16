app.controller('authCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data) {
    //initially set those objects to null to avoid undefined error
    //console.log($rootScope);
    $scope.login = {};
    $scope.signup = {};
  
    $scope.doLogin = function (customer) {
        Data.post('login', {
            customer: customer
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $location.path('dashboard');
            }
        });
    };
    $scope.signup = {email:'',password:'',name:'',phone:'',address:''};
    $scope.signUp = function (customer) {
        Data.post('signUp', {
            customer: customer
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $location.path('dashboard');
            }
        });
    };
    $scope.logout = function () {
         
        Data.get('logout').then(function (results) {
            Data.toast(results);
            $rootScope.authenticated=false;
            $rootScope.uid=false;
            $rootScope.name=null;
            $rootScope.email=null;
            $location.path('login');
        });
    }
});