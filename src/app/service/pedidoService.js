import ApiService from '../apiservice'

class PedidoService extends ApiService {

    constructor() {
        super('/api')
    }

    calculaPedido(pedido) {
        return this.post('/pedido', pedido)
    }
}

export default PedidoService;