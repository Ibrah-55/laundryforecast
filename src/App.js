import {Weather }from './components/Weather';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import './styles/index.css'
import { BrowserRouter as Router, Switch, Routes,Route,  Link} from 'react-router-dom';
import {Forecast} from './components/Forecast'
import Calender from './components/Calender'
import HandTheWashing from './components/HandTheWashing'
import WeatherNews from './components/WeatherNews'
import Landing from './components/Landing';
import {Navbar} from './components/Navbar';
import {Details}  from './components/Details'
function App() {
  return (
    <div className="App">
      <NavBar />

<Router>
<Routes>
     <Route path='/navbar' element={< Navbar/> } />
     <Route path='/details' element={< Details/> } />
    <Route path='/' element={< Landing/> } />
    <Route path='/weathernow' element={<Weather /> } />
    <Route path='/weatherforecast' element={<Forecast /> } />

    <Route path='/hangthewashing' element={<HandTheWashing /> } />
    <Route path='/weathernews' element={<WeatherNews/> } />
    <Route path='/calender' element={<Calender /> } />


     </Routes>
</Router>
<Footer />

   
    </div>
  );
}

export default App;
