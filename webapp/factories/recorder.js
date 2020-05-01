angular.module('app').factory('recorder', function($interval){
    let mediaRecorder;
    var micPermission = localStorage.getItem("mic") || false;
    var timer = null;

    var scope = {};

    scope.recording = false;
    scope.cancelled = false;
    scope.time = 0;
    scope.timeFormatted = '00:00'
    
    var mediaConstraints = {
        audio: true
    };
    
    scope.start = function () {
        recordedChunks = []
        scope.recording = true;
        getUserMedia();
        
        scope.time = -1;
        tick();
    }

    scope.cancel = function () {
        scope.cancelled = true;
        stop();
    }

    scope.stop = function () {
        stop();
    }

    var stop = function () {
        scope.recording = false;
        mediaRecorder.stop();
        
        mediaRecorder.stream.stop();
        $interval.cancel(timer);
    }

    var tick = function () {
        scope.time++;

        scope.timeFormatted = moment().startOf('day').seconds(scope.time).format('mm:ss');
    }
    var stream;
    var audioFile;
    var recordedChunks = [];

    function onMediaSuccess(_stream) {
        stream = _stream;
        
        mediaRecorder = new MediaRecorder(_stream);
        mediaRecorder.mimeType = 'audio/webm'; // audio/webm or audio/ogg or audio/wav
        mediaRecorder.stream = _stream;
        mediaRecorder.ondataavailable = function (audioBlob) {
            if (audioBlob.data.size > 0) {
                console.log('has size')
                recordedChunks.push(event.data);
            }
        };

        mediaRecorder.onstop = function (e) {
            if (scope.cancelled)
            {
                recordedChunks = [];
            }

            var file = new Blob(recordedChunks, { type: "audio/webm" });
            file.name = "audio.webm";
            file.time = scope.time;

            scope.onCompleted(scope.cancelled ? null : file);

            scope.cancelled = false;
        }
        
        mediaRecorder.start();
        timer = $interval(tick, 1000);
    }

    function onMediaError(e) {
        console.error('media error', e);
    }

    var getUserMedia = function (success) {
        navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError);
    } 

    function playMedia(blob){
        const ctx = new AudioContext();
        const fileReader = new FileReader();
        fileReader.onload = e =>  ctx.decodeAudioData(fileReader.result)
        .then(buf => {
            const source = ctx.createBufferSource();
            source.buffer = buf;
            source.connect(ctx.destination);
            source.start(0);
        });
        fileReader.readAsArrayBuffer(blob);
      }

    return scope;
})