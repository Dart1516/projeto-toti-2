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
					<h2 className={styles2["color-title"]}>
						Termo de Responsabilidade para Líderes Comunitários Voluntários
					</h2>

					<div className={styles3["legal-content"]}>
						<p>
							Ao marcar a caixa abaixo, concordo com os seguintes termos de
							responsabilidade como psicólogo voluntário de Toters do bem:
						</p>
						<h3 className="space-text">Parte Responsável:</h3>
						<p>Líder Comunitário ___________________________</p>

						<h3 className="space-text">Parte Beneficiária:</h3>
						<p>Imigrantes, Refugiados e Apátridas Vítimas das Enchentes no RS</p>
						<h3>Propósito da Conexão com Voluntários</h3>
						<p>
							As lideranças migrantes das ONGs que trabalham com imigrantes e
							refugiados têm o papel de organizar e supervisionar as atividades tanto
							dos educadores sociais voluntários, que atuarão presencialmente, quanto
							dos psicólogos voluntários, que prestarão atendimento exclusivamente
							online, sempre cuidando do sigilo da informação envolvida. O objetivo é
							oferecer suporte social, educacional e emocional para promover inclusão e
							bem-estar nas comunidades atendidas.
						</p>
						<h3>1. Responsabilidades das Lideranças:</h3>
						<p>
							A pessoa liderança migrantes da ONGs é responsáveis pela orientação,
							supervisão e acompanhamento das atividades dos educadores sociais e
							psicólogos voluntários conectados pela Comunidade Toters do Bem. Para os
							educadores sociais, a pessoa liderança deve fornecer uma descrição clara
							das atividades presenciais a serem realizadas, alinhada às necessidades
							da comunidade. Para os psicólogos voluntários, a pessoa liderança precisa
							garantir que os atendimentos online sejam bem coordenados, respeitando a
							privacidade e a confidencialidade dos assistidos, atuando como ponto de
							contato para resolver quaisquer problemas de agendamento ou apoio técnico
							que possam surgir durante os atendimentos online. A liderança precisa
							garantir que todas as atividades dos voluntários (presenciais e online)
							respeitem a legislação vigente, incluindo as normas de trabalho
							voluntário e o Código de Ética Profissional aplicável a cada área.
						</p>

						<h3>2. Preenchimento de Relatórios:</h3>
						<p>
							A pessoa lideranças migrante das ONGs são responsáveis pelo preenchimento
							regular dos relatórios de voluntariado no site da Comunidade Toters do
							Bem, detalhando as atividades realizadas tanto pelos educadores sociais
							quanto pelos psicólogos, que fazem trabalhos dentro das suas comunidades
							O relatório deve incluir: Atividades realizadas presencialmente e online.
							Resultados e impactos na comunidade. Frequência, pontualidade e qualidade
							dos atendimentos. Feedback dos participantes sobre o serviço oferecido.
						</p>

						<h3>3. Legislação sobre Voluntariado:</h3>
						<p>
							As lideranças migrantes e os representantes das ONGs devem atuar dentro
							dos limites da legislação vigente de voluntariado no Brasil e são
							responsáveis por assegurar que os educadores sociais e psicólogos
							atuantes na sua comunidade estejam cumprindo as normativas vigentes no
							seu âmbito de atuação.
						</p>

						<h3>4. Aceitação dos Termos:</h3>
						<p>
							Ao concordar em participar da rede de conexão de voluntários, as
							lideranças migrantes das ONGs aceitam os presentes termos e condições,
							comprometendo-se a segui-los em todas as atividades realizadas, tanto
							presencialmente quanto online.
						</p>

						<h3>5. Esclarecimento Importante</h3>
						<p>
							A empresa TOTERS DO BEM atua apenas como um divulgador de oportunidades
							para o serviço voluntário de psicologia. Os acordos serão estabelecidos
							entre os pacientes e psicólogos. Não nos responsabilizamos pela atuação
							ou comportamento dos pacientes.
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
