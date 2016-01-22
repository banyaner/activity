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

        var data = [
            {
                "question": "《芈月传》中“芈”字的第三个笔画是？",
                "A": "横",
                "B": "短竖",
                "C": "长竖",
                "D": "撇",
                "R": "B"
            },
            {
                "question": "阿拉丁的哥哥有几个？",
                "A": "3",
                "B": "4",
                "C": "2",
                "D": "1",
                "R": "A"
            },
            {
                "question": "一头牛和青蛙一起去超市买东西，它们买了啥？",
                "A": "绿色植物",
                "B": "木瓜",
                "C": "锅",
                "D": "笔",
                "R": "B"
            },
            {
                "question": "彭彭的好基友小丁1分钟可以剪好5只自己的指甲。请问5分钟内小丁可以剪好几只自己的指甲?",
                "A": "5只",
                "B": "16只",
                "C": "20只",
                "D": "25只",
                "R": "B"
            },
            {
                "question": "李大毛的手机号为1398644xxxx，这个号码是？",
                "A": "中国移动",
                "B": "中国联通",
                "C": "中国电信",
                "D": "外星基站",
                "R": "A"
            },
            {
                "question": "黄花岗起义第二枪谁开的？",
                "A": "宋教仁",
                "B": "孙中山",
                "C": "黄兴",
                "D": "逗我呢？",
                "R": "C"
            },
            {
                "question": "有个熊，掉进了一个10米深的坑里，用了一秒钟，问：这个熊是什么颜色的？",
                "A": "黑色",
                "B": "棕色",
                "C": "白色",
                "D": "卡其色",
                "R": "C"
            },
            {
                "question": "啤酒2块钱一瓶，四个盖换一瓶，两个空瓶换一瓶，10块钱可以喝几瓶啤酒？",
                "A": "15",
                "B": "14",
                "C": "13",
                "D": "妈妈我再也不想喝啤酒了",
                "R": "A"
            }
        ];
        //data.sort(randomSort);随机排序时使用
        var obj = {list: data.slice(0, 8)};//随机抽取8题
        var questionHtml = template('question', obj);
        $('.swiper-wrapper').html(questionHtml);
        swiper = new Swiper('.swiper-container', {
            direction: 'vertical'
        });
        swiper.lockSwipes();
        bind();
        console.log(1234);

    }

    //绑定事件
    function bind() {
        $('.first-btn').on('tap', function () {
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