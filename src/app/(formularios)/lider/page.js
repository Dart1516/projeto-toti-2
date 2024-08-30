"use client";
/* Formulario com Resolver (React Hoork From + ZOD)*/
import React, { useState } from "react";
import InputMask from "react-input-mask";
import "../../../assets/styles/App.css";
import "../../../assets/styles/SejaVoluntario.css";
import VisibilityOff from "@mui/icons-material/VisibilityOffOutlined";
import Visibility from "@mui/icons-material/VisibilityOutlined";
import { useRouter } from "next/navigation";
import { Api, ApiBrasil } from "../../../services/api";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import Link from "next/link";

function calculateDigitCNPJ(cnpj, tamanho) {
	let soma = 0;
	let pos = tamanho - 7;
	for (let i = tamanho; i >= 1; i--) {
		soma += Number.parseInt(cnpj.charAt(tamanho - i)) * pos--;
		if (pos < 2) {
			pos = 9;
		}
	}
	return soma % 11 < 2 ? 0 : 11 - (soma % 11);
}

function validateCNPJ(cnpj) {
	//Algoritmo dos dígitos verificadores CNPJ
	const cleanedCnpj = cnpj.replace(/\D/g, "");
	if (cleanedCnpj.length !== 14) {
		return false;
	}
	if (/^(\d)\1{13}$/.test(cleanedCnpj)) {
		return false;
	}
	const digito1 = calculateDigitCNPJ(cleanedCnpj, cleanedCnpj.length - 2);
	const digito2 = calculateDigitCNPJ(cleanedCnpj, cleanedCnpj.length - 1);
	return (
		digito1 === Number.parseInt(cleanedCnpj.charAt(12)) &&
		digito2 === Number.parseInt(cleanedCnpj.charAt(13))
	);
}

function calculateDigitCPF(value, tamanho, pesos) {
	let soma = 0;
	for (let i = 1; i <= tamanho; i++) {
		soma += Number.parseInt(value.substring(i - 1, i)) * pesos[i - 1];
	}
	return (soma * 10) % 11 === 10 || (soma * 10) % 11 === 11
		? 0
		: (soma * 10) % 11;
}

function validateCPF(cpf) {
	const cleanedCpf = cpf.replace(/\D/g, "");
	if (cleanedCpf.length !== 11) {
		return false;
	}
	if (/^(\d)\1{10}$/.test(cleanedCpf)) {
		return false;
	}

	const digito1 = calculateDigitCPF(cleanedCpf, 9, [10, 9, 8, 7, 6, 5, 4, 3, 2]);
	const digito2 = calculateDigitCPF(
		cleanedCpf,
		10,
		[11, 10, 9, 8, 7, 6, 5, 4, 3, 2],
	);

	return (
		digito1 === Number.parseInt(cleanedCpf.substring(9, 10)) &&
		digito2 === Number.parseInt(cleanedCpf.substring(10, 11))
	);
}

async function isCEPValid(state) {
	//Verifica o CEP na API Brasil
	try {
		const resp = await ApiBrasil.get(`/${state}`);
		return !resp.data.erro;
	} catch (error) {
		return false;
	}
}

