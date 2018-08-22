import React, { Component } from 'react';
import RandomSprout from '../components/RandomSprout';
import SproutsIndex from '../components/SproutsIndex';

class SproutsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: "",
      recipes: [],
      longest: ''
    }
    this.getAllRecipes = this.getAllRecipes.bind(this)
    this.getRandomRecipe = this.getRandomRecipe.bind(this)
    this.getLongestRecipe = this.getLongestRecipe.bind(this)
  }

  getRandomRecipe(){
    fetch('http://localhost:4567/api/v1/random-recipe')
    .then(response => {
        if (response.ok) {
          console.log('response ok')
          return response.json()
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage)
          throw(error)
        }
      })
      .then( body => {
        this.setState({recipes:[], recipe: body, longest: ""})
      })
      .catch(error => console.error(`error message ${error.message}`))
  }


  getAllRecipes(){
    // YOUR FETCH CALL HERE
    fetch('http://localhost:4567/api/v1/recipes')
    .then(response => {
        if (response.ok) {
          console.log('response ok')
          return response.json()
        }else {
          let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage)
          throw(error)
        }
      })
      .then( body => {
        this.setState({recipe:"", recipes: body, longest: ""})
      })
      .catch(error => console.error(`error message ${error.message}`))
  }

  getLongestRecipe() {
    fetch('http://localhost:4567/api/v1/longest-recipes')
    .then(response => {
  	  if (response.ok) {
  	  console.log('response ok')
  	  return response.json()
  	   }else {
  	   let error = new Error('Error in fetch: "/api/v1/recipes"')
  	   throw(error)
  	     }
  	     })
  	    .then( body => {
	     this.setState({recipe:"", recipes: body, longest: ""})
  	     })
  	  .catch(error => console.error())
  	  }


  render(){

    let handleRandomClick = () => {
      this.getRandomRecipe();
    }

    let handleIndexClick = () => {
      this.getAllRecipes();
    }

    let handleLongestClick = () => {
      this.getLongestRecipe();
    }

    return(
      <div className="container">
        <h1>Sprout Fetcher</h1>
        <RandomSprout
          recipe={this.state.recipe}
          handleClick = {handleRandomClick}
        />
        <SproutsIndex
          recipes={this.state.recipes}
          handleClick = {handleIndexClick}
        />

        <div className="buttons">
          <button onClick={handleRandomClick} className="btn">Get Random Recipe</button>

          <button onClick={handleIndexClick} className="btn">See All Recipes</button>

          <button onClick={handleLongestClick} className="btn">See Longest Dish Recipe</button>
        </div>
      </div>
    )
  }
}

export default SproutsContainer;
