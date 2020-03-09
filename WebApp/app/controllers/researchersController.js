'use strict';
app.controller('researchersController', ['$scope', '$location', '$window', '$routeParams', '$rootScope', 'userService', 'authService', '$http', '$q', function ($scope, $location, $window, $routeParams, $rootScope, userService, authService, $http, $q) {

    var $jq = jQuery.noConflict();
    //link-profile
    $jq('body').on('click', '.link-profile', function (e) {
        // do something
        e.preventDefault();
        var id = $jq(this).data('uid');
        // $rootScope.navigate('/profile/'+id);
      
        if (authService.isAuthorized()) {
            $window.open('#!/profile/' + id);
        }
        else {
            //alert('sign in/sign up');

            $scope.$apply(function () {
                $scope.showInfo();
            });
        }

    });
    $jq("link[href='content/css/wp-shortcodes.css?ver=20.9.6.2']").remove();
    $scope.prms = $routeParams.prms;
    /////////////////////////////////
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
    //////////////////////////////////
    $scope.dataSource = [];
    $scope.prepareDataSource = function () {
        $jq.each($rootScope.researchers, function (_i, _d) {
            _d.NetworkIds = Enumerable.From(_d.Networks).Select('$.Id').ToArray();
        });
    };
    $scope.ex_str = null;
    $scope.bind = function () {

        // var id = $jq(this).data('uid');

        var offs = $jq('.researchers .circle-gray');

        var ex = [];
        
        //var result = Enumerable.From($rootScope.researchers).ToArray();

        $jq.each(offs, function (_i, _d) {
            var _id = $jq(_d).data('id');
            ex.push(_id);
            //    result = Enumerable.From(result).Where('$.NetworkIds.indexOf('+_id+')==-1').ToArray();

        });
        if (ex.length > 0)
            $scope.ex_str = ex.join('_');
        else
            $scope.ex_str = null;
        if ($scope.dg_instance)
            $scope.dg_instance.refresh();
        if ($scope.dg_instance_xs)
            $scope.dg_instance_xs.refresh();

        return;
        //$rootScope.serviceUrl+"api/users/profiles";
        //$scope.dataSource = result;
        var url = "api/users/profiles";
        $scope.dataSource = {
            store: {
                type: "odata",
                url: $rootScope.serviceUrl + url,
                //url:"https://js.devexpress.com/Demos/WidgetsGallery/data/orderItems",
                key: "Id",
                version: 4,
                onLoaded: function (e) {
                    // $scope.loadingVisible = false;
                    //filter
                    $rootScope.$broadcast('OnDataLoaded', null);
                },
                beforeSend: function (e) {

                    // $scope.dsUrl = General.getDsUrl(e);

                    // $scope.$apply(function () {
                    //    $scope.loadingVisible = true;
                    // });
                    $rootScope.$broadcast('OnDataLoading', null);
                },
            },
            // filter: [['OfficeCode', 'startswith', $scope.ParentLocation.FullCode]],
            sort: [{ getter: "DateJoin", desc: true }],

        };


        //$scope.dataSource = DevExpress.data.AspNet.createStore({
        //    key: "Id",
        //    loadUrl: url + "api/users/profiles",

        //    onBeforeSend: function (method, ajaxOptions) {
        //        ajaxOptions.xhrFields = { withCredentials: false };
        //    }
        //});


        //////////////////////////////////////////////////
        //userService.getProfiles().then(function (result) {

        //    $scope.dataSource = result;
        //    /////////////////////////////////////////////////////
        //}, function (err) { alert('x'); $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
        /////////////////////////////////////////////////
        var orders = new DevExpress.data.CustomStore({
            load: function (loadOptions) {
                var parameters = {};

                if (loadOptions.sort) {
                    parameters.orderby = loadOptions.sort[0].selector;
                    if (loadOptions.sort[0].desc)
                        parameters.orderby += " desc";
                }

                parameters.skip = loadOptions.skip;
                parameters.take = loadOptions.take;

                var config = {
                    params: parameters
                };

                return $http.get("https://js.devexpress.com/Demos/WidgetsGallery/data/orderItems", config)
                    .then(function (response) {
                        return { data: response.data.items, totalCount: response.data.totalCount };
                    }, function (response) {
                        return $q.reject("Data Loading Error");
                    });
            }
        });

        //$scope.dataSource = {
        //    store: orders
        //};
        ///////////////////////////////////////////////////
    };
    $scope.prepareDataSource();
   
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

            if ($scope.ex_str)
                parameters.exc = $scope.ex_str;

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
    ////////////////////////////////////////////////
    $scope.dg_instance = null;
    $scope.dg_instance_xs = null;
    $scope.dg_columns = [
        {
            dataField: "ImageUrl",
            caption: '',
            width: 90,
            allowFiltering: false,
            allowSorting: false,
            cellTemplate: function (container, options) {
                var img = "<a class='dg-cell-link link-profile' href='#' data-uid='" + options.data.Id + "' style=''    >"
                    + "<img style='border-radius:0%;'  src='../../content/upload/" + options.value + "' />"
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
        { dataField: 'Position', caption: 'Position', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 330, },
        { dataField: 'University', caption: 'Organization', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 220 },
        { dataField: 'Location', caption: 'Location', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 260 },
        {
            dataField: 'Networks', caption: 'Networks', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false,
            cellTemplate: function (container, options) {
                //var links = [];
                //$jq.each(options.data.Networks, function (_i, _d) {
                //    links.push("<a class='dg-cell-link' href='" + _d.link + "'>" + _d.Title + "</a>");
                //});

                //$jq("<div>")
                //    // .append($jq("<img style='border-radius:50%'>", { "src":'../../content/upload/'+ options.value }))
                //    .append(links.join(', '))
                //    .appendTo(container);
                $jq("<div>")
                    .append("<a class='dg-cell-link' href='#'>" + options.value + "</a>")

                    .appendTo(container);
            }

        },


    ];
    $scope.dg_researchers1 = {
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
        scrolling: { mode: 'infinite' },
        paging: { pageSize: 5 },
        showBorders: true,
        selection: { mode: 'single' },

        columnAutoWidth: false,


        columns: $scope.dg_columns,
        onContentReady: function (e) {

        },
        onSelectionChanged: function (e) {
            var data = e.selectedRowsData[0];



        },
        height: '625',
        bindingOptions: {
            dataSource: 'dataSource',
            // height: 'dg_employees_height'
        }
    };
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


        // dataSource: employees,
        columns: $scope.dg_columns,
        onContentReady: function (e) {
            if (!$scope.dg_instance)
                $scope.dg_instance = e.component;
        },
        onSelectionChanged: function (e) {

        },
        height: '625',
        dataSource: {
            store: orders
        },
        bindingOptions: {
            // dataSource: 'dataSource', //'dg_employees_ds',
            // height: 'dg_employees_height'
        }
    };

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
                    +"</a>"
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
            // height: 'dg_employees_height'
        }
    };
   // $scope.bind();
    //////////////////////////////////////////
    $scope.circle_clicked = function ($event) {
        $jq($event.currentTarget).toggleClass('circle-gray');
        //$scope.dataSource = [];
        $scope.bind();

    };
    //////////////////////////////////////////
    $scope.circleBaseWidth = 190 * 0.9;
    $scope.getCircleWidth = function (w) {
        var _w = w * 1.0 * 100 / 686;
        return _w + '%';
    };
    $scope.$on('$viewContentLoaded', function () {
        // alert('about');

        $jq('.researchers').fadeIn(400, function () {
            //alert( $jq('#xs-core').width());
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
            // $jq('#tbox').css('left', w1 + 'px');




            //alert(w1);
            // $rootScope.pageFunctions();
        });
        $rootScope.$broadcast('PageLoaded', 'research');
    });

    ///end


}]);