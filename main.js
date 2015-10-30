$(document).ready(function() {
	intro();
	startMail();
	setMenu();
});

function intro() {
	$("#intro-launch").on("click touchstart", function() {
		if(!$("#intro-launch").hasClass("disabled")) {
			run();
		}
	});
	$(".intro-helper-text").on("click touchstart", function() {
		$("#intro-helper").hide();
	});
	setInterval(blink, 600);
	var phrase = "console.log(\"Hi, I'm Jason\");";
	var delays = [2000,50,90,120,30,100,90,120,40,90,70,130,90,100,90,40,40,60,130,100,80,40,30,150,40,30,50,80,70,140,90,80];
	addPhrase(phrase, delays);
	$("#intro-append").delay(1500).promise().done(function() {
		console.log("Hi, I'm Jason\nI'm Glad You Want To See My Site's Code!\nBut It Might Be Easier To Check It Out Here:\nhttp://github.com/influential/jason-codes");
		color();
		$("#intro-launch").delay(1000).promise().done(function() {
			$("#intro-append").text("");
			$("#intro-launch").css("background-color", "rgba(0,204,0,.7)");
			$("#intro-launch").text("Run");
			phrase = "init();";
			delays = [2000,50,90,120,70,100,90];
			addPhrase(phrase, delays);
			helper();
		});
	});
}

function addLetter(letter, time) {
	$("#intro-append").delay(time).queue(function(next) {
		$(this).append(letter);
		next();
	});
}

function addPhrase(phrase, delays) {
	for(var i = 0; i < phrase.length; i++) {
		addLetter(phrase.charAt(i), delays[i]);
	}
}

function blink() {   
	$("#intro-cursor").animate({
		opacity: 0
	}, "fast", "swing").animate({
		opacity: 1
	}, "fast", "swing");
}

function blinkMenu() {   
	$(".menu-label-helper").animate({
		opacity: 0
	}, "slow", "swing").animate({
		opacity: 1
	}, "slow", "swing");
}

function color() {
	$("#intro-launch").css("background-color", "rgba(255,0,0,.7)");
	$("#intro-launch").text("Running");
}

function helper() {
	$("#intro-append").promise().done(function() {
		$("#intro-launch").toggleClass("disabled");
		setTimeout(function() { 
			if($("#intro-launch").text().length == 3) {
				$("#intro-helper").show();
			}
		}, 8000);
	});
}

function run() {
	$("#intro-helper").hide();
	color();
	$("#menu").css({position: "fixed"});
	$("#intro-launch").delay(1000).promise().done(function() {
		$("#intro-cursor").remove();
		var height = $("#intro-container").outerHeight();
		if(window.innerHeight < window.innerWidth) {
			$("#intro-launch").animate({right: "-=1500px"}, 1000);
			launch(height, 0);
		} else {
			launch(height / 2, 500);
		}
	});	
}

