$(document).ready(function(){
    $('.fade').slick({
      dots: true,
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: 'linear'
    });
    $('.btn_next').click(function(){
        $('.slick-next').trigger('click');
    });
    $('.btn_prev').click(function(){
        $('.slick-prev').trigger('click');
    });
});
