app.controller('fblistCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data) {
    
    Data.get('getCategories').then(function (results) {
        $scope.categories=results;
    });
    $scope.fbtitle="All Deparments";
    $scope.itemsPerPage = 2;
    $scope.currentPage = 0;
    $scope.catID =-1;
    /*Data.get('totalFB').then(function (results) {
        $scope.total=results;
    });*/

    $scope.checkAll = function () {
        if ($scope.selectedAll) {
            $scope.selectedAll = true;
        } else {
            $scope.selectedAll = false;
        }
        angular.forEach($scope.pagedItems, function (item) {
            item.Selected = $scope.selectedAll;
        });

    };
   $scope.showMore=false;
    Data.post('getALLFB', {
          currentPage:$scope.currentPage,
          itemsPerPage:$scope.itemsPerPage
        }).then(function (results) {
          console.log(results);
          $scope.total=results.totalRows;
          $scope.pagedItems=results.pagedItems;
          $scope.nextPageDisabledClass();
    });

  
    $scope.publish = function(){
        console.log($scope.selection);
    
    }
   // $scope.total =100;
    //$scope.pagedItems = Item.get($scope.currentPage*$scope.itemsPerPage,
   // $scope.itemsPerPage);
    $scope.changeAgency = function(){
       $scope.inp.department_id=-1;
       $scope.catID=-1;
       $scope.currentPage=0;
       if($scope.inp.agency_id > 0){
         $scope.fbtitle="Agency Global";
        }else{
           $scope.fbtitle="All Deparments";
        }
       Data.post('getALLFB', {
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
      if($scope.inp.department_id > 0)
      {
          $scope.fbtitle="Deparments";
      }else{
         $scope.fbtitle="All Deparments";
      }
      
       Data.post('getALLFB', {
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
      $scope.fbtitle="Anonymous";
       Data.post('getALLFB', {
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
       $scope.fbtitle="Search Results";
        Data.post('getALLFB', {
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
    $scope.nextLoad = function() {
        console.log("load more");
        if( $scope.currentPage < $scope.pageCount()-1)
            $scope.currentPage++;
         Data.post('getALLFB', {
          currentPage:$scope.currentPage,
          itemsPerPage:$scope.itemsPerPage,
          department_id:$scope.inp.department_id,
          agency_id:$scope.inp.agency_id,
          catID:$scope.catID,
          keyword:$scope.inp.keyword
         }).then(function (results) {
                console.log(results);
             //$scope.pagedItems = $scope.pagedItems.concat(results.pagedItems);
             $scope.pagedItems = results.pagedItems;
             $scope.nextPageDisabledClass();
        });
    };
    $scope.prevLoad = function() {
        console.log("load more");
        if($scope.currentPage > 0)
            $scope.currentPage--;
         Data.post('getALLFB', {
          currentPage:$scope.currentPage,
          itemsPerPage:$scope.itemsPerPage,
          department_id:$scope.inp.department_id,
          agency_id:$scope.inp.agency_id,
          catID:$scope.catID,
          keyword:$scope.inp.keyword
         }).then(function (results) {
                console.log(results);
             //$scope.pagedItems = $scope.pagedItems.concat(results.pagedItems);
             $scope.pagedItems = results.pagedItems;
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
   $scope.prevPageDisabledClass = function() {
      if( $scope.currentPage <= 0){
         $scope.showPrev=false;
      }else{
        $scope.showPrev=true;
      }
   };

    $scope.pageCount = function() {
      return Math.ceil($scope.total/$scope.itemsPerPage);
   };


});