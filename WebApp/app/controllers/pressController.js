'use strict';
app.controller('pressController', ['$scope', '$location', '$routeParams', '$rootScope', 'pageService', 'authService', function ($scope, $location, $routeParams, $rootScope, pageService, authService) {

    var $jq = jQuery.noConflict();
    $scope.prms = $routeParams.prms;
     
   
    //////////////////////////////////////////
   
    $scope.$on('$viewContentLoaded', function () {
        // alert('about');

        $jq('.press').fadeIn(400, function () {
            //$jq('#Top_bar').show();
           // $rootScope.pageFunctions();
        });
        $rootScope.$broadcast('PageLoaded', 'about');
    });

    ///end


}]);
