export default {
	products: {
		currentEditableProduct: {},
		currentDeleteProduct: {},
		all: []
	},
	permissions: [],
	
	serverMessages: {
		productExists: '',
		productUpdateError: '',
		productUpdateSuccess: ''
	},
	modals: {
		add: false,
		edit: false,
		delete: false,
		serverError: false
	},
	loaders: {
		permissions: false,
		products: false,
		productAdd: false,
		productEdit: false,
		productDelete: false

	}
}