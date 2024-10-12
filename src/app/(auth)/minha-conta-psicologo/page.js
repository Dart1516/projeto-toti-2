"use client";
import { useUser } from "../../../api/UserContext";
// import "../../../assets/styles/App.css";
// import "../../../assets/styles/MinhaConta.css";
// import "../../../assets/styles/SejaVoluntario.css";
import styles1 from "../../../assets/styles/App.module.css";
import styles2 from "../../../assets/styles/MinhaConta.module.css";
import styles3 from "../../../assets/styles/SejaVoluntario.module.css";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import Footer from "../../../components/Footer";
import MinhaContaForm from "../../../components/minha-conta";
import React from "react";

function MinhaConta() {
	const { user } = useUser();
	const router = useRouter();

	const [formData, setFormData] = useState({
		cpf: "",
		nome: "",
		dataNascimento: "",
		telefone: "",
		instagram: "",
		estado: "",
		crp: "",
		area: "",
		tipodevoluntariado: "",
		observacao: "",
		additionalDays: [{ day: "", hour: "" }],
	});

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

	useEffect(() => {
		if (!user) {
			router.push("/");
		}
	}, [user, router]);

	return (
		<div className={styles2["App-Conta"]}>
			<div className={styles2.minhaConta}>
				<MinhaContaForm />

				<div className={styles2.section}>
					<h2 className={`${styles3.titleh2} ${styles2["subtitulo-conta"]}`}>
						Voluntariado
					</h2>
					<div className={styles2.inputs}>
						<div className={styles2["input-field"]}>
							<label className={styles3.labelItem} htmlFor="crp">
								CRP
							</label>
							<input
								type="text"
								id="crp"
								placeholder="CRP"
								className={styles2["input-text"]}
							/>
						</div>
						<div className={styles2["input-field"]}>
							<label className={styles3.labelItem} htmlFor="area">
								Área de especialização
							</label>
							<input
								type="text"
								id="area"
								placeholder="Área de especialização"
								className={styles2["input-text"]}
							/>
						</div>
						<div className={styles2["input-field"]}>
							<label className={styles3.labelItem} htmlFor="tipodevoluntariado">
								Tipo de voluntariado
							</label>
							<select id="tipodevoluntariado" className={styles2["input-text"]}>
								<option value="">Tipo de voluntariado</option>
								<option value="Educador Social">Educador Social</option>
								<option value="Liderança">Liderança</option>
								<option value="Psicologia">Psicologia</option>
							</select>
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
						<div key={index} className={styles2["dia-disponible"]}>
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
							placeholder="observacao"
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
		</div>
	);
}

export default MinhaConta;
