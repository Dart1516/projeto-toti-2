"use client";
/* Formulario com Resolver (React Hoork From + ZOD)*/
import React, { useState } from "react";
import InputMask from "react-input-mask";
// import "../../../assets/styles/App.css";
// import "../../../assets/styles/SejaVoluntario.css";
import styles1 from "../../../assets/styles/App.module.css";
import styles2 from "../../../assets/styles/SejaVoluntario.module.css";
import VisibilityOff from "@mui/icons-material/VisibilityOffOutlined";
import Visibility from "@mui/icons-material/VisibilityOutlined";
import { FaPlus, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Api } from "../../../services/api";
import { useForm, useFieldArray } from "react-hook-form";
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
	rede_social: z.string().optional(),
	crp: z
		.string()
		.nonempty("O CRP é obrigatório")
		.regex(/^\d{2}-\d{6}$/, "Formato do CRP inválido. Exemplo: 99-999999"),
	specialization: z.string().nonempty("A área é obrigatório"),
	state: z.string().nonempty("O estado é obrigatório"),
	availableTimes: z.array(
		z.object({
			day: z.string().nonempty("Selecione o dia"),
			hour: z.string().nonempty("Selecione a hora"),
		}),
	),
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

	const daySuffixes = ["ro", "do", "ro", "to", "to", "to", "mo"];

	const {
		register,
		handleSubmit,
		formState: { isLoading, isSubmitting, errors },
		control,
	} = useForm({
		resolver: zodResolver(dataSuperRefineSchema),
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "availableTimes",
	});

	async function createData(formData) {
		const { verifyEmail, verifyPassword, birthDate, ...rest } = formData;
		const dataToSend = {
			...rest,
			// Mudar a dara a ISO 8601 exemplo 2004-11-26T00:00:00.000+00:00
			birthDate: moment(birthDate).format("YYYY-MM-DD[T]HH:mm:ss[Z]"),
		};
		// setOutput(JSON.stringify(dataToSend, null, 2));
		console.log("Dados do Formulario ", dataToSend);
		try {
			const response = await Api.post("/cadastro/psicologos", dataToSend);
			if (response) {
				router.push("../../obrigado-page");
			}
			console.log(response);
		} catch (error) {
			let errorMessage;

			if (error.response?.data?.message) {
				if (error.response.data.message.includes("CPF já cadastrado")) {
					errorMessage =
						"CPF inserido ja cadastrado. Ja tem uma conta? Faça login. Se ainda não tem, favor conferir os dados no formulario.";
				} else if (error.response.data.message.includes("E-mail já cadastrado")) {
					errorMessage =
						"Email inserido já cadastrado. Ja tem uma conta? faça login. Se ainda não tem, favor conferir os dados no formulario.";
				}
			} else {
				errorMessage =
					"Ops! A conexão falhou. O cadastro não foi bem sucedido, vamos tentar de novo?";
			}

			console.error("Error ao enviar os dados:", error);
			setOutput(errorMessage);
		}
	}

	return (
		<div className={`${styles1.App} ${styles2.SV}`}>
			<div className={styles2["background-image"]} />
			<div className={styles2.container}>
				<div className={styles2["container-titulo"]}>
					<h2 className={styles2.titleh2}>SOS Rio Grande do Sul </h2>
					<h2 className={styles2.titleh2}>Cadastro de Psicólogos Voluntários</h2>
				</div>
				<form
					onSubmit={handleSubmit(createData)}
					className={styles2["general-inputs"]}
				>
					<div className={`${styles2.inputs} ${styles2.formCadastro}`}>
						{/* Nome */}
						<div className={styles2["input-field"]}>
							<label className={styles2.labelItem} htmlFor="name">
								<p>1. Nome completo</p>
								<span className={styles2.errorChar}> * </span>
							</label>
							<input
								className={`${styles2["input-text"]} ${errors.name ? "invalid" : "valid"}`}
								type="text"
								placeholder="Digite seu nome completo"
								{...register("name")}
							/>
							<ErrorMessage
								className={styles2["error-message"]}
								errors={errors}
								name="name"
								as="p"
							/>
						</div>

						{/* CPF*/}
						<div className={styles2["input-field"]}>
							<label className={styles2.labelItem} htmlFor="cpf">
								<p>2. CPF</p>
								<span className={styles2.errorChar}> * </span>
							</label>
							<InputMask
								mask="999.999.999-99"
								className={`${styles2["input-text"]} ${errors.cpf ? "invalid" : "valid"}`}
								placeholder="Digite o CPF, um valor numérico"
								{...register("cpf")}
							/>
							<ErrorMessage
								className={styles2["error-message"]}
								errors={errors}
								name="cpf"
								as="p"
							/>
						</div>

						{/* Data nasc*/}
						<div className={styles2["input-field"]}>
							<label className={styles2.labelItem} htmlFor="birthDate">
								<p>3. Data de nascimento</p>
								<span className={styles2.errorChar}> * </span>
							</label>
							<input
								className={`${styles2["input-text"]} ${errors.birthDate ? "invalid" : "valid"}`}
								type="date"
								placeholder="Digite seu nome completo"
								{...register("birthDate")}
							/>
							<ErrorMessage
								className={styles2["error-message"]}
								errors={errors}
								name="birthDate"
								as="p"
							/>
						</div>

						{/* Telefone*/}
						<div className={styles2["input-field"]}>
							<label className={styles2.labelItem} htmlFor="phoneNumber">
								<p>4. Número do whatsApp</p>
								<span className={styles2.errorChar}> * </span>
							</label>
							<InputMask
								mask="(99)99999-9999"
								className={`${styles2["input-text"]} ${errors.phoneNumber ? "invalid" : "valid"}`}
								placeholder="Digite seu número"
								{...register("phoneNumber")}
							/>
							<ErrorMessage
								className={styles2["error-message"]}
								errors={errors}
								name="phoneNumber"
								as="p"
							/>
						</div>

						{/* Rede social */}
						<div className={styles2["input-field"]}>
							<label className={styles2.labelItem} htmlFor="rede_social">
								<p>5. Rede social (opcional)</p>
							</label>
							<input
								className={`${styles2["input-text"]} ${errors.rede_social ? "invalid" : "valid"}`}
								type="text"
								placeholder="Digite seu rede social"
								{...register("rede_social")}
							/>
							<ErrorMessage
								className={styles2["error-message"]}
								errors={errors}
								name="rede_social"
								as="p"
							/>
						</div>

						{/* CRP*/}
						<div className={styles2["input-field"]}>
							<label className={styles2.labelItem} htmlFor="crp">
								<p>6. CRP</p>
								<span className={styles2.errorChar}> * </span>
							</label>
							<InputMask
								mask="99-999999"
								className={`${styles2["input-text"]} ${errors.crp ? "invalid" : "valid"}`}
								placeholder="Digite seu CRP, um valor numérico"
								{...register("crp")}
							/>
							<ErrorMessage
								className={styles2["error-message"]}
								errors={errors}
								name="crp"
								as="p"
							/>
						</div>

						{/* Area de Especialização*/}
						<div className={styles2["input-field"]}>
							<label className={styles2.labelItem} htmlFor="specialization">
								<p>7. Área de especialização</p>
								<span className={styles2.errorChar}> * </span>
							</label>
							<select
								className={`${styles2["input-text"]} ${errors.specialization ? "invalid" : "valid"}`}
								{...register("specialization")}
							>
								{areasPsychology.map((areasPsychology) => (
									<option key={areasPsychology.value} value={areasPsychology.value}>
										{areasPsychology.label}
									</option>
								))}
							</select>
							<ErrorMessage
								className={styles2["error-message"]}
								errors={errors}
								name="specialization"
								as="p"
							/>
						</div>

						{/* Estado*/}
						<div className={styles2["input-field"]}>
							<label className={styles2.labelItem} htmlFor="state">
								<p>8. Estado</p>
								<span className={styles2.errorChar}> * </span>
							</label>
							<select
								className={`${styles2["input-text"]} ${errors.state ? "invalid" : "valid"}`}
								{...register("state")}
							>
								{stateBrasil.map((stateBrasil) => (
									<option key={stateBrasil.value} value={stateBrasil.value}>
										{stateBrasil.label}
									</option>
								))}
							</select>
							<ErrorMessage
								className={styles2["error-message"]}
								errors={errors}
								name="state"
								as="p"
							/>
						</div>
					</div>

					<label className={styles2.labelItem} htmlFor="availableTimes">
						<p>
							9. Quando você pode ajudar? Adicione seus horários disponíveis clicando
							no ícone
						</p>
						{fields.length < 7 && (
							<span className={styles2.plusChar}>
								<FaPlus onClick={() => append({})} title="Agregar horário" size={20} />
							</span>
						)}
					</label>
					{fields.map((field, index) => {
						return (
							<div
								className={`${styles2["form-group"]} ${styles2.formulario}`}
								key={field.id}
							>
								<div className={styles2["dia-disponible"]}>
									<label className={styles2.labelItem} htmlFor={field.id} />
									{/* Dia */}
									<div>
										<p>
											{`${index + 1}${
												daySuffixes[index % daySuffixes.length]
											} dia disponível`}
											<span className={styles2.errorChar}> * </span>
										</p>
									</div>
									<div>
										<select
											className={`${styles2["input-text"]} ${styles2["form-select"]} ${
												errors.day ? "invalid" : "valid"
											}`}
											{...register(`availableTimes.${index}.day`)}
										>
											{daysAvailable.map((daysAvailable) => (
												<option key={daysAvailable.value} value={daysAvailable.value}>
													{daysAvailable.label}
												</option>
											))}
										</select>
									</div>

									{/* Hora */}
									<div>
										<select
											className={`${styles2["input-text"]} ${styles2["form-select"]} ${
												errors.hour ? "invalid" : "valid"
											}`}
											{...register(`availableTimes.${index}.hour`)}
										>
											{hourAvailable.map((hourAvailable) => (
												<option key={hourAvailable.value} value={hourAvailable.value}>
													{hourAvailable.label}
												</option>
											))}
										</select>
									</div>

									{index > 0 && (
										<span className={styles2.deleteChar}>
											<FaTrash onClick={() => remove(index)} title="Eliminar" size={15} />
										</span>
									)}
								</div>
								<div className={styles2.containerErrorDay}>
									<ErrorMessage
										className={styles2["error-message"]}
										errors={errors}
										name={`availableTimes.${index}.day`}
										as="p"
										render={({ message }) => <p>{message}</p>}
									/>
									{errors?.availableTimes?.[index]?.day &&
										errors?.availableTimes?.[index]?.hour && <span>e</span>}

									<ErrorMessage
										className={styles2["error-message"]}
										errors={errors}
										name={`availableTimes.${index}.hour`}
										as="p"
										render={({ message }) => <p>{message}</p>}
									/>
								</div>
							</div>
						);
					})}

					<div className={styles2["lembre-text"]}>
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

					<div className={`${styles2.inputs} ${styles2.formCadastro}`}>
						{/* Email */}
						<div className={styles2["input-field"]}>
							<label className={styles2.labelItem} htmlFor="email">
								<p>E-mail para cadastro</p>
								<span className={styles2.errorChar}> * </span>
							</label>
							<input
								className={`${styles2["input-text"]} ${errors.email ? "invalid" : "valid"}`}
								type="email"
								placeholder="Digite seu e-mail"
								{...register("email")}
							/>
							<ErrorMessage
								className={styles2["error-message"]}
								errors={errors}
								name="email"
								as="p"
							/>
						</div>

						{/* Verifique Email */}
						<div className={styles2["input-field"]}>
							<label className={styles2.labelItem} htmlFor="verifyEmail">
								<p>Verificação do e-mail</p>
								<span className={styles2.errorChar}> * </span>
							</label>
							<input
								className={`${styles2["input-text"]} ${errors.verifyEmail ? "invalid" : "valid"}`}
								type="email"
								placeholder="Confirme seu e-mail"
								{...register("verifyEmail")}
							/>
							<ErrorMessage
								className={styles2["error-message"]}
								errors={errors}
								name="verifyEmail"
								as="p"
							/>
						</div>

						{/* Senha */}
						<div className={styles2["input-field"]}>
							<label className={styles2.labelItem} htmlFor="password">
								<p>Senha</p>
								<span className={styles2.errorChar}> * </span>
							</label>
							<div className={styles2["input-container"]}>
								<input
									className={`${styles2["input-text"]} ${errors.password ? "invalid" : "valid"}`}
									type={showPassword ? "text" : "password"}
									placeholder="Crie uma senha"
									{...register("password")}
								/>
								<button
									className={styles2["visibility-icon"]}
									type="button"
									onClick={togglePasswordVisibility}
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</button>
							</div>
							<ErrorMessage
								className={styles2["error-message"]}
								errors={errors}
								name="password"
								as="p"
							/>
						</div>

						{/* Confirmar Senha */}
						<div className={styles2["input-field"]}>
							<label className={styles2.labelItem} htmlFor="verifyPassword">
								<p>Verificação de senha</p>
								<span className={styles2.errorChar}> * </span>
							</label>
							<div className={styles2["input-container"]}>
								<input
									className={`${styles2["input-text"]} ${errors.verifyPassword ? "invalid" : "valid"}`}
									type={showPassword ? "text" : "password"}
									placeholder="Confirme sua senha"
									{...register("verifyPassword")}
								/>
								<button
									className={styles2["visibility-icon"]}
									type="button"
									onClick={togglePasswordVisibility}
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</button>
							</div>
							<ErrorMessage
								className={styles2["error-message"]}
								errors={errors}
								name="verifyPassword"
								as="p"
							/>
						</div>
					</div>

					{/* Observações */}
					<div className={styles2.opcional}>
						<label className={styles2.labelItem} htmlFor="notes">
							Observações (opcional)
						</label>

						<textarea
							className={`${styles2.textareaItem} ${styles2["contact-inputs"]}`}
							{...register("notes")}
							cols={60}
							rows={10}
							placeholder="Digite suas observações aqui..."
						/>
					</div>

					{/* Termos legais */}
					<div>
						<div className={styles2.legal}>
							<input type="checkbox" {...register("termos")} />
							<label className={styles2.labelItem} htmlFor="termos">
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
						<div className={styles2.errorTermo}>
							<ErrorMessage
								className={styles2["error-message"]}
								errors={errors}
								name="termos"
								as="p"
							/>
						</div>
					</div>

					<button
						className={`${styles2.SV} ${isLoading ? styles2["submit-disabled"] : ""}`}
						type="submit"
						disabled={isSubmitting}
					>
						{isSubmitting ? "Carregando..." : "Enviar"}
					</button>
					<pre className={styles2["error-message-api"]}>{output}</pre>
				</form>
			</div>
			<footer className="App-footer" />
		</div>
	);
}

export default FormularioPsicologo;
