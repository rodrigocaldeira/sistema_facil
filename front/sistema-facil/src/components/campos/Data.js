import React from 'react';
import Campo from './Campo';
import CampoVazio from './validadores/CampoVazio';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ptBR from 'date-fns/locale/pt-BR';


class Data extends Campo  {

	constructor(props) {
		super(props);
		
		this.validadores.push(new CampoVazio());
	}

	blur(event) {
		const { erro } = this.state;

		if (!erro) {
			this.setState({ active: false });
		}
	}

	change(date, event) {
		this.definirValor(date);
	}
	
	render(dateFormat, showTimeInput) {
		dateFormat = dateFormat || "dd/MM/yyyy";
		const { active, erro, nome } = this.state;
		var { valor } = this.state;

		if (valor !== "" && typeof valor !== 'object') {
			valor = new Date(valor);
		}

		const className = `campo ${(active || valor) && "active"}`;
		let propriedadesDoCampo = {
			id: this.id(),
			dateFormat,
			locale: ptBR,
			selected: valor,
			placeholderText: nome,
			onChange: this.change.bind(this),
			onFocus: () => this.setState({ active: true }),
			onBlur: this.blur.bind(this),
			timeFormat: "HH:mm",
			showTimeInput
		};
		
		return (
			<div className={className}>
				{React.createElement(DatePicker, propriedadesDoCampo)}
				<label htmlFor={this.id()} className={erro && "error"}>
					{erro || nome}
				</label>
			</div>
		)
	}
}

export default Data;
