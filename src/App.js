import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import store from './store';
import Routes from './containers/Routes';
import * as actions from './common/constants';
import './App.css';


class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modalOpen: false
		}
	}

	componentWillMount() {
		store.dispatch({
			type: actions.PERMISSIONS_CHECK_REQUEST
		});
	}

	toggleModal = () => {
		this.setState({
			modalOpen: !this.state.modalOpen
		})
	}

	componentDidMount() {
		store.subscribe(() => {
			this.setState({
				modalOpen: store.getState().modals.serverError
			})
			
		})
	}

	render() {
		return (
			<Provider store={store}>			
				<Grid container justify={'center'} spacing={16} alignItems={'center'}>
					<Routes />
					<div className='modal-mask' style={{display: this.state.modalOpen ? 'block' : 'none'}}>
						<div className='modal-body'>
							<span className='modal-close' onClick={this.toggleModal}></span>
							<p>Server error occured</p>
							<div className='buttons-wrapper'>
								<Button variant='raised' color='primary' onClick={this.toggleModal}>OK</Button>
							</div>
						</div>
					</div>
				</Grid>
			</Provider>
		);
	}
}

export default withRouter(App);
