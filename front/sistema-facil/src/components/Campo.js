import React from 'react';
import './Campo.css';

class Campo extends React.Component {
	
	constructor(props) {
		super(props);

		const campo = props.campo;

		this.state = {
			active: campo.active || false,
			valor: campo.valor || "",
			erro: campo.erro || "",
			nome: campo.nome || "(Campo)"
		};
	}

	mudarValor(event) {
		const valor = event.target.value;
		this.setState({valor, erro: ""});
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
				/>
				<label htmlFor={1} className={erro && "error"}>
					{erro || nome}
				</label>
			</div>
		)
	}
}

export default Campo;
