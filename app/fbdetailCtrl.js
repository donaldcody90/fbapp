app.controller('fbdetailCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data) {
    
    Data.get('getCategories').then(function (results) {
        $scope.categories=results;
    });
    $scope.fbtitle="All Deparments";
    $scope.itemsPerPage = 2;
    $scope.currentPage = 0;
    $scope.catID =-1;
   
    console.log($routeParams.fbid);

     Data.post('getFBDetail', {
          fbid:$routeParams.fbid
        }).then(function (results) {
          console.log(results);
          $scope.fbitem=results;
    });

    Data.post('getFBComments', {
          fbid:$routeParams.fbid
        }).then(function (results) {
          console.log(results);
          $scope.fbcomments=results;
          console.log($scope.fbcomments); 
    });

    $scope.update = function(){
       Data.post('updateFB', {
            fbid:$routeParams.fbid,
            is_approve:$scope.fbitem.is_approve,
            allow_comment:$scope.fbitem.allow_comment,
            usr_approve:$scope.uid
            }).then(function (results) {
              console.log(results);
              //$scope.fbitem=results;
               Data.toast(results);
        });
        console.log($scope.fbitem.is_approve);
        console.log($scope.fbitem.allow_comment);
        console.log($scope.uid);

    }

    $scope.postComment= function(){
      var formData={
        'fid':$routeParams.fbid,
        'name':$scope.name,
        'comment':$scope.comment,
        'is_approve':1,
        'usr_approve':$scope.uid
       }
        console.log(formData);
       Data.post('postComment', {
            formData:formData
            }).then(function (results) {
              console.log(results);
              if(results.status=="success")
              {
                $scope.fbcomments=$scope.fbcomments.concat(results.fbobject);
                $scope.comment="";
              }
              Data.toast(results);
        });
    }

});