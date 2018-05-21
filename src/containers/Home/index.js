import { connect } from 'react-redux';
import * as actions from '../../common/constants';
import Home from '../../components/pages/Home'

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

export default connect(mapStateToProps, mapDispatchToProps)(Home);