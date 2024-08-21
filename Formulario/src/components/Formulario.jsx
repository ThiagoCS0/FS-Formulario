import { useState } from "react";

const MeuFormulario = () => {
	const [formulario, setFormulario] = useState({ nome: '', email: '', senha: '', confSenha: '' })
	const [enviado, setEnviados] = useState(false)
	const [erros, setErrors] = useState({})
	const validar = () => {
		const novosErros = {}
		if (!formulario.nome) { novosErros.nome = "Campo obrigatório" }
		if (!formulario.email) { novosErros.email = "Campo obrigatório" } else if (!/\S+@\S+\.\S/.test(formulario.email)) { novosErros.email = "Email Inválido" }
		if (!formulario.senha) { novosErros.senha = "Campo obrigatório" } else if (formulario.senha.length < 8) { novosErros.senha = "A senha deve ter 8 dígitos ou mais" }
		if (!formulario.confSenha) { novosErros.confSenha = "Campo obrigatório" } else if (formulario.confSenha != formulario.senha) { novosErros.confSenha = "As duas senhas deve ser iguais" }
		return novosErros
	}

	const handleChange = (event) => { setFormulario({ ...formulario, [event.target.name]: event.target.value }) }
	const handleSubmit = (event) => {
		event.preventDefault(); const validarErros = validar();
		if (Object.keys(validarErros).length == 0) { setEnviados(true); setErrors({}); } else { setEnviados(false); setErrors(validarErros); }
	}

	return (
		<div>
			<h2>Registre-se</h2>
			{enviado && <p id="sucesso">Registrado com sucesso!</p>}
			<form onSubmit={handleSubmit}>
				<div><label>NOME</label><input type="text" name="nome" value={formulario.nome} onChange={handleChange} />{erros.nome && <p>{erros.nome}</p>}</div>
				<div><label>EMAIL</label> <input type="text" name="email" value={formulario.email} onChange={handleChange} />{erros.email && <p>{erros.email}</p>}</div>
				<div id="dSenha">
					<div><label>SENHA</label> <input type="text" name="senha" value={formulario.senha} onChange={handleChange} />{erros.senha && <p>{erros.senha}</p>}</div>
					<div><label>REPITA A SENHA</label> <input type="text" name="confSenha" value={formulario.confSenha} onChange={handleChange} />{erros.confSenha && <p>{erros.confSenha}</p>}</div>
				</div>
				<button type="submit">Registrar</button>
			</form>
		</div>
	)
}
export default MeuFormulario