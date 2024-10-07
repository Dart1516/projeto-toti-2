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
						Termo de Responsabilidade para Educadores Sociais Voluntários
					</h2>
					<div className="legal-content">
						<p>
							Ao marcar a caixa abaixo, concordo com os seguintes termos de
							responsabilidade como educador social voluntário de Toters do bem:
						</p>

						<h3 className="space-text">Parte Responsável:</h3>
						<p>Educador Social(a) ___________________________</p>

						<h3 className="space-text">Parte Beneficiária:</h3>
						<p>Imigrantes, Refugiados e Apátridas Vítimas das Enchentes no RS</p>
						<h3 className="space-text"> Propósito do Voluntariado</h3>
						<p>
							Os educadores sociais voluntários atuarão em bairros e escolas conectados
							pelas lideranças migrantes das ONGs que trabalham com imigrantes e
							refugiados. O objetivo principal é fornecer suporte presencial à
							comunidade, promovendo inclusão social, educação e cidadania.
						</p>
						<h3 className="space-text">Cláusulas:</h3>

						<h3>1. Compromisso e Responsabilidades:</h3>
						<p>
							O voluntariado será realizado exclusivamente de forma presencial,
							alinhado com as diretrizes fornecidas pelas lideranças migrantes das ONGs
							locais, e ao documento descritivo de necessidades e cronograma
							estabelecido. O voluntário (a) deve respeitar a cultura, os valores e as
							necessidades específicas da comunidade imigrante e refugiada. O
							voluntário (a) seguirá obrigatoriamente cronograma estabelecido
							conjuntamente com as lideranças migrantes das ONGs atuantes na
							comunidade.
						</p>
						<h3>2. Alinhamento com as Lideranças:</h3>
						<p>
							O voluntário (a) deve trabalhar diretamente em colaboração com as
							migrantes das ONGs responsáveis pelos bairros e escolas conectados. Antes
							de iniciar o trabalho, o voluntário compromete-se a participar de
							reuniões de alinhamento com as lideranças com o objetivo de entender as
							necessidades e expectativas da comunidade. Quaisquer mudanças ou ajustes
							no atendimento realizados por parte do voluntário (a) deve ser
							previamente comunicados e aprovados pelas lideranças.
						</p>
						<h3>3. Confidencialidade:</h3>
						<p>
							Informações pessoais e sensíveis compartilhadas pelos imigrantes e
							refugiados devem ser mantidas em sigilo, salvo em casos em que haja
							autorização expressa para compartilhamento ou necessidade de comunicação
							às autoridades competentes. É proibido o uso de imagens ou relatos das
							atividades sem o consentimento escrito prévio da liderança migrante da
							ONG e dos envolvidos.
						</p>
						<h3>4. Frequência e Pontualidade:</h3>
						<p>
							O voluntário (a) deve comparecer nos dias e horários acordados com a
							liderança, com pontualidade e assiduidade. Em caso de imprevistos ou
							impossibilidade de comparecimento, o voluntário deve informar a liderança
							com antecedência toda vez que a situação permitir.
						</p>
						<h3>5. Duração do Voluntariado:</h3>
						<p>
							O voluntariado será exercido em períodos estabelecidos conforme a
							necessidade das ONGs e acordado previamente com os voluntários. É
							esperado que o voluntário se comprometa com a duração mínima de
							atendimento contínuo, respeitando as legislações vigentes sobre
							voluntariado.
						</p>
						<h3>6. Direitos e Proteções:</h3>
						<p>
							O voluntário (a) têm o direito de trabalhar em ambientes seguros e
							respeitosos. Qualquer situação que comprometa a segurança ou dignidade da
							pessoa voluntária deve ser imediatamente reportada às lideranças e à
							Comunidade Toters do Bem.
						</p>
						<h3>7. Aceitação dos Termos:</h3>
						<p>
							Ao iniciar suas atividades, o voluntário (a) declara que leu e concorda
							com todos os termos e condições, comprometendo-se a segui-los durante o
							período de colaboração na comunidade beneficiada.
						</p>
					</div>
				</div>
			</div>

			<footer className="App-footer" />
		</div>
	);
}

export default TermoResponsabilidadePsicólogos;
