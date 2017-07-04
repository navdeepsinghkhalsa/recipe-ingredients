import React from 'react';

function Thumb(props) {
  return (
    <a className={`thumb ${props.selectedRecipes.indexOf(props.recipeKey) > -1 ? 'selected' : ''}`} onClick={props.onClick}>
      <div className="recipe-name">{props.recipe.name}</div>
      <div className="recipe-type">{props.recipe.type}</div>
    </a>
  );
}

class Thumbnails extends React.Component {
  renderThumb(key, recipe) {
    return (
      <Thumb
        key={key}
        recipeKey={key}
        recipe={recipe}
        onClick={(e) => { this.props.onClick(e, key); }}
        selectedRecipes={this.props.selectedRecipes} />
    );
  }

  render() {
    const thumbs = [];
    for (let i = 0, recipesCount = this.props.recipes.length; i < recipesCount; i += 1) {
      thumbs.push(this.renderThumb(i, this.props.recipes[i]));
    }

    return (
      <div id="thumbnails">
        <h2>Recipes</h2>
        {thumbs}
      </div>
    );
  }
}

export default Thumbnails;
