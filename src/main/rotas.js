import React from 'react'

import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom'
import Login from '../views/login'
import Home from '../views/home'
import ConsultaIngredientes from '../views/ingredientes/consultaIngredientes'
import AlteraIngredientes from '../views/ingredientes/alteraIngredientes'
import Pedido from '../views/pedido'

function Rotas() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/login" />
                </Route>
                <Route exact path="/login" component={Login} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/pedido" component={Pedido} />
                <Route exact path="/consulta-ingredientes" component={ConsultaIngredientes} />
                <Route exact path="/altera-ingrediente/:id" component={AlteraIngredientes} />
            </Switch>
        </BrowserRouter>
    )
}

export default Rotas;