angular.module('app').factory('peca', function(){
    var pecas = 
        [{
            id: 1,
            nome: 'Antigona',
            atores: [{nome: 'Hémon', meu: true, cor: '#87D1EE'}, {nome: 'Creonte', meu: false, cor: '#DC1C4B'}],
            falas: []//[{ator: {nome: 'Hémon', meu: true, cor: '#87D1EE'}, audio: {}}, {ator: {nome: 'Creonte', meu: false, cor: '#DC1C4B'}, audio: {}}, {ator: {nome: 'Hémon', meu: true, cor: '#87D1EE'}, audio: {}}, {ator: {nome: 'Creonte', meu: false, cor: '#DC1C4B'}, audio: {}}]
        },
        {id: 2, nome: 'Geração Trianon', atores: [], falas:[]}];
    var pecaFactory = {
        get: function(id){
            if (id) {
                var _peca = null;

                pecas.forEach(function(peca){
                    if (peca.id.toString() === id)
                    {
                        _peca = peca;
                        return;
                    }
                })
                return _peca
            }
            else
            return pecas;
        },
        add: function(peca){
			
			if (!peca.id) peca.id = (pecas[pecas.length-1].id) +1;
			if (!peca.falas) peca.falas = [];
			if (!peca.atores) peca.atores = [];
			
            pecas.push(peca);
        }
    }

    return pecaFactory; 
})