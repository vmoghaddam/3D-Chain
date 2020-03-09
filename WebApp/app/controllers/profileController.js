'use strict';
app.controller('profileController', ['$scope', '$location', '$routeParams', '$rootScope', 'pageService', 'userService', 'reviewService', 'authService', '$http', '$q', '$window', function ($scope, $location, $routeParams, $rootScope, pageService, userService, reviewService, authService, $http, $q, $window) {

    var $jq = jQuery.noConflict();
    $jq('body').on('click', '.link-profile', function (e) {
        // do something
        e.preventDefault();
        var id = $jq(this).data('uid');
        // $rootScope.navigate('/profile/'+id);
        $window.open('#!/profile/' + id);

    });
    $jq("link[href='content/css/wp-shortcodes.css?ver=20.9.6.2']").remove();
    $scope.isEditable = false;
    $scope.prms = $routeParams.prms;
    $scope.profileId = $routeParams.id;
    $scope.isFullScreen = false;
    if ($jq(window).width() < 400)
        $scope.isFullScreen = true;


    $scope.IsAccomplishmentsVisible = false;
    $scope.IsActivityVisible = false;
    $scope.publications_title = "Publications";
    $scope.IsPublicationsVisible = false;
    $scope.patents_title = "Patents";
    $scope.IsPatentsVisible = false;
    $scope.certifications_title = "Certifications";
    $scope.IsCertificationsVisible = false;
    $scope.projects_title = "Projects";
    $scope.IsProjectsVisible = false;
    $scope.awards_title = "Honor and Awards";
    $scope.IsAwardsVisible = false;
    $scope.profile = null;



    $scope.user = {};
    $scope.review = {
    };
    $scope.publication = {
        Id: -1,
        Title: null,
        Date: null,
        Publisher: null,
        PersonId: $scope.profileId,
    };
    $scope.clear_publication = function () {
        $scope.publication.Id = -1;
        $scope.publication.Title = null;
        $scope.publication.Date = null;
        $scope.publication.Publisher = null;
    };
    $scope.bind_publication = function (data) {
        $scope.publication.Id = data.Id;
        $scope.publication.Title = data.Title;
        $scope.publication.Date = data.Date;
        $scope.publication.Publisher = data.Publisher;
    };



    $scope.project = {
        Id: -1,
        Title: null,
        Date: null,
        PersonId: $scope.profileId,
    };
    $scope.clear_project = function () {
        $scope.project.Id = -1;
        $scope.project.Title = null;
        $scope.project.Date = null;

    };
    $scope.bind_project = function (data) {
        $scope.project.Id = data.Id;
        $scope.project.Title = data.Title;
        $scope.project.Date = data.Date;

    };

    $scope.patent = {
        Id: -1,
        Title: null,
        Date: null,
        Issuer: null,
        PersonId: $scope.profileId,
    };
    $scope.clear_patent = function () {
        $scope.patent.Id = -1;
        $scope.patent.Title = null;
        $scope.patent.Date = null;
        $scope.patent.Issuer = null;

    };
    $scope.bind_patent = function (data) {
        $scope.patent.Id = data.Id;
        $scope.patent.Title = data.Title;
        $scope.patent.Date = data.Date;
        $scope.patent.Issuer = data.Issuer;

    };



    $scope.award = {
        Id: -1,
        Title: null,
        Date: null,
        Issuer: null,
        PersonId: $scope.profileId,
    };
    $scope.clear_award = function () {
        $scope.award.Id = -1;
        $scope.award.Title = null;
        $scope.award.Date = null;
        $scope.award.Issuer = null;

    };
    $scope.bind_award = function (data) {
        $scope.award.Id = data.Id;
        $scope.award.Title = data.Title;
        $scope.award.Date = data.Date;
        $scope.award.Issuer = data.Issuer;

    };

    $scope.certification = {
        Id: -1,
        Title: null,
        Authority: null,
        PersonId: $scope.profileId,

    };
    $scope.clear_certification = function () {
        $scope.certification.Id = -1;
        $scope.certification.Title = null;
        $scope.certification.Authority = null;
    };
    $scope.bind_certification = function (data) {
        $scope.certification.Id = data.Id;
        $scope.certification.Title = data.Title;
        $scope.certification.Authority = data.Authority;

    };



    //////////////////////////////
    $scope.click_contact = function () {
        $scope.popup_profile_title = $scope.profile.User.Name;
        $scope.popup_profile_visible = true;
    };
    ///////////////////////////////////////////
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
    ///////////////////////////////////////////
    $scope.popup_profile_visible = false;
    $scope.popup_profile_title = 'Contact Info';
    $scope.popup_profile = {

        shading: true,
        //position: { my: 'left', at: 'left', of: window, offset: '5 0' },
        
         width: $rootScope.popupWidth(450, true),
        height: $rootScope.popupHeight(280, true),
        //fullScreen: false,
        showTitle: true,
        dragEnabled: true,
        toolbarItems: [

            { widget: 'dxButton', location: 'after', options: { type: 'normal', text: 'Close', icon: 'remove', onClick: function (e) { $scope.popup_profile_visible = false; } }, toolbar: 'bottom' }
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
            fullScreen:'isFullScreen',
            title: 'popup_profile_title',

        }
    };

    //close button
    //$scope.popup_profile.toolbarItems[0].options.onClick = function (e) {

    //    $scope.popup_profile_visible = false;

    //};
    ////////////////////////////////////////////
    if (!authService.isAuthorized()) {

      //  authService.redirectToLogin();

    }
    else {
        //alert($rootScope.image);
        //$jq('#link_profile').show();
        $scope.isEditable = $scope.profileId == $rootScope.userId;
        // alert($scope.isEditable);

    }
    //////////////////////////////////////////
    $scope.edit_main = function () {
        $scope.user = JSON.parse(JSON.stringify($scope.profile.User));
        $scope.popup_intro_visible = true;
    };
    
    $scope.take_photo = function () {
        
        $scope.popup_photo_visible = true;
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
    $scope.popup_intro = {

        shading: true,
        //position: { my: 'left', at: 'left', of: window, offset: '5 0' },
        width: $rootScope.popupWidth(600, true),
        height: $rootScope.popupHeightFull(0.95),
        // height: 480,
        //fullScreen: false,
        showTitle: true,
        dragEnabled: true,
        toolbarItems: [

            { widget: 'dxButton', location: 'after', options: { type: 'default', text: 'Save', icon: 'check', validationGroup: 'profileintro', bindingOptions: {}, }, toolbar: 'bottom' },
            { widget: 'dxButton', location: 'after', options: { type: 'normal', text: 'Close', icon: 'remove', onClick: function (e) { $scope.popup_intro_visible = false; } }, toolbar: 'bottom' }
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
            $scope.user = {};
            $jq('html').removeClass('no-yscroll');
            $rootScope.onScrollDisabled = false;
            $scope.popup_intro_visible = false;

        },
        bindingOptions: {
            visible: 'popup_intro_visible',
            fullScreen: 'isFullScreen',
            title: 'popup_intro_title',

        }
    };
    $scope.popup_intro.toolbarItems[0].options.onClick = function (e) {

        var result = e.validationGroup.validate();

        if (!result.isValid) {
            General.ShowNotify(Config.Text_FillRequired, 'error');
            return;
        }
         

        $scope.loadingVisible = true;
        userService.saveUser($scope.user).then(function (response) {
             
            General.ShowNotify(Config.Text_SavedOk, 'success');
             $scope.loadingVisible = false;
            $scope.popup_intro_visible = false;
            $scope.profile.User = JSON.parse(JSON.stringify(response));
           


        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });


    };
    ///////////////////////////////////////
    $scope.popup_publication_visible = false;
    $scope.popup_patent_visible = false;
    $scope.popup_project_visible = false;
    $scope.popup_certification_visible = false;
    $scope.popup_award_visible = false;
    $scope.popup_photo_visible = false;
    $scope.popup_review_visible = false;
    $scope.popup_network_visible = false;
    $scope.popup_res_visible = false;

    $scope.popup_publication_title = 'Publication';
    $scope.popup_patent_title = 'Patent';
    $scope.popup_project_title = 'Project';
    $scope.popup_certification_title = 'Certification';
    $scope.popup_award_title = 'Award';
    $scope.popup_photo_title = 'Photo';
    $scope.popup_review_title = 'Review';
    $scope.popup_network_title = 'Networks';
    $scope.popup_res_title = 'Researchers';

    $scope.popup_acc_title = 'Top 4 Publication, Patent, Certification, Projects, or Honors and Awards';
    $scope.popup_acc_visible = false;

    $scope.popup_res = {
        shading: true,
        width: $rootScope.popupWidth(1000, true),
        height: $rootScope.popupHeight2( 0.9),
        // fullScreen: false,
        showTitle: true,
        dragEnabled: true,
        toolbarItems: [
             
            { widget: 'dxButton', location: 'after', options: { type: 'normal', text: 'Close', icon: 'remove', onClick: function (e) { $scope.popup_res_visible = false; } }, toolbar: 'bottom' }
        ],
        visible: false,
        closeOnOutsideClick: false,
        onShowing: function (e) {
            $jq('html').addClass('no-yscroll');
            $rootScope.onScrollDisabled = true;

        },
        onShown: function (e) {
            if ($scope.dg_instance)
                $scope.dg_instance.refresh();
            if ($scope.dg_instance_xs)
                $scope.dg_instance_xs.refresh();
        },
        onHiding: function () {
            $scope.clear_publication();
            $jq('html').removeClass('no-yscroll');
            $rootScope.onScrollDisabled = false;
            $scope.popup_res_visible = false;

        },
        bindingOptions: {
            visible: 'popup_res_visible',
            fullScreen: 'isFullScreen',
            title: 'popup_res_title',

        }
    };

    $scope.popup_publication = {
        shading: true,
        width: $rootScope.popupWidth(600, true),
        height: $rootScope.popupHeight(210, true),
       // fullScreen: false,
        showTitle: true,
        dragEnabled: true,
        toolbarItems: [
            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'default', text: 'Save', icon: 'check', validationGroup: 'profilepublication', bindingOptions: {},
                    onClick: function (e) {
                        var result = e.validationGroup.validate();
                        
                        if (!result.isValid) {
                            General.ShowNotify(Config.Text_FillRequired, 'error');
                            return;
                        }

                        $scope.loadingVisible = true;
                        $scope.publication.Date = (new Date($scope.publication.Date)).ToUTC();
                        userService.savePublication($scope.publication).then(function (response) {
                           
                            General.ShowNotify(Config.Text_SavedOk, 'success');
                            $scope.loadingVisible = false;
                            var obj;
                            if ($scope.publication.Id == -1) {
                                obj = JSON.parse(JSON.stringify($scope.publication));
                                obj.Id = response.Id;
                                obj.DateStr = moment($scope.publication.Date).format('MMMM YYYY');
                                $scope.profile.Publications.push(obj);
                            }
                            else {
                                obj = Enumerable.From($scope.profile.Publications).Where('$.Id==' + $scope.publication.Id).First();
                                obj.DateStr = moment($scope.publication.Date).format('MMMM YYYY');
                                obj.Title = $scope.publication.Title;
                                obj.Publisher = $scope.publication.Publisher;
                                obj.Date = $scope.publication.Date;

                            }
                            $scope.profile.Publications = Enumerable.From($scope.profile.Publications)
                                .OrderByDescending("$.Date")
                                .ToArray();
                            $scope.refreshAccordionPanel('publication_panel');
                            $scope.clear_publication();
                           
                            $scope.popup_publication_visible = false;



                        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

                    }
                }, toolbar: 'bottom'
            },
            { widget: 'dxButton', location: 'after', options: { type: 'normal', text: 'Close', icon: 'remove', onClick: function (e) { $scope.popup_publication_visible = false; } }, toolbar: 'bottom' }
        ],
        visible: false,
        closeOnOutsideClick: false,
        onShowing: function (e) {
            $jq('html').addClass('no-yscroll');
            $rootScope.onScrollDisabled = true;

        },
        onShown: function (e) {

        },
        onHiding: function () {
            $scope.clear_publication();
            $jq('html').removeClass('no-yscroll');
            $rootScope.onScrollDisabled = false;
            $scope.popup_publication_visible = false;

        },
        bindingOptions: {
            visible: 'popup_publication_visible',
            fullScreen: 'isFullScreen',
            title: 'popup_publication_title',

        }
    };

    $scope.popup_project = {
        shading: true,
        width: $rootScope.popupWidth(600, true),
        height: $rootScope.popupHeight(210, true),
       // fullScreen: false,
        showTitle: true,
        dragEnabled: true,
        toolbarItems: [
            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'default', text: 'Save', icon: 'check', validationGroup: 'profileproject', bindingOptions: {},
                    onClick: function (e) {
                        var result = e.validationGroup.validate();

                        if (!result.isValid) {
                            General.ShowNotify(Config.Text_FillRequired, 'error');
                            return;
                        }

                        $scope.loadingVisible = true;
                        $scope.project.Date = (new Date($scope.project.Date)).ToUTC();
                        userService.saveProject($scope.project).then(function (response) {

                            General.ShowNotify(Config.Text_SavedOk, 'success');
                            $scope.loadingVisible = false;
                            var obj;
                            if ($scope.project.Id == -1) {
                                obj = JSON.parse(JSON.stringify($scope.project));
                                obj.Id = response.Id;
                                obj.DateStr = moment($scope.project.Date).format('MMMM YYYY');
                                $scope.profile.Projects.push(obj);
                            }
                            else {
                                obj = Enumerable.From($scope.profile.Projects).Where('$.Id==' + $scope.project.Id).First();
                                obj.DateStr = moment($scope.project.Date).format('MMMM YYYY');
                                obj.Title = $scope.project.Title;
                                obj.Date = $scope.project.Date;

                            }
                            $scope.profile.Projects = Enumerable.From($scope.profile.Projects)
                                .OrderByDescending("$.Date")
                                .ToArray();
                            $scope.refreshAccordionPanel('project_panel');
                            $scope.clear_project();

                            $scope.popup_project_visible = false;



                        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });


                    }
                }, toolbar: 'bottom'
            },
            { widget: 'dxButton', location: 'after', options: { type: 'normal', text: 'Close', icon: 'remove', onClick: function (e) { $scope.popup_project_visible = false; } }, toolbar: 'bottom' }
        ],
        visible: false,
        closeOnOutsideClick: false,
        onShowing: function (e) {
            $jq('html').addClass('no-yscroll');
            $rootScope.onScrollDisabled = true;

        },
        onShown: function (e) {

        },
        onHiding: function () {
            $jq('html').removeClass('no-yscroll');
            $rootScope.onScrollDisabled = false;
            $scope.popup_project_visible = false;

        },
        bindingOptions: {
            visible: 'popup_project_visible',
            fullScreen: 'isFullScreen',
            title: 'popup_project_title',

        }
    };


    $scope.popup_patent = {
        shading: true,
        width: $rootScope.popupWidth(600, true),
        height: $rootScope.popupHeight(210, true),
       // fullScreen: false,
        showTitle: true,
        dragEnabled: true,
        toolbarItems: [
            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'default', text: 'Save', icon: 'check', validationGroup: 'profilepatent', bindingOptions: {},
                    onClick: function (e) {
                        var result = e.validationGroup.validate();

                        if (!result.isValid) {
                            General.ShowNotify(Config.Text_FillRequired, 'error');
                            return;
                        }


                        $scope.loadingVisible = true;
                        $scope.patent.Date = (new Date($scope.patent.Date)).ToUTC();
                        userService.savePatent($scope.patent).then(function (response) {

                            General.ShowNotify(Config.Text_SavedOk, 'success');
                            $scope.loadingVisible = false;
                            var obj;
                            if ($scope.patent.Id == -1) {
                                obj = JSON.parse(JSON.stringify($scope.patent));
                                obj.Id = response.Id;
                                obj.DateStr = moment($scope.patent.Date).format('MMMM YYYY');
                                $scope.profile.Patents.push(obj);
                            }
                            else {
                                obj = Enumerable.From($scope.profile.Patents).Where('$.Id==' + $scope.patent.Id).First();
                                obj.DateStr = moment($scope.publication.Date).format('MMMM YYYY');
                                obj.Title = $scope.patent.Title;
                                obj.Issuer = $scope.patent.Issuer;
                                obj.Date = $scope.patent.Date;

                            }
                            $scope.profile.Patents = Enumerable.From($scope.profile.Patents)
                                .OrderByDescending("$.Date")
                                .ToArray();
                            $scope.refreshAccordionPanel('patent_panel');
                            $scope.clear_patent();

                            $scope.popup_patent_visible = false;



                        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });


                    }
                }, toolbar: 'bottom'
            },
            { widget: 'dxButton', location: 'after', options: { type: 'normal', text: 'Close', icon: 'remove', onClick: function (e) { $scope.popup_patent_visible = false; } }, toolbar: 'bottom' }
        ],
        visible: false,
        closeOnOutsideClick: false,
        onShowing: function (e) {
            $jq('html').addClass('no-yscroll');
            $rootScope.onScrollDisabled = true;

        },
        onShown: function (e) {

        },
        onHiding: function () {
            $jq('html').removeClass('no-yscroll');
            $rootScope.onScrollDisabled = false;
            $scope.popup_patent_visible = false;

        },
        bindingOptions: {
            visible: 'popup_patent_visible',
            fullScreen: 'isFullScreen',
            title: 'popup_patent_title',

        }
    };


    $scope.popup_certification = {
        shading: true,
        width: $rootScope.popupWidth(600, true),
        height: $rootScope.popupHeight(210, true),
        fullScreen: false,
        showTitle: true,
        dragEnabled: true,
        toolbarItems: [
            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'default', text: 'Save', icon: 'check', validationGroup: 'profilecertification', bindingOptions: {},
                    onClick: function (e) {
                        var result = e.validationGroup.validate();

                        if (!result.isValid) {
                            General.ShowNotify(Config.Text_FillRequired, 'error');
                            return;
                        }

                        $scope.loadingVisible = true;
                        userService.saveCertification($scope.certification).then(function (response) {

                            General.ShowNotify(Config.Text_SavedOk, 'success');
                            $scope.loadingVisible = false;
                            var obj;
                            if ($scope.certification.Id == -1) {
                                obj = JSON.parse(JSON.stringify($scope.certification));
                                obj.Id = response.Id;

                                $scope.profile.Certifications.push(obj);
                            }
                            else {
                                obj = Enumerable.From($scope.profile.Certifications).Where('$.Id==' + $scope.certification.Id).First();
                                obj.Authority = $scope.certification.Authority;
                                obj.Title = $scope.certification.Title;
                                 

                            }
                            $scope.profile.Certifications = Enumerable.From($scope.profile.Certifications)
                                .OrderByDescending("$.Title")
                                .ToArray();
                            $scope.refreshAccordionPanel('certification_panel');
                            $scope.clear_certification();

                            $scope.popup_certification_visible = false;



                        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

                    }
                }, toolbar: 'bottom'
            },
            { widget: 'dxButton', location: 'after', options: { type: 'normal', text: 'Close', icon: 'remove', onClick: function (e) { $scope.popup_certification_visible = false; } }, toolbar: 'bottom' }
        ],
        visible: false,
        closeOnOutsideClick: false,
        onShowing: function (e) {
            $jq('html').addClass('no-yscroll');
            $rootScope.onScrollDisabled = true;

        },
        onShown: function (e) {

        },
        onHiding: function () {
            $jq('html').removeClass('no-yscroll');
            $rootScope.onScrollDisabled = false;
            $scope.popup_certification_visible = false;

        },
        bindingOptions: {
            visible: 'popup_certification_visible',
            fullScreen: 'isFullScreen',
            title: 'popup_certification_title',

        }
    };

    $scope.popup_award = {
        shading: true,
        width: $rootScope.popupWidth(600, true),
        height: $rootScope.popupHeight(210, true),
        fullScreen: false,
        showTitle: true,
        dragEnabled: true,
        toolbarItems: [
            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'default', text: 'Save', icon: 'check', validationGroup: 'profileaward', bindingOptions: {},
                    onClick: function (e) {
                        var result = e.validationGroup.validate();

                        if (!result.isValid) {
                            General.ShowNotify(Config.Text_FillRequired, 'error');
                            return;
                        }



                        $scope.loadingVisible = true;
                        $scope.award.Date = (new Date($scope.award.Date)).ToUTC();
                        userService.saveAward($scope.award).then(function (response) {

                            General.ShowNotify(Config.Text_SavedOk, 'success');
                            $scope.loadingVisible = false;
                            var obj;
                            if ($scope.award.Id == -1) {
                                obj = JSON.parse(JSON.stringify($scope.award));
                                obj.Id = response.Id;
                                obj.DateStr = moment($scope.award.Date).format('MMMM YYYY');
                                $scope.profile.Awards.push(obj);
                            }
                            else {
                                obj = Enumerable.From($scope.profile.Awards).Where('$.Id==' + $scope.award.Id).First();
                                obj.DateStr = moment($scope.award.Date).format('MMMM YYYY');
                                obj.Title = $scope.award.Title;
                                obj.Issuer = $scope.award.Issuer;
                                obj.Date = $scope.award.Date;

                            }
                            $scope.profile.Awards = Enumerable.From($scope.profile.Awards)
                                .OrderByDescending("$.Date")
                                .ToArray();
                            $scope.refreshAccordionPanel('award_panel');
                            $scope.clear_award();

                            $scope.popup_award_visible = false;



                        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });


                    }
                }, toolbar: 'bottom'
            },
            { widget: 'dxButton', location: 'after', options: { type: 'normal', text: 'Close', icon: 'remove', onClick: function (e) { $scope.popup_award_visible = false; } }, toolbar: 'bottom' }
        ],
        visible: false,
        closeOnOutsideClick: false,
        onShowing: function (e) {
            $jq('html').addClass('no-yscroll');
            $rootScope.onScrollDisabled = true;

        },
        onShown: function (e) {

        },
        onHiding: function () {
            $jq('html').removeClass('no-yscroll');
            $rootScope.onScrollDisabled = false;
            $scope.popup_award_visible = false;

        },
        bindingOptions: {
            visible: 'popup_award_visible',
            fullScreen: 'isFullScreen',
            title: 'popup_award_title',

        }
    };

    $scope.popup_review = {
        shading: true,
        width: $rootScope.popupWidth(600, true),
        height: $rootScope.popupHeight(500, true),
        fullScreen: false,
        showTitle: true,
        dragEnabled: true,
        toolbarItems: [
            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'default', text: 'Save', icon: 'check', validationGroup: 'profilereview', bindingOptions: {},
                    onClick: function (e) {
                        var result = e.validationGroup.validate();

                        if (!result.isValid) {
                            General.ShowNotify(Config.Text_FillRequired, 'error');
                            return;
                        }


                        
                        $scope.loadingVisible = true;

                        reviewService.updateReview($scope.review).then(function (response) {

                            General.ShowNotify(Config.Text_SavedOk, 'success');
                            $scope.loadingVisible = false;
                            var data = Enumerable.From($scope.profile.Activity).Where('$.ReviewId==' + $scope.review.Id).FirstOrDefault();
                            data.ReviewAbs = response;

                            $scope.popup_review_visible = false;



                        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });


                    }
                }, toolbar: 'bottom'
            },
            { widget: 'dxButton', location: 'after', options: { type: 'normal', text: 'Close', icon: 'remove', onClick: function (e) { $scope.popup_review_visible = false; } }, toolbar: 'bottom' }
        ],
        visible: false,
        closeOnOutsideClick: false,
        onShowing: function (e) {
            $jq('html').addClass('no-yscroll');
            $rootScope.onScrollDisabled = true;

        },
        onShown: function (e) {
            
        },
        onHiding: function () {
            $jq('html').removeClass('no-yscroll');
            $rootScope.onScrollDisabled = false;
            $scope.review = {};
            $scope.popup_review_visible = false;

        },
        bindingOptions: {
            visible: 'popup_review_visible',
            fullScreen: 'isFullScreen',
            title: 'popup_review_title',

        }
    };

    $scope.popup_photo = {
        shading: true,
        width: $rootScope.popupWidth(400, true),
        height: $rootScope.popupHeight(500, true),
        fullScreen: false,
        showTitle: true,
        dragEnabled: true,
        toolbarItems: [
            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'default', text: 'Save', icon: 'check', validationGroup: 'profileaward', bindingOptions: {},
                    onClick: function (e) {
                        var dto = {
                            Id: $scope.profile.User.Id,
                            Image: $scope.uploadedFileImage
                        };
                        $scope.loadingVisible = true;
                        
                        userService.saveImage(dto).then(function (response) {

                            General.ShowNotify(Config.Text_SavedOk, 'success');
                            $scope.loadingVisible = false;
                            $scope.profile.User.ImageUrl = $scope.uploadedFileImage;
                            $scope.profile.User.ImageUrl2 = $rootScope.clientsFilesUrl + $scope.uploadedFileImage;

                            $scope.popup_photo_visible = false;



                        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

                    }
                }, toolbar: 'bottom'
            },
            { widget: 'dxButton', location: 'after', options: { type: 'normal', text: 'Close', icon: 'remove', onClick: function (e) { $scope.popup_photo_visible = false; } }, toolbar: 'bottom' },
            {
                widget: 'dxButton', location: 'before', options: {
                    type: 'normal', text: 'Use Camera',   validationGroup: 'profileaward',disabled:true, bindingOptions: {},
                    onClick: function (e) {


                    }
                }, toolbar: 'bottom'
            },
             
        ],
        visible: false,
        closeOnOutsideClick: false,
        onShowing: function (e) {
            $scope.uploadedFileImage = $scope.profile.User.ImageUrl;
            $scope.img_url = $scope.profile.User.ImageUrl ? $scope.profile.User.ImageUrl2 : '../../content/images/imguser.png';
            $jq('html').addClass('no-yscroll');
            $rootScope.onScrollDisabled = true;

        },
        onShown: function (e) {

        },
        onHiding: function () {
            $scope.img_url =  '../../content/images/imguser.png';
            $jq('html').removeClass('no-yscroll');
            $rootScope.onScrollDisabled = false;
            $scope.popup_photo_visible = false;

        },
        bindingOptions: {
            visible: 'popup_photo_visible',
            fullScreen: 'isFullScreen',
            title: 'popup_photo_title',

        }
    };
    $scope.scroll_acc = {
        scrollByContent: false,
        scrollByThumb: false,
        // bindingOptions: { height: 'scroll_height', }
        height: function () { return $rootScope.popupHeightFullMax(0.95,900) - 100; },
    };
    $scope.accpubtitle = function (e) {
        var t = $scope.publication.Title && $scope.publication.Title != '';
       
        if (t && !e.value)
            return false;
        else
            return true;
    };
    $scope.accprojecttitle = function (e) {
        var t = $scope.project.Title && $scope.project.Title != '';

        if (t && !e.value)
            return false;
        else
            return true;
    };
    $scope.accawardtitle = function (e) {
        var t = $scope.award.Title && $scope.award.Title != '';

        if (t && !e.value)
            return false;
        else
            return true;
    };
    $scope.acccertificationtitle = function (e) {
        var t = $scope.certification.Title && $scope.certification.Title != '';

        if (t && !e.value)
            return false;
        else
            return true;
    };
    $scope.accpatenttitle = function (e) {
        var t = $scope.patent.Title && $scope.patent.Title != '';

        if (t && !e.value)
            return false;
        else
            return true;
    };
    $scope.popup_acc = {
        shading: true,
        width: $rootScope.popupWidth(600, true),
        height: $rootScope.popupHeightFullMax(0.95,900),
        fullScreen: false,
        showTitle: true,
        dragEnabled: true,
        toolbarItems: [
            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'default', text: 'Save', icon: 'check', validationGroup: 'profileacc', bindingOptions: {},
                    onClick: function (e) {
                        var result = e.validationGroup.validate();

                        if (!result.isValid) {
                            General.ShowNotify(Config.Text_FillRequired, 'error');
                            return;
                        }

                        
                        var dto = {};
                        dto.Id = $scope.profile.User.Id;
                        dto.Publication = JSON.parse(JSON.stringify($scope.publication));
                        
                        dto.Patent = JSON.parse(JSON.stringify($scope.patent));
                       
                        dto.Project = JSON.parse(JSON.stringify($scope.project));
                       
                        dto.Certification = JSON.parse(JSON.stringify($scope.certification));
                       
                        dto.Award = JSON.parse(JSON.stringify($scope.award));
                          $scope.loadingVisible = true;

                        userService.saveAccompolishments(dto).then(function (response) {

                            General.ShowNotify(Config.Text_SavedOk, 'success');
                            $scope.loadingVisible = false;

                            $scope.profile.Accompolishments = JSON.parse(JSON.stringify(response));

                            $scope.popup_acc_visible = false;



                        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

                      
                        
                        //var result = e.validationGroup.validate();

                        //if (!result.isValid) {
                        //    General.ShowNotify(Config.Text_FillRequired, 'error');
                        //    return;
                        //}



                        //$scope.loadingVisible = true;

                        //reviewService.updateReview($scope.review).then(function (response) {

                        //    General.ShowNotify(Config.Text_SavedOk, 'success');
                        //    $scope.loadingVisible = false;
                        //    var data = Enumerable.From($scope.profile.Activity).Where('$.ReviewId==' + $scope.review.Id).FirstOrDefault();
                        //    data.ReviewAbs = response;

                        //    $scope.popup_review_visible = false;



                        //}, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });


                    }
                }, toolbar: 'bottom'
            },
            { widget: 'dxButton', location: 'after', options: { type: 'normal', text: 'Close', icon: 'remove', onClick: function (e) { $scope.popup_acc_visible = false; } }, toolbar: 'bottom' }
        ],
        visible: false,
        closeOnOutsideClick: false,
        onShowing: function (e) {
            $jq('html').addClass('no-yscroll');
            $rootScope.onScrollDisabled = true;

        },
        onShown: function (e) {

        },
        onHiding: function () {
            $jq('html').removeClass('no-yscroll');
            $rootScope.onScrollDisabled = false;
            $scope.clear_publication();
            $scope.clear_patent();
            $scope.clear_project();
            $scope.clear_certification();
            $scope.clear_award();
            $scope.popup_acc_visible = false;

        },
        bindingOptions: {
            visible: 'popup_acc_visible',

            title: 'popup_acc_title',

        }
    };

    $scope.networks = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

    $scope.popup_network = {
        shading: true,
        width: $rootScope.popupWidth(350, true),
        height: $rootScope.popupHeight(490, true),
       // fullScreen: false,
        showTitle: true,
        dragEnabled: true,
        toolbarItems: [
            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'default', text: 'Save', icon: 'check', validationGroup: 'profilenetwork', bindingOptions: {},
                    onClick: function (e) {
                       
                        var ids = [];
                        $jq.each($scope.networks, function (_i, _d) {
                            if (_d)
                                ids.push(_i+1);
                        });
                        var dto = { UserId: $scope.profile.User.Id, Networks:ids };
                        



                        $scope.loadingVisible = true;

                        userService.updateNetworks(dto).then(function (response) {

                            General.ShowNotify(Config.Text_SavedOk, 'success');
                            $scope.loadingVisible = false;
                            
                            $scope.profile.Networks = JSON.parse(JSON.stringify(response));
                            $scope.build_network();
                            $scope.popup_network_visible = false;



                        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });


                    }
                }, toolbar: 'bottom'
            },
            { widget: 'dxButton', location: 'after', options: { type: 'normal', text: 'Close', icon: 'remove', onClick: function (e) { $scope.popup_network_visible = false; } }, toolbar: 'bottom' }
        ],
        visible: false,
        closeOnOutsideClick: false,
        onShowing: function (e) {
            $jq('html').addClass('no-yscroll');
            $rootScope.onScrollDisabled = true;

        },
        onShown: function (e) {

        },
        onHiding: function () {
            $jq.each($scope.networks, function (_i, _d) {
                _d = false;
            });
           
            $jq('html').removeClass('no-yscroll');
            $rootScope.onScrollDisabled = false;
            $scope.review = {};
            $scope.popup_network_visible = false;

        },
        bindingOptions: {
            visible: 'popup_network_visible',
            fullScreen: 'isFullScreen',
            title: 'popup_network_title',

        }
    };

    /////////////////////////////////////////
    $scope.publication_title = {
        placeholder: 'Title',
        bindingOptions: {
            value: 'publication.Title'
        }
    };
    $scope.publication_publisher = {
        placeholder: 'Publisher',
        bindingOptions: {
            value: 'publication.Publisher'
        }
    };
    $scope.publication_date = {
        placeholder: 'Date',
        width: '100%',
        type: "date",
        bindingOptions: {
            value: 'publication.Date'
        }
    };

    $scope.project_title = {
        placeholder: 'Title',
        bindingOptions: {
            value: 'project.Title'
        }
    };
    $scope.project_date = {
        placeholder: 'Date',
        width: '100%',
        type: "date",
        bindingOptions: {
            value: 'project.Date'
        }
    };
    $scope.patent_title = {
        placeholder: 'Title',
        bindingOptions: {
            value: 'patent.Title'
        }
    };
    $scope.patent_issuer = {
        placeholder: 'Issuer',
        //min: 1,
        bindingOptions: {
            value: 'patent.Issuer'
        }
    };
    $scope.patent_date = {
        placeholder: 'Date',
        width: '100%',
        type: "date",
        bindingOptions: {
            value: 'patent.Date'
        }
    };
    $scope.certification_title = {
        placeholder: 'Title',
        bindingOptions: {
            value: 'certification.Title'
        }
    };
    $scope.certification_authority = {
        placeholder: 'Authority',
        bindingOptions: {
            value: 'certification.Authority'
        }
    };
    $scope.award_title = {
        placeholder: 'Title',
        bindingOptions: {
            value: 'award.Title'
        }
    };
    $scope.award_issuer = {
        placeholder: 'Issuer',

        bindingOptions: {
            value: 'award.Issuer'
        }
    };
    $scope.award_date = {
        placeholder: 'Date',
        width: '100%',
        type: "date",
        bindingOptions: {
            value: 'award.Date'
        }
    };
    ////////////////////////////////////////
    $scope.txt_first_name = {
        placeholder: 'First Name',
        bindingOptions: {
            value:'user.FirstName'
        }

    };
    $scope.txt_last_name = {
        placeholder: 'Last Name',
        bindingOptions: {
            value: 'user.LastName'
        }

    };
    $scope.txt_university = {
        placeholder: 'Company or University',
        bindingOptions: {
            value: 'user.University'
        }

    };
    $scope.txt_zip_code = {
        placeholder: 'ZIP code',
        bindingOptions: {
            value: 'user.ZIPCode'
        }

    };
    $scope.txt_state = {
        placeholder: 'State',
        bindingOptions: {
            value: 'user.State'
        }

    };
    $scope.txt_city = {
        placeholder: 'City',
        bindingOptions: {
            value: 'user.City'
        }

    };
    $scope.txt_linkedin = {
        placeholder: 'LinkedIn URL',
        bindingOptions: {
            value: 'user.LinkedIn'
        }

    };
    $scope.txt_twitter = {
        placeholder: 'Twitter',
        bindingOptions: {
            value: 'user.Twitter'
        }

    };
    $scope.txt_headline = {
        placeholder: 'Headline',
        bindingOptions: {
            value: 'user.Headline'
        }

    };
    $scope.txt_email = {
        placeholder: 'Email',
        mode: "email",
        bindingOptions: {
            value: 'user.Email'
        }
    };
    $scope.txt_website = {
        placeholder: 'Website',
        mode: 'url',
        bindingOptions: {
            value: 'user.Website'
        }

    };
    $scope.txt_review = {
        hoverStateEnabled: false,
        height: $rootScope.popupHeight(380, true),
        bindingOptions: {
            value: 'review.Body',

        }
    };
    $scope.sb_study_field = {

        showClearButton: true,
        searchEnabled: true,
        dataSource: $rootScope.getDatasourceOption(59),
        displayExpr: "Title",
        valueExpr: 'Id',
        placeholder: 'Field of Study',
        
        bindingOptions: {
            value: 'user.FieldOfStudyId'

        }
    };
    $scope.sb_degree = {

        showClearButton: true,
        searchEnabled: true,
        dataSource: $rootScope.getDatasourceOption(18),
        displayExpr: "Title",
        valueExpr: 'Id',
        placeholder: 'Degree',
         bindingOptions: {
            value: 'user.DegreeId'

        }
    };
    $scope.sb_position = {

        showClearButton: true,
        searchEnabled: true,
        dataSource: $rootScope.getDatasourceJobs(),
        displayExpr: "AssignedRole1",
        valueExpr: 'AssignedRoleID',
        placeholder: 'Position',
        
        bindingOptions: {
            value: 'user.PositionId'

        }
    };
    $scope.sb_country = {

        showClearButton: true,
        searchEnabled: true,
        dataSource: $rootScope.getDatasourceCountries(),
        placeholder: 'Country',
         displayExpr: "Name",
         valueExpr: 'Id',
        bindingOptions: {
            value: 'user.CountryId'

        }
    };
    ///////////////////////////////////////
    $scope.chk_grp7 = {
        text: '3D Printing Technology',

        bindingOptions: {
            value: 'networks[6]',
           
        }
    };

    $scope.chk_grp1 = {
        text: '3D Printing(Concrete)',

        bindingOptions: {
            value: 'networks[0]',
           
        }
    };

    $scope.chk_grp12 = {
        text: '3D Printing(Metal)',

        bindingOptions: {
            value: 'networks[11]',
           
        }
    };

    $scope.chk_grp15 = {
        text: '3D Printing(Ceramic)',

        bindingOptions: {
            value: 'networks[14]',
            
        }
    };

    $scope.chk_grp14 = {
        text: '3D Printing(Polymer)',

        bindingOptions: {
            value: 'networks[13]',
            
        }
    };

    $scope.chk_grp13 = {
        text: '3D Printing(Medical)',

        bindingOptions: {
            value: 'networks[12]',
            
        }
    };

    $scope.chk_grp11 = {
        text: '3D Printing(Dental)',

        bindingOptions: {
            value: 'networks[10]',
             
        }
    };

    $scope.chk_grp8 = {
        text: '3D Printing(Software)',

        bindingOptions: {
            value: 'networks[7]',
             
        }
    };

    $scope.chk_grp9 = {
        text: 'Material Engineering',

        bindingOptions: {
            value: 'networks[8]',
             
        }
    };

    $scope.chk_grp5 = {
        text: 'Design for Additive Manufacturing',

        bindingOptions: {
            value: 'networks[4]',
             
        }
    };

    $scope.chk_grp6 = {
        text: 'Hybrid Additive Manufacturing',
        
        bindingOptions: {
            value: 'networks[5]',
             
        }
    };

    $scope.chk_grp10 = {
        text: 'Product liability and regulatory',

        bindingOptions: {
            value: 'networks[9]',
            
        }
    };

    $scope.chk_grp3 = {
        text: 'Business Development',

        bindingOptions: {
            value: 'networks[2]',
        }
    };

    $scope.chk_grp4 = {
        text: 'Artificial Intelligence',

        bindingOptions: {
            value: 'networks[3]',
             
        }
    };

    $scope.chk_grp2 = {
        text: 'Internet of Things(IoT)',
        
        bindingOptions: {
            value: 'networks[1]',
        }
    };


    ////////////////////////////////////////

    $scope.img_url = '../../content/images/imguser.png';
    $scope.uploaderValueImage = [];
    $scope.uploadedFileImage = null;
    $scope.uploader_image = {
        //uploadedMessage: 'بارگزاری شد',
        elementAttr: {
            
            class: "invisibleuploader"
        },
        multiple: false,
        // selectButtonText: 'انتخاب تصویر',
        labelText: '',
        accept: "image/*",
        uploadMethod: 'POST',
        uploadMode: "instantly",
        rtlEnabled: true,
        uploadUrl: $rootScope.fileHandlerUrl + '?t=clientfiles',
        onValueChanged: function (arg) {

        },
        onUploaded: function (e) {
            $scope.uploadedFileImage = e.request.responseText;
           // $scope.entity.Person.ImageUrl = e.request.responseText;
            $scope.img_url = $rootScope.clientsFilesUrl + $scope.uploadedFileImage;

        },
        bindingOptions: {
            value: 'uploaderValueImage'
        }
    };

    $scope.add_click = function ($event, type) {
        $event.stopPropagation();
        switch (type) {
            case 'publication':
                $scope.popup_publication_visible = true;
                break;
            case 'patent':
                $scope.popup_patent_visible = true;
                break;
            case 'project':
                $scope.popup_project_visible = true;
                break;
            case 'certification':
                $scope.popup_certification_visible = true;
                break;
            case 'award':
                $scope.popup_award_visible = true;
                break;
            default:
                break;
        }

    };
    $scope.edit_click = function ($event, type, id) {
        $event.stopPropagation();
        var data;
        switch (type) {
            case 'publication':
                data = Enumerable.From($scope.profile.Publications).Where('$.Id==' + id).FirstOrDefault();
                $scope.bind_publication(data);
                $scope.popup_publication_visible = true;
                break;
            case 'patent':
                data = Enumerable.From($scope.profile.Patents).Where('$.Id==' + id).FirstOrDefault();
                $scope.bind_patent(data);
                $scope.popup_patent_visible = true;
                break;
            case 'project':
                data = Enumerable.From($scope.profile.Projects).Where('$.Id==' + id).FirstOrDefault();
                $scope.bind_project(data);
                $scope.popup_project_visible = true;
                break;
            case 'certification':
                data = Enumerable.From($scope.profile.Certifications).Where('$.Id==' + id).FirstOrDefault();
                $scope.bind_certification(data);
                $scope.popup_certification_visible = true;
                break;
            case 'award':
                data = Enumerable.From($scope.profile.Awards).Where('$.Id==' + id).FirstOrDefault();
                $scope.bind_award(data);
                $scope.popup_award_visible = true;
                break;
            case 'review':
                data = Enumerable.From($scope.profile.Activity).Where('$.ReviewId==' + id).FirstOrDefault();
                $scope.loadingVisible = true;
                reviewService.getReview(id).then(function (result) {
                    $scope.loadingVisible = false;
                    $scope.review = result;
                     
                }, function (err) {  $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
                $scope.popup_review_visible = true;
                break;
            case 'acc':
                //data = Enumerable.From($scope.profile.Activity).Where('$.ReviewId==' + id).FirstOrDefault();
                //$scope.loadingVisible = true;
                //reviewService.getReview(id).then(function (result) {
                //    $scope.loadingVisible = false;
                //    $scope.review = result;

                //}, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
                $scope.bind_publication($scope.profile.Accompolishments.Publication);
                $scope.bind_project($scope.profile.Accompolishments.Project);
                $scope.bind_patent($scope.profile.Accompolishments.Patent);
                $scope.bind_certification($scope.profile.Accompolishments.Certification);
                $scope.bind_award($scope.profile.Accompolishments.Award);
                $scope.popup_acc_visible = true;
                break;
            case 'network':
                $jq.each($scope.profile.Networks, function (_i, _d) {
                    
                     $scope.networks[_d.NetworkId-1] = true;
                });
                $scope.popup_network_visible = true;
                break;
            default:
                break;
        }
        //alert(id);
        //Enumerable.From(Config.MenuItems)

    };
    $scope.remove_click = function ($event, type, id) {
        $event.stopPropagation();
        General.Confirm(Config.Text_DeleteConfirm, function (res) {
            if (res) {
                var data;
                switch (type) {
                    case 'publication':
                        data = Enumerable.From($scope.profile.Publications).Where('$.Id==' + id).FirstOrDefault();
                        $scope.loadingVisible = true;
                        userService.deletePublication(data).then(function (response) {
                            $scope.loadingVisible = false;
                            $scope.profile.Publications = Enumerable.From($scope.profile.Publications).Where('$.Id!=' + id).ToArray();
                            $scope.refreshAccordionPanel('publication_panel');
                            General.ShowNotify(Config.Text_SavedOk, 'success');
                              
                        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
                        break;
                    case 'patent':
                        data = Enumerable.From($scope.profile.Patents).Where('$.Id==' + id).FirstOrDefault();
                        $scope.loadingVisible = true;
                        userService.deletePatent(data).then(function (response) {
                            $scope.loadingVisible = false;
                            $scope.profile.Patents = Enumerable.From($scope.profile.Patents).Where('$.Id!=' + id).ToArray();
                            $scope.refreshAccordionPanel('patent_panel');
                            General.ShowNotify(Config.Text_SavedOk, 'success');

                        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
                        break;
                    case 'project':
                        data = Enumerable.From($scope.profile.Projects).Where('$.Id==' + id).FirstOrDefault();
                        $scope.loadingVisible = true;
                        userService.deleteProject(data).then(function (response) {
                            $scope.loadingVisible = false;
                            $scope.profile.Projects = Enumerable.From($scope.profile.Projects).Where('$.Id!=' + id).ToArray();
                            $scope.refreshAccordionPanel('project_panel');
                            General.ShowNotify(Config.Text_SavedOk, 'success');

                        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
                        break;
                    case 'certification':
                        data = Enumerable.From($scope.profile.Certifications).Where('$.Id==' + id).FirstOrDefault();
                        $scope.loadingVisible = true;
                        userService.deleteCertification(data).then(function (response) {
                            $scope.loadingVisible = false;
                            $scope.profile.Certifications = Enumerable.From($scope.profile.Certifications).Where('$.Id!=' + id).ToArray();
                            $scope.refreshAccordionPanel('certification_panel');
                            General.ShowNotify(Config.Text_SavedOk, 'success');

                        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
                        break;
                    case 'award':
                        data = Enumerable.From($scope.profile.Awards).Where('$.Id==' + id).FirstOrDefault();
                        
                        $scope.loadingVisible = true;
                        userService.deleteAward(data).then(function (response) {
                            $scope.loadingVisible = false;
                            $scope.profile.Awards = Enumerable.From($scope.profile.Awards).Where('$.Id!=' + id).ToArray();
                            $scope.refreshAccordionPanel('award_panel');
                            General.ShowNotify(Config.Text_SavedOk, 'success');

                        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
                        break;
                    case 'review':
                        data = Enumerable.From($scope.profile.Activity).Where('$.Id==' + id).FirstOrDefault();
                        var dto = { Id: data.ReviewId, UserId: $scope.profile.User.Id };

                        $scope.loadingVisible = true;
                        reviewService.delete(dto).then(function (response) {
                            $scope.profile.Activity = JSON.parse(JSON.stringify(response));
                            $scope.build_rate();
                            $scope.loadingVisible = false;
                            $scope.profile.Summary.Reviews = Number($scope.profile.Summary.Reviews) - 1;
                            General.ShowNotify(Config.Text_SavedOk, 'success');

                        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
                        break;
                    default:
                        break;
                }

            }
        });

    };
    $scope.nid = -1;
    $scope.circle_clicked = function ($event, nid, net) {
        $scope.popup_res_title = "Researchers (" + net + ")";
        $scope.nid = nid;
        $scope.popup_res_visible = true;

    };
    ///////////////////////////////////////
    var orders = new DevExpress.data.CustomStore({
        load: function (loadOptions) {
            var parameters = {};
            //  console.log(loadOptions);
            if (loadOptions.sort) {
                parameters.orderby = loadOptions.sort[0].selector;
                if (loadOptions.sort[0].desc)
                    parameters.orderby += " desc";
            }

            parameters.skip = loadOptions.skip;
            parameters.take = loadOptions.take;
            if (loadOptions.filter) {
                var f = loadOptions.filter[0];
                if (Array.isArray(f)) {
                    $jq.each(loadOptions.filter, function (_i, _d) {
                        if (Array.isArray(_d)) {
                            parameters[_d[0]] = _d[2];
                        }


                    });
                }
                else {
                    parameters[loadOptions.filter[0]] = loadOptions.filter[2];
                }

            }
            parameters.nid = $scope.nid;
            

            var config = {
                params: parameters
            };

            return $http.get($rootScope.serviceUrl + "api/users/profiles", config)
                .then(function (response) {
                    return { data: response.data.items, totalCount: response.data.totalCount };
                }, function (response) {
                    return $q.reject("Data Loading Error");
                });
        }
    });
    $scope.dg_instance = null;
    $scope.dg_columns = [
        {
            dataField: "ImageUrl",
            caption: '',
            width: 90,
            allowFiltering: false,
            allowSorting: false,
            cellTemplate: function (container, options) {
                var img = "<a class='dg-cell-link link-profile' href='#' data-uid='" + options.data.Id + "' style=''    >"
                    + "<img style='border-radius:0%;width:100%'  src='../../content/upload/" + options.value + "' />"
                    + "</a>";
                $jq("<div style='width:75px;height:75px'>")
                    // .append($jq("<img style='border-radius:50%'>", { "src":'../../content/upload/'+ options.value }))
                    .append(img)
                    .appendTo(container);
            }
        },
        {
            dataField: 'Name', caption: 'Name', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 180,
            cellTemplate: function (container, options) {
                var elem = "<div class='dg-cell-div' ><a class='dg-cell-link link-profile' href='#' data-uid='" + options.data.Id + "' style=''    >" + options.data.Name + "</a></div>";
                $jq("<div>")
                    // .append($jq("<img style='border-radius:50%'>", { "src":'../../content/upload/'+ options.value }))
                    .append(elem)
                    .appendTo(container);
            }
        },
        { dataField: 'Position', caption: 'Position', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 280, },
        { dataField: 'University', caption: 'Organization', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 220 },
         { dataField: 'Location', caption: 'Location', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false,   },
        //{
        //    dataField: 'Networks', caption: 'Networks', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false,
        //    cellTemplate: function (container, options) {
        //        //var links = [];
        //        //$jq.each(options.data.Networks, function (_i, _d) {
        //        //    links.push("<a class='dg-cell-link' href='" + _d.link + "'>" + _d.Title + "</a>");
        //        //});

        //        //$jq("<div>")
        //        //    // .append($jq("<img style='border-radius:50%'>", { "src":'../../content/upload/'+ options.value }))
        //        //    .append(links.join(', '))
        //        //    .appendTo(container);
        //        $jq("<div>")
        //            .append("<a class='dg-cell-link' href='#'>" + options.value + "</a>")

        //            .appendTo(container);
        //    }

        //},


    ];
    $scope.dg_height = '100%';
    $scope.dg_researchers = {
        wordWrapEnabled: true,
        headerFilter: {
            visible: false
        },
        filterRow: {
            visible: true,
            showOperationChooser: true,
        },
        showRowLines: true,
        showColumnLines: true,
        sorting: { mode: 'none' },

        noDataText: '',
        columnFixing: {
            enabled: true
        },
        allowColumnReordering: true,
        allowColumnResizing: true,
        remoteOperations: {
            sorting: true,
            paging: true,
            filtering: true
        },
        paging: {
            pageSize: 10
        },
        pager: {
            showPageSizeSelector: false,
            // allowedPageSizes: [5, 10, 20],
            showInfo: true,
            showNavigationButtons: true,
        },
        showBorders: true,
        selection: { mode: 'single' },

        columnAutoWidth: false,


        // dataSource: employees,
        columns: $scope.dg_columns,
        onContentReady: function (e) {
            if (!$scope.dg_instance)
                $scope.dg_instance = e.component;
        },
        onSelectionChanged: function (e) {

        },
        width:'100%',
        //height: '405',
       // height:'100%',
        dataSource: {
            store: orders
        },
        bindingOptions: {
            // dataSource: 'dataSource', //'dg_employees_ds',
              height: 'dg_height'
        }
    };

    ////////////////////////////
    $scope.dg_instance_xs = null;
    $scope.dg_columns_xs = [
        {
            dataField: "ImageUrl",
            caption: 'Explore Researchers and Professionals in discovering and developing breakthrough technologies.',
            width: 90,
            allowFiltering: false,
            allowSorting: false,
            cellTemplate: function (container, options) {
                var links = [];
                //$jq.each(options.data.Networks, function (_i, _d) {
                //    links.push("<a class='dg-cell-link' style='font-size:14px;' href='" + _d.link + "'>" + _d.Title + "</a>");

                //});
                var elem = "<div style='width:100%'>"
                    + "<table style='width:100%;border-bottom:1px solid gray !important'><tr>"
                    + "<td style='width:80px;min-width:80px;text-align:left;position:relative;vertical-align:middle'>"
                    + "<a class='dg-cell-link link-profile' href='#' data-uid='" + options.data.Id + "' style='font-size:14px;'    >"
                    + "<img style='border-radius:0%;min-width:75px;width:75px;height:75px; '  src='../../content/upload/" + options.value + "' />"
                    + "</a>"
                    + "</td>"
                    + "<td style='padding-top:0 !important'>"
                    + "<div class='dg-cell-div' ><a class='dg-cell-link link-profile' href='#' data-uid='" + options.data.Id + "' style='font-size:14px;'    >" + options.data.Name + "</a></div>"
                    + "<div class='dg-cell-div' style='font-size:13px'>" + options.data.Organization + ", " + options.data.Position + "</div>"
                    + "<div  class='dg-cell-div'  style='font-size:13px'>" + options.data.Location + "</div>"
                    + "<div class='dg-cell-div'>" + "<a class='dg-cell-link' style='font-size:14px;' href='#'>" + options.data.Networks + "</a>" + "</div>"
                    + "</td>"
                    + "</tr></table>"

                    + "</div>";

                // elem = "<p class='dg-cell-div' style='width:200px'>" + links.join(', ') + "</p>";
                //var img = "<img style='border-radius:0%;'  src='../../content/upload/" + options.value + "' />";
                $jq("<div>")
                    // .append($jq("<img style='border-radius:50%'>", { "src":'../../content/upload/'+ options.value }))
                    .append(elem)
                    .appendTo(container);
            }
        },


    ];
    $scope.dg_researchers_xs = {
        showColumnHeaders: false,
        headerFilter: {
            visible: false
        },
        remoteOperations: {
            sorting: true,
            paging: true,
            filtering: true
        },
        filterRow: {
            visible: false,
            showOperationChooser: true,
        },
        showRowLines: true,
        showColumnLines: true,
        sorting: { mode: 'none' },

        noDataText: '',
        columnFixing: {
            enabled: true
        },
        allowColumnReordering: true,
        allowColumnResizing: true,
        paging: {
            pageSize: 5
        },
        pager: {
            showPageSizeSelector: false,
            // allowedPageSizes: [5, 10, 20],
            showInfo: true,
            showNavigationButtons: true,
        },
        showBorders: true,
        selection: { mode: 'single' },

        columnAutoWidth: false,


        //dataSource: employees,
        columns: $scope.dg_columns_xs,
        onContentReady: function (e) {
            if (!$scope.dg_instance_xs)
                $scope.dg_instance_xs = e.component;
        },
        onSelectionChanged: function (e) {

        },
        dataSource: {
            store: orders
        },
        width: '100%',
        //  height: '550',
        bindingOptions: {
            // dataSource: 'dataSource',
            //   dataSource: 'dg_ds', //'dg_employees_ds',
              height: 'dg_height'
        }
    };
    //////////////////////////////////////////
    $scope.build_rate = function () {
        if ($scope.profile.Activity) {
            $scope.IsActivityVisible = true;
            $jq.each($scope.profile.Activity, function (_i, _d) {
                if (_d.Type == 1) {
                    _d.rateStars = "";
                    var score = Math.floor(_d.TotalRate);
                    for (var i = 0; i < score; i++) {
                        _d.rateStars += '<i class="icon ion-md-star color-p star"   ></i>';
                    }
                    var rem = Math.floor(5 - _d.TotalRate);
                    var half = (5 - _d.TotalRate) - rem;
                    if (half > 0)
                        _d.rateStars += '<i class="icon ion-md-star-half color-p star"   ></i>';
                    for (var j = 0; j < rem; j++) {
                        _d.rateStars += '<i class="icon ion-md-star-outline color-p star"   ></i>';
                    }
                }
            });


        }
    };
    $scope.build_network = function () {
        //$jq.each($scope.networks, function (_i, _d) {
        //    _d = false;
        //});
        $jq('.network-circle').addClass('circle-gray');
        $jq.each($scope.profile.Networks, function (_i, _d) {
            $jq("img[data-id='" + _d.NetworkId + "']").toggleClass('circle-gray').addClass('pointer');
           // $scope.networks[_d.NetworkId-1] = true;
        });
    };
    $scope.bind = function (id) {
        $scope.loadingVisible = true;
        userService.getProfile(id).then(function (result) {
            $scope.loadingVisible = false;
            console.log(result);
            $scope.profile = result; //Enumerable.From($rootScope.researchers).Where('$.Id==' + $scope.profileId).FirstOrDefault();
            if ($scope.profile) {
               // $scope.profile.User.ImageUrl2 = '../../content/upload/' + $scope.profile.User.ImageUrl;

                $scope.build_network();

                $scope.build_rate();




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


                $scope.IsAccomplishmentsVisible = true;// $scope.IsPublicationsVisible || $scope.IsPatentsVisible || $scope.IsProjectsVisible || $scope.IsCertificationsVisible || $scope.IsAwardsVisible;

            }
            /////////////////////////////////////////////////////
        }, function (err) { alert('x'); $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
    };
    ///////////////////////////////////////////
    $scope.circleBaseWidth = 190 * 0.9;
    $scope.getCircleWidth = function (w) {
        var _w = w * 1.0 * 100 / 686;
        return _w + '%';
    };
    $scope.prepare_networks = function () {
        var W1 = $jq('#xs-core').width();

        $jq('#xs-core').load(function () {
            var H1 = $jq('#xs-core').height();
            var wxcircle = 190 * 1.0 * 100 / 686;

            $jq('.xcircle').width(wxcircle + '%');

            ///////////////////////
            var c_3dp_left = (247 * 1.0 / 686) * W1;
            var c_3dp_top = (4 * 1.0 / 684) * H1;
            $jq('#c_3dp').css('left', c_3dp_left + 'px').css('top', c_3dp_top + 'px');
            ///////////////////////
            var c_iot_left = (253 * 1.0 / 686) * W1;
            var c_iot_top = (-166 * 1.0 / 684) * H1;
            $jq('#c_iot').width($scope.getCircleWidth(175)).css('left', c_iot_left + 'px').css('top', c_iot_top + 'px');
            ///////////////////////
            var c_dam_left = (98 * 1.0 / 686) * W1;
            var c_dam_top = (-96 * 1.0 / 684) * H1;
            $jq('#c_dam').width($scope.getCircleWidth(175)).css('left', c_dam_left + 'px').css('top', c_dam_top + 'px');
            ///////////////////////
            var c_ham_left = (407 * 1.0 / 686) * W1;
            var c_ham_top = (-96 * 1.0 / 684) * H1;
            $jq('#c_ham').width($scope.getCircleWidth(175)).css('left', c_ham_left + 'px').css('top', c_ham_top + 'px');
            ////////////////////////
            var c_software_left = (77 * 1.0 / 686) * W1;
            var c_software_top = (73 * 1.0 / 684) * H1;
            $jq('#c_software').width($scope.getCircleWidth(190)).css('left', c_software_left + 'px').css('top', c_software_top + 'px');
            ////////////////////////
            var c_concrete_left = (417 * 1.0 / 686) * W1;
            var c_concrete_top = (75 * 1.0 / 684) * H1;
            $jq('#c_concrete').width($scope.getCircleWidth(190)).css('left', c_concrete_left + 'px').css('top', c_concrete_top + 'px');
            //////////////////////////
            var c_dental_left = (6 * 1.0 / 686) * W1;
            var c_dental_top = (245 * 1.0 / 684) * H1;
            $jq('#c_dental').width($scope.getCircleWidth(190)).css('left', c_dental_left + 'px').css('top', c_dental_top + 'px');
            //////////////////////////
            var c_metal_left = (487 * 1.0 / 686) * W1;
            var c_metal_top = (245 * 1.0 / 684) * H1;
            $jq('#c_metal').width($scope.getCircleWidth(190)).css('left', c_metal_left + 'px').css('top', c_metal_top + 'px');
            //////////////////////////
            var c_medical_left = (75.5 * 1.0 / 686) * W1;
            var c_medical_top = (415 * 1.0 / 684) * H1;
            $jq('#c_medical').width($scope.getCircleWidth(190)).css('left', c_medical_left + 'px').css('top', c_medical_top + 'px');
            //////////////////////////
            var c_polymer_left = (247 * 1.0 / 686) * W1;
            var c_polymer_top = (486 * 1.0 / 684) * H1;
            $jq('#c_polymer').width($scope.getCircleWidth(190)).css('left', c_polymer_left + 'px').css('top', c_polymer_top + 'px');
            //////////////////////////
            var c_ceramic_left = (417 * 1.0 / 686) * W1;
            var c_ceramic_top = (415 * 1.0 / 684) * H1;
            $jq('#c_ceramic').width($scope.getCircleWidth(190)).css('left', c_ceramic_left + 'px').css('top', c_ceramic_top + 'px');
            //////////////////////////
            var c_me_left = (7 * 1.0 / 686) * W1;
            var c_me_top = (585 * 1.0 / 684) * H1;
            $jq('#c_me').width($scope.getCircleWidth(175)).css('left', c_me_left + 'px').css('top', c_me_top + 'px');
            //////////////////////////
            var c_bd_left = (166 * 1.0 / 686) * W1;
            var c_bd_top = (650 * 1.0 / 684) * H1;
            $jq('#c_bd').width($scope.getCircleWidth(175)).css('left', c_bd_left + 'px').css('top', c_bd_top + 'px');
            //////////////////////////
            var c_ai_left = (339 * 1.0 / 686) * W1;
            var c_ai_top = (650 * 1.0 / 684) * H1;
            $jq('#c_ai').width($scope.getCircleWidth(175)).css('left', c_ai_left + 'px').css('top', c_ai_top + 'px');
            //////////////////////////
            var c_plr_left = (500 * 1.0 / 686) * W1;
            var c_plr_top = (585 * 1.0 / 684) * H1;
            $jq('#c_plr').width($scope.getCircleWidth(175)).css('left', c_plr_left + 'px').css('top', c_plr_top + 'px');

            $jq('.mobile1').css('margin-top', c_iot_top + 228 + 'px');
        });
        var w1 = (250 * 1.0 / 686) * W1;
    };
    $scope.$on('$viewContentLoaded', function () {
        // alert('about');

        $jq('.profile').fadeIn(400, function () {
            $scope.bind($scope.profileId);
            $scope.prepare_networks();
            //$jq('#Top_bar').show();
            // $rootScope.pageFunctions();
            // AOS.init();
        });
        var wbar_width = $jq('.wbar').innerWidth() - 4;

        var bar_margin = $jq('.section_wrapper').offset().left;
        $jq('.wbar').width($jq(window).width() - bar_margin * 1);
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
        $scope.refreshAccordionPanel = function (id) {
            var elem = $jq('#' + id);

            if (elem.prev().hasClass('active')) {

                elem.css("max-height", 'initial');//.css("max-height", elem.css("height"));

            }
        };


        $rootScope.$broadcast('PageLoaded', 'Profile');
    });

    ///end


}]);
