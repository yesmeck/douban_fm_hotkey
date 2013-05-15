# Douban FM 全局快捷键

## 安装

首先当然你的系统上要有 Ruby.

### Server

```bash
$ gem i douban_fm_hotkey
```
### Chrome 扩展

https://dl.dropboxusercontent.com/u/1658623/douban_fm_hotkey.crx

= = Chrome web store developer account 验证中。。。

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
* `curl http://localhost:1988/love` 喜欢
* `curl http://localhost:1988/pause` 暂停

具体每个系统的配置不大一样这里不详细说了。我的配置：

![Shortcuts](https://dl.dropboxusercontent.com/u/1658623/douban_fm_hotkey_shortcuts.png)

## 存在的问题

### 只有暂停没有播放

豆瓣电台的播放器只对外开放了暂停接口，所以没办法控制播放，但是在暂停后可以用下一首来让电台继续播放。
