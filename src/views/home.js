import React from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Typography } from '@material-ui/core';

class Home extends React.Component {

    criaPedido = () => {
        this.props.history.push('/pedido')
    }

    render() {
        return (
            <>
                <Typography variant="h4" component="h1" style={{ marginBottom: 30 }}>
                    Bem Vindo(a) !
                </Typography>
                <Typography variant="h5" component="h1" style={{ marginBottom: 30 }}>
                    Essa é a sua lanchonete. Fique atento às promoções:
                </Typography>
                <Typography variant="h6" component="h2" style={{ marginBottom: 30 }}>
                    - Light: se o lanche tem alface e não tem bacon, o cliente ganha 10% de desconto
                </Typography>
                <Typography variant="h6" component="h2" style={{ marginBottom: 30 }}>
                    - Muita Carne: a cada três porções de hambúrguer, o cliente só paga duas
                </Typography>
                <Typography variant="h6" component="h2" style={{ marginBottom: 30 }}>
                    - Muito Queijo: a cada três porções de queijo, o cliente só paga duas
                </Typography>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.criaPedido}
                >
                    Criar Pedido
                </Button>

            </>
        )
    }
}

export default withRouter(Home);