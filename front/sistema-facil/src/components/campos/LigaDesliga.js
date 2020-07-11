import React from 'react';
import Campo from './Campo';
import Switch from 'react-switch';

class LigaDesliga extends Campo {

	constructor(props) {
		super(props);

		this.change = this.change.bind(this);
	}

	change(checked, event) {
		this.definirValor(checked);
	}

	render() {
		const { nome } = this.state;
		let { valor } = this.state;
		valor = valor || false;
		const className = 'campo active';

		let propriedadesDoCampo = {
			id: this.id(),
			checked: valor,
			onChange: this.change,
			className: 'liga-desliga'
		};

		return (
			<div className={className}>
				{React.createElement(Switch, propriedadesDoCampo)}
				<label htmlFor={this.id()}>{nome}</label> 
			</div>
		)
	}

}

export default LigaDesliga;
