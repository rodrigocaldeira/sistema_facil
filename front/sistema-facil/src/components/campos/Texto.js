import React from 'react';
import Campo from './Campo';
import CampoVazio from './validadores/CampoVazio';

class Texto extends Campo  {

	constructor(props) {
		super(props);

		this.validadores.push(new CampoVazio());
	}
	
	render() {
		const { active, valor, erro, nome } = this.state;
		const className = `campo ${(active || valor) && "active"}`;
		
		return (
			<div className={className}>
				<input
					id={1}
					type="text"
					value={valor}
					placeholder={nome}
					onChange={this.mudarValor.bind(this)}
					onFocus={() => this.setState({active: true})}
					onBlur={() => {
						if (!erro) {
							this.setState({active: false});
						}
					}}
					autoComplete="off"
				/>
				<label htmlFor={1} className={erro && "error"}>
					{erro || nome}
				</label>
			</div>
		)
	}
}

export default Texto;
