import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Location {
  id: string;
  name: string;
  description: string | null;
  category: string;
  address: string;
  latitude: number;
  longitude: number;
}

function LocationList() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/locations/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (selectedCategory) params.set('category', selectedCategory);

    const url = `http://localhost:3000/locations?${params.toString()}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => setLocations(data));
  }, [search, selectedCategory]);

  return (
    <main className="page">
      <h1>Cidade Viva</h1>
      <p className="subtitle">Locais acessíveis e sustentáveis em Salto</p>

      <div className="search-box">
        <label htmlFor="search-input" className="sr-only">
          Buscar locais por nome ou categoria
        </label>
        <i className="ti ti-search" aria-hidden="true"></i>
        <input
          id="search-input"
          type="text"
          placeholder="Buscar por nome ou categoria..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="filter-bar" role="group" aria-label="Filtrar por categoria">
        <button
          type="button"
          className={selectedCategory === null ? 'filter-pill active' : 'filter-pill'}
          onClick={() => setSelectedCategory(null)}
          aria-pressed={selectedCategory === null}
        >
          Todas
        </button>
        {categories.map((category) => (
          <button
            type="button"
            key={category}
            className={selectedCategory === category ? 'filter-pill active' : 'filter-pill'}
            onClick={() => setSelectedCategory(category)}
            aria-pressed={selectedCategory === category}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="location-list">
        {locations.map((location) => (
          <Link to={`/locations/${location.id}`} className="location-card-link" key={location.id}>
            <article className="location-card">
              <div className="location-card-header">
                <h2>{location.name}</h2>
                <span className="category-tag">{location.category}</span>
              </div>

              {location.description && (
                <p className="description">{location.description}</p>
              )}

              <div className="address">
                <i className="ti ti-map-pin" aria-hidden="true"></i>
                <span>{location.address}</span>
              </div>
            </article>
          </Link>
        ))}

        {locations.length === 0 && (
          <p className="empty-state">Nenhum local encontrado.</p>
        )}
      </div>
    </main>
  );
}

export default LocationList;