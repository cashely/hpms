$(function(){
	var _index = 0,_q = 1,t,isAnimate = false;
	function imageScroll(){
        isAnimate = true;
		$('.banner a').eq(_q).addClass('active').siblings('a').removeClass('active');
		$('.banner ul li').eq(_q).addClass('two').end().eq(_index).animate({
			'opacity':0
		},1000,function(){
			$('.banner ul li').eq(_index).removeClass('first').css('opacity',1).end().eq(_q).removeClass('two').addClass('first');
            _index = _q;
            _q == 2 ? _q = 0 : _q ++;
            isAnimate = false;
		});
	}
//	t = setInterval(imageScroll,5000);
	$('.banner a').bind('click',function(){
        if(isAnimate && $(this).hasClass('active')) return false;
		_q = $(this).prevAll().length;
//		$(this).addClass('active').siblings('a').removeClass('active');
		imageScroll();
	});
	$('.banner').on('mouseenter',function(){
		clearInterval(t);
	}).on('mouseleave',function(){
		t = setInterval(imageScroll,5000);
	}).trigger('mouseleave');
	
});