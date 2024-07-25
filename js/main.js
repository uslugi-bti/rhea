$(document).ready(function () {
	$(".header__menu").click(function () {
		$("body").toggleClass("active");
		$(".header__list").toggleClass("active")
		$(".header__menu").toggleClass("active");
	});
	function ibg(){
		$.each($('.ibg'), function(index, val) {
			if($(this).find('img').length>0){
				$(this).css('background-image','url("'+$(this).find('img').attr('src')+'")');
			}
		});
	}
	ibg();

	var paddingMain = function () {
		var windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		var containerWidth = document.querySelector(".container").clientWidth;
		var padding;
		padding = ((windowWidth - containerWidth) / 2);
		$(".main-bg__content").css("padding-left", padding + 20);
	}
	paddingMain();
	window.addEventListener("resize", paddingMain);

	$(".amazing-slider").slick({
		variableWidth: true,
		centerMode: true,
		responsive: [
			{
				breakpoint: 601,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					variableWidth: false,
					centerMode: false
				}
			},
			{
				breakpoint: 501,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					variableWidth: false,
					centerMode: false
				}
			}
		]
	});
	var paddingRight = function () {
		var windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		var containerWidth = document.querySelector(".container").clientWidth;
		var padding;
		if (windowWidth > 970) {
			padding = ((windowWidth - containerWidth) / 2);
			$(".amazing__body").css("padding-right", padding);
		} else if (windowWidth <= 970) {
			padding = ((windowWidth - containerWidth) / 2);
			$(".amazing__body").css("padding-right", 20);
			$(".amazing__body").css("padding-left", 20);
		}
	}
	paddingRight();
	window.addEventListener("resize", paddingRight);

	var videoHeight = function () {
		var windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		var videoClientWidth = document.querySelector(".featured-video").clientWidth;
		var videoClientHeight = (videoClientWidth * 613) / 1072;
		$(".featured-video__video").css("height", videoClientHeight);
		$(".featured-video").css("height", videoClientHeight);
		var itemHeight = document.querySelector(".featured__item").clientHeight;
		if (windowWidth > 500) {
			$(".featured__list").css("height", videoClientHeight);
		} else {
			$(".featured__list").css("height", itemHeight * 1.5);
		}
	}
	videoHeight();
	window.addEventListener("resize", videoHeight);

	var videoSettings = function () {
		var videoCards = document.querySelectorAll('.featured-item__video>video');

		videoCards.forEach((video, index) => {
		  video.addEventListener('loadedmetadata', () => {
		    var length = video.duration;
		    var lengthElementSec;
		    var lengthStringMS = length - Math.floor(length);
		    if (lengthStringMS >= 0.5) {
		    	lengthElementSec = Math.floor(length) + 1;
		    } else {
		    	lengthElementSec = Math.floor(length);
		    }

		    var lengthInMinutes = Math.floor(lengthElementSec / 60);
		    if (lengthInMinutes < 10) {
		    	lengthInMinutes = "0" + lengthInMinutes;
		    } else {
		    	lengthInMinutes = lengthInMinutes;
		    }

		    var lengthInSeconds = lengthElementSec - lengthInMinutes * 60;
		    if (lengthInSeconds < 10) {
		    	lengthInSeconds = "0" + lengthInSeconds;
		    } else {
		    	lengthInSeconds = lengthInSeconds;
		    }

		    var lengthElement = document.querySelectorAll('.featured-item__text')[index];
		    lengthElement.innerHTML = lengthInMinutes + "." + lengthInSeconds;
		  });
		});

		var videoMain = document.querySelector(".featured-video__video");
		videoMain.addEventListener("loadedmetadata", function () {
			var durationMain = videoMain.duration;
			var offsetMain = durationMain - Math.floor(durationMain);
			if (offsetMain >= 0.5) {
				offsetMain = 1;
			} else {
				offsetMain = 0;
			}
			var lengthMainSec = Math.floor(durationMain) + offsetMain;
			var lengthMainInMinutes = Math.floor(lengthMainSec / 60);
			if (lengthMainInMinutes < 10) {
				lengthMainInMinutes = "0" + lengthMainInMinutes;
			} else {
				lengthMainInMinutes = lengthMainInMinutes;
			}
			var lengthMainInSeconds = lengthMainSec - (lengthMainInMinutes * 60);
			if (lengthMainInSeconds < 10) {
				lengthMainInSeconds = "0" + lengthMainInSeconds;
			} else {
				lengthMainInSeconds = lengthMainInSeconds;
			}
			document.querySelector(".featured-controls__text").innerHTML = lengthMainInMinutes + "." + lengthMainInSeconds;
		});

		var videoList = document.querySelectorAll('.featured__item');
		$(".featured-controls__button").click(function () {
			if (document.querySelector(".featured-video__video").paused) {
				document.querySelector(".featured-video__video").play();
				$(".featured-controls__title").css("display", "none");
				$(".featured-controls__text").css("display", "none");
				$(".featured-controls__button>img").attr("src", null);
				$(".featured-controls").css("background", null);
				$(".featured-controls__button").css({
					top: "0",
					left: "0",
					width: "100%",
					height: "100%",
					cursor: "auto",
					transform: "translate(0, 0)",
				});
			} else {
				document.querySelector(".featured-video__video").pause();
				$(".featured-controls__title").css("display", "block");
				$(".featured-controls__text").css("display", "block");
				$(".featured-controls__button>img").attr("src", "img/block_3/icons/01.png");
				$(".featured-controls__button").css({
					top: "50%",
					left: "50%",
					width: "60px",
					height: "60px",
					cursor: "pointer",
					transform: "translate(-50%, -50%)"
				});
			}
		});

		videoList.forEach(vid => {
			vid.onclick = () => {
				$(".featured__item").removeClass("active");
				vid.classList.add("active");
				var videoSrc = vid.querySelector('.featured-item__video>video').src;
				var posterSrc = vid.querySelector('.featured-item__video>video').poster;
				var videoTitle = vid.querySelector('.featured-item__title').innerHTML;
				var videoLengthText = vid.querySelector('.featured-item__text').innerHTML;
				document.querySelector('.featured-video__video').src = videoSrc;
				document.querySelector('.featured-video__video').poster = posterSrc;
				document.querySelector('.featured-controls__title').innerHTML = videoTitle;
				document.querySelector('.featured-controls__text').innerHTML = videoLengthText;
				$(".featured-controls__title").css("display", "block");
				$(".featured-controls__text").css("display", "block");
				$(".featured-controls__button>img").attr("src", "img/block_3/icons/01.png");
				$(".featured-controls__button").css({
					top: "50%",
					left: "50%",
					width: "60px",
					height: "60px",
					cursor: "pointer",
					transform: "translate(-50%, -50%)"
				});
			};
		});
	}
	videoSettings();

	$(".categories-slider").slick({
		variableWidth: true,
		centerMode: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					variableWidth: false,
					centerMode: false
				}
			},
			{
				breakpoint: 601,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					variableWidth: false,
					centerMode: false
				}
			}
		]
	});

	$(".experiences-slider").slick({
		adaptiveHeight: true,
		slidesToShow: 1,
		dots: true,
		infinite: false
	});
	$("#date").datepicker();
	$("#ui-datepicker-div").appendTo(".form-dates");

	$(".form-dates #date").on("focus blur", function (event) {
		$(".form-dates").toggleClass("focus", event.type === "focus");
	});

	const selectDest = document.querySelector('.form-destinations');
	const inputDest = selectDest.querySelector('input');
	const ulDest = selectDest.querySelector('ul');
	const prevBtnDest = selectDest.querySelector('.select-prev');
	const nextBtnDest = selectDest.querySelector('.select-next');

	let selectedIndexDest = 0;
	prevBtnDest.addEventListener('click', () => {
		if (selectedIndexDest > 0) {
			selectedIndexDest--;
			inputDest.value = ulDest.children[selectedIndexDest].textContent;
		}
	});
	nextBtnDest.addEventListener('click', () => {
		if (selectedIndexDest < ulDest.children.length - 1) {
			selectedIndexDest++;
			inputDest.value = ulDest.children[selectedIndexDest].textContent;
		}
	});
	inputDest.addEventListener('click', () => {
		ulDest.style.display = 'block';
	});
	ulDest.addEventListener('click', (event) => {
		if (event.target.tagName === 'LI') {
			selectedIndexDest = Array.prototype.indexOf.call(ulDest.children, event.target);
			inputDest.value = event.target.textContent;
			ulDest.style.display = 'none';
		}
	});
	document.addEventListener('click', (event) => {
		if (!selectDest.contains(event.target)) {
			ulDest.style.display = 'none';
		}
	});

	const selectPack = document.querySelector('.form-package');
	const inputPack = selectPack.querySelector('input');
	const ulPack = selectPack.querySelector('ul');
	const prevBtnPack = selectPack.querySelector('.select-prev');
	const nextBtnPack = selectPack.querySelector('.select-next');

	let selectedIndexPack = 0;
	prevBtnPack.addEventListener('click', () => {
		if (selectedIndexPack > 0) {
			selectedIndexPack--;
			inputPack.value = ulPack.children[selectedIndexPack].textContent;
		}
	});
	nextBtnPack.addEventListener('click', () => {
		if (selectedIndexPack < ulPack.children.length - 1) {
			selectedIndexPack++;
			inputPack.value = ulPack.children[selectedIndexPack].textContent;
		}
	});
	inputPack.addEventListener('click', () => {
		ulPack.style.display = 'block';
	});
	ulPack.addEventListener('click', (event) => {
		if (event.target.tagName === 'LI') {
			selectedIndexPack = Array.prototype.indexOf.call(ulPack.children, event.target);
			inputPack.value = event.target.textContent;
			ulPack.style.display = 'none';
		}
	});
	document.addEventListener('click', (event) => {
		if (!selectPack.contains(event.target)) {
			ulPack.style.display = 'none';
		}
	});
});