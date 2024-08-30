"use client";
"use client";
/* Formulario com Resolver (React Hoork From + ZOD)*/
import React, { useState } from "react";
import InputMask from "react-input-mask";
import "../../../assets/styles/App.css";
import "../../../assets/styles/SejaVoluntario.css";
import VisibilityOff from "@mui/icons-material/VisibilityOffOutlined";
import Visibility from "@mui/icons-material/VisibilityOutlined";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Api, ApiBrasil } from "../../../services/api";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import * as yup from "yup";
import moment from "moment";

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
	name: z
		.string()
		.nonempty("O nome é obrigatório")
		.min(3, "O nome precisa no mínimo 3 carateres")
		.max(50, "O nome precisa no máximo 50 carateres")
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
	profession: z
		.string()
		.nonempty("A profissão é obrigatório")
		.min(3, "A profissão precisa no mínimo 3 carateres")
		.max(50, "A profissão precisa no máximo 50 carateres")
		.transform((name) => {
			return name
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
	city: z.string().optional(),
	neighborhood: z.string().optional(),
	certificate: z
		.string()
		.nonempty("O certificado é obrigatório")
		.min(3, "O certificado precisa no mínimo 3 carateres")
		.max(20, "O certificado precisa no máximo 20 carateres")
		.transform((name) => {
			return name
				.trim()
				.split(" ")
				.map((word) => word[0].toLocaleUpperCase().concat(word.substring(1)))
				.join(" ");
		}),
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

function FormularioEducadorSocial() {
	const router = useRouter();

	const [output, setOutput] = useState("");
	const [isCepFocused, setIsCepFocused] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

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

	async function handleCEPApi(e) {
		const cepcode = e.target.value;
		setIsCepFocused(true);

		try {
			const resp = await ApiBrasil.get(`/${cepcode}`);
			setValue("state", resp.data.state);
			setValue("city", resp.data.state);
			setValue(
				"neighborhood",
				`${resp.data.street}, ${resp.data.neighborhood}, ${resp.data.state}, ${resp.data.cep}`,
			);
		} catch (error) {
			console.error("Erro na API do CEP", error);
			setValue("state", "");
			setValue("city", "");
			setValue("neighborhood", "");
		} finally {
			setIsCepFocused(false);
		}
	}

	async function createData(formData) {
		const { verifyEmail, verifyPassword, birthDate, day, hour, cep, ...rest } =
			formData;
		const dataToSend = {
			...rest,
			availableTimes: [{ day: formData.day, hour: formData.hour }],
			// Mudar a dara a ISO 8601 exemplo 2004-11-26T00:00:00.000+00:00
			birthDate: moment(birthDate).format("YYYY-MM-DD[T]HH:mm:ss[Z]"),
		};
		setOutput(JSON.stringify(dataToSend, null, 2));
		console.log("Dados do Formulario ", dataToSend);
		//Fazer post
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
							<label htmlFor="name">
								<span>1. Nome completo</span>
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
								<p>2. CPF</p>
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

						{/* Data nasc*/}
						<div className="input-field">
							<label htmlFor="birthDate">
								<p>3. Data de nascimento</p>
								<span className="errorChar"> * </span>
							</label>
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
							<label htmlFor="phoneNumber">
								<p>4. Número do whatsApp</p>
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

						{/* Rede social */}
						<div className="input-field">
							<label htmlFor="rede_social">
								<p>5. Rede social</p>
								<span className="errorChar"> * </span>
							</label>
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

						{/* Profissão */}
						<div className="input-field">
							<label htmlFor="profession">
								<p>6. Profissão</p>
								<span className="errorChar"> * </span>
							</label>
							<input
								className={`input-text ${errors.profession ? "invalid" : "valid"}`}
								type="text"
								placeholder="Digite seu rede social"
								{...register("profession")}
							/>
							<ErrorMessage
								className="error-message"
								errors={errors}
								name="profession"
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
							<label htmlFor="neighborhood">
								<p>8. Endereço</p>
								<span className="errorChar"> * </span>
							</label>
							<input
								className={`input-text ${errors.neighborhood ? "invalid" : "valid"}`}
								type="text"
								placeholder="Preencha um CEP válido"
								disabled
								{...register("neighborhood")}
							/>
							<ErrorMessage
								className="error-message"
								errors={errors}
								name="neighborhood"
								as="p"
							/>
						</div>

						{/* Certificado */}
						<div className="input-field">
							<label htmlFor="certificate">
								<p>8. Certificado</p>
								<span className="errorChar"> * </span>
							</label>
							<input
								className={`input-text ${errors.certificate ? "invalid" : "valid"}`}
								type="text"
								placeholder="Digite seu rede social"
								{...register("certificate")}
							/>
							<ErrorMessage
								className="error-message"
								errors={errors}
								name="certificate"
								as="p"
							/>
						</div>
					</div>

					<div className="inputs formCadastro">
						{/* Dia*/}
						<div className="input-field">
							<label htmlFor="day">
								<p>10. Dia disponível</p>
								<span className="errorChar"> * </span>
							</label>
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
							<label htmlFor="hour">
								<p>11. Hora disponível</p>
								<span className="errorChar"> * </span>
							</label>
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

						<textarea
							className="contact-inputs"
							{...register("notes")}
							cols={60}
							rows={10}
							placeholder="Digite suas observações aqui..."
						/>
					</div>

					{/* Termos legais */}
					<div>
						<div className="legal">
							<input type="checkbox" {...register("termos")} />
							<label htmlFor="termos">
								<p>
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
								</p>
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

export default FormularioEducadorSocial;
