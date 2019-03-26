'use strict';
app.controller('signInController', ['$scope', '$location', '$routeParams', '$rootScope', 'pageService', 'authService', function ($scope, $location, $routeParams, $rootScope, pageService, authService) {

    var $jq = jQuery.noConflict();
    $scope.prms = $routeParams.prms;
    $scope.loginData = {
        userName:null,
        password:null,
        useRefreshTokens: false,
        scope: [-1],
    };

    $scope.login = function () {
        alert('x');
    };
    //////////////////////////////////////////

    $scope.$on('$viewContentLoaded', function () {
        // alert('about');

        $jq('.signin').fadeIn(400, function () {
            //$jq('#Top_bar').show();
            // $rootScope.pageFunctions();
        });
        $rootScope.$broadcast('PageLoaded', 'signin');
    });

    ///end


}]);