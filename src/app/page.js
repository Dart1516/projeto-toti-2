"use client";

import React, { useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { Typography } from "@mui/material";
import Footer from "../components/Footer";
import Header from "../components/Header-NavMenu";
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
import psicologa from '../assets/images/psicologa.svg';
import '../assets/styles/App.css';
import '../assets/styles/HomePage.css';
import Video1 from "../assets/videos/home.mp4";

export default function Home() {
  const [activeIndices, setActiveIndices] = useState({});

  const toggleSign = (index) => {
    setActiveIndices((prevState) => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  return (
    <div className="App">
      <Header />
      <div className="body">
        <div className="background-main">
          <div className='main'>
            <div className='text-home'>
              <div className='titulo-home'>
                <h2>TOTERS do BEM,</h2>
                <h2>SOS RIO GRANDE DO SUL</h2>
              </div>
              <p>Uma plataforma que conecta Psicólogos e Educadores Sociais com um líder Comunitário para prestação de serviço voluntário às vítimas das inundações no Rio Grande do Sul</p>  
              <div className='sub-text-home'>
                <Link href="/servicos">quero ser voluntário</Link>
                <Link href='/servicos'>quero ser atendido</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="voluntariado">
          <div className='tipo-vo-texto'>
            <Typography variant="h3"><strong>Como você pode ajudar?</strong></Typography>
            <p>sua ajuda é crucial para fornecer apoio emergencial às comunidades afetadas, há várias maneiras pelas quais você pode contribuir:</p>
          </div>
          <div className="card-container">
            <div className="card-item">
              <div className="card-img">
                <Image src={psicologa} alt="Voluntariado Psicológico" width={500} height={300} />
              </div>
              <div className="card-text">
                <h2>Voluntariado Psicológico</h2>
                <p>O especialista capaz de oferecer ajuda psicológica, dando as ferramentas para lidar com traumas, fornecerá suporte emocional, tratará estresse pós-traumático e ajudara na recuperação mental.</p>
                <Link href="/servicos">Junte-se a causa</Link>
              </div>
            </div>
            <div className="card-item">
              <div className="card-img">
                <Image src={educador} alt="Educadores Sociais" width={500} height={300} />
              </div>
              <div className="card-text">
                <h2>Educadores Sociais</h2>
                <p>Profissionais que trabalham para promover o bem-estar e a inclusão social de individuos e comunidades afetadas pela enchente e que precisam começar do zero.</p>
                <Link href="/servicos">Junte-se a causa</Link>
              </div>
            </div>
            <div className="card-item">
              <div className="card-img">
                <Image src={lideres} alt="Líderes Comunitários" width={500} height={300} />
              </div>
              <div className="card-text">
                <h2>Líderes Comunitários</h2>
                <p>pessoas que organizam e mobilizam ações de apoio em situações de crise, capazes de orientar e direcionar personas em alto nivel de estresse.</p>
                <Link href="/servicos">Junte-se a causa</Link>
              </div>
            </div>
          </div>
        </div>
        <div className='video-espacio'>
          <div className='video'>
            <video src={Video1} controls />
          </div>
          <div className='text-video'>
            <div className='titulo-video'>
              <h2 className="titulo-h2">Estragos no Rio Grande do Sul</h2>
            </div>
            <p>As chuvas que atingem o Rio Grande do Sul causam muita destruição. O governo do estado já considera a tragédia como a pior da história</p>  
            <div className='sub-text-video'>
              <Link href="/servicos">quero ser voluntário</Link>
            </div>
          </div>
        </div>
        <div id="registro-processo">
          <div className="proceso-voluntariado">
            <h1>processo de voluntariado</h1>
            <div className="proceso-texto">
              <h2 className="h2-processo-voluntariado">registro</h2>
              <p>complete o <Link href="./JoinUs">formulário</Link> de inscrição com seus dados pessoais e experiência.</p>
            </div>
            <div className="proceso-texto">
              <h2 className="h2-processo-voluntariado">para onde vão meus dados?</h2>
              <p> iram ao banco de dados que estará disponível para os lideres dos refugiados, que necessitam da ajuda de você</p>
            </div>
            <div className="proceso-texto">
              <h2 className="h2-processo-voluntariado">depois do cadastro</h2>
              <p>o Lider do refugiado que precise da sua ajuda entrará em contato, e você será designado para uma área específica, com base na suas habilidades e disponibilidade.</p>
            </div>
            <div className="proceso-texto contato">
              <h2 className="h2-processo-voluntariado">depois do contato</h2>
              <p>Comece a oferecer seu apoio às comunidades afetadas. O líder fornecerá os detalhes do serviço.</p>
            </div>
          </div>
          <div className="proceso-voluntariado liderança">
            <h1>processo de liderança</h1>
            <div className="proceso-texto-liderança">
              <h2 className="h2-processo-voluntariado">registro</h2>
              <p>complete o <Link href="./JoinUs">formulário</Link> de inscrição com seus dados pessoais</p>
            </div>
            <div className="proceso-texto-liderança">
              <h2 className="h2-processo-voluntariado">para onde vão meus dados?</h2>
              <p> só você terá acesso a seus dados</p>
            </div>
            <div className="proceso-texto-liderança">
              <h2 className="h2-processo-voluntariado">depois do cadastro</h2>
              <p>com o email e a senha que você cadastrou, terá acesso a lista dos voluntarios disponíveis para atendimento dos seus refugiados</p>
            </div>
            <div className="proceso-texto-liderança">
              <h2 className="h2-processo-voluntariado">contato</h2>
              <p>Será disponibilizado telefone e email do voluntario para você entrar en contato e receber a ajuda que necessitam o mais rápido possível</p>
            </div>
          </div>
        </div>
        <div className='banner-espacio'>
          <div className='texto-video'>
            <h2>Faça parte dos que fazem a diferença</h2>
          </div>
          <div className="desplazarImágenes">
            <div className="contenedorImágenes">
              <Image src={Banner1} alt='galeria de fotos' width={500} height={300} />
              <Image src={Banner2} alt='galeria de fotos' width={500} height={300} />
              <Image src={Banner3} alt='galeria de fotos' width={500} height={300} />
              <Image src={Banner4} alt='galeria de fotos' width={500} height={300} />
              <Image src={Banner5} alt='galeria de fotos' width={500} height={300} />
              <Image src={Banner6} alt='galeria de fotos' width={500} height={300} />
              <Image src={Banner7} alt='galeria de fotos' width={500} height={300} />
              <Image src={Banner8} alt='galeria de fotos' width={500} height={300} />
              <Image src={Banner1} alt='galeria de fotos' width={500} height={300} />
              <Image src={Banner2} alt='galeria de fotos' width={500} height={300} />
              <Image src={Banner3} alt='galeria de fotos' width={500} height={300} />
            </div>
          </div>
        </div>
        <div className='perguntas-section'>
          <h2 className="titulo-h2 second">Perguntas frequentes</h2>
          <div className='pergunta'>
            <div className="pergunta-encabeçado">
              <div className='titulo-pergunta'>
                <h2>01</h2>
                <h1>O que é a Comunidade Toti</h1>
              </div>
              <button className={`sign ${activeIndices[0] ? 'active' : ''}`} onClick={() => toggleSign(0)}>
                <div></div>
                <div></div>
              </button>
            </div>
            <div className={`resposta ${activeIndices[0] ? 'show' : ''}`}>
              <p>A Comunidade Toti é um coletivo de profissionais que tem como objetivo conectar Psicólogos e Educadores Sociais com um Líder Comunitário para prestação de serviço voluntário.</p>
            </div>
          </div>
          <div className='pergunta'>
            <div className="pergunta-encabeçado">
              <div className='titulo-pergunta'>
                <h2>02</h2>
                <h1>Como posso me voluntariar?</h1>
              </div>
              <button className={`sign ${activeIndices[1] ? 'active' : ''}`} onClick={() => toggleSign(1)}>
                <div></div>
                <div></div>
              </button>
            </div>
            <div className={`resposta ${activeIndices[1] ? 'show' : ''}`}>
              <p>Para se voluntariar, basta acessar a página Serviços e selecionar sua categoria. Após isso, você irá preencher preencher um formulário com suas informações e interesses. Assim que recebermos a demanda dos solicitantes O Líder Comunitário entrará em contato para discutir como você pode contribuir.</p>
            </div>
          </div>
          <div className='pergunta'>
            <div className="pergunta-encabeçado">
              <div className='titulo-pergunta'>
                <h2>03</h2>
                <h1>Quem é que é o Líder Comunitario?</h1>
              </div>
              <button className={`sign ${activeIndices[2] ? 'active' : ''}`} onClick={() => toggleSign(2)}>
                <div></div>
                <div></div>
              </button>
            </div>
            <div className={`resposta ${activeIndices[2] ? 'show' : ''}`}>
              <p>O líder comunitário é a pessoa responsável por prestar coordenação e ajuda às pessoas em situação de vulnerabilidade, que buscam diferentes tipos de apoio das ONGs. Ele desempenha um papel fundamental na comunidade, agindo como um elo entre as organizações e os indivíduos que necessitam de assistência, garantindo que os recursos e serviços sejam acessíveis e eficazmente distribuídos. Além disso, o líder comunitário trabalha para fortalecer a coesão social e promover o desenvolvimento sustentável na sua área de atuação.</p>
            </div>
          </div>
          <div className='pergunta'>
            <div className="pergunta-encabeçado">
              <div className='titulo-pergunta'>
                <h2>03</h2>
                <h1>Quais são as áreas de atuação para voluntários?</h1>
              </div>
              <button className={`sign ${activeIndices[3] ? 'active' : ''}`} onClick={() => toggleSign(3)}>
                <div></div>
                <div></div>
              </button>
            </div>
            <div className={`resposta ${activeIndices[3] ? 'show' : ''}`}>
              <p>Por enquanto, os voluntários podem atuar em três áreas, incluindo apoio psicológico, educação social e liderança de grupos. Nosso objetivo é aumentar as áreas de atuação para que mais voluntários possam se juntar.</p>
            </div>
          </div>
          <div className='pergunta'>
            <div className="pergunta-encabeçado">
              <div className='titulo-pergunta'>
                <h2>04</h2>
                <h1>Quais são os benefícios de se voluntariar?</h1>
              </div>
              <button className={`sign ${activeIndices[4] ? 'active' : ''}`} onClick={() => toggleSign(4)}>
                <div></div>
                <div></div>
              </button>
            </div>
            <div className={`resposta ${activeIndices[4] ? 'show' : ''}`}>
              <p>Voluntariar-se para apoiar o Estado do Rio Grande do Sul proporciona uma oportunidade única de impactar positivamente a vida de pessoas em um momento de fragilidade, além de desenvolver novas habilidades, expandir sua rede de contatos, profissional e pessoal, e contribuir para uma causa significativa.</p>
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
