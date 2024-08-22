"use client";
import React, { useState } from "react";
import Header from "../../../components/Header-NavMenu";
import "../../../assets/styles/Button.css";
import "../../../assets/styles/recuperarSenha.css";
import { Typography } from "@mui/material";
import { Api } from "../../../services/api";

const RecuperarSenha = () => {
	const [initialForm, setInitialForm] = useState({
		email: "",
		code: "",
		newPassword: "",
	});
	const [form, setForm] = useState(initialForm);
	const [step, setStep] = useState(1);
	const [error, setError] = useState("");
	const [email, setEmailValidação] = useState("");
	const [userId, setUserId] = useState(null);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setForm({
			...form,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const normalizedEmail = form.email.toLowerCase();
			const response = await Api.post(
				`/recoverypassword/email?email=${normalizedEmail}`,
			);
			if (response.data === "Código de verificacao enviado com sucesso.") {
				//Retornar o da busqueda do POST ou fazer o Get para os otras tabelas
				const responseID = await Api.get(`/lideres?email=${normalizedEmail}`);
				if (responseID.data && responseID.data.length > 0) {
					const user = responseID.data[0];
					if (user.id) {
						setUserId(user.id);
					} else {
						console.error("O usuário não possui um ID válido");
						setError("Ocorreu um erro ao obter o ID do usuário");
					}
				} else {
					setError("Usuário não encontrado.");
				}
				console.log("Dados enviados com sucesso:", response.data);
				setError("");
				setStep(2);
				setInitialForm("");
				if (response.data.length === 0) {
					setError("Usuário não encontrado.");
					setEmailValidação(response.data.email);
					return;
				}
			}
		} catch (error) {
			console.error("Erro ao verificar usuário:", error.response?.data);
			setError(
				error.response?.data?.message || "Ocorreu um erro. Tente novamente.",
			);
		}
	};

	const handleVerifyCode = async () => {
		const { code, newPassword } = form;
		console.log(`Codigo  ${code} e senha ${newPassword}`);
		setError("");
		setStep(3);
	};

	const handleNewPasswordSubmit = async (e) => {
		e.preventDefault();
		console.log(
			`Datos para atualizar a senha, Id Usuario : ${userId} senha nueva : ${form.newPassword}`,
		);
		//Fazer push para actualizar a senha
		alert("Por actualizar");
	};

	const renderStep = () => {
		switch (step) {
			case 1:
				return (
					<div className="form-recovery-password">
						<h2>Recuperar senha</h2>
						<div className="form-method">
							<label htmlFor="email" id="email-label">
								Email:
							</label>
							<input
								type="email"
								id="email"
								name="email"
								value={form.email}
								onChange={handleInputChange}
								placeholder="Ingrese su correo electrónico"
								required
								className="input-method"
							/>
						</div>

						<button className="btnRecuperarSenha" onClick={handleSubmit}>
							Enviar código
						</button>
						{error && <p className="error">{error}</p>}
					</div>
				);
			case 2:
				return (
					<div className="form-recovery-password">
						<h2>Validar código</h2>
						<div className="form-method">
							<label htmlFor="code">Código:</label>
							<input
								type="text"
								id="code"
								name="code"
								value={form.code}
								onChange={handleInputChange}
								placeholder="Ingrese el código recibido"
								required
								className="input-method"
							/>
						</div>
						{error && <p className="error">{error}</p>}
						<div className="form-method">
							<label htmlFor="newPassword">Nova Senha:</label>
							<input
								type="password"
								id="newPassword"
								name="newPassword"
								value={form.newPassword}
								onChange={handleInputChange}
								placeholder="Ingrese su nueva contraseña"
								required
								className="input-method"
							/>
						</div>
						<div className="form-recovery-button">
							<button className="btnRecuperarSenha" onClick={() => setStep(1)}>
								Voltar
							</button>
							<button className="btnRecuperarSenha" onClick={handleVerifyCode}>
								Atualizar senha
							</button>
						</div>
					</div>
				);
			case 3:
				return (
					<div className="form-recovery-password">
						<h2>Nova senha</h2>
						<p>Senha restablecida com sucesso.</p>
						<div className="form-recovery-button">
							<button className="btnRecuperarSenha" onClick={() => setStep(1)}>
								Voltar
							</button>
							<button className="btnRecuperarSenha" onClick={handleNewPasswordSubmit}>
								Fazer login
							</button>
						</div>
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<div id="">
			<Header />
			<div className="background-image" />
			<div id="container">
				<div id="body">
					<Typography variant="h4" color="black">
						Recuperar senha
					</Typography>
					{renderStep()}
				</div>
			</div>
		</div>
	);
};

export default RecuperarSenha;
