﻿'use strict';
app.controller('aboutController', ['$scope', '$location', '$routeParams', '$rootScope', 'pageService', 'authService', function ($scope, $location, $routeParams, $rootScope, pageService, authService) {
   
    var $jq = jQuery.noConflict();
    $scope.prms = $routeParams.prms;
    var simpleProducts = [
        "HD Video Player",
        "SuperHD Video Player",
        "SuperPlasma 50",
        "SuperLED 50",
        "SuperLED 42",
        "SuperLCD 55",
        "SuperLCD 42",
        "SuperPlasma 65",
        "SuperLCD 70",
        "Projector Plus",
        "Projector PlusHT",
        "ExcelRemote IR",
        "ExcelRemote BT",
        "ExcelRemote IP"
    ];

    var products = [{
        "ID": 1,
        "Name": "HD Video Player",
        "Price": 330,
        "Current_Inventory": 225,
        "Backorder": 0,
        "Manufacturing": 10,
        "Category": "Video Players",
        "ImageSrc": "images/products/1-small.png"
    }, {
        "ID": 2,
        "Name": "SuperHD Player",
        "Price": 400,
        "Current_Inventory": 150,
        "Backorder": 0,
        "Manufacturing": 25,
        "Category": "Video Players",
        "ImageSrc": "images/products/2-small.png"
    }, {
        "ID": 3,
        "Name": "SuperPlasma 50",
        "Price": 2400,
        "Current_Inventory": 0,
        "Backorder": 0,
        "Manufacturing": 0,
        "Category": "Televisions",
        "ImageSrc": "images/products/3-small.png"
    }, {
        "ID": 4,
        "Name": "SuperLED 50",
        "Price": 1600,
        "Current_Inventory": 77,
        "Backorder": 0,
        "Manufacturing": 55,
        "Category": "Televisions",
        "ImageSrc": "images/products/4-small.png"
    }, {
        "ID": 5,
        "Name": "SuperLED 42",
        "Price": 1450,
        "Current_Inventory": 445,
        "Backorder": 0,
        "Manufacturing": 0,
        "Category": "Televisions",
        "ImageSrc": "images/products/5-small.png"
    }, {
        "ID": 6,
        "Name": "SuperLCD 55",
        "Price": 1350,
        "Current_Inventory": 345,
        "Backorder": 0,
        "Manufacturing": 5,
        "Category": "Televisions",
        "ImageSrc": "images/products/6-small.png"
    }, {
        "ID": 7,
        "Name": "SuperLCD 42",
        "Price": 1200,
        "Current_Inventory": 210,
        "Backorder": 0,
        "Manufacturing": 20,
        "Category": "Televisions",
        "ImageSrc": "images/products/7-small.png"
    }, {
        "ID": 8,
        "Name": "SuperPlasma 65",
        "Price": 3500,
        "Current_Inventory": 0,
        "Backorder": 0,
        "Manufacturing": 0,
        "Category": "Televisions",
        "ImageSrc": "images/products/8-small.png"
    }, {
        "ID": 9,
        "Name": "SuperLCD 70",
        "Price": 4000,
        "Current_Inventory": 95,
        "Backorder": 0,
        "Manufacturing": 5,
        "Category": "Televisions",
        "ImageSrc": "images/products/9-small.png"
    }, {
        "ID": 10,
        "Name": "DesktopLED 21",
        "Price": 175,
        "Current_Inventory": 0,
        "Backorder": 425,
        "Manufacturing": 75,
        "Category": "Monitors",
        "ImageSrc": "images/products/10-small.png"
    }, {
        "ID": 11,
        "Name": "DesktopLED 19",
        "Price": 165,
        "Current_Inventory": 425,
        "Backorder": 0,
        "Manufacturing": 110,
        "Category": "Monitors",
        "ImageSrc": "images/products/11-small.png"
    }, {
        "ID": 12,
        "Name": "DesktopLCD 21",
        "Price": 170,
        "Current_Inventory": 210,
        "Backorder": 0,
        "Manufacturing": 60,
        "Category": "Monitors",
        "ImageSrc": "images/products/12-small.png"
    }, {
        "ID": 13,
        "Name": "DesktopLCD 19",
        "Price": 160,
        "Current_Inventory": 150,
        "Backorder": 0,
        "Manufacturing": 210,
        "Category": "Monitors",
        "ImageSrc": "images/products/13-small.png"
    }, {
        "ID": 14,
        "Name": "Projector Plus",
        "Price": 550,
        "Current_Inventory": 0,
        "Backorder": 55,
        "Manufacturing": 10,
        "Category": "Projectors",
        "ImageSrc": "images/products/14-small.png"
    }, {
        "ID": 15,
        "Name": "Projector PlusHD",
        "Price": 750,
        "Current_Inventory": 110,
        "Backorder": 0,
        "Manufacturing": 90,
        "Category": "Projectors",
        "ImageSrc": "images/products/15-small.png"
    }, {
        "ID": 16,
        "Name": "Projector PlusHT",
        "Price": 1050,
        "Current_Inventory": 0,
        "Backorder": 75,
        "Manufacturing": 57,
        "Category": "Projectors",
        "ImageSrc": "images/products/16-small.png"
    }, {
        "ID": 17,
        "Name": "ExcelRemote IR",
        "Price": 150,
        "Current_Inventory": 650,
        "Backorder": 0,
        "Manufacturing": 190,
        "Category": "Automation",
        "ImageSrc": "images/products/17-small.png"
    }, {
        "ID": 18,
        "Name": "ExcelRemote BT",
        "Price": 180,
        "Current_Inventory": 310,
        "Backorder": 0,
        "Manufacturing": 0,
        "Category": "Automation",
        "ImageSrc": "images/products/18-small.png"
    }, {
        "ID": 19,
        "Name": "ExcelRemote IP",
        "Price": 200,
        "Current_Inventory": 0,
        "Backorder": 325,
        "Manufacturing": 225,
        "Category": "Automation",
        "ImageSrc": "images/products/19-small.png"
        }];
    $scope.currentProduct = simpleProducts[0];
    $scope.selectBox = {
        simple: {
            items: simpleProducts
        },
        withCustomPlaceholder: {
            items: simpleProducts,
            placeholder: "Choose Product",
            showClearButton: true
        },
        readOnly: {
            items: simpleProducts,
            value: simpleProducts[0],
            readOnly: true
        },
        disabled: {
            items: simpleProducts,
            value: simpleProducts[0],
            disabled: true
        },
        dataSourceUsage: {
            dataSource: new DevExpress.data.ArrayStore({
                data: products,
                key: "ID"
            }),
            displayExpr: "Name",
            valueExpr: "ID",
            value: products[0].ID,
        },
        customTemplates: {
            dataSource: products,
            displayExpr: "Name",
            valueExpr: "ID",
            value: products[3].ID,
            fieldTemplate: "field"
        },
        eventHandler: {
            items: simpleProducts,
            bindingOptions: {
                value: "currentProduct"
            }
        }
    };
    //////////////////////////////////////////
    $scope.fu = function () {
        $rootScope.pageFunctions();
    };
    $scope.$on('$viewContentLoaded', function () {
       // alert('about');
       
        $jq('.about').fadeIn(400, function () {
            $jq('#Top_bar').show();
            $rootScope.pageFunctions();
        });
        $rootScope.$broadcast('PageLoaded', 'about');
    });
   
    ///end


}]);
