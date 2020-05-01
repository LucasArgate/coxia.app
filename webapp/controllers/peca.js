angular.module('app').controller('peca', function($scope,$timeout, $routeParams, $location, peca, recorder){
    $scope.peca = peca.get($routeParams.id)
	
	if (!$scope.peca){$location.path('/'); return;};
	
    $scope.recorder = recorder;

    $scope.cores = [
        '#F5F6E8', '#F8C09D', '#EA676C',   '#FFF79C', '#FED883', '#FEBE40', '#EC7523', '#E3482C', 
        '#DC1C4B', '#B31E48', '#EE8EB4', '#DD527C', '#DC166D', '#9B1D5A',  '#B557A1',
         '#5E79BC', '#87D1EE', '#2BB3CD', '#2276BC', '#1D5C87', '#7ECDCA', '#30B1AD','#1F8B95',
        '#C9DB53', '#8FC23F', '#D0AD9A', '#9A605C', '#D0E2EE', '#AABFD0', '#7D8E9E'
    ];

    $scope.ator = {
        nome: "",
        meu: false,
        cor: "",
        add: function(){
            var ator = {nome: $scope.ator.nome, meu: $scope.ator.meu, cor: $scope.ator.cor};
            
            $scope.peca.atores.push( ator);

            $scope.player.setAtor(ator);
        }
    }

    $scope.player = {
        ator: null,
        state: 'stopped', //stopped, rec, playing, trainning
        playIndex: -1,
        editIndex: -1,
        selectedIndex: -1,
        training: false,
        setAtor: function(ator)
        {
            this.ator = ator;
        },
        playAll: function(){
            
			if (this.state == 'stopped'){
				this.state = 'playing';
				
				var fala = $scope.peca.falas[0]
				
				if (this.training && fala.ator.meu){
					$scope.player.beep.play();
					fala.audio.volume = 0;
				
					$timeout(function(){
						$scope.player.playIndex = 0;
						fala.audio.play();
					}, 1000)
				}
				else{
					$scope.player.playIndex = 0;
					fala.audio.play();
				}
			}else{
				this.state = 'stopped';
				if (this.training)
					this.training = false;
			}
        },
        train: function(){
            this.training = true;
            this.playAll();
        },
        rec: function(){
            this.state = 'rec'
            $scope.recorder.start();
        },
        stop: function(){
            this.state = 'stopped';

            $scope.recorder.stop();
        },
        refresh: function(){
            $scope.recorder.cancel();

            $scope.recorder.start();
        },
        edit: function(fala, index){
            $scope.player.state = 'editing';
            $scope.player.setAtor(fala.ator);
            $scope.player.editIndex = index;
        },
        remove: function(){
            if ($scope.player.editIndex > -1)
            {
                $scope.peca.falas.splice($scope.player.editIndex, 1);
                
                $scope.player.ok();
            }
        },
        ok: function(){
            $scope.player.editIndex = -1;
            $scope.player.selectedIndex = -1;
            $scope.player.state = 'stopped';
        },
        done: function(blob){
            if (!blob) return;

            var audio = new Audio();
            audio.src = URL.createObjectURL(blob);
            audio.totalTime = blob.time;
            
            //caso não esteja editando
            if ($scope.player.editIndex == -1){
                var fala = {ator: $scope.player.ator, audio: audio};
                //caso não tenha um item seleciona
                if ($scope.player.selectedIndex == -1)
                    $scope.peca.falas.push(fala); //add no final
                else 
                    $scope.peca.falas.splice($scope.player.selectedIndex+1, 0, fala); //add depois do selecionado :)
            } else {
                $scope.peca.falas[$scope.player.editIndex].audio = audio;
                $scope.player.state = 'editing';
            }

            console.log($scope.peca.falas)

            $scope.$apply();
        },
        falaEnded: function(){
            var fala = $scope.peca.falas[$scope.player.playIndex];

            if (this.training && fala.ator.meu)
                fala.audio.volume = 1;

            $scope.player.playIndex++;

            if ($scope.player.state == 'playing' && $scope.player.playIndex < $scope.peca.falas.length)
            {
                var fala = $scope.peca.falas[$scope.player.playIndex]

                if (this.training && fala.ator.meu)
                    fala.audio.volume = 0;

                fala.audio.play();

            }else{
                console.log('all fala ended');

                if ($scope.player.editIndex == -1){
                    $scope.player.state = 'stopped';
                }else{
                    $scope.player.state = 'editing';
                }
                
                $scope.player.playIndex = -1;
                $scope.player.training = false;
            }
        },
        select: function(index){

            if ($scope.player.selectedIndex != index)
                $scope.player.selectedIndex = index;
            else
                $scope.player.selectedIndex = -1;

            

        },
        beep: {
            audio: null,
            load: function(){
                fetch("content/sound/beep.mp3")
                .then(function (res) {
                    if (!res.ok) throw Error(response.statusText);
                        return res.blob()
                }).then(function(blob) {
                    $scope.player.beep.audio = new Audio();
                    $scope.player.beep.audio.src = window.URL.createObjectURL(blob);
                });
            },
            play: function(){
                if ($scope.player.beep.audio)
                    $scope.player.beep.audio.play();
            }
        }
    }
    $scope.player.beep.load();
    $scope.player.setAtor($scope.peca.atores[0]);
    $scope.$on('player.ended', $scope.player.falaEnded);
    $scope.recorder.onCompleted = $scope.player.done;

    console.log('peca', $scope.peca);

    __player = $scope.player;
});