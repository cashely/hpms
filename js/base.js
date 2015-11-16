$(function(){
	//布局	
	var layout = function(){
		var windowHeight = $(window).height(),windowWidth = $(window).width(),W=150,H=46;
		$('.header').height(H);
		$('.main-left').width(W);
		$('.main').height(windowHeight-H);
		$('.main-center-center').height(windowHeight-H-35);
	};
	
	$(window).resize(function(){
		layout();
	}).trigger('resize');
	
	//绑定左侧事件
	var menuHover;
	$('.nav-parent li').on('mouseenter',function(){
		menuHover=$(this);
		menuHover.find('.nav-son').css({
			left:menuHover.width()
		}).show();
	}).on('mouseleave',function(){
		menuHover.find('.nav-son').hide();
	});
	
	//侧栏收缩事件
	$('.bar-controller').on('click',function(){
		if($(this).hasClass('active')){
			$('.main-left').width(39).find('li em').css('display','none');
			$(this).removeClass('active');
		}else{
			$('.main-left').width(150).find('li em').css('display','block');
			$(this).addClass('active');
		}
		
	});
	//tab事件
	$(document).on('click','.tab-bar a',function(){
		$(this).addClass('active').parent().siblings('li').children('a').removeClass('active');
        $('.main-center-center .main-box').eq($(this).parent().prevAll().length).show(0).siblings().hide();
        return; 
	});
//	tab关闭事件
	$(document).on('click','.tab-bar span',function(){
        $('.main-center-center .main-box').eq($(this).parent().prevAll().length).prev().show(0).end().remove();
        if($(this).siblings('a').hasClass('active')){     
            $(this).parent().prev().children('a').addClass('active').end().end().remove();
        }
	});
	
	
//	左侧菜单联动
	$('.nav-son a,.index a').on('click',function(){
		var $this = $(this),tabIsShow = false;
		$('.tab-bar a').each(function(){
			if($this.attr('href').replace('#','') == $(this).attr('id')) tabIsShow = true;
		});
		if(!tabIsShow && $this.attr('url')){
			$.ajax({
                method:'POST',
                url:$this.attr('url'),
                success:function(data){
                    $('.tab-bar ul').children('li').children('a').removeClass('active').end().end().append($('<li><a class="active" href="javascript:void(0)" title="'+ $this.text() +'" id="'+ $this.attr('href').replace('#','')+'">'+$this.text()+'</a><span>×</span></li>'));
            //打开右侧标签内容区域
            
            $('<div class="main-box"/>').html(data).appendTo($('.main-center-center')).siblings('.main-box').hide();
                }
            })
		}else{
            $($this.attr('href')).addClass('active').parent().siblings('li').children('a').removeClass('active');
        }
        
        return false;
	});
	
	//设置日期
	(function($){
		var date = new Date(),weekArr = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],toDay,week;
		toDay = date.getFullYear() + "年" + eval(date.getMonth()+1) + '月' + date.getDate() + '日';
		week = weekArr[date.getDay()];
		$('.time').html(toDay + '<em>' + week + '</em>');
		
	})(jQuery);
	
});