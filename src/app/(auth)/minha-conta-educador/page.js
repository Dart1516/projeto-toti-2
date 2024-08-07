"use client"
import React, { useState } from "react";
import "../../../assets/styles/App.css";
import "../../../assets/styles/MinhaConta.css";
import "../../../assets/styles/SejaVoluntario.css";
import HeaderMinhaConta from "../../../components/Header-Login";
import Footer from '../../../components/Footer';
import { FaPlus, FaTrash } from 'react-icons/fa';

function MinhaContaEducador() {

  const [selectedOption, setSelectedOption] = useState(null);
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
  const [formData, setFormData] = useState({
    cpf: "",
    nome: "",
    dataNascimento: "",
    telefone: "",
    instagram: "",
    estado: "",
    cidade: "",
    crp: "",
    area: "",
    tipodevoluntariado: "",
    observacao: "",
    additionalDays: [{ day: "", hour: "" }]
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

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

  return (
    <div className="App-Conta">
      <HeaderMinhaConta />
      <div className="minhaConta">
        <div className="section">
          <h2 className="titulo-conta">Minha Conta</h2>
          <h2 className="subtitulo-conta">Dados Pessoais</h2>
          <div className="inputs">
            <div className="input-field">
              <label htmlFor="cpf">CPF</label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                value={formData.cpf}
                onChange={handleInputChange}
                placeholder="CPF"
                className="input-text"
              />
            </div>
            <div className="input-field">
              <label htmlFor="nome">Nome completo</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                placeholder="Nome completo"
                className="input-text"
              />
            </div>
            <div className="input-field">
              <label htmlFor="dataNascimento">Data de nascimento</label>
              <input
                type="date"
                id="dataNascimento"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleInputChange}
                placeholder="Data de nascimento"
                className="input-text"
              />
            </div>
            <div className="input-field">
              <label htmlFor="telefone">Telefone</label>
              <input
                type="text"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleInputChange}
                placeholder="Telefone (WhatsApp)"
                className="input-text"
              />
            </div>
            <div className="input-field">
              <label htmlFor="instagram">Instagram (opcional)</label>
              <input
                type="text"
                id="instagram"
                name="instagram"
                value={formData.instagram}
                onChange={handleInputChange}
                placeholder="Instagram"
                className="input-text"
              />
            </div>
            <div className="input-field">
              <label htmlFor="certificado">Certificado</label>
              <input
                type="text"
                id="certificado"
                name="certificado"
                value={formData.certificado}
                onChange={handleInputChange}
                placeholder="certificado"
                className="input-text"
              />
            </div>
            <div className="input-field">
              <label htmlFor="estado">Estado</label>
              <select
                id="estado"
                name="estado"
                value={formData.estado}
                onChange={handleInputChange}
                className="input-text"
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
            <div className="input-field">
              <label htmlFor="cidade">Cidade</label>
              <input
                type="text"
                id="cidade"
                name="cidade"
                value={formData.cidade}
                onChange={handleInputChange}
                placeholder="Cidade"
                className="input-text"
              />
            </div>
            <div className="input-field">
              <label htmlFor="endereço">Endereço</label>
              <input
                type="text"
                id="endereço"
                name="endereço"
                value={formData.endereço}
                onChange={handleInputChange}
                placeholder="Endereço"
                className="input-text"
              />
            </div>
            <div className="input-field">
              <label htmlFor="numero">Número</label>
              <input
                type="text"
                id="numero"
                name="numero"
                value={formData.numero}
                onChange={handleInputChange}
                placeholder="Número"
                className="input-text"
              />
            </div>
            <div className="input-field">
              <label htmlFor="complemento">Complemento</label>
              <input
                type="text"
                id="complemento"
                name="complemento"
                value={formData.complemento}
                onChange={handleInputChange}
                placeholder="Complemento"
                className="input-text"
              />
            </div>
            <div className="input-field">
              <label htmlFor="bairro">Bairro</label>
              <input
                type="text"
                id="bairro"
                name="bairro"
                value={formData.bairro}
                onChange={handleInputChange}
                placeholder="Bairro"
                className="input-text"
              />
            </div>
          </div>
          <div className="buttons">
            <button>Cancelar</button>
            <button>Salvar alterações</button>
          </div>
        </div>

        <div className="section">
          <h2 className="subtitulo-conta">Serviço</h2>
          <div className="radio-espacio">
            <p>Disponibilidade para prestar serviço na sua cidade ou bairro?</p>
            <div className="radio-option">
              <input
                type="radio"
                id="sim"
                name="serviço"
                value="sim"
                checked={selectedOption === "sim"}
                onChange={() => handleOptionChange("sim")}
              />
              <label htmlFor="sim">Sim</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="nao"
                name="serviço"
                value="nao"
                checked={selectedOption === "nao"}
                onChange={() => handleOptionChange("nao")}
              />
              <label htmlFor="nao">Não</label>
            </div>
          </div>
          <div className="buttons">
            <button>Cancelar</button>
            <button>Salvar alterações</button>
          </div>
        </div>

        <div className="form-group">
          <h2 className="subtitulo-conta">Disponibilidade</h2>
          {formData.additionalDays.map((additionalDay, index) => (
            <div key={index} className="dia-disponible">
              <div>
                <h4>Dia {index + 1}<span>*</span></h4>
                <select
                  className="form-select"
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
                <h4>Hora<span>*</span></h4>
                <select
                  className="form-select"
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
          <div className="button-dia-espacio" onClick={addDay}>
            <FaPlus />
            <h4 onClick={addDay} className="texto-dia">Adicionar outro dia</h4>
          </div>
          <div className="input-field">
            <label htmlFor="observacao">Observação</label>
            <textarea
              id="observacao"
              name="observacao"
              value={formData.observacao}
              onChange={handleInputChange}
              placeholder="Observacao"
              className="textarea-conta"
            />
          </div>
          <div className="buttons">
            <button>Cancelar</button>
            <button>Salvar alterações</button>
          </div>
        </div>

        <div className="section">
          <h2 className="subtitulo-conta">Cadastro</h2>
          <div className="input-field">
            <label htmlFor="observacao">Observação</label>
            <textarea
              id="observacao"
              name="observacao"
              value={formData.observacao}
              onChange={handleInputChange}
              placeholder="Observacao"
              className="textarea-conta"
            />
          </div>
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

export default MinhaContaEducador;
