"use client";
import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
// import "../../../assets/styles/App.css";
// import "../../../assets/styles/MinhaConta.css";
// import "../../../assets/styles/SejaVoluntario.css";
import styles1 from "../../../assets/styles/App.module.css";
import styles2 from "../../../assets/styles/MinhaConta.module.css";
import styles3 from "../../../assets/styles/SejaVoluntario.module.css";
import Footer from "../../../components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";

function MinhaContaEducador() {
	const [selectedOption, setSelectedOption] = useState(null);
	const handleOptionChange = (option) => {
		setSelectedOption(option);
	};
	const [formData, setFormData] = useState({
		cpf: "",
		nome: "",
		dataNascimento: "",
		telefone: "",
		instagram: "",
		estado: "",
		cidade: "",
		certificado: "",
		area: "",
		tipodevoluntariado: "",
		observacao: "",
		additionalDays: [{ day: "", hour: "" }],
	});

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleDayChange = (index, event) => {
		const values = [...formData.additionalDays];
		values[index][event.target.name] = event.target.value;
		setFormData({ ...formData, additionalDays: values });
	};

	const addDay = () => {
		const newDays = [...formData.additionalDays, { day: "", hour: "" }];
		setFormData({ ...formData, additionalDays: newDays });
	};

	const removeDay = (index) => {
		const values = [...formData.additionalDays];
		values.splice(index, 1);
		setFormData({ ...formData, additionalDays: values });
	};

	const EducadorSchema = z.object({
		cpf: z
			.string()
			.min(11)
			.regex(
				/^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
				"CPF inválido. Exemplo: 999.999.999-99",
			),
		nome: z.string().min(1),
		dataNascimento: z.string().min(1).date(),
		telefone: z
			.string()
			.min(1)
			.regex(
				/^\(\d{2}\)\d{5}-\d{4}$/,
				"Número de telefone inválido. Exemplo: (99)99999-9999",
			),
		instagram: z.string().optional(),
		estado: z.string().optional(),
		cidade: z.string().optional(),
		certificado: z
			.string()
			.min(3, "O certificado precisa no mínimo 3 carateres")
			.max(20, "O certificado precisa no máximo 20 carateres"),
		area: z.string().min(1),
		tipodevoluntariado: z.string().min(1),
		observacao: z.string().optional(),
		additionalDays: z.array(
			z.object({
				day: z.string().min(1, "Selecione o dia"),
				hour: z.string().min(1, "Selecione a hora"),
			}),
		),
	});

	function formLog(data) {
		console.log(data);
	}

	const { register, handleSubmit } = useForm({
		resolver: zodResolver(EducadorSchema),
	});

	return (
		<form onSubmit={handleSubmit(formLog)} className={styles2["App-Conta"]}>
			<div className={styles2.minhaConta}>
				<div className={styles2.section}>
					<h2 className={`${styles3.titleh2} ${styles2["titulo-conta"]}`}>
						Minha Conta
					</h2>
					<h2 className={`${styles3.titleh2} ${styles2["subtitulo-conta"]}`}>
						Dados Pessoais
					</h2>
					<div className={styles2.inputs}>
						<div className={styles2["input-field"]}>
							<label className={styles3.labelItem} htmlFor="cpf">
								CPF
							</label>
							<input
								type="text"
								id="cpf"
								placeholder="CPF"
								className={styles2["input-text"]}
								{...register("cpf")}
							/>
						</div>
						<div className={styles2["input-field"]}>
							<label className={styles3.labelItem} htmlFor="nome">
								Nome completo
							</label>
							<input
								type="text"
								id="nome"
								placeholder="Nome completo"
								className={styles2["input-text"]}
								{...register("nome")}
							/>
						</div>
						<div className={styles2["input-field"]}>
							<label className={styles3.labelItem} htmlFor="dataNascimento">
								Data de nascimento
							</label>
							<input
								type="date"
								id="dataNascimento"
								placeholder="Data de nascimento"
								className={styles2["input-text"]}
								{...register("dataNascimento")}
							/>
						</div>
						<div className={styles2["input-field"]}>
							<label className={styles3.labelItem} htmlFor="telefone">
								Telefone
							</label>
							<input
								type="text"
								id="telefone"
								placeholder="Telefone (WhatsApp)"
								className={styles2["input-text"]}
								{...register("telefone")}
							/>
						</div>
						<div className={styles2["input-field"]}>
							<label className={styles3.labelItem} htmlFor="instagram">
								Instagram (opcional)
							</label>
							<input
								type="text"
								id="instagram"
								placeholder="Instagram"
								className={styles2["input-text"]}
								{...register("instagram")}
							/>
						</div>
						<div className={styles2["input-field"]}>
							<label className={styles3.labelItem} htmlFor="certificado">
								Certificado
							</label>
							<input
								type="text"
								id="certificado"
								placeholder="certificado"
								className={styles2["input-text"]}
								{...register("crp")}
							/>
						</div>
						<div className={styles2["input-field"]}>
							<label className={styles3.labelItem} htmlFor="estado">
								Estado
							</label>
							<select
								id="estado"
								className={styles2["input-text"]}
								{...register("estado")}
							>
								<option value="">Selecione um estado</option>
								<option value="AC">Acre (AC)</option>
								<option value="AL">Alagoas (AL)</option>
								<option value="AP">Amapá (AP)</option>
								<option value="AM">Amazonas (AM)</option>
								<option value="BA">Bahia (BA)</option>
								<option value="CE">Ceará (CE)</option>
								<option value="DF">Distrito Federal (DF)</option>
								<option value="ES">Espírito Santo (ES)</option>
								<option value="GO">Goiás (GO)</option>
								<option value="MA">Maranhão (MA)</option>
								<option value="MT">Mato Grosso (MT)</option>
								<option value="MS">Mato Grosso do Sul (MS)</option>
								<option value="MG">Minas Gerais (MG)</option>
								<option value="PA">Pará (PA)</option>
								<option value="PB">Paraíba (PB)</option>
								<option value="PR">Paraná (PR)</option>
								<option value="PE">Pernambuco (PE)</option>
								<option value="PI">Piauí (PI)</option>
								<option value="RJ">Rio de Janeiro (RJ)</option>
								<option value="RN">Rio Grande do Norte (RN)</option>
								<option value="RS">Rio Grande do Sul (RS)</option>
								<option value="RO">Rondônia (RO)</option>
								<option value="RR">Roraima (RR)</option>
								<option value="SC">Santa Catarina (SC)</option>
								<option value="SP">São Paulo (SP)</option>
								<option value="SE">Sergipe (SE)</option>
								<option value="TO">Tocantins (TO)</option>
							</select>
						</div>
						<div className={styles2["input-field"]}>
							<label className={styles3.labelItem} htmlFor="cidade">
								Cidade
							</label>
							<input
								type="text"
								id="cidade"
								placeholder="Cidade"
								className={styles2["input-text"]}
								{...register("cidade")}
							/>
						</div>
						<div className={styles2["input-field"]}>
							<label className={styles3.labelItem} htmlFor="endereço">
								Endereço
							</label>
							<input
								type="text"
								id="endereço"
								placeholder="Endereço"
								className={styles2["input-text"]}
								{...register("endereco")}
							/>
						</div>
						<div className={styles2["input-field"]}>
							<label className={styles3.labelItem} htmlFor="numero">
								Número
							</label>
							<input
								type="text"
								id="numero"
								placeholder="Número"
								className={styles2["input-text"]}
								{...register("numero")}
							/>
						</div>
						<div className={styles2["input-field"]}>
							<label className={styles3.labelItem} htmlFor="complemento">
								Complemento
							</label>
							<input
								type="text"
								id="complemento"
								placeholder="Complemento"
								className={styles2["input-text"]}
								{...register("complemento")}
							/>
						</div>
						<div className={styles2["input-field"]}>
							<label className={styles3.labelItem} htmlFor="bairro">
								Bairro
							</label>
							<input
								type="text"
								id="bairro"
								placeholder="Bairro"
								className={styles2["input-text"]}
								{...register("bairro")}
							/>
						</div>
					</div>
					<div className={styles2.buttons}>
						<button>Cancelar</button>
						<button>Salvar alterações</button>
					</div>
				</div>

				<div className={styles2.section}>
					<h2 className={`${styles3.titleh2} ${styles2["subtitulo-conta"]}`}>
						Serviço
					</h2>
					<div className={styles2["radio-espacio"]}>
						<p>Disponibilidade para prestar serviço na sua cidade ou bairro?</p>
						<div className={styles2["radio-option"]}>
							<input
								type="radio"
								id="sim"
								name="serviço"
								value="sim"
								checked={selectedOption === "sim"}
								onChange={() => handleOptionChange("sim")}
							/>
							<label className={styles3.labelItem} htmlFor="sim">
								Sim
							</label>
						</div>
						<div className={styles2["radio-option"]}>
							<input
								type="radio"
								id="nao"
								name="serviço"
								value="nao"
								checked={selectedOption === "nao"}
								onChange={() => handleOptionChange("nao")}
							/>
							<label className={styles3.labelItem} htmlFor="nao">
								Não
							</label>
						</div>
					</div>
					<div className={styles2.buttons}>
						<button>Cancelar</button>
						<button>Salvar alterações</button>
					</div>
				</div>

				<div className={styles2["form-group"]}>
					<h2 className={`${styles3.titleh2} ${styles2["subtitulo-conta"]}`}>
						Disponibilidade
					</h2>
					{formData.additionalDays.map((additionalDay, index) => (
						<div key={index} className={styles3["dia-disponible"]}>
							<div>
								<h4 className={styles3.titleh4}>
									Dia {index + 1}
									<span>*</span>
								</h4>
								<select
									className={styles3["form-select"]}
									name="day"
									value={additionalDay.day}
									onChange={(e) => handleDayChange(index, e)}
									required
								>
									<option value="">Selecione</option>
									<option value="Segunda">Segunda</option>
									<option value="Terça">Terça</option>
									<option value="Quarta">Quarta</option>
									<option value="Quinta">Quinta</option>
									<option value="Sexta">Sexta</option>
									<option value="Sábado">Sábado</option>
									<option value="Domingo">Domingo</option>
								</select>
							</div>
							<div>
								<h4 className={styles3.titleh4}>
									Hora<span>*</span>
								</h4>
								<select
									className={styles3["form-select"]}
									name="hour"
									value={additionalDay.hour}
									onChange={(e) => handleDayChange(index, e)}
									required
								>
									<option value="">Selecione</option>
									<option value="09:00">09:00</option>
									<option value="10:00">10:00</option>
									<option value="11:00">11:00</option>
									<option value="12:00">12:00</option>
									<option value="13:00">13:00</option>
									<option value="14:00">14:00</option>
									<option value="15:00">15:00</option>
									<option value="16:00">16:00</option>
									<option value="17:00">17:00</option>
									<option value="18:00">18:00</option>
									<option value="19:00">19:00</option>
									<option value="20:00">20:00</option>
									<option value="21:00">21:00</option>
								</select>
							</div>
							{index > 0 && (
								<FaTrash onClick={() => removeDay(index)} className="borrar" />
							)}
						</div>
					))}
					<div className={styles2["button-dia-espacio"]} onClick={addDay}>
						<FaPlus />
						<h4
							onClick={addDay}
							className={`${styles3.titleh4} ${styles2["texto-dia"]}`}
						>
							Adicionar outro dia
						</h4>
					</div>
					<div className={styles2["input-field"]}>
						<label className={styles3.labelItem} htmlFor="observacao">
							Observação
						</label>
						<textarea
							id="observacao"
							name="observacao"
							value={formData.observacao}
							onChange={handleInputChange}
							placeholder="Observacao"
							className={`${styles3.textareaItem} ${styles2["textarea-conta"]}`}
						/>
					</div>
					<div className={styles2.buttons}>
						<button>Cancelar</button>
						<button>Salvar alterações</button>
					</div>
				</div>

				<div className={styles2.section}>
					<h2 className={`${styles3.titleh2} ${styles2["subtitulo-conta"]}`}>
						Cadastro
					</h2>
					<div className={styles2["input-field"]}>
						<label className={styles3.labelItem} htmlFor="observacao">
							Observação
						</label>
						<textarea
							id="observacao"
							name="observacao"
							value={formData.observacao}
							onChange={handleInputChange}
							placeholder="Observacao"
							className={`${styles3.textareaItem} ${styles2["textarea-conta"]}`}
						/>
					</div>
					<div className={styles2.buttons}>
						<button>Cancelar</button>
						<button>Salvar alterações</button>
					</div>
				</div>
			</div>
			<Footer />
		</form>
	);
}

export default MinhaContaEducador;
