import React from 'react';
import '../styles/App.css';

const PokemonCard = ({ pokemon }) => {
  if (!pokemon) return null;

  const getTypeColor = (type) => {
    const typeColors = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC'
    };
    return typeColors[type] || '#68A090';
  };

  return (
    <div className="pokemon-card">
      <div className="pokemon-header">
        <h3 className="pokemon-name">
          {pokemon.name?.charAt(0).toUpperCase() + pokemon.name?.slice(1)}
        </h3>
        <span className="pokemon-id">#{pokemon.id}</span>
      </div>
      
      <div className="pokemon-image">
        <img 
          src={pokemon.sprites?.front_default || '/placeholder-pokemon.png'} 
          alt={pokemon.name}
          onError={(e) => {
            e.target.src = '/placeholder-pokemon.png';
          }}
        />
      </div>
      
      <div className="pokemon-types">
        {pokemon.types?.map((typeInfo, index) => (
          <span 
            key={index}
            className="type-badge"
            style={{ backgroundColor: getTypeColor(typeInfo.type.name) }}
          >
            {typeInfo.type.name}
          </span>
        ))}
      </div>
      
      <div className="pokemon-stats">
        <div className="stat">
          <span>HP: {pokemon.stats?.[0]?.base_stat || 'N/A'}</span>
        </div>
        <div className="stat">
          <span>ATK: {pokemon.stats?.[1]?.base_stat || 'N/A'}</span>
        </div>
        <div className="stat">
          <span>DEF: {pokemon.stats?.[2]?.base_stat || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;