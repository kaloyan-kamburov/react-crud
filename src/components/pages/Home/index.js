import React, { Component } from 'react';
import Products from '../../common/Products';

import { shouldComponentRender } from '../../../common/helpers';

export default class Home extends Component {
	render() {
		return(
			<Products permissions={this.props.permissions} />
			// shouldComponentRender('CREATE', this.props.permissions, 
			// 	<Products permissions={this.props.permissions}/>
			
				
			// 	,
			
			// <div>NOO</div>)
		)
	}
}