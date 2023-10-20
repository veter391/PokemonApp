import './style.css'

// find elements in DOM
const _URL = 'https://pokeapi.co/api/v2/pokemon/',
      articleBox = document.querySelector('.article-box'),
      form = document.querySelector('.form'),
      next = document.querySelector('.btn-next'),
      prev = document.querySelector('.btn-prev'),
      input = form.querySelector('input');

let pokemonID = 0;

function createPokemon(data) {
  //* data => object with pokemon info

  // add info to list if not error
  let list = '';

  if(data.error) {
    articleBox.parentElement.classList.add('error')
  } else {
    articleBox.parentElement.classList.remove('error')
    
    list = `
        <ul class="list list-disc">
          <li class="item p-1">Altura: ${data.height || `¯\\_( ͡* - ͡*)_/¯ `}cm</li>
          <li class="item p-1">Peso: ${data.weight || `¯\\_( ͡* - ͡*)_/¯ `}</li>
          <li class="item p-1">Tipo: ${data.types[0].type.name || `¯\\_( ͡* - ͡*)_/¯ `}</li>
        </ul>`
  }

  // clear the articleBox and prepare it to new article
  articleBox.innerHTML = '';

  // create new article and add classes to it
  const article = document.createElement('article');
  article.classList.add('article','border','flex','p-8','items-center','flex-col');

  // add info about pokemon inside article
  article.innerHTML = `
    <img class="pokemon-img mb-7 max-h-96" src="${data.sprites.front_default}" alt="pokemon ${data.name}">
    <h2 class="mb-7 subtitle">
    ${data.name[0].toUpperCase() + data.name.slice(1) /* pikachu => Pikachu */ } 
    ${data.id ? `N${data.id}` : '' /* N25 or '' */}
    </h2>
    ${list}
  `;

  // log pokemon id
  // console.log(pokemonID);

  // return generated element
  return article;
}

async function getData(url) {
  // create request
  await fetch(url)
    .then(response => {

      // check for errors
      if (!response.ok) {
        throw new Error('Error server not found')
      }

      return response.json()
    })
    .then(data => {

      // define pokemon id //! important you can't to change data.id or use promice data outside it!!
      pokemonID = data.id;

      articleBox.append(createPokemon(data))
    })
    .catch(error => {
      //! log errors
      console.log(error.message)

      //! if error, create new object and add it to fonction createPokemon()
      const errorData = {
        name: 'ERROR',   //? custom error text
        sprites: { front_default: `https://http.cat/images/${error.statusCode}.jpg` },  //? custom error img
        error: true
      };

      // call createPokemon function with changed data
      articleBox.append(createPokemon(errorData));
    })
}

// check form to submit
form.addEventListener('submit', e => {

  // remove default form action on submit
  e.preventDefault();

  // check and clear input value
  const pokemon = input.value.trim().toLowerCase();

  // check input to spaces, tabs etc..
  if(pokemon) {
    // new request
    // getData(`${_URL}pokemon/${pokemon}`);
    getData(_URL + pokemon, pokemonID);

  } else {
    //? change input if unexists value
    input.placeholder = 'Please take pokemo!!!'
  }
});

// btns click
next.onclick = () => getData(_URL + Number(pokemonID + 1));
prev.onclick = () => getData(_URL + Number(pokemonID - 1));
