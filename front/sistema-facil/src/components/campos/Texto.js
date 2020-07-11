import React from 'react';
import Campo from './Campo';
import CampoVazio from './validadores/CampoVazio';

class Texto extends Campo  {

	constructor(props) {
		super(props);
		
		this.validadores.push(new CampoVazio());
		this.blur = this.blur.bind(this);
		this.keyup = this.keyup.bind(this);
		this.keydown = this.keydown.bind(this);
		this.change = this.change.bind(this);
		this.focus = this.focus.bind(this);
	}

	blur(event) {
		const { erro } = this.state;

		if (!erro) {
			this.setState({ active: false });
		}
	}

	keyup(event) {}
	keydown(event) {}
	
	change(event) {
		this.definirValor(event.target.value);
	}

	focus(event) {
		this.setState({ active: true });
	}
	
	render(tipo) {
		tipo = tipo || "text";
		const { active, valor, erro, nome } = this.state;
		const className = `campo ${(active || valor) && "active"}`;
		
		return (
			<div className={className}>
				<input
					id={this.id()}
					type={tipo}
					value={valor}
					placeholder={nome}
					onChange={this.change}
					onFocus={this.focus}
					onBlur={this.blur}
					onKeyUp={this.keyup}
					onKeyDown={this.keydown}
					autoComplete="off"
				/>
				<label htmlFor={this.id()} className={erro && "error"}>
					{erro || nome}
				</label>
			</div>
		)
	}
}

export default Texto;
