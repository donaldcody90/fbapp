app.controller('frontendCtrl', ['$scope', 'Upload', '$timeout','Data', function ($scope, Upload, $timeout,Data) {
 console.log(Data.uploadURL);
    
    $scope.$watch('files', function () {
        $scope.uploadFiles($scope.files);
    });
    $scope.$watch('file', function () {
        if ($scope.file != null) {
            $scope.files = [$scope.file]; 
        }
    });
    $scope.log = '';  

    $scope.uploadFiles = function(files, errFiles) {
        $scope.files = files;
       $scope.errFiles = errFiles;  
        angular.forEach(files, function(file) {
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