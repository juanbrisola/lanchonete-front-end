import React from 'react'
import NumberFormat from 'react-number-format';
import { withRouter } from 'react-router-dom'
import IngredienteService from '../../app/service/ingredienteService'
import { Button, Typography } from '@material-ui/core';
import { Form, Field } from 'react-final-form';
import { TextField } from 'mui-rff';


import { mensagemErro, mensagemSucesso, mensagemAlerta } from '../../components/toastr'


function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: Number(values.value).toFixed(2),
                    },
                });
            }}
            isNumericString
            prefix="R$ "
            decimalSeparator=","
        />
    );
}

class AlteraIngredientes extends React.Component {

    state = {
        id: null,
        descricao: '',
        valor: ''
    }

    constructor() {
        super();
        this.service = new IngredienteService();
    }

    componentDidMount() {
        const params = this.props.match.params
        if (params.id) {
            const id = params.id
            this.service.getIngredienteById(id)
                .then(response => {
                    this.setState({
                        ...response.data,
                        valor: Number(response.data.valor).toFixed(2)
                    })
                })
                .catch(erro => {
                    mensagemErro('Houve um erro ao salvar o ingrediente!')
                })
        }
    }

    alterar = (values) => {
        const { id } = this.state;
        this.service
            .putIngrediente({ ...values, id })
            .then(response => {
                this.props.history.push('/consulta-ingredientes')
                mensagemSucesso('Ingrediente atualizado com sucesso!')
            }).catch(error => {
                mensagemErro("Não foi possível alterar o Ingrediente.")
            })
    }


    render() {
        return (
            <>
                <Typography variant="h4" component="h1" style={{ marginBottom: 30 }}>
                    Alterar Ingrediente
                </Typography>
                <Form
                    onSubmit={this.alterar}
                    validate={(values => {
                        const erros = {}
                        if (!values.valor) {
                            erros.valor = 'Informe um valor'
                        }

                        return erros;
                    })}
                    initialValues={this.state}
                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Descrição"
                                variant="outlined"
                                required
                                name="descricao"
                                style={{ marginBottom: 15 }}
                            />

                            <TextField
                                label="Valor"
                                variant="outlined"
                                required
                                name="valor"
                                style={{ marginBottom: 15 }}
                            />

                            <Button variant="outlined" color="primary" type="submit" disabled={submitting || pristine}>Salvar</Button>
                            <Button onClick={form.reset} disabled={submitting || pristine}>Reiniciar</Button>
                        </form>
                    )}
                />
            </>
        )
    }

}

export default withRouter(AlteraIngredientes);