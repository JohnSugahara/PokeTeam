import React, { useState } from 'react';
import PokemonCard from './components/PokemonCard';
import PokemonTeam from './components/PokemonTeam';
import { pokemonService } from './services/api';
import './styles/App.css';

function App() {
  const [pokemonId, setPokemonId] = useState('');
  const [singlePokemon, setSinglePokemon] = useState(null);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!pokemonId.trim()) {
      setError('Por favor, digite um ID ou nome de Pokémon');
      return;
    }

    setLoading(true);
    setError('');
    setSinglePokemon(null);

    try {
      const data = await pokemonService.getPokemonById(pokemonId.toLowerCase());
      setSinglePokemon(data);
    } catch (err) {
      setError('Pokémon não encontrado. Verifique o ID/nome e tente novamente.');
      console.error('Erro na busca:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRandomTeam = async () => {
    setLoading(true);
    setError('');
    setSinglePokemon(null);

    try {
      const data = await pokemonService.getRandomTeam();
      setTeam(data);
    } catch (err) {
      setError('Erro ao gerar time aleatório. Tente novamente.');
      console.error('Erro no time aleatório:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>PokéTeam Explorer</h1>
        <p>Explore Pokémon individuais ou gere times aleatórios!</p>
      </header>

      <div className="controls">
        <div className="search-section">
          <input
            type="text"
            className="search-input"
            placeholder="Digite o ID ou nome..."
            value={pokemonId}
            onChange={(e) => setPokemonId(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
          <button 
            className="search-button"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? 'Buscando...' : 'Buscar Pokémon'}
          </button>
        </div>
        
        <button 
          className="team-button"
          onClick={handleRandomTeam}
          disabled={loading}
        >
          {loading ? 'Gerando...' : 'Time Aleatório'}
        </button>
      </div>

      <div className="content">
        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {singlePokemon && (
          <div className="single-pokemon">
            <PokemonCard pokemon={singlePokemon} />
          </div>
        )}

        <PokemonTeam team={team} loading={loading && !singlePokemon} />
      </div>
    </div>
  );
}

export default App;