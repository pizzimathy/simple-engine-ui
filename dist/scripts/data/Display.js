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

    var l = document.createElement("ul"),
        t = document.createElement("div"),
        c;

    t.className = "text";
    t.innerText = this.json.text;

    l.className = "options activeOpt";
    this.activeOpt = l;

    this.gameWindow.append(t);

    if (this.json.children) {
        this.gameWindow.append(l);
        for (var key in this.json.children) {
            c = document.createElement("li");
            c.className = "optItem";
            c.innerHTML = key;
            $(".activeOpt").append(c);
        }
        this.cycle();
    } else {}
};

Display.prototype.cycle = function () {
    var _this2 = this;

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

        _this2.current = l[i];
        reset(l);
        adjust(_this2.current);

        if (k === 13) {
            _this2.activeOpt.className = "options";
            var d = new Display(_this2.json.children[_this2.current.innerText]);
            document.removeEventListener("keydown", _this.keydown);
        }
    };

    document.addEventListener("keydown", _this.keydown);
};
