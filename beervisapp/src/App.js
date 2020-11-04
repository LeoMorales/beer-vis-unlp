import React, { useState } from "react";
import "./App.css";
import ParallelCoordinatesChart from "./components/parallelcoordinates/ParallelCoordinatesChart";
import BeerMap from "./components/beermap/BeerMap";
import StylesSelect from "./components/stylesselect/StylesSelect";
import recipes from "./data/recipes";
import styles from "./data/styles";
import bars from "./data/bars";

function App() {
  const [beerRecipes, setBeerRecipes] = useState(recipes);
  const [beerStyles, setBeerStyles] = useState(styles);
  const [breweries, setBreweries] = useState(bars);

  const doStylesChange = (currentStyles) => {
    let selectedBars = [];
    let currentBars = [];
    currentStyles.forEach(function(style) {
      if(style.Checked) {
        selectedBars = Array.from(new Set([...selectedBars, ...style.Bars]));
      }
    });
    selectedBars.forEach(function(barId){
      currentBars.push(bars.find(function(bar) {
        return bar.id == barId;
      }));
    });
    setBreweries(currentBars);
    console.log("The styles changed");
  };
  
  const onStylesChange = () => {
    doStylesChange(beerStyles);
  };

  const onBarSelected = (barId) => {
    let currentStyles = [...styles];
    currentStyles.forEach(function(style) {
      style.Checked = style.Bars.includes(barId);
    })
    setBeerStyles(currentStyles);
    console.log("Bar selected! ", barId);
  };

  const onRecipesChange = (selectedRecipes) => {
    let currentStyles = [...styles];
    currentStyles.forEach(function(style) {
      style.Checked = false;
    })
    selectedRecipes.forEach(function(recipes) {
      let style = currentStyles.find(function(currentStyle) {
        return currentStyle.StyleID == recipes.StyleID;
      });
      style.Checked = true;
    });
    setBeerStyles(currentStyles);
    doStylesChange(currentStyles);
  };

  return (
    
    <div className='container'>
      <div className='header'>
        <h1>Inversión inteligente en la industria de la cerveza artesanal</h1>
      </div>
      <div className='pcc'>
        <ParallelCoordinatesChart recipes={beerRecipes} onRecipesChange={onRecipesChange}/>
      </div>
      <div className='map'>
        <BeerMap breweries={breweries} onBarSelected={onBarSelected}/>
      </div>
      <div className='selector'>
        <StylesSelect styles={beerStyles} onStylesChange={onStylesChange}/>
      </div>
      <div className='footer'></div>
    </div>
  );
}
export default App;
