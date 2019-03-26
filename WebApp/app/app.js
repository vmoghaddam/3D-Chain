var app = angular.module('ChainApp', ['ngRoute', 'LocalStorageModule', 'angular-loading-bar', 'ngSanitize', 'ngAnimate', 'dx' ]).config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
}]);
 
app.config(function ($routeProvider) {
    var version = 0.9;
    
    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: "/app/views/home.html?v=" + version,
        title: '3D-Chain',
         
    });

    $routeProvider.when("/about", {
        controller: "aboutController",
        templateUrl: "/app/views/about.html",
        title: '3D-Chain - About',

    });
    $routeProvider.when("/press", {
        controller: "pressController",
        templateUrl: "/app/views/press.html",
        title: '3D-Chain - Press',

    });
    $routeProvider.when("/research", {
        controller: "researchController",
        templateUrl: "/app/views/research.html",
        title: '3D-Chain - Research & Development',

    });
    $routeProvider.when("/signin", {
        controller: "signInController",
        templateUrl: "/app/views/signin.html",
        title: '3D-Chain - Sign In',
        IsSignInHidden:true,

    });
    $routeProvider.when("/signup/development", {
        controller: "signUpController",
        templateUrl: "/app/views/signup.html",
        title: '3D-Chain - Sign Up (Development)',
        type: 1,//Research and Development network

    });

     
     $routeProvider.otherwise({ redirectTo: "/home" });

});   

 


var serviceBase =  'http://localhost:58908/';
var webBase = 'http://localhost:23579';



    //'http://localhost:58908/';
    //'http://localhost:40654/';
   
    //'http://localhost:10707/';
//'http://ngauthenticationapi.azurewebsites.net/';
app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'ngAuthApp'
});
 
//app.config(function ($httpProvider) {
app.config(['$httpProvider', function ($httpProvider) {
   
   // $httpProvider.interceptors.push('authInterceptorService');
}]);
 
