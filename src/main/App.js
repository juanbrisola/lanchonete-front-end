import React from 'react';


import { Container } from '@material-ui/core';
import Rotas from './rotas'
import NavBar from '../components/navbar'

import 'toastr/build/toastr.min.js'

import 'toastr/build/toastr.css'

class App extends React.Component {

	render() {
		return (
			<>
				<NavBar />
				<Container style={{ marginTop: 20 }}>
					<Rotas />
				</Container>
			</>
		);
	}
}

export default App;