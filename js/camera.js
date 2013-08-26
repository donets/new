function camera(video, videoStreamUrl, videoResolution) {

    // для кроссбраузерности
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    window.URL.createObjectURL = window.URL.createObjectURL || window.URL.webkitCreateObjectURL || window.URL.mozCreateObjectURL || window.URL.msCreateObjectURL;

    // запрашиваем разрешение на доступ к поточному видео камеры
    navigator.getUserMedia (
        {
            video: { "mandatory": videoResolution }
        },
        function (stream) {
        // получаем url поточного видео
        videoStreamUrl = window.URL.createObjectURL(stream);
        // устанавливаем как источник для video
        video.src = videoStreamUrl;
    }, function () {
        console.log('error stream or not access');
    });

}

function captureMe (canvas, context, video, videoStreamUrl ,backgroundImage) {

    if (!videoStreamUrl) alert('error stream or not access')
    // переворачиваем canvas зеркально
    context.translate(canvas.width, 0);
    context.scale(-1, 1);
    // отрисовываем на канвасе текущий кадр видео
    context.drawImage(video, 0, 0, video.width, video.height);
    // получаем data:url изображения c canvas
    var base64dataUrl = canvas.toDataURL('image/jpeg', 0.8);
    // убираем все кастомные трансформации canvas
    context.setTransform(1, 0, 0, 1, 0, 0);

    postImage = {
        "photo": base64dataUrl,
        "backgroundName": backgroundImage
    }

    console.log(postImage);

}

var api = "http://localhost/nod32/";
var postImage;
var getImage;

function getImageData(showError, showPhoto, preloadTime) {

    getImage = "img/photo.png";

    $.ajax({
        url: api + 'processPhoto',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: postImage,
        success: function (response) {
            getImage = response.processedPhoto;
            console.log(response);
            //setTimeout(showPhoto, preloadTime);
        },
        error: function (response) {
            console.log(response);
            console.log(postImage);
            //setTimeout(showError, preloadTime);
        }
    });

    setTimeout(showPhoto, preloadTime);

}




