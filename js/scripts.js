let pokemonRepository = (function() {
    let pokemonList= [
       
    ];

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('#modal-container')
    
    function add(pokemon) {
        if(typeof pokemon === 'object' && 
        'name' in pokemon && 
        'detailsUrl' in pokemon ) {
        pokemonList.push(pokemon);
        } else {
            console.log('pokemon is not correct');
        }
    };
    
    function getAll() {
        return pokemonList;
    };
    
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function() {
            showModal(pokemon.name, pokemon.height, pokemon.imageUrl)           
        });
    };
    
    //showModal function
    function showModal(pokename, pokeheight, pokeimage) {
        
        modalTitle = document.querySelector('#pokemonModalLabel');
        modalBody = document.querySelector('.modal-body');

        modalTitle.innerText = pokename;
        modalTitle.classList.add('text-capitalize')

        modalBody.innerHTML = '';

        let height = document.createElement('h3');
        height.innerText = 'Height: ' + pokeheight + ' cm';

        let pic = document.createElement('img');
        pic.src = pokeimage;
        pic.classList.add('img-fluid');

        //append

        modalBody.appendChild(height);
        modalBody.appendChild(pic);

        $('#pokemonModal').modal('show');
       
        
        window.addEventListener('keydown', (e) => {
            if(e.key === 'Escape' && modal.classList.contains('is-visible')) {
                modal.classList.remove('is-visible');
            };
        });

        modal.addEventListener('click', (e) => {
            let target = e.target;
            if(target === modal) {
                modal.classList.remove('is-visible')
            };
        });
    };

    function addListItem(pokemon) {
        let list = document.querySelector('#list');
        let listItem = document.createElement('div');
        let button = document.createElement('button');
     
        listItem.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'col-12', 'mb-4');

        let card = document.createElement('div');
        card.classList.add('card', 'mb-3', 'h-100', 'text-center');

        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        let cardTitle = document.createElement('h3');
        cardTitle.classList.add('card-text', 'text-center', 'text-capitalize')
        cardTitle.innerText = pokemon.name

        button.innerText = 'Learn More';
        button.classList.add('btn', 'btn-outline-dark', 'btn-block', 'btn-lg');

        let hr = document.createElement('hr');

        button.addEventListener('click', function(){
            showDetails(pokemon)
        });

        listItem.appendChild(card);
        list.appendChild(listItem);
        card.appendChild(cardBody);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(hr);
        cardBody.appendChild(button);
        
        
    };
    
    function loadList() {
        return fetch(apiUrl).then( function (response) {
            return response.json();
        }).then (function(json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add (pokemon);
                console.log(pokemon);
            });
            }).catch (function (e){
                console.error(e);
            })
    };

    function loadDetails (item) {
        let url = item.detailsUrl;
        return fetch(url).then(function(response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function(e) {
            console.error(e);
        });
    };

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal
    };
})();
    
    
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function(pokemon){

        pokemonRepository.addListItem(pokemon);
    });
});