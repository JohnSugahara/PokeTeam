const axios = require('axios');

const getPokemonById = async(req, res) => {
    const {id} = req.params;
    try{
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        res.json(response.data);
    }
    catch(error){
        res.status(500).json({error: 'Erro ao buscar o pokemon pelo id'});
    }
};

const getRandomTeam = async(req, res) => {
    try{
        let team = [];
        for (let i=0; i<6; i++){
            const idAleatorio = parseInt(Math.random() * 1302)+ 1;
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idAleatorio}/`);
            team.push(response.data);
        }
        res.json(team);
    }
    catch(error){
        res.status(500).json({error: 'Erro tentando gerar um time aleatorio'});
    }
};

module.exports = {getPokemonById, getRandomTeam};