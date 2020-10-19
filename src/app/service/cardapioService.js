import ApiService from '../apiservice'

class CardapioService extends ApiService {

    constructor() {
        super('/api')
    }

    getCardapio() {
        return this.get('/pedido/cardapio')
    }
}

export default CardapioService;