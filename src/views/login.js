import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { mensagemErro } from '../components/toastr'

import { Button, Box, TextField } from '@material-ui/core';

class Login extends React.Component {

    state = {
        username: '',
        password: ''
    }

    entrar = () => {

        if (!this.state.username || !this.state.password) {
            mensagemErro('Informe o usuário e a senha')
        } else {
            axios.post('http://localhost:8080/auth/signin',
                {
                    username: this.state.username,
                    password: this.state.password,
                }).then(async response => {
                    await localStorage.setItem('token', 'Bearer ' + response.data.token)
                    this.props.history.push('/home')
                    window.location.reload(false)
                }).catch(erro => {
                    mensagemErro(erro.response.data.message)
                });
        }
    }



    render() {
        return (
            <Box style={{ display: 'flex', margin: '100px auto', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', maxWidth: 300 }}>
                <TextField
                    label="Usuário"
                    variant="outlined"
                    value={this.state.username}
                    required
                    onChange={e => this.setState({ username: e.target.value })}
                    style={{ marginBottom: 10, width: '100%' }}
                />

                <TextField
                    type="password"
                    label="Senha"
                    required
                    value={this.state.password}
                    onChange={e => this.setState({ password: e.target.value })}
                    style={{ marginBottom: 10, width: '100%' }}
                    variant="outlined"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.entrar}
                    style={{ width: '100%' }}
                >
                    Entrar
                </Button>
            </Box>
        )
    }
}

export default withRouter(Login);