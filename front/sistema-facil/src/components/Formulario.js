import React from 'react';
import Campo from './Campo';
import { useDispatch, useSelector } from 'react-redux';
import { DADOS_LISTADOS, CADASTRO_INCLUIDO } from '../actions';
import axios from 'axios';

function Formulario() {
	
	let lista = useSelector(state => state.lista);
	let cadastro = useSelector(state => state.cadastro);

	let dispatch = useDispatch();

	let campos = cadastro.Campos.map(campo => {
		return { nome: campo.Nome, tipo: campo.Tipo, valor: null }
	});

	let salvar = event => {
		event.preventDefault();
		let valores = {};
		campos.forEach(campo => {
			valores[campo.nome.toLowerCase()] = campo.valor;
		});

		let payload = {
			__cadastro: cadastro.Nome,
			__valores: {
				...valores
			}
		};

		axios.post('http://localhost:8080/api/incluir', payload)
			.then(response => dispatch({ type: CADASTRO_INCLUIDO }));
	}

	
	return (
		<form onSubmit={salvar}>
			{campos.map(campo => {
				return <Campo key={campo.nome} campo={campo} />
			})}
			<button type="button" onClick={(event) => {
				event.preventDefault();
				dispatch({ type: DADOS_LISTADOS, lista });
			}}>Cancelar</button>
			<button type="submit">Salvar</button>
		</form>
	)
}

export default Formulario;
