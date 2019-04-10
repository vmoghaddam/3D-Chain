app.controller("headerMainController", ['$scope', '$rootScope', '$routeParams', '$location', 'authService', function ($scope, $rootScope, $routeParams, $location, authService) {

    $scope.btn_signin = {
        text: 'SIGN IN',
        type: 'default',
        icon: 'check',
        width: '100%',

        onClick: function (e) {

        }

    };


    var $jq = jQuery.noConflict();
    // $('.' + $scope.type).show();
    //$('.' + $scope.type).addClass('active');
    $scope.IsSignInVisible = $scope.type != 'signin' && $scope.type != 'signup';
    $scope.menu_click = function (e) {

        var $elem = $jq(e.target);
        if (!$elem.hasClass('menu-container'))
            $elem = $elem.parent();
        //x.classList.toggle("change");
        if ($elem.hasClass('change'))
            closeNav();
        else
            openNav();
        $elem.toggleClass("change");
        $jq('#img_cnt').toggleClass("hide");

    };




    function openNav() {
        //  document.getElementById("myNav").style.width = "100%";
        document.getElementById("myNav").style.height = "100%";
        if ($scope.IsSignInVisible)
            $jq('#_lnk_signin').show();
        else
            $jq('#_lnk_signin').hide();

        if ($scope.ProfileVisible)
            $jq('._lnk_profile').show();
        else
            $jq('._lnk_profile').hide();
    }

    /* Close when someone clicks on the "x" symbol inside the overlay */
    function closeNav() {
        // document.getElementById("myNav").style.width = "0%";
        document.getElementById("myNav").style.height = "0%";
    }
    $scope.ProfileVisible = false;
    $scope.IsSignInVisible = false;

    if (!authService.isAuthorized()) {

        //authService.redirectToLogin();
        //$jq('#link_signin').show();
        $scope.IsSignInVisible = true;
    }
    else {
        //alert($rootScope.image);
       // $jq('#link_profile').show();
        $scope.ProfileVisible = true;

    }
    
    $rootScope.link_profile_click = function () {
        $scope.popup_profile_visible = true;

    };
    ///////////////////////////////////
    //alert($jq('#link_profile').css('left'));
    var x = $jq('#link_profile').offset();

    //  alert(x.top);
    var _ox = (x.left + 90) - 30;
    var _oy = 60 + 60;
    var _offset = _ox + ' ' + _oy;
    $scope.popup_profile_visible = false;
    $scope.popup_profile_title = $rootScope.userTitle;
    $scope.popup_profile = {
        // position: { of: '#link_profile'},
        shading: true,
       
        position: {
            //my: 'left',
            at: 'top left',
            of: window,
            offset: _offset
        },
        width: 180,
        //height: function () { return $(window).height() * 0.95 },
        height: 120,
        fullScreen: false,
        showTitle: false,
        dragEnabled: true,
        toolbarItems: [

            //{ widget: 'dxButton', location: 'after', options: { type: 'danger', text: 'Close', icon: 'remove', }, toolbar: 'bottom' }
        ],

        visible: false,

        closeOnOutsideClick: true,
        onTitleRendered: function (e) {
            // $(e.titleElement).addClass('vahid');
            // $(e.titleElement).css('background-color', '#f2552c');
        },
        onShowing: function (e) {



        },
        onShown: function (e) {

        },
        onHiding: function () {


            $scope.popup_profile_visible = false;

        },
        bindingOptions: {
            visible: 'popup_profile_visible',

            title: 'popup_profile_title',

        }
    };
    //$rootScope.logOut
    $scope.signOut = function () {
       
        $rootScope.logOut();
    };
    /////////////////////////////////

    $rootScope.$broadcast('PageLoaded', 'header');
    //end scope
}]);