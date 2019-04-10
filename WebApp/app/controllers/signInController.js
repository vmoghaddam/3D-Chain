'use strict';
app.controller('signInController', ['$scope', '$routeParams', '$location', 'authService', 'ngAuthSettings', '$rootScope', function ($scope, $routeParams, $location, authService, ngAuthSettings, $rootScope) {

    var $jq = jQuery.noConflict();
    $scope.prms = $routeParams.prms;
     

    $scope.loginData = {
        userName: "babak@3dchain.io",
        password: "Atrina1359@a",
        useRefreshTokens: false,
        scope: [-1],
    };

    $scope.message = "";

    $scope.login = function () {
        
        //$('form').fadeOut(700);
        //$('.wait').addClass('yaxis').fadeIn(1500);

        //$('.wrapper').addClass('form-success');

        authService.login($scope.loginData).then(function (response) {




            //if ($rootScope.history.length <= 1) {
            //    $location.path('/home');
            //}
            //else {
            //    console.log($rootScope.history[$rootScope.history.length - 2]);
            //    //  alert($rootScope.history[$rootScope.history.length - 2]);
            //    $location.path($rootScope.history[$rootScope.history.length - 2]);
            //    console.log($rootScope.history[$rootScope.history.length - 2]);
            //}

            //$rootScope.app_selected
            $rootScope.userName = authService.authentication.userName;
            $location.path('/home');


        },
            function (err) {
                $scope.message = err.error_description;
                alert($scope.message);
                //$('.wait').hide();
                //$('.wrapper').removeClass('form-success');
                //$('form').fadeIn(700);
            });
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