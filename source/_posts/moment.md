---
title: moment
date: 2019-12-03 10:45:41
tags:
keywords:
description:
---

moment 使用心得

<!-- more -->

# 当前时间 某个条件限制为 0

毫秒 moment().set({hour:0,minute:0,second:0,millisecond:0})
秒 moment().set({hour:0,minute:0,second:0,millisecond:0}).unix()