require 'sinatra/base'
require 'faye'

module DoubanFMHotkey
  class Server < Sinatra::Base

    use Faye::RackAdapter, :mount => '/faye'

    before do
      @client = Faye::Client.new('http://0.0.0.0:1988/faye')
    end

    %w{skip pause love ban}.each do |cmd|
      get "/#{cmd}" do
        @client.publish('/hotkey', {cmd: cmd})
      end
    end

  end
end
