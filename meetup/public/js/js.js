$(document).ready(function() {
	var scroll_offset = 160;
	
	$('#registration-button').on('click', registration);
	$('#contact-button').on('click', contact);

	$(".menu a").click(function(){
	    $("html, body").animate({
	        scrollTop: $($.attr(this, "href")).offset().top - scroll_offset
	    }, 1000);
	    
	    return false;
	});

	var sections = new Array();
	$("section").each(function() {
		if($(this).attr("id") != "") {
			sections[sections.length] = $(this).attr("id");
		}
	});

	$(window).scroll(function() {
		for(var i = 0; i < sections.length; i++) {
			if($("#" + sections[i]).offset().top < $(window).scrollTop() + scroll_offset * 2) {
				var curr = $(".header li a[href='#" + sections[i] + "']");
				if(!curr.hasClass("active")) {
					$(".header li").removeClass("active");
					curr.parent().addClass("active");
				}
			}
		}
	});

	if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		var s = skrollr.init();
	}
	
	$('.animation-section').height($(window).height() - 185).addClass("on");
	$('header').addClass('on');
	$('nav').addClass('on');
	$('.content').addClass('on');

	function hideNotification() {
		console.log('hideNotification');

		setTimeout(function() {
			$('#notification-area').fadeOut('500');
		}, 5000);
	}

	function registration() {
		
		$.ajax('/email', {
			type: 'post',
			data: {
				name: $('#registration-name').val(),
				email: $('#registration-email').val(),
                comesfrom: $('#registration-comesfrom').val(),
                info: $('#registration-info').val(),
			},
			success: function(data) {
				console.log(data);

				$('#registration-form').html("<p>" + data + "</p>");
			},
			complete: function(data) {
				console.log(data);
			},
			error: function(data) {
				console.log(data);
			}
		});
	}

	function contact() {
		console.log('contact');
				
		$.ajax('/contact', {
			type: 'post',
			data: {
				name: $('#contact-name').val(),
				email: $('#contact-email').val(),
				message: $('#contact-message').val()
			},
			success: function(data) {
				console.log(data);

				$('#notification-area').fadeIn('500', hideNotification);
				$('#notification-area').text(data);
			},
			complete: function(data) {
				console.log(data);
			},
			error: function(data) {
				console.log(data);
			}
		});
	}
});