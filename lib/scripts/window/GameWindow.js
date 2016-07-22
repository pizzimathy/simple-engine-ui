(function () {"use strict";})();
/**
 * Created by apizzimenti on 7/21/16.
 */

function GameWindow (json) {
    
    this.json = json;
    this.inner = {};
    this.inner.width = Math.ceil(window.innerWidth / 1.66);
    this.inner.height = Math.ceil(window.innerHeight / 1.66);
    this.inner.marginTop = (window.innerHeight - this.inner.height) / 4;
    
    $(document).ready(() => {
        this.generateChild();
        this.addWindow();
        
        this.control();
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
