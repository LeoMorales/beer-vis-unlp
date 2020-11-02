import "./App.css";
import ParallelCoordinatesChart from "./components/parallelcoordinates/ParallelCoordinatesChart";
import { recipes } from "./data/recipes";

function App() {
  return (
    <div className='container'>
      <div className='header'>
        <h1>BeerVIS</h1>
      </div>
      <div className='pcc'>
        <ParallelCoordinatesChart recipes={recipes} />
      </div>
      <div className='map'>mapa</div>
      <div className='selector'></div>
      <div className='footer'></div>
    </div>
  );
}
export default App;
