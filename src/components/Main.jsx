import React from 'react'
import Recepe from '../components/Recepe.jsx'
import IngredientsList from './IngredientsList';

import '../styles/Main.css'
export default function Main() {

    const [ingredients , setIngredients]  =React.useState([]);

    

   const [recipe ,setRecipe] = React.useState("");

  async function getRecipe() {
   try {
            const res = await fetch("http://localhost:3001/recipe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ingredients })
            });
            if (!res.ok) throw new Error(`Server responded ${res.status}`);
            const data = await res.json();
            setRecipe(data.recipe || "");
        } catch (err) {
            console.error("getRecipe error:", err);
            // show UI-friendly message if needed
        }
}

   
   function addIngredient(formData){
    const newIngredient = formData.get("ingredient")
    if(newIngredient != ''){
    setIngredients((prevIngredient)=>[...prevIngredient , newIngredient])
      console.log(newIngredient);
    }else{
        window.alert('please add an ingredient')
    }
   }



  return (
      <main> 
        <form  className='main' action={addIngredient}>
            <input name='ingredient' type="text" aria-label='ingredient' placeholder='e.g. onions' />
            <button className='btn' onClick={addIngredient} name='ingredient'>Add ingredient</button>
        </form>
        <IngredientsList
         ingredients={ingredients}
         getRecipe={getRecipe}
         />
        < Recepe  
        recipe={recipe}
        />

      
      </main>   
  )
}
