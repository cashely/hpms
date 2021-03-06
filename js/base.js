$(function(){
	//布局
    var windowHeight,windowWidth,W=150,H=46;
	var layout = function(){
		windowHeight = $(window).height();
        windowWidth = $(window).width();
		$('.header').height(H).width(windowWidth);
		$('.main-left').width(W);
		$('.main').height(windowHeight-H).width(windowWidth);
		$('.main-center-center').height(windowHeight-H-35);
	};

	$(window).resize(function(){
		layout();
	}).trigger('resize');

	//隐藏滚动条
	$('body').addClass("scrollbar");

	//绑定左侧事件
	var menuHover;
	$('.nav-parent li').on('mouseenter',function(){
        var _l = windowHeight;
		menuHover=$(this).find('.nav-son').first();
		$(this).parent('.nav-son').prev("a").addClass( "active");
		menuHover.css({
			left:menuHover.parent().width()
		}).show(0,function(){
			if((menuHover.find('.nav-son').length!=0) && menuHover.find('li a i').length==0){
				menuHover.children('li').children('a').append("<i> ▶ </i>");
			}
            if((_l<(menuHover.height()+menuHover.offset().top))){
				if(menuHover.height() <= windowHeight){
					menuHover.css("top",_l-(menuHover.height()+menuHover.offset().top));
				}else{
					menuHover.offset({top:0})
					$('body').css({"overflow-x":"hidden","overflow-y":"auto"});
					//绑定滚动事件
					$(window).scroll(function(){
						if($(document).scrollTop()==0 && (!$('.nav-parent li a').hasClass("active"))){
							$('body').css("overflow",'hidden');
							$('.header').css("width",windowWidth);
							$('.main').css("width",windowWidth);
						}
					});
					var mainheight=menuHover.height()-46
					if(mainheight<335)	mainheight=335;
					$('.main').css({height:mainheight,width:windowWidth-15});
					$('.header').css("width",windowWidth-15);
				}
            }
        });
	}).on('mouseleave',function(){
        menuHover.hide(0,function(){
			menuHover.css("top",0);
        });
        $(this).find('.nav-son').hide(0,function(){
			$(this).find('.nav-son').css("top",0);
        });
		$(this).parent().find("a").removeClass( "active" );
		if($(this).find('.nav-son').length!=0){
			if($(document).scrollTop()==0){
				$('body').css("overflow",'hidden');
				$('.header').css("width",windowWidth);
				$('.main').css("width",windowWidth);
			}
		}
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