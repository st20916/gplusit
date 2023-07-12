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


    $('.perform__content').on('mouseover', function() {
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

    $('.perform__content').on('mouseleave', function() {
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
        draggable: true,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    arrows: false
                }
            }
        ],
        nextArrow: $('.about__next'),
        prevArrow: $('.about__prev'),
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
            asNavFor: slickNav,
            prevArrow: $('.history__prev'),
            nextArrow: $('.history__next')
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
                autoScroll: {
                    speed: 2,
                }
            }
        }
    });

    splide.mount(window.splide.Extensions);
});

/**
 *  공지사항
 * 
 */
new Swiper('.news .swiper', {
    direction: 'vertical',
    autoplay: true,
    loop: true,
    navigation: {
        nextEl: '.news .swiper-next',
        prevEl: '.news .swiper-prev',
    }
});

const businessTabList = document.querySelectorAll('.business__model li'); 

Array.prototype.forEach.call(businessTabList, function(listEl) {
    listEl.children[0].addEventListener('click', function(e) {
        e.preventDefault();

        const tabContent = document.querySelectorAll('.tab-pane');
        const tabNum = this.parentElement.getAttribute('data-tabnum');

        Array.prototype.forEach.call(tabContent, function(cont, i) {
            cont.style.display = 'none';
            businessTabList[i].className = '';
        });

        tabContent[tabNum].style.display = 'block';

        if (listEl.className.indexOf('active') == -1) {
            listEl.className = 'active';
        }
    });
});


/**
 *  Tab 구현
 * 
 */
const tabList = document.querySelectorAll('.perform__head li');

Array.prototype.forEach.call(tabList, function(list) {
    list.children[0].addEventListener('click', function(e) {
        e.preventDefault();

        const tabContent = document.querySelectorAll('.perform__content');
        const tabNum = this.parentElement.getAttribute('data-tabnum');

        Array.prototype.forEach.call(tabContent, function(cont, i) {
            cont.style.display = 'none';
            tabList[i].className = 'head__tab';
        });

        tabContent[tabNum].style.display = 'block';

        if (list.className.indexOf('selected') == -1) {
            list.className = 'head__tab selected';
        }
    });
});