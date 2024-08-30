"use client";
/* Formulario com Resolver (React Hoork From + ZOD)*/
import React, { useState } from "react";
import InputMask from "react-input-mask";
import "../../../assets/styles/App.css";
import "../../../assets/styles/SejaVoluntario.css";
import VisibilityOff from "@mui/icons-material/VisibilityOffOutlined";
import Visibility from "@mui/icons-material/VisibilityOutlined";
// import { IconButton, InputAdornment } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Api } from "../../../services/api";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import * as yup from "yup";
import moment from "moment";

// import { IconButton, Input, InputAdornment } from "@mui/material";
// import { FaPlus, FaTrash } from "react-icons/fa";

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

function eighteenYearsAgo() {
	const today = new Date();
	today.setFullYear(today.getFullYear() - 18);
	return today;
}

const createFormDataSchema = z.object({
	// Validação com zod
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
	birthDate: z
		.string()
		.nonempty("A data de nascimento é obrigatória")
		.refine(
			(value) =>
				yup
					.date()
					.min(new Date("1920-01-01"))
					.max(eighteenYearsAgo())
					.isValidSync(value),
			"Edade mínima permitida é 18 anos",
		),
	phoneNumber: z
		.string()
		.nonempty("O número de telefone é obrigatório")
		.regex(
			/^\(\d{2}\)\d{5}-\d{4}$/,
			"Número de telefone inválido. Exemplo: (99)99999-9999",
		),
	rede_social: z.string().nonempty("URl é obrigatório"),
	crp: z
		.string()
		.nonempty("O CRP é obrigatório")
		.regex(/^\d{2}-\d{6}$/, "Formato do CRP inválido. Exemplo: 99-999999"),
	specialization: z.string().nonempty("A área é obrigatório"),
	state: z.string().nonempty("O estado é obrigatório"),
	day: z.string().nonempty("Selecione um dia"),
	hour: z.string().nonempty("Selecione a hora"),
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

function FormularioPsicologo() {
	const router = useRouter();

	const [output, setOutput] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [additionalDays, setAdditionalDays] = useState([{ day: "", hour: "" }]);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const areasPsychology = [
		{ value: "", label: "Selecione uma área" },
		{ value: "Análise do Comportamento", label: "Análise do Comportamento" },
		{
			value: "Aconselhamento Psicologico",
			label: "Aconselhamento Psicológico",
		},
		{ value: "Neuropsicologia", label: "Neuropsicologia" },
		{ value: "Psicanalise", label: "Psicanálise" },
		{ value: "Psicologia Analítica", label: "Psicologia Analítica" },
		{ value: "Psicologia Aplicada", label: "Psicologia Aplicada" },
		{ value: "Psicologia Clinica", label: "Psicologia Clínica" },
		{
			value: "Psicologia Clinica Infantil",
			label: "Psicologia Clínica Infantil",
		},
		{ value: "Psicologia Clinica Adulto", label: "Psicologia Clínica Adulto" },
		{ value: "Psicologia Comunitaria", label: "Psicologia Comunitária" },
		{ value: "Psicologia Da Saude", label: "Psicologia da Saúde" },
		{ value: "Psicologia da Migração", label: "Psicologia da Migração" },
		{
			value: "Psicologia Do Desenvolvimento",
			label: "Psicologia do Desenvolvimento",
		},
		{ value: "Psicologia Do Esporte", label: "Psicologia do Esporte" },
		{ value: "Psicologia Educacional", label: "Psicologia Educacional" },
		{ value: "Psicologia Experimental", label: "Psicologia Experimental" },
		{ value: "Psicologia Forense", label: "Psicologia Forense" },
		{ value: "Psicologia Infantil", label: "Psicologia Infantil" },
		{ value: "Psicologia Organizacional", label: "Psicologia Organizacional" },
		{
			value: "Psicologia Organizacional RH",
			label: "Psicologia Organizacional (RH)",
		},
		{ value: "Psicologia Do Trabalho", label: "Psicologia do Trabalho" },
		{ value: "Psicologia Positiva", label: "Psicologia Positiva" },
		{ value: "Psicologia Social", label: "Psicologia Social" },
		{ value: "Psicogenealogia", label: "Psicogenealogia" },
		{ value: "Psicometria", label: "Psicometria" },
		{ value: "Psicoterapia Breve", label: "Psicoterapia Breve" },
		{
			value: "TerapiaCognitivo Comportamental",
			label: "Terapia Cognitivo-Comportamental",
		},
		{ value: "Terapia Gestalt", label: "Terapia Gestalt" },
		{ value: "Outras", label: "Outras" },
	];

	const stateBrasil = [
		{ value: "", label: "Selecione um estado" },
		{ value: "AC", label: "Acre" },
		{ value: "AL", label: "Alagoas" },
		{ value: "AP", label: "Amapá" },
		{ value: "AM", label: "Amazonas" },
		{ value: "BA", label: "Bahia" },
		{ value: "CE", label: "Ceará" },
		{ value: "DF", label: "Distrito Federal" },
		{ value: "ES", label: "Espírito Santo" },
		{ value: "GO", label: "Goiás" },
		{ value: "MA", label: "Maranhão" },
		{ value: "MT", label: "Mato Grosso" },
		{ value: "MS", label: "Mato Grosso do Sul" },
		{ value: "MG", label: "Minas Gerais" },
		{ value: "PA", label: "Pará" },
		{ value: "PB", label: "Paraíba" },
		{ value: "PR", label: "Paraná" },
		{ value: "PE", label: "Pernambuco" },
		{ value: "PI", label: "Piauí" },
		{ value: "RJ", label: "Rio de Janeiro" },
		{ value: "RN", label: "Rio Grande do Norte" },
		{ value: "RS", label: "Rio Grande do Sul" },
		{ value: "RO", label: "Rondônia" },
		{ value: "RR", label: "Roraima" },
		{ value: "SC", label: "Santa Catarina" },
		{ value: "SP", label: "São Paulo" },
		{ value: "SE", label: "Sergipe" },
		{ value: "TO", label: "Tocantins" },
	];

	const daysAvailable = [
		{ value: "", label: "Selecione um dia" },
		{ value: "Segunda-feira", label: "Segunda-feira" },
		{ value: "Terça-feira", label: "Terça-feira" },
		{ value: "Quarta-feira", label: "Quarta-feira" },
		{ value: "Quinta-feira", label: "Quinta-feira" },
		{ value: "Sexta-feira", label: "Sexta-feira" },
		{ value: "Sábado", label: "Sábado" },
		{ value: "Domingo", label: "Domingo" },
	];

	const hourAvailable = [
		{ value: "", label: "Selecione a hora" },
		{ value: "09:00", label: "09:00" },
		{ value: "10:00", label: "10:00" },
		{ value: "11:00", label: "11:00" },
		{ value: "12:00", label: "12:00" },
		{ value: "13:00", label: "13:00" },
		{ value: "14:00", label: "14:00" },
		{ value: "15:00", label: "15:00" },
		{ value: "16:00", label: "16:00" },
		{ value: "17:00", label: "17:00" },
		{ value: "18:00", label: "18:00" },
		{ value: "19:00", label: "19:00" },
		{ value: "20:00", label: "20:00" },
		{ value: "21:00", label: "21:00" },
	];

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

	async function createData(formData) {
		// const { verifyEmail, verifyPassword, ...dataToSend } = { ...formData };
		const { verifyEmail, verifyPassword, birthDate, day, hour, ...rest } =
			formData;
		const dataToSend = {
			...rest,
			// birthDate: null,
			availableTimes: [{ day: formData.day, hour: formData.hour }],
			// Mudar a dara a ISO 8601 exemplo 2004-11-26T00:00:00.000+00:00
			birthDate: moment(birthDate).format("YYYY-MM-DD[T]HH:mm:ss[Z]"),
		};
		// setOutput(JSON.stringify(dataToSend, null, 2));
		console.log("Dados do Formulario ", dataToSend);
		try {
			const response = await Api.post("/cadastro/psicologos", dataToSend);
			router.push("../../obrigado-page");
			console.log(response);
		} catch (error) {
			console.error("Erro ao enviar dados:", error);
			setOutput(
				<div className="error-message2">
					Cadastro existente, por favor modificar o e-mail ou CPF
				</div>,
			);
		}
	}

	return (
		<div className="App SV">
			<div className="background-image" />
			<div className="container">
				<div className="container-titulo">
					<h2>SOS Rio Grande do Sul </h2>
					<h2>Cadastro de Psicólogos Voluntários</h2>
				</div>
				<form onSubmit={handleSubmit(createData)} className="general-inputs">
					<div className="inputs formCadastro">
						{/* Nome */}
						<div className="input-field">
							<p htmlFor="name">
								1. Nome completo
								<span className="errorChar"> * </span>
							</p>
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
							<p htmlFor="cpf">
								2. CPF
								<span className="errorChar"> * </span>
							</p>
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

						{/* Data nasc*/}
						<div className="input-field">
							<p htmlFor="birthDate">
								3. Data de Nascimento
								<span className="errorChar"> * </span>
							</p>
							<input
								className={`input-text ${errors.birthDate ? "invalid" : "valid"}`}
								type="date"
								placeholder="Digite seu nome completo"
								{...register("birthDate")}
							/>
							<ErrorMessage
								className="error-message"
								errors={errors}
								name="birthDate"
								as="p"
							/>
						</div>

						{/* Telefone*/}
						<div className="input-field">
							<p htmlFor="phoneNumber">
								4. Número do whatsApp
								<span className="errorChar"> * </span>
							</p>
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

						{/* Rede social */}
						<div className="input-field">
							<p htmlFor="rede_social">5. Rede social</p>
							<span className="errorChar"> * </span>
							<input
								className={`input-text ${errors.rede_social ? "invalid" : "valid"}`}
								type="text"
								placeholder="Digite seu rede social"
								{...register("rede_social")}
							/>
							<ErrorMessage
								className="error-message"
								errors={errors}
								name="rede_social"
								as="p"
							/>
						</div>

						{/* CRP*/}
						<div className="input-field">
							<p htmlFor="crp">
								6. CRP
								<span className="errorChar"> * </span>
							</p>
							<InputMask
								mask="99-999999"
								className={`input-text ${errors.crp ? "invalid" : "valid"}`}
								placeholder="Digite seu CRP, um valor numérico"
								{...register("crp")}
							/>
							<ErrorMessage
								className="error-message"
								errors={errors}
								name="crp"
								as="p"
							/>
						</div>

						{/* Area de Especialização*/}
						<div className="input-field">
							<p htmlFor="specialization">
								7. Área de especialização
								<span className="errorChar"> * </span>
							</p>
							<select
								className={`input-text ${errors.specialization ? "invalid" : "valid"}`}
								{...register("specialization")}
							>
								{areasPsychology.map((areasPsychology) => (
									<option key={areasPsychology.value} value={areasPsychology.value}>
										{areasPsychology.label}
									</option>
								))}
							</select>
							<ErrorMessage
								className="error-message"
								errors={errors}
								name="specialization"
								as="p"
							/>
						</div>

						{/* Estado*/}
						<div className="input-field">
							<p htmlFor="state">
								8. Estado
								<span className="errorChar"> * </span>
							</p>
							<select
								className={`input-text ${errors.state ? "invalid" : "valid"}`}
								{...register("state")}
							>
								{stateBrasil.map((stateBrasil) => (
									<option key={stateBrasil.value} value={stateBrasil.value}>
										{stateBrasil.label}
									</option>
								))}
							</select>
							<ErrorMessage
								className="error-message"
								errors={errors}
								name="state"
								as="p"
							/>
						</div>

						{/* Dia*/}
						<div className="input-field">
							<p htmlFor="day">
								9. Dia disponível
								<span className="errorChar"> * </span>
							</p>
							<select
								className={`input-text ${errors.day ? "invalid" : "valid"}`}
								{...register("day")}
							>
								{daysAvailable.map((daysAvailable) => (
									<option key={daysAvailable.value} value={daysAvailable.value}>
										{daysAvailable.label}
									</option>
								))}
							</select>
							<ErrorMessage
								className="error-message"
								errors={errors}
								name="day"
								as="p"
							/>
						</div>

						{/* Hora*/}
						<div className="input-field">
							<p htmlFor="hour">
								9. Hora disponível
								<span className="errorChar"> * </span>
							</p>
							<select
								className={`input-text ${errors.hour ? "invalid" : "valid"}`}
								{...register("hour")}
							>
								{hourAvailable.map((hourAvailable) => (
									<option key={hourAvailable.value} value={hourAvailable.value}>
										{hourAvailable.label}
									</option>
								))}
							</select>
							<ErrorMessage
								className="error-message"
								errors={errors}
								name="hour"
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
							<p htmlFor="email">
								Email para cadastro
								<span className="errorChar"> * </span>
							</p>
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
							<p htmlFor="verifyEmail">
								Verificação do Email
								<span className="errorChar"> * </span>
							</p>
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
							<p htmlFor="password">
								Senha
								<span className="errorChar"> * </span>
							</p>
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
							<p htmlFor="verifyPassword">
								Verificação de senha
								<span className="errorChar"> * </span>
							</p>
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
						<p htmlFor="notes">Observações (opcional)</p>

						<textarea
							className="contact-inputs"
							{...register("notes")}
							cols="60"
							rows="10"
							placeholder="Digite suas observações aqui..."
						/>
					</div>

					{/* Termos legais */}
					<div>
						<div className="legal">
							<input type="checkbox" {...register("termos")} />
							<label htmlFor="termos">
								Confirmo que
								<strong>&nbsp;li e aceito o </strong>
								<Link
									href="../../termo-psicologo"
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

export default FormularioPsicologo;
