"use strict";

// MOUSE HANDLING


var g_mouseX = 0,
    g_mouseY = 0;

function handleMouse(evt) {
    
    g_mouseX = evt.clientX - g_canvas.offsetLeft;
    g_mouseY = evt.clientY - g_canvas.offsetTop;
    
    // If no button is being pressed,
    var button = evt.buttons === undefined ? evt.which : evt.buttons;
    // or if the mouse is not over canvas,
    var onCanvas = g_canvas.offsetLeft < evt.clientX && 
                   evt.clientX < g_canvas.offsetLeft+g_canvas.width &&
                   g_canvas.offsetTop < evt.clientY && 
                   evt.clientY < g_canvas.offsetTop+g_canvas.height;
    // then bail
    if (!button || !onCanvas) return;
    
    mouseHandler(evt);
}

// "abstract" method
function mouseHandler(evt) { };

// Handle "down" and "move" events the same way.
window.addEventListener("mousedown", handleMouse);
window.addEventListener("mousemove", handleMouse);
