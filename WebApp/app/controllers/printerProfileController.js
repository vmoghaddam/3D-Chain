'use strict';
app.controller('printerProfileController', ['$scope', '$location', '$window', '$routeParams', '$rootScope', 'userService', 'authService', '$http', '$q', function ($scope, $location, $window, $routeParams, $rootScope, userService, authService, $http, $q) {

    var $jq = jQuery.noConflict();

    $scope.prms = $routeParams.prms;
    $scope.isEditable = false;
    $scope.profileId = $routeParams.id;

    $scope.edit_param = $routeParams.edit;


    $scope.isFullScreen = false;
    if ($jq(window).width() < 400)
        $scope.isFullScreen = true;

    $scope.convert = function (x) {
        if (x.startsWith('_'))
            return "&nbsp;";
        return x;
    };
    $scope.profile = {
        // data: { rush24: false, rush48: true },
        //TotalRate: 3.5,
        //rateStars: "",

    };
    $scope.build_rate = function () {


        var _d = $scope.profile;
        _d.User.TotalRate = 3.5;
        _d.rateStars = "";
        var score = Math.floor(_d.User.TotalRate);
        for (var i = 0; i < score; i++) {
            _d.rateStars += '<i class="icon ion-md-star color-p star22" style="font-size:22px"   ></i>';
        }
        var rem = Math.floor(5 - _d.User.TotalRate);
        var half = (5 - _d.User.TotalRate) - rem;
        if (half > 0)
            _d.rateStars += '<i class="icon ion-md-star-half color-p star22" style="font-size:22px"  ></i>';
        for (var j = 0; j < rem; j++) {
            _d.rateStars += '<i class="icon ion-md-star-outline color-p star22" style="font-size:22px"  ></i>';
        }





    };

    //$scope.profile.User = {
    //    ImageUrl2: '../../content/upload/buildshop.jpg',
    //    ImageUrl: 'buildshop.jpg',
    //    Name: 'The Build Shop',
    //    Url: 'https://www.thebuildshop.org/#3dprinting',
    //    Address: '20540 E. Arrow Hwy, Ste L Covina, CA 91724',
    //    Phone: '+1 (657) 333-6253',
    //    Website: 'https://deezmaker.com',
    //    Email: 'contact@thebuildshop.org',
    //    DateJoinStr: 'May 2019',
    //    IsVerified: true,
    //};


    //$scope.profile.data.printers = [{ Id: 1, Name: 'ZPRINTER' }, { Id: 2, Name: 'Bukobot' }, { Id: 3,Name:'Form 1'}];
    //$scope.profile.data.printer_technology = ['Binder Jetting', 'FDM', 'SLA, DLP'];
    //$scope.profile.data.materials = ['Gypsum', 'Nylon, ABS, PLA', 'resin'];
    //$scope.profile.data.build_volume = ['203 X 203 X 254 mm', '200 X 200 X 200 mm, PLA', '125 X 125 X 165 mm'];

    //$scope.profile.data.min_layer_height = ['80 Microns', '50 Microns', '100 Microns'];
    //$scope.profile.data.max_layer_height = ['_0', '_1', '_2'];
    //$scope.profile.data.printing_speed = ['_0', '120 mm/s', '_1'];

    //$scope.profile.data.object_file = ['STL'];
    //$scope.profile.data.color = [];

    $scope.fill_empty_cells = function (ds) {
        var pt_length = ds.length;
        var pt_dif = 4 - pt_length;
        for (var i = 0; i <= pt_dif - 1; i++) {
            ds.push('_' + (pt_length + i + 1).toString());
        }
    };
    $scope.fill_empty_printers = function (ds) {

        var pt_length = ds.length;
        var pt_dif = 4 - pt_length;
        for (var i = 0; i <= pt_dif - 1; i++) {
            ds.push({ Id: -1 * (pt_length + i + 1), Name: '_' + (pt_length + 1 + i).toString() });
        }
    };



    ///////////////////////////////////////////

    $scope.chk_rush24 = {
        text: 'In 24 Hours',
        readOnly: true,
        bindingOptions: {
            value: 'profile.User.RushDelivery24',

        }
    };

    $scope.chk_rush48 = {
        text: 'In 48 Hours',
        // width: '200',
        readOnly: true,
        bindingOptions: {
            value: 'profile.User.RushDelivery48',

        }
    };
    ////////////////////////////////
    $scope.getImageUrl = function (url) {
        return "../../content/upload/" + url;
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
    $scope.user = {};
    $scope.txt_name = {
        placeholder: 'Name',
        bindingOptions: {
            value: 'user.Name'
        }

    };
    $scope.txt_phone = {
        //mask: "+1 (X00) 000-0000",
        // maskRules: { "X": /[02-9]/ },
        placeholder: 'Tel',
        bindingOptions: {
            value: 'user.Phone'
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
    $scope.txt_address = {
        placeholder: 'Address',
        hoverStateEnabled: false,
        height: 100,
        bindingOptions: {
            value: 'user.Address',

        }
    };
    $scope.txt_zipcode = {
        placeholder: 'ZIP Code',
        hoverStateEnabled: false,

        bindingOptions: {
            value: 'user.ZIPCode',

        }
    };
    $scope.txt_state = {
        placeholder: 'State',
        hoverStateEnabled: false,

        bindingOptions: {
            value: 'user.State',

        }
    };
    $scope.txt_city = {
        placeholder: 'City',
        hoverStateEnabled: false,

        bindingOptions: {
            value: 'user.City',

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
    $scope._chk_rush24 = {
        text: 'In 24 Hours',

        bindingOptions: {
            value: 'user.rush24',

        }
    };

    $scope._chk_rush48 = {
        text: 'In 48 Hours',
        // width: '200',

        bindingOptions: {
            value: 'user.rush48',

        }
    };
    $scope.edit_main = function () {
        $scope.user = JSON.parse(JSON.stringify($scope.profile.User));
        $scope.user.rush24 = $scope.profile.data.rush24;
        $scope.user.rush48 = $scope.profile.data.rush48;
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
        return;
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
    /////////////////////////////////////////////////
    $scope.scroll_height = 200;
    $scope.scroll_printer = {
        scrollByContent: false,
        scrollByThumb: false,
        // bindingOptions: { height: 'scroll_height', }
        height: function () { return $rootScope.popupHeightFull(0.95) - 100; },
    };
    /////////////////

    //////////////////////
    $scope.popup_printer_visible = false;
    $scope.popup_printer_title = 'Edit Printer';
    $scope.popup_printer = {

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
            { widget: 'dxButton', location: 'after', options: { type: 'normal', text: 'Close', icon: 'remove', onClick: function (e) { $scope.popup_printer_visible = false; } }, toolbar: 'bottom' }
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
            $scope.popup_printer_visible = false;

        },
        bindingOptions: {
            visible: 'popup_printer_visible',
            fullScreen: 'isFullScreen',
            title: 'popup_printer_title',

        }
    };
    $scope.popup_printer.toolbarItems[0].options.onClick = function (e) {
        return;
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
    ///////////////////////////////////////////
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
    $scope.take_photo = function () {

        $scope.popup_photo_visible = true;
    };
    $scope.popup_photo_visible = false;
    $scope.popup_photo_title = 'Photo';
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
                    type: 'normal', text: 'Use Camera', validationGroup: 'profileaward', disabled: true, bindingOptions: {},
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
            $scope.img_url = '../../content/images/imguser.png';
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
    ///////////////////////////////////////////
    $scope.click_contact = function () {
        $scope.popup_profile_title = $scope.profile.User.Name;
        $scope.popup_profile_visible = true;
    };
    $scope.popup_profile_visible = false;
    $scope.popup_profile_title = 'Contact Info';
    $scope.popup_profile = {

        shading: true,
        //position: { my: 'left', at: 'left', of: window, offset: '5 0' },

        width: $rootScope.popupWidth(450, true),
        height: $rootScope.popupHeight(320, true),
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
            fullScreen: 'isFullScreen',
            title: 'popup_profile_title',

        }
    };
    ////////////////////////////////////////////
    $scope.printer = {};
    $scope.txt_p_name = {
        placeholder: 'Name',
        bindingOptions: {
            value: 'printer.Name'
        }

    };
    $scope.txt_p_technology = {
        placeholder: 'Technology',
        bindingOptions: {
            value: 'printer.Technology'
        }

    };
    $scope.txt_p_material = {
        placeholder: 'Material',
        bindingOptions: {
            value: 'printer.Material'
        }

    };
    $scope.txt_p_buildvolume_w = {
        placeholder: 'W',
        min: 1,
        bindingOptions: {
            value: 'printer.BuildVolume_W'
        }

    };
    $scope.txt_p_buildvolume_h = {
        placeholder: 'H',
        min: 1,
        bindingOptions: {
            value: 'printer.BuildVolume_H'
        }

    };
    $scope.txt_p_buildvolume_d = {
        placeholder: 'D',
        min: 1,
        bindingOptions: {
            value: 'printer.BuildVolume_D'
        }

    };




    $scope.txt_p_min = {
        placeholder: 'Min Layer Height (microns)',
        min: 1,
        bindingOptions: {
            value: 'printer.Min_LH'
        }

    };
    $scope.txt_p_max = {
        placeholder: 'Max Layer Height (microns)',
        min: 1,
        bindingOptions: {
            value: 'printer.Max_LH'
        }

    };
    $scope.txt_p_speed = {
        placeholder: 'Printing Speed (mm/s)',
        min: 1,
        bindingOptions: {
            value: 'printer.PrintingSpeed'
        }

    };
    $scope.txt_p_file = {
        placeholder: '3D Object File',
        bindingOptions: {
            value: 'printer.ObjectFile'
        }

    };
    $scope.txt_p_color = {
        placeholder: 'Color',
        bindingOptions: {
            value: 'printer.Color'
        }

    };
    /////////////////////////////////////////
    $scope.fdm = false;
    $scope.chk_fdm = {
        text: 'FDM(Fused Deposition Modeling)',
        width: '100%',
        bindingOptions: {
            value: 'fdm',

        }
    };

    $scope.sls = false;
    $scope.chk_sls = {
        text: 'SLS(Selective Laser Sintering)',
        width: '100%',
        bindingOptions: {
            value: 'sls',

        }
    };

    $scope.sla = false;
    $scope.chk_sla = {
        text: 'SLA(Stereolithography)',
        width: '100%',
        bindingOptions: {
            value: 'sla',

        }
    };

    $scope.mp = false;
    $scope.chk_mp = {
        text: 'Multijet / Polyjet',
        width: '100%',
        bindingOptions: {
            value: 'mp',

        }
    };

    $scope.dlp = false;
    $scope.chk_dlp = {
        text: 'DLP(Digital Light Processing)',
        width: '100%',
        bindingOptions: {
            value: 'dlp',

        }
    };

    $scope.dmls = false;
    $scope.chk_dmls = {
        text: 'DMLS(Direct Metal Laser Sintering)',
        width: '100%',
        bindingOptions: {
            value: 'dmls',

        }
    };

    $scope.sdl = false;
    $scope.chk_sdl = {
        text: 'SDL(Selective Deposition Lamination)',
        width: '100%',
        bindingOptions: {
            value: 'sdl',

        }
    };

    $scope.bj = false;
    $scope.chk_bj = {
        text: 'Binder Jetting',
        width: '100%',
        bindingOptions: {
            value: 'bj',

        }
    };

    $scope.ebm = false;
    $scope.chk_ebm = {
        text: 'EBM(Electron Beam Melting)',
        width: '100%',
        bindingOptions: {
            value: 'ebm',

        }
    };

    $scope.slm = false;
    $scope.chk_slm = {
        text: 'Selective Laser Melting',
        width: '100%',
        bindingOptions: {
            value: 'slm',

        }
    };

    $scope.clip = false;
    $scope.chk_clip = {
        text: 'CLIP',
        width: '100%',
        bindingOptions: {
            value: 'clip',

        }
    };

    $scope.fusion = false;
    $scope.chk_fusion = {
        text: 'Fusion Jet',
        width: '100%',
        bindingOptions: {
            value: 'fusion',

        }
    };
    ///////////////////////////////////////////
    $scope.nylon = false;
    $scope.chk_nylon = {
        text: 'Nylon',
        width: '100%',
        bindingOptions: {
            value: 'nylon',

        }
    };
    $scope.abs = false;
    $scope.chk_abs = {
        text: 'ABS(Acrylonitrile Butadiene Styrene)',
        width: '100%',
        bindingOptions: {
            value: 'abs',

        }
    };
    $scope.pla = false;
    $scope.chk_pla = {
        text: 'PLA(Polylactic Acid)',
        width: '100%',
        bindingOptions: {
            value: 'pla',

        }
    };
    $scope.hdpe = false;
    $scope.chk_hdpe = {
        text: 'HDPE(High - Density Polyethylene)',
        width: '100%',
        bindingOptions: {
            value: 'hdpe',

        }
    };
    $scope.pva = false;
    $scope.chk_pva = {
        text: 'PVA(Polyvinyl Alcohol)',
        width: '100%',
        bindingOptions: {
            value: 'pva',

        }
    };
    $scope.petg = false;
    $scope.chk_petg = {
        text: 'PETG(Polyethylene TerephThalate)',
        width: '100%',
        bindingOptions: {
            value: 'petg',

        }
    };
    $scope.resin = false;
    $scope.chk_resin = {
        text: 'Resin',
        width: '100%',
        bindingOptions: {
            value: 'resin',

        }
    };
    $scope.metals = false;
    $scope.chk_metals = {
        text: 'Metals',
        width: '100%',
        bindingOptions: {
            value: 'metals',

        }
    };
    $scope.carbon = false;
    $scope.chk_carbon = {
        text: 'Carbon Fiber Mix',
        width: '100%',
        bindingOptions: {
            value: 'carbon',

        }
    };
    $scope.multicolor = false;
    $scope.chk_multicolor = {
        text: 'Multicolor / Sandstone',
        width: '100%',
        bindingOptions: {
            value: 'multicolor',

        }
    };
    $scope.ceramic = false;
    $scope.chk_ceramic = {
        text: 'Ceramic',
        width: '100%',
        bindingOptions: {
            value: 'ceramic',

        }
    };
    $scope.wax = false;
    $scope.chk_wax = {
        text: 'Wax',
        width: '100%',
        bindingOptions: {
            value: 'wax',

        }
    };
    $scope.gypsum = false;
    $scope.chk_gypsum = {
        text: 'Gypsum',
        width: '100%',
        bindingOptions: {
            value: 'gypsum',

        }
    };
    $scope.concrete = false;
    $scope.chk_concrete = {
        text: 'Concrete',
        width: '100%',
        bindingOptions: {
            value: 'concrete',

        }
    };
    ////////////////////////////////////////////
    $scope.edit_printer = function ($event, id) {
        $event.stopPropagation();
        //////////////
        $scope.bj = false;
        $scope.clip = false;
        $scope.dlp = false;

        $scope.dmls = false;

        $scope.ebm = false;

        $scope.fdm = false;

        $scope.fusion = false;

        $scope.mp = false;

        $scope.sdl = false;

        $scope.slm = false;

        $scope.sla = false;

        $scope.sls = false;

        $scope.abs = false;

        $scope.carbon = false;

        $scope.ceramic = false;

        $scope.concrete = false;

        $scope.gypsum = false;

        $scope.hdpe = false;

        $scope.metals = false;

        $scope.multicolor = false;

        $scope.nylon = false;

        $scope.petg = false;

        $scope.pla = false;

        $scope.pva = false;

        $scope.resin = false;

        $scope.wax = false;
        ///////////////
        $scope.printer = {};
        var _printer = Enumerable.From($scope.profile.data.printers).Where('$.Id==' + id).FirstOrDefault();
        var index = ($scope.profile.data.printers.indexOf(_printer));
        $scope.printer.Id = id;
        $scope.printer.Name = _printer.Name;
        //  $scope.printer.Technology = !$scope.profile.data.printer_technology[index].startsWith('_') ? $scope.profile.data.printer_technology[index] : null;
        // $scope.printer.Material = !$scope.profile.data.materials[index].startsWith('_') ? $scope.profile.data.materials[index]:null;
        var techs = Enumerable.From($scope.profile.technologies).Where('$.PrinterId==' + id).ToArray();
        $jq.each(techs, function (_i, _d) {
            if (_d.Technology == 'Binder Jetting')
                $scope.bj = true;
            if (_d.Technology == 'CLIP')
                $scope.clip = true;
            if (_d.Technology == 'DLP')
                $scope.dlp = true;
            if (_d.Technology == 'DMLS')
                $scope.dmls = true;
            if (_d.Technology == 'EBM')
                $scope.ebm = true;
            if (_d.Technology == 'FDM')
                $scope.fdm = true;
            if (_d.Technology == 'Fusion Jet')
                $scope.fusion = true;
            if (_d.Technology == 'Multijet/ Polyjet')
                $scope.mp = true;
            if (_d.Technology == 'SDL')
                $scope.sdl = true;
            if (_d.Technology == 'Selective Laser Melting')
                $scope.slm = true;
            if (_d.Technology == 'SLA')
                $scope.sla = true;
            if (_d.Technology == 'SLS')
                $scope.sls = true;
        });
        var mats = Enumerable.From($scope.profile.materials).Where('$.PrinterId==' + id).ToArray();
        $jq.each(mats, function (_i, _d) {
            if (_d.Material == 'ABS')
                $scope.abs = true;
            if (_d.Material == 'Carbon Fiber Mix')
                $scope.carbon = true;
            if (_d.Material == 'Ceramic')
                $scope.ceramic = true;
            if (_d.Material == 'Concrete')
                $scope.concrete = true;
            if (_d.Material == 'Gypsum')
                $scope.gypsum = true;
            if (_d.Material == 'HDPE')
                $scope.hdpe = true;
            if (_d.Material == 'Metals')
                $scope.metals = true;
            if (_d.Material == 'Multicolor/ Sandstone')
                $scope.multicolor = true;
            if (_d.Material == 'Nylon')
                $scope.nylon = true;
            if (_d.Material == 'PETG')
                $scope.petg = true;
            if (_d.Material == 'PLA')
                $scope.pla = true;
            if (_d.Material == 'PVA')
                $scope.pva = true;
            if (_d.Material == 'Resin')
                $scope.resin = true;
            if (_d.Material == 'Wax')
                $scope.wax = true;
        });

        // $scope.printer.BuildVolume = !$scope.profile.data.build_volume[index].startsWith('_') ? $scope.profile.data.build_volume[index] : null;
        $scope.printer.BuildVolume_W = _printer.BuildVolume_W;
        $scope.printer.BuildVolume_H = _printer.BuildVolume_H;
        $scope.printer.BuildVolume_D = _printer.BuildVolume_D;

        // $scope.printer.MinLayerHeight = !$scope.profile.data.min_layer_height[index].startsWith('_') ? $scope.profile.data.min_layer_height[index] : null;
        // $scope.printer.MaxLayerHeight = !$scope.profile.data.max_layer_height[index].startsWith('_') ? $scope.profile.data.max_layer_height[index] : null;
        $scope.printer.Min_LH = _printer.Min_LH;
        $scope.printer.Max_LH = _printer.Max_LH;
        $scope.printer.PrintingSpeed = _printer.PrintingSpeed;
        $scope.printer.ObjectFile = !$scope.profile.data.object_file[index].startsWith('_') ? $scope.profile.data.object_file[index] : null;
        $scope.printer.Color = !$scope.profile.data.color[index].startsWith('_') ? $scope.profile.data.color[index] : null;

        $scope.popup_printer_visible = true;
    };
    $scope.add_printer = function () {
        $scope.printer = {};
        $scope.popup_printer_visible = true;
    };
    ////////////////////////////////////////////
    if (!authService.isAuthorized()) {

        // authService.redirectToLogin();

    }
    else {
        //alert($rootScope.image);
        //$jq('#link_profile').show();
        //    $scope.isEditable = $scope.profileId == $rootScope.userId;
        $scope.isEditable = $scope.edit_param;
        // alert($scope.isEditable);

    }
    //////////////////////////////////////////
    $scope.scroll_acc = {
        scrollByContent: false,
        scrollByThumb: false,
        // bindingOptions: { height: 'scroll_height', }
        height: function () { return $rootScope.popupHeightFullMax(0.95, 900) - 100; },
    };


    $scope.bind = function (id, callback) {
        $scope.loadingVisible = true;
        userService.getPrinter(id).then(function (result) {
            $scope.loadingVisible = false;

            $scope.profile = result; //Enumerable.From($rootScope.researchers).Where('$.Id==' + $scope.profileId).FirstOrDefault();
            if (!$scope.profile.User.ImageUrl)
                $scope.profile.User.ImageUrl = '../../content/imgs/_x2.png';
             $scope.profile.rateStars = "";
             $scope.build_rate();
            //$scope.profile.data.printers2 = JSON.parse(JSON.stringify($scope.profile.data.printers));
            //$scope.fill_empty_printers($scope.profile.data.printers);
            //$scope.fill_empty_cells($scope.profile.data.printer_technology);
            //$scope.fill_empty_cells($scope.profile.data.materials);
            //$scope.fill_empty_cells($scope.profile.data.build_volume);
            //$scope.fill_empty_cells($scope.profile.data.min_layer_height);
            //$scope.fill_empty_cells($scope.profile.data.max_layer_height);
            //;
            //$scope.fill_empty_cells($scope.profile.data.printing_speed);
            //$scope.fill_empty_cells($scope.profile.data.color);
            //$scope.fill_empty_cells($scope.profile.data.object_file);


            callback();
            /////////////////////////////////////////////////////
        }, function (err) { alert('x'); $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
    };
    var jssor_1_options = {
        $AutoPlay: 1,
        $Idle: 1000,
        $SlideDuration: 15000,
        $SlideEasing: $Jease$.$Linear,
        $PauseOnHover: 4,
        $SlideWidth: 350,
        $Align: 0
    };
    var jssor_1_slider;
    var MAX_WIDTH = 1220;
    function ScaleSlider() {
        var containerElement = jssor_1_slider.$Elmt.parentNode;
        var containerWidth = containerElement.clientWidth;

        if (containerWidth) {

            var expectedWidth = Math.min(MAX_WIDTH || containerWidth, containerWidth);

            jssor_1_slider.$ScaleWidth(expectedWidth);
        }
        else {
            window.setTimeout(ScaleSlider, 30);
        }
    }
    $scope.buildSlider = function () {
        jssor_1_slider = new $JssorSlider$("jssor_1", jssor_1_options);

        /*#region responsive code begin*/





        ScaleSlider();

        $jq(window).bind("load", ScaleSlider);
        $jq(window).bind("resize", ScaleSlider);
        $jq(window).bind("orientationchange", ScaleSlider);
    };

    $scope.$on('sliderRendered', function () {

        $jq('.company').fadeIn(500, function () {
            $scope.buildSlider();

        });



    });
    $scope.$on('printerRendered', function () {
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
    });
    $scope.$on('$viewContentLoaded', function () {
        //company
        $scope.bind($scope.profileId, function () {

            $jq('.printer').fadeIn(500, function () {
                 

            });
        });

    });
    ///end


}]);