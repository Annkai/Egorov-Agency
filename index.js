"use strict";

const timeCardImg = document.querySelectorAll('.time-card__img');
const timeCardDays = document.querySelector('.time-card__days');
const timeCardHours = document.querySelector('.time-card__hours');
const timeCardMinutes = document.querySelector('.time-card__minutes');
const timeCardSeconds = document.querySelector('.time-card__seconds');
const vectorLeft = document.querySelector('.vector-left');
const vectorRight = document.querySelector('.vector-right');


//Media
changeTimeNames();
changeVectors();

function changeVectors() {
    if (window.innerWidth < 1200 && window.innerWidth > 701) {
        vectorLeft.src = './assets/images/png/Vector-1-768.png';
        vectorRight.src = './assets/images/png/Vector-2-768.png';
    } else if (window.innerWidth <= 700) {
        vectorLeft.src = './assets/images/png/Vector-1-360.png';
        vectorRight.src = './assets/images/png/Vector-2-360.png';
    } else {
        vectorLeft.src = './assets/images/png/Vector-1.png';
        vectorRight.src = './assets/images/png/Vector-2.png';  
    }
}

function changeTimeNames() {
    if (window.innerWidth < 769) {
        timeCardDays.innerHTML = 'DD';
        timeCardHours.innerHTML = 'HH';
        timeCardMinutes.innerHTML = 'MM';
        timeCardSeconds.innerHTML = 'SS';
        timeCardImg.forEach(el => el.src = './assets/images/svg/time768.svg');
    } else {
        timeCardDays.innerHTML = 'Days';
        timeCardHours.innerHTML = 'Hours';
        timeCardMinutes.innerHTML = 'Minutes';
        timeCardSeconds.innerHTML = 'Seconds';
        timeCardImg.forEach(el => el.src = './assets/images/svg/time.svg');
    }
}

function checkMediaQuery() {
    changeTimeNames();
    changeVectors();
}

window.addEventListener('resize', checkMediaQuery);


// Timer
const deadlineData = '2023-05-31';
const figureDays = document.querySelector('.time-card__figure-days');
const figureHours = document.querySelector('.time-card__figure-hours');
const figureMinutes = document.querySelector('.time-card__figure-minutes');
const figureSeconds = document.querySelector('.time-card__figure-seconds');

function getTimeRemaining(endtime){  
    var t = Date.parse(endtime) - Date.parse(new Date());  
    var seconds = Math.floor( (t/1000) % 60 );  
    var minutes = Math.floor( (t/1000/60) % 60 );  
    var hours = Math.floor( (t/(1000*60*60)) % 24 );  
    var days = Math.floor( t/(1000*60*60*24) );  
    return {  
     'total': t,  
     'days': days,  
     'hours': hours,  
     'minutes': minutes,  
     'seconds': seconds  
    };  
  }

  function initializeClock(id, endtime){  
    function updateClock(){  
     var t = getTimeRemaining(endtime);  
     figureDays.innerHTML = ('0' + t.days).slice(-2);
     figureHours.innerHTML = ('0' + t.hours).slice(-2);
     figureMinutes.innerHTML = ('0' + t.minutes).slice(-2);
     figureSeconds.innerHTML =  ('0' + t.seconds).slice(-2);
   
     if(t.total<=0){  
      clearInterval(timeinterval);  
     } 
  }
  updateClock();
  var timeinterval = setInterval(updateClock,1000);
  }

  initializeClock('clockdiv', deadlineData);


//Popup
const backgroundModal = document.querySelector('.background-modal');
const close = document.querySelector('.close');
const backgroundModalBtn = document.querySelector('.background-modal__btn');
const footerBtn = document.querySelector('.footer__button');
const footerInput = document.querySelector('.footer__input');
const body = document.querySelector('.body');

function openPopup() {
    body.style.overflowY = 'hidden';
    backgroundModal.style.display = 'flex';
    backgroundModal.classList.add('b-show');
}

function closePopup(event) {
    if (event.target.classList.contains('background-modal') || event.target.classList.contains('close') || event.target.classList.contains('background-modal__btn')) {
        body.style.overflowY = 'visible';
        backgroundModal.style.display = 'none';
    }
}

backgroundModal.addEventListener('click', closePopup);
 

//Submitting form data
$( document ).ready(function() {
    $("#btn").click(
		function(){
            if (footerInput.validity.valid) {
                footerInput.classList.remove('footer__input--invalid');
                footerInput.classList.add('footer__input--valid');
                sendAjaxForm('result_subtitle', 'result_title', 'ajax_form', 'action_ajax_form.php');
                openPopup();
            } else if (!footerInput.validity.valid) {
                footerInput.classList.remove('footer__input--valid');
                footerInput.classList.add('footer__input--invalid');
            } else {
                footerInput.classList.remove('footer__input--valid');
                footerInput.classList.remove('footer__input--invalid');
            }
			return false; 
		}
	);
});
 
function sendAjaxForm(result_subtitle, result_title, ajax_form, url) {
    $.ajax({
        url:     url,
        type:     "POST",
        dataType: "html",
        data: $("#"+ajax_form).serialize(),
        success: function(response) { 
        	result = $.parseJSON(response);
            $('#result_title').html('success!');
        	$('#result_subtitle').html('You have successfully subscribed to the email newsletter');
    	},
    	error: function(response) {
            $('#result_title').html('error!');
            $('#result_subtitle').html('Data not sent');
    	}
 	});
}
