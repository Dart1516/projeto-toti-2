"use client";

import { Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Banner1 from "../assets/images/Banner1.svg";
import Banner2 from "../assets/images/Banner2.svg";
import Banner3 from "../assets/images/Banner3.svg";
import Banner4 from "../assets/images/Banner4.svg";
import Banner5 from "../assets/images/Banner5.svg";
import Banner6 from "../assets/images/Banner6.svg";
import Banner7 from "../assets/images/Banner7.svg";
import Banner8 from "../assets/images/Banner8.svg";
import educador from "../assets/images/educador-social.svg";
import lideres from "../assets/images/lideres.svg";
import psicologa from "../assets/images/psicologa.svg";
import Footer from "../components/Footer";
import "../assets/styles/App.css";
import "../assets/styles/HomePage.css";
import Video1 from "../assets/videos/home.mp4";

export default function Home() {
	const [activeIndices, setActiveIndices] = useState({});

	const toggleSign = (index) => {
		setActiveIndices((prevState) => ({
			...prevState,
			[index]: !prevState[index],
		}));
	};

	return (
		<div className="App">
			<div className="body">
				<section className="background-main">
					<main className="main">
						<div className="text-home">
							<div className="text-container">
								<h1>TOTERS DO BEM, SOS RIO GRANDE DO SUL</h1>
								<p>
									Conectando voluntários e instituições para fortalecer o Rio Grande do
									Sul. Visando oferecer ajuda prática e esperança àqueles afetados pelas
									inundações no RS, disponibilizando serviços com psicólogos e educadores
									sociais.
								</p>
								{/* <p>
                  Uma plataforma para conectar voluntários e recursos, visando
                  oferecer ajuda prática e esperança àqueles afetados pelas
                  inundações no RS, disponibilizando serviços com psicólogos e
                  educadores sociais.
                </p> */}
							</div>
							<div className="sub-text-home">
								<Link href="/servicos">Quero ser voluntário</Link>
								{/* <Link href="/servicos">Quero ser atendido</Link> */}
							</div>
						</div>
					</main>
				</section>
				<div className="voluntariado">
					<div className="tipo-vo-texto">
						<Typography variant="h3">
							<strong>Como você pode ajudar?</strong>
						</Typography>
						<p>
							Sua ajuda é crucial para fornecer apoio emergencial às comunidades
							afetadas, há várias maneiras pelas quais você pode contribuir:
						</p>
					</div>
					<div className="card-container">
						<div className="card-item">
							<div className="card-img">
								<Image
									src={psicologa}
									alt="A imagem mostra duas pessoas sentadas frente a frente em um escritório ou sala de estar iluminada. A pessoa à esquerda, que parece ser uma profissional, está tomando notas enquanto conversa com a outra pessoa à direita, que está sentada em uma cadeira e parece estar compartilhando algo. Entre elas há uma mesa de vidro e uma planta grande. Há luz natural entrando por uma janela ao fundo."
									width={500}
									height={300}
								/>
							</div>
							<div className="card-text">
								<h2>Voluntariado Psicológico</h2>
								<p>
									O especialista capaz de oferecer ajuda psicológica, dando as
									ferramentas para lidar com traumas, fornecerá suporte emocional,
									tratará estresse pós-traumático e ajudara na recuperação mental.
								</p>
								{/* <Link href="/servicos">Junte-se a causa</Link> */}
								<Link href="/psicologo">Junte-se a causa</Link>
							</div>
						</div>
						<div className="card-item">
							<div className="card-img">
								<Image
									src={educador}
									alt=" A imagem captura um close-up de duas mãos entrelaçadas. Uma pessoa segura a mão da outra com delicadeza, transmitindo um gesto de apoio, conforto e empatia. O fundo desfocado, com tons quentes, reforça a sensação de acolhimento e conexão"
									width={500}
									height={300}
								/>
							</div>
							<div className="card-text">
								<h2>Educadores Sociais</h2>
								<p>
									Profissionais que trabalham para promover o bem-estar e a inclusão
									social de individuos e comunidades afetadas pela enchente e que
									precisam começar do zero.
								</p>
								{/* <Link href="/servicos">Junte-se a causa</Link> */}
								<Link href="/educador">Junte-se a causa</Link>
							</div>
						</div>
						<div className="card-item">
							<div className="card-img">
								<Image
									src={lideres}
									alt="A imagem mostra um grupo de pessoas, que uniram suas mãos no centro da imagem. As mãos, que pertencem a pessoas de diferentes idades e tons de pele, estão sobrepostas uma sobre a outra, formando uma pilha que simboliza a união, o trabalho em equipe e a colaboração"
									width={500}
									height={300}
								/>
							</div>
							<div className="card-text">
								<h2>Líderes Comunitários</h2>
								<p>
									Pessoas que organizam e mobilizam ações de apoio em situações de crise,
									capazes de orientar e direcionar personas em alto nivel de estresse.
								</p>
								{/* <Link href="/servicos">Junte-se a causa</Link> */}
								<Link href="/lider">Junte-se a causa</Link>
							</div>
						</div>
					</div>
				</div>
				<div className="video-espacio">
					<div className="video">
						{/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
						<video src={Video1} controls />
					</div>
					<div className="text-video">
						<div className="titulo-video">
							<h2 className="titulo-h2">Estragos no Rio Grande do Sul</h2>
						</div>
						<p>
							As chuvas que atingem o Rio Grande do Sul causam muita destruição. O
							governo do estado já considera a tragédia como a pior da história
						</p>
						<div className="sub-text-video">
							<Link href="/servicos">Quero ser voluntário</Link>
						</div>
					</div>
				</div>
				<section className="registro-processo">
					<main className="processo-voluntariado">
						<div className="container">
							<h1>Processo de Voluntariado</h1>
							<div className="processos">
								<div className="processo">
									<h2>01</h2>
									<div className="texto-processo">
										<h3>Registro</h3>
										<p>
											Preencha o <Link href={"/servicos"}>formulário</Link> com seus dados
											pessoais e experiência.
										</p>
									</div>
								</div>
								<div className="processo">
									<h2>02</h2>
									<div className="texto-processo">
										<h3>Para onde vão meus dados?</h3>
										<p>
											Iram ao banco de dados que estará disponível para os lideres dos
											refugiados, que necessitam da ajuda de você.
										</p>
									</div>
								</div>
								<div className="processo">
									<h2>03</h2>
									<div className="texto-processo">
										<h3>Depois do cadastro</h3>
										<p>
											o Lider do refugiado que precise da sua ajuda entrará em contato, e
											você será designado para uma área específica, com base na suas
											habilidades e disponibilidade.
										</p>
									</div>
								</div>
								<div className="processo">
									<h2>04</h2>
									<div className="texto-processo">
										<h3>Depois do contato</h3>
										<p>
											Comece a oferecer seu apoio às comunidades afetadas. O líder
											fornecerá os detalhes do serviço.
										</p>
									</div>
								</div>
							</div>
						</div>
					</main>
					<main className="processo-lider">
						<div className="container">
							<div className="processos">
								<div className="processo">
									<h2>01</h2>
									<div className="texto-processo">
										<h3>Registro</h3>
										<p>
											Preencha o <Link href={"/servicos"}>formulário</Link> de inscrição
											com seus dados pessoais.
										</p>
									</div>
								</div>
								<div className="processo">
									<h2>02</h2>
									<div className="texto-processo">
										<h3>Para onde vão meus dados?</h3>
										<p>só você terá acesso a seus dados.</p>
									</div>
								</div>
								<div className="processo">
									<h2>03</h2>
									<div className="texto-processo">
										<h3>Depois do cadastro</h3>
										<p>
											Com o email e a senha que você cadastrou, terá acesso a lista dos
											voluntarios disponíveis para atendimento dos seus refugiados.
										</p>
									</div>
								</div>
								<div className="processo">
									<h2>04</h2>
									<div className="texto-processo">
										<h3>Depois do contato</h3>
										<p>
											Será disponibilizado telefone e email do voluntario para você entrar
											en contato e receber a ajuda que necessitam o mais rápido possível.
										</p>
									</div>
								</div>
							</div>
							<h1>Processo de liderança</h1>
						</div>
					</main>
				</section>
				<div className="banner-espacio">
					<div className="texto-video">
						<h2>Faça parte dos que fazem a diferença</h2>
					</div>
					<div className="desplazarImágenes">
						<div className="contenedorImágenes">
							<Image
								src={Banner1}
								alt="A imagem mostra um grupo de pessoas reunidas em uma área ao ar livre dentro de uma comunidade. A maioria das pessoas são mulheres, algumas com crianças, que estão formando um círculo ou semicírculo. No centro, uma mulher vestida com uma jaqueta azul e um boné parece estar liderando uma conversa ou reunião, enquanto os outros a escutam atentamente. A cena acontece sob um céu claro, com cercas de madeira e casas ao fundo, sugerindo que estão em uma área residencial ou em um bairro humilde."
								width={500}
								height={300}
							/>
							<Image
								src={Banner2}
								alt=" Um grupo de pessoas está de pé ao ar livre, formando um círculo. Uma pessoa com um colete azul da ACNUR (Agência da ONU para Refugiados) está de costas para a câmera, observando o grupo. A maioria das pessoas no grupo são mulheres, e parecem estar participando de alguma atividade comunitária ou reunião"
								width={500}
								height={300}
							/>
							<Image
								src={Banner3}
								alt=" Um grande grupo de pessoas está reunido em um espaço interno, com várias sacolas pretas cheias no chão. Todos parecem felizes, e algumas pessoas mostram o polegar para cima. Há uma sensação de cooperação e trabalho em equipe."
								width={500}
								height={300}
							/>
							<Image
								src={Banner4}
								alt="A foto mostra um grupo de pessoas reunidas ao ar livre durante o dia, há uma pessoa de costas para a câmera, vestindo uma camiseta branca com texto nas costas e faz o símbolo da paz com os dedos. tem uma segunda pessoa também está de costas para a câmera e veste uma blusa escura, No lado esquerdo da imagem, mais pessoas são visíveis; estao interagindo entre eles, O fundo mostra um espaço aberto "
								width={500}
								height={300}
							/>
							<Image
								src={Banner5}
								alt="Duas mulheres sorridentes estão tirando uma selfie. Uma delas usa óculos e uma camiseta branca que diz Migração, Diversidade e Tecnologia Ambas estão felizes e parecem estar aproveitando o momento."
								width={500}
								height={300}
							/>
							<Image
								src={Banner6}
								alt="Imagem mostrando três pessoas em um espaço interno. À esquerda, duas pessoas estão sentadas em cadeiras de madeira, vestindo jaquetas azuis da UNHCR (Agência da ONU para Refugiados). Uma delas, com cabelo cacheado, está de costas, enquanto a outra, com o cabelo preso, está sentada ao fundo, de pernas cruzadas, olhando para a direita. À direita, um homem sentado em uma cadeira de plástico branca, usando um conjunto esportivo preto, segurando um celular e sorrindo. Há sacos empilhados no fundo e um ar-condicionado na parede."
								width={500}
								height={300}
							/>
							<Image
								src={Banner7}
								alt="Imagem mostrando dois homens de pé ao lado de uma caminhonete branca em uma rua. Eles estão frente a frente, interagindo. O homem à esquerda veste uma jaqueta azul com listras brancas, jeans e carrega uma mochila preta nas costas. O homem à direita usa um boné preto, suéter cinza, calças escuras e tênis esportivos. Ao redor da caminhonete, há várias sacolas com objetos e suprimentos."
								width={500}
								height={300}
							/>
							<Image
								src={Banner8}
								alt="Na imagem, podemos ver oito homens que, juntos, estão empurrando uma pequena lancha pesqueira. Seus rostos parecem um pouco tristes. Dentro da lancha, há uma mulher com uma blusa colorida e, na embarcação, há o que parece ser comida e outras coisas dentro de sacolas plásticas pretas. A rua está cheia de água ao redor das casas e, ao fundo, vê-se o pôr do sol."
								width={500}
								height={300}
							/>
							<Image
								src={Banner1}
								alt="A imagem mostra um grupo de pessoas reunidas em uma área ao ar livre dentro de uma comunidade. A maioria das pessoas são mulheres, algumas com crianças, que estão formando um círculo ou semicírculo. No centro, uma mulher vestida com uma jaqueta azul e um boné parece estar liderando uma conversa ou reunião, enquanto os outros a escutam atentamente. A cena acontece sob um céu claro, com cercas de madeira e casas ao fundo, sugerindo que estão em uma área residencial ou em um bairro humilde"
								width={500}
								height={300}
							/>
							<Image
								src={Banner2}
								alt="Um grupo de pessoas está de pé ao ar livre, formando um círculo. Uma pessoa com um colete azul da ACNUR (Agência da ONU para Refugiados) está de costas para a câmera, observando o grupo. A maioria das pessoas no grupo são mulheres, e parecem estar participando de alguma atividade comunitária ou reunião"
								width={500}
								height={300}
							/>
							<Image
								src={Banner3}
								alt="Um grande grupo de pessoas está reunido em um espaço interno, com várias sacolas pretas cheias no chão. Todos parecem felizes, e algumas pessoas mostram o polegar para cima. Há uma sensação de cooperação e trabalho em equipe"
								width={500}
								height={300}
							/>
						</div>
					</div>
				</div>
				<div className="perguntas-section">
					<h2 className="titulo-h2 second">Perguntas frequentes</h2>
					<div className="pergunta">
						<div className="pergunta-encabeçado">
							<div className="titulo-pergunta">
								<h2>01</h2>
								<h1>O que é a Comunidade Toti</h1>
							</div>
							<button
								className={`sign ${activeIndices[0] ? "active" : ""}`}
								onClick={() => toggleSign(0)}
							>
								<div />
								<div />
							</button>
						</div>
						<div className={`resposta ${activeIndices[0] ? "show" : ""}`}>
							<p>
								A Comunidade Toti é um coletivo de profissionais que tem como objetivo
								conectar Psicólogos e Educadores Sociais com um Líder Comunitário para
								prestação de serviço voluntário.
							</p>
						</div>
					</div>
					<div className="pergunta">
						<div className="pergunta-encabeçado">
							<div className="titulo-pergunta">
								<h2>02</h2>
								<h1>Como posso me voluntariar?</h1>
							</div>
							<button
								className={`sign ${activeIndices[1] ? "active" : ""}`}
								onClick={() => toggleSign(1)}
							>
								<div />
								<div />
							</button>
						</div>
						<div className={`resposta ${activeIndices[1] ? "show" : ""}`}>
							<p>
								Para se voluntariar, basta acessar a página Serviços e selecionar sua
								categoria. Após isso, você irá preencher preencher um formulário com
								suas informações e interesses. Assim que recebermos a demanda dos
								solicitantes O Líder Comunitário entrará em contato para discutir como
								você pode contribuir.
							</p>
						</div>
					</div>
					<div className="pergunta">
						<div className="pergunta-encabeçado">
							<div className="titulo-pergunta">
								<h2>03</h2>
								<h1>Quem é que é o Líder Comunitario?</h1>
							</div>
							<button
								className={`sign ${activeIndices[2] ? "active" : ""}`}
								onClick={() => toggleSign(2)}
							>
								<div />
								<div />
							</button>
						</div>
						<div className={`resposta ${activeIndices[2] ? "show" : ""}`}>
							<p>
								O líder comunitário é a pessoa responsável por prestar coordenação e
								ajuda às pessoas em situação de vulnerabilidade, que buscam diferentes
								tipos de apoio das ONGs. Ele desempenha um papel fundamental na
								comunidade, agindo como um elo entre as organizações e os indivíduos que
								necessitam de assistência, garantindo que os recursos e serviços sejam
								acessíveis e eficazmente distribuídos. Além disso, o líder comunitário
								trabalha para fortalecer a coesão social e promover o desenvolvimento
								sustentável na sua área de atuação.
							</p>
						</div>
					</div>
					<div className="pergunta">
						<div className="pergunta-encabeçado">
							<div className="titulo-pergunta">
								<h2>03</h2>
								<h1>Quais são as áreas de atuação para voluntários?</h1>
							</div>
							<button
								className={`sign ${activeIndices[3] ? "active" : ""}`}
								onClick={() => toggleSign(3)}
							>
								<div />
								<div />
							</button>
						</div>
						<div className={`resposta ${activeIndices[3] ? "show" : ""}`}>
							<p>
								Por enquanto, os voluntários podem atuar em três áreas, incluindo apoio
								psicológico, educação social e liderança de grupos. Nosso objetivo é
								aumentar as áreas de atuação para que mais voluntários possam se juntar.
							</p>
						</div>
					</div>
					<div className="pergunta">
						<div className="pergunta-encabeçado">
							<div className="titulo-pergunta">
								<h2>04</h2>
								<h1>Quais são os benefícios de se voluntariar?</h1>
							</div>
							<button
								className={`sign ${activeIndices[4] ? "active" : ""}`}
								onClick={() => toggleSign(4)}
							>
								<div />
								<div />
							</button>
						</div>
						<div className={`resposta ${activeIndices[4] ? "show" : ""}`}>
							<p>
								Voluntariar-se para apoiar o Estado do Rio Grande do Sul proporciona uma
								oportunidade única de impactar positivamente a vida de pessoas em um
								momento de fragilidade, além de desenvolver novas habilidades, expandir
								sua rede de contatos, profissional e pessoal, e contribuir para uma
								causa significativa.
							</p>
						</div>
					</div>
				</div>
			</div>
			<footer>
				<Footer />
			</footer>
		</div>
	);
}
