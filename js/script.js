/* Author: Pierrick CAEN

*/
$(document).ready(function() {
	var wallInstagram = $('section#wall').instagramPictures({
		accessToken: '915887.f59def8.e035a237540e41788101771cabc2c2f9'
	});

	$('#search').bind('webkitspeechchange', function(data) {
		var searchData = $(this).val();
		$('section#wall').html('');
		$('section#wall').instagramPictures({
			search: searchData
		});
	});

	$('#search').keyup(function(data) {
		var searchData = $(this).val();
		clearTimeout($.data(this, 'timer'));
		var wait = setTimeout(function(){
			$('section#wall').html('');
			wallInstagram.search(searchData);
		}, 500);
		$(this).data('timer', wait);
	});
});


