import { useState, useEffect } from 'react';

interface Location {
  id: string;
  name: string;
  description: string | null;
  category: string;
  address: string;
  latitude: number;
  longitude: number;
}

function App() {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/locations')
      .then((response) => response.json())
      .then((data) => setLocations(data));
  }, []);

  return (
    <div>
      <h1>Cidade Viva</h1>
      <ul>
        {locations.map((location) => (
          <li key={location.id}>
            <strong>{location.name}</strong> — {location.category}
            <br />
            {location.address}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;