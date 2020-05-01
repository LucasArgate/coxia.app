angular.module('app').controller('main', function($scope){
    $scope.peca = null;
    $scope.nav = {show: false}
    
    $scope.test = function(){
        console.log($scope.peca);
    }

    $scope.$on('$routeChangeStart', function($event, next, current) { 
        console.log('next', next.$$route.controller);

        $scope.nav.show = false;
        if (next.$$route.controller == 'peca')
            $scope.nav.show = true;
      });

      console.log('peca', $scope.peca);

      $scope.v = v;
});