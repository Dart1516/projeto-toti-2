"use client";

import React from "react";
// import "../../../assets/styles/App.css";
// import "../../../assets/styles/SejaVoluntario.css";
// import "../../../assets/styles/avisoLegal.css";
import styles1 from "../../../assets/styles/App.module.css";
import styles2 from "../../../assets/styles/SejaVoluntario.module.css";
import styles3 from "../../../assets/styles/avisoLegal.module.css";
import { useRouter } from "next/navigation";

function TermoResponsabilidadePsicólogos() {
	const router = useRouter();
	return (
		<div className={styles1.App}>
			<div className={styles3["container-body"]}>
				<div className={styles3["aviso-legal"]}>
					<h2 className={styles2.titleh2}>
						Termo de Responsabilidade para Educadores Sociais Voluntários
					</h2>

					<div className={styles3["legal-content"]}>
						<p>
							Ao marcar a caixa abaixo, concordo com os seguintes termos de
							responsabilidade como psicólogo voluntário de Toters do bem:
						</p>

						<h3>1. Acordos de Sessões</h3>
						<p>
							Os acordos sobre a quantidade e periodicidade das sessões serão
							estabelecidos diretamente entre os pacientes e os psicólogos, de acordo
							com a abordagem terapêutica e a autonomia do profissional.
						</p>

						<h3>2. Sessões Remotas</h3>
						<p>
							As sessões serão realizadas exclusivamente de forma online; para garantir
							a segurança e a privacidade das informações dos pacientes, todos os
							atendimentos realizados por psicólogos devem ser efetuados através de
							plataformas de comunicação que utilizem tecnologia de criptografia de
							ponta a ponta. Esta medida visa proteger os dados sensíveis dos pacientes
							contra acessos não autorizados e assegurar a confidencialidade das
							sessões terapêuticas.
						</p>

						<h3>3. Confidencialidade</h3>
						<p>
							Manterei total confidencialidade sobre todas as informações
							compartilhadas pelos pacientes durante as sessões, conforme o código de
							ética profissional.
						</p>

						<h3>4. Pontualidade e Compromisso</h3>
						<p>
							Cumprirei os horários agendados e avisarei com antecedência mínima de 12
							horas em caso de necessidade de reagendamento.
						</p>

						<h3>5. Esclarecimento Importante</h3>
						<p>
							A empresa TOTERS DO BEM atua apenas como um divulgador de oportunidades
							para o serviço voluntário de psicologia. Os acordos serão estabelecidos
							entre os pacientes e psicólogos. Não nos responsabilizamos pela atuação
							ou comportamento dos pacientes .
						</p>

						<h3>6. Denúncias e Conduta Ética</h3>
						<p>
							Psicólogos que não seguirem as normas técnicas de conduta e as normas
							éticas serão retirados da plataforma caso haja alguma denúncia.
						</p>

						<h3>7. Conformidade com o CRP</h3>
						<p>
							Confirmo que estou sem nenhum problema com o CRP, que meu registro no CRP
							está ativo e sem pendências. Também estou cadastrado no Cadastro e-Psi,
							permitindo a psicoterapia no formato online.
						</p>
					</div>
				</div>
			</div>

			<footer className="App-footer" />
		</div>
	);
}

export default TermoResponsabilidadePsicólogos;
