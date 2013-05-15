require 'thor'
require 'douban_fm_hotkey/server'

module DoubanFMHotkey
  class Cli < Thor

    desc 'server', 'Start douban FM hotkey server'
    def server
      DoubanFMHotkey::Server.run! :port => 1988
    end

  end
end
