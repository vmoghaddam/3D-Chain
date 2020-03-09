'use strict';
app.controller('homeController', ['$scope', '$rootScope', 'userService', function ($scope, $rootScope, userService) {
    var $jq = jQuery.noConflict();



   



    $scope.$on('$viewContentLoaded', function () {
        // alert('about');

        $jq('.home').fadeIn(400, function () {
            //$jq('#Top_bar').show();
            // $rootScope.pageFunctions();
            userService.getMaterials().then(function (response) {
                 

            }, function (err) {  });
        });
        $rootScope.$broadcast('PageLoaded', 'home');
    });
    //////////////////////////////////

}]);