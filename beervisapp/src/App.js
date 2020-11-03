import "./App.css";
import ParallelCoordinatesChart from "./components/parallelcoordinates/ParallelCoordinatesChart";
import BeerMap from "./components/beermap/BeerMap";

function App() {
  return (
    <div className='container'>
      <div className='header'>
        <h1>BeerVIS</h1>
      </div>
      <div className='pcc'>
        <ParallelCoordinatesChart />
      </div>
      <div className='map'>
        <BeerMap />
      </div>
      <div className='selector'></div>
      <div className='footer'></div>
    </div>
  );
}
export default App;
