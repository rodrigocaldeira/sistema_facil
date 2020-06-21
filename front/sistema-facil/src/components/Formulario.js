import React from 'react';
import Campo from './Campo';
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

	let campos = cadastro.Campos.map(campo => {
		let valor = null;
		if (dados !== undefined) {
			valor = dados[campo.Nome.toLowerCase()];
		}
		return { nome: campo.Nome, tipo: campo.Tipo, valor }
	});

	let salvar = event => {
		event.preventDefault();
		
		if (estadoGeral === EstadoGeral.NovoCadastro) {
			incluirCadastro(cadastro, campos)
				.then(response => dispatch({ type: CADASTRO_INCLUIDO }));
		} else if (estadoGeral === EstadoGeral.EditandoCadastro) {
			editarCadastro(cadastro, campos, id)
				.then(response => dispatch({ type: CADASTRO_EDITADO }));
		}
	}

	
	return (
		<div className="Formulario">
			<h2>{cadastro.Nome}</h2>
			<form onSubmit={salvar}>
				{campos.map(campo => {
					return <Campo key={campo.nome} campo={campo} />
				})}
				<button className="btn-danger" type="button" onClick={(event) => {
					event.preventDefault();
					dispatch({ type: DADOS_LISTADOS, lista });
				}}>Cancelar</button>
				<button className="btn-success" type="submit">Salvar</button>
			</form>
		</div>
	)
}

export default Formulario;
