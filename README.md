# Douban FM 全局快捷键

## 安装

首先当然你的系统上要有 Ruby.

### Server

```bash
$ gem i douban_fm_hotkey
```
### Chrome 扩展

右键另存为以下链接：
https://dl.dropboxusercontent.com/u/1658623/douban_fm_hotkey.crx
在 Chrome 中打开 chrome://extensions/ ，把 douban_fm_hotkey.crx 拖进去。

## 使用

### 启动 server

```bash
$ douban_fm_hotkey
```

可以把这个设置成开机启动。

### 设置快捷键

在你的系统里把你想要的快捷键分别映射到以下命令：

* `curl http://localhost:1988/skip` 下一首
* `curl http://localhost:1988/ban` 不再播放
* `curl http://localhost:1988/love` 喜欢，在已经喜欢的歌曲上执行就是取消喜欢
* `curl http://localhost:1988/pause` 暂停，暂停的时候执行这个就是继续播放

具体每个系统的配置不大一样这里不详细说了。我的配置：

![Shortcuts](https://dl.dropboxusercontent.com/u/1658623/douban_fm_hotkey_shortcuts.png)

