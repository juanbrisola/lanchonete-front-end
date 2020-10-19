import React from 'react';
import { Box, Button, Typography, Divider } from '@material-ui/core';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'

import CardapioService from '../app/service/cardapioService';
import PedidoService from '../app/service/pedidoService';
import LancheSelect from '../components/lanche-select';
import IngredientesSelect from '../components/ingredientes-select';
import PedidoResposta from '../components/pedido-resposta';

export default class Pedido extends React.Component {
    state = {
        lanches: [],
        ingredientes: [],
        pedido: null
    }

    constructor(props) {
        super(props);
        this.cardapioService = new CardapioService();
        this.pedidoService = new PedidoService();
    }

    componentDidMount() {
        this.cardapioService.getCardapio()
            .then(resp => this.setState(resp.data))
            .catch(() => this.setState({ lanches: [], ingredientes: [] }))
    }


    pedido = (values) => {
        const formValores = {
            lanches: values.lanches.map(lanche => ({
                ...lanche,
                adicionais: lanche.ingredientes
                  .filter(ingrediente => ingrediente.qt > 0)
                  .map(ingrediente => ({
                    ingrediente: { id: ingrediente.id },
                    quantidade: ingrediente.qt
                  }))
            }))
        }

        this.pedidoService.calculaPedido(formValores)
            .then(resp => {
              this.setState({
                pedido: resp.data
              })
            })
            .catch(erro => {
              this.setState({ pedido: null })
            })
    }

    render() {

        const initialIngredientes = this.state.ingredientes.map(ingrediente => ({
          qt: 0,
          id: ingrediente.id
        }));

        return (
          <>
            <PedidoResposta
              pedido={this.state.pedido}
              reiniciarPedido={() => this.setState({ pedido: null })}
            />
            <Form
                mutators={{
                  ...arrayMutators
                }}
                onSubmit={this.pedido}
                initialValues={{ lanches: [{ id: '', idGeradoPeloFront: 'lanche-1', ingredientes: initialIngredientes }] }}
                keepDirtyOnReinitialize
                render={({ handleSubmit, submitting, values, form: { mutators: { push } }}) => (
                    <form onSubmit={handleSubmit} noValidate>
                      <Typography variant="h4" as="h1">Selecione o lanche e adicione ingredientes se desejar</Typography>

                      <FieldArray name="lanches">
                        {({ fields }) => fields.map((name, key) => (
                            <Box key={`lanche-${key}`} style={{ margin: '20px 0'}}>
                              <Typography variant="h5" as="p">Lanche #{key + 1}</Typography>
                              <Field name={`${name}.idGeradoPeloFront`} style={{ display: 'none' }} type="hidden" component="input" />
                              <LancheSelect fieldArrayName={name} lanches={this.state.lanches} />
                              {key !== 0 && <Button onClick={() => fields.remove(key)}>Remover</Button>}
                              <IngredientesSelect fieldArrayName={name} fieldArrayOrder={key} ingredientes={this.state.ingredientes} />
                              {key !== values.lanches.length - 1 && <Divider style={{ marginTop: 10 }} />}
                            </Box>
                        ))}
                      </FieldArray>
                      <Box style={{ marginTop: 30 }}>
                        <Button
                          variant="outlined"
                          color="primary"
                          disabled={submitting}
                          style={{ marginRight: 20 }}
                          onClick={() =>
                            push('lanches', {
                              id: '',
                              ingredientes: initialIngredientes,
                              idGeradoPeloFront: `lanche-${values.lanches.length+1}`
                            })
                          }
                        >
                          Adicionar Mais Um Lanche
                        </Button>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          disabled={submitting}
                        >
                          Ver Desconto E Finalizar Pedido
                        </Button>
                      </Box>
                    </form>
                )}
            />
          </>
        )
    }
}
