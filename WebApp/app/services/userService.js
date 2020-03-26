'use strict';
app.factory('userService', ['$http', '$q', 'ngAuthSettings', '$rootScope', function ($http, $q, ngAuthSettings, $rootScope) {



    var serviceFactory = {};
    var _getProfile = function (id) {



        var deferred = $q.defer();
        $http.get(serviceBase + 'api/users/profile/' + id).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getProfiles = function () {



        var deferred = $q.defer();
        $http.get(serviceBase + 'api/users/profiles/').then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };

    var _getCompany = function (id) {



        var deferred = $q.defer();
        $http.get(serviceBase + 'api/company/' + id).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };

    ////Save //////////////////
    var _savePublication = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'api/users/publication/save', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _saveProject = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'api/users/project/save', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _savePatent = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'api/users/patent/save', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _saveCertification = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'api/users/certification/save', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _saveAward = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'api/users/award/save', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };

    var _saveImage = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'api/users/image/save', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _saveLogo = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'api/company/image/save', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    //api/users/networks/update

    var _updateNetworks = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'api/users/networks/update', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };

    var _saveUser = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'api/users/save', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };

    var _saveAccompolishments = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'api/users/accompolishments/save', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    //api/users/accompolishments/save
    ///////////////////////////

    ///Delete /////////////////////////
    var _deletePublication = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'api/users/publication/delete', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _deleteProject = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'api/users/project/delete', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _deletePatent = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'api/users/patent/delete', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _deleteCertification = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'api/users/certification/delete', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _deleteAward = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'api/users/award/delete', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };

    var _getOptions = function (pid) {



        var deferred = $q.defer();
        $http.get(serviceBase + 'api/options/'+pid).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getGMats = function () {



        var deferred = $q.defer();
        $http.get(serviceBase + 'api/gmats/').then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getSMats = function () {



        var deferred = $q.defer();
        $http.get(serviceBase + 'api/smats/').then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };

    var _getPrinter = function (id) {



        var deferred = $q.defer();
        $http.get(serviceBase + 'api/printer/' + id).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };

    var _getMaterial = function (id) {



        var deferred = $q.defer();
        $http.get(serviceBase + 'api/material/' + id).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getSuppliers = function (id) {



        var deferred = $q.defer();
        $http.get(serviceBase + 'api/suppliers/' ).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getAMProcesses = function (id) {



        var deferred = $q.defer();
        $http.get(serviceBase + 'api/amprocess/').then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getAMTechnologies = function (id) {



        var deferred = $q.defer();
        $http.get(serviceBase + 'api/amtechnology/').then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };

    var _getMan = function (id) {



        var deferred = $q.defer();
        $http.get(serviceBase + 'api/manufacturers/').then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };


    var _getMaterials = function (id) {



        var deferred = $q.defer();
        $http.get(serviceBase + 'api/materials?top=10').then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };

    ////////////////////////////////////
    var _registerCompany = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'api/company/register', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _addPrinter = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'api/company/printers/add/', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _removePrinter = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'api/company/printers/remove/', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _removeSlider = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'api/company/slider/remove/', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _updateCompany = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'api/company/update', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    ///////////////////////////////////


    serviceFactory.getProfile = _getProfile;
    serviceFactory.getProfiles = _getProfiles;

    serviceFactory.getCompany = _getCompany;

    serviceFactory.savePublication= _savePublication;
    serviceFactory.saveAward= _saveAward;
    serviceFactory.saveCertification= _saveCertification;
    serviceFactory.savePatent= _savePatent;
    serviceFactory.saveProject = _saveProject;
    serviceFactory.saveImage = _saveImage;
    serviceFactory.updateNetworks = _updateNetworks;
    serviceFactory.saveUser = _saveUser;
    serviceFactory.saveAccompolishments = _saveAccompolishments;

    serviceFactory.deletePublication= _deletePublication;
    serviceFactory.deleteProject= _deleteProject;
    serviceFactory.deletePatent= _deletePatent;
    serviceFactory.deleteCertification= _deleteCertification;
    serviceFactory.deleteAward = _deleteAward;

    serviceFactory.getOptions = _getOptions;
    serviceFactory.getSMats = _getSMats;
    serviceFactory.getGMats = _getGMats;
    serviceFactory.getPrinter = _getPrinter;
    serviceFactory.getMaterial = _getMaterial;
    serviceFactory.getSuppliers = _getSuppliers;
    serviceFactory.getAMProcesses = _getAMProcesses;
    serviceFactory.getAMTechnologies = _getAMTechnologies;
    serviceFactory.getMan = _getMan;

    serviceFactory.registerCompany = _registerCompany;
    serviceFactory.addPrinter = _addPrinter;
    serviceFactory.removePrinter = _removePrinter;
    serviceFactory.removeSlider = _removeSlider;
    serviceFactory.updateCompany = _updateCompany;
    serviceFactory.saveLogo = _saveLogo;
    serviceFactory.getMaterials = _getMaterials;
    return serviceFactory;

}]);