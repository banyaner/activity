/**
 * Created by zhongjx on 1/12/2016.
 */

(function () {
    'use strict';

    //主函数
    function main() {
        init();
        bind();
    }

    var arr,//存取随机抽取的八道题
        rightAns = 0,
        nextHtml = '<div class="next-btn"><img src="img/next.png" alt=""/></div>',
        el = {
            img1: $('<img>', {src: '../src/img/r1.png'}),
            img2: $('<img>', {src: '../src/img/r3.png'}),
            img3: $('<img>', {src: '../src/img/r2.png'}),
            img4: $('<img>', {src: '../src/img/r4.png'}),
        };
    //对数组随机排序
    function randomSort(a, b) {
        return Math.random() > 0.5 ? 1 : -1;
    }

    //题型展示
    function showQuestion(data) {//data是题型数组
        var len = data.length;
        console.log(data);
        for (var i = 0; i < len; i++) {
            var question = data[i].question,
                ansA = data[i].A,
                ansB = data[i].B,
                ansC = data[i].C,
                ansD = data[i].D,
                ansR = data[i].R;// to do xss
            $('.js-' + i).append('<div class="question"> <div class="question-title"> <p class="question-numb">' + (i + 1) + '</p><p class="common-text-stroke">' + question + '</p> </div> <div class="question-item"> <ul data-answer="' + ansR + '"> <li><span>A.</span>' + ansA + '</li> <li><span>B.</span>' + ansB + '</li> <li><span>C.</span>' + ansC + '</li> <li><span>D.</span>' + ansD + '</li> </ul> </div> </div> ');
        }
    }

    //根据正确答题数显示内容
    function showResult(numb) {
        var $jsShare = $('.js-share');
        switch (numb) {
            case 0:
            case 1:
            case 2:
                $jsShare.before(el.img4);
                break;
            case 3:
            case 4:
            case 5:
                $jsShare.before(el.img3);
                break;
            case 6:
            case 7:
                $jsShare.before(el.img2);
                break;
            case 8:
                $jsShare.before(el.img1);
                break;
        }
    }

    //初始化
    function init() {


        $.getJSON("../src/data/question.json", function (data) {//地址问题
            data.sort(randomSort);
            arr = data.slice(0, 8);//随机抽取8题
            console.log(arr);
            showQuestion(arr);
        });
        var swiper = new Swiper('.swiper-container', {
            direction: 'vertical',
            onSlideNextEnd: function (swiper) {
                if (swiper.activeIndex == 8) {
                    $('.next-btn').remove();
                    console.log(rightAns + "right")
                    showResult(4);
                    swiper.lockSwipes();

                }
            }
        });
    }

    //绑定事件
    function bind() {
        $('#js-btn').bind('click', function () {
            $('.first').hide();
            $('.container').css('background', "url(../src/img/bg1.png)");//js中图片路径设置？
            $('.swiper-wrapper').show();
            $('.swiper-container').append(nextHtml);
        });
        $('ul li').live('click', function () {
            var $this = $(this),
                $ul = $this.parent('ul'),
                flag = $ul.attr('data-click') == null ? 1 : 0,
                answer = $ul.attr('data-answer'),
                chosen = $this.find('span').text();
            console.log(flag)
            $('ul li').removeClass('ans-wrong').removeClass('ans-right');
            if (chosen.match(answer)) {
                $this.addClass('ans-right');
                if (flag) {
                    $ul.attr('data-click', 1);
                    rightAns++;
                }
            } else {
                $this.addClass('ans-wrong');
                if (flag) {
                    $ul.attr('data-click', 0);
                }
                return 0;
            }
        });
        $('.js-share').live('click', function () {
            NewsAppShare.show();
        });

    }

    $(main);
}())
;