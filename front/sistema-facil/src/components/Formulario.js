import React from 'react';
import criarCampo from './campos/CampoFactory';
import { useDispatch, useSelector } from 'react-redux';
import { 
	DADOS_LISTADOS, 
	CADASTRO_INCLUIDO, 
	CADASTRO_EDITADO,
	EstadoGeral
} from '../actions';
import { incluirCadastro, editarCadastro } from '../services/CadastroService';
import './Formulario.css';

function Formulario() {
	
	let lista = useSelector(state => state.lista);
	let cadastro = useSelector(state => state.cadastro);
	let dados = useSelector(state => state.dados);
	let id = useSelector(state => state.id);
	let estadoGeral = useSelector(state => state.estadoGeral);

	let dispatch = useDispatch();
	let camposRef = [];

	let campos = cadastro.Campos.map(campo => {
		let valor = null;
		
		if (dados !== undefined) {
			valor = dados[campo.Nome.toLowerCase()];
		}

		let props =  { nome: campo.Nome, tipo: campo.Tipo, valor, opcional: campo.Opcional, opcoes: campo.Opcoes };

		let campoRef = React.createRef();
		camposRef[props.nome] = campoRef;

		return React.createElement(criarCampo(props.tipo), {key: props.nome, campo: props, ref: campoRef});
	});

	let salvar = event => {
		event.preventDefault();
		
		let formularioValido = true;
		let valores = [];

		campos.forEach(campo => {
			const { nome, tipo, valor } = campo.props.campo;
			formularioValido &= camposRef[nome].current.validar();

			valores.push({ nome, tipo, valor });
		});

		if (formularioValido) {
			if (estadoGeral === EstadoGeral.NovoCadastro) {
				incluirCadastro(cadastro, valores)
					.then(response => dispatch({ type: CADASTRO_INCLUIDO }));
			} else if (estadoGeral === EstadoGeral.EditandoCadastro) {
				editarCadastro(cadastro, valores, id)
					.then(response => dispatch({ type: CADASTRO_EDITADO }));
			}
		}
	}
	
	
	return (
		<div className="Formulario">
			<h2>{cadastro.Nome}</h2>
			<form onSubmit={salvar}>
				{campos}
				<div className="botoes">
					<button className="btn-danger" type="button" onClick={(event) => {
						event.preventDefault();
						dispatch({ type: DADOS_LISTADOS, lista });
					}}>Cancelar</button>
					<button className="btn-success" type="submit">Salvar</button>
				</div>
			</form>
		</div>
	)
}

export default Formulario;
