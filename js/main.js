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

    /* #################  body 스크롤 금지 */
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

    $('#kakaoMap').on('mouseover', function() {
       $('body').on('scroll touchmove mousewheel', function(e) {
            e.preventDefault();
            e.stopPropagation();

            return false;
        });
    });

    $('#kakaoMap').on('mouseleave', function() {
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
    $('[data-slick-wrap="project"]').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: 'linear'
    });

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
 *  Swiper
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

new Swiper('.item__project .swiper', {
    speed: 2000,
    autoplay: true,
    loop: true,
    navigation: {
        nextEl: '.item__project .swiper-next',
        prevEl: '.item__project .swiper-prev',
    }
});

const dateSwiper = new Swiper('.about__date .swiper', {
    speed: 1000,
    autoplay: false,
    loop: true,
    navigation: {
        nextEl: '.about__date .swiper-next',
        prevEl: '.about__date .swiper-prev',
    }
});

const contentsSwiper = new Swiper('.about__contents .swiper', {
    speed: 1000,
    autoplay: false,
    loop: true,
});

dateSwiper.controller.control = contentsSwiper;
contentsSwiper.controller.control = dateSwiper;

new Swiper('.cert .swiper', {
    slidesPerView: 4,
    spaceBetween: 10,
    speed: 2000,
    autoplay: true,
    loop: true,
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 2,
        },
        1025: {
            slidesPerView: 3,
        }
    },
    navigation: {
        nextEl: '.cert .swiper-button-next',
        prevEl: '.cert .swiper-button-prev',
    }
});

/**
 *  Stepper
 * 
 */
const aboutTabList = document.querySelectorAll('.about .common__model li'); 

Array.prototype.forEach.call(aboutTabList, function(listEl) {
    listEl.children[0].addEventListener('click', function(e) {
        e.preventDefault();

        const tabContent = document.querySelectorAll('.about .tab-pane');
        const tabNum = this.parentElement.getAttribute('data-tabnum');

        Array.prototype.forEach.call(tabContent, function(cont, i) {
            cont.style.display = 'none';
            aboutTabList[i].className = '';
        });

        tabContent[tabNum].style.display = 'block';

        if (listEl.className.indexOf('active') == -1) {
            listEl.className = 'active';
        }
    });
});

const businessTabList = document.querySelectorAll('.business .common__model li'); 

Array.prototype.forEach.call(businessTabList, function(listEl) {
    listEl.children[0].addEventListener('click', function(e) {
        e.preventDefault();

        const tabContent = document.querySelectorAll('.business .tab-pane');
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

const recuritTabList = document.querySelectorAll('.recruit .common__model li'); 

Array.prototype.forEach.call(recuritTabList, function(listEl) {
    listEl.children[0].addEventListener('click', function(e) {
        e.preventDefault();

        const tabContent = document.querySelectorAll('.recruit .tab-pane');
        const tabNum = this.parentElement.getAttribute('data-tabnum');

        Array.prototype.forEach.call(tabContent, function(cont, i) {
            cont.style.display = 'none';
            recuritTabList[i].className = '';
        });

        tabContent[tabNum].style.display = 'block';

        if (listEl.className.indexOf('active') == -1) {
            listEl.className = 'active';
        }
    });
});

const certTabList = document.querySelectorAll('.certification .common__model li'); 

Array.prototype.forEach.call(certTabList, function(listEl) {
    listEl.children[0].addEventListener('click', function(e) {
        e.preventDefault();

        const tabContent = document.querySelectorAll('.certification .tab-pane');
        const tabNum = this.parentElement.getAttribute('data-tabnum');

        Array.prototype.forEach.call(tabContent, function(cont, i) {
            cont.style.display = 'none';
            certTabList[i].className = '';
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

// 범위 랜덤 함수
function random(min, max) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, dly, size) {
    gsap.to(
        selector,               // 선택자
        random(1.5, 2.5),       // 애니메이션 동작 시간
        {                       // 옵션
            y: size,
            repeat: -1,
            yoyo: true,
            ease: Power1.easeInOut,
            delay: random(0, dly)
        }
    );
}

/* include html */
function includeHTML(){
    let z, elmnt, file, xhttp;
 
    z = document.getElementsByTagName("*");
    
    for (let i = 0; i < z.length; i++) {
      elmnt = z[i];
      file = elmnt.getAttribute("data-include");
      
      if (file) {
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /* Remove the attribute, and call this function once more: */
            elmnt.removeAttribute("data-include");
            includeHTML();
          } //if
        } //onreadystatechange
 
        xhttp.open("GET", file, true);
        xhttp.send();
        
        return;
      } //if - file
    } //for
} //includeHTML
 
 
/* ✨ 실행 */
window.addEventListener('DOMContentLoaded',()=>{
    includeHTML();
});

/**
 *  검색
 * 
 */
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('keyup', (e) => {
    searchFilter();
})

/**
 *  키 입력 시 검색 결과 동적
 */
function searchFilter() {
    let items = document.querySelectorAll('.perform__content li');

    for (let i = 0; i < items.length; i++) {
        let nameEl = items[i].getElementsByClassName('content'),
            dateEl = items[i].getElementsByClassName('content__date'),
            orgEl = items[i].getElementsByClassName('content__org');

        if (nameEl[0].innerHTML.toLowerCase().indexOf(searchInput.value) != -1 ||
            dateEl[0].innerHTML.toLowerCase().indexOf(searchInput.value) != -1 ||
            orgEl[0].innerHTML.toLowerCase().indexOf(searchInput.value) != -1) {
                items[i].style.display = 'flex';
        } else {
            items[i].style.display = 'none';
        }
    }
}