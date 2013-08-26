$(function(){

    var startState = false;
    var selectedPhotoholder;
    var canvas = document.getElementById('canvas');
    var video = document.getElementById('video');
    var context = canvas.getContext('2d');
    var videoStreamUrl = false;
    var photoTimer;
    var count = 3;

    var carousel = new Carousel(function(holder) {
        selectedPhotoholder = holder;
    });

    init();

    //start();

    //makePhoto();

    function init() {
        hideModules();
        $(".start, .gallery-bg, .controls").show();
        carousel.init();
    }

    function start() {
        hideModules();
        $(".ok, .gallery-bg, .controls").show();
        startState = true;
        resetTimer();
    }

    function makePhoto() {
        hideModules();
        $(".ready, .camera, .controls").show();
        camera(video, videoStreamUrl, Settings.videoResolution);
        hideTooltip();
        resetTimer();
    }

    function snapshot() {
        count = 3;
        $(".timer p b").html(count);
        $(".timer").show();
        $(".ready").hide();
        photoTimer = setTimeout(tick , 1000);
        hideTooltip();
        resetTimer();
    }

    function tick() {
        count--;
        $(".timer p b").html(count);
        resetTimer();
        if (count == 0) {
            captureMe(canvas, context, video, video.src, selectedPhotoholder);
            preload();
            clearTimeout(photoTimer);
            hideTooltip();
        } else {
            photoTimer = setTimeout(tick, 1000);
        }
    }

    function preload() {
        hideModules();
        $(".preload").show();
        getImageData(showError, showPhoto, Settings.preloadTime);
    }

    function showPhoto() {
        hideModules();
        $(".photo, .controls, .rephoto, .share").show();
        var img = document.createElement("img");
        img.src = getImage;
        $(".photo").html(img);
        hideTooltip();
        resetTimer();
    }

    function showError() {
        hideModules();
        $(".camera, .controls, .error").show();
        hideTooltip();
        resetTimer();
    }

    //timer

    var activityTimer = setTimeout(exit, Settings.timeInactive);

    if(startState) {
        var tooltipTimer = setTimeout(showTooltip, Settings.timeTooltip);
    }

    function resetTimer() {
        clearTimeout(activityTimer);
        clearTimeout(tooltipTimer);
        activityTimer = setTimeout(exit, Settings.timeInactive);
        if(startState) {
            tooltipTimer = setTimeout(showTooltip, Settings.timeTooltip);
        }
        hideTooltip();
    }

    //exit

    function exit() {
        hideTooltip();
        //alert("exit");
    }

    function showTooltip() {
        $(".tooltip").hide();
        $(".tooltip").fadeIn(500);
    }

    function hideTooltip() {
        $(".tooltip").fadeOut(500);
    }

    function hideModules() {
        $(".ok, .ready, .start, .error, .controls, .timer, .share, .social-wrapper, .rephoto, .preload, .photo, .camera, .gallery-bg").hide();
    }

    //events

    $('.start .button').on("click touchstart",function() {
        start();
    });

    $('.error .button').on("click touchstart",function() {
        makePhoto();
    });

    $(".ok .button").on("click touchstart", function() {
        makePhoto();
    });

    $(".ready .button").on("click touchstart", function() {
        snapshot();
    });

    $(".share").on("click touchstart", function(){
        $(".social-wrapper").show();
        $(".share").hide();
    });

    $(".rephoto").on("click touchstart", function() {
        makePhoto();
    });

    $(".tips").on("click touchstart", function() {
        showTooltip();
    });

    $(".close").on("click touchstart", function() {
        exit();
    });

    $(document).bind('mousemove touchmove touchstart keydown', function () {
        resetTimer();
    });

    $('.button').on('click touchstart',function(e){
        e.preventDefault();
        resetTimer();
    });

    $(".arrow").on('click touchstart',function(){
        resetTimer();
    });

});