# Websocket Demo

This is just a quick and dirty chat program, with multiple connections and
multiple rooms, that uses websockets and EventMachine to do its thing.

## Requirements

You'll need the following gems installed to make it happen:

* [sinatra](http://www.sinatrarb.com/)
* [haml](http://haml-lang.com/)
* [eventmachine](http://rubyeventmachine.com/)
* [em-websocket](http://github.com/igrigorik/em-websocket)
* [json](http://flori.github.com/json/)

And you'll need a web browser that supports websockets, which is either the
development version of Chrome/Chromium, the development version of
Safari/Webkit, or some really obscure version of Firefox with an experimental
patch or something. *Note:* I have only tested this in Chrome 5.0.342.9 beta
in Mac OS X.

## Usage

To start it up, fire up the Sinatra app:

    cd websocket-demo
    ruby ./application.rb

Remember to also fire up the websocket server:

    ruby lib/websocket.rb

Point your browser to http://localhost:4567/ (or wherever you put it) and
that's it.

## Troubleshooting

If the header turns green, everything's working and you should be able to send
messages through the little text input field. If when you first load the page,
the header turns red, that probably means you haven't started up the websocket
server. If you don't see anything happen, it means your browser doesn't support
websockets. Try another one.