$(function() {
    /**
     *  Full Page
     * 
     */
    $('#fullPage').fullpage({
        css3: true,
        navigation: true,
        scrollbars: true,
        scrollHorizontally: true,
        responsiveWidth: 1025,
        onLeave: function(origin, destination, direction) {
            var imgPath = null;

            if (destination == 1) {
                // First Section
                imgPath = './images/main/logo_04_white.png';

                $('#header').css('background-color', '#444446');                       // header background color #4444446
                $('#header .header__wrap').css('background-color', '#444446');                       // header background color #4444446
                $('#logoImg').attr('src', imgPath);
                $('#menuImg').attr('src', './images/main/menu.svg');
                $('#gnb ul > li a').css('color', '#ffffff');
            } else {
                // 
                imgPath = './images/main/logo_04_black.png';

                $('#header').css('background-color', '#ffffff');       // header background color white
                $('#header .header__wrap').css('background-color', '#ffffff');       // header background color white
                $('#logoImg').attr('src', imgPath);
                $('#menuImg').attr('src', './images/main/md-menu.svg');
                $('#gnb ul > li a').css('color', '#4B4B4B');
            }
        }
    });

    /**
     *  Scroll Magic
     * 
     */
    const spyEls = document.querySelectorAll('section.scroll-spy');

    spyEls.forEach(function (spyEl) {
        new ScrollMagic
            .Scene({
                triggerElement: spyEl,
                triggerHook: .5
            })
            .setClassToggle(spyEl, 'show')
            .addTo(new ScrollMagic.Controller());
    });

    /**
     *  click 이벤트
     *  
     */
    $('[data-container]').on('click', '[data-event^="click-"]', function(e) {
        var $this = $(this),
            role = $this.data('event').split('-')[1] || '',
            target = e.target.nodeName.toLowerCase(),
            url = null;

        switch(role) {
            case 'main':
                url = "http://gplusit.co.kr/";
                
                location.href = url;

                break;
            // BSS
            case 'bss':
                url = "http://gplusit.co.kr/bss/login.jsp";
                
                window.open(url);

                break;
            // Sitemap
            case 'menu':
            case 'load':
            case 'detail':
                var $target = $this.data('target') || '';

                $($target).addClass('on');

                if ($(window).outerWidth() >= 1026) {
                    // Full Page로 열릴 시, Body Scroll 금지
                    $('body').on('scroll touchmove mousewheel', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
    
                        return false;
                    });
                    
                } else if ($(window).outerWidth() < 1026) {
                    if ($target == "#siteMap" || $($target).hasClass('hidden-page')) {
                        if ($($target).hasClass('on')) {
                            $('body').css('overflow', 'hidden');
                        }
                    }
                }

                break;
            // Close
            case 'close':
                var $target = $this.data('target') || '';
                
                $($target).removeClass('on');

                if ($(window).outerWidth() >= 1026) {
                    $('body').off('scroll touchmove mousewheel');
                } else if ($(window).outerWidth() < 1026) {
                    if ($target == "#siteMap" || $($target).hasClass('hidden-page')) {
                        $('body').css('overflow', 'visible');
                    }
                }

                break;
            // Top
            case 'top':
                if ($(window).outerWidth() < 1025) {
                    window.scroll({ 
                        top: 0, 
                        behavior: 'smooth' 
                    });
                } else {
                    if($('html').hasClass('fp-enabled')) {
                        $.fn.fullpage.moveTo(1);
                    } else {
                        window.scroll({ 
                            top: 0, 
                            behavior: 'smooth' 
                        });
                    }
                }

                break;
        }
    });

    /**
     * 공지사항 롤링 배너
     */
    var $panel = $('#rolling').find('ul'),
        itemWidth = $panel.children().outerWidth(),
        itemHeight = $panel.children().outerHeight(),
        itemLength = $panel.children().length,
        rollingId;

    auto();

    // 배너 마우스 Over
    $panel.on('mouseover', function() {
        clearInterval(rollingId);
    });
    // 배너 마우스 Leave
    $panel.on('mouseleave', function() {
        auto();
    });
    // 이전 이벤트
    $('#newsPrev').on('click', function() {
        prev();
    });

    $('#newsPrev').on('mouseover', function(e) {
        clearInterval(rollingId);
    });

    $('#newsPrev').on('mouseleave', function() {
        auto();
    });
    // 다음 이벤트
    $('#newsNext').on('click', function() {
        next();
    });

    $('#newsNext').on('mouseover', function(e) {
        clearInterval(rollingId);
    });

    $('#newsNext').on('mouseleave', function() {
        auto();
    });

    // auto 함수
    function auto() {
        //
        rollingId = setInterval(function() {
            start();
        }, 5000);
    }
    // 시작 이벤트 실행
    function start() {
        $panel.css("height", itemHeight * itemLength);
        $panel.animate({"top": - itemHeight + "px"}, function() {
            // 첫번째 아이템을 마지막에 추가하기
            $(this).append("<li>" + $(this).find("li:first").html() + "</li>");
            // 첫번째 아이템을 삭제하기
            $(this).find("li:first").remove();
            // 좌측 패널 수치 초기화
            $(this).css("top", 0);
        });
    }
    // 이전 이벤트 실행
    function prev(e) {
        $panel.css("top", - itemHeight);
        $panel.prepend("<li>" + $panel.find("li:last").html() + "</li>");
        $panel.animate({
            "top": "0"
        }, function() {
            $(this).find("li:last").remove();
        });
    }
    // 다음 이벤트 실행
    function next(e) {
        $panel.animate({
            "top": - itemHeight + "px"
        }, function() {
            $(this).append("<li>" + $(this).find("li:first").html() + "</li>");
            $(this).find("li:first").remove();
            $(this).css("top", 0);
        });
    }

    /* #################  */
    $('[data-about-item]').on('mouseover', function() {
        if ($(window).outerWidth() >= 1026) {
            // Full Page로 열릴 시, Body Scroll 금지
            $('body').on('scroll touchmove mousewheel', function(e) {
                e.preventDefault();
                e.stopPropagation();

                return false;
            });
            
        } else if ($(window).outerWidth() < 1026) {
            $('body').off('scroll touchmove mousewheel');
        }
    });

    $('[data-about-item]').on('mouseleave', function() {
        $('body').off('scroll touchmove mousewheel');
    });

    /**
     * Slick
     * 
     */
    $('[data-slick-wrap="about"]').slick({
        infinite: false,
        draggable: false,
        cssEase: 'linear',
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    arrows: false,
                    draggable: true
                }
            }
        ]
    });

    $('[data-slick-wrap="cert"]').slick({
        centerMode: true,
        centerPadding: '0px',
        slidesToShow: 4,
        cssEase: 'linear',
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    arrows: true,
                    centerPadding: '0px',
                    centerMode: false,
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 769,
                settings: {
                    centerPadding: '0px',
                    slidesToShow: 1
                }
            },
          ]
    });

    $('[data-slick-wrap="project"]').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: 'linear'
    });

    $('[data-slick-wrap="box"]').each(function (i, el) {
        i++;

        var slickFor = $(el).find('.slide-for').addClass('for' + i),
            slickNav = $(el).find('.slide-nav').addClass('nav' + i);

        sliderSet(slickFor, slickNav);
    });

    /**
     * Multi Slick 
     * 
     * @param {*} slickFor 
     * @param {*} slickNav 
     */
    function sliderSet(slickFor, slickNav) {
        slickFor.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            draggable: false,
            cssEase: 'linear',
            arrows: true,
            asNavFor: slickNav
        });

        slickNav.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            cssEase: 'linear',
            arrows: false,
            draggable: false,
            asNavFor: slickFor
        });
    }

    /**
     * Splide JS
     * 
     */
    const splide = new Splide('[data-wrap="business"]', {
        type   : 'loop',
        drag   : 'free',
        focus  : 'center',
        arrows : false,
        perPage: 4,
        autoScroll: {
            speed: 1,
        },
        breakpoints: {
            1281: {
                perPage: 3,
            },
            885: {
                perPage: 2,
            },
            481: {
                perPage: 1,
            }
        }
    });

    splide.mount(window.splide.Extensions);
});