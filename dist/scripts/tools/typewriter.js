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
