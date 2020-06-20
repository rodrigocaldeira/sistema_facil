import React from 'react';
import './Campo.css';

class Campo extends React.Component {

	constructor(props) {
		super(props);

		this.campo = props.campo;

		this.state = {
			active: this.campo.active || false,
			valor: this.campo.valor || "",
			erro: this.campo.erro || "",
			nome: this.campo.nome || "(Campo)"
		};
	}

	mudarValor(event) {
		const valor = event.target.value;
		this.setState({valor, erro: ""});
		this.campo.valor = valor;
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
					onBlur={() => this.setState({active: false})}
					autoComplete="off"
				/>
				<label htmlFor={1} className={erro && "error"}>
					{erro || nome}
				</label>
			</div>
		)
	}
}

export default Campo;
