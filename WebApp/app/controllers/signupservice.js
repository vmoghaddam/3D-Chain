'use strict';
app.controller('signUpServiceController', ['$scope', '$location', '$routeParams', '$rootScope', 'pageService', 'authService','userService', '$route', function ($scope, $location, $routeParams, $rootScope, pageService, authService,userService, $route) {

    var $jq = jQuery.noConflict();
    $scope.prms = $routeParams.prms;
    $scope.width1 = '50%';
    $scope.width2 = '49%';
    $scope.width33 = '33%';
    $scope.width32 = '32%';
    $scope.width100 = '33%';

    $scope.width50 = '50%';
    $scope.width48 = '48%';
    /////////////////////////////////////////////
    $scope.name=null;
    $scope.txt_company = {
        placeholder: 'Company',
        width: '100%',
        bindingOptions: {
            value:'name'
        }
    };
    $scope.email=null;
    $scope.txt_email = {
        width: '100%',
        placeholder: 'Email',
        mode: "email",
        bindingOptions: {
            value:'email'
        }
    };
    $scope.website=null;
    $scope.txt_website = {
        placeholder: 'Website',
        width: '100%',
        bindingOptions: {
            value:'website',
        }
    };


    $scope.txt_last_name = {
        width: '100%',
        placeholder: 'Last Name',
        bindingOptions: {

        }

    };
    $scope.password=null;
    $scope.txt_password = {
        placeholder: 'Password',
        mode: "password",
        width: '100%',
        bindingOptions: {
            value:'password',
        }
    };
    $scope.confirmPassword=null;
    $scope.txt_confirm_password = {
        placeholder: 'Confirm Password',
        mode: "password",
        width: '100%',
        bindingOptions: {
            value:'confirmPassword',
        }
    };
    $scope.txt_degree = {
        placeholder: 'Degree',
        width: '100%',
        bindingOptions: {

        }
    };
   
    $scope.txt_position = {
        placeholder: 'Position',
        width: '100%',
        bindingOptions: {

        }
    };
   
    $scope.txt_linkedin = {
        placeholder: 'LinkedIn URL',
        width: '100%',
        bindingOptions: {

        }
    };
    $scope.address=null;
    $scope.txt_location = {
        placeholder: 'Address',
        width: '100%',
        bindingOptions: {
            value:'address',
        }
    };
    $scope.tag_group = {
        placeholder: 'Group',
        width: 400,
    };
    $scope.passwordValidationRules = {
        validationGroup: 'signupservice',
        validationRules: [{

            type: "required",
            message: "Password is required"
        }]
    };

    $scope.confirmPasswordValidationRules = {
        validationGroup: 'signupservice',
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
    $scope.emailValidationRules = {
        validationGroup: 'signupservice',
        validationRules: [{
            type: "required",
            message: "Email is required"
        }, {
            type: "email",
            message: "Email is invalid"
        },  ]
    };
    $scope.btn_submit = {
        text: 'SUBMIT',
        type: 'default',
        icon: 'check',
        width: '49%',
        validationGroup: 'signupservice',
        onClick: function (e) {
            var result = e.validationGroup.validate();

            if (!result.isValid) {
                General.ShowNotify('Please fill in all required fields.', 'error');
                return;
            }

            var dto = {
                id:-1,
                name:$scope.name,
                email:$scope.email,
                password:$scope.password,
                confirmPassword:$scope.confirmPassword,
                website:$scope.website,
                address:$scope.address,
            };

            $scope.loadingVisible = true;
            userService.registerCompany(dto).then(function (response) {

               // General.ShowNotify(Config.Text_SavedOk, 'success');
                $scope.loadingVisible = false;
                $location.path('/signin');
               
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
    $scope.tag_ds = [
        { Id: 1, Title: '3D Printing Technology' },
    ];
    $scope.tag_group = {

        showClearButton: true,
        // width: '100%',
        searchEnabled: true,

        searchExpr: ['Title'],
        dataSource: $scope.tag_ds,
        displayExpr: "Title",
        valueExpr: 'Id',
        bindingOptions: {
            //value: 'filterAircraft',


        }
    };

    $scope.chk_grp1 = {
        text: '3D Printing Technology',
        //width:'50%',
        bindingOptions: {
            value: 'false',
            width: 'width50',
        }
    };

    $scope.chk_grp2 = {
        text: '3D Printing(Concrete)',
        // width: '48%',
        bindingOptions: {
            value: 'false',
            width: 'width48',
        }
    };

    $scope.chk_grp3 = {
        text: '3D Printing(Metal)',
        //width: '50%',
        bindingOptions: {
            value: 'false',
            width: 'width50',
        }
    };

    $scope.chk_grp4 = {
        text: '3D Printing(Ceramic)',
        // width: '48%',
        bindingOptions: {
            value: 'false',
            width: 'width48',
        }
    };

    $scope.chk_grp5 = {
        text: '3D Printing(Polymer)',
        //width: '50%',
        bindingOptions: {
            value: 'false',
            width: 'width50',
        }
    };

    $scope.chk_grp6 = {
        text: '3D Printing(Medical)',
        //  width: '48%',
        bindingOptions: {
            value: 'false',
            width: 'width48',
        }
    };

    $scope.chk_grp7 = {
        text: '3D Printing(Dental)',
        // width: '50%',
        bindingOptions: {
            value: 'false',
            width: 'width50',
        }
    };

    $scope.chk_grp8 = {
        text: '3D Printing(Software)',
        // width: '48%',
        bindingOptions: {
            value: 'false',
            width: 'width48',
        }
    };

    $scope.chk_grp9 = {
        text: 'Material Engineering',
        //width: '50%',
        bindingOptions: {
            value: 'false',
            width: 'width50',
        }
    };

    $scope.chk_grp10 = {
        text: 'Design for Additive Manufacturing',
        //width: '48%',
        bindingOptions: {
            value: 'false',
            width: 'width48',
        }
    };

    $scope.chk_grp11 = {
        text: 'Hybrid Additive Manufacturing',
        //width: '50%',
        bindingOptions: {
            value: 'false',
            width: 'width50',
        }
    };

    $scope.chk_grp12 = {
        text: 'Product liability and regulatory',
        // width: '48%',
        bindingOptions: {
            value: 'false',
            width: 'width48',
        }
    };

    $scope.chk_grp13 = {
        text: 'Business Development',
        //width: '50%',
        bindingOptions: {
            value: 'false',
            width: 'width50',
        }
    };

    $scope.chk_grp14 = {
        text: 'Artificial Intelligence',
        //width: '48%',
        bindingOptions: {
            value: 'false',
            width: 'width48',
        }
    };

    $scope.chk_grp15 = {
        text: 'Internet of Things(IoT)',
        //width: '50%',
        bindingOptions: {
            value: 'false',
            width: 'width50',
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