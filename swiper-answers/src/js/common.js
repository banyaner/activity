/**
 * Created by GG on 15/8/18.
 */

(function () {
    'use strict';

    var $commonLandscape, $commonPC, $commonShare, $commonContainer;

    //主函数
    function main() {
        init();
        landscapeSetting();
        pcSetting();
        shareSetting();
        containerSetting();
    }

    //初始化
    function init() {
        $commonLandscape = $('#common-landscape');
        $commonPC = $('#common-pc');
        $commonShare = $('#common-share');
        $commonContainer = $('.common-container');
    }

    //通用横屏提示设置
    function landscapeSetting() {
        var handler = function () {
            switch (window.orientation) {
                case 0:
                    0
                case 180:
                    $commonLandscape.hide();
                    break;
                case -90:
                case 90:
                    $commonLandscape.show();
                    break;
            }
        };

        handler();
        window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", handler, false);
    }

    //通用pc扫码提示设置
    function pcSetting() {
        if (!$.os.phone && !$.os.tablet) {
            new QRCode($commonPC.children()[0]).makeCode(location.href);
            $('body').children().hide();
            $commonPC.show();
        }
    }

    //通用分享设置
    function shareSetting() {
        window.NewsAppShare = {
            shareData: {
                title: '',
                desc: '',
                img_url: '',
                link: ''
            },
            update: function (data) {
                for (var i in data) {
                    if (this.shareData.hasOwnProperty(i)) {
                        this.shareData[i] = data[i];
                    }
                }
                document.getElementById('__newsapp_sharetext').innerHTML = this.shareData.title + ' ' + this.shareData.link;
                document.getElementById('__newsapp_sharephotourl').innerHTML = this.shareData.img_url;
                document.getElementById('__newsapp_sharewxtitle').innerHTML = this.shareData.title;
                document.getElementById('__newsapp_sharewxtext').innerHTML = this.shareData.desc;
                document.getElementById('__newsapp_sharewxthumburl').innerHTML = this.shareData.img_url;
                document.getElementById('__newsapp_sharewxurl').innerHTML = this.shareData.link;
            },
            show: function () {
                if (NewsAppClient.isNewsApp()) {
                    var say = function() {
                        location.href = "newsapp://expert/EX2775326325204378143";
                    };
                    NewsAppClient.share(say);
                } else {
                    $commonShare.fadeIn(300);
                    setTimeout(function () {
                        $commonShare.fadeOut(300);
                    }, 2000);
                }
            },
            getAbsPath: function (url) {
                if (url) {
                    var a = document.createElement('a');
                    a.href = url;
                    return a.href;
                } else {
                    return location.href.replace(/(\?|#).*/, '');
                }
            }
        };

        //初始化分享数据
        NewsAppShare.update({
            title: '放学别走！小学生向你约战',
            desc: ' 八道题让你怀疑人生 ʅ(‾◡◝)ʃ',
            img_url: NewsAppShare.getAbsPath('img/share-icon.png'),
            link: NewsAppShare.getAbsPath()
        });

        //微信分享设置
        document.addEventListener('WeixinJSBridgeReady', function () {
            WeixinJSBridge.on('menu:share:timeline', function () {
                WeixinJSBridge.invoke('shareTimeline', NewsAppShare.shareData, function () {
                    location.href = "http://c.3g.163.com/nc/qa/newsapp/question.html?id=EX2775326325204378143&token=e735+qViTpXwgsNyAxtY3wJL/8FmwEthFxqR4Za5U1Z48ErR02zJ6/KXOnxX046I";
                });
            });
            WeixinJSBridge.on('menu:share:appmessage', function () {
                WeixinJSBridge.invoke('sendAppMessage', NewsAppShare.shareData, function () {
                    location.href = "http://c.3g.163.com/nc/qa/newsapp/question.html?id=EX2775326325204378143&token=e735+qViTpXwgsNyAxtY3wJL/8FmwEthFxqR4Za5U1Z48ErR02zJ6/KXOnxX046I";
                });
            });
        }, false);
    }

    //通用容器适配设置
    function containerSetting() {
        var clientHeight = document.documentElement.clientHeight;
        var designHeight = parseInt($commonContainer.css('height'));
        $commonContainer.animate({
            scale: Math.min(clientHeight / designHeight, 1),
            top: -(designHeight - clientHeight) / 2
        }, 0);
    }

    $(main);
}());