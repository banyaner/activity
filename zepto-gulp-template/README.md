---
layout: post
title:  "移动端活动项目开发模板"
date:   2016-07-27
categories: [js]
---

# Home
    本模板为开发移动端一般活动页的模板，具体功能如下目录所示。
1. <a href="#begin">安装</a>
1.  <a href="#directory">目录结构</a>
1. <a href="sass">sass编译</a>
1. <a href="autoprefixer">前缀自动补全 autoprefixer</a>
1. <a href="#sprite">雪碧图</a>
1. <a href="#sync">browser-sync</a>
1. <a href="#minify">css/js代码合并压缩</a>
1. <a href="#deploy">FTP 发布部署</a>

# <p id="begin">安装</p>

该模板是一个基于gulp的h5页面开发模板。

1.默认安装了Node环境
2.下载模板
3.在根目录执行 npm install
打开你喜欢的编辑器进行开发吧！（推荐webstorm）

# <p id="directory">目录结构</p>
<pre>
├── build
├── node_modules
├── gulpfile.js
├── package.json
└── src
├── css
│   ├── common.css
│   ├── index.css
│   └── lib
│       └── normalize.css
├── img
├── index.html
├── js
│   ├── index.js
│   └── lib
│       ├── fix-viewport.js     //移动端适配适配
│       └── zepto.js            //默认使用库
├── sass
│   └── index.scss
└── slice
</pre>

- build：存放压缩后的代码
- package.js: 模块依赖文件、基本信息
- node_modules/： npm install 安装的模块
- gulpfile： gulp任务文件
- src/：项目开发目录

## src/ 目录详解

项目开发基本都在src文件进行。下面做个简单介绍

###sass/

项目默认使用sass进行开发。开发者自己的样式代码放在 index.scss 里（也可直接在index.scss写css）。
如果想将一张背景图片合并到雪碧图，请在scss代码中写成
```ruby
.icon-close{
background-image:url("../slice/icon-close.png?_spriter");
}
```
并将 icon-close.png 放在slice目录下。保存时，自动生成雪碧图sprite.png放在img/下，代码会自动编译、替换雪碧图部分代码并保存在css/index.css中。

### img/ & slice/

img/默认放置了3张图片，用于分享、提示等，可根据实际项目进行替换。
将要合并到雪碧图的图片放在slice/下。
其他图片放在img/目录下。

### css/

css目录下的代码均无需修改，但可以往lib/下放新添加的css库
- lib、 lib目录下放置库文件，模板中默认使用了normialize.css
- css/common.css  移动端项目基本的样式。不需要改动
- css/index.css 开发者sass代码编译后的css代码。注意：这里放置的是sass编译后的css代码，所以所有自己写的样式代码请放在sass/index.scss目录中。

### js/

- lib/ 放置用户新添加的库，每项功能已添加注释。
注意fix-viewport.js 中提供三种适配方式。默认采用按固定宽度（750px）方式。为了兼容，按照iphone6尺寸的设计稿开发（即要求设计稿可视范围为750px*1206px）。写scss时按设计稿写成px即可。
- common.js 分享相关内容，根据分享内容需要进行更改
- index.js 开发者自己的代码

### index.html

默认添加了用于分享的代码等
```ruby
<div id="common-share">
<div style="display: none !important">
<div id="__newsapp_sharetext"></div>
<div id="__newsapp_sharephotourl"></div>
<div id="__newsapp_sharewxtitle"></div>
<div id="__newsapp_sharewxtext"></div>
<div id="__newsapp_sharewxthumburl"></div>
<div id="__newsapp_sharewxurl"></div>
</div>
```
所以开发者自己的代码写在
```ruby
<div class="common-container">
</div>
```
内部。

###package.json

```ruby
{
"name": "projectName",
"version": "1.0.0",
"author": "zhongjingxue",
"devDependencies": {
"browser-sync": "^2.13.0",
"del": "^1.2.0",
"gulp": "^3.9.0",
"gulp-filter": "^3.0.1",
"gulp-imagemin": "^3.0.1",
"gulp-minify-css": "^1.1.6",
"gulp-replace": "^0.5.4",
"gulp-sass": "^2.3.1",
"gulp-uglify": "^1.2.0",
"gulp-usemin": "^0.3.11",
"vinyl-ftp": "^0.4.5",
"gulp-css-spriter": "^0.3.3",
"gulp-autoprefixer":"^3.1.0"
}
}
```
- name：改为项目名称（英文）模板中集成了FTP,这里的name也是上传文件的name。
- author：作者

# <p id="sass">sass编译</p>

使用 gulp-sass 插件，实现sass代码编译成css。

## 使用

保存时自动执行编译；也可以执行 gulp tocss 命令，手动编译。

##提示

1. gulp tocss 任务中集成了sass编译为css，css文件中指定背景图合并为sprite图片，三项功能。由于css是sass编译得到的，故不会影响源码的内容结构。
2. 如果只想使用css编写，也要把css代码写在sass文件下，以.scss做后缀名。保证自动前缀补全和雪碧图的顺利实现。


#<p id="autoprefixer">前缀自动补全 autoprefixer</p>

使用gulp-autoprefixer插件，实现css文件自动添加前缀。

## 使用介绍
coding过程中无需考虑兼前缀问题，sass代码保存时候会在生成的css文件中添加前缀。也可以执行
gulp tocss 实现添加前缀。

# <p id="sprite">雪碧图</p>

使用gulp-css-spriter插件，实现指定图片自动合并为雪碧图。

## 使用介绍

如果一张图片icon-close.png要合并到雪碧图，则将该图片放置在slice目录下，然后sass中写成：

```ruby
.icon-close{
background-image:url("../slice/icon-close.png?_spriter");
}
```
其中?_spriter 表示该图片需要合并。不需要合并的图片放在img目录下。
合并后的图片为sprite.png，会存放在 src/img/目录下（发布的时候自动忽略slice目录）。
保存或执行gulp tocss，sass代码自动编译为使用雪碧图的css代码。

##建议：

1.**使用 [TinyPNG] 进行上线前的图片压缩**
虽然gulp中添加了压缩图片功能，但压缩效果一般，不如TinyPNG效果好。所以建议最终图片使用TinyPNG进行一次压缩。

# <p id="sync">browser-sync</p>

使用Browsersync插件。Browsersync能让浏览器实时、快速响应您的文件更改（html、js、css、sass、less等）并自动刷新页面。更重要的是 Browsersync可以同时在PC、平板、手机等设备下进项调试。

## 使用介绍

执行 gulp browser-sync ，会生成一个本地访问地址和外部访问地址。当用户改动文件时，所有页面也会同步刷新。
Browsersync官网：http://www.browsersync.cn


# <p id="minify">css/js代码合并压缩</p>

##使用

执行gulp usemin 实现代码的压缩、合并和替换。生成的文件放在build目录下。

## 提示

这一步无需手动执行，执行部署的时候会自动执行代码压缩和打包。

# <p id="minify">FTP 发布部署</p>

可以配置发布到测试服务器和正式服务器上。

## 使用

测试服务器： gulp test-server

ProjectName为package.json中name的键值。

## 提示

模板中按需配置不同服务器的用户名、密码、主机、端口等。


[TinyPNG]:https://tinypng.com