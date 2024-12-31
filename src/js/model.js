
import { API_URL } from './config.js'; 
import {getJASON} from './helpers.js';
export const state = {
    recipe: {},
    search:{},
    query: '',
    results: []
  };

  export const loadRecipe = async function (id) {
    try {
      const data = await getJASON(`${API_URL}${id}`);
  
      const recipe = data.data.recipe;
  
      state.recipe = {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        ingredients: recipe.ingredients,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
      };
  
      console.log(state.recipe);

    } catch (err) {
      console.error(`${err} 💥💥💥💥`);
      throw err;
    }
  };


  export const loadSearchResults = async function (query) {
    try{
        state.search.query = query;

        const data = await getJASON(`${API_URL}?search=${query}`);
        state.search.results = data.data.recipes.map(rec => {
            return{
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
            }
        })

        console.log(state.search.results);
    }
    catch (err) {
        console.error(`${err} 💥💥💥💥`);
        throw err;
    }
  }