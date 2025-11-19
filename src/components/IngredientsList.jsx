import React from 'react'
import '../styles/Main.css'
export default function IngredientsList(props) {

     const ingredientsList = props.ingredients.map((ingredient)=>
        <li key={ingredient}>{ingredient}</li>)
    
  return (
    <> 
       <h2>Ingredients on hand : </h2>
        <ul>
            {ingredientsList}
        </ul>
        { ingredientsList.length > 3  &&  <div div className="get-recipe-container">
          <div className="getrecipe">
            <h3>Ready for Recipe : </h3>
            <p>Generate a recepe from your list of ingreidents</p>
          </div>
          <button className='get-recepe-button' onClick={() => {
           console.log("Button clicked!");
           props.getRecipe();
  }}>Get a recepe</button> </div>}
    </>
  )
}
