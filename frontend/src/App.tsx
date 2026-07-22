import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LocationList from './pages/LocationList';
import LocationDetail from './pages/LocationDetail';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/locations/:id" element={<LocationDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;