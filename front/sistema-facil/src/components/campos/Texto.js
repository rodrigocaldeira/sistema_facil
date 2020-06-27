import React from 'react';
import Campo from './Campo';
import CampoVazio from './validadores/CampoVazio';

class Texto extends Campo  {

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

	keyup(event) {}
	keydown(event) {}
	
	change(event) {
		this.definirValor(event.target.value);
	}
	
	render() {
		const { active, valor, erro, nome } = this.state;
		const className = `campo ${(active || valor) && "active"}`;
		
		return (
			<div className={className}>
				<input
					id={this.id()}
					type="text"
					value={valor}
					placeholder={nome}
					onChange={this.change.bind(this)}
					onFocus={() => this.setState({ active: true})}
					onBlur={this.blur.bind(this)}
					onKeyUp={this.keyup.bind(this)}
					onKeyDown={this.keydown.bind(this)}
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