function launch(height, delay) {
	$("#intro-container").animate({height: height + "px"});
	$("#intro-append").delay(delay).animate({marginLeft: "100%"}, 1000);
	$("#intro-anchor").delay(delay).animate({width: "100%", paddingLeft: "100%"}, 1000, function() {
		$("#intro-container").animate({marginLeft: "100%"}, 1000, function() {
			$("#intro-container").remove();
			$("#intro").animate({
				borderRadius: "50%",
				top: $(window).height() / 2 - 37 + "px",
				left: $(window).width() / 2 - 37 + "px",
				height: "70px",
				width: "70px"
			}, 500);
			$("#intro").delay(500).promise().done(function() {
				$("#intro").css({borderWidth: "2px"}).animate({backgroundSize: "500%"}, 500, function() {
					$(".menu-inactive").css({top: "108px", left: "108px"});
					$("#menu-list").css({margin: "auto"});
					$(".menu-vertical").css({height: "290px"});
					var top = [-94, -47, 47, 94, 47, -47];
					var left = [0, 94, 94, 0, -94, -94];
					$(".menu-inactive").each(function(index) {
						$(this).show();
						$(this).delay(200*index).animate({
							top: top[index] + 108 + "px",
							left: left[index] + 108 + "px"
						}, 200, "linear");
					});
					$(".menu-inactive").delay(800).promise().done(function() {
						$(".menu-inactive").each(function(index) {
							$(this).delay(200*(5-index)).animate({
								top: "108px",
								left: "108px"
							}, 200, "linear");
						});
						$(".menu-inactive").delay(100).promise().done(function() {
							$(".menu-inactive").hide();
							$("#menu-list").css({margin: "0px"});
							$(".menu-vertical").css({height: "100%"});
							$(".section-active").show();
							$("#intro").animate({top: "5px",left: "5px"}, 1000, function() {
								$(".menu-active").css({
									top: "5px",
									left: "5px"
								});
								$(".menu-active").removeClass("hidden");
								$("#menu").css("background-color", "rgba(0,0,0,0)");
								$("#intro").remove();
								$("#menu").css({width: "80px", height: "80px"});
								$(".about-animate-one").animate({marginRight: "0px"}, 1000, function() {
									$(".about-animate-two").delay(500).animate({marginRight: "0px"}, 1000, function() {
										$(".about-animate-three").delay(100).animate({marginTop: "0px"}, 1200, function() {
											$(".menu-label-helper").show().animate({left: "0px"}, 300, function() {
												$(window).scroll(function() {
												   if($(window).scrollTop() + $(window).height() > $(document).height() - 200) {
												       setInterval(blinkMenu, 1000);
												   }
												});
											});
										});
									});
								});
							});
						});
					});
				});
			});
		});
	});
}

function setMenu() {
	$("#menu").on("click touchstart", "#menu-list li", function() {
		startMenu(this);
	});
}

function startMenu(selected) {
	$("#menu").unbind("click touchstart");
	$(".menu-label-helper").remove();
	if($(".menu-active").position().left < 10) {
		showMenu();
	} else {
		if($(selected).hasClass("menu-inactive")) {
			swapMenu(selected);
		}
		$("#menu-list li").promise().done(function() {
			hideMenu();
		});
	}
}

function showMenu() {
	$("#menu").css({"background-color": "rgba(0,0,0,.7)", width: "100%", height: "100%"});
	$("#menu-list").css({width: "290px", height: "290px"});
	$(".menu-vertical").animate({height: "290px"}, 800);
	$("#menu-list").animate({
		marginLeft: ($(window).width() - 290) / 2 + "px",
		marginRight: ($(window).width() - 290) / 2 + "px"
	}, 800, function() {
		$(this).css({margin: "auto"});
	});
	$(".menu-active").animate({
		top: "108px",
		left: "108px"
	}, 800, function() {
		$(".menu-inactive").css({top: $(".menu-active").position().top, left: $(".menu-active").position().left});
		var top = [-94, -47, 47, 94, 47, -47];
		var left = [0, 94, 94, 0, -94, -94];
		$(".menu-inactive").each(function(index) {
			$(this).show();
			$(this).delay(200*index).animate({
				top: top[index] + 108 + "px",
				left: left[index] + 108 + "px"
			}, 200, "linear", function() {
				if(index < 2 || index > 4) {
					$(this).children().css({display: "inline-block", top: "-30px"});
				} else {
					$(this).children().css({display: "inline-block", top: "82px"});
				}
			});
		});
		$(".menu-inactive").promise().done(function() {
			setMenu();
		});
	});
}

