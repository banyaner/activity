/**
 * Created by jingxue on 16/06/01.
 */

/**
 *活动页有些元素是必须的，本页面作为一个基本的模板，便于后期降低工作量
 *基本内容包括：单页面的历史栈；分享；事件委托；请求
 * 事情处理程序和应用逻辑要分开!!!
 * 提醒：命名！模块化！
 */
(function ($) {
    'use strict';
    function main() {
        //通用容器适配设置
        (function containerSetting() {
            var $commonContainer = $('.common-container');
            var clientHeight = document.documentElement.clientHeight;
            var designHeight = parseInt($commonContainer.css('height'));
            $commonContainer.animate({
                scale: Math.min(clientHeight / designHeight, 1),
                top: -(designHeight - clientHeight) / 2
            }, 0);
        }());


        // 应用逻辑

           var nextPage = function (id) {
                $('#' + id).parents('.page').addClass('hidden').next().removeClass('hidden');
                history.pushState({page: 'index'}, "index", id + '.html');//根据具体需求更改
            };
        $(document).on('tap', 'div,input', function (e) {
            var id = $(this).attr('id');
            if (!id) {
                return false;
            }
            switch (id) {
                case 'nextPage':
                    nextPage(id);
                    break;
                default:
                    break;
            }
        });

        // 单页面需历史栈

        window.addEventListener('popstate', function (event) {
            console.log(event);
        });
        history.replaceState({page: "index"}, "index", location.href);
    }

    $(main);
}(Zepto));