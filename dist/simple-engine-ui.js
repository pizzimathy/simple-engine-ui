/*! simple-engine-ui - v0.0.1 - 2016-07-27
* https://github.com/apizzimenti/simple-engine-ui#readme
* Copyright (c) 2016 ; Licensed MIT */
"use strict";

(function () {})();

/**
 * Created by apizzimenti on 7/21/16.
 */

function Display(json) {
    this.json = json;
    this.gameWindow = $("#gameWindow");
    this.generate();
}

Display.prototype.generate = function () {
    var _this2 = this;

    var l = document.createElement("ul"),
        t = document.createElement("div"),
        text = this.json.text,
        c;

    t.className = "text";
    this.gameWindow.append(t);
    typewriter(t, text);

    l.className = "options activeOpt";
    this.activeOpt = l;

    if (this.json.children) {
        this.gameWindow.append(l);

        document.addEventListener("typewriter_oncomplete", function () {
            for (var key in _this2.json.children) {
                c = document.createElement("li");
                c.className = "optItem";
                $(".activeOpt").append(c);
                typewriter(c, key);
            }
        });
        this.cycle();
    } else {}
};

Display.prototype.cycle = function () {
    var _this3 = this;

    var k = 0,
        l = document.getElementsByClassName("activeOpt")[0].childNodes,
        i = 0,
        _this = this;

    this.current = l[0];

    adjust(this.current);

    this.keydown = function (e) {
        e = e || window.event;
        k = e.keyCode;

        if (k === 38 || k == 39) {
            i++;
            if (i > l.length - 1) {
                i = 0;
            }
        } else if (k === 37 || k === 40) {
            i--;
            if (i < 0) {
                i = l.length - 1;
            }
        }

        _this3.current = l[i];
        reset(l);
        adjust(_this3.current);

        if (k === 13) {
            _this3.activeOpt.className = "options";
            var d = new Display(_this3.json.children[_this3.current.innerHTML]);
            document.removeEventListener("keydown", _this.keydown);
        }
    };

    document.addEventListener("keydown", _this.keydown);
};

"use strict";

(function () {})();
/**
 * Created by apizzimenti on 7/21/16.
 */

function adjust(element) {
  element.className = "activeItem";
}

"use strict";

(function () {})();
/**
 * Created by apizzimenti on 7/21/16.
 */

function reset(elements) {
    elements.forEach(function (element) {
        element.className = "";
    });
}

"use strict";

(function () {})();
/**
 * Created by apizzimenti on 7/22/16.
 */

function typewriter(element, text, main) {

    var l = text.length,
        i = 0,
        interval;

    element.innerHTML = "";

    interval = window.setInterval(function () {
        element.innerHTML += text[i];

        if (i < l - 1) {
            i++;
        } else {
            if (main) {
                var g = new Event("typewriter_oncomplete");
                document.dispatchEvent(g);
            }
            clearInterval(interval);
        }
    }, 50);
}

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

"use strict";

(function () {})();
/**
 * Created by apizzimenti on 7/21/16.
 */

function GameWindow(json) {
    var _this = this;

    this.json = json;
    this.inner = {};
    this.inner.width = Math.ceil(window.innerWidth / 1.66);
    this.inner.height = Math.ceil(window.innerHeight / 1.66);
    this.inner.marginTop = (window.innerHeight - this.inner.height) / 4;

    $(document).ready(function () {
        _this.generateChild();
        _this.addWindow();
        _this.control();
    });
}

GameWindow.prototype.generateChild = function () {

    this.inner.screen = document.createElement("div");
    this.inner.screen.id = "gameWindow";
    this.inner.templateId = "#gameWindow";
};

GameWindow.prototype.addWindow = function () {

    var wrapper = $("#simple-engine"),
        id = this.inner.templateId;

    wrapper.append(this.inner.screen);

    $(id).css({
        "width": this.inner.width,
        "height": this.inner.height,
        "margin-top": this.inner.marginTop
    });
};

GameWindow.prototype.control = function () {

    var d = new Display(this.json);
};
