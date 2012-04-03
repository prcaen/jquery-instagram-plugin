(function($){
	$.instagramPictures = function(el, options){
		var base = this;

		base.$el = $(el);
		base.el = el;
		base.photos = {};

		base.$el.data("instagramPictures", base);

		base.init = function(){
			base.options = $.extend({},$.instagramPictures.defaultOptions, options);
			
			if(typeof(base.options.accessToken) === "undefined" || base.options.accessToken === null)
				alert('The jQuery Instagram plugin need an access token');

			base.loadPictures();
		};

		base.loadPictures = function(searchVal){
			if(typeof(searchVal) === "undefined" || searchVal === null)
				searchVal = base.options.search;

			$.ajax({
				url: 'https://api.instagram.com/v1/tags/'+ searchVal +'/media/recent',
				type: "GET",
				dataType: "jsonp",
				data: 'access_token=' + base.options.accessToken + '&count=' + base.options.count,
				success: function(response) {
					base.photos = response.data;
					base.displayPictures();
				},
				error: function(error) {
					//called when there is an error
					console.log(error);
				},
			});
		};

		base.displayPictures = function(){
			$.each(base.photos, function(index, value) {
				var thumbsURL = value.images.thumbnail.url;
				base.$el.append('<img src="' + thumbsURL + '" alt="">');
			});
		};

		base.init();
	};

	$.instagramPictures.defaultOptions = {
		count: 20,
		search: 'lolcat'
	};

	$.fn.instagramPictures = function(options){
		this.search = function(searchVal){
			if(typeof(searchVal) === "undefined" || searchVal === null || searchVal == '')
				searchVal = $.instagramPictures.defaultOptions.search;

			this.data("instagramPictures").loadPictures(searchVal);
		};

		return this.each(function(){
			(new $.instagramPictures(this, options));
		});
	};

	$.fn.getInstagramPictures = function(){
		this.data("instagramPictures");
	};

})(jQuery);
