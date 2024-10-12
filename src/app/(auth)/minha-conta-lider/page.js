"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../../api/UserContext";
// import "../../../assets/styles/App.css";
// import "../../../assets/styles/MinhaConta.css";
// import "../../../assets/styles/SejaVoluntario.css";
import styles1 from "../../../assets/styles/App.module.css";
import styles2 from "../../../assets/styles/MinhaConta.module.css";
import styles3 from "../../../assets/styles/SejaVoluntario.module.css";
import Footer from "../../../components/Footer";

function MinhaContaLider() {
	const { user } = useUser();

	const { register, handleSubmit } = useForm({
		defaultValues: {
			cpf: user?.cpf,
			nome: user?.name,
			email: user?.email,
			telefone: user?.phoneNumber,
			area: user?.area,
			estado: user?.state,
			address: user?.address,
			notes: user?.notes,
		},
	});

	return (
		<div className={styles2["App-Conta"]}>
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
								Cpf representante
							</label>
							<input
								type="text"
								id="cpf"
								placeholder="Cpf representante"
								className={styles2["input-text"]}
								{...register("cpf")}
							/>
						</div>
						<div className={styles2["input-field"]}>
							<label className={styles3.labelItem} htmlFor="nome">
								Nome representante
							</label>
							<input
								type="text"
								id="nome"
								placeholder="Nome representante"
								className={styles2["input-text"]}
								{...register("nome")}
							/>
						</div>
						<div className={styles2["input-field"]}>
							<label className={styles3.labelItem} htmlFor="email">
								E-mail representante
							</label>
							<input
								type="text"
								id="email"
								placeholder="E-mail representante"
								className={styles2["input-text"]}
								{...register("email")}
							/>
						</div>
						<div className={styles2["input-field"]}>
							<label className={styles3.labelItem} htmlFor="telefone">
								Telefone representante
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
							<label className={styles3.labelItem} htmlFor="area">
								Área em que trabalha
							</label>
							<input
								type="text"
								id="area"
								placeholder="Área em que trabalha"
								className={styles2["input-text"]}
								{...register("area")}
							/>
						</div>
						<div className={styles2["input-field"]}>
							<label className={styles3.labelItem} htmlFor="estado">
								Estado que reside
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
							<label className={styles3.labelItem} htmlFor="endereço">
								Endereço
							</label>
							<input
								type="text"
								id="endereço"
								placeholder="Endereço"
								className={styles2["input-text"]}
								{...register("address")}
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
						Dados ONG
					</h2>
					<div className={styles2.inputs}>
						<div className={styles2["input-field"]}>
							<label className={styles3.labelItem} htmlFor="CNPJ">
								CNPJ
							</label>
							<input
								type="text"
								id="CNPJ"
								placeholder="CNPJ"
								className={styles2["input-text"]}
							/>
						</div>
						<div className={styles2["input-field"]}>
							<label className={styles3.labelItem} htmlFor="nomeOng">
								Nome
							</label>
							<input
								type="text"
								id="nomeOng"
								placeholder="Nome"
								className={styles2["input-text"]}
							/>
						</div>
						<div className={styles2["input-field"]}>
							<label className={styles3.labelItem} htmlFor="emailOng">
								E-mail
							</label>
							<input
								type="text"
								id="emailOng"
								placeholder="E-mail"
								className={styles2["input-text"]}
							/>
						</div>
						<div className={styles2["input-field"]}>
							<label className={styles3.labelItem} htmlFor="telefoneOng">
								Telefone
							</label>
							<input
								type="text"
								id="telefoneOng"
								placeholder="Telefone"
								className={styles2["input-text"]}
							/>
						</div>
						<div className={styles2["input-field"]}>
							<label className={styles3.labelItem} htmlFor="estadoOng">
								Estado
							</label>
							<select id="estadoOng" className={styles2["input-text"]}>
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
							<label className={styles3.labelItem} htmlFor="endereçoOng">
								Endereço
							</label>
							<input
								type="text"
								id="endereçoOng"
								placeholder="Endereço"
								className={styles2["input-text"]}
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
						Cadastro
					</h2>
					<label className={styles3.labelItem} htmlFor="observacao">
						Observação
					</label>
					<textarea
						id="observacao"
						placeholder="Observação"
						className={`${styles3.textareaItem} ${styles2["textarea-conta"]}`}
						{...register("notes")}
					/>
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

export default MinhaContaLider;
