$(document).ready(function () {

   var owl = $('.owl-carousel').owlCarousel({
    animateOut: "animate__animated animate__slideOutDown",
    animateIn: "animate__animated animate__flipInX",
        loop: true,
        margin: 20,
        rtl: true,
        nav: true,
        smartSpeed: 450,
            responsiveClass: true,
            responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 5,
            }
        }
    })
    $('.owl-carousel').on('translate.owl.carousel', function(e){
        
        idx = e.item.index;
        $('.owl-item.passed').removeClass('passed');
        $('.owl-item.current').removeClass('current');
        $('.owl-item').eq(idx-1).addClass('passed');
        $('.owl-item').eq(idx).addClass('current');
        });
    $(".slider-1-next").click(function (e) {
      
        // $('.owl-item').removeClass('current');
		owl.trigger("next.owl.carousel");
       
	});
	$(".slider-1-prev").click(function (e) {
        // $('.owl-item').addClass('current');

        // $('.owl-item').removeClass('passed');
		owl.trigger("prev.owl.carousel");
      
	});

 
});