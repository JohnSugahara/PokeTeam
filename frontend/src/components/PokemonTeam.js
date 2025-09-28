import React from 'react';
import PokemonCard from './PokemonCard';
import '../styles/App.css';

const PokemonTeam = ({ team, loading }) => {
  if (loading) {
    return (
      <div className="team-container">
        <h2>Time Pokémon</h2>
        <div className="loading">Carregando time...</div>
      </div>
    );
  }

  if (!team || team.length === 0) {
    return (
      <div className="team-container">
        <h2>Time Pokémon</h2>
        <div className="no-team">Nenhum Pokémon no time</div>
      </div>
    );
  }

  return (
    <div className="team-container">
      <h2>Time Pokémon Aleatório</h2>
      <div className="team-grid">
        {team.map((pokemon, index) => (
          <PokemonCard key={`${pokemon.id}-${index}`} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default PokemonTeam;