const createFormDataSchema = z.object({
	// Validação com zod
	organization: z
		.string()
		.nonempty("A organização é obrigatório")
		.min(3, "A organização precisa no mínimo 3 carateres")
		.max(100, "A organização precisa no máximo 100 carateres")
		.transform((organization) => {
			return organization
				.trim()
				.split(" ")
				.map((word) => word[0].toLocaleUpperCase().concat(word.substring(1)))
				.join(" ");
		}),
	cnpj: z
		.string()
		.nonempty("CNPJ é obrigatório")
		.regex(
			/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
			"CNPJ inválido. Exemplo: 99.999.999/9999-99",
		)
		.refine(validateCNPJ, "CNPJ inválido"),
	name: z
		.string()
		.nonempty("O Nome é obrigatório")
		.min(3, "O Nome precisa no mínimo 3 carateres")
		.max(50, "O Nome precisa no máximo 50 carateres")
		.transform((name) => {
			return name
				.trim()
				.split(" ")
				.map((word) => word[0].toLocaleUpperCase().concat(word.substring(1)))
				.join(" ");
		}),
	cpf: z
		.string()
		.nonempty("CPF é obrigatório")
		.regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido. Exemplo: 999.999.999-99")
		.refine(validateCPF, "CPF inválido"),
	phoneNumber: z
		.string()
		.nonempty("O número de telefone é obrigatório")
		.regex(
			/^\(\d{2}\)\d{5}-\d{4}$/,
			"Número de telefone inválido. Exemplo: (99)99999-9999",
		),
	area: z
		.string()
		.nonempty("A área é obrigatório")
		.min(3, "A área precisa no mínimo 3 carateres")
		.max(100, "A área precisa no máximo 100 carateres")
		.transform((organization) => {
			return organization
				.trim()
				.split(" ")
				.map((word) => word[0].toLocaleUpperCase().concat(word.substring(1)))
				.join(" ");
		}),
	cep: z
		.string()
		.nonempty("O CEP é obrigatório")
		.regex(/^\d{5}-\d{3}$/, "CEP inválido. Exemplo: 99999-999")
		.refine(isCEPValid, "CEP inválido"),
	state: z.string().optional(),
	address: z.string().optional(),
	email: z
		.string()
		.nonempty("O e-mail é obrigatório")
		.email("Formato de e-mail inválido")
		.transform((email) => email.toLowerCase()),
	verifyEmail: z
		.string()
		.nonempty("A verificação do e-mail é obrigatório")
		.email("Formato de e-mail inválido")
		.transform((verifyEmail) => verifyEmail.toLowerCase()),
	password: z
		.string()
		.nonempty("A senha é obrigatório")
		.min(8, "A senha deve ter no mínimo 8 caracteres")
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%;])(?!.*[#*+&=,.]).{8,}$/,
			"A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número, um caractere especial (@$%;), evite (#*+&=)",
		),
	verifyPassword: z
		.string()
		.nonempty("A senha é obrigatório")
		.min(8, "A senha deve ter no mínimo 8 caracteres")
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%;])(?!.*[#*+&=,.]).{8,}$/,
			"A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número, um caractere especial (@$%;), evite (#*+&=),",
		),
	notes: z.string().optional(),
	termos: z
		.boolean()
		.refine((value) => value, "Você precisa concordar com os termos"),
});

