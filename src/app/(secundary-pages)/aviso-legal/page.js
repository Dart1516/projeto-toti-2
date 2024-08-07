"use client"; 

import React from 'react';
import Header from "../../../components/Header-NavMenu";
import '../../../assets/styles/App.css';
import '../../../assets/styles/SejaVoluntario.css';
import "../../../assets/styles/avisoLegal.css"

function AvisoLegal() {
  return (
    <div className="App">
      <div className="App-header">
        <Header />
      </div>
      <div className='container-body'>
       <div className="aviso-legal">
        <h2>Aviso Legal de Proteção de Dados</h2>
        
        <div className="legal-content">
          <h3>1. Identificação do Responsável pelo Tratamento</h3>
          <p>
            Nome da organização: Toters do Bem <br />
            E-mail: admin@totersdobem.com.br
          </p>

          <h3>2. Dados Coletados</h3>
          <p>No âmbito de nosso site de voluntariado, coletamos e tratamos os seguintes dados pessoais:</p>
          <ul>
            <li>Nome completo</li>
            <li>Endereço de e-mail</li>
            <li>Número de telefone</li>
            <li>Profissão e especialidade</li>
            <li>Disponibilidade horária</li>
            <li>Outros dados relevantes para a gestão de voluntários</li>
          </ul>

          <h3>3. Finalidade do Tratamento de Dados</h3>
          <p>Os dados pessoais coletados serão utilizados exclusivamente para os seguintes fins:</p>
          <ul>
            <li>Coordenação e gestão de voluntários</li>
            <li>Atribuição de tarefas e acompanhamento de atividades</li>
            <li>Comunicação entre a organização e os voluntários</li>
            <li>Prestação de serviços de apoio às pessoas afetadas pela inundação no Rio Grande do Sul</li>
            <li>Avaliação da eficácia das intervenções e melhoria dos serviços prestados</li>
          </ul>

          <h3>4. Base Legal para o Tratamento de Dados</h3>
          <p>O tratamento dos dados pessoais é baseado no consentimento explícito dos interessados, que fornecem seus dados de forma voluntária através do formulário disponível em nosso site.</p>

          <h3>5. Direitos dos Titulares dos Dados</h3>
          <p>Os titulares dos dados têm o direito de:</p>
          <ul>
            <li>Acessar seus dados pessoais</li>
            <li>Solicitar a correção de dados inexatos</li>
            <li>Solicitar a eliminação de seus dados pessoais</li>
            <li>Opor-se ao tratamento de seus dados pessoais</li>
            <li>Solicitar a limitação do tratamento de seus dados pessoais</li>
            <li>Portabilidade dos dados</li>
          </ul>

          <h3>6. Segurança dos Dados</h3>
          <p>Implementamos medidas técnicas e organizacionais apropriadas para proteger os dados pessoais contra perda, uso indevido, acesso não autorizado, divulgação, alteração e destruição.</p>

          <h3>7. Alterações ao Aviso Legal</h3>
          <p>Reservamo-nos o direito de atualizar este Aviso Legal de Proteção de Dados periodicamente. Recomendamos que os voluntários revisem este aviso regularmente para se manterem informados sobre como protegemos seus dados.</p>
        </div>
      </div> 
      </div>
      

      <footer className="App-footer"></footer>
    </div>
  );
}

export default AvisoLegal;
