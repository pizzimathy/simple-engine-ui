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

    $(".text").css({
        "width": this.gameWindow.width - 40 + "px"
    });

    this.gameWindow.append(t);
    typewriter(t, text, true);

    l.className = "options activeOpt";
    this.activeOpt = l;

    if (this.json.children) {
        this.gameWindow.append(l);

        document.addEventListener("typewriter_oncomplete", function () {
            for (var key in _this2.json.children) {
                c = document.createElement("li");
                c.className = "optItem";
                $(".activeOpt").append(c);
                typewriter(c, key, false);
            }
            _this2.cycle();
        });
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
