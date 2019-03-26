'use strict';
app.controller('homeController', ['$scope',   '$rootScope', function ($scope,   $rootScope) {
    var $jq = jQuery.noConflict();



   



    $scope.$on('$viewContentLoaded', function () {
        // alert('about');

        $jq('.home').fadeIn(400, function () {
            //$jq('#Top_bar').show();
            // $rootScope.pageFunctions();
        });
        $rootScope.$broadcast('PageLoaded', 'home');
    });
    //////////////////////////////////

}]);