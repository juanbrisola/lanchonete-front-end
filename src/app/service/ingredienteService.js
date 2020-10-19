import ApiService from '../apiservice'

class IngredienteService extends ApiService {

    constructor() {
        super('/api')
    }

    getIngredientes() {
        return this.get('/ingrediente')
    }

    getIngredienteById(id) {
        return this.get(`/ingrediente/${id}`)
    }


    putIngrediente(ingrediente) {
        return this.put(`/ingrediente/${ingrediente.id}`, ingrediente)
    }

}

export default IngredienteService;