app.run(['$rootScope', '$location', '$templateCache', 'authService', 'activityService', function ($rootScope, $location, $templateCache, authService, activityService) {
   
    $rootScope.browser_title = '';
    $rootScope.serviceUrl = serviceBase;
    $rootScope.fileHandlerUrl = webBase + 'filehandler.ashx';
    $rootScope.clientsFilesUrl = webBase + 'upload/clientsfiles/';
    $rootScope.app_title = '3D-Chain Network';
    $rootScope.page_title = '';
    $rootScope.app_remark = 'Lorem ipsum dolor sit amet';
    $rootScope.module = '';
    $rootScope.moduleId = -1;
    $rootScope.moduleRemark = '';
    $rootScope.theme = '';
    $rootScope.color = '';
    $rootScope.class = '';
    $rootScope.userName = '';
    $rootScope.userTitle = '';
    $rootScope.userId = null;

    DevExpress.ui.themes.current('material.purple-light');

    ////////////////////
    $rootScope.subscribe_name = null;
    $rootScope.subscribe_email = null;
    $rootScope.subscribe = function () {
        alert($rootScope.subscribe_name);
        alert($rootScope.subscribe_email);
    };
    
    ///////////////////
    $rootScope.history = [];
    $rootScope.$on('$routeChangeSuccess', function (event, currentRoute, previousRoute ) {
        $rootScope.history.push($location.$$path);
       // if (currentRoute.$$route.IsSignInHidden)
       //     $rootScope.IsSignInVisible = false;
        $rootScope.browser_title = currentRoute.$$route.title;
        

    });
    ///////////////////////////////
    $rootScope.navigate = function (target, key, module) {

        //var rec = Enumerable.From(Config.MenuItems).Where('$.key=="' + key + '"').FirstOrDefault();
        //activityService.hitMenu(key, target, 'Visiting ' + $rootScope.module + ' > ' + rec.title, module);

        $location.path(target);


    };
    ///////////////////////////////
    var $jq = jQuery.noConflict();
    $rootScope.header_menu_mouse = function () {
        var left = $jq('#header_menu').css('left');
        var y = $jq(window).scrollTop();
        var t = Number(y) + 42;
       // alert(left);
        $jq('#header_menu_content') .css('opacity', '1').css('height', 'auto').css('top',t+'px');
    };
    $rootScope.header_menu_leave = function () {

        $jq('#header_menu_content').css('opacity', '0').css('height', '0');
    };
   
    /////////////////////////////////////////////////////
   
    var rtl = $jq('body').hasClass('rtl');
    //////////////////////////////////////////////////////
    function retinaLogo() {
        if (window.devicePixelRatio > 1) {

            var el = '';
            var src = '';
            var height = '';

            var parent = $jq('#Top_bar #logo');
            var parentH = parent.data('height');

            var maxH = {
                sticky: {
                    init: 35,
                    no_padding: 60,
                    overflow: 110
                },
                mobile: {
                    mini: 50,
                    mini_no_padding: 60
                },
                mobile_sticky: {
                    init: 50,
                    no_padding: 60,
                    overflow: 80
                }
            };

            $jq('#Top_bar #logo img').each(function (index) {

                el = $jq(this);
                src = el.data('retina');
                height = el.height();


                // main -----

                if (el.hasClass('logo-main')) {

                    if ($jq('body').hasClass('logo-overflow')) {

                        // do nothing

                    } else if (height > parentH) {

                        height = parentH;

                    }

                }

                // sticky -----

                if (el.hasClass('logo-sticky')) {

                    if ($jq('body').hasClass('logo-overflow')) {

                        if (height > maxH.sticky.overflow) {
                            height = maxH.sticky.overflow;
                        }

                    } else if ($jq('body').hasClass('logo-no-sticky-padding')) {

                        if (height > maxH.sticky.no_padding) {
                            height = maxH.sticky.no_padding;
                        }

                    } else if (height > maxH.sticky.init) {

                        height = maxH.sticky.init;

                    }

                }

                // mobile -----

                if (el.hasClass('logo-mobile')) {

                    if ($jq('body').hasClass('mobile-header-mini')) {

                        if (parent.data('padding') > 0) {

                            if (height > maxH.mobile.mini) {
                                height = maxH.mobile.mini;
                            }

                        } else {

                            if (height > maxH.mobile.mini_no_padding) {
                                height = maxH.mobile.mini_no_padding;
                            }

                        }

                    }

                }

                // mobile-sticky -----

                if (el.hasClass('logo-mobile-sticky')) {

                    if ($jq('body').hasClass('logo-no-sticky-padding')) {

                        if (height > maxH.mobile_sticky.no_padding) {
                            height = maxH.mobile_sticky.no_padding;
                        }

                    } else if (height > maxH.mobile_sticky.init) {
                        height = maxH.mobile_sticky.init;
                    }

                }


                // SET

                if (src) {
                    el.parent().addClass('retina');
                    el.attr('src', src).css('max-height', height + 'px');
                }

            });

        }
    }
    function portfolioActive() {
        var el = $jq('.isotope-filters .filters_wrapper');
        var active = el.attr('data-cat');

        if (active) {
            el.find('li.' + active).addClass('current-cat');
            $jq('.isotope').isotope({ filter: '.category-' + active });
        }
    }
    function mfn_stickyH() {

        if ($jq('body').hasClass('header-below')) {

            // header below slider
            header_H = $jq('.mfn-main-slider').innerHeight() + $jq('#Top_bar').innerHeight();

        } else {

            // default
            header_H = $jq('#Top_bar').innerHeight() + $jq('#Action_bar').innerHeight();

        }
       // alert($jq('#Top_bar').innerHeight());
    }


    /* ---------------------------------------------------------------------------
	 * Header | Sticky | Mobile
	 * --------------------------------------------------------------------------- */

    function mfn_mobile_sticky() {
        if ($jq('body').hasClass('mobile-sticky') && ($jq(window).width() < 768)) {

            var windowH = $jq(window).height();
            var offset = adminBarH() + $jq('#Top_bar .logo').height();

            if ((!$jq('#Top_bar').hasClass('is-sticky')) && $jq('#Action_bar').is(':visible')) {
                offset += $jq('#Action_bar').height();
            }

            var menuH = windowH - offset;
            if (menuH < 176) {
                menuH = 176;
            }

            $jq('#Top_bar #menu').css('max-height', menuH + 'px');

        }
    }


	/* ---------------------------------------------------------------------------
	 * Header | Top bar left | Width
	 * --------------------------------------------------------------------------- */

    function mfn_header() {
        var rightW = $jq('.top_bar_right').innerWidth();
        if (rightW && !$jq('body').hasClass('header-plain')) {
            rightW += 10;
        }
        var parentW = $jq('#Top_bar .one').innerWidth();
        var leftW = parentW - rightW;
        $jq('.top_bar_left, .menu > li > ul.mfn-megamenu').css('width', leftW);
    }


	/* ---------------------------------------------------------------------------
	 * FIX | Header | Sticky | Height
	 * --------------------------------------------------------------------------- */

    function fixStickyHeaderH() {
        var stickyH = 0;

        // FIX | sticky top bar height

        var topBar = $jq('.sticky-header #Top_bar');

        if (topBar.hasClass('is-sticky')) {
            stickyH = $jq('.sticky-header #Top_bar').innerHeight();
        } else {
            topBar.addClass('is-sticky');
            stickyH = $jq('.sticky-header #Top_bar').innerHeight();
            topBar.removeClass('is-sticky');
        }

        // FIX | responsive

        if ($jq(window).width() < mobile_init_W) {

            if ($jq(window).width() < 768) {

                // mobile
                if (!$jq('body').hasClass('mobile-sticky')) {
                    stickyH = 0;
                }

            } else {

                // tablet
                if (!$jq('body').hasClass('tablet-sticky')) {
                    stickyH = 0;
                }

            }

        } else {

            // desktop

            // FIX | header creative
            if ($jq('body').hasClass('header-creative')) {
                stickyH = 0;
            }

        }

        return stickyH;
    }


	/* ---------------------------------------------------------------------------
	 * Sidebar | Height
	 * --------------------------------------------------------------------------- */

    function mfn_sidebar() {
        if ($jq('.with_aside .four.columns').length) {

            var maxH = $jq('#Content .sections_group').outerHeight();

            $jq('.with_aside .four.columns .widget-area').each(function () {
                $jq(this).css('min-height', 0);
                if ($jq(this).height() > maxH) {
                    maxH = $jq(this).height();
                }
            });
            $jq('.with_aside .four.columns .widget-area').css('min-height', maxH + 'px');

        }
    }


	/* ---------------------------------------------------------------------------
	 * Section | Full Screen
	 * --------------------------------------------------------------------------- */

    function mfn_sectionH() {
        var windowH = $jq(window).height();

        // FIX | next/prev section
        var offset = 0;
        if ($jq('.section.full-screen:not(.hide-desktop)').length > 1) {
            offset = 5;
        }

        $jq('.section.full-screen').each(function () {

            var section = $jq(this);
            var wrapper = $jq('.section_wrapper', section);

            section
                .css('padding', 0)
                .css('min-height', windowH + offset);

            var padding = (windowH + offset - wrapper.height()) / 2;

            if (padding < 50) padding = 50;

            wrapper
                .css('padding-top', padding + 10)			// 20 = column margin-bottom / 2
                .css('padding-bottom', padding - 10);
        });
    }

    function mfn_sticky() {
        if ($jq('body').hasClass('sticky-header')) {
            if (!($jq('body').hasClass('header-creative') && window.innerWidth >= 768)) {

                var start_y = header_H;
                var window_y = $jq(window).scrollTop();

                if (window_y > start_y) {

                    if (!($jq('#Top_bar').hasClass('is-sticky'))) {

                        $jq('.header_placeholder').css('height', $jq('#Top_bar').height());

                        $jq('#Top_bar')
                            .addClass('is-sticky')
                            .css('top', -60)
                            .css('position', 'fixed')
                            .animate({
                                'top': adminBarH() + 'px'
                            }, 300, function () {

                            });

                        // Header width
                        mfn_header();
                    }

                } else {

                    if ($jq('#Top_bar').hasClass('is-sticky')) {

                        $jq('.header_placeholder').css('height', 0);
                        $jq('#Top_bar')
                            .removeClass('is-sticky')
                            .css('top', top_bar_top)
                            .css('position', 'static');

                        // Retina Logo - max height
                        sticky_logo();

                        // Header width
                        mfn_header();

                    }

                }

                mfn_mobile_sticky();

            }
        }
    }

    function hashNav() {

        // # window.location.hash
        var hash = window.location.hash;

        if (hash) {

            // FIX | Master Slider
            if (hash.indexOf("&") > -1 || hash.indexOf("/") > -1) {
                return false;
            }

            // Contact Form 7 in popup
            if (hash.indexOf("wpcf7") > -1) {
                cf7popup(hash);
            }

            if ($jq(hash).length) {

                var tabsHeaderH = $jq(hash).siblings('.ui-tabs-nav').innerHeight();

                $jq('html, body').animate({
                    scrollTop: $jq(hash).offset().top - fixStickyHeaderH() - tabsHeaderH - adminBarH()
                }, 500);
            }

        }

    }

    function mfn_introH() {
        var windowH = $jq(window).height() - $jq('#Header_wrapper').height() - adminBarH();

        $jq('#Intro.full-screen').each(function () {

            var el = $jq(this);
            var inner = $jq('.intro-inner', el);

            el.css('padding', 0).css('min-height', windowH);

            var padding = (windowH - inner.height()) / 2;
            inner.css('padding-top', padding).css('padding-bottom', padding);

        });
    }

    function adminBarH() {
        var height = 0;

        // WP adminbar
        if ($jq('body').hasClass('admin-bar')) {
            height += $jq('#wpadminbar').innerHeight();
        }

        // WC demo store
        if ($jq('body').hasClass('woocommerce-demo-store')) {
            height += $jq('body > p.demo_store').innerHeight();
        }

        return height;
    }
    ////////////////////////////////////////////////////////
    $rootScope.pageFunctions = function () {
        retinaLogo();
        // Portfolio - Isotope
        $jq('.blog_wrapper .isotope:not( .masonry ), .portfolio_wrapper .isotope:not( .masonry-flat, .masonry-hover, .masonry-minimal )').isotope({
            itemSelector: '.isotope-item',
            layoutMode: 'fitRows',
            isOriginLeft: rtl ? false : true
        });

        // Portfolio - Masonry Flat
        $jq('.portfolio_wrapper .masonry-flat').isotope({
            itemSelector: '.isotope-item',
            percentPosition: true,
            masonry: {
                columnWidth: 1
            },
            isOriginLeft: rtl ? false : true
        });

        // Blog & Portfolio - Masonry
        $jq('.isotope.masonry, .isotope.masonry-hover, .isotope.masonry-minimal').isotope({
            itemSelector: '.isotope-item',
            layoutMode: 'masonry',
            isOriginLeft: rtl ? false : true
        });

        portfolioActive();
        $jq('.chart').waypoint({

            offset: '100%',
            triggerOnce: true,
            handler: function () {

                var el = $jq(this.element).length ? $jq(this.element) : $jq(this);
                var lineW = simple ? 4 : 8;

                el.easyPieChart({
                    animate: 1000,
                    lineCap: 'circle',
                    lineWidth: lineW,
                    size: 140,
                    scaleColor: false,
                    trackColor: '#f8f8f8'
                });

                if (typeof this.destroy !== 'undefined' && $jq.isFunction(this.destroy)) {
                    this.destroy();
                }
            }
        });

        $jq('.bars_list').waypoint({

            offset: '100%',
            triggerOnce: true,
            handler: function () {

                var el = $jq(this.element).length ? $jq(this.element) : $jq(this);

                el.addClass('hover');

                if (typeof this.destroy !== 'undefined' && $jq.isFunction(this.destroy)) {
                    this.destroy();
                }
            }
        });

        $jq('.progress_icons').waypoint({

            offset: '100%',
            triggerOnce: true,
            handler: function () {

                var el = $jq(this.element).length ? $jq(this.element) : $jq(this);
                var active = el.attr('data-active');
                var color = el.attr('data-color');
                var icon = el.find('.progress_icon');
                var timeout = 200;		// timeout in milliseconds

                icon.each(function (i) {
                    if (i < active) {
                        var time = (i + 1) * timeout;
                        setTimeout(function () {
                            $jq(icon[i])
                                .addClass('themebg')
                                .css('background-color', color);
                        }, time);
                    }
                });

                if (typeof this.destroy !== 'undefined' && $jq.isFunction(this.destroy)) {
                    this.destroy();
                }
            }
        });

        $jq('.animate-math .number').waypoint({

            offset: '100%',
            triggerOnce: true,
            handler: function () {

                var el = $jq(this.element).length ? $jq(this.element) : $jq(this);
                var duration = Math.floor((Math.random() * 1000) + 1000);
                var to = el.attr('data-to');

                $jq({ property: 0 }).animate({ property: to }, {
                    duration: duration,
                    easing: 'linear',
                    step: function () {
                        el.text(Math.floor(this.property));
                    },
                    complete: function () {
                        el.text(this.property);
                    }
                });

                if (typeof this.destroy !== 'undefined' && $jq.isFunction(this.destroy)) {
                    this.destroy();
                }
            }
        });

        $jq('.before_after.twentytwenty-container').twentytwenty();

        // Header | Sticky
        mfn_stickyH();
        mfn_sticky();
        mfn_mobile_sticky();

        // Full Screen Section
        mfn_sectionH();

        // Navigation | Hash
        hashNav();

        // Full Screen Intro
        mfn_introH();

        // FIX | Revolution Slider Width & Height OnLoad
        $jq(window).trigger('resize');

        // Sidebar | Height
        setTimeout(function () {
            mfn_sidebar();
        }, 10);




    };

   // $rootScope.pageFunctions();

    window.onscroll = function () { scrollFunction() };

    function scrollFunction() {
        var y = $jq(window).scrollTop();

        
        var t = Number(y) + 42;
        // alert(left);
        $jq('#header_menu_content').css('top', t + 'px');


        if (y > 80 || y > 80) {
            $jq('#navbar').css('border-bottom','1px solid #ddd');
           // console.log(y);
          // document.getElementById("navbar").style.padding = "30px 10px";
           // $jq('#navbar').height(90);
           // document.getElementById("logo").style.fontSize = "25px";
        } else {
            $jq('#navbar').css('border-bottom', '0px solid #ddd');
           // document.getElementById("navbar").style.padding = "80px 10px";
           // $jq('#navbar').height(145);
            //document.getElementById("logo").style.fontSize = "35px";
        }
    }

    $rootScope.back_bottom = function () {
        $jq("HTML, BODY").animate({ scrollTop: 0 }, 500);
  
    };
    ///////////////////////////////////////////////////////
}]);
 
 
 