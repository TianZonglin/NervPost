
/*! FeedEk jQuery RSS/ATOM Feed Plugin v3.1.1
* https://jquery-plugins.net/FeedEk/FeedEk.html  https://github.com/enginkizil/FeedEk
* Author : Engin KIZIL */

(function ($) {
	$.fn.FeedEk = function (opt) {
		var def = $.extend({
			MaxCount: 25,
			ShowDesc: true,
			ShowPubDate: true,
			DescCharacterLimit: 500,
			TitleLinkTarget: "_parent",
			DateFormat: "",
			DateFormatLang: "en"
		}, opt);

		var id = $(this).attr("id"), s = "", dt;
		$("#" + id).empty();
		if (def.FeedUrl == undefined) return;
		$("#" + id).append('<img style="width:2em;height:2em;border:0px;box-shadow:0 1px 2px rgba(151, 151, 151, 0)" src="loader.gif" />');
		$.ajax({
			url: "https://feed.jquery-plugins.net/load?url=" + encodeURIComponent(def.FeedUrl) + "&maxCount=" + def.MaxCount + "&dateCulture=" + def.DateFormatLang + "&dateFormat=" + def.DateFormat,
			dataType: "json",
			success: function (result) {
				$("#" + id).empty();
				if (result.data == null)
					return;

				$.each(result.data, function (e, itm) {
					
					var tt="";
					if (def.ShowPubDate) {
						dt = new Date(itm.publishDate);
						tt += '<span class="itemDate">';
						if ($.trim(def.DateFormat).length > 0) {
							tt += itm.publishDateFormatted;
						}
						else {
							tt += dt.toLocaleDateString();
						}
						tt += '</span>';
					}
					s += '<li><div class="itemTitle"><a href="' + itm.link + '" target="_self" >' + itm.title + '</a>&emsp;'+tt+'</div>';
					if (def.ShowDesc) {
						s += '<div class="itemContent">';
						if (def.DescCharacterLimit > 0 && itm.description.length > def.DescCharacterLimit) {
							s += itm.description.substring(0, def.DescCharacterLimit) + '...';
						}
						else {
							s += itm.description;
						}
						s += '</div>';
					}
				});

				$("#" + id).append('<ul class="feedEkList">' + s + '</ul></li>');
			}
		});
	};
})(jQuery);
