'use strict';
app.controller('userAgreementController', ['$scope', '$location', '$routeParams', '$rootScope', 'pageService', 'authService', function ($scope, $location, $routeParams, $rootScope, pageService, authService) {

    var $jq = jQuery.noConflict();
    $scope.prms = $routeParams.prms;
     
    $scope.$on('$viewContentLoaded', function () {
        // alert('about');

        $jq('.useragreement').fadeIn(400, function () {
            $jq('.animate').show();
            //   $jq('#Top_bar').show();
            //   $rootScope.pageFunctions();
        });
        $rootScope.$broadcast('PageLoaded', 'useragreement');
    });

    ///end


}]);
