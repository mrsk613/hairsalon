// 上に戻るボタン
jQuery(function () {
    var pagetop = $('#page_top');
    pagetop.hide();
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {  //100pxスクロールしたら表示
            pagetop.fadeIn();
        } else {
            pagetop.fadeOut();
        }
    });
    pagetop.click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500); //0.5秒かけてトップへ移動
        return false;
    });
});


$(".openbtn").click(function () {//ボタンがクリックされたら
    $(this).toggleClass('active');//ボタン自身に activeクラスを付与し
    $("#g-nav").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
    $(".circle-bg").toggleClass('circleactive');//丸背景にcircleactiveクラスを付与
});

$("#g-nav a").click(function () {//ナビゲーションのリンクがクリックされたら
    $(".openbtn").removeClass('active');//ボタンの activeクラスを除去し
    $("#g-nav").removeClass('panelactive');//ナビゲーションのpanelactiveクラスを除去
    $(".circle-bg").removeClass('circleactive');//丸背景のcircleactiveクラスを除去
});

$(function () {
    $(window).load(function () {
        var setElm = $('.viewer'),
            setMaxWidth = 1200,
            setMinWidth = 300,
            fadeSpeed = 1500,
            switchDelay = 5000,
            sideNavi = 'off', // 'on' or 'off'
            sideHide = 'hide', // 'hide' or 'show'
            naviOpc = 0.5;

        setElm.each(function () {
            var targetObj = $(this),
                findUl = targetObj.find('ul'),
                findLi = targetObj.find('li'),
                findLiFirst = targetObj.find('li:first');

            findLi.css({ display: 'block', opacity: '0', zIndex: '2' });
            findLiFirst.css({ zIndex: '2' }).stop().animate({ opacity: '1' }, fadeSpeed);

            function timer() {
                setTimer = setInterval(function () {
                    slideNext();
                }, switchDelay);
            }
            timer();

            function slideNext() {
                findUl.find('li:first-child').not(':animated').animate({ opacity: '0' }, fadeSpeed).next('li').css({ zIndex: '2' }).animate({ opacity: '1' }, fadeSpeed).end().appendTo(findUl).css({ zIndex: '2' });
            }
            function slidePrev() {
                findUl.find('li:first-child').not(':animated').css({ zIndex: '2' }).animate({ opacity: '0' }, fadeSpeed).siblings('li:last-child').css({ zIndex: '2' }).animate({ opacity: '1' }, fadeSpeed).prependTo(findUl);
            }
            targetObj.css({ width: setMaxWidth, display: 'block' });

            // メイン画像をベースにエリアの幅と高さを設定
            var setLiImg = findLi.find('img'),
                baseWidth = setLiImg.width(),
                baseHeight = setLiImg.height();

            // レスポンシブ動作メイン
            function imgSize() {
                var windowWidth = parseInt($(window).width());
                if (windowWidth >= setMaxWidth) {
                    targetObj.css({ width: setMaxWidth, height: baseHeight });
                    findUl.css({ width: baseWidth, height: baseHeight });
                    findLi.css({ width: baseWidth, height: baseHeight });
                } else if (windowWidth < setMaxWidth) {
                    if (windowWidth >= setMinWidth) {
                        targetObj.css({ width: '100%' });
                        findUl.css({ width: '100%' });
                        findLi.css({ width: '100%' });
                    } else if (windowWidth < setMinWidth) {
                        targetObj.css({ width: setMinWidth });
                        findUl.css({ width: setMinWidth });
                        findLi.css({ width: setMinWidth });
                    }
                    var reHeight = setLiImg.height();
                    targetObj.css({ height: reHeight });
                    findUl.css({ height: reHeight });
                    findLi.css({ height: reHeight });
                }
            }
            $(window).resize(function () { imgSize(); }).resize();

            // サイドナビボタン（有り無し）
            var agent = navigator.userAgent;
            if (sideNavi == 'on') {
                targetObj.append('<a href="javascript:void(0);" class="btnPrev"></a><a href="javascript:void(0);" class="btnNext"></a>');
                var btnPrev = targetObj.find('.btnPrev'), btnNext = targetObj.find('.btnNext'), btnPrevNext = targetObj.find('.btnPrev,.btnNext');

                if (agent.search(/iPhone/) != -1 || agent.search(/iPad/) != -1 || agent.search(/iPod/) != -1 || agent.search(/Android/) != -1) {
                    btnPrevNext.css({ opacity: naviOpc });
                } else {
                    btnPrevNext.css({ opacity: naviOpc }).hover(function () {
                        $(this).stop().animate({ opacity: naviOpc + 0.2 }, 200);
                    }, function () {
                        $(this).stop().animate({ opacity: naviOpc }, 200);
                    });
                }

                if (sideHide == 'hide') {
                    if (agent.search(/iPhone/) != -1 || agent.search(/iPad/) != -1 || agent.search(/iPod/) != -1 || agent.search(/Android/) != -1) {
                        btnPrevNext.css({ visibility: 'visible' });
                    } else {
                        btnPrevNext.css({ visibility: 'hidden' });
                        targetObj.hover(function () {
                            btnPrevNext.css({ visibility: 'visible' });
                        }, function () {
                            btnPrevNext.css({ visibility: 'hidden' });
                        });
                    }
                }

                btnPrev.click(function () { switchPrev(); });
                btnNext.click(function () { switchNext(); });
            }

        });
    });
});
