'use strict';
app.controller('privacyController', ['$scope', '$location', '$routeParams', '$rootScope', 'pageService', 'authService', function ($scope, $location, $routeParams, $rootScope, pageService, authService) {

    var $jq = jQuery.noConflict();
    $scope.prms = $routeParams.prms;

    $scope.$on('$viewContentLoaded', function () {
        // alert('about');

        $jq('.privacy').fadeIn(400, function () {
            $jq('.animate').show();
            //   $jq('#Top_bar').show();
            //   $rootScope.pageFunctions();
        });
        $rootScope.$broadcast('PageLoaded', 'privacy');
    });

    ///end


}]);
