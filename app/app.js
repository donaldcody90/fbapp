var app = angular.module('fbApp', ['ngRoute', 'ngAnimate', 'toaster','ngFileUpload','ui.bootstrap']);

app.config(['$routeProvider',
  function ($routeProvider) {

        $routeProvider.
            when('/admin/login', {
                title: 'Login',
                templateUrl: 'partials/login.html',
                controller: 'authCtrl',
                role: '0'
            })
            .when('/logout', {
                title: 'Logout',
                templateUrl: 'partials/login.html',
                controller: 'logoutCtrl',
                role: '0'
            })
            .when('/signup', {
                title: 'Signup',
                templateUrl: 'partials/signup.html',
                controller: 'authCtrl',
                role: '0'
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
                role: '0',
                backend:'1'
            })
            .when('/admin/fblist', {
                title: 'Feedback',
                templateUrl: 'partials/fblist.html',
                controller: 'fblistCtrl',
                role: '0',
                backend:'1'
            })
            .when('/admin/fblist/:fbid', {
                url: '/:fbid',
                title: 'Feedback detail',
                templateUrl: 'partials/fbdetail.html',
                controller: 'fbdetailCtrl',
                role: '0',                
                backend:'1'
            })
            .when('/admin/settings', {
                title: 'Settings',
                templateUrl: 'partials/setting.html',
                controller: 'authCtrl',
                role: '0',
                backend:'1'
            })
            .when('/admin/groups', {
                title: 'groups',
                templateUrl: 'partials/groups.html',
                controller: 'groupsCtrl',
                role: '0',
                backend:'1'
            })
            .when('/admin/groups/edit/:gid', {
                url: '/:gid',
                title: 'groups',
                templateUrl: 'partials/editgroup.html',
                controller: 'groupsCtrl',
                role: '0',
                backend:'1'
            })
            .when('/admin/groups/add', {
                title: 'groups',
                templateUrl: 'partials/addgroup.html',
                controller: 'groupsCtrl',
                role: '0',
                backend:'1'
            })
            .when('/admin/users', {
                title: 'users',
                templateUrl: 'partials/users.html',
                controller: 'usersCtrl',
                role: '0',
                backend:'1'
            })
            .when('/admin/users/add', {
                title: 'users',
                templateUrl: 'partials/adduser.html',
                controller: 'usersCtrl',
                role: '0',
                backend:'1'
            })
            .when('/admin/users/edit/:uid', {
                url: '/:uid',
                title: 'users',
                templateUrl: 'partials/edituser.html',
                controller: 'usersCtrl',
                role: '0',
                backend:'1'
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
                role: '1',
                frontend:'1'
            })
            .when('/agency', {
                title: 'agency',
                templateUrl: 'partials/agency.html',
                controller: 'frontendCtrl',
                role: '1',
                
            })
            .when('/anonymous', {
                title: 'Anonymous',
                templateUrl: 'partials/anonymous.html',
                controller: 'frontendCtrl',
                role: '1',
                frontend:'1'
            })
             .when('/allfeedbacks', {
                title: 'All Feedbacks ',
                templateUrl: 'partials/allfeedbacks.html',
                controller: 'allfbCtrl',
                role: '1',
                frontend:'1'
            })
             .when('/', {
                title: 'Home',
                templateUrl: 'partials/anonymous.html',
                controller: 'frontendCtrl',
                role: '1',
                frontend:'1'
            })
            .otherwise({
                redirectTo: '/'
            });
  }])
    .run(function ($rootScope, $location, Data) {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
             
            $rootScope.authenticated = false;
            
            $rootScope.role = 0;
            $rootScope.backend=next.$$route.backend;
         
            Data.get('session').then(function (results) {
                if (results.uid) {
                    console.log(results);
                    $rootScope.authenticated = true;
                    $rootScope.uid = results.uid;
                    $rootScope.name = results.name;
                    $rootScope.email = results.email;
                    $rootScope.role  = results.role;
                    $rootScope.group_id  = results.group_id;
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


app.filter('iconname', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});



app.filter('iconname', function($sce) {
    return function(val) {
        
        if(val == null || val==""){ 
            return "anonimous.png"; 
        }else{ 
            return val[0].toLowerCase()+".png";
        }
    };
});
