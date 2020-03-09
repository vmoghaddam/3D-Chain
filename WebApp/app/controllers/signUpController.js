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
        }
          
    };
    $scope.txt_last_name = {
        width: '100%',
        placeholder: 'Last Name',
        bindingOptions: {
            
        }
        
    };
    $scope.txt_email = {
        width: '100%',
        placeholder: 'Email',
        mode: "email",
    };
    $scope.txt_password = {
        placeholder: 'Password',
        mode: "password",
        width: '100%',
        bindingOptions: {
             
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
             
        }
    };
    $scope.txt_company = {
        placeholder: 'Company or University',
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
    $scope.txt_website = {
        placeholder: 'Website',
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
    $scope.txt_location = {
        placeholder: 'Location (City, Country)',
        width: '100%',
        bindingOptions: {
            
        }
    };
    $scope.tag_group = {
        placeholder: 'Group',
        width:400,
    };
    $scope.btn_submit = {
        text: 'SUBMIT',
        type: 'default',
        icon: 'check',
        width: '49%',

        onClick: function (e) {
           
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
    
    $scope.chk_grp1 = {
        text: '3D Printing Technology',
        //width:'50%',
        bindingOptions: {
            value: 'false',
            width:'width50',
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