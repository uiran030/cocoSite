//여기서부터 윈도우 resize 이벤트 발생 시 스크롤바 유무에 따른 상태제어 프로그램
//소스처럼 다음번 필요할때 카피해서 쓰면됨.
var deviceSize1 = 1024;        //뷰포트에서 정한 사이즈를 변수에 담아둠
var deviceSize2 = 768;

function scrollOX(status) {
    $('html').css({
        overflowY:status
    })
    var htmlWidth = $('html').width()
    return htmlWidth
}
var scX = scrollOX('hidden')       //스크롤없는상황
var scO = scrollOX('scroll')       //있는 상황
var scD = scX - scO
if(scD>0) {
    deviceSize1 = deviceSize1 - scD
    deviceSize2 = deviceSize2 - scD
}

function init(){
    var ww = $(window).width()
    if(ww>deviceSize1 && !$('html').hasClass('pc')) {
        $('html').addClass('pc').removeClass('tablet mobile')
        $('html').css({overflowY:'auto'})
        $('#header #nav').css({
            position:'absolute', 
            top:'50%', 
            transform:'translateY(-50%)', 
            right:0,
            background:'none',
            left:'unset',
            overflow:'unset',
            bottom:'unset',
            // unset = 기존 줬던 값을 없애는 것
        })
        $('#header #nav .depth1').css({
            position:'unset',
            top:'unset', botton:'unset', right:'unset',
            height:'unset', width:'unset', background:'unset',
            paddingTop:'unset',
        })
        // 작은 화면에서 depth2가 켜진상태로 큰 화면으로 변경하면 depth2가 안사라짐
        // 그부분을 해결하기위함 (↓)
        $('#header #nav .depth1 > li > a').next().hide()
        $('html').scrollTop(0)
    } else if (ww>deviceSize2 && ww<=deviceSize1 && !$('html').hasClass('tablet')) {
        $('html').addClass('tablet').removeClass('pc mobile')
        $('html').css({overflowY:'auto'})
        $('#header #nav').css({
            position:'fixed',
            top:'0px',
            transform:'translateY(0%)',
            right:'0px',
            background:'rgba(0,0,0,0.5)',
            left:'100%',
            bottom:'0px',
            overflowY:'auto',
            overflowX:'hidden'
        })
        $('#header #nav .depth1').css({
            position:'absolute',
            top:'0',
            height:'100%', 
            width:'200px', 
            background:'#fff',
            paddingTop:'50px',
        })
        $('#header .opennav').removeClass('on')
        $('#header .opennav i').removeClass('fa-times').addClass('fa-bars')
        $('html').scrollTop(0)
    } else if (ww<=deviceSize2 && !$('html').hasClass('mobile')){
        $('html').addClass('mobile').removeClass('tablet pc')
        $('html').css({overflowY:'auto'})
        $('#header #nav').css({
            position:'fixed',
            top:'0px',
            transform:'translateY(0%)',
            right:'0px',
            background:'rgba(0,0,0,0.5)',
            left:'100%',
            bottom:'0px',
            overflowY:'auto',
            overflowX:'hidden'
        })
        $('#header #nav .depth1').css({
            position:'absolute',
            top:'0',
            height:'100%', 
            width:'200px', 
            background:'#fff',
            paddingTop:'50px',
        })
        $('#header .opennav').removeClass('on')
        $('#header .opennav i').removeClass('fa-times').addClass('fa-bars')
        $('html').scrollTop(0)
    }
}
init()

$(window).on('resize', function(){
    init()
})
//여기까지 윈도우 resize 이벤트 발생 시 스크롤바 유무에 따른 상태제어 프로그램



$('.search label').on('click', function(){
    $('.search').toggleClass('on')
})


// click 이벤트는 a 한테 적용
// mouseover 이벤트는 li 한테 적용
// $('#header #nav .depth1 > li').on('mouseover', function(e){
//     e.preventDefault()
//     // preventDefault는 클릭이벤트가 아니면 굳이 있을필요는 없지만 누군가 클릭을 할수있기때문에 남겨둠
//     // $(this).toggleClass('on')
//     $(this).find('.depth2').stop().slideDown(200)       //jq 효과임 slideDown
// })
// $('#header #nav .depth1 > li').on('mouseout', function(e){
//     e.preventDefault()
//     $(this).find('.depth2').slideUp()
// })

// 하나로 합쳐 쓸 수 잇음 (↓)
$('#header #nav .depth1 > li').on('mouseover mouseout', function(e){
        e.preventDefault()
        if($('html').hasClass('pc')){
            $(this).find('.depth2').stop().slideToggle(200)   // slide(시간ms) -> 300=0.3s
        }
        //애니메이션 효과에서 stop 꼭 붙여주는게좋음.
        //사용자가 반복적인 애니메이션을 구현했을때 마지막 하나만 보이도록 하는 것
    })
$('#header #nav .depth1 > li > a').on('click', function(e){
    e.preventDefault()
    if (!$('html').hasClass('pc')) {
        $(this).next().stop().slideToggle(200)
        $(this).parent().siblings().find('.depth2').hide()
        // (↑) 마지막 줄 - 창이 작을때 depth2가 다른걸 누르게될때 다른나머지는 없어져야함.
    }
})
// (↑) class pc때는 마우스오버, 아웃으로 작동 - pc가 아닌상황에서는 클릭으로 작동



// nav구역
$('#header .opennav').on('click', function(){
    if ( !$(this).hasClass('on') ) {
        $('html').css({overflowY:'hidden'})

        $(this).addClass('on')
        $(this).next().animate({left:0}, 300)
        $(this).next().find('.depth1').animate({right:0}, 300)
        $(this).find('i').removeClass('fa-bars').addClass('fa-times')
    } else {
        $('html').css({overflowY:'auto', overflowX:'hidden'})

        $(this).removeClass('on')
        $(this).next().animate({left:'100%'}, 300)
        $(this).next().find('.depth1').animate({right:'-200px'}, 300)
        $(this).next().find('.depth2').hide()
        $(this).find('i').removeClass('fa-times').addClass('fa-bars')
    }
})

$(window).on('scroll', function(){
    var sct = $(this).scrollTop()
    if ( sct>10 ) {
        $('#header').css({
            position:'fixed',
            top:0, left:0,
            width:'100%',
            zIndex:99999,
            background:'#fff'
        })
    } else {
        $('#header').css({
            position:'static',
            width:'100%'
        })
    }

    if(sct>500 && !$('html').hasClass('gotopflag')) {
        $('html').addClass('gotopflag')
        $('body').append('<div class="gotop"><a href="javascript:;"><i class="fas fa-arrow-circle-up"></i></a></div>')
        $('.gotop').css({
            position:'fixed',
            right:'50px',
            bottom:'50px',
            fontSize:'50px',
            zIndex:999,
            opacity:0,
        }).animate({opacity:1}, 300)
    } else if (sct<=500 && $('html').hasClass('gotopflag')){
        $('html').removeClass('gotopflag')
        $('.gotop').animate({opacity:0}, 300, function(){
            $(this).remove()
        })
    }
})

// 가공된 .gotop에는 직접적으로 click 이벤트를 설정할 수 없어서 큰 부모에게 주고 넘기는 식으로 해야함
$('body').on('click', '.gotop', function(){
    $('html').animate({scrollTop:0}, 500)
})


$('#footer .privacy .fam').on('click', function(){
    $(this).find('ul').slideToggle()
})