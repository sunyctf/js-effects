/* DaTouWang URL: www.datouwang.com */
var what_items = $(".what-item");
what_items.click(function(a, i) {
	if (!$(this).is(".what-item-active")) {
		var e = $(this).data("num") - 1,
		s = what_items.index(this),
		t = what_items.slice(0, s);
		$(".active-more");
		$(".what-item-active").removeClass("what-item-active"),
		$(this).addClass("what-item-active"),
		$(".active-more").hide(),
		$(".what-more").html(whatList[e]).addClass("active-more").fadeIn("slow"),
		t.map(function(a, i) {
			var e = 448 - 20 * (s - a),
			t = 9 - (s - a);
			$(i).css({
				height: e,
				"z-index": t
			})
		}),
		what_items.slice(s + 1).map(function(a, i) {
			var e = 448 - 20 * (a + 1),
			t = 9 - a - 1;
			$(i).css({
				height: e,
				"z-index": t
			})
		})
	}
});