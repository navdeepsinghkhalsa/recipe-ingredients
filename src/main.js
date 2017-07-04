import Promise from 'promise-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Thumbnails from './thumbnails';
import Ingredients from './ingredients';

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }
  return Promise.reject(new Error(response.statusText));
}

class Recipes extends React.Component {
  constructor() {
    super();
    this.state = {
      recipes: [],
      selectedRecipes: [],
    };
  }

  componentDidMount() {
    // fetch the recipes and add them to the component state
    fetch('/recipes.json')
      .then(status)
      .then(response => (response.json()))
      .then((data) => {
        this.setState({ recipes: data });
      });
  }

  handleThumbClick(e, i) {
    // Find out if modifier key was pressed to allow multiple selection
    const mod = /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? 'meta' : 'ctrl';
    const multiple = e[`${mod}Key`];
    let selectedRecipes = this.state.selectedRecipes;

    if (multiple) {
      const index = selectedRecipes.indexOf(i);
      if (index === -1) {
        selectedRecipes.push(i);
      } else {
        selectedRecipes.splice(index, 1);
      }
    } else {
      selectedRecipes = [i];
    }
    this.setState({
      selectedRecipes,
    });
  }

  render() {
    return (
      <div>
        <Thumbnails
          recipes={this.state.recipes}
          selectedRecipes={this.state.selectedRecipes}
          onClick={(e, i) => this.handleThumbClick(e, i)}
        />

        <Ingredients
          recipes={this.state.recipes}
          selectedRecipes={this.state.selectedRecipes}
        />
      </div>
    );
  }
}
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Recipes />,
    document.getElementById('root'),
  );
});
