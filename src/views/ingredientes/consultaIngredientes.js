import React from 'react'
import { withRouter } from 'react-router-dom'
import IngredienteService from '../../app/service/ingredienteService'
import currencyFormatter from 'currency-formatter'
import { Typography, Button, Table, TableBody, TableCell, TableContainer, TableRow, Paper, TableHead } from '@material-ui/core';

class ConsultaIngredientes extends React.Component {

    state = {
        ingredientes: [{}]
    }

    constructor() {
        super();
        this.service = new IngredienteService();
    }

    componentDidMount() {
        this.service.getIngredientes().then(response => {
            this.setState({ ingredientes: response.data })
            console.log(this.state.ingredientes)
        })
            .catch((error) => {
                console.log("deu erro")
            });

    }

    rows = () => this.state.ingredientes.map(ingrediente => {
        return (
            <TableRow key={ingrediente.id}>
                <TableCell align="center">{ingrediente.id}</TableCell>
                <TableCell align="left">{ingrediente.descricao}</TableCell>
                <TableCell align="right">{currencyFormatter.format(ingrediente.valor, { locale: 'pt-BR' })}</TableCell>
                <TableCell align="center">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => this.editar(ingrediente.id)}
                    >
                        Alterar
                </Button></TableCell>
            </TableRow>
        )
    })


    editar = (id) => {
        this.props.history.push(`/altera-ingrediente/${id}`)

    }

    render() {
        return (
            <>
                <Typography variant="h4" component="h1" style={{ marginBottom: 30 }}>
                    Ingredientes
                </Typography>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">ID</TableCell>
                                <TableCell>Descrição</TableCell>
                                <TableCell align="right">Valor</TableCell>
                                <TableCell align="center" />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.rows()}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        )
    }
}

export default withRouter(ConsultaIngredientes);