'use strict';
app.controller('materialsController', ['$scope', '$location', '$window', '$routeParams', '$rootScope', 'userService', 'authService', '$http', '$q', function ($scope, $location, $window, $routeParams, $rootScope, userService, authService, $http, $q) {

    var $jq = jQuery.noConflict();
    $jq('body').on('click', '.link-profile', function (e) {
        // do something
        e.preventDefault();
        var id = $jq(this).data('uid');
        if (authService.isAuthorized()) {
            $window.open('#!/material/' + id);
        }
        else
        {
            $scope.$apply(function () {
                $scope.showInfo();
            });
        }
        

    });
    $scope.prms = $routeParams.prms;
    //////////////////////////////////////////
    $scope.visiblePopup = false;

    $scope.popupOptions = {
        width: 450,
        height: 130,
        contentTemplate: "info",
        showTitle: true,
        title: "",
        dragEnabled: false,
        closeOnOutsideClick: true,
        bindingOptions: {
            visible: "visiblePopup",
        }
    };
    $scope.showInfo = function () {

        $scope.visiblePopup = true;
    };
    ////////////////////////////////////////
    $scope.tag_mans_instance = null;
    $scope.tag_mans = {
        dataSource: $rootScope.getDatasourceMans(),
        searchEnabled: true,
        hideSelectedItems: true,
        displayExpr: "Name",
        valueExpr: 'Id',
        onContentReady: function (e) {
            if (!$scope.tag_mans_instance)
                $scope.tag_mans_instance = e.component;
        },
        bindingOptions: {

            // value: "entity.BookAuthors"
        },

    };
    $scope.tag_modes_instance = null;
    $scope.tag_modes = {
        dataSource: $rootScope.getDatasourceOption(1293),
        searchEnabled: true,
        hideSelectedItems: true,
        displayExpr: "Title",
        valueExpr: 'Id',
        onContentReady: function (e) {
            if (!$scope.tag_modes_instance)
                $scope.tag_modes_instance = e.component;
        },
        bindingOptions: {

            // value: "entity.BookAuthors"
        },

    };
    //////////////////////////////////////////
    $scope.material = "";
    $scope.txt_material = {
        placeholder: 'MATERIAL',
        width: '100%',
        bindingOptions: {
            value: 'material'
        }
    };

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

    $scope.getMaterialFilter = function () {
        var filter = [];
        if ($scope.abs)
            filter.push('ABS');
        if ($scope.carbon)
            filter.push('Carbon Fiber Mix');
        if ($scope.ceramic)
            filter.push('Ceramic');
        if ($scope.concrete)
            filter.push('Concrete');
        if ($scope.gypsum)
            filter.push('Gypsum');
        if ($scope.hdpe)
            filter.push('HDPE');
        if ($scope.metals)
            filter.push('Metals');
        if ($scope.multicolor)
            filter.push('Multicolor/ Sandstone');
        if ($scope.nylon)
            filter.push('Nylon');
        if ($scope.petg)
            filter.push('PETG');
        if ($scope.pla)
            filter.push('PLA');
        if ($scope.pva)
            filter.push('PVA');
        if ($scope.resin)
            filter.push('Resin');
        if ($scope.wax)
            filter.push('Wax');

        return filter.join('_');
    };



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

    $scope.getTechnologyFilter = function () {
        var filter = [];
        if ($scope.bj)
            filter.push('Binder Jetting');
        if ($scope.clip)
            filter.push('CLIP');
        if ($scope.dlp)
            filter.push('DLP');
        if ($scope.dmls)
            filter.push('DMLS');
        if ($scope.ebm)
            filter.push('EBM');
        if ($scope.fdm)
            filter.push('FDM');
        if ($scope.fusion)
            filter.push('Fusion Jet');

        if ($scope.mp)
            filter.push('Multijet/ Polyjet');

        if ($scope.sdl)
            filter.push('SDL');
        if ($scope.slm)
            filter.push('Selective Laser Melting');
        if ($scope.sla)
            filter.push('SLA');
        if ($scope.sls)
            filter.push('SLS');

        return filter.join('_');
    };

    $scope.rush24 = false;
    $scope.chk_rush24 = {
        text: '24 Hours Delivery',
        //width: '200',
        bindingOptions: {
            value: 'rush24',

        }
    };
    $scope.rush48 = false;
    $scope.chk_rush48 = {
        text: '48 Hours Delivery',
        // width: '200',
        bindingOptions: {
            value: 'rush48',

        }
    };

    $scope.MeanTensileStrength = null;
    $scope.txt_MeanTensileStrength = {

       // placeholder: 'W',
        min: 0,
        bindingOptions: {
            value: 'MeanTensileStrength',
        }

    };

    $scope.MinFlexuralStrength  = null;
    $scope.txt_MinFlexuralStrength = {

        // placeholder: 'W',
        min: 0,
        bindingOptions: {
            value: 'MinFlexuralStrength',
        }

    };


    $scope.H = null;
    $scope.txt_h = {

        placeholder: 'H',
        min: 0,
        bindingOptions: {
            value: 'H',
        }

    };
    $scope.D = null;
    $scope.txt_d = {

        placeholder: 'D',
        min: 0,
        bindingOptions: {
            value: 'D',
        }

    };
    $scope.minh = null;
    $scope.txt_minh = {
        width: '195px',
        //  placeholder: 'W',
        min: 0,
        bindingOptions: {
            value: 'minh',
        }

    };
    $scope.maxh = null;
    $scope.txt_maxh = {
        width: '195px',
        //  placeholder: 'W',
        min: 0,
        bindingOptions: {
            value: 'maxh',
        }

    };
    //////////////////////////
    var empty = true;
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
            //foos
            if ($scope.material)
                parameters.Material = $scope.material;
            if ($scope.MeanTensileStrength)
                parameters.mts = $scope.MeanTensileStrength;
            if ($scope.MinFlexuralStrength)
                parameters.mfs = $scope.MinFlexuralStrength;

            //var materials_filters = $scope.getMaterialFilter();
            //if (materials_filters)
            //    parameters.materials = materials_filters;

            //var tech_filters = $scope.getTechnologyFilter();
            //if (tech_filters)
            //    parameters.techs = tech_filters;

            //if ($scope.W)
            //    parameters.bvw = $scope.W;
            //if ($scope.H)
            //    parameters.bvh = $scope.H;
            //if ($scope.D)
            //    parameters.bvd = $scope.D;

            //if ($scope.minh)
            //    parameters.min = $scope.minh;
            //if ($scope.maxh)
            //    parameters.maxh = $scope.maxh;

            //if ($scope.rush24)
            //    parameters.r24 = true;
            //if ($scope.rush48)
            //    parameters.r48 = true;
            //if ($scope.location)
            //    parameters.zip = $scope.location;
            var _supps = $scope.dg_supplier_instance.getSelectedRowsData();
            var _suppsIds = Enumerable.From(_supps).Select('$.Name').ToArray().join('_');
            if (_suppsIds)
                parameters.sups = _suppsIds;

            var _mats = $scope.dg_gmat_instance.getSelectedRowsData();
            console.log(_mats);
            var _matsIds = Enumerable.From(_mats).Select('$.Title').ToArray().join('_');
            if (_matsIds)
                parameters.gmaterials = _matsIds;

            var config = {
                params: parameters
            };
            console.log(config);

            return $http.get($rootScope.serviceUrl + "api/materials", config)
                .then(function (response) {
                    console.log('elapsed');
                    console.log(response.data.elapsed);
                    return { data: response.data.items, totalCount: response.data.totalCount };
                }, function (response) {
                    return $q.reject("Data Loading Error");
                });
        }
    });
    $scope.bind = function () {
        var url = 'api/materials';
        if (!$scope.dg_ds2 /*&& $scope.doRefresh*/) {

            $scope.dg_ds2 = {
                store: {
                    type: "odata",
                    url: $rootScope.serviceUrl + url,
                    key: "Id",
                    version: 4,
                    onLoaded: function (e) {
                        if ($scope.bindFilters) {
                            $scope.bindFilters = false;
                            userService.getSuppliers().then(function (response) {

                                $scope.dg_supplier_ds = response;
                                userService.getOptions(1449).then(function (response) {

                                    $scope.dg_tech_ds = response;

                                }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

                            }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

                        }

                    },
                    beforeSend: function (e) {
                        console.log(e);
                        e.params.top = e.params.$top;
                        delete e.params.$top;
                        if (e.params.$skip)
                        {
                            e.params.skip = e.params.$skip;
                            delete e.params.$skip;
                        }


                        if ($scope.material)
                            e.params.Material = $scope.material;
                        if ($scope.MeanTensileStrength)
                            e.params.mts = $scope.MeanTensileStrength;
                        if ($scope.MinFlexuralStrength)
                            e.params.mfs = $scope.MinFlexuralStrength;
                        var _supps = $scope.dg_supplier_instance.getSelectedRowsData();
                        var _suppsIds = Enumerable.From(_supps).Select('$.Name').ToArray().join('_');
                        if (_suppsIds)
                            e.params.sups = _suppsIds;

                        var _mats = $scope.dg_gmat_instance.getSelectedRowsData();
                        
                        var _matsIds = Enumerable.From(_mats).Select('$.Title').ToArray().join('_');
                        if (_matsIds)
                            e.params.gmaterials = _matsIds;


                        $scope.dsUrl = General.getDsUrl(e);

                        // $scope.$apply(function () {
                        //    $scope.loadingVisible = true;
                        // });
                        $rootScope.$broadcast('OnDataLoading', null);
                    },
                },
                // filter: [['OfficeCode', 'startswith', $scope.ParentLocation.FullCode]],
                //sort: [{ getter: "DateCreate", desc: true }],

            };
        }

        if ($scope.doRefresh) {

            $scope.dg_instance.refresh();
            $scope.doRefresh = false;
        }

    };
    $scope.ds = [];
    $scope.search = function () {

        if ($jq(window).width() < 700) {
            if (!$scope.dg_instance_xs.option("dataSource"))
                $scope.dg_instance_xs.option("dataSource", {
                    store: orders
                });
            else
                $scope.dg_instance_xs.refresh();
        }
        else {
            //if (!$scope.dg_instance.option("dataSource"))
            //    $scope.dg_instance.option("dataSource", {
            //        store: orders
            //    });
            //else
            //    $scope.dg_instance.refresh();
            $scope.doRefresh = true;
            $scope.dg_ds2 = null;
            $scope.bind();
        }



        //$scope.ds = {
        //    store: orders
        //};
        //console.log($scope.dg_instance.dataSource);
        //$scope.dg_instance.refresh();
    };
    /////////////////////////////////////
    $scope.build_rate = function (data, small) {




        var rateStars = "";
        var score = Math.floor(data.TotalRate);
        for (var i = 0; i < score; i++) {
            rateStars += '<i class="icon ion-md-star color-p star" style="color:#ffcc00 !important' + (small ? ';font-size:20px' : '') + '"  ></i>';
        }
        var rem = Math.floor(5 - data.TotalRate);
        var half = (5 - data.TotalRate) - rem;
        if (half > 0)
            rateStars += '<i class="icon ion-md-star-half color-p star" style="color:#ffcc00 !important' + (small ? ';font-size:20px' : '') + '"  ></i>';
        for (var j = 0; j < rem; j++) {
            rateStars += '<i class="icon ion-md-star-outline color-p star" style="color:#ffcc00 !important' + (small ? ';font-size:20px' : '') + '"  ></i>';
        }


        return rateStars;


    };
    ///////////////////////////////
    $scope.dg_tech_instance = null;
    $scope.dg_tech_ds = null;
    $scope.dg_tech_columns = [

        {
            dataField: 'Title', caption: 'Title', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false,

        },




    ];
    $scope.dg_tech = {
        showColumnHeaders: false,
        wordWrapEnabled: true,
        headerFilter: {
            visible: false
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
        remoteOperations: {
            sorting: true,
            paging: true,
            filtering: true
        },
        paging: {
            pageSize: 12
        },
        pager: {
            showPageSizeSelector: false,
            // allowedPageSizes: [5, 10, 20],
            showInfo: false,
            showNavigationButtons: true,
        },
        showBorders: true,
        selection: { mode: 'multiple' },

        columnAutoWidth: false,


        // dataSource: employees,
        columns: $scope.dg_tech_columns,
        onContentReady: function (e) {
            if (!$scope.dg_tech_instance)
                $scope.dg_tech_instance = e.component;
        },
        onSelectionChanged: function (e) {

        },
        height: '352',
        //dataSource: {
        //    store: []
        //},
        bindingOptions: {
            dataSource: 'dg_tech_ds',
            // height: 'dg_employees_height'
        }
    };
    ///////////////////////////////
    $scope.dg_supplier_instance = null;
    $scope.dg_supplier_ds = null;
    $scope.dg_supplier_columns = [

        {
            dataField: 'Name', caption: 'Title', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false,

        },




    ];
    $scope.dg_supplier = {
        showColumnHeaders: false,
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
            pageSize: 1000
        },
        pager: {
            showPageSizeSelector: false,
            // allowedPageSizes: [5, 10, 20],
            showInfo: false,
            showNavigationButtons: true,
        },
        showBorders: true,
        selection: { mode: 'multiple' },

        columnAutoWidth: false,


        // dataSource: employees,
        columns: $scope.dg_supplier_columns,
        onContentReady: function (e) {
            if (!$scope.dg_supplier_instance)
                $scope.dg_supplier_instance = e.component;
        },
        onSelectionChanged: function (e) {

        },
        height: '352',
        //dataSource: {
        //    store: []
        //},
        bindingOptions: {
            dataSource: 'dg_supplier_ds',
            // height: 'dg_employees_height'
        }
    };
    /////////////////////////////
    
    ////////////////////////////
    $scope.dg_gmat_instance = null;
    $scope.dg_gmat_ds = null;
    $scope.dg_gmat_columns = [

        {
            dataField: 'Title', caption: 'Title', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false,

        },




    ];
    $scope.dg_gmat = {
        showColumnHeaders: false,
        wordWrapEnabled: true,
        headerFilter: {
            visible: false
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
        remoteOperations: {
            sorting: true,
            paging: true,
            filtering: true
        },
        paging: {
            pageSize: 12
        },
        pager: {
            showPageSizeSelector: false,
            // allowedPageSizes: [5, 10, 20],
            showInfo: true,
            showNavigationButtons: true,
        },
        showBorders: true,
        selection: { mode: 'multiple' },

        columnAutoWidth: false,


        // dataSource: employees,
        columns: $scope.dg_gmat_columns,
        onContentReady: function (e) {
            if (!$scope.dg_gmat_instance)
                $scope.dg_gmat_instance = e.component;
        },
        onSelectionChanged: function (e) {

        },
        height: '352',
        //dataSource: {
        //    store: []
        //},
        bindingOptions: {
            dataSource: 'dg_gmat_ds',
            // height: 'dg_employees_height'
        }
    };
    //////////////////////////////
    $scope.dg_smat_instance = null;
    $scope.dg_smat_ds = null;
    $scope.dg_smat_columns = [

        {
            dataField: 'Title', caption: 'Title', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false,

        },




    ];
    $scope.dg_smat = {
        showColumnHeaders: false,
        wordWrapEnabled: true,
        headerFilter: {
            visible: false
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
        remoteOperations: {
            sorting: true,
            paging: true,
            filtering: true
        },
        paging: {
            pageSize: 12
        },
        pager: {
            showPageSizeSelector: false,
            // allowedPageSizes: [5, 10, 20],
            showInfo: true,
            showNavigationButtons: true,
        },
        showBorders: true,
        selection: { mode: 'multiple' },

        columnAutoWidth: false,


        // dataSource: employees,
        columns: $scope.dg_smat_columns,
        onContentReady: function (e) {
            if (!$scope.dg_smat_instance)
                $scope.dg_smat_instance = e.component;
        },
        onSelectionChanged: function (e) {

        },
        height: '352',
        //dataSource: {
        //    store: []
        //},
        bindingOptions: {
            dataSource: 'dg_smat_ds',
            // height: 'dg_employees_height'
        }
    };
    /////////////////////////////
    $scope.dg_instance = null;
    $scope.dg_columns = [

        {
            dataField: 'Material1', caption: 'Material', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, fixed: false, fixedPosition: 'left',
            cellTemplate: function (container, options) {
                var elem = "<div class='dg-cell-div' ><a class='dg-cell-link link-profile' href='#' data-uid='" + options.data.Id + "' style='' target='_blank'   >" + options.data.Material1 + "</a></div>";
                $jq("<div>")
                    // .append($jq("<img style='border-radius:50%'>", { "src":'../../content/upload/'+ options.value }))
                    .append(elem)
                    .appendTo(container);
            }
        },


        { dataField: 'Supplier', caption: 'Supplier', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, },


        { caption: 'General', dataField: 'General', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, },
        // { caption: 'AM Technology', dataField: 'AMTechnology', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 250 },
         { caption: 'Specific', dataField: 'Specific', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, },
       // { caption: 'Specific Supported Materials', dataField: 'MaterialsSpecific', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 300 },

       // { caption: 'Price Range (USD)', dataField: 'PriceRange', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 250 },

      // { caption: 'Year Retired', dataField: 'YearRetired', allowResizing: true, alignment: 'left', dataType: 'number', allowEditing: false, width: 250 },
       // { caption: 'X-dimension (mm)', dataField: 'DimensionX', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 250 },
       // { caption: 'Y-dimension (mm)', dataField: 'DimensionY', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 250 },
       //  { caption: 'Z-dimension (mm)', dataField: 'DimensionZ', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 250 },
       //{ caption: 'X-dimension (inches)', dataField: 'DimensionXinch', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 250 },
      //  { caption: 'Y-dimension (inches)', dataField: 'DimensionYinch', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 250 },
       // { caption: 'Z-dimension (inches)', dataField: 'DimensionZinch', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 250 },
      //   { caption: 'Layer Min (Micron)', dataField: 'LayerMin', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 250 },
     //  { caption: 'Layer Max (Micron)', dataField: 'LayerMax', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 250 },
      //   { caption: 'Focus Diameter Min (micron)', dataField: 'FocusDiameterMin', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 250 },
      //  { caption: 'Focus Diameter Min (inches)', dataField: 'FocusDiameterMininch', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 250 },
    //  { caption: 'Focus Diameter Max (micron)', dataField: 'FocusDiameterMax', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 250 },
    // { caption: 'Focus Diameter Max (inches)', dataField: 'FocusDiameterMaxinch', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 250 },
    //   { caption: 'Scanning Speed Max (m/s)', dataField: 'ScanningSpeedMax', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 250 },
    //{ caption: 'Scanning Speed Max (in/s)', dataField: 'ScanningSpeedMaxinch', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 250 },
     //  { caption: 'Scanning Speed Min (m/s)', dataField: 'ScanningSpeedMin', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 250 },
     //  { caption: 'Scanning Speed Min (in/s)', dataField: 'ScanningSpeedMininch', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 250 },
     //  { caption: 'Power (W)', dataField: 'Power', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 250 },
     //   { caption: 'Number of Printheads', dataField: 'PrintheadNo', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 250 },
     //  { caption: 'Filament Diameter', dataField: 'FilamentDiameter', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 250 },
     //     { caption: 'Tolerance (micron)', dataField: 'Tolerance', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 250 },
     //    { caption: 'Number of Lasers', dataField: 'LasersNo', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 250 },
      //   { caption: 'Laser Type', dataField: 'LaserType', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 300 },
      //    { caption: 'Laser Wavelength (nm)', dataField: '', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 250 },
     //  { caption: 'Max Beam Power (W)', dataField: 'LaserWavelength', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 250 },
    // { caption: 'Optics', dataField: 'Optics', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 250 },
    //   { caption: 'Open Source', dataField: 'OpenSource', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 250 },
    // { caption: 'Restricted', dataField: 'Restricted', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 250 },
    //     { caption: 'Heated Platform', dataField: 'HeatedPlatform', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 250 },
    //  { caption: 'Controls', dataField: 'Controls', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 250 },
     //  { caption: 'Category', dataField: 'Category', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 250 },
        //{
        //    dataField: 'TotalRate', caption: 'Rating', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 200,
        //    cellTemplate: function (container, options) {
        //        var elem = $scope.build_rate(options.data);
        //        $jq("<div>")
        //            // .append($jq("<img style='border-radius:50%'>", { "src":'../../content/upload/'+ options.value }))
        //            .append(elem)
        //            .appendTo(container);
        //    }
        //},



    ];
    $scope.dg_height = $jq(window).height() - 130;
    $scope.dgPageSize = 100;
    $scope.old_dg_printing = {
        wordWrapEnabled: true,
        headerFilter: {
            visible: false
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
        remoteOperations: {
            sorting: true,
            paging: true,
            filtering: true
        },
        
        pager: {
            showPageSizeSelector: false,
            // allowedPageSizes: [5, 10, 20],
            showInfo: true,
            showNavigationButtons: true,
        },
        showBorders: true,
        selection: { mode: 'single' },

        columnAutoWidth: true,


        // dataSource: employees,
        columns: $scope.dg_columns,
        onContentReady: function (e) {
            if (!$scope.dg_instance)
                $scope.dg_instance = e.component;
        },
        onSelectionChanged: function (e) {

        },
        //height: '625',
        // height:$jq(window).height() - 200,
        //height:'100%',
        //dataSource: {
        //    store: []
        //},
        bindingOptions: {
            // dataSource: 'ds', //'dg_employees_ds',
            height: 'dg_height',
            'paging.pageSize':'dgPageSize'
        }
    };

    $scope.dg_printing = {
        wordWrapEnabled: true,
        headerFilter: {
            visible: false
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
        
        scrolling: { mode: 'infinite' },
        paging: { pageSize: 50 },
       
        showBorders: true,
        selection: { mode: 'single' },

        columnAutoWidth: true,


        // dataSource: employees,
        columns: $scope.dg_columns,
        onContentReady: function (e) {
            if (!$scope.dg_instance)
                $scope.dg_instance = e.component;
        },
        onSelectionChanged: function (e) {

        },
        //height: '625',
        // height:$jq(window).height() - 200,
        //height:'100%',
        //dataSource: {
        //    store: []
        //},
        bindingOptions: {
            // dataSource: 'ds', //'dg_employees_ds',
            height: 'dg_height',
            dataSource: 'dg_ds2',
        }
    };
    $scope.bindFilters = true;
    $scope.dg_ds2 = null;
    $scope.doRefresh = true;
  
    ////////////////////////
    $scope.dg_instance_xs = null;
    $scope.dg_columns_xs = [
        {
            dataField: "ImageUrl",
            caption: '',
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
                    + "<img style='border-radius:0%;min-width:95px;width:95px;height:95px; '  src='../../content/upload/" + options.value + "' />"
                    + "</a>"
                    + "</td>"
                    + "<td style='padding-top:0 !important'>"
                    + "<div class='dg-cell-div' ><a class='dg-cell-link link-profile' href='#' data-uid='" + options.data.Id + "' style='font-size:15px;'    >" + options.data.Name + "</a></div>"
                   // + "<div class='dg-cell-div' style='font-size:13px'>" + options.data.Organization + ", " + options.data.Position + "</div>"
                    + "<div  class='dg-cell-div'  style='font-size:13px'>" + options.data.Location + "</div>"
                    + "<div class='dg-cell-div'>" + "<a class='dg-cell-link' style='font-size:13px;' href='#'>" + options.data.Website + "</a>" + "</div>"
                    + "<div class='dg-cell-div'>" + "<a class='dg-cell-link' style='font-size:13px;' href='#'>" + options.data.Network + "</a>" + "</div>"

                    + "<div class='dg-cell-div'>" + $scope.build_rate(options.data, true) + "</div>"
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
    $scope.dg_printing_xs = {
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
        //dataSource: {
        //    store: orders
        //},
        width: '100%',
        //  height: '550',
        bindingOptions: {
            // dataSource: 'dataSource',
            //   dataSource: 'dg_ds', //'dg_employees_ds',
            // height: 'dg_employees_height'
        }
    };
    /////////////////////
    $scope.show_advanced_filters = function () {

        $jq('#show_filters').fadeOut(400, function () {
            $jq('.sec3').css('padding-bottom', '0');
            $jq('#filter_panel').fadeIn();
        });


    };
    $scope.close_filters = function () {
        $jq('#filter_panel').fadeOut(300, function () {
            $jq('.sec3').css('padding-bottom', '20px');
            $jq('#show_filters').fadeIn();
        });
    };

    $scope.$on('$viewContentLoaded', function () {
        $scope.search();
        var acc = document.getElementsByClassName("accordion");
        var i;

        for (i = 0; i < acc.length; i++) {
            acc[i].onclick = function () {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    $jq(panel).fadeOut(400, function () {
                        panel.style.maxHeight = null;
                        $jq(panel).height(0);
                    });


                } else {
                    if (!$jq(panel).hasClass('ac4'))
                        panel.style.maxHeight =  /*panel.scrollHeight  + "px"*/ "355px";
                    else
                        panel.style.maxHeight = "510px";
                    if (!$jq(panel).hasClass('ac3'))
                        $jq(panel).height(355);
                    $jq(panel).fadeIn();
                }
                $scope.$apply(function () {
                    var na = $jq('.accordion.ac3.active').length;
                    if (na > 0)
                    {
                        $scope.dg_height = ($jq(window).height() - 130) + na * 355;
                        $scope.dgPageSize = 100+na*7;
                    } //$jq('#grd-container').height();
                    else
                    {
                        $scope.dg_height = $jq(window).height() - 130;
                        $scope.dgPageSize = 100;

                    }
                    //sook
                });

            }
        }


        var j;
        for (j = 0; j < acc.length; j++) {
            if (!acc[j].classList.contains('ac3')) {
                acc[j].classList.toggle("active");
                var panel = acc[j].nextElementSibling;
                if (panel.style.maxHeight) {
                    $jq(panel).fadeOut(400, function () {
                        panel.style.maxHeight = null;
                        $jq(panel).height(0);
                    });


                } else {

                    if (!$jq(panel).hasClass('ac4'))
                        panel.style.maxHeight =  /*panel.scrollHeight  + "px"*/ "355px";
                    else
                        panel.style.maxHeight = "510px";
                    if (!$jq(panel).hasClass('ac3'))
                        $jq(panel).height(355);
                    $jq(panel).fadeIn();
                }
            }
        }


        

        //userService.getGMats().then(function (response) {

        //    $scope.dg_gmat_ds = response;

        //}, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
       

        $scope.dg_gmat_ds = [
            { Title: 'Ceramic' },
            { Title: 'Composite' },
            { Title: 'Metal' },
            { Title: 'Paper' },
            { Title: 'Polymer' },
            { Title: 'Sand' },
            { Title: 'Wax' },
        ];
        

    });


    ///end


}]);