function FormularioLiderImigrante() {
	const router = useRouter();

	const [output, setOutput] = useState("");
	const [isCepFocused, setIsCepFocused] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const dataSuperRefineSchema = createFormDataSchema.superRefine((data, ctx) => {
		if (data.email !== data.verifyEmail) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Os emails não coincidem",
				path: ["verifyEmail"],
			});
		}
		if (data.password !== data.verifyPassword) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "As senhas não coincidem",
				path: ["verifyPassword"],
			});
		}
	});

	const {
		register,
		handleSubmit,
		setValue,
		formState: { isLoading, isSubmitting, errors },
	} = useForm({
		resolver: zodResolver(dataSuperRefineSchema),
	});

	async function handleCEPApi(e) {
		const cepcode = e.target.value;
		setIsCepFocused(true);

		try {
			const resp = await ApiBrasil.get(`/${cepcode}`);
			setValue("state", resp.data.state);
			setValue(
				"address",
				`${resp.data.street}, ${resp.data.neighborhood}, ${resp.data.state}, ${resp.data.cep}`,
			);
		} catch (error) {
			console.error("Erro na API do CEP", error);
			setValue("state", "");
			setValue("address", "");
		} finally {
			setIsCepFocused(false);
		}
	}

	async function createData(formData) {
		const { cep, verifyEmail, verifyPassword, ...dataToSend } = { ...formData };
		// setOutput(JSON.stringify(dataToSend, null, 2));
		console.log("Dados do Formulario ", dataToSend);
		try {
			const response = await Api.post("/cadastro/lideres", dataToSend);
			if (!response.ok) {
				throw new Error("Erro ao enviar dados");
			}
			router.push("../../obrigado-page");
			console.log(response);
		} catch (error) {
			console.error("Erro ao enviar dados:", error);
			setOutput("Cadastro existente, por favor modificar o e-mail ou CPF");
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
				<form onSubmit={handleSubmit(createData)} className="general-inputs">
					<div className="inputs formCadastro">
						{/* Organização */}
						<div className="input-field">
							<label htmlFor="organization">
								<p>1. Nome da ONG que representa</p>
								<span className="errorChar"> * </span>
							</label>
							<input
								className={`input-text ${errors.organization ? "invalid" : "valid"}`}
								type="text"
								placeholder="Digite o nome da ONG"
								{...register("organization")}
							/>
							<ErrorMessage
								className="error-message"
								errors={errors}
								name="organization"
								as="p"
							/>
						</div>

						{/* CNPJ*/}
						<div className="input-field">
							<label htmlFor="cnpj">
								<p>2. CNPJ da ONG</p>
								<span className="errorChar"> * </span>
							</label>
							<InputMask
								mask="99.999.999/9999-99"
								className={`input-text ${errors.cnpj ? "invalid" : "valid"}`}
								placeholder="Digite o CNPJ, um valor numérico"
								{...register("cnpj")}
							/>
							<ErrorMessage
								className="error-message"
								errors={errors}
								name="cnpj"
								as="p"
							/>
						</div>

						{/* Nome */}
						<div className="input-field">
							<label htmlFor="name">
								<p>3. Nome completo do representante legal</p>
								<span className="errorChar"> * </span>
							</label>
							<input
								className={`input-text ${errors.name ? "invalid" : "valid"}`}
								type="text"
								placeholder="Digite seu nome completo"
								{...register("name")}
							/>
							<ErrorMessage
								className="error-message"
								errors={errors}
								name="name"
								as="p"
							/>
						</div>

						{/* CPF*/}
						<div className="input-field">
							<label htmlFor="cpf">
								<p>4. CPF do representante legal</p>
								<span className="errorChar"> * </span>
							</label>
							<InputMask
								mask="999.999.999-99"
								className={`input-text ${errors.cpf ? "invalid" : "valid"}`}
								placeholder="Digite o CPF, um valor numérico"
								{...register("cpf")}
							/>
							<ErrorMessage
								className="error-message"
								errors={errors}
								name="cpf"
								as="p"
							/>
						</div>

						{/* Telefone*/}
						<div className="input-field">
							<label htmlFor="phoneNumber">
								<p>5. Número do whatsApp</p>
								<span className="errorChar"> * </span>
							</label>
							<InputMask
								mask="(99)99999-9999"
								className={`input-text ${errors.phoneNumber ? "invalid" : "valid"}`}
								placeholder="Digite seu número"
								{...register("phoneNumber")}
							/>
							<ErrorMessage
								className="error-message"
								errors={errors}
								name="phoneNumber"
								as="p"
							/>
						</div>

						{/* Area */}
						<div className="input-field">
							<label htmlFor="area">
								<p>6. Área em que trabalha</p>
								<span className="errorChar"> * </span>
							</label>
							<input
								className={`input-text ${errors.area ? "invalid" : "valid"}`}
								type="text"
								placeholder="Digite a área em que trabalha"
								{...register("area")}
							/>
							<ErrorMessage
								className="error-message"
								errors={errors}
								name="area"
								as="p"
							/>
						</div>

						{/* CEP */}
						<div className="input-field">
							<label htmlFor="cep">
								<p> 7. CEP</p>
								<span className="errorChar"> * </span>
							</label>
							<InputMask
								mask="99999-999"
								className={`input-text ${errors.cep ? "invalid" : "valid"}`}
								placeholder="Digite seu CEP, um valor numérico"
								{...register("cep", { onBlur: handleCEPApi })}
							/>
							<ErrorMessage
								className="error-message"
								errors={errors}
								name="cep"
								as="p"
							/>
						</div>

						{/* Endereço */}
						<div className="input-field">
							<label htmlFor="address">
								<p>8. Endereço</p>
								<span className="errorChar"> * </span>
							</label>
							<input
								className={`input-text ${errors.address ? "invalid" : "valid"}`}
								type="text"
								placeholder="Preencha um CEP válido"
								disabled
								{...register("address")}
							/>
							<ErrorMessage
								className="error-message"
								errors={errors}
								name="address"
								as="p"
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
						{/* Email */}
						<div className="input-field">
							<label htmlFor="email">
								<p>E-mail para cadastro</p>
								<span className="errorChar"> * </span>
							</label>
							<input
								className={`input-text ${errors.email ? "invalid" : "valid"}`}
								type="email"
								placeholder="Digite seu e-mail"
								{...register("email")}
							/>
							<ErrorMessage
								className="error-message"
								errors={errors}
								name="email"
								as="p"
							/>
						</div>

						{/* Verifique Email */}
						<div className="input-field">
							<label htmlFor="verifyEmail">
								<p>Verificação do e-mail</p>
								<span className="errorChar"> * </span>
							</label>
							<input
								className={`input-text ${errors.verifyEmail ? "invalid" : "valid"}`}
								type="email"
								placeholder="Confirme seu e-mail"
								{...register("verifyEmail")}
							/>
							<ErrorMessage
								className="error-message"
								errors={errors}
								name="verifyEmail"
								as="p"
							/>
						</div>

						{/* Senha */}
						<div className="input-field">
							<label htmlFor="password">
								<p>Senha</p>
								<span className="errorChar"> * </span>
							</label>
							<div className="input-container">
								<input
									className={`input-text ${errors.password ? "invalid" : "valid"}`}
									type={showPassword ? "text" : "password"}
									placeholder="Crie uma senha"
									{...register("password")}
								/>
								<button
									className="visibility-icon"
									type="button"
									onClick={togglePasswordVisibility}
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</button>
							</div>
							<ErrorMessage
								className="error-message"
								errors={errors}
								name="password"
								as="p"
							/>
						</div>

						{/* Confirmar Senha */}
						<div className="input-field">
							<label htmlFor="verifyPassword">
								<p>Verificação de senha</p>
								<span className="errorChar"> * </span>
							</label>
							<div className="input-container">
								<input
									className={`input-text ${errors.verifyPassword ? "invalid" : "valid"}`}
									type={showPassword ? "text" : "password"}
									placeholder="Confirme sua senha"
									{...register("verifyPassword")}
								/>
								<button
									className="visibility-icon"
									type="button"
									onClick={togglePasswordVisibility}
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</button>
							</div>
							<ErrorMessage
								className="error-message"
								errors={errors}
								name="verifyPassword"
								as="p"
							/>
						</div>
					</div>

					{/* Observações */}
					<div className="opcional">
						<label htmlFor="notes">Observações (opcional)</label>

						<textarlabela
							className="contact-inputs"
							{...register("notes")}
							cols={60}
							rows={10}
							placeholder="Digite suas observações aqui..."
						/>
					</div>

					{/* Termoslegais */}
					<div>
						<div className="legal">
							<input type="checkbox" {...register("termos")} />
							<label htmlFor="termos">
								Confirmo que
								<strong>&nbsp;li e aceito o </strong>
								<Link
									href="../../termo-lider"
									target="_blank"
									rel="noopener noreferrer"
								>
									Termo de Responsabilidade
								</Link>
								&nbsp;como voluntário. E autorizo o uso dos meus dados de acordo com
								a&nbsp;
								<Link
									href="../../aviso-legal"
									target="_blank"
									rel="noopener noreferrer"
								>
									Política de Privacidade.
								</Link>
							</label>
						</div>
						<div className="errorTermo">
							<ErrorMessage
								className="error-message"
								errors={errors}
								name="termos"
								as="p"
							/>
						</div>
					</div>

					<button
						className={`SV${isLoading ? " submit-disabled" : ""}`}
						type="submit"
						disabled={isSubmitting}
					>
						{isSubmitting ? "Carregando..." : "Enviar"}
					</button>
					<pre>{output}</pre>
				</form>
			</div>
			<footer className="App-footer" />
		</div>
	);
}

export default FormularioLiderImigrante;
