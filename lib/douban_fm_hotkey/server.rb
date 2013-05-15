require 'sinatra/base'
require 'sinatra/reloader'
require 'faye'

module DoubanFMHotkey
  class Server < Sinatra::Base

    configure :development do
      register Sinatra::Reloader
    end

    dir = File.dirname(File.expand_path(__FILE__))

    set :views,  "#{dir}/server/views"

    if respond_to? :public_folder
      set :public_folder, "#{dir}/server/public"
    else
      set :public, "#{dir}/server/public"
    end

    set :static, true

    use Faye::RackAdapter, :mount => '/faye'

    before do
      @client = Faye::Client.new('http://0.0.0.0:1988/faye')
    end

    get '/' do
      erb :index
    end

    %w{skip pause love ban}.each do |cmd|
      get "/#{cmd}" do
        @client.publish('/hotkey', {cmd: cmd})
      end
    end

    get '/m' do
      erb :m
    end

  end
end
