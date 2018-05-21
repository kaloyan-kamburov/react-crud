/**
 * Used for displaying components based on given permission
 * @param {String} permission
 * @param {Array} currentPermissions  
 * @param {Any} Component 
 * @param {Any} ContenInsteadOfComponent 
 */
export function shouldComponentRender(permission, currentPermissions, Component, ContenInsteadOfComponent) {
	if (typeof permission === 'string' && currentPermissions.indexOf(permission) > -1) {		
		return (Component);
	}
	return (ContenInsteadOfComponent);
}
