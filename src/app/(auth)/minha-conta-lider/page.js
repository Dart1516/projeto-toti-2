import React from "react";
import "../../../assets/styles/App.css";
import "../../../assets/styles/MinhaConta.css";
import "../../../assets/styles/SejaVoluntario.css";
import HeaderMinhaConta from "../../../components/Header-Login";
import Footer from '../../../components/Footer'

function minhaConta() {
  return (
    <div className="App-Conta">
      <HeaderMinhaConta />
      <div className="minhaConta">
      <div className="section">
        <h2 className="titulo-conta">Minha Conta</h2>
        <h2 className="subtitulo-conta">Dados Pessoais</h2>
        <div className="inputs">
          <div className="input-field">
            <label htmlFor="cpf">Cpf representante</label>
            <input type="text" id="cpf" placeholder="Cpf representante" className="input-text" />
          </div>
          <div className="input-field">
            <label htmlFor="nome">Nome representante</label>
            <input type="text" id="nome" placeholder="Nome representante" className="input-text" />
          </div>
          <div className="input-field">
            <label htmlFor="email">E-mail representante</label>
            <input type="text" id="email" placeholder="E-mail representante" className="input-text" />
          </div>
          <div className="input-field">
            <label htmlFor="telefone">Telefone representante</label>
            <input type="text" id="telefone" placeholder="Telefone (WhatsApp)" className="input-text" />
          </div>
          <div className="input-field">
            <label htmlFor="area">Área em que trabalha</label>
            <input type="text" id="area" placeholder="Área em que trabalha" className="input-text" />
          </div>
          <div className="input-field">
            <label htmlFor="estado">Estado que reside</label>
            <select id="estado" className="input-text">
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
          <div className="input-field">
            <label htmlFor="endereço">Endereço</label>
            <input type="text" id="endereço" placeholder="Endereço" className="input-text" />
          </div>
          <div className="input-field">
            <label htmlFor="numero">Número</label>
            <input type="text" id="numero" placeholder="Número" className="input-text" />
          </div>
          <div className="input-field">
            <label htmlFor="complemento">Complemento</label>
            <input type="text" id="complemento" placeholder="Complemento" className="input-text" />
          </div>
        </div>
        <div className="buttons">
          <button>Cancelar</button>
          <button>Salvar alterações</button>
        </div>
      </div>

      <div className="section">
        <h2 className="subtitulo-conta">Dados ONG</h2>
        <div className="inputs">
        <div className="input-field">
          <label htmlFor="CNPJ">CNPJ</label>
          <input type="text" id="CNPJ" placeholder="CNPJ" className="input-text" />
        </div>
        <div className="input-field">
          <label htmlFor="nomeOng">Nome</label>
          <input type="text" id="nomeOng" placeholder="Nome" className="input-text" />
        </div>
        <div className="input-field">
          <label htmlFor="emailOng">E-mail</label>
          <input type="text" id="emailOng" placeholder="E-mail" className="input-text" />
        </div>
        <div className="input-field">
          <label htmlFor="telefoneOng">Telefone</label>
          <input type="text" id="telefoneOng" placeholder="Telefone" className="input-text" />
        </div>
        <div className="input-field">
          <label htmlFor="estadoOng">Estado</label>
          <select id="estadoOng" className="input-text">
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
        <div className="input-field">
          <label htmlFor="endereçoOng">Endereço</label>
          <input type="text" id="endereçoOng" placeholder="Endereço" className="input-text" />
        </div>
        
      </div>
        <div className="buttons">
          <button>Cancelar</button>
          <button>Salvar alterações</button>
        </div>
      </div>

      <div className="section">
        <h2 className="subtitulo-conta">Cadastro</h2>
          <label htmlFor="observacao">Observação</label>
          <textarea id="observacao" placeholder="Observação" className="textarea-conta" />
        <div className="buttons">
          <button>Cancelar</button>
          <button>Salvar alterações</button>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
}

export default minhaConta;