app.controller('frontendCtrl', ['$scope', 'Upload', '$timeout','Data', function ($scope, Upload, $timeout,Data) {
    $scope.enableAutoScroll = false;
 
    Data.get('getCategories').then(function (results) {
       
        $scope.categories=results;
         console.log($scope.categories);
    });

    Data.get('lastfeedback').then(function (results) {
       
        $scope.lastfeedbacks=results;
         console.log($scope.lastfeedbacks);
    });

    Data.post('getSetting', {
          meta_key:"anonymous_text"
        }).then(function (results) {
          $scope.anonymous_text=results.meta_value;
      });


    $scope.fbLike = function(item){
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

    $scope.removeFile = function(item) { 
         console.log($scope.files);
      var index = $scope.listFiles.indexOf(item);
      $scope.listFiles.splice(index, 1);   
      Data.post('removeFile',{
            fileName:item.name
      });  
      
    }
   
    $scope.doSubmit = function (formData) {
    

       if( $scope.listFiles.length > 0) {
            formData.attach=[];
            angular.forEach($scope.listFiles, function(file) {
                formData.attach.push(file.name);
            });
          
       }
        Data.post('submitAnonymous', {
            formData: formData
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                // reset form after success
                $scope.inp={};
                $scope.listFiles={};
            }
        });
    };


    $scope.$watch('files', function () {
        $scope.uploadFilesJS($scope.files);
    });
   
    $scope.log = '';  
    $scope.listFiles=[];
    
    $scope.files=[];
    $scope.uploadFilesJS = function(files, errFiles) {
       
        $scope.files = files;
        $scope.errFiles = errFiles;  
        angular.forEach(files, function(file) {
             //console.log(file.$$hashKey);
             
             $scope.listFiles.push(file);
             //$scope.listFiles=file.name;
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

