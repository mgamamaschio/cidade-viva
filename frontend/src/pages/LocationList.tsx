import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

interface Location {
  id: string;
  name: string;
  description: string | null;
  category: string;
  address: string;
  latitude: number;
  longitude: number;
  accessibilityFeatures: string[];
}

function LocationList() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [view, setView] = useState<'list' | 'map'>('list');

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

      <div className="view-toggle" role="group" aria-label="Modo de visualizacao">
        <button
          type="button"
          className={view === 'list' ? 'toggle-btn active' : 'toggle-btn'}
          onClick={() => setView('list')}
          aria-pressed={view === 'list'}
        >
          <i className="ti ti-list" aria-hidden="true"></i> Lista
        </button>
        <button
          type="button"
          className={view === 'map' ? 'toggle-btn active' : 'toggle-btn'}
          onClick={() => setView('map')}
          aria-pressed={view === 'map'}
        >
          <i className="ti ti-map" aria-hidden="true"></i> Mapa
        </button>
      </div>

      {view === 'list' && (
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

                {location.accessibilityFeatures.length > 0 && (
                  <div className="accessibility-tags">
                    {location.accessibilityFeatures.map((feature) => (
                      <span className="accessibility-tag" key={feature}>
                        <i className="ti ti-check" aria-hidden="true"></i>
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            </Link>
          ))}

          {locations.length === 0 && (
            <p className="empty-state">Nenhum local encontrado.</p>
          )}
        </div>
      )}

      {view === 'map' && (
        <div className="map-wrapper">
          <MapContainer
            center={[-23.2, -47.29]}
            zoom={13}
            style={{ height: '500px', width: '100%', borderRadius: '12px' }}
          >
            <TileLayer
              attribution='OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations.map((location) => (
              <Marker key={location.id} position={[location.latitude, location.longitude]}>
                <Popup>
                  <strong>{location.name}</strong>
                  <br />
                  {location.category}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}
    </main>
  );
}

export default LocationList;