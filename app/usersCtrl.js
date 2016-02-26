app.controller('usersCtrl', ['$scope', 'Upload', '$timeout','Data', function ($scope, Upload, $timeout,Data) {
   
   $scope.itemsPerPage = 2;
   $scope.currentPage = 0; 

    Data.post('getUsers', {
          currentPage:$scope.currentPage,
          itemsPerPage:$scope.itemsPerPage
        }).then(function (results) {
          console.log(results);
          $scope.total=results.totalRows;
          $scope.pagedItems=results.pagedItems;
          //$scope.nextPageDisabledClass();
          console.log($scope.pagedItems);
    });

  Data.get('getCategories').then(function (results) {
       
        $scope.categories=results;
         console.log($scope.categories);
  });
  $scope.deleteUser = function(user)
  {
    $kq = confirm('Are you sure you want to delete this item?');
    if($kq)
    {
        Data.post('deleteUser', {
          uid:user.uid
        }).then(function (results) {
           Data.toast(results);
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

}]);