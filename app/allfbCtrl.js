app.controller('allfbCtrl', function ($scope,$modal,$log, $rootScope, $routeParams, $location, $http, Data) {
    


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


  $scope.lbItem=[];

 

  $scope.openLightBox = function (fbitem) {
    fbitem.perPage = 1;
    fbitem.cPage = 0;
    fbitem.showMore=true;
  

    Data.post('getFBComments', {
        fbid:fbitem.id,
        is_approve:1,
        perPage:fbitem.perPage,
        cpage:fbitem.cPage
     }).then(function (results) {
        console.log(results);
        fbitem.totalPage=Math.ceil(results.totalRows/fbitem.perPage) - 1;
        fbitem.comments=results.pagedItems;       
    });
    
    console.log(fbitem);

    $scope.lbItem=fbitem;
    var modalInstance = $modal.open({
      templateUrl: 'partials/modal.html',
      controller: ModalInstanceCtrl,
      resolve: {
        items: function () {
          return fbitem;
        },
      },
      Data
    });
     

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };



 
    

});


var ModalInstanceCtrl = function ($scope, $modalInstance,items,Data) {
  //console.log(items);
  $scope.lbItem = items;
  /*$scope.selected = {
    item: $scope.items[0]
  };*/

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.fbLike = function(item){
      item=$scope.lbItem;
       Data.post('usrLikeDislike', {
            item: item,
            task:"like"
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                 item.usr_like=parseInt(item.usr_like)+1;
            }
      });
    } 
 
    $scope.fbDisLike = function(item){
       item=$scope.lbItem;
       Data.post('usrLikeDislike', {
            item: item,
            task:"dislike"
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                 item.usr_dislike=parseInt(item.usr_dislike)+1;
            }
      });
    } 

    $scope.cmLike = function(item){
    
       Data.post('usrLikeDislikeCM', {
            item: item,
            task:"like"
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                 item.usr_like=parseInt(item.usr_like)+1;
            }
      });
    } 
 
    $scope.cmDisLike = function(item){

       Data.post('usrLikeDislikeCM', {
            item: item,
            task:"dislike"
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                 item.usr_dislike=parseInt(item.usr_dislike)+1;
            }
      });
    } 

    $scope.postComment  = function(cm){
      
       var formData={
        'fid':$scope.lbItem.id,
        'name':cm.name,
        'comment':cm.comment,
        'is_approve':0,
        'usr_approve':0
       }
       console.log(formData);
       Data.post('postComment', {
            formData:formData
            }).then(function (results) {
              console.log(results);
              if(results.status=="success")
              {
                //$scope.fbcomments=$scope.fbcomments.concat(results.fbobject);
                cm.comment="";
                cm.name=""
              }
              Data.toast(results);
        });

    }

     $scope.moreCM  = function(){
      
        $scope.lbItem.cPage =$scope.lbItem.cPage + 1;
        Data.post('getFBComments', {
          fbid:$scope.lbItem.id,
          is_approve:1,
          perPage:$scope.lbItem.perPage,
          cpage:$scope.lbItem.cPage
       }).then(function (results) {
          console.log(results);
         
          $scope.lbItem.comments = $scope.lbItem.comments.concat(results.pagedItems);  
      });

         
    }



};