function swapMenu(element) {
	var active = $(".menu-active"); var selected = $(element); var section = $(selected).attr("href");
	var activeTop = $(active).position().top + "px"; var activeLeft = $(active).position().left + "px";
	var selectedTop = $(selected).position().top + "px"; var selectedLeft = $(selected).position().left + "px";
	$(".menu-inactive").children().hide();
	$(active).removeClass("menu-active").addClass("menu-inactive").show().animate({
		top: selectedTop,
		left: selectedLeft
	}, 500);
	$(active).promise().done(function() {
		var clone = $(active).clone();
		$(selected).prev().after(clone);
		$(active).remove();
	});
	$(selected).removeClass("menu-inactive").addClass("menu-active").animate({
		top: activeTop,
		left: activeLeft
	}, 500);
	$(selected).promise().done(function() {
		var clone = $(selected).clone();
		$("#menu-list").prepend(clone);
		$(selected).hide().remove();
		var scrollPosition = $("body").scrollTop(); var scrollPositionF = $("body, html").scrollTop();
		if(scrollPositionF > scrollPosition) scrollPosition = scrollPositionF;
		$(".section-inactive").show();
		var combinedPosition = $(".section-active").offset().top;
		$("body, html").scrollTop(scrollPosition + combinedPosition);
        $("body, html").promise().done(function() {
			$(".section-active").removeClass("section-active").addClass("section-inactive");
			$(section).removeClass("section-inactive").addClass("section-active");
			$("body, html").delay(200).animate({
	        	scrollTop: $(section).offset().top 
	    	}, 2000, function() {
	    		$(".section-inactive").hide();
	    		$("body, html").scrollTop(0);
	    		return false;
	    	});
    	});
	});
}

function hideMenu() {
	$(".menu-inactive").children().hide()
	$(".menu-inactive").each(function(index) {
		$(this).delay(200*(5-index)).animate({
			top: $(".menu-active").position().top + "px",
			left: $(".menu-active").position().left + "px"
		}, 200, "linear");
	});
	$(".menu-inactive").delay(100).promise().done(function() {
		$(".menu-inactive").hide();
		$("#menu-list").css({
			marginLeft: ($(window).width() - 290) / 2 + "px",
			marginRight: ($(window).width() - 290) / 2 + "px"
		});
		$(".menu-vertical").animate({height: "100%"}, 800);
		$("#menu-list").animate({margin: "0px"}, 800);
		$(".menu-active").animate({
			top: "5px",
			left: "5px"
		}, 800, function() {
			$("#menu").css({"background-color": "rgba(0,0,0,0)", width: "80px", height: "80px"});
			$("#menu-list").css({width: "80px", height: "80px"});
			setMenu();
		});
	});
}

function startMail() {
	$(".intro-email-shoot").on("click touchstart", function() {
		$("#menu-about").trigger("click");
		setTimeout(function() { 
			$("#menu-contact").trigger("click");
		}, 2300);
	});
	$(".intro-email-shoot").on("touchstart", function() {
		$("#menu-about").trigger("touchstart");
		setTimeout(function() { 
			$("#menu-contact").trigger("touchstart");
		}, 2300);
	});
	$("#send").on("click touchstart", function() {
		$(".contact-confirm").show();
	});
	$(".contact-confirm-message").on("click touchstart", function(e) {
		e.preventDefault();
		sendMail();
	});

	$(".contact-no-message").on("click touchstart", function() {
		$(".contact-confirm").hide();
	});
}

function sendMail() {
	$(".contact-confirm-message").text("Sending...");
	$.post( "http://104.236.48.178:1337/mail", {
		name: $("#input-one").val(),
		contact: $("#input-two").val(),
		message: $("#input-three").val()
	}).done(function() {
		$(".contact-confirm-message, .contact-no-message").hide();
		$(".contact-pre-text").text("Email Sent!");
		$("#input-one").val("");
		$("#input-two").val("");
		$("#input-three").val("");
		setTimeout(function() { 
			resetMail();
		}, 4000);
	}).fail(function() {
		$(".contact-confirm-message, .contact-no-message").hide();
		setTimeout(function() { 
			resetMail();
		}, 6000);
        $(".contact-pre-text").text("Something went wrong! Just email me at jasonhuntrods@gmail.com.");
    });
}

function resetMail() {
	$(".contact-confirm").hide();
	$(".contact-no-button").show();
	$(".contact-pre-text").text("Send Email?");
	$(".contact-confirm-message").show().text("Send It!");
	$(".contact-no-message").show();
}
