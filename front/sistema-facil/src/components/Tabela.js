import React from 'react';
import { 
	NOVO_CADASTRO,
	BUSCANDO_CADASTRO,
	EXCLUINDO_CADASTRO
} from '../actions';
import { useTable, usePagination, useSortBy, useFilters } from 'react-table';
import { useDispatch } from 'react-redux';
import './Tabela.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function Filtro({
	column: { filterValue, setFilter }
}) {
	return (
		<input
			value={filterValue || ''}
			onChange={e => {
				setFilter(e.target.value || undefined);
			}}
			placeholder="Buscar..."
			onClick={e => e.stopPropagation()}
		/>
	);
}

function Tabela({ cadastro, lista }) {
	let columns = React.useMemo(() => cadastro
		.Campos
		.filter(campo => campo.TaNaLista)
		.map(campo => {
			return { Header: campo.Nome, accessor: campo.Nome.toLowerCase() };
		}), [cadastro.Campos]);

	const dispatch = useDispatch();

	const defaultColumn = React.useMemo(
		() => ({
			Filter: Filtro,
		}),
		[]
	);
	
	const {
		getTableProps,
		headerGroups,
		getTableBodyProps,
		prepareRow,
		page,
		canPreviousPage,
		canNextPage,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		state: { pageIndex },
	} = useTable(
		{ columns, data: lista, defaultColumn }, 
		useFilters,
		useSortBy,
		usePagination
	);

	let excluir = (id) => {
		confirmAlert({
			title: 'Exclusão de cadastro',
			message: 'Deseja realmente excluir este cadastro?',
			buttons: [
				{
					label: 'Sim',
					onClick: () => dispatch({ type: EXCLUINDO_CADASTRO, id })
				},
				{
					label: 'Não'
				}
			]
		});
	}

	const paginacao = () => {
		if (pageCount > 1) {
			return (
			<tfoot>
				<tr>
					<td colSpan={columns.length + 1}>
						<button disabled={!canPreviousPage}
							type="button"
							onClick={() => gotoPage(0)}>
							Primeira página
						</button>
						<button disabled={!canPreviousPage}
							type="button"
							onClick={() => previousPage()}>
							Anterior
						</button>
						<button disabled={!canNextPage}
							type="button"
							onClick={() => nextPage()}>
							Próxima	
						</button>
						<button disabled={!canNextPage}
							type="button"
							onClick={() => gotoPage(pageCount - 1)}>
							Última página	
						</button>
					</td>
				</tr>
			</tfoot>

			);
		} else return null;
	}
	
	return (
		<div>
			<h2>{cadastro.Nome}</h2>
			<button onClick={() => dispatch({ type: NOVO_CADASTRO })} className="btn-info">Incluir</button>

			<table {...getTableProps}>
			<thead>
				{headerGroups.map(headerGroup => (
					<tr {...headerGroup.getHeaderGroupProps()}>
					{headerGroup.headers.map(column => (
						<th {...column.getHeaderProps(column.getSortByToggleProps())}>
							{column.render('Header')}
							<span>
								{column.isSorted
									? column.isSortedDesc
										? ' \u2191'
										: ' \u2193'
									: ''}
							</span>
							<div>
								{column.canFilter ? column.render('Filter') : null}
							</div>
						</th>
					))}
					<th>&nbsp;</th>
					</tr>
				))}
			</thead>
			<tbody {...getTableBodyProps()}>
				{page.map((row, i) => {
					prepareRow(row)
					return(
						<tr {...row.getRowProps()}>
							{row.cells.map(cell => {
								return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
							})}
							<td className="Acoes">
								<button className="btn-info" 
									type="button"
									onClick={() => dispatch({ type: BUSCANDO_CADASTRO, id: row.original.id})}>
									Editar
								</button>

								<button className="btn-danger"
									type="button"
									onClick={() => excluir(row.original.id)}>
									Excluir
								</button>

							</td>
						</tr>
					)
				})}
			</tbody>
			{paginacao()}
			</table>
		</div>
	)
}

export default Tabela;
