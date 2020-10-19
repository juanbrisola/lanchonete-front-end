import React from 'react';
import { withRouter } from 'react-router-dom'
import startCase from 'lodash/startCase';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import currencyFormatter from 'currency-formatter'
import { mensagemSucesso } from './toastr'

class PedidoResposta extends React.Component {
  render() {
    if (!this.props.pedido) {
      return null
    }

    return (
      <Dialog
        open={!!this.props.pedido}
        onClose={this.props.reiniciarPedido}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirme Seu Pedido</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {this.props.pedido.lanches.map(lanche => (
              <Box key={`pedido-${lanche.idGeradoPeloFront}`} style={{ marginBottom: 10 }}>
                <Typography variant="h6" as="p" style={{ textTransform: 'uppercase'}}>{lanche.idGeradoPeloFront.split('-').join(' #')}</Typography>
                <Typography as="p">Valor (com desconto): {currencyFormatter.format(lanche.valor, { locale: 'pt-BR'})}</Typography>
                <Typography as="p">Promoções aplicadas: {lanche.promosAplicadas.map(startCase).join(', ')}</Typography>
              </Box>
            ))}

            <Typography variant="h5" style={{ marginTop: 30 }}>Total Pedido: {currencyFormatter.format(this.props.pedido.totalPedido, { locale: 'pt-BR'})}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.reiniciarPedido} color="primary">
            Modificar Pedido
          </Button>
          <Button
            onClick={() => {
              this.props.reiniciarPedido();
              this.props.history.push('/home');
              mensagemSucesso('Pedido Realizado Com Sucesso!')
            }}
            color="primary"
          >
            Confirmar Pedido
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
export default withRouter(PedidoResposta);