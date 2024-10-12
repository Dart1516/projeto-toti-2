"use client";
import React, { useState } from "react";
import Header from "../../../components/Header-NavMenu";
// import "../../../assets/styles/Button.css";
// import "../../../assets/styles/recuperarSenha.css";
import styles1 from "../../../assets/styles/Button.module.css";
import styles2 from "../../../assets/styles/recuperarSenha.module.css";

import { Typography } from "@mui/material";
import { Api } from "../../../services/api";
import { useRouter } from "next/navigation";

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

	const router = useRouter();

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
			const response = await Api.post("/send/verifycode", {
				email: normalizedEmail,
			});
			console.log(`response: ${response.data}`);

			if (response.data === "Código de verificacao enviado com sucesso. ") {
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
				setInitialForm({
					email: normalizedEmail,
					code: "",
					newPassword: "",
				});

				setStep(2);
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

		try {
			/* Faz a atualização de senha com verificação do código na API */
			const response = await Api.put("/atualizarSenha", {
				email: form.email,
				password: newPassword,
				code: code,
			});

			if (response.status === 200) {
				setError("");
				setStep(3);
			}
		} catch (error) {
			console.error("Erro ao atualizar senha:", error.response?.data);
			setError(
				error.response?.data?.message || "Ocorreu um erro. Tente novamente.",
			);
		}
	};

	const handleNewPasswordSubmit = async (e) => {
		e.preventDefault();
		//Fazer push para actualizar a senha
		router.push("/acesso");
	};

	const renderStep = () => {
		switch (step) {
			case 1:
				return (
					<div className={styles2["form-recovery-password"]}>
						<h2>Recuperar senha</h2>
						<div className={styles2["form-method"]}>
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
								className={styles2["input-method"]}
							/>
						</div>

						<button className={styles2.btnRecuperarSenha} onClick={handleSubmit}>
							Enviar código
						</button>
						{error && <p className="error">{error}</p>}
					</div>
				);
			case 2:
				return (
					<div className={styles2["form-recovery-password"]}>
						<h2>Validar código</h2>
						<div className={styles2["form-method"]}>
							<label htmlFor="code">Código:</label>
							<input
								type="text"
								id="code"
								name="code"
								value={form.code}
								onChange={handleInputChange}
								placeholder="Ingrese el código recibido"
								required
								className={styles2["input-method"]}
							/>
						</div>
						<div className={styles2["form-method"]}>
							<label htmlFor="newPassword">Nova Senha:</label>
							<input
								type="password"
								id="newPassword"
								name="newPassword"
								value={form.newPassword}
								onChange={handleInputChange}
								placeholder="Ingrese su nueva contraseña"
								required
								className={styles2["input-method"]}
							/>
						</div>
						<div className={styles2["form-recovery-button"]}>
							<button className={styles2.btnRecuperarSenha} onClick={() => setStep(1)}>
								Voltar
							</button>
							<button className={styles2.btnRecuperarSenha} onClick={handleVerifyCode}>
								Atualizar senha
							</button>
						</div>
						{error && (
							<p className="error" style={{ color: "red" }}>
								{error}
							</p>
						)}
					</div>
				);
			case 3:
				return (
					<div className={styles2["form-recovery-password"]}>
						<h2>Nova senha</h2>
						<p>Senha restablecida com sucesso.</p>
						<div className={styles2["form-recovery-button"]}>
							<button className={styles2.btnRecuperarSenha} onClick={() => setStep(1)}>
								Voltar
							</button>
							<button
								className={styles2.btnRecuperarSenha}
								onClick={handleNewPasswordSubmit}
							>
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
