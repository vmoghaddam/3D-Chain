'use strict';
app.controller('signInController', ['$scope', '$routeParams', '$location', 'authService', 'ngAuthSettings', '$rootScope', function ($scope, $routeParams, $location, authService, ngAuthSettings, $rootScope) {

    var $jq = jQuery.noConflict();
    $scope.prms = $routeParams.prms;
    $scope.ref = $routeParams.ref;
   // alert($scope.ref);
     

    $scope.loginData = {
        userName:"",// "babak@3dchain.io",
        password:"", //"Atrina1359@a",
        useRefreshTokens: false,
        scope: [-1],
    };

    $scope.message = "";
    $scope.username = '';
    $scope.password = '';
    $scope.txt_username = {
        width: '85%',
        placeholder: 'Email or Username',
        bindingOptions: {
            
            value: 'username'
        }

    };
    $scope.txt_password = {
        placeholder: 'Password',
        mode: "password",
        width: '85%',
        bindingOptions: {
            value: 'password',
        }
    };
    $scope.btn_submit = {
        text: 'Sign In',
        type: 'default',
        icon: '',
        width: '85%',
        validationGroup: 'signin',
        onClick: function (e) {

            var result = e.validationGroup.validate();

            if (!result.isValid) {
                //  General.ShowNotify('Please fill in all required fields.', 'error');
                return;
            }

            $scope.loginData.userName = $scope.username;
            $scope.loginData.password = $scope.password;
            $scope.login();
        }

    };
    $scope.login = function () {
        $scope.loadingVisible = true;
        //$('form').fadeOut(700);
        //$('.wait').addClass('yaxis').fadeIn(1500);

        //$('.wrapper').addClass('form-success');

        authService.login($scope.loginData).then(function (response) {


            $scope.loadingVisible = false;

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
            if ($rootScope.role == 'Company') {
                $location.path('/company/' + $rootScope.userId);
            }
            else
            $location.path('/home');


        },
            function (err) {
                $scope.loadingVisible = false;
                $scope.message = err.error_description;
                General.ShowNotify('Invalid Username or Password.', 'error');
               // alert($scope.message);
                //$('.wait').hide();
                //$('.wrapper').removeClass('form-success');
                //$('form').fadeIn(700);
            });
    };
    //////////////////////////////////////////
    $scope.loadingVisible = false;
    $scope.loadPanel = {
        message: 'Please wait...',

        showIndicator: true,
        showPane: true,
        shading: true,
        closeOnOutsideClick: false,
        shadingColor: "rgba(0,0,0,0.4)",
        // position: { of: "body" },
        onShown: function () {

        },
        onHidden: function () {

        },
        bindingOptions: {
            visible: 'loadingVisible'
        }
    };
    /////////////////////////////////////////////
    $scope.$on('$viewContentLoaded', function () {
        // alert('about');
        var h = $jq(window).height();
        if (h > 1000) {
            var lh = h - 69 - 210 - 160 - 66;
            $jq('#hl').height(lh);
            $jq('#sb').height(lh-160);
        }
       
       
        $jq('.signin').fadeIn(400, function () {
            //$jq('#Top_bar').show();
            // $rootScope.pageFunctions();
           // alert($jq('#hl').length);
           // $jq('#hl').height(lh);
        });
        $rootScope.$broadcast('PageLoaded', 'signin');
    });

    ///end


}]);