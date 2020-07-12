import React from 'react';
import Select from 'react-select';
import Campo from './Campo';

class Lista extends Campo {

	constructor(props) {
		super(props);

		this.change = this.change.bind(this);
	}

	change(option, event) {
		this.definirValor(option);
	}

	render() {
		const { valor, nome, opcoes } = this.state;
		const className = 'campo active lista';

		let propriedadesDoCampo = {
			id: this.id(),
			onChange: this.change,
			className: 'lista',
			value: valor,
			options: this.montarOpcoes(opcoes),
			placeholder: "Selecione..."
		}

		return(
			<div className={className}>
				{React.createElement(Select, propriedadesDoCampo)}
				<label htmlFor={this.id()}>{nome}</label>
			</div>
		)
	}

	montarOpcoes(opcoes) {
		return opcoes
			.map(opcao => {
				return { value: opcao, label: opcao };
			});
	}
}

export default Lista
