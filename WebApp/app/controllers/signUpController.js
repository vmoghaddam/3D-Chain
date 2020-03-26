'use strict';
app.controller('signUpController', ['$scope', '$location', '$routeParams', '$rootScope', 'pageService', 'authService', '$route', function ($scope, $location, $routeParams, $rootScope, pageService, authService,$route) {

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
    $scope.txt_first_name = {
        width:'100%',
        placeholder: 'First Name',
        bindingOptions: {
            //width:'width1'
            // width:'100%'
            value:'firstName'
        }
          
    };
    $scope.txt_last_name = {
        width: '100%',
        placeholder: 'Last Name',
        bindingOptions: {
            value: 'lastName'
        }
        
    };
    $scope.txt_email = {
        width: '100%',
        placeholder: 'Email',
        mode: "email",
        bindingOptions: {
            value: 'email'
        }
    };
    $scope.txt_password = {
        placeholder: 'Password',
        mode: "password",
        width: '100%',
        bindingOptions: {
            value: 'password'
        }
    };
    $scope.txt_confirm_password = {
        placeholder: 'Confirm Password',
        mode: "password",
        width: '100%',
        bindingOptions: {
             
        }
    };
   
    $scope.txt_degree = {
        placeholder: 'Degree',
        width: '100%',
        bindingOptions: {
            value: 'degree'
        }
    };
    $scope.txt_company = {
        placeholder: 'Company or University',
        width: '100%',
        bindingOptions: {
            value: 'company'
        }
    };
    $scope.txt_position = {
        placeholder: 'Position',
        width: '100%',
        bindingOptions: {
            value: 'position'
        }
    };
    $scope.txt_website = {
        placeholder: 'Website',
        width: '100%',
        bindingOptions: {
            value: 'website'
        }
    };
    $scope.txt_linkedin = {
        placeholder: 'LinkedIn URL',
        width: '100%',
        bindingOptions: {
            value: 'linkedIn'
        }
    };
    $scope.txt_location = {
        placeholder: 'Location (City, Country)',
        width: '100%',
        bindingOptions: {
            value: 'location'
        }
    };
    $scope.tag_group = {
        placeholder: 'Group',
        width:400,
    };

    $scope.passwordValidationRules = {
        validationGroup: 'signupres',
        validationRules: [{

            type: "required",
            message: "Password is required"
        }]
    };

    $scope.confirmPasswordValidationRules = {
        validationGroup: 'signupres',
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
        validationGroup: 'signupres',
        validationRules: [{
            type: "required",
            message: "Email is required"
        }, {
            type: "email",
            message: "Email is invalid"
        }, ]
    };
    $scope.firstName = null;
    $scope.lastName = null;
    $scope.email = null;
    $scope.company = null;
    $scope.degree = null;
    $scope.location = null;
    $scope.position = null;
    $scope.website = null;
    $scope.linkedIn = null;
    $scope.password = null;
    $scope.confirmPassword = null;
    $scope.btn_submit = {
        text: 'SUBMIT',
        type: 'default',
        icon: 'check',
        width: '49%',
        validationGroup: 'signupres',
        onClick: function (e) {
            console.log($scope.grps);
            var result = e.validationGroup.validate();

            if (!result.isValid) {
              //   General.ShowNotify('Please fill in all required fields.', 'error');
                return;
            }

            var dto = {
                Email: $scope.email,
                Password: $scope.password,
                UserName: $scope.email,
                FirstName: $scope.firstName,
                LastName: $scope.lastName,
                Position: $scope.position,
                Website: $scope.website,
                LinkedIn: $scope.linkedIn,
                Location: $scope.location,
                Degree: $scope.degree,
                Company:$scope.company,
            };
            var nets = [];
            $jq.each($scope.grps, function (_i, _d) {
                if (_d)
                    nets.push(_i + 1);
            });
            dto.Groups = nets.join('_');
            
            $scope.loadingVisible = true;
            authService.registerResearcher(dto).then(function (response) {

                // General.ShowNotify(Config.Text_SavedOk, 'success');
                $scope.loadingVisible = false;
                $location.path('/signin');

            }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

        }

    };
    $scope.tag_ds = [
        {Id: 1, Title: '3D Printing Technology'},
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
    $scope.grps = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
    $scope.chk_grp1 = {
        text: '3D Printing Technology',
        //width:'50%',
       // elementAttr:'7',
        bindingOptions: {
            value: 'grps[6]',
            width:'width50',
        }
    };
    
    $scope.chk_grp2 = {
        text: '3D Printing(Concrete)',
        //elementAttr: '1',
       // width: '48%',
        bindingOptions: {
            value: 'grps[0]',
            width: 'width48',
        }
    };
    
    $scope.chk_grp3 = {
        text: '3D Printing(Metal)',
        //elementAttr: '12',
        //width: '50%',
        bindingOptions: {
            value: 'grps[11]',
            width: 'width50',
        }
    };
    
    $scope.chk_grp4 = {
        text: '3D Printing(Ceramic)',
        //elementAttr: '15',
       // width: '48%',
        bindingOptions: {
            value: 'grps[14]',
            width: 'width48',
        }
    };
    
    $scope.chk_grp5 = {
        text: '3D Printing(Polymer)',
        //elementAttr: '14',
        //width: '50%',
        bindingOptions: {
            value: 'grps[13]',
            width: 'width50',
        }
    };
    
    $scope.chk_grp6 = {
        text: '3D Printing(Medical)',
        //elementAttr: '13',
      //  width: '48%',
        bindingOptions: {
            value: 'grps[12]',
            width: 'width48',
        }
    };
    
    $scope.chk_grp7 = {
        text: '3D Printing(Dental)',
        //elementAttr: '11',
       // width: '50%',
        bindingOptions: {
            value: 'grps[10]',
            width: 'width50',
        }
    };
    
    $scope.chk_grp8 = {
        text: '3D Printing(Software)',
        //elementAttr: '8',
       // width: '48%',
        bindingOptions: {
            value: 'grps[7]',
            width: 'width48',
        }
    };
    
    $scope.chk_grp9 = {
        text: 'Material Engineering',
        //elementAttr: '9',
        //width: '50%',
        bindingOptions: {
            value: 'grps[8]',
            width: 'width50',
        }
    };
    
        $scope.chk_grp10 = {
            text: 'Design for Additive Manufacturing',
            //elementAttr: '5',
            //width: '48%',
            bindingOptions: {
                value: 'grps[4]',
                width: 'width48',
            }
        };
    
    $scope.chk_grp11 = {
        text: 'Hybrid Additive Manufacturing',
        //elementAttr: '6',
        //width: '50%',
        bindingOptions: {
            value: 'grps[5]',
            width: 'width50',
        }
    };
    
    $scope.chk_grp12 = {
        text: 'Product liability and regulatory',
        //elementAttr: '10',
       // width: '48%',
        bindingOptions: {
            value: 'grps[9]',
            width: 'width48',
        }
    };
    
    $scope.chk_grp13 = {
        text: 'Business Development',
        //elementAttr: '3',
        //width: '50%',
        bindingOptions: {
            value: 'grps[2]',
            width: 'width50',
        }
    };
    
    $scope.chk_grp14 = {
        text: 'Artificial Intelligence',
        //elementAttr: '4',
        //width: '48%',
        bindingOptions: {
            value: 'grps[3]',
            width: 'width48',
        }
    };
    
    $scope.chk_grp15 = {
        text: 'Internet of Things(IoT)',
        //elementAttr: '2',
        //width: '50%',
        bindingOptions: {
            value: 'grps[1]',
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
            $scope.width48= '100%';

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
        
        $jq('.signup').fadeIn(400, function () {
            //$jq('#Top_bar').show();
            // $rootScope.pageFunctions();
            var h = $jq('.signin-box2').height();
            console.log(h);
        });
        $rootScope.$broadcast('PageLoaded', 'signup');
    });

    ///end


}]);