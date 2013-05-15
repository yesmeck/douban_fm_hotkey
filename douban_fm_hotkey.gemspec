Gem::Specification.new do |s|
  s.name        = 'douban_fm_hotkey'
  s.version     = '0.0.1'
  s.summary     = 'Douban FM global hotkey.'
  s.description = 'Global hotkey for Douban FM web.'
  s.authors     = ['Wei Zhu']
  s.email       = 'yesmeck@gmail.com'
  s.files       = `git ls-files | grep -v '^chrome-extension/'`.split("\n")
  s.homepage    = 'http://www.douban.com/people/coolzi'
  s.add_dependency 'faye'
  s.add_dependency 'sinatra'
  s.add_dependency 'thor'
end
