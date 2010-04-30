/*
 * application.js
 */

var ws = null;

var close_connection = function () {
  if(ws) {
    ws.send(JSON.stringify({
      "type" : "leave",
      "data" : {
        "room" : room
      }
    }));
  }
};

$(function () {
  if(typeof(WebSocket) == "undefined") {
    alert("WebSockets aren't supported in your browser!");
  }
  else {
    ws = new WebSocket('ws://127.0.0.1:9090');
    ws.onopen = function (evt) {
      $("#the-title").css('color', 'green');
      ws.send(JSON.stringify({
        "type" : "join",
        "data" : {
          "room"    : room
        }
      }));
    }
    ws.onmessage = function (evt) {
      msg = JSON.parse(evt.data);
      switch(msg.type) {
        case 'join':
          $("#messages").append("<p><i>A user has joined this room.</i></p>");
          break;
        case 'leave':
          $("#messages").append("<p><i>A user has left this room.</i></p>");
          break;
        case 'say':
          $("#messages").append("<p>" + msg.data.message);
          break;
        case 'error':
          $("#messages").append("<p class=\"error\">" + msg.data.message);
          break;
        default:
          alert("Unknown message received from server: " + evt.type);
      }
    }
    ws.onclose = function (evt) {
      $("#the-title").css('color', 'red');
    }
  }
  
  $("#the-form").submit(function () {
    ws.send(JSON.stringify({
      "type" : "say",
      "data" : {
        "message" : $("#the-input").val(),
        "room"    : room
      }
    }));
    $("#the-input").val('').focus();

    return false;
  });
});