import React, { useState } from 'react';
import Recepe from '../components/Recepe.jsx';
import IngredientsList from './IngredientsList';
import { getRecipeFromMistral } from "../ai";
import '../styles/Main.css';

export default function Main() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState("");

  async function getRecipe() {
    const recipeMarkdown = await getRecipeFromMistral(ingredients);
    setRecipe(recipeMarkdown);
  }

  function addIngredient(e) {
    e.preventDefault(); // prevent page reload
    const formData = new FormData(e.target);
    const newIngredient = formData.get("ingredient");
    if (newIngredient !== '') {
      setIngredients(prev => [...prev, newIngredient]);
      e.target.reset(); // clear input
    } else {
      window.alert('Please add an ingredient');
    }
  }

  return (
    <main>
      <form className='main' onSubmit={addIngredient}>
        <input
          name='ingredient'
          type="text"
          aria-label='ingredient'
          placeholder='e.g. onions'
        />
        <button className='btn' type="submit">Add ingredient</button>
      </form>

{  ingredients.length >0 && <IngredientsList ingredients={ingredients} getRecipe={getRecipe} />
}
      

     {recipe && <Recepe recipe={recipe} />}
    </main>
  );
}
