import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const pokemonService = {
  getPokemonById: async (id) => {
    try {
      const response = await api.get(`/pokemon/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar Pokémon:', error);
      throw error;
    }
  },

  getRandomTeam: async () => {
    try {
      const response = await api.get('/randomteam');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar time aleatório:', error);
      throw error;
    }
  },
};

export default api;