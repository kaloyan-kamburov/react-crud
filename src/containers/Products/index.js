import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../common/constants';
import { shouldComponentRender } from '../../common/helpers';
import ButtonAdd from '../../containers/Buttons/add';

class Products extends Component {
	constructor(props) {
		super(props);

		this.state = {
			products: props.products,
			productsVisible: false
		}
    }
    
    componentDidMount() {
        this.props.getAllProducts();
    }

	componentWillReceiveProps(nextProps) {
		this.setState({		
			products: nextProps.products,		
			productsVisible: nextProps.permissions.indexOf('READ') > -1
		});
	}

	render() {
		
		if (this.state.productsVisible) {
			return(
                <div>
				{shouldComponentRender('CREATE', this.props.permissions, 
					<ButtonAdd />
				, null)}
                <table>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Price</td>
                            <td>Currency</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>                        
                        {this.props.products.map( (product, index) => (
                            <tr key={index}>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.currency}</td>
                                <td>
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
			);
		} else {
			return(<div>YOU DON'T HAVE PERMISSIONS TO VIEW PRODUCTS</div>);
		}
	}
}

const mapStateToProps = state => {
	return {
		...state
	}
}

const mapDispatchToProps = dispatch => ({
	getAllProducts: () => (
		dispatch({
			type: actions.PRODUCT_GET_ALL_REQUEST
		})
	)
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);