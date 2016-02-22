app.controller('allfbCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data) {
    
    Data.get('getCategories').then(function (results) {
        $scope.categories=results;
    });

    $scope.itemsPerPage = 2;
    $scope.currentPage = 0;
    $scope.catID =-1;
    /*Data.get('totalFB').then(function (results) {
        $scope.total=results;
    });*/
   $scope.showMore=false;
    Data.post('getFB', {
          currentPage:$scope.currentPage,
          itemsPerPage:$scope.itemsPerPage
        }).then(function (results) {
          console.log(results);
          $scope.total=results.totalRows;
          $scope.pagedItems=results.pagedItems;
          $scope.nextPageDisabledClass();
    });

  
    
   // $scope.total =100;
    //$scope.pagedItems = Item.get($scope.currentPage*$scope.itemsPerPage,
   // $scope.itemsPerPage);
    $scope.changeAgency = function(){
       $scope.inp.department_id=-1;
       $scope.catID=-1;
       $scope.currentPage=0;
       Data.post('getFB', {
          currentPage:$scope.currentPage,
          itemsPerPage:$scope.itemsPerPage,
          department_id:$scope.inp.department_id,
          agency_id:$scope.inp.agency_id,
          catID:$scope.catID,
          keyword:$scope.inp.keyword
        }).then(function (results) {
          console.log(results);
          $scope.total=results.totalRows;
          $scope.pagedItems=results.pagedItems;
          $scope.nextPageDisabledClass();
        });

    }
    $scope.changeDepartment= function(){
      $scope.inp.agency_id=-1;
      $scope.catID=-1;
      $scope.currentPage=0;
       Data.post('getFB', {
          currentPage:$scope.currentPage,
          itemsPerPage:$scope.itemsPerPage,
          department_id:$scope.inp.department_id,
          agency_id:$scope.inp.agency_id,
          catID:$scope.catID,
          keyword:$scope.inp.keyword
        }).then(function (results) {
          console.log(results);
          $scope.total=results.totalRows;
          $scope.pagedItems=results.pagedItems;
          $scope.nextPageDisabledClass();
        });
    }
    $scope.changeAnonymoust= function(){
      $scope.inp.agency_id=-1;
      $scope.inp.department_id=-1;
      $scope.catID=0;
      $scope.currentPage=0;
       Data.post('getFB', {
          currentPage:$scope.currentPage,
          itemsPerPage:$scope.itemsPerPage,
          department_id:$scope.inp.department_id,
          agency_id:$scope.inp.agency_id,
          catID:$scope.catID,
          keyword:$scope.inp.keyword
        }).then(function (results) {
          console.log(results);
          $scope.total=results.totalRows;
          $scope.pagedItems=results.pagedItems;

          $scope.nextPageDisabledClass();
      });
    }
    $scope.onSearchSubmit = function(){
       //$scope.inp.agency_id=-1;
       //$scope.inp.department_id=-1;
       //$scope.catID=-1;
       $scope.currentPage=0;
        Data.post('getFB', {
          currentPage:$scope.currentPage,
          itemsPerPage:$scope.itemsPerPage,     
           department_id:$scope.inp.department_id,
          agency_id:$scope.inp.agency_id,
          catID:$scope.catID,     
          keyword:$scope.inp.keyword
        }).then(function (results) {
          console.log(results);
          $scope.total=results.totalRows;
          $scope.pagedItems=results.pagedItems;

          $scope.nextPageDisabledClass();

        });
    }
    $scope.loadMore = function() {
        console.log("load more");
        $scope.currentPage++;
         Data.post('getFB', {
          currentPage:$scope.currentPage,
          itemsPerPage:$scope.itemsPerPage,
          department_id:$scope.inp.department_id,
          agency_id:$scope.inp.agency_id,
          catID:$scope.catID,
          keyword:$scope.inp.keyword
         }).then(function (results) {
                console.log(results);
             $scope.pagedItems = $scope.pagedItems.concat(results.pagedItems);
             $scope.nextPageDisabledClass();
        });
    };

    $scope.nextPageDisabledClass = function() {
      if( $scope.currentPage >= $scope.pageCount()-1){
         $scope.showMore=false;
      }else{
        $scope.showMore=true;
      }
   };

    $scope.pageCount = function() {
      return Math.ceil($scope.total/$scope.itemsPerPage);
   };


});