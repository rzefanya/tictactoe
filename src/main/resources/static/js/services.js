var site = "";
var haServices = angular.module('haServices', [ 'ngResource' ]);

function createResource($resource, url, method, isArray) {
    return $resource(wsurl + url, {}, {
        execute : {
            method : method,
            params : {},
            isArray : isArray,
        }
    });
}

haServices.factory("TicTacToe", [ "$resource", function ($resource) {
    return {
        start : function () {
            return createResource($resource, "/game/start", "POST", false);
        },
        move : function () {
            return createResource($resource, "/game/move", "PUT", false);
        },
        get : function () {
            return createResource($resource, "/game", "GET", false);
        }
    };
} ]);