'use strict';
app.controller('profileController', ['$scope', '$location', '$routeParams', '$rootScope', 'pageService', 'authService', function ($scope, $location, $routeParams, $rootScope, pageService, authService) {

    var $jq = jQuery.noConflict();
    $scope.isEditable = false;
    $scope.prms = $routeParams.prms;
    $scope.profileId = $routeParams.id;
    

    $scope.profile = Enumerable.From($rootScope.researchers).Where('$.Id==' + $scope.profileId).FirstOrDefault();
    $scope.IsAccomplishmentsVisible = false;
    $scope.publications_title = "";
    $scope.IsPublicationsVisible = false;
    $scope.patents_title = "";
    $scope.IsPatentsVisible = false;
    $scope.certifications_title = "";
    $scope.IsCertificationsVisible = false;
    $scope.projects_title = "";
    $scope.IsProjectsVisible = false;
    $scope.awards_title = "";
    $scope.IsAwardsVisible = false;
    if ($scope.profile) {
        $scope.profile.Picture = '../../content/upload/' + $scope.profile.Picture;
        $scope.profile.FirstName = $scope.profile.Name.split(' ')[0];
        $jq.each($scope.profile.Networks, function (_i, _d) {
            $jq("img[data-id='" + _d.Id + "']").toggleClass('circle-gray').addClass('pointer');
        });
        $scope.profile.Activity[0].rateStars = "";
        var score = Math.floor($scope.profile.Activity[0].rate);
        for (var i = 0; i < score; i++) {
            $scope.profile.Activity[0].rateStars +=  '<i class="icon ion-md-star color-p star"   ></i>';
        }
        var rem = Math.floor(5 - $scope.profile.Activity[0].rate);
        var half = (5 - $scope.profile.Activity[0].rate) - rem;
        if (half > 0)
            $scope.profile.Activity[0].rateStars += '<i class="icon ion-md-star-half color-p star"   ></i>';
        for (var j = 0; j < rem; j++) {
            $scope.profile.Activity[0].rateStars += '<i class="icon ion-md-star-outline color-p star"   ></i>';
        }
        if ($scope.profile.Publications) {
            $scope.publications_title = 'Publication' + ($scope.profile.Publications.length > 1 ? 's' : '');
            $scope.IsPublicationsVisible = true;
        }
        if ($scope.profile.Patents) {
            $scope.patents_title = 'Patent' + ($scope.profile.Publications.length > 1 ? 's' : '');
            $scope.IsPatentsVisible = true;
        }
        if ($scope.profile.Projects) {
            $scope.projects_title = 'Project' + ($scope.profile.Publications.length > 1 ? 's' : '');
            $scope.IsProjectsVisible = true;
        }
        if ($scope.profile.Certifications) {
            $scope.certifications_title = 'Certification' + ($scope.profile.Publications.length > 1 ? 's' : '');
            $scope.IsCertificationsVisible = true;
        }
        if ($scope.profile.Awards) {
            $scope.awards_title = 'Award' + ($scope.profile.Publications.length > 1 ? 's' : '');
            $scope.IsAwardsVisible = true;
        }


        $scope.IsAccomplishmentsVisible = $scope.profile.Publications && $scope.profile.Publications.length > 0;
       
    }
    console.log($scope.profile);
    //////////////////////////////
    $scope.click_contact = function () {
        $scope.popup_profile_title = $scope.profile.Name;
        $scope.popup_profile_visible = true;
    };
    ///////////////////////////////////////////
    $scope.popup_profile_visible = false;
    $scope.popup_profile_title = 'Contact Info';
    $scope.popup_profile = {

        shading: true,
        //position: { my: 'left', at: 'left', of: window, offset: '5 0' },
        width: 450,
        //height: function () { return $(window).height() * 0.95 },
        height: 280,
        fullScreen: false,
        showTitle: true,
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

    //close button
    //$scope.popup_profile.toolbarItems[0].options.onClick = function (e) {

    //    $scope.popup_profile_visible = false;

    //};
    ////////////////////////////////////////////
    if (!authService.isAuthorized()) {

         authService.redirectToLogin();
        
    }
    else {
        //alert($rootScope.image);
          //$jq('#link_profile').show();
        $scope.isEditable = $scope.profileId == $rootScope.userId;
       // alert($scope.isEditable);

    }
    //////////////////////////////////////////
    $scope.edit_main = function () {
        $scope.popup_intro_visible = true;
    };
    $scope.scroll_height = 200;
    $scope.scroll_main = {
        scrollByContent: false,
        scrollByThumb: false,
       // bindingOptions: { height: 'scroll_height', }
        height: function () { return $rootScope.popupHeightFull(0.95) - 100; },
    };
    $scope.pop_width = 500;
    $scope.pop_height = 500;
    $scope.popup_intro_visible = false;
    $scope.popup_intro_title = 'Edit Intro';
    $scope.popup_intro= {

        shading: true,
        //position: { my: 'left', at: 'left', of: window, offset: '5 0' },
        width: $rootScope.popupWidth(600,true),
        height: $rootScope.popupHeightFull(0.95),
       // height: 480,
        fullScreen: false,
        showTitle: true,
        dragEnabled: true,
        toolbarItems: [

            { widget: 'dxButton', location: 'after', options: { type: 'default', text: 'Save', icon: 'check', validationGroup: 'profileintroedit', bindingOptions: {} ,}, toolbar: 'bottom' },
        ],

        visible: false,

        closeOnOutsideClick: false,
        onTitleRendered: function (e) {
            // $(e.titleElement).addClass('vahid');
            // $(e.titleElement).css('background-color', '#f2552c');
        },
        onShowing: function (e) {
            $jq('html').addClass('no-yscroll');
            $rootScope.onScrollDisabled = true;
            //var size = $rootScope.getWindowSize();
            //$scope.pop_height = $(window).height() - 30;
            //if (size.width <= 600) {
            //    $scope.pop_width = size.width;
            //    $scope.pop_height = size.height;
            //}

        },
        onShown: function (e) {

        },
        onHiding: function () {
            $jq('html').removeClass('no-yscroll');
            $rootScope.onScrollDisabled = false;
            $scope.popup_intro_visible = false;

        },
        bindingOptions: {
            visible: 'popup_intro_visible',

            title: 'popup_intro_title',

        }
    };
    $scope.popup_intro.toolbarItems[0].options.onClick = function (e) {

        var result = e.validationGroup.validate();

        if (!result.isValid) {
            General.ShowNotify(Config.Text_FillRequired, 'error');
            return;
        }

        //if ($scope.entity.TypeId == 83 && !$scope.entity.PublisherId) {
        //    General.ShowNotify('Please select "Publisher".', 'error');
        //    return;
        //}
        //if ($scope.entity.TypeId == 84 && !$scope.entity.JournalId) {
        //    General.ShowNotify('Please select "Journal / Conference".', 'error');
        //    return;
        //}

        //if ($scope.isNew)
        //    $scope.entity.Id = -1;

        //$scope.entity.DateRelease = new Date($scope.entity.DateRelease).ToUTC();


        //$scope.loadingVisible = true;
        //libraryService.save($scope.entity).then(function (response) {

        //    $scope.clearEntity();


        //    General.ShowNotify(Config.Text_SavedOk, 'success');

        //    $rootScope.$broadcast('onLibrarySaved', response);



        //    $scope.loadingVisible = false;
        //    if (!$scope.isNew)
        //        $scope.popup_add_visible = false;



        //}, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });


    };

    /////////////////////////////////////////
    $scope.txt_first_name = {
        placeholder: 'First Name',
        bindingOptions: {
           // width: 'width1'
        }

    };
    $scope.txt_last_name = {
        placeholder: 'Last Name',
        bindingOptions: {
            //width: 'width2'
        }

    };
    $scope.txt_university = {
        placeholder: 'Company or University',
        bindingOptions: {
            //width: 'width2'
        }

    };
    $scope.txt_zip_code = {
        placeholder: 'Zip code',
        bindingOptions: {
            //width: 'width2'
        }

    };
    $scope.txt_state = {
        placeholder: 'State',
        bindingOptions: {
            //width: 'width2'
        }

    };
    $scope.txt_city = {
        placeholder: 'City',
        bindingOptions: {
            //width: 'width2'
        }

    };
    $scope.txt_linkedin = {
        placeholder: 'LinkedIn URL',
        bindingOptions: {
            //width: 'width2'
        }

    };
    $scope.txt_twitter = {
        placeholder: 'Twitter',
        bindingOptions: {
            //width: 'width2'
        }

    };
    $scope.txt_headline = {
        placeholder: 'Headline',
        bindingOptions: {
            //width: 'width2'
        }

    };
    $scope.txt_email = {
        placeholder: 'Email',
        mode: "email",
        bindingOptions: {
            //width: 'width2'
        }
    };
    $scope.txt_website = {
        placeholder: 'Website',
        mode:'url',
        bindingOptions: {
            //width: 'width2'
        }

    };
    $scope.sb_study_field = {

        showClearButton: true,
        searchEnabled: true,
        //dataSource: $rootScope.researchers,
        placeholder: 'Field of Study',
        //displayExpr: "Name",
        //valueExpr: 'Id',
        bindingOptions: {
           // value: 'entity.CategoryId',

        }
    };
    $scope.sb_degree = {

        showClearButton: true,
        searchEnabled: true,
        //dataSource: $rootScope.researchers,
        placeholder: 'Degree',
        //displayExpr: "Name",
        //valueExpr: 'Id',
        bindingOptions: {
            // value: 'entity.CategoryId',

        }
    };
    $scope.sb_position = {

        showClearButton: true,
        searchEnabled: true,
        //dataSource: $rootScope.researchers,
        placeholder: 'Position',
        //displayExpr: "Name",
        //valueExpr: 'Id',
        bindingOptions: {
            // value: 'entity.CategoryId',

        }
    };
    $scope.sb_country = {

        showClearButton: true,
        searchEnabled: true,
        //dataSource: $rootScope.researchers,
        placeholder: 'Country',
        //displayExpr: "Name",
        //valueExpr: 'Id',
        bindingOptions: {
            // value: 'entity.CategoryId',

        }
    };

    $scope.add_click = function ($event, type) {
        $event.stopPropagation();
       
    };
    $scope.edit_click = function ($event, type,id) {
        $event.stopPropagation();
        alert(id);

    };
    $scope.remove_click = function ($event, type, id) {
        $event.stopPropagation();
        alert(id);

    };
    //////////////////////////////////////////

    $scope.$on('$viewContentLoaded', function () {
        // alert('about');

        $jq('.profile').fadeIn(400, function () {
            //$jq('#Top_bar').show();
            // $rootScope.pageFunctions();
           // AOS.init();
        });
        var wbar_width = $jq('.wbar').innerWidth()-4;
       
        var bar_margin = $jq('.section_wrapper').offset().left;
        $jq('.wbar').width($jq(window).width() - bar_margin*1);
        $jq('.bar').css('margin-left', bar_margin + 'px').width($jq(window).width() - bar_margin * 2);
        $jq('.activity').width($jq('.bar').width());


        var acc = document.getElementsByClassName("accordion");
        var i;

        for (i = 0; i < acc.length; i++) {
            acc[i].onclick = function () {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                    $jq(panel).fadeOut();
                } else {
                    $jq(panel).fadeIn();
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            }
        }



        $rootScope.$broadcast('PageLoaded', 'Profile');
    });

    ///end


}]);
