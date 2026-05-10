$(document).ready(function(){
    //swiper
    var swiper = new Swiper(".mySwiper", {
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
    });

    // AOS
    AOS.init();

    // window width 플러그인 제거
    var ww = $(window).width();
    if(ww <= 1217) {
        console.log('mob')
        skrollr.init().destroy();
    }else {
    }
    $(window).resize(function(){
        var ww = $(window).width();
        console.log(ww)
        if(ww == 1183) {
            window.location.reload()
            skrollr.init().destroy();
        }   
    });
    // 동작 script
    // mob 햄버거 클릭
    $('.mob__hamb').click(function(){
        $('.mob__menu-wrap').css({
            opacity: 1,
            visibility: 'visible',
            top: 0
        });
    });
    $('.btn__x').click(function(){
        $('.mob__menu-wrap').css({
         opacity: 0,
         visibility: 'hidden',
         top: '-20px'
         }); 
     });
    // 메뉴 호버
    $('.menu').hover(function(){
        console.log('menu hover');
        $('.submenu__bg').addClass('active');
    }, function(){
        $('.submenu__bg').removeClass('active');
    });
    // 아코디언 호버
    $('.accordion li').mouseover(function(){
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
    });
    // 탭 클릭
    $('.tab').click(function(){
        var tabNum = $(this).index();
        $('.tab').eq(tabNum).addClass('active');
        $('.tab').eq(tabNum).siblings().removeClass('active');
        $('.pr__content').eq(tabNum).addClass('active');
        $('.pr__content').eq(tabNum).siblings().removeClass('active');
    });

    // 스크롤 제어 script
    $(window).scroll(function(){
        var myPos = $(window).scrollTop();
        var sec2Pos = $('.sec2').offset().top;
        var sec3Pos = $('.sec3').offset().top - $(window).height();
        var auditionPos = $('.audition').offset().top - 300;
        if(myPos < sec2Pos && ww > 1183){
            // $('.sec2-container').attr('data-0', '');
            // $('.sec2-container').attr('data-4000', '');
            // $('.sec2-container').attr('style', '');
            // $('.sec2-container').removeClass('skrollable')
            // $('.sec2-container').removeClass('skrollable-between')
            skrollr.init().destroy();
            // $('.sec2-container').css({
            //     position: 'static',
            //     top: 0,
            //     left: 0,
            //  });
        }else if(myPos >= sec2Pos && myPos < sec3Pos && ww > 1183) {
            console.log('working')
            skrollr.init();
            $('.sec2-container').css({
                position: 'fixed',
                top: 0,
                left: 0
            })
        }else if(myPos >= sec3Pos && myPos < auditionPos){
            // $('.sec2-container').css({
            //     position: 'absolute',
            //     top: 'auto',
            //     bottom: 0,
            //     left: 0
            // })
        }else if(myPos >= (auditionPos)) {
            auditionScr();
        }
    }) 
    

    // audition 스크롤 효과
    function auditionScr() {
        console.log('af')
        $('.audition-inner > p').css({
            opacity: 1,
            transform: 'translateY(0px)'
        })
        setTimeout(function(){
            $('.audition-inner > span').css({
                opacity: 1,
                transform: 'translateY(0px)'
            })
        }, 150)
        setTimeout(function(){
            $('.audition__line').css({
                height: '60vh'
            })
        }, 400)
        setTimeout(function(){
            $('.audition__middle').css({
                opacity: 1
            })
        }, 1300)
    }
}); //end
