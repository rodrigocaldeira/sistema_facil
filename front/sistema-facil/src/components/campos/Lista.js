import React from 'react';
import Select from 'react-select';
import Campo from './Campo';
import CampoVazio from './validadores/CampoVazio';

class Lista extends Campo {

	constructor(props) {
		super(props);

		this.change = this.change.bind(this);
		this.validadores.push(new CampoVazio());
	}

	change(option, event) {
		this.definirValor(option);
	}

	render() {
		const { valor, nome, opcoes, multiOpcoes, erro } = this.state;
		const className = 'campo active lista';

		let isMulti = multiOpcoes || false;

		let propriedadesDoCampo = {
			id: this.id(),
			onChange: this.change,
			className: 'lista',
			value: valor,
			options: this.montarOpcoes(opcoes),
			placeholder: "Selecione...",
			isMulti
		}

		return(
			<div className={className}>
				{React.createElement(Select, propriedadesDoCampo)}
				<label htmlFor={this.id()} className={erro && "error"}>
					{erro || nome}
				</label>
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
