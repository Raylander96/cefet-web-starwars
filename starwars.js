// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.co/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução
/*
$.ajax({
    url: 'https://swapi-simple.herokuapp.com/films',
    method: 'GET',      // opcional: 'GET' é o valor padrão
    success: function (resposta) {
        console.log(resposta);
    }
});
*/
let audio = new Audio('starWarsTheme.mp3');
audio.play();

const numerosRomanos = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
const URL = "https://swapi.co/api/films/";
function adicionaLista(title, id){
  idRomanos = numerosRomanos[id - 1];
  let $li = $('<li></li>');
  $li.data('episode-url', URL + id);
  $li.html("Episode " + idRomanos + ": " + title);
  $li.appendTo("#movies ul");
  $li.click(function(){
    $.ajax({
      url: $li.data('episode-url'),
      dataType: 'json',
      success: function(resposta){
        $(".reading-animation").html(
          "Episode " + numerosRomanos[id - 1] + "\n" + title.toUpperCase() + "\n\n" +
          resposta.opening_crawl
        );
      }
    })
  })
}

$.ajax({
    url: 'https://swapi.co/api/films/',
    dataType: 'json',
    success: function(resposta) {
      console.log(resposta);
      for (movie of resposta.results.sort(
        function (a, b){
          return a.episode_id > b.episode_id;
        }
      )){
        console.log(movie.title);
        console.log(movie.episode_id);
        adicionaLista(movie.title, movie.episode_id);
      }
    }
  });