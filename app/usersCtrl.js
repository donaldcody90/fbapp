app.controller('usersCtrl', ['$scope', 'Upload', '$timeout','$location','$routeParams','$http','Data', function ($scope, Upload, $timeout, $location,$routeParams, $http,Data) {
   
   Data.get('getCategories').then(function (results) {
           
            $scope.categories=results;
             console.log($scope.categories);
   });

    $scope.profile_image="";
      $scope.uploadProfile = function(files, errFiles) {
           
           console.log(files);
            $scope.files = files;
            $scope.errFiles = errFiles;  
            angular.forEach(files, function(file) {
                 //console.log(file.$$hashKey);
                 
                 //$scope.listFiles.push(file);
                 //$scope.listFiles=file.name;
                $scope.profile_image=file.name;
                $scope.user.profile_image=file.name;
                file.upload = Upload.upload({
                    url:Data.uploadURL,//'https://angular-file-upload-cors-srv.appspot.com/upload',
                    data: {file: file}
                });
                
                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                    });
                }, function (response) {

                if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;

                }, function (evt) {
                    
                    file.progress = Math.min(100, parseInt(100.0 * 
                                             evt.loaded / evt.total));
                    
                });
            });
      }

   //DETAIL USER //
   if($routeParams.uid)
   {
      console.log("UserID:"+$routeParams.uid);

      Data.post('detailUser', {
              uid:$routeParams.uid
            }).then(function (results) {
              console.log(results);
              $scope.user=results;
              $scope.user.group_id=results.group_id;
      });
      $scope.confirmPass="";
      $scope.newPass="";
      $scope.currentPass="";

      $scope.updateUser = function(user){

        if($scope.currentPass !="" && $scope.newPass !="" && $scope.confirmPass!="")
        { // Change Password
            if($scope.newPass != $scope.confirmPass)
            {
                 var results=[];
                 results.status="error";
                 results.message="Confirm Password not match.";
                 Data.toast(results);
            }else{
                Data.post('changePassword', {
                        uid:$routeParams.uid,
                        newPass:$scope.newPass,
                        currentPass:$scope.currentPass,
                        confirmPass:$scope.confirmPass,
                        hashPass:$scope.user.password
                }).then(function (results) {
                        console.log(results);
                        Data.toast(results);
                    if(results.status=='success'){
                        $scope.newPass="";
                        $scope.currentPass="";
                        $scope.confirmPass="";
                    }
                });
            }

        }else{

           Data.post('updateUser', {
                        uid:$routeParams.uid,
                        user:$scope.user
            }).then(function (results) {
                  console.log(results);
                  Data.toast(results);
            });
        }
          console.log($scope.currentPass);
          console.log($scope.newPass);
          console.log($scope.confirmPass);
          console.log(user);
      }
   }else{


       $scope.itemsPerPage = 2;
       $scope.currentPage = 0; 
       $scope.totalPage
        Data.post('getUsers', {
              currentPage:$scope.currentPage,
              itemsPerPage:$scope.itemsPerPage
            }).then(function (results) {
              console.log(results);
              $scope.total=results.totalRows;
              $scope.pagedItems=results.pagedItems;
              //$scope.nextPageDisabledClass();
              $scope.ListLink();
              console.log($scope.pagedItems);

        });

     
      $scope.pageLink=[];
      $scope.ListLink = function() {
          var totalPage= Math.ceil($scope.total/$scope.itemsPerPage);
          for (var i=1; i<=totalPage; i++) {
            $scope.pageLink.push(i);
          }
      };

      $scope.loadPage = function (nextPage){
          $scope.currentPage= nextPage - 1;
          
          Data.post('getUsers', {
              currentPage:$scope.currentPage,
              itemsPerPage:$scope.itemsPerPage
            }).then(function (results) {
              //console.log(results);
              //$scope.total=results.totalRows;
              $scope.pagedItems=results.pagedItems;
              //$scope.nextPageDisabledClass();
              //$scope.ListLink();
              //console.log($scope.pagedItems);

          });
      }

       $scope.removeItem = function(item) { 
          var index = $scope.pagedItems.indexOf(item);
          $scope.pagedItems.splice(index, 1); 
       }

      $scope.deleteUser = function(user)
      {
        $kq = confirm('Are you sure you want to delete this item?');
        if($kq)
        {
            Data.post('deleteUser', {
              uid:user.uid
            }).then(function (results) {
               Data.toast(results);
               if(results.status=='success')
               {
                  $scope.removeItem(user);
               }
          });
        }
        
      }
      $scope.signUp = function (customer) {
        console.log(customer);
        Data.post('signUp', {
                customer: customer,
                profile_image:$scope.profile_image
            }).then(function (results) {
                Data.toast(results);
                if (results.status == "success") {
                    $location.path('admin/users');
                }
         });
      };
     

  }

}]);