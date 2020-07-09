import Data from './Data';

class DataHora extends Data {
	
	render() {
		return super.render("dd/MM/yyyy hh:mm a", true);
	}
}

export default DataHora
