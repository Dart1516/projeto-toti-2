"use client";

import React, { useState } from "react";
import InputMask from "react-input-mask";
import "../../../assets/styles/App.css";
import "../../../assets/styles/SejaVoluntario.css";
import VisibilityOff from "@mui/icons-material/VisibilityOffOutlined";
import Visibility from "@mui/icons-material/VisibilityOutlined";
import { IconButton, Input, InputAdornment } from "@mui/material";
import { useRouter } from "next/navigation";
import Header from "../../../components/Header-NavMenu";
import { Api, ApiBrasil } from "../../../services/api";

function FormularioLiderImigrante() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		organization: "",
		cnpj: "",
		name: "",
		cpf: "",
		phoneNumber: "",
		area: "",
		state: "",
		address: "",
		email: "",
		verifyEmail: "",
		password: "",
		verifyPassword: "",
		notes: "",
		termos: false,
	});
	const [passwordError, setPasswordError] = useState("");
	const [passwordMatchError, setPasswordMatchError] = useState("");
	const [emailMatchError, setEmailMatchError] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [errorEmail, setErrorEmail] = useState("");
	const [errorCpf, setErrorCpf] = useState("");
	const [errors, setErrorField] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showPasswordVerify, setShowPasswordVerify] = useState(false);
	const handleTogglePasswordVerify = () => {
		setShowPasswordVerify(!showPasswordVerify);
	};
	const [isCepFocused, setIsCepFocused] = useState(false);
	const [addressAPi, setAddressAPi] = useState({
		state: "",
		street: "",
		neighborhood: "",
		city: "",
		cep: "",
	});

	const validateForm = (form) => {
		form.notes = undefined;
		const emptyFields = Object.keys(form).reduce((acc, key) => {
			if (!form[key]) {
				acc.push(key);
			}
			return acc;
		}, []);
		const isNotEmpty = Object.keys(form).every((key) => form[key]);
		if (emptyFields.length > 0) {
			const firstEmptyField = emptyFields[0];
			// Procura o 1 campo vazio e foca o cursor
			const inputElement = document.querySelector(`#${firstEmptyField}`);
			if (inputElement) {
				inputElement.focus();
			} else {
				const inputElementByName = document.querySelector(
					`input[name="${firstEmptyField}"]`,
				);
				if (inputElementByName) {
					inputElementByName.focus();
				} else {
					console.error(`Campo "${firstEmptyField}" não encontrado`);
				}
			}
			setError(
				"Para continuar, por favor, preencha todos os campos obrigatórios.",
			);
			if (firstEmptyField === "termos" && !form.termos) {
				setError(
					"Para enviar o formulário, você precisa ler e concordar com os nossos termos e condições.",
				);
			}
		} else if (!form.termos) {
			setError(
				"Para enviar o formulário, você precisa ler e concordar com os nossos termos e condições.",
			);
		}
		// return isNotEmpty;
		return emptyFields.length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		const result = validateForm({ ...formData });
		if (!result) {
			setIsLoading(false);
			return;
		}
		const normalizedEmail = formData.email.toString().toLowerCase();
		const adrressCEPAll = formData.address.split(",");
		const stateCEP = adrressCEPAll[2].trim();
		console.log("Estado", stateCEP);
		const dataToSend = {
			...formData,
			notes: formData.notes || "",
			email: normalizedEmail,
			state: stateCEP,
		};

		dataToSend.verifyEmail = undefined;
		dataToSend.verifyPassword = undefined;
		try {
			const response = await Api.post("/cadastro/lideres", dataToSend);
			router.push("../../obrigado-page");
		} catch (error) {
			console.error("Erro ao enviar dados:", error);
			if (
				error.response?.data?.message?.includes(
					"O CPF informado já está cadastrado",
				)
			) {
				setErrorCpf("O CPF informado já está cadastrado");
				setError("Erro ao enviar dados: O CPF informado já está cadastrado");
			} else if (
				error.response?.data?.message?.includes(
					"O E-mail informado já está cadastrado",
				)
			) {
				setErrorEmail("O E-mail informado já está cadastrado");
				setError("Erro ao enviar dados: O E-mail informado já está cadastrado");
			} else {
				setError(
					`Erro ao enviar dados: ${error.response?.data?.message || error.message}`,
				);
			}
		}
		setIsLoading(false);
	};

	const handleTermsChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.checked });
	};

	const resetEmailError = () => {
		setErrorEmail("");
	};
	const resetError = () => {
		setErrorField("");
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});

		if (name === "password") {
			validatePassword(value);
		}

		if (name === "verifyPassword") {
			setPasswordMatchError(
				value !== formData.password ? " As senhas não coincidem." : "",
			);
		}

		if (name === "verifyEmail") {
			setEmailMatchError(
				value !== formData.email ? "Os e-mails não coincidem." : "",
			);
		}
		if (name === "email") {
			const emailValue = formData.email;
			const isValidEmail =
				emailValue.length !== 0 &&
				emailValue.match(/^[\w-.]+@[\w-.]+\.[a-zA-Z]{2,}$/i);
			setErrorEmail(!isValidEmail);
		}
		const validationFields = [
			"organization",
			"cnpj",
			"phoneNumber",
			"area",
			"state",
			"address",
		];
		for (const fieldName of validationFields) {
			const fieldValue = formData[fieldName];
			if (fieldValue.trim() === "") {
				setErrorField(fieldName);
			}
			return;
		}
	};

	const validatePassword = (password) => {
		const errors = [];
		// Escapar caracteres #*+&=,. (bug)antes de validar
		const escapedPassword = password.replace(/[#*+&=,.]/g, "\\$&");
		if (!/(?=.*[a-z])/.test(password)) errors.push("Falta minúscula.");
		if (!/(?=.*[A-Z])/.test(password)) errors.push("Falta maiúscula.");
		if (!/(?=.*\d)/.test(password)) errors.push("Falta número.");
		if (!/(?=.*[@$%^;])/.test(password)) errors.push("Falta símbolo. (@$%;)");
		if (password.length < 8) errors.push("A senha deve conter 8 caracteres.");
		if (!/^[A-Za-z0-9!@$%^*()_{}|:;'<>/?~-]+$/.test(escapedPassword)) {
			errors.push("Os caracteres (#*+&=,.) não são permitidos.");
		}
		setPasswordError(errors);
	};

	const handleTogglePassword = () => {
		setShowPassword(!showPassword);
	};

	async function handleCEPApi(e) {
		//Usando a API Brasil para trouxer o endereço
		const cepcode = e.target.value;
		if (cepcode === "") {
			setAddressAPi({
				state: "",
				street: "",
				neighborhood: "",
				city: "",
				cep: "",
			});
		}
		setIsCepFocused(false);
		try {
			const resp = await ApiBrasil.get(`/${cepcode}`);
			setIsCepFocused(true);
			setAddressAPi({
				state: resp.data.state,
				street: resp.data.street,
				neighborhood: resp.data.neighborhood,
				city: resp.data.city,
				cep: resp.data.cep,
			});
			setFormData({
				...formData,
				address: `${resp.data.street}, ${resp.data.neighborhood}, ${resp.data.state}, ${resp.data.cep}`,
			});
		} catch (error) {
			console.error("Erro na API do CEP", error);
			setAddressAPi({
				state: "",
				street: "",
				neighborhood: "",
				city: "",
				cep: "",
			});
		}
	}

	return (
		<div className="App SV">
			<div className="background-image" />
			<div className="container">
				<div className="container-titulo">
					<h2>SOS Rio Grande do Sul </h2>
					<h2>
						Cadastro de Liderança de ONG para Imigrantes, Refugiados e Apátridas
					</h2>
				</div>
				<form className="general-inputs">
					<div className="inputs formCadastro">
						<div className="input-field">
							<h4>
								1. Nome da ONG que representa<span>*</span>
							</h4>
							<input
								className={`input-text ${errors.organization ? "invalid" : "valid"}`}
								type="text"
								name="organization"
								placeholder="Digite o nome da ONG"
								value={formData.organization}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className="input-field">
							<h4>
								2. CNPJ da ONG<span>*</span>
							</h4>
							<InputMask
								mask="99.999.999/9999-99"
								value={formData.cnpj}
								onChange={handleInputChange}
								placeholder="Digite seu CNPJ O valor deve ser numérico"
								required
								className={`input-text ${errors.cnpj ? "invalid" : ""}`}
								name="cnpj"
								pattern="\d{2}\.\d{3}\.\d{3}\\d{4}-\d{2}"
								onFocus={() => resetError()}
							/>
						</div>
						<div className="input-field">
							<h4>
								3. Nome Completo do Representante Legal<span>*</span>
							</h4>
							<input
								className={`input-text ${errors.name ? "invalid" : "valid"}`}
								type="text"
								name="name"
								placeholder="Digite seu nome"
								value={formData.name}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className="input-field">
							<h4>
								4. CPF Do representante Legal <span>*</span>
							</h4>
							<InputMask
								mask="999.999.999-99"
								value={formData.cpf}
								onChange={handleInputChange}
								placeholder="Digite seu CPF O valor deve ser numérico"
								required
								className={`input-text ${errorCpf ? "invalid" : "valid"}`}
								pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
								name="cpf"
							/>
							{errorCpf && <p style={{ color: "#ae0000" }}>{errorCpf}</p>}
						</div>
						<div className="input-field">
							<h4>
								5. Número do WhatsApp do Representante<span>*</span>
							</h4>
							<InputMask
								mask="(99) 99999-9999"
								value={formData.phoneNumber}
								onChange={handleInputChange}
								placeholder="(DDD) Digite o número"
								required
								pattern="\(\d{2}\) \d{5}-\d{4}"
								className={`input-text ${errors.phoneNumber ? "invalid" : "valid"}`}
								name="phoneNumber"
							/>
						</div>
						<div className="input-field">
							<h4>
								6. Área em que trabalha <span>*</span>
							</h4>
							<input
								type="text"
								name="area"
								value={formData.area}
								onChange={handleInputChange}
								placeholder="Digite a área em que trabalha"
								className={`input-text ${errors.area ? "invalid" : "valid"}`}
								required
							/>
						</div>
						<div className="input-field">
							<h4>
								7. CEP <span>*</span>
							</h4>
							<InputMask
								mask="99999-999"
								value={formData.state}
								onChange={handleInputChange}
								placeholder="Digite seu CEP O valor deve ser numérico"
								required
								className={`input-text ${errors.cep ? "invalid" : ""}`}
								name="state"
								pattern="\d{5}-\d{3}"
								onFocus={() => resetError()}
								onBlur={handleCEPApi}
							/>
						</div>
						<div className="input-field">
							<h4>
								8. Endereço <span>*</span>
							</h4>
							<input
								type="text"
								name="address"
								disabled
								// value={formData.address}
								// value={`${addressAPi.street}, ${addressAPi.neighborhood}, ${addressAPi.state}`}
								value={
									isCepFocused && addressAPi.street // Only show address if CEP is focused and API data is available
										? `${addressAPi.street}, ${addressAPi.neighborhood}, ${addressAPi.state}, ${addressAPi.cep}`
										: ""
								}
								onChange={handleInputChange}
								placeholder="Preencha o CEP"
								required
								className={`input-text ${errors.address ? "invalid" : "valid"}`}
							/>
						</div>
					</div>

					<div className="lembre-text">
						<h1>Lembre-se:</h1>
						<p>
							Seu e-mail e senha cadastrados serão seu login para o acesso na
							plataforma
						</p>
						<p>
							Após preencher todos os seus dados clique em <strong>Enviar</strong> e
							seu cadastro estará completo
						</p>
					</div>
					<div className="inputs formCadastro">
						<div className="input-field">
							<h4>
								Email para cadastro<span>*</span>
							</h4>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleInputChange}
								placeholder="Digite seu e-mail"
								required
								// toLowerCase
								className={`input-text ${errorEmail ? "invalid" : "valid"}`}
								onFocus={() => resetEmailError()}
							/>
							{errorEmail && <p style={{ color: "#ae0000" }}>{errorEmail}</p>}
						</div>
						<div className="input-field">
							<h4>
								Verificação do Email<span>*</span>
							</h4>
							<input
								type="email"
								name="verifyEmail"
								value={formData.verifyEmail}
								onChange={handleInputChange}
								placeholder="Confirme o  seu e-mail"
								required
								className={`input-text ${emailMatchError ? "invalid" : "valid"}`}
							/>
							{emailMatchError && <p style={{ color: "red" }}>{emailMatchError}</p>}
						</div>
						<div className="input-field">
							<h4>
								Senha<span>*</span>
							</h4>
							<Input
								type={showPassword ? "text" : "password"}
								name="password"
								value={formData.password}
								onChange={handleInputChange}
								placeholder="Crie sua senha"
								required
								className={`input-text ${passwordError ? "invalid" : "valid"}`}
								inputProps={{
									//pattern: "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@$%^&*()_{}|:;'<>/?~])[A-Za-z0-9!@$%^&*()_{}|:;'<>/?~]{8}$",
									// https://regex101.com/ Para verificar o pattern
									pattern:
										"^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@$%^&*git()_{}|:;'<>?~])[A-Za-z0-9!@$%^&*()_{}|:;'<>?~]{8}$",
								}}
								endAdornment={
									<InputAdornment position="end">
										<IconButton onClick={handleTogglePassword}>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
							/>
							{passwordError.length > 0 && (
								<ul className="error-message">
									{passwordError.map((error) => (
										<li key={`error-${error}`}>{error}</li>
									))}
								</ul>
							)}
						</div>
						<div className="input-field">
							<h4>
								Verificação de Senha<span>*</span>
							</h4>
							<Input
								type={showPasswordVerify ? "text" : "password"}
								name="verifyPassword"
								value={formData.verifyPassword}
								onChange={handleInputChange}
								placeholder="Confirme a sua senha"
								required
								className={`input-text ${passwordMatchError ? "invalid" : "valid"}`}
								endAdornment={
									<InputAdornment position="end">
										<IconButton onClick={handleTogglePasswordVerify}>
											{showPasswordVerify ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
							/>
							{passwordMatchError && (
								<p style={{ color: "red" }}>{passwordMatchError}</p>
							)}
						</div>
					</div>
					<div className="opcional">
						<h4>Observação (opcional)</h4>
						<textarea
							name="notes"
							cols="60"
							rows="10"
							placeholder="Sua mensagem"
							className="contact-inputs"
							value={formData.notes}
							onChange={handleInputChange}
						/>
					</div>
					<div className="legal">
						<input
							type="checkbox"
							id="termos"
							name="termos"
							onChange={handleTermsChange}
							required
							checked={formData.termos}
						/>
						<label htmlFor="termos">
							Ao marcar esta caixa e clicar em Enviar, aceito o tratamento de meus
							dados pessoais por{" "}
							<a href="/avisoLegal" target="_blank" rel="noreferrer">
								Toters do Bem
							</a>{" "}
							conforme explicado no seu{" "}
							<a href="/avisoLegal" target="_blank" rel="noreferrer">
								Aviso Legal de Proteção de Dados
							</a>
							, que inclui: 1) a coordenação e gestão de voluntários, e 2) a
							comunicação sobre atividades e oportunidades relacionadas.
						</label>
					</div>
					{error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}
					<button
						className={`SV${isLoading ? " submit-disabled" : ""}`}
						type="submit"
						onClick={handleSubmit}
						disabled={isLoading}
					>
						Enviar
					</button>
				</form>
			</div>
			<footer className="App-footer" />
		</div>
	);
}

export default FormularioLiderImigrante;
