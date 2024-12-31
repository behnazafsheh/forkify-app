import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
// import searchView from './searchView.js';

import 'regenerator-runtime/runtime';
import 'core-js/stable';
// console.log(icons);
// const recipeContainer = document.querySelector('.recipe');



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
if(module.hot){
  module.hot.accept();
}

const controlRecipes = async function (){

  try{

    const id = window.location.hash.slice(1);
    if(!id) return;
    recipeView.loadSpinner();

    await model.loadRecipe(id);
    const {recipe} = model.state;
   
   recipeView.render(model.state.recipe);

    

  } catch (err) {
    recipeView.renderError(`${err} 💥💥💥💥`);
    
}

}
// ['hashchange' , 'load'].forEach(ev => window.addEventListener(ev, controlRecipes));
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);

const controlSearchResults = async function(){
  try{
    resultsView.loadSpinner();
    const query = searchView.getQuery();
    if(!query) return;

    await model.loadSearchResults(query);

    resultsView.render(model.state.search.results);

  }
  catch(err){

    console.log(err);

  }
}

controlSearchResults();
const init = function () {
recipeView.addHandlerRender(controlRecipes);
searchView.addHandlerSearch(controlSearchResults);
}

init();