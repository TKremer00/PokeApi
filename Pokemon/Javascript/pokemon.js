const pokemonTypeColor = {
    normal   : '#A8A878',
    water    : '#6890F0',
    electric : '#F8D030',
    fighting : '#C03028',
    ground   : '#E0C068',
    psychic  : '#F85888',
    rock     : '#B8A038',
    dark     : '#705848',
    steel    : '#B8B8D0',
    fire     : '#F08030',
    grass    : '#78C850',
    ice      : '#98D8D8',
    poison   : '#A040A0',
    flying   : '#A890F0',
    bug      : '#A8B820',
    ghost    : '#705898',
    dragon   : '#7038F8',
    fairy    : '#F0B6BC'
};
let previousPokemons = [];
let pokemonId = 1;

//Wait for body load
(function () {

    $('.tegel').click(function(e){
        if($(this).attr('data-pokemonId') != undefined){
            pokemonId = parseInt($(this).attr('data-pokemonId'));
            $('#arrowPrev').attr("disabled", pokemonId == 1 );
            loadPokemon();
            $('#pokeDetails').css('display', 'block');
        }
    });

    $('#arrowPrev').click(function(e) {
        pokemonId = (pokemonId > 1 ? pokemonId - 1 : pokemonId);
        $('#arrowPrev').attr("disabled", pokemonId == 1 );
        loadPokemon();
    });

    $('#arrowNext').click(function(e) {
        pokemonId++;
        $('#arrowPrev').attr("disabled", false);
        loadPokemon();
    });

    $('#closeDetails').click(function(e) {
        $('#pokeDetails').css('display', 'none');
        $("title").html("PokéDex");
    });

    $('#pokeDetails').mouseenter(function(e) {
        $('#closeDetails').css('display', 'inline-block');
    });

    $('#pokeDetails').mouseleave(function(e) {
        $('#closeDetails').css('display', 'none');
    });

})();

// Load the pokemon, check if pokemon exists in array else make ajax call
function loadPokemon() {
    if("p" + pokemonId in previousPokemons) {
        handlePokemonDetailData(previousPokemons['p' + pokemonId]);
    }else {
        getPokemonDetails(pokemonId);
    }
}

//Load pokemon details.
function getPokemonDetails(name) {
    $.ajax({
        url: 'https://pokeapi.co/api/v2/pokemon/'+name+'/',
    })
    .done(handlePokemonDetailData)
    .fail(function(e) {
        alert("Kon deze pokemon niet laden");
        console.error("Error : \n" + e );
    });
}

//Handle pokemon data.
function handlePokemonDetailData(data) {
    let type = data.types[(data.types.length > 1 ? 1 : 0)].type.name;
    pokemonId = data.id;
    $("title").append("| #" + data.id + " " + data.name);
    $(".jId").html("#" + data.id);
    $(".jName").html("<strong>" + data.name +"</strong>")
    $(".jIcon").attr("src", (data.sprites.front_default != null ? data.sprites.front_default : IMAGE_DATA.baseUrl + data.id + IMAGE_DATA.extention));
    $(".jType").html(type).css('background-color', pokemonTypeColor[type.toLowerCase()]);

    let html = "";
    data.abilities.forEach(element => {
        html +="<p>"+ element.ability.name + "<br>" + (element.is_hidden ? "<small>(Hidden abbility)</small>" : "") +"</p>";
    });
    $(".jAbblitys").html(html);

    data.stats.forEach(element => {
        $("." + element.stat.name + " .jStat").html(element.base_stat);
    });

    if(!("p" + data.id in previousPokemons)) {
        previousPokemons["p" + data.id.toString()] = data;
    }
}
