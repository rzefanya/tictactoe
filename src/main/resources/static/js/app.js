var haApp = angular.module('haApp', [ 'nvd3', 'ngAria', 'ngMessages',
        'ngAnimate', 'ngMaterial', 'ngRoute', 'haControllers', 'haServices',
        'ngMaterialDatePicker', 'md.data.table', 'ngSanitize',
        'ngMaterialSidemenu' ]);

haApp.config([
        '$routeProvider',
        '$mdThemingProvider',
        function ($routeProvider, $mdThemingProvider) {
            $mdThemingProvider.theme('default').primaryPalette('blue')
                    .accentPalette('pink');

            $routeProvider.when('/dashboard', {
                templateUrl : 'partials/dashboard.html',
                controller : 'DashboardCtrl'
            }).otherwise({
                redirectTo : '/dashboard'
            });
        } ]);

haApp.directive('rzLimit', function () {
    return {
        restrict : 'A',
        require : 'ngModel',
        scope : {
            min : '=rzLimitMin',
            max : '=rzLimitMax'
        },
        link : function ($scope, $element, $attrs, ngModel) {
            ngModel.$validators.limit = function (modelValue) {
                return $scope.min <= modelValue && modelValue <= $scope.max;
            };
        }
    };
});

haApp.directive('fileModel', [ '$parse', function ($parse) {
    return {
        restrict : 'A',
        link : function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    var file = element[0].files[0];
                    modelSetter(scope, file);
                });
                scope.uploadFile();
            });
        }
    };
} ]);

haApp.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});

haApp.directive('focusOn', function ($timeout) {
    return {
        restrict : 'A',
        link : function ($scope, $element, $attr) {
            $scope.$watch($attr.focusOn, function (_focusVal) {
                $timeout(function () {
                    _focusVal ? $element.focus() : $element.blur();
                });
            });
        }
    }
});

haApp.directive('compareTo', function () {
    return {
        require : "ngModel",
        scope : {
            compareTolValue : "=compareTo"
        },
        link : function (scope, element, attributes, ngModel) {
            ngModel.$validators.compareTo = function (modelValue) {
                return modelValue == scope.compareTolValue;
            };

            scope.$watch("compareTolValue", function () {
                ngModel.$validate();
            });
        }
    };
});

haApp.service('fileUpload', [ '$http', function ($http) {
    this.uploadFileToUrl = function (file, uploadUrl, onSuccess, onError) {
        var fd = new FormData();
        fd.append('file', file);

        $http.post("http://localhost:8181/queue/dynamicreferences", fd, {
            transformRequest : angular.identity,
            headers : {
                'Content-Type' : undefined,
                "token" : localStorage.remtoken
            }
        }).success(function (result) {
            onSuccess(result);
        }).error(function (error) {
            onError(error);
        });
    }
} ]);

haApp.filter('cut', function () {
    return function (value, wordwise, max, tail) {
        if (!value)
            return '';

        max = parseInt(max, 10);
        if (!max)
            return value;
        if (value.length <= max)
            return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace !== -1) {
                // Also remove . and , so its gives a cleaner result.
                if (value.charAt(lastspace - 1) === '.'
                        || value.charAt(lastspace - 1) === ',') {
                    lastspace = lastspace - 1;
                }
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' …');
    };
});

haApp.filter("toArray", function () {
    return function (obj) {
        var result = [];
        angular.forEach(obj, function (val, key) {
            result.push(val);
        });
        return result;
    };
});

haApp.directive('apsUploadFile', apsUploadFile);

function apsUploadFile() {
    var directive = {
        restrict : 'E',
        require : '^ngModel',
        template : '<input id="fileInput" type="file" class="ng-hide"> <md-button id="uploadButton" style="height:36px; margin:auto 8px" class="md-raised" aria-label="attach_file">    Choose file </md-button><md-input-container class="no-error" md-no-float flex>    <input id="textInput" ng-model="fileName" type="text" placeholder="No file chosen" ng-readonly="true"></md-input-container>',
        link : apsUploadFileLink
    };
    return directive;
}

function apsUploadFileLink(scope, element, attrs, ctrl) {
    var input = $(element[0].querySelector('#fileInput'));
    var button = $(element[0].querySelector('#uploadButton'));
    var textInput = $(element[0].querySelector('#textInput'));

    if (input.length && button.length && textInput.length) {
        button.click(function (e) {
            input.click();
        });
        textInput.click(function (e) {
            input.click();
        });
    }

    input.on('change', function (e) {
        var files = e.target.files;
        if (files[0]) {
            ctrl.$setViewValue(files[0]);
            scope.fileName = files[0].name;
        } else {
            scope.fileName = null;
        }
        scope.$apply();
    });
}

haApp.directive('customOnChange', function () {
    return {
        restrict : 'A',
        link : function (scope, element, attrs) {
            var onChangeHandler = scope.$eval(attrs.customOnChange);
            element.on('change', onChangeHandler);
            element.on('$destroy', function () {
                element.off();
            });

        }
    };
});