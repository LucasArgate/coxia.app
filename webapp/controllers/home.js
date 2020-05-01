angular.module('app').controller('home', function($scope, peca){
    $scope.peca = {nome: ""};
    $scope.pecas = peca.get()
    ;
    $scope.add = function(){
        peca.add($scope.peca);

        $scope.pecas = peca.get();

        $scope.clean();
    }

    $scope.clean = function(){
        $scope.peca = {nome: ""};
    }
})