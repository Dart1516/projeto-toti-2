"use client";

import React from "react";
import "../../../assets/styles/App.css";
import "../../../assets/styles/SejaVoluntario.css";
import "../../../assets/styles/avisoLegal.css";
import { useRouter } from "next/navigation";

function TermoResponsabilidadePsicólogos() {
	const router = useRouter();
	return (
		<div className="App">
			<div className="container-body">
				<div className="aviso-legal">
					<h2 className="color-title">
						Termo de Responsabilidade para Psicólogos Voluntários
					</h2>
					<h3>
						Consultoria Online para Imigrantes, Refugiados e Apátridas Vítimas das
						Enchentes no RS
					</h3>
					<div className="legal-content">
						<p>
							Ao marcar a caixa abaixo, concordo com os seguintes termos de
							responsabilidade como psicólogo voluntário de Toters do bem:
						</p>

						<h3 className="space-text">Parte Responsável:</h3>
						<p>Psicólogo(a) ___________________________</p>
						<p>CRP ______________</p>
						<h3 className="space-text">Parte Beneficiária:</h3>
						<p>Imigrantes, Refugiados e Apátridas Vítimas das Enchentes no RS</p>
						<h3 className="space-text">Objetivo:</h3>
						<p>
							O presente termo tem como objetivo formalizar o compromisso do(a)
							psicólogo(a) em realizar pelo menos 10 (dez) sessões completas de
							consultoria online, destinadas ao apoio psicológico de imigrantes,
							refugiados e apátridas que foram vítimas das enchentes ocorridas no
							estado do Rio Grande do Sul (RS).
						</p>
						<h3 className="space-text">Cláusulas:</h3>

						<h3>1. Compromisso de Atendimento:</h3>
						<p>
							O(a) psicólogo(a) compromete-se a realizar no mínimo 10 (dez) sessões
							completas de consultoria psicológica online, garantindo a qualidade e a
							confidencialidade dos atendimentos.
						</p>
						<h3>2. Periodicidade das Sessões:</h3>
						<p>
							As sessões serão realizadas em dias e horários acordados previamente com
							os beneficiários, respeitando a disponibilidade de ambas as partes.
						</p>
						<h3>3. Confidencialidade:</h3>
						<p>
							O(a) psicólogo(a) deverá manter sigilo absoluto sobre todas as
							informações compartilhadas durante as sessões, conforme previsto no
							Código de Ética Profissional do Psicólogo.
						</p>
						<h3>4. Desistência ou Interrupção:</h3>
						<p>
							Em caso de desistência ou impossibilidade de continuidade por parte do(a)
							psicólogo(a), o mesmo deve informar à parte beneficiária com antecedência
							mínima de 7 (sete) dias, garantindo uma transição adequada para outro
							profissional, se necessário.
						</p>
						<h3>5. Responsabilidade Social:</h3>
						<p>
							O(a) psicólogo(a) reconhece a importância do atendimento para a saúde
							mental dos beneficiários, comprometendo-se a atuar de forma ética e
							responsável, contribuindo para o bem-estar dos imigrantes, refugiados e
							apátridas atendidos.
						</p>
						<h3>6. Relatórios e Feedback:</h3>
						<p>
							Após a realização das 10 (dez) sessões, o(a) psicólogo(a) deverá fornecer
							um relatório geral sobre o progresso dos atendimentos (sem violar o
							sigilo profissional), que poderá ser utilizado para a melhoria dos
							serviços prestados.
						</p>
						<h3>7. Disposições Gerais:</h3>
						<p>
							Este termo poderá ser revisado ou alterado mediante acordo entre as
							partes, com o objetivo de melhor atender às necessidades dos
							beneficiários.
						</p>
					</div>
				</div>
			</div>

			<footer className="App-footer" />
		</div>
	);
}

export default TermoResponsabilidadePsicólogos;
