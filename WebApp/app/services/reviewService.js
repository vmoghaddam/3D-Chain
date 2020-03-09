'use strict';
app.factory('reviewService', ['$http', '$q', 'ngAuthSettings', '$rootScope', function ($http, $q, ngAuthSettings, $rootScope) {
    var serviceFactory = {};

    var _getReview = function (id) {

        var deferred = $q.defer();
        $http.get(serviceBase + 'api/reviews/' + id).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    ////Save //////////////////
    var _updateReview = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'api/reviews/update/', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    ///Delete /////////////////////////
    var _delete  = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'api/reviews/delete', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    ////////////////////////

    serviceFactory.getReview = _getReview;
    serviceFactory.updateReview = _updateReview;
    serviceFactory.delete = _delete;

    return serviceFactory;

}]);