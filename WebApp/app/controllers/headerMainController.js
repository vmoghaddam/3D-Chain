app.controller("headerMainController", function ($scope, $rootScope, $routeParams, $location) {

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

    };




    function openNav() {
        //  document.getElementById("myNav").style.width = "100%";
        document.getElementById("myNav").style.height = "100%";
    }

    /* Close when someone clicks on the "x" symbol inside the overlay */
    function closeNav() {
        // document.getElementById("myNav").style.width = "0%";
        document.getElementById("myNav").style.height = "0%";
    }


    $rootScope.$broadcast('PageLoaded', 'header');
    //end scope
});