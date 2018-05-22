import React, { Component } from 'react';
import Products from '../../../containers/Products';

import { shouldComponentRender } from '../../../common/helpers';

export default class Home extends Component {
	render() {
		return(
			<Products />
		)
	}
}