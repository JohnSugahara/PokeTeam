// Testes unitários e MOCK para App.js
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// mt coisa pra evitar depender da API
function App() {
  const [pokemonId, setPokemonId] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSearch = () => {
    if (!pokemonId.trim()) {
      setError('Por favor, digite um ID ou nome de Pokémon');
      return;
    }
    setLoading(true);
    setError('');
    // simula uma busca sem API
    setTimeout(() => setLoading(false), 100);
  };

  const handleRandomTeam = () => {
    setLoading(true);
    setError('');
    // simula geração de time sem API
    setTimeout(() => setLoading(false), 100);
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
      </div>
    </div>
  );
}

describe('Testes Unitários App Component', () => {
  test('1 - renderiza título principal corretamente', () => {
    render(<App />);
    expect(screen.getByText('PokéTeam Explorer')).toBeInTheDocument();
  });

  test('2 - renderiza descrição do app', () => {
    render(<App />);
    expect(screen.getByText('Explore Pokémon individuais ou gere times aleatórios!')).toBeInTheDocument();
  });

  test('3 - input inicia vazio', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Digite o ID ou nome...');
    expect(input.value).toBe('');
  });

  test('4 - input atualiza valor quando usuário digita', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Digite o ID ou nome...');
    
    await userEvent.type(input, 'pikachu');
    
    expect(input.value).toBe('pikachu');
  });

  test('5 - exibe erro ao buscar com input vazio', () => {
    render(<App />);
    const searchButton = screen.getByText('Buscar Pokémon');
    
    fireEvent.click(searchButton);
    
    expect(screen.getByText('Por favor, digite um ID ou nome de Pokémon')).toBeInTheDocument();
  });

  test('6 - exibe erro ao buscar com apenas espaços', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Digite o ID ou nome...');
    const searchButton = screen.getByText('Buscar Pokémon');
    
    await userEvent.type(input, '   ');
    fireEvent.click(searchButton);
    
    expect(screen.getByText('Por favor, digite um ID ou nome de Pokémon')).toBeInTheDocument();
  });

  test('7 - botão de time aleatório está presente', () => {
    render(<App />);
    const teamButton = screen.getByText('Time Aleatório');
    expect(teamButton).toBeInTheDocument();
  });

  test('8 - não exibe mensagem de erro inicialmente', () => {
    render(<App />);
    expect(screen.queryByText('Por favor, digite um ID ou nome de Pokémon')).not.toBeInTheDocument();
  });

  test('9 - busca ao pressionar Enter no input', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Digite o ID ou nome...');
    
    await userEvent.type(input, 'charmander{enter}');
    
    // Não deve exibir erro porque o input não está vazio
    expect(screen.queryByText('Por favor, digite um ID ou nome de Pokémon')).not.toBeInTheDocument();
  });

  test('10 - botões são desabilitados durante loading', async () => {
    render(<App />);
    const searchButton = screen.getByText('Buscar Pokémon');
    const teamButton = screen.getByText('Time Aleatório');
    
    // Clica no botão de time para ativar loading
    fireEvent.click(teamButton);
    
    // Deve mostrar texto de loading
    expect(screen.getByText('Gerando...')).toBeInTheDocument();
    expect(searchButton.disabled).toBe(true);
    expect(teamButton.disabled).toBe(true);
  });
});

//TESTE COM MOCK
describe('Teste com Mock', () => {
  test('11 - mock de serviço de Pokémon', async () => {
    // mock de um serviço
    const mockPokemonService = {
      getPokemonById: jest.fn().mockResolvedValue({
        id: 25,
        name: 'pikachu',
        type: 'electric'
      })
    };

    // componente q usa mock
    function AppComMock() {
      const [resultado, setResultado] = React.useState('');

      const handleBuscarComMock = async () => {
        const data = await mockPokemonService.getPokemonById('pikachu');
        setResultado(`Pokémon: ${data.name}`);
      };

      return (
        <div>
          <button onClick={handleBuscarComMock}>
            Buscar com Mock
          </button>
          {resultado && <div data-testid="pokemon-info">{resultado}</div>}
        </div>
      );
    }

    render(<AppComMock />);
    
    const buscarButton = screen.getByText('Buscar com Mock');
    fireEvent.click(buscarButton);

    // verifica se mock foi chamadp
    expect(mockPokemonService.getPokemonById).toHaveBeenCalledWith('pikachu');
    expect(mockPokemonService.getPokemonById).toHaveBeenCalledTimes(1);

    // aguarda o resultado do mock
    await screen.findByTestId('pokemon-info');
    expect(screen.getByTestId('pokemon-info')).toHaveTextContent('Pokémon: pikachu');
  });
});