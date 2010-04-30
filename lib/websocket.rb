require "rubygems"
require "eventmachine"
require "em-websocket"
require "json"

require "pp"

EventMachine.run do
  @sockets = []
  @rooms = Hash.new

  EventMachine::WebSocket.start(:host => "0.0.0.0", :port => 9090) do |socket|
    # socket.onopen do
    # end

    socket.onmessage do |message|
      evt = JSON.parse message
      room = evt['data']['room']
      case evt['type']
      when 'join'
        @rooms[room] ||= []
        @rooms[room] << socket
        @rooms[room].each do |s|
          s.send({
            :type => "join",
            :data => {
              :room => room
            }
          }.to_json)
        end
      when 'leave'
        @rooms[room].delete socket
        @rooms[room].each do |s|
          s.send({
            :type => "leave",
            :data => {
              :room => room
            }
          }.to_json)
        end
      when 'say'
        @rooms[room].each do |s|
          s.send({
            :type => "say", 
            :data => {
              :message => evt['data']['message'],
              :room    => room
            }
          }.to_json)
        end
      else
        socket.send({
          :type => "error", 
          :data => {
            :message => "Unknown message type, '#{evt['type']}'"
          }
        }.to_json)
      end
    end

    # socket.onclose do
    # end
  end
end

