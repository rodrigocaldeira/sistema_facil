import React from 'react';
import './SistemaFacil.css';
import MenuContainer from '../containers/MenuContainer';
import Tabela from './Tabela';
import buscarCadastros from '../services/MenuService';
import { listarDados, buscarCadastro, excluirCadastro } from '../services/CadastroService';
import { EstadoGeral } from '../actions';
import FormularioContainer from '../containers/FormularioContainer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class SistemaFacil extends React.Component {
	componentDidMount() {
		buscarCadastros()
			.then(cadastros => {
				this.props.onInit({ cadastros });
			});
	}

	render() {
		this.eventHandler();
		let telaAtual = this.getTelaAtual();
		return (
			<div className="SistemaFacil">
				<MenuContainer />
				<div className="SistemaFacil-body">
					{telaAtual}
				</div>
				<ToastContainer />
			</div>
		);
	}

	eventHandler() {
		switch (this.props.estadoGeral) {
			case EstadoGeral.ListandoDados:
				listarDados(this.props.cadastro)
					.then(lista => {
						this.aplicarMascaraDeData(lista);
						this.props.onDadosListados({ lista });
					});
				break;
			
			case EstadoGeral.CadastroIncluido:
				this.props.onCadastroIncluido();
				toast.success("Cadastro incluído com sucesso!");
				break;

			case EstadoGeral.CadastroEditado:
				this.props.onCadastroEditado();
				toast.success("Cadastro editado com sucesso!");
				break;

			case EstadoGeral.BuscandoCadastro:
				buscarCadastro(this.props.cadastro, this.props.id)
					.then(dados => {
						this.props.onDadosBuscados({ dados });	
					});
				break;

			case EstadoGeral.ExcluindoCadastro:
				excluirCadastro(this.props.cadastro, this.props.id)
					.then(() => {
						toast.success("Cadastro excluído com sucesso!");
						this.props.onCadastroExcluido();
					});
				break;

			default: return;

		}
	}

	aplicarMascaraDeData(lista) {
		this
			.props
			.cadastro
			.Campos
			.filter(campo => campo.TaNaLista && campo.Tipo === "Data")
			.map(campo => campo.Nome.toLowerCase())
			.forEach(campo => {
				lista.forEach(registro => {
					if (registro[campo] !== undefined && registro[campo] !== "") {
						registro[campo] = new Date(registro[campo]).toLocaleDateString("pt-BR");
					}
				})
			});
	}

	getTelaAtual() {
		switch (this.props.estadoGeral) {
			case EstadoGeral.DadosListados:
				return <Tabela cadastro={this.props.cadastro} lista={this.props.lista} />;

			case EstadoGeral.NovoCadastro:
			case EstadoGeral.EditandoCadastro:
				return <FormularioContainer />;

			default:
				return null;
		}
	}
}

export default SistemaFacil
