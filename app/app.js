var app = angular.module('fbApp', ['ngRoute', 'ngAnimate', 'toaster','ngFileUpload']);

app.config(['$routeProvider',
  function ($routeProvider) {

        $routeProvider.
            when('/admin/login', {
                title: 'Login',
                templateUrl: 'partials/login.html',
                controller: 'authCtrl'
            })
            .when('/logout', {
                title: 'Logout',
                templateUrl: 'partials/login.html',
                controller: 'logoutCtrl'
            })
            .when('/signup', {
                title: 'Signup',
                templateUrl: 'partials/signup.html',
                controller: 'authCtrl'
            })
            .when('/forgot', {
                title: 'Forgot',
                templateUrl: 'partials/forgot.html',
                controller: 'authCtrl'
            })
            .when('/admin/dashboard', {
                title: 'Dashboard',
                templateUrl: 'partials/dashboard.html',
                controller: 'dashboardCtrl',
                role: '1'
            })
            .when('/admin/fblist', {
                title: 'Feedback',
                templateUrl: 'partials/fblist.html',
                controller: 'fblistCtrl'
            })
             .when('/admin', {
                title: 'Login',
                templateUrl: 'partials/login.html',
                controller: 'authCtrl',
                role: '0'
            })
           
            .when('/department', {
                title: 'Department',
                templateUrl: 'partials/department.html',
                controller: 'frontendCtrl',
                role: '0'
            })
            .when('/agency', {
                title: 'agency',
                templateUrl: 'partials/agency.html',
                controller: 'frontendCtrl',
                role: '0'
            })
            .when('/anonymous', {
                title: 'Anonymous',
                templateUrl: 'partials/anonymous.html',
                controller: 'frontendCtrl',
                role: '0'
            })
             .when('/allfeedbacks', {
                title: 'All Feedbacks ',
                templateUrl: 'partials/allfeedbacks.html',
                controller: 'allfbCtrl',
                role: '0'
            })
             .when('/', {
                title: 'Home',
                templateUrl: 'partials/anonymous.html',
                controller: 'frontendCtrl',
                role: '0'
            })
            .otherwise({
                redirectTo: '/'
            });
  }])
    .run(function ($rootScope, $location, Data) {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
             
            $rootScope.authenticated = false;


            Data.get('session').then(function (results) {
                if (results.uid) {
                    $rootScope.authenticated = true;
                    $rootScope.uid = results.uid;
                    $rootScope.name = results.name;
                    $rootScope.email = results.email;
                } else {
                    var nextUrl = next.$$route.originalPath;
                    console.log(nextUrl);
                    if (nextUrl == '/signup' || nextUrl == '/login' || nextUrl == '/forgot' || nextUrl == '/feedback') {

                    } else {
                       //$location.path("/login");
                    }
                }
            });

        });


    });


angular.module('fbApp').filter('cut', function () {
    return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
    };
});

angular.module('fbApp').filter('fulldatetime', function($filter)
{
     return function(input)
     {
      if(input == null){ return ""; } 
     
      var _date = $filter('date')(new Date(input),'EEEE, MMMM dd, yyyy - hh:ss a');
     
      return _date;

     };
});

angular.module('fbApp').filter('datetime', function($filter)
{
     return function(input)
     {
      if(input == null){ return ""; } 
     
      var _date = $filter('date')(new Date(input),'MMMM dd, yyyy - hh:ss a');
     
      return _date;

     };
});


app.filter('html', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});