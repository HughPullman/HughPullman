import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import { useReducer, useState } from 'react';

function App() {
  
  const [mapLocation, setMapLocation] = useState(null)
  const [redcuerValue, forceUpdate] = useReducer(x => x + 1, 0)

  return (
    <div className="app">
      <Navbar setMapLocation={setMapLocation} forceUpdate={forceUpdate}/>
      <Home mapLocation={mapLocation} setMapLocation={setMapLocation} redcuerValue={redcuerValue}/>
    </div>
  );
}

export default App;
