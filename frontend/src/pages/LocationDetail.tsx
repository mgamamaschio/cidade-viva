import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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

function LocationDetail() {
  const { id } = useParams();
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/locations/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error('Não encontrado');
        return response.json();
      })
      .then((data) => setLocation(data))
      .catch(() => setLocation(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <main className="page">
        <p>Carregando...</p>
      </main>
    );
  }

  if (!location) {
    return (
      <main className="page">
        <Link to="/" className="back-link">
          <i className="ti ti-arrow-left" aria-hidden="true"></i> Voltar
        </Link>
        <p className="empty-state">Local não encontrado.</p>
      </main>
    );
  }

  return (
    <main className="page">
      <Link to="/" className="back-link">
        <i className="ti ti-arrow-left" aria-hidden="true"></i> Voltar para a lista
      </Link>

      <article className="location-detail">
        <div className="location-card-header">
          <h1>{location.name}</h1>
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
            <h2 className="section-title">Acessibilidade</h2>
            {location.accessibilityFeatures.map((feature) => (
              <span className="accessibility-tag" key={feature}>
                <i className="ti ti-check" aria-hidden="true"></i>
                {feature}
              </span>
            ))}
          </div>
        )}

        <div className="map-wrapper">
          <MapContainer
            center={[location.latitude, location.longitude]}
            zoom={16}
            style={{ height: '300px', width: '100%', borderRadius: '12px' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[location.latitude, location.longitude]}>
              <Popup>{location.name}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </article>
    </main>
  );
}

export default LocationDetail;