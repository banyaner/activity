/**
 * Created by zhongjx on 1/12/2016.
 */

(function () {
    'use strict';

    //主函数
    function main() {
        init();
    }

    var arr,//存取随机抽取的八道题,备用
        rightAns = 0,
        swiper,
        el = {
            img1: $('<img>', {src: 'img/r1.png'}),
            img2: $('<img>', {src: 'img/r3.png'}),
            img3: $('<img>', {src: 'img/r2.png'}),
            img4: $('<img>', {src: 'img/r4.png'}),
        };
    //对数组随机排序
    function randomSort(a, b) {
        return Math.random() > 0.5 ? 1 : -1;
    }

    //根据正确答题数显示内容
    function showResult(numb) {
        var $jsShare = $('#share');
        switch (numb) {
            case 0:
            case 1:
            case 2:
                $jsShare.before(el.img4);
                NewsAppShare.update({
                    title: '放学别走！小学生向你约战'
                });
                break;
            case 3:
            case 4:
            case 5:
                $jsShare.before(el.img3);
                NewsAppShare.update({
                    title: '放学别走！小学生向你约战'
                });
                break;
            case 6:
            case 7:
                $jsShare.before(el.img2);
                NewsAppShare.update({
                    title: '放学别走！小学生向你约战'
                });
                break;
            case 8:
                $jsShare.before(el.img1);
                NewsAppShare.update({
                    title: '放学别走！小学生向你约战'
                });
                break;
        }
    }

    //初始化
    function init() {
        $.getJSON("data/question.json", function (data) {
            //data.sort(randomSort);随机排序时使用
            var obj = {list: data.slice(0, 8)};//随机抽取8题
            var questionHtml = template('question', obj);
            $('.swiper-wrapper').html(questionHtml);
            swiper = new Swiper('.swiper-container', {
                direction: 'vertical'
            });
            swiper.lockSwipes();
            bind();
        });
    }

    //绑定事件
    function bind() {
        $('#js-btn').on('tap', function () {
            $('.first').hide();
            $('.common-container').css('background', "url(img/bg1.png)");
            $('.swiper-wrapper').show();
        });
        $('ul').on('tap', 'li', function () {
            var $this = $(this),
                $ul = $this.parent(),
                answer = $ul.attr('data-answer'),
                chosen = $this.find('span').text();
            swiper.unlockSwipes();
            if (!$ul.children().hasClass('ans-right') && !$ul.children().hasClass('ans-wrong')) {
                if (chosen.match(answer)) {
                    $this.addClass('ans-right');
                    rightAns++;
                } else {
                    $this.addClass('ans-wrong');
                }
            }
            setTimeout(function () {
                swiper.slideNext(null, 1000);
                swiper.lockSwipes();
                if (swiper.activeIndex == 8) {
                    $('.next-btn').remove();
                    showResult(rightAns);
                }
            }, 650);
        });
        $('#share').on('tap', function () {
            NewsAppShare.show();
        });
    }

    $(main);
}());