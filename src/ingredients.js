import React from 'react';

function Ingredient(props) {
  return <li>{props.name}</li>;
}

class Ingredients extends React.Component {
  render() {
    const dishes = [];
    const ingredients = [];
    this.props.selectedRecipes.forEach((recipeIndex) => {
      dishes.push(this.props.recipes[recipeIndex].name);
      this.props.recipes[recipeIndex].ingredients.forEach((ingredient) => {
        if (ingredients.indexOf(ingredient) === -1) {
          ingredients.push(ingredient);
        }
      });
    });

    ingredients.sort();

    const ingredientList = [];
    ingredients.forEach((ingredient) => {
      ingredientList.push(<Ingredient key={ingredient.toLowerCase().replace(/ /g, '-')} name={ingredient} />);
    });

    return (
      <div id="ingredients">
        <h2>Ingredients</h2>
        <h3>{dishes.length < 2 ? 'Dish' : 'Dishes'}: {dishes.join(', ')}</h3>
        <ul className="ingredient-list">
          {ingredientList}
        </ul>
      </div>
    );
  }
}

export default Ingredients;
