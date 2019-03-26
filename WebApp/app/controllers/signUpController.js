'use strict';
app.controller('signUpController', ['$scope', '$location', '$routeParams', '$rootScope', 'pageService', 'authService', '$route', function ($scope, $location, $routeParams, $rootScope, pageService, authService,$route) {

    var $jq = jQuery.noConflict();
    $scope.prms = $routeParams.prms;
    $scope.width1 = '50%';
    $scope.width2 = '49%';
    $scope.width33 = '33%';
    $scope.width32 = '32%';
    $scope.width100 = '33%';
    /////////////////////////////////////////////
    $scope.txt_first_name = {
        placeholder: 'First Name',
        bindingOptions: {
            width:'width1'
        }
          
    };
    $scope.txt_last_name = {
        placeholder: 'Last Name',
        bindingOptions: {
            width: 'width2'
        }
        
    };
    $scope.txt_email = {
        placeholder: 'Email',
        mode: "email",
    };
    $scope.txt_password = {
        placeholder: 'Password',
        mode: "password",
        bindingOptions: {
            width: 'width1'
        }
    };
    $scope.txt_confirm_password = {
        placeholder: 'Confirm Password',
        mode: "password",
        bindingOptions: {
            width: 'width2'
        }
    };
    $scope.txt_degree = {
        placeholder: 'Degree',
        bindingOptions: {
            width: 'width1'
        }
    };
    $scope.txt_company = {
        placeholder: 'Company or University',
        bindingOptions: {
            width: 'width2'
        }
    };
    $scope.txt_position = {
        placeholder: 'Position',
        bindingOptions: {
            width: 'width1'
        }
    };
    $scope.txt_website = {
        placeholder: 'Website',
        bindingOptions: {
            width: 'width2'
        }
    };
    $scope.txt_linkedin = {
        placeholder: 'LinkedIn URL',
        bindingOptions: {
            width: 'width1'
        }
    };
    $scope.txt_location = {
        placeholder: 'Location (City, Country)',
        bindingOptions: {
            width: 'width2'
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
        
        bindingOptions: {
            value: 'false',
            width:'width33',
        }
    };
    
    $scope.chk_grp2 = {
        text: '3D Printing(Concrete)',
        
        bindingOptions: {
            value: 'false',
            width: 'width33',
        }
    };
    
    $scope.chk_grp3 = {
        text: '3D Printing(Metal)',
       
        bindingOptions: {
            value: 'false',
            width:'width32',
        }
    };
    
    $scope.chk_grp4 = {
        text: '3D Printing(Ceramic)',
       
        bindingOptions: {
            value: 'false',
            width: 'width33',
        }
    };
    
    $scope.chk_grp5 = {
        text: '3D Printing(Polymer)',
        
        bindingOptions: {
            value: 'false',
            width: 'width33',
        }
    };
    
    $scope.chk_grp6 = {
        text: '3D Printing(Medical)',
        
        bindingOptions: {
            value: 'false',
            width: 'width32',
        }
    };
    
    $scope.chk_grp7 = {
        text: '3D Printing(Dental)',
        
        bindingOptions: {
            value: 'false',
            width: 'width33',
        }
    };
    
    $scope.chk_grp8 = {
        text: '3D Printing(Software)',
        
        bindingOptions: {
            value: 'false',
            width: 'width33',
        }
    };
    
    $scope.chk_grp9 = {
        text: 'Material Engineering',
        
        bindingOptions: {
            value: 'false',
            width: 'width32',
        }
    };
    
        $scope.chk_grp10 = {
            text: 'Design for Additive Manufacturing',
            
            bindingOptions: {
                value: 'false',
                width: 'width100',
            }
        };
    
    $scope.chk_grp11 = {
        text: 'Hybrid Additive Manufacturing',
        width: '49%',
        bindingOptions: {
            value: 'false',
            width: 'width100',
        }
    };
    
    $scope.chk_grp12 = {
        text: 'Product liability and regulatory',
        
        bindingOptions: {
            value: 'false',
            width: 'width100',
        }
    };
    
    $scope.chk_grp13 = {
        text: 'Business Development',
        
        bindingOptions: {
            value: 'false',
            width: 'width100',
        }
    };
    
    $scope.chk_grp14 = {
        text: 'Artificial Intelligence',
  
        bindingOptions: {
            value: 'false',
            width: 'width100',
        }
    };
    
    $scope.chk_grp15 = {
        text: 'Internet of Things(IoT)',
        width: '49%',
        bindingOptions: {
            value: 'false',
        }
    };



     
    //////////////////////////////////////////
    $jq(window).on('resize', function () {
        if ($jq(window).width() < 768) {
            $scope.width1 = '100%';
            $scope.width2 = '100%';
            $scope.width33 = '49%';
            $scope.width32 = '49%';
            $scope.width100 = '100%';
        }
        else {
            $scope.width1 = '50%';
            $scope.width2 = '49%';
            $scope.width33 = '33%';
            $scope.width32 = '32%';
            $scope.width100 = '33%';
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
        }
        else {
            $scope.width1 = '50%';
            $scope.width2 = '49%';
            $scope.width33 = '33%';
            $scope.width32 = '32%';
            $scope.width100 = '33%';
        }
        
        $jq('.signup').fadeIn(400, function () {
            //$jq('#Top_bar').show();
            // $rootScope.pageFunctions();
            
        });
        $rootScope.$broadcast('PageLoaded', 'signup');
    });

    ///end


}]);