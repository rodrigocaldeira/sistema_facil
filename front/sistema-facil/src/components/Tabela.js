import React from 'react';
import { EstadoGeral, NOVO_CADASTRO } from '../actions';
import { useTable, usePagination } from 'react-table';
import { useSelector, useDispatch } from 'react-redux';
import './Tabela.css';

function Tabela() {

	let cadastro = useSelector(state => state.cadastro);
	let estadoGeral = useSelector(state => state.estadoGeral);
	let lista  = useSelector(state => state.lista);

	let columns = cadastro.Campos.map(campo => {
		return { Header: campo.Nome, accessor: campo.Nome.toLowerCase() }; 
	});

	const dispatch = useDispatch();
	
	const {
		getTableProps,
		headerGroups,
		getTableBodyProps,
		prepareRow,
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize },
	} = useTable({ columns, data: lista, initialState: { pageIndex: 0 } }, usePagination);

	if (estadoGeral === EstadoGeral.DadosListados) {
		return (
			<div>
				<h2>{cadastro.Nome}</h2>
				<button onClick={() => dispatch({ type: NOVO_CADASTRO })}>Incluir</button>

				<table {...getTableProps}>
					<thead>
						{headerGroups.map(headerGroup => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map(column => (
								<th {...column.getHeaderProps()}>{column.render('Header')}</th>
							))}
						</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()} >
						{page.map((row, i) => {
						prepareRow(row)
							return(
								<tr {...row.getRowProps()}>
									{row.cells.map(cell => {
										return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
									})}
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		)
	} else return null;
}

export default Tabela;
