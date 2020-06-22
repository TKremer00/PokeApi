const IMAGE_DATA = {'baseUrl' : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/', 'extention' : '.png'};
let previousData = [];
let current = 0;
let nextUrl = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20";

//Wait for body load
(function () {

   getPokemons();

    $('.next').click(function(e) {
        current = (current < 56 ? current + 1 : current);
        $('.previous').attr("disabled", false);
        (current > (previousData.length - 1) ? getPokemons() : handlePokemonData(previousData[current]));
        $('#pokeDetails').css('display', 'none');
    });

    $('.previous').click( function(e) {
        current = (current > 0 ? current - 1 : current);
        $('.previous').attr("disabled", current <= 0)
        handlePokemonData(previousData[current]);
        $('#pokeDetails').css('display', 'none');
    });
})();

//Get pokémons.
function getPokemons() {
    $.ajax({ url: nextUrl}).done(handlePokemonData).fail(function() {
        alert('Failed to load pokémons');
        console.error("Error : \n" + e );
    });
}

//Handle response ajax request getAllPokemons
function handlePokemonData(data) {
    for (let i = 0; i < 20; i++) {
        id = data.results[i].url.split("/");
        id = id[id.length - 2];
        $('.tegel[data-id='+ i +']').attr('data-pokemonId', id);
        $('.tegel[data-id='+ i +'] img').attr('src',IMAGE_DATA.baseUrl + id + IMAGE_DATA.extention)
        $('.tegel[data-id='+ i +'] p').html("#" + id +" " + data.results[i].name);
        $('.tegel[data-id='+ i +'] a').attr('href','pokemon.html?poke_id='+ id);
    }
    nextUrl = data.next;
    //Save data for later.
    if(current > (previousData.length - 1)) {
        previousData = [...previousData, data];
    }
}
