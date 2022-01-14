$('.article4 li > div').on('mouseover mouseout', function(){
    $(this).toggleClass('on')
})

$('.article4 li > div .zoom > a:first-child').on('click', function(){
    var href = $(this).attr('href')
    var src = $(this).parent().prev().attr('src')
    console.log(src)
    $('#wrap').after('<div class="outbox"><div class="inbox"></div></div>')
    $('.inbox').append(`<a href="${href}" target="_blank"><img src="${src}" alt="설명문구"></a>`)
    $('.inbox').append('<button type="button">닫기</button>')
    // (↑) 한번에 적으면 햇갈리고 가독성이 떨어지므로 나눠서 만들었음.
    // (↓) 밑에 css는 그대로 놔둠
    $('.outbox').css({display:'block'})
    // $('.inbox a').attr({ href:href })
    // $('.inbox img').attr({ src:src })
    return false    
})


$('body').on('click', '.outbox button', function(){
    $('.outbox').remove()
})


$('.cs_board .tabmenu li').on('click', function(){
    $(this).addClass('active')
    .siblings().removeClass('active')
    // console.log($(this).index())
    var index = $(this).index()
    $(this).parent().next().children('div').eq(index).addClass('active')
    .siblings().removeClass('active')
})

//슬릭슬라이더 플러그인 연결
$('.slide-group').slick({
    autoplay:true,           //false가 기본값 (auto  X)
    autoplaySpeed:3000,
    speed:600,
    dots:true,
    // arrows:true,            //true가 기본값
    prevArrow:'<button class="slick-arrow slick-prev"><i class="fas fa-angle-left"></i></button>',
    nextArrow : '<button class="slick-arrow slick-next"><i class="fas fa-angle-right"></i></button>',
    fade:false,               //기본값 false - true시에는 fade효과있음
    slidesToShow:1,
    slidesToScroll:1,
    responsive:[{
        breakpoint : 769,
        settings:{
            fade:true,
            arrows:false
        }

    }]
})

//슬릭슬라이더 자동재생/멈춤
$('.article1 .plpa').on('click', function(){
    if( $(this).find('i').hasClass('fa-pause') ) {
        $('.slide-group').slick("slickPause")
        $(this).find('i').removeClass('fa-pause').addClass('fa-play')
    } else {
        $('.slide-group').slick("slickPlay")
        $(this).find('i').removeClass('fa-play').addClass('fa-pause')
    }
})

//product 구역의 p요소의 글자 수 제한하기
$('.article4 ul li').each(function(){
    var text = $(this).find('p').text()
    var newtext = text.substr(0,40)

    if(text.length<40) {
        let count = 40-text.length
        for(let i=0; i<count; i++) {
            text += "&nbsp; "
        }

        $(this).find('p').html(text)
    } else {
        $(this).find('p').text(newtext+'...')
    }
})


//article2 좌 우에서 이동
//article4 scale변화 animation
var article4Near = $('.article4').offset().top - $(window).height()
// 너무 상단에서 가까운 경우에는 따로 구하는것보다 숫자 10정도 넣어두는게 좋음
$(window).on('scroll',function(){
    var sct = $(this).scrollTop()
    if (sct>10) {
        $('.article2').addClass('on')
    } else {
        $('.article2').removeClass('on')
    }
    if (sct > article4Near) {
        $('.article4').addClass('on')
    } else {
        $('.article4').removeClass('on')
    }
})


//동영상 팝업박스
$('.cs_movie .tubewrap img').on('click', function(){
    $('body').append('<div class="youtubeVideoOuter"><div class="youtubeVideoInner"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/h7C3RyiZfYs?controls=1&amp;mute=1&amp;autoplay=1&amp;rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div></div>')
    $('.youtubeVideoOuter').css({
        position:'fixed',
        top:0, left:0,
        width:'100%',
        paddingTop:'56.25%',
        zIndex:999999999999
    })
    $('.youtubeVideoInner').css({
        position:'absolute',
        top:'10%', left:'10%', bottom:'10%', right:'10%'
    })
    $('.youtubeVideoInner').append('<button type="button">닫기</button>')
    $('.youtubeVideoInner button').css({
        position:'absolute',
        top:0, right:0, zIndex:99999
    })
})

$('body').on('click', 'button', function(e){
    e.preventDefault()
    $('.youtubeVideoOuter').remove()
})