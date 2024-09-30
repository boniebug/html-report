'use strict'
const search = async function () {
  const input = document.querySelector('#userInput');
  const loader = document.querySelector('.loader');
  if (loader !== null) {
    input.value = '';
    createLoader('still loding', true);
    return;
  }
  const userData = input.value.toLowerCase();
  const allPokes = document.querySelectorAll('.allPokemon section');
  for (let index = 0; index < allPokes.length; index++) {
    const pokeData = allPokes[index].innerText.toLowerCase();
    allPokes[index].style.display = (pokeData.includes(userData)) ? 'block' : 'none';
  }
};
