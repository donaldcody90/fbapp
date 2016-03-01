app.controller('groupsCtrl', ['$scope', 'Upload', '$timeout','$location','$routeParams','$http','Data', function ($scope, Upload, $timeout, $location,$routeParams, $http,Data) {
   
   Data.get('getCategories').then(function (results) {
           
            $scope.categories=results;
             console.log($scope.categories);
   });

    

   //DETAIL USER //
   if($routeParams.gid)
   {
      console.log("GroupID:"+$routeParams.gid);

      Data.post('detailGroup', {
              gid:$routeParams.gid
            }).then(function (results) {
              console.log(results);
              $scope.category=results;
           
      });
     

      $scope.updateGroup = function(group){
        console.log(group);

         Data.post('updateGroup',{
              gid:$routeParams.gid,
              group:group
            }).then(function (results) {
                  console.log(results);
                  Data.toast(results);
        });
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
          var index = $scope.categories.department.indexOf(item);
          $scope.categories.department.splice(index, 1); 
          var index = $scope.categories.agency.indexOf(item);
          $scope.categories.agency.splice(index, 1); 
       }

      $scope.deleteGroup = function(group)
      {
        $kq = confirm('Are you sure you want to delete this item?');
        if($kq)
        {
            Data.post('deleteGroup', {
              gid:group.id
            }).then(function (results) {
               Data.toast(results);
               if(results.status=='success')
               {
                  $scope.removeItem(group);
               }
          });
        }
        
      }
      $scope.addGroup = function (group) {
        console.log(group);
        Data.post('addGroup', {
                formData: group
            }).then(function (results) {
                Data.toast(results);
                if (results.status == "success") {
                    $location.path('admin/groups');
                }
         });
      };
     

  }

}]);