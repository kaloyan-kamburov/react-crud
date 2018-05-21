import React, { Component } from 'react';
import Products from '../../common/Products';

import { shouldComponentRender } from '../../../common/helpers';

export default class Home extends Component {
	render() {
		return(
			shouldComponentRender('CREATE', this.props.permissions, 
				<Products />
			
				
				,
			
			<div>NOO</div>)
		)
	}
}