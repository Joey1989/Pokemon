import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { PokemonProvider } from './providers/PokemonProvider';
import { PagerProvider } from './providers/PagerProvider';
import HomePage from './components/HomePage/HomePage';
import PokemonDetail from './components/PokemonDetail/PokemonDetail';

function App() {
  return (
    <div className="App">
      <PokemonProvider >
        <PagerProvider >
          <Router>
            <Routes>
              <Route exact path="/" element={ <Navigate to="/home" /> } />
              <Route path='/home' element={<HomePage />} />
              <Route path='/pokemon/:id' element={<PokemonDetail />} />
            </Routes>
          </Router>
        </PagerProvider>
      </PokemonProvider>
    </div>
  );
}

export default App;
