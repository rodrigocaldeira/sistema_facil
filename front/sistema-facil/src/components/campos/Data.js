import React from 'react';
import Campo from './Campo';
import CampoVazio from './validadores/CampoVazio';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ptBR from 'date-fns/locale/pt-BR';
registerLocale("ptBR", ptBR);


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
	
	render(tipo) {
		const { active, erro, nome } = this.state;
		var { valor } = this.state;

		if (valor !== "" && typeof valor !== 'object') {
			valor = new Date(valor);
		}

		const className = `campo ${(active || valor) && "active"}`;
		
		return (
			<div className={className}>
				<DatePicker
					id={this.id()}
					dateFormat="dd/MM/yyyy"
					locale="ptBR"
					selected={valor}
					placeholderText={nome}
					onChange={this.change.bind(this)}
					onFocus={() => this.setState({ active: true})}
					onBlur={this.blur.bind(this)}
					autoComplete="off"
				/>
				<label htmlFor={this.id()} className={erro && "error"}>
					{erro || nome}
				</label>
			</div>
		)
	}
}

export default Data;
