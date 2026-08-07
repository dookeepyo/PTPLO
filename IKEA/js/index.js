$(document).ready(function(){
  // SWIPER
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    scrollbar: {
        el: ".swiper-scrollbar",
    },
    breakpoints: {
      768: {
        slidesPerView: 2
      },

      1040: {
        slidesPerView: 3
      }

    }
  });
  // AOS
  AOS.init({

    disable: function () {
      var desktop = 1040;
      return window.innerWidth < desktop;
    } // 1040px 이상일 때 disable
  
  });
  // sec4 배경높이값 설정
  var sec4Height1 = $('.sec4-t').height();
  $('.sec4-bg').css({
    height: sec4Height1 + 283+'px'
  })
  // sec4 sideline 높이값 설정
  var sec4SideHeight = $('.sec4-b').height();
  console.log(sec4SideHeight)
  $('.side-line').css({
    height: sec4SideHeight + 240 +'px'
  })
  // RESIZE
  $(window).resize(function(){
    console.log('resized window')
    // sec4 배경높이값 설정
    var sec4Height1 = $('.sec4-t').height();
    $('.sec4-bg').css({
      height: sec4Height1 + 283+'px'
      // 283 == sec4title, morebtn 등 패딩값 마진값 합
    });
  });
  // 새로고침시 sec1 letter 밑에 fixed 방지
  var myPos = $(window).scrollTop();
  if(myPos >= 171) {
    $('.sec1-letter').css({
      position: 'absolute',
      bottom: '-132px'
    });
  };
  // SCROLL
  $(window).scroll(function(){
    var myPos = $(window).scrollTop();
    console.log('windowScrollTop is '+myPos)
    // SEC1 변수선언
    // -50 = a * 50 + b
    // 100 = a * 800 + b
    // a = 1/5 b = -60
    var sec1ScrollNum = 1/9 * myPos + -500/9;
    $('.sec1-bot-img').css('left', sec1ScrollNum+'%');


    // SEC4 변수선언
    var sec4Top = $('.sec4-news-right').offset().top;
    // 뉴스룸오른쪽 컨텐츠 fixed margin
    var sec4FixedMargin = 200;
    var sec4TopMargin = sec4Top - sec4FixedMargin;
    console.log(sec4TopMargin)
    var sec4TopBottom = $('.sec4-news-right').offset().top + $('.sec4-bg').height() - 1000;
    // console.log(sec4Top);
    


    if(myPos <= 171) {
      $('.sec1-letter').css({
        position: 'fixed',
        bottom: '15px'
      });
    }else if(171 <= myPos && myPos < sec4TopMargin){
      // console.log('sec')
      $('.sec1-letter').css({
        position: 'absolute',
        bottom: '-172px'
      });
    }else if(sec4TopMargin <= myPos && myPos < sec4TopBottom) {
      console.log('working scroll')
      var plusPx = myPos - sec4Top + sec4FixedMargin;
      $('.sec4-news-right-cont').css({
        marginTop: plusPx+'px'
      })
    }
  });
  // product HOVER
  $('.product').hover(function(){
    $(this).stop().animate({
      'box-shadow': '0 0 15px 0 rgba(0, 0, 0, 0.1)'
    }, 300);
    let prodNum = $(this).index();
    $(this).find('.product-iconbox').addClass('active');
  }, function(){
    $(this).find('.product-iconbox').removeClass('active');
  });
  // sec2-cont2 HOVER
  $('.sec2-cont2-dot').mouseenter(function(){
    let sec2Cont2Num = $(this).index();
    $(this).addClass('active');
    $('.dot-info').eq(sec2Cont2Num).css({
      opacity: 1,
      visibility: 'visible'
    });
  });;
  $('.sec2-cont2-dot').mouseleave(function(){
    let sec2Cont2Num = $(this).index();
    $(this).removeClass('active');
    $('.dot-info').eq(sec2Cont2Num).css({
      opacity: 0,
      visibility: 'hidden'
    });
  });
  $('.dot-info').hover(function(){
    let dotInfoNum = $(this).index();
    $('.sec2-cont2-dot').eq(dotInfoNum).trigger('mouseenter')
  }, function(){
    let dotInfoNum = $(this).index();
    $('.sec2-cont2-dot').eq(dotInfoNum).trigger('mouseleave')
  });
  // MOBILE HAMBURGER CLICK
  let hambNum = 0;
  $('.m-header-hamb').click(function(){
    hambNum++;
    if(hambNum % 2 == 1) {
      $('.hamb-menu').css({
        left: 0
      });
      $('.wrap').css({
        height: 100+'vh',
        overflow: 'hidden'
      })
      // $('html').css({
      //   height: '100vh',
      //   overflow: 'hidden'
      // });
    }else{

    };
  });
  $('.outbtn').click(function(){
    hambNum++;
    if(hambNum % 2 == 0) {
      $('.hamb-menu').css({
        left: '100%'
      });
      $('.wrap').css({
        height: 'auto',
        overflow: 'unset'
      })
      // $('html').css({
      //   height: 'auto',
      //   overflow: 'unset'
      // });
    }else {

    };
  });
}); //end