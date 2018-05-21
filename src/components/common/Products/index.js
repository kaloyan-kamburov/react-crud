import React, { Component } from 'react';

export default class Products extends Component {
	constructor(props) {
		super(props);

		this.state = {
			productsVisible: this.props.permissions.indexOf('READ') > -1
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({				
			productsVisible: nextProps.permissions.indexOf('READ') > -1
		});
	}

	render() {
		if (this.state.productsVisible) {
			return(
				<table>
					<tbody>
						
						<tr>
							<td>dsadas</td>
						</tr>
					</tbody>
				</table>
			);
		} else {
			return(<div>YOU DON'T HAVE PERMISSIONS TO VIEW PRODUCTS</div>);
		}
	}
}