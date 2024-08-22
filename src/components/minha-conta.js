"use client";
import { useUser } from "../api/UserContext";
import React from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import "../assets/styles/App.css";
import "../assets/styles/MinhaConta.css";
import "../assets/styles/SejaVoluntario.css";
export default function MinhaContaForm() {
  const { user } = useUser();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      cpf: user?.cpf,
      nome: user?.name,
      dataNascimento: user
        ? format(new Date(user?.birthDate), "yyyy-MM-dd")
        : "",
      telefone: user?.phoneNumber,
      telefone: user?.phoneNumber,
      instagram: user?.rede_social,
      estado: user?.state,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="section">
      <h2 className="titulo-conta">Minha Conta</h2>
      <h2 className="subtitulo-conta">Dados Pessoais</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputs">
          <div className="input-field">
            <label htmlFor="cpf">CPF</label>
            <input
              type="text"
              id="cpf"
              placeholder="CPF"
              className="input-text"
              {...register("cpf")}
            />
          </div>
          <div className="input-field">
            <label htmlFor="nome">Nome completo</label>
            <input
              type="text"
              id="nome"
              placeholder="Nome completo"
              className="input-text"
              {...register("nome")}
            />
          </div>
          <div className="input-field">
            <label htmlFor="dataNascimento">Data de nascimento</label>
            <input
              type="date"
              id="dataNascimento"
              placeholder="Data de nascimento"
              className="input-text"
              {...register("dataNascimento")}
            />
          </div>
          <div className="input-field">
            <label htmlFor="telefone">Telefone</label>
            <input
              type="text"
              id="telefone"
              placeholder="Telefone (WhatsApp)"
              className="input-text"
              {...register("telefone")}
            />
          </div>
          <div className="input-field">
            <label htmlFor="instagram">Instagram (opcional)</label>
            <input
              type="text"
              id="instagram"
              placeholder="Instagram"
              className="input-text"
              {...register("instagram")}
            />
          </div>
          <div className="input-field">
            <label htmlFor="estado">Estado</label>
            <select id="estado" className="input-text" {...register("estado")}>
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
        </div>
        <div className="buttons">
          <button type="button">Cancelar</button>
          <button type="submit">Salvar alterações</button>
        </div>
      </form>
    </div>
  );
}
