const axios = require('axios');
jest.mock('axios');

let res;
beforeEach(() => {
  res = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis()
  };
});

const { getPokemonById, getPokemonByName, getRandomTeam } = require("../src/controllers/pokemonController");

describe("getPokemonById", () => {
    it("deve retornar dados do pokemon pelo ID", async () => {
        const req = { params: { id: 25 } };

        axios.get.mockResolvedValueOnce({ data: { id: 25, name: "pikachu" } });

        await getPokemonById(req, res);
        expect(res.json).toHaveBeenCalledWith({ id: 25, name: "pikachu" });
    });

    it("deve retornar erro 404 ao buscar id que não existe", async () => {
        const req = {params: { id: 77777 }};

        axios.get.mockRejectedValueOnce({
            response: { status: 404 }
        });

        await getPokemonById(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({error: "Pokemon não encontrado"})
    });

    it("deve retornar 500 se axios falhar", async () => {
        const req = { params: { id: 25 } };

        axios.get.mockRejectedValueOnce(new Error("fail"));

        await getPokemonById(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
        error: 'Erro ao buscar o pokemon'
        });


    });
});

describe("getPokemonByName", () => {
    it("deve retornar corretamente as informacoes do pokemon buscando pelo nome", async () => {
        const req = { params: { name: "arcanine" }};

        axios.get.mockResolvedValueOnce({
            data: { id: 59, name: "arcanine", weight: 1550, types:[{slot: 1, type: {name: "fire"}}] }
        });

        await getPokemonByName(req, res);
        expect(res.json).toHaveBeenCalledWith({ id: 59, name: "arcanine", weight: 1550, types:[{slot: 1, type: {name: "fire"}}]});
    });

    it("deve retornar 404 ao não encontrar o pokemon pelo nome", async() => {
        const req = { params: {name: "RenatoRusso" } };

        axios.get.mockRejectedValueOnce({
            response: {status: 404}
        });

        await getPokemonByName(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Pokemon (p/nome) não encontrado!'
        })
    });

    it("deve retornar 500 se o erro não for 404 ao buscar pokemon por nome", async() => {
        const req = { params: { name: 'RogerioFlausino' } };

        axios.get.mockRejectedValueOnce(new Error('Falha'));

        await getPokemonByName(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
        error: 'Erro ao buscar o pokemon'
        });
    });
});

describe("getRandomTeam", () => {
    it("deve retornar um time aleatorio corretamente", async() => {
        
        axios.get
            .mockResolvedValueOnce({ data: {name: 'bisharp', id: 625, types: [{slot: 1, type: 'dark'}, {slot: 2, type: 'steel'}]} })
            .mockResolvedValueOnce({ data: {name: 'meganium', id: 154, types: [{slot: 1, type: 'grass'}]} })
            .mockResolvedValueOnce({ data : {name: 'larvesta', id: 636, types: [{slot: 1, type: 'bug'}, {slot: 2, type: 'fire'}]} } )
            .mockResolvedValueOnce({ data: {name: 'poochyena', id: 261, types: [{slot: 1, type: 'dark'}]} })
            .mockResolvedValueOnce({ data: {name: 'kubfu', id: 891, types: [{slot: 1, type: 'fighting'}]} })
            .mockResolvedValueOnce({ data: {name: 'beedrill', id: 15, types: [{slot: 1, type: 'bug'}, {slot: 2, type: 'poison'}]} });        

        await getRandomTeam({}, res);

        expect(res.json).toHaveBeenCalledWith([
                {name: 'bisharp', id: 625, types: [{slot: 1, type: 'dark'}, {slot: 2, type: 'steel'}]},
                {name: 'meganium', id: 154, types: [{slot: 1, type: 'grass'}]},
                {name: 'larvesta', id: 636, types: [{slot: 1, type: 'bug'}, {slot: 2, type: 'fire'}]},
                {name: 'poochyena', id: 261, types: [{slot: 1, type: 'dark'}]},
                {name: 'kubfu', id: 891, types: [{slot: 1, type: 'fighting'}]},
                {name: 'beedrill', id: 15, types: [{slot: 1, type: 'bug'}, {slot: 2, type: 'poison'}]},
            ]);
    })

    it("deve gerar um time com exatamente 6 pokemons", async () => {

        axios.get
            .mockResolvedValueOnce({ data: {name: 'bisharp', id: 625, types: [{slot: 1, type: 'dark'}, {slot: 2, type: 'steel'}]} })
            .mockResolvedValueOnce({ data: {name: 'meganium', id: 154, types: [{slot: 1, type: 'grass'}]} })
            .mockResolvedValueOnce({ data : {name: 'larvesta', id: 636, types: [{slot: 1, type: 'bug'}, {slot: 2, type: 'fire'}]} } )
            .mockResolvedValueOnce({ data: {name: 'poochyena', id: 261, types: [{slot: 1, type: 'dark'}]} })
            .mockResolvedValueOnce({ data: {name: 'kubfu', id: 891, types: [{slot: 1, type: 'fighting'}]} })
            .mockResolvedValueOnce({ data: {name: 'beedrill', id: 15, types: [{slot: 1, type: 'bug'}, {slot: 2, type: 'poison'}]} });        

        await getRandomTeam({}, res);

        const team = res.json.mock.calls[0][0]
        expect(team).toHaveLength(6);
        
    });

    it("deve retornar 500 caso tenha problema", async() => {
        axios.get.mockRejectedValueOnce(new Error('Falha'));

        await getRandomTeam({}, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({error: 'Erro tentando gerar um time aleatorio'})
    });
});