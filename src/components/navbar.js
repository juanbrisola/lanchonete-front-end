import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import { styled } from '@material-ui/core/styles';

import NavbarItem from './navbarItem'


const CustomAppBar = styled(AppBar)({
    flexDirection: 'row'
});

class Navbar extends React.Component {

    isLoggedIn = () => !!window.localStorage.getItem('token');

    clearLocalStorage() {
        localStorage.clear()
    }

    render() {
        if (!this.isLoggedIn()) {
            return null;
        }

        return (
            <CustomAppBar position="static">
                <NavbarItem href="/home" label="Home" />
                <NavbarItem href="/consulta-ingredientes" label="Consultar Ingredientes" />
                <NavbarItem href="/login" label="Sair" onClick={this.clearLocalStorage} />
            </CustomAppBar>
        )
    }

}

export default Navbar;