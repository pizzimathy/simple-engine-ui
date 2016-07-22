"use strict";

(function () {})();
/**
 * Created by apizzimenti on 7/21/16.
 */

angular.module("simple-engine", []);
var app = angular.module("simple-engine");

app.directive("game", function ($injector) {
    return {
        template: "<div id=\"simple-engine\"></div>",
        link: function link(scope, element, attrs) {
            var game = new GameWindow(simpleDom);
        }
    };
});
