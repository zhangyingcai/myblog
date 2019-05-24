---
title: virtualbox-centos7.5-wdcp
tags: virtualbox
categories: virtualbox
abbrlink: 14296
date: 2018-12-04 14:23:46
---

用于记录一次成功使用virtualbox虚拟机安装centos7.5成功联网并安装上wdcp

<!-- more -->

# 虚拟机软件

当然选免费的了，而且发现好多VMware Workstation的软件链接提示有病毒，qnmlgb老子不用。

# centos下载

[centos7.5-dvd版](http://isoredirect.centos.org/centos/7/isos/x86_64/CentOS-7-x86_64-DVD-1810.iso)

# 要点

[要点1:虚拟机网卡设置](https://jingyan.baidu.com/article/48a420571e6d75a9242504e0.html)
[要点2:虚拟机打开网络](https://www.cnblogs.com/cindy-cindy/p/6784536.html)
注：centos默认不启动网卡，需要手动启动
路径：
```
cd /etc/sysconfig/network-scripts/

vi ifcfg-xx
```
找到开头为ifcfg-的，默认是en0
输入i进入编辑模式
编辑该文件
设置ONBOOT=yes
:wq 保存退出
重启网络
```
service network restart
```
有时候要重启虚拟机才能生效。


