
 $(document).ready(function(){ 
　　var src = $(".picture_suo_img img").eq(0).attr('src');
	$('.showImg').attr('src', src);
}); 

/*点击产品展示图时弹窗查看大图窗口*/
$('.product_picture1').click(function() {
	//获取所选产品标题
	var tname = $(this).parent().siblings(".product_main").find(".product_j h3").html();
	$(".picture").find(".picture_name a h3").html(tname);
	//获取所选产品链接
	var lj = $(this).parent().siblings(".product_main").find(".product_img a").attr("href");
	$(".picture").find(".ljxq22 a").attr("href",lj);
	//点击弹窗加载图片
	$("img").trigger("click2")
	$(".picture").css("display", "block");
	$(".tanchukuang_bg11").css("display", "block");
});
/*点击关闭弹窗*/
$(".clos").click(function() {
	$(".picture").css("display", "none");
	$(".tanchukuang_bg11").css("display", "none");
});

/*获取缩略图的地址传到div形成大图*/
$('.picture_suo_img img').each(function() {
	$(this).click(function() {
		var src = $(this).attr('src');
		$('.showImg').attr('src', src);
	});
});
/*点击切换缩略图*/
$(".picture_suo_img").click(function() {
	$(".picture_suo_img").siblings(".suo-img").removeClass('suo-img');
	$(this).addClass('suo-img');
});
/*点击加载下一张缩略图*/
$(".next").click(function() {
	var next = $(".suo-img").removeClass("suo-img").eq($(".picture_suo_img").index(this)).next().addClass('suo-img');
	var src = next.children('img').attr('src');
	$('.showImg').attr('src', src);
	/*判断如果是最后一张图则切换到下一页第一张图*/
	var s = $(".suo-img").index();
	if(s<0){
		var n = $(".picture_suo_t").css("display");
		if(n=="block"){
			$(".picture_next").siblings("span").text("2/2");
			var next1=$(".picture_next").parent().siblings(this).css("display", "none").eq($(".picture_suo_t").siblings().index(this)).css("display", "block").children(".picture_suo_img:first-child").toggleClass('suo-img');
			var src = next1.children('img').attr('src');
			$('.showImg').attr('src', src);
		}else{
			$(".picture_next").siblings("span").text("1/2");
			var prev1=$(".picture_prev").parent().siblings(this).css("display", "block").children(".picture_suo_img:first-child").addClass('suo-img');
			var prev1=$(".picture_prev").parent().siblings(this).eq($(".picture_suo_t").siblings().index(this)).css("display", "none").children(".picture_suo_img").removeClass('suo-img');
			var src = prev1.children('img').attr('src');
			$('.showImg').attr('src', src);
		}

	}
		

});
/*点击加载上一张缩略图*/
$(".prev").click(function() {
	var prev = $(".suo-img").removeClass("suo-img").eq($(".picture_suo_img").siblings().index(this)).prev().addClass('suo-img');
	var src = prev.children('img').attr('src');
	$('.showImg').attr('src', src);
	/*判断如果是第一张图则切换到上一页最后一张图*/	
	var s = $(".suo-img").index();
	if(s<0){
		var n = $(".picture_suo_t").css("display");
		if(n=="none"){
			$(".picture_next").siblings("span").text("1/2");
			var prev1=$(".picture_prev").parent().siblings(this).css("display", "block").children(".picture_suo_img:last-child").addClass('suo-img');
			var prev1=$(".picture_prev").parent().siblings(this).eq($(".picture_suo_t").siblings().index(this)).css("display", "none").children(".picture_suo_img").removeClass('suo-img');
			var src = prev1.children('img').attr('src');
			$('.showImg').attr('src', src);
		}else{
			$(".picture_next").siblings("span").text("2/2");
			var next1=$(".picture_next").parent().siblings(this).css("display", "none").eq($(".picture_suo_t").siblings().index(this)).css("display", "block").children(".picture_suo_img:last-child").toggleClass('suo-img');
			var src = next1.children('img').attr('src');
			$('.showImg').attr('src', src);
		}
	}
});
/*点击加载下一页缩略图*/
$(".picture_next").click(function() {
	var n = $(".picture_suo_t").css("display");
	if(n=="block"){
		$(this).siblings("span").text("2/2");
		$(this).parent().siblings(this).css("display", "none").children(".picture_suo_img").removeClass('suo-img');
		$(this).parent().siblings(this).eq($(".picture_suo_t").siblings().index(this)).css("display", "block").children(".picture_suo_img:first-child").addClass('suo-img');
	}else{
		$(this).siblings("span").text("1/2");
		$(this).parent().siblings(this).css("display", "block").children(".picture_suo_img:first-child").addClass('suo-img');
		$(this).parent().siblings(this).eq($(".picture_suo_t").siblings().index(this)).css("display", "none").children(".picture_suo_img").siblings(".suo-img").removeClass('suo-img');

	}
});
/*点击加载上一页缩略图*/
$(".picture_prev").click(function() {
	var n = $(".picture_suo_t").css("display");
	if(n=="none"){
		$(this).siblings("span").text("1/2");
		$(this).parent().siblings(this).css("display", "block").children(".picture_suo_img:first-child").addClass('suo-img');
		$(this).parent().siblings(this).eq($(".picture_suo_t").siblings().index(this)).css("display", "none").children(".picture_suo_img").siblings(".suo-img").removeClass('suo-img');
	}else{
		$(this).siblings("span").text("2/2");
		$(this).parent().siblings(this).css("display", "none").children(".picture_suo_img").removeClass('suo-img');
		$(this).parent().siblings(this).eq($(".picture_suo_t").siblings().index(this)).css("display", "block").children(".picture_suo_img:first-child").addClass('suo-img');
	}
});