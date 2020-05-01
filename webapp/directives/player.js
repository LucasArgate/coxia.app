angular.module('app').directive('player', function($parse){
    var getTime = function(seconds){
        return moment({ hours: 0, minutes: 0, seconds: 0 }).add(seconds, "seconds").format("mm:ss");
    }

    return{
        restrict: 'E',
        scope: {
            audio: '=',
            ended: '&'
        },
        template:
        '<div class="row player no-margin">' +
            '<div class="col-6 no-margin">' +
                '<button type="button" class="btn btn-link" ng-click="hit();$event.stopPropagation();"><i class="material-icons" ng-show="true  ">{{state == "stopped" ? "play_circle_outline" : "pause_circle_outline"}}</i></button>' +
            '</div>' +
            '<div class="col-6 no-margin">' +
                '<p class="currentTime">{{currentTime}}</p>' +
            '</div>'+
        '</div>'
            
        ,link: function(scope, parans, attrs) {
                
                scope.state = 'stopped';
                scope.currentTime = "00:00";
                scope.hit = function(){

                    if (scope.state == 'stopped'){
                        scope.state = 'played';
                        scope.audio.play()
                    }else{
                        scope.state = 'stopped';
                        scope.audio.pause()
                    }
                }
                
                scope.$watch("audio",function(newValue,oldValue) {
                    scope.audio.ontimeupdate = function(event) {
                        var timeSecs = event.srcElement.currentTime;
                        var durationSecs = event.srcElement.duration;
                
                        var time = getTime(timeSecs);
                        var percentage = (100 * timeSecs / durationSecs).toFixed(2);
                        var status = { percentage: percentage, time: time };
    
                        scope.currentTime = time;
    
                        scope.$apply();
                    }
                    scope.audio.addEventListener('loadedmetadata',function(){
                        
                        scope.currentTime = getTime(scope.audio.totalTime);
    
                        scope.$apply();
                    },false);
           
                    scope.audio.addEventListener('ended', function(){
                        console.log('current audio stoped')
                        scope.state = 'stopped';
                        scope.ended();
                        scope.$apply();
                    }, false);    
                });

                
        }
    }
})