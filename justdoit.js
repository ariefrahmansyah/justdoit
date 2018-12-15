'use strict';

var BANNER_APPEAR_DELAY = 1000 * 0.5;
var BANNER_REMOVE_AFTER_SEC = 1000 * 8;
var BANNER_APPEAR_PROBABILITY = 0.05;
var BANNER_LOCAL_STORAGE_KEY = 'hasClickedOnBanner';
var LIKEONFB_LOCAL_STORAGE_KEY = 'hasClickedOnBannerLikeOnFB';

function removeVideo() {
  var $videoEl = $('.shia-do-it');
  if ($videoEl !== null) {
    $videoEl.remove();
  }
}

function reset() {
  removeVideo();
}

function addVideo() {
  reset();

  var $videoDiv = $.parseHTML('<div class="shia-do-it"><div class="container"><video width="1920" height="1080" name="media"></div></div>');
  $('body').append($videoDiv);

  var video = $($videoDiv).find('video').get(0);
  var videoNum = Math.floor(Math.random() * (6 - 1)) + 1;
  var filename = 'videos/' + videoNum + '.webm';
  video.src = chrome.extension.getURL(filename);

  video.onended = function () {
    addVideo();
  };

  video.addEventListener('loadeddata', function () {
    $(video).css('visibility', 'visible');
    video.play();
  }, false);


  video.onerror = function () {
    alert('ooops... Shia had a problem. try on another tab');
    removeVideo(false);
  };

  video.load();
}

var BLOCKED_WEBSITES = ["facebook", "instagram", "twitter", "reddit", "9gag"];
var BLOCKED_WEBSITES_LENGTH = BLOCKED_WEBSITES.length;

var url = window.location.toString();

var urlBlocked = false;

for (var i = 0; i < BLOCKED_WEBSITES_LENGTH; i++) {
  console.log(url, BLOCKED_WEBSITES[i]);
  if (url.includes(BLOCKED_WEBSITES[i])) {
    urlBlocked = true;
    break
  }
}

if (urlBlocked) {
  addVideo();
}
