"use strict";

/**
 * Created by apizzimenti on 7/22/16.
 */

function typewriter(element, text) {

    var l = text.length,
        i = 0,
        interval;

    element.innerHTML = "";

    interval = window.setInterval(function () {
        element.innerHTML += text[i];

        if (i < l - 1) {
            i++;
        } else {
            clearInterval(interval);
        }
    }, 50);
}
