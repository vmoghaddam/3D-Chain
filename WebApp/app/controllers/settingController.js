'use strict';
app.controller('settingController', ['$scope', '$location', '$routeParams', '$rootScope', 'pageService', 'authService', 'userService', '$route', function ($scope, $location, $routeParams, $rootScope, pageService, authService, userService, $route) {

    var $jq = jQuery.noConflict();
    $scope.prms = $routeParams.prms;
    
    /////////////////////////////////////////////
    if (!authService.isAuthorized()) {

         authService.redirectToLogin();

    }
    //////////////////////////////////

    

    $scope.password = null;
    $scope.old = null;
    $scope.txt_password = {
        placeholder: 'New Password',
        mode: "password",
        width: '100%',
        bindingOptions: {
            value: 'password',
        }
    };
    $scope.txt_old = {
        placeholder: 'Current Password',
        mode: "password",
        width: '100%',
        bindingOptions: {
            value: 'old',
        }
    };
    $scope.confirmPassword = null;
    $scope.txt_confirm_password = {
        placeholder: 'Confirm Password',
        mode: "password",
        width: '100%',
        bindingOptions: {
            value: 'confirmPassword',
        }
    };
    
    $scope.passwordValidationRules = {
        validationGroup: 'cpass',
        validationRules: [{

            type: "required",
            message: "Password is required"
        }]
    };

    $scope.confirmPasswordValidationRules = {
        validationGroup: 'cpass',
        validationRules: [{

            type: "compare",
            comparisonTarget: function () {
                var password = $jq("#password-validation").dxTextBox("instance");
                if (password) {
                    return password.option("value");
                }
            },
            message: "'Password' and 'Confirm Password' do not match."
        },
        {
            type: "required",
            message: "Confirm Password is required"
        }]
    };
     
    $scope.btn_submit = {
        text: 'SUBMIT',
        type: 'default',
        icon: 'check',
        width: '49%',
        validationGroup: 'cpass',
        onClick: function (e) {

            var result = e.validationGroup.validate();

            if (!result.isValid) {
                //  General.ShowNotify('Please fill in all required fields.', 'error');
                return;
            }

             
            var dto = {
                 
                Old: $scope.old,
                Password: $scope.password,
                UserName: $rootScope.userName,
                
            };

            $scope.loadingVisible = true;
            authService.changePassword(dto).then(function (response) {

                // General.ShowNotify(Config.Text_SavedOk, 'success');
                $scope.loadingVisible = false;
                authService.logOut();

            }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
            ///////////////////////////////
        }

    };
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
   


    //////////////////////////////////////////

    $jq(window).on('resize', function () {
        if ($jq(window).width() < 768) {
            $scope.width1 = '100%';
            $scope.width2 = '100%';
            //$scope.width33 = '49%';
            //$scope.width32 = '49%';
            // $scope.width100 = '100%';
        }
        else {
            $scope.width1 = '50%';
            $scope.width2 = '48%';
            //$scope.width33 = '33%';
            //$scope.width32 = '32%';
            //$scope.width100 = '33%';
        }
    });
    $scope.$on('$viewContentLoaded', function () {
        // alert('about');
        if ($jq(window).width() < 768) {
            $scope.width1 = '100%';
            $scope.width2 = '100%';
            $scope.width33 = '49%';
            $scope.width32 = '49%';
            $scope.width100 = '100%';

            $scope.width50 = '100%';
            $scope.width48 = '100%';

        }
        else {
            $scope.width1 = '50%';
            $scope.width2 = '49%';
            $scope.width33 = '33%';
            $scope.width32 = '32%';
            $scope.width100 = '33%';

            $scope.width50 = '50%';
            $scope.width48 = '48%';
        }

        $jq('.signupservice').fadeIn(400, function () {
            //$jq('#Top_bar').show();
            // $rootScope.pageFunctions();
            var h = $jq('.signin-box2').height();
            console.log(h);
        });
        $rootScope.$broadcast('PageLoaded', 'signupservice');
    });

    ///end


}]);