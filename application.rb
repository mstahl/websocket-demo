#!/usr/bin/env ruby

require 'rubygems'
require 'sinatra'
require 'haml'

# Dir[File.dirname(__FILE__) + '/lib/*.rb'].each {|file| require file }

get "/:room" do
  @room = params[:room]
  haml :home
end