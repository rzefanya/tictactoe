var haControllers = angular.module('haControllers', []);

/* Menu */

var timeoutid;

function checkLogin(onLogin, protect) {
    goToDashboard();
    return true;
}

function goToDashboard() {
    window.location = "#!/dashboard";
}

function logout() {
    checkLogin(false);
}

function hideMenu($scope) {
    if (localStorage.remtoken == null || localStorage.remrole == 'user') {
        $scope.hideMenu = true;
    } else {
        $scope.hideMenu = false;
    }
}

/* Controllers */

haControllers.controller('MainCtrl', [
        '$scope',
        '$mdDialog',
        '$mdSidenav',
        '$interval',
        function ($scope, $mdDialog, $mdSidenav, $interval) {
            $scope.loggedin = localStorage.remusername;
            $scope.toggleLeft = buildToggler('left');
            var navid;
            function buildToggler(navID) {
                navid = navID;
                return function () {
                    $mdSidenav(navID).toggle().then(function () {
                    });
                };
            }

            $scope.logout = function (ev) {
                var confirm = $mdDialog.confirm().title("").textContent(
                        "Logout from this application?").ariaLabel('Logout')
                        .targetEvent(ev).ok('Logout').cancel('Cancel');

                $mdDialog.show(confirm).then(function () {
                    logout();
                    $mdSidenav(navid).toggle();
                });
            };

            $scope.account = function () {
                window.location = "#!/account";
            }

            $scope.goTo = function (link) {
                window.location = link;
            }

            $scope.hide = function () {
                $scope.hideMenu = false;
                $scope.hideAccount = true;
                $scope.mainlink = "#!/dashboard";
            };

            $scope.$on("load", function (event, page) {
                $scope.hide();
            });

            $scope.$on("alert", function (event, message) {
                showAlert($scope, message.title, message.message);
            });

            $scope.$on("error", function (event, error) {
                handleError($scope, error);
            });

            $scope.hide();
        } ]);

haControllers.controller('DashboardCtrl', [
        '$scope',
        '$mdDialog',
        'TicTacToe',
        '$interval',
        function ($scope, $mdDialog, service, $interval) {
            // checkLogin(false);
            $scope.$emit("load", "dashboard");

            $scope.boardSize = 3;
            
            function get() {
                execute($scope, $mdDialog, true, service.get(), {}, function (
                        result) {
                    $scope.game = result;
                });
            }

            $scope.start = function () {
                execute($scope, $mdDialog, true, service.start(), {
                    boardSize : $scope.boardSize
                }, function (result) {
                    $scope.game = result;
                });
            }

            $scope.move = function (x, y) {
                execute($scope, $mdDialog, true, service.move(), {
                    x : x,
                    y : y
                }, function (result) {
                    $scope.game = result;
                });
            }

            get();
        } ]);
