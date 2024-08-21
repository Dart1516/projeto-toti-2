"use client";

import React, { useState } from "react";
import InputMask from "react-input-mask";
import "../../../assets/styles/App.css";
import "../../../assets/styles/SejaVoluntario.css";
import { FaTrash, FaPlus } from "react-icons/fa";
import { Api } from "../../../services/api";
import { useRouter } from "next/navigation";
import Visibility from "@mui/icons-material/VisibilityOutlined";
import VisibilityOff from "@mui/icons-material/VisibilityOffOutlined";
import { InputAdornment, IconButton, Input } from "@mui/material";
import Header from "../../../components/Header-NavMenu";

function FormularioEducadorSocial() {
  const router = useRouter();
  const [additionalDays, setAdditionalDays] = useState([{ day: "", hour: "" }]);
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    birthDate: "",
    phoneNumber: "",
    email: "",
    certificate: "",
    profession: "",
    state: "",
    insta: "",
    city: "",
    neighborhood: "",
    availability: "",
    additionalDays: [{ day: "", hour: "" }],
    password: "",
    verifyPassword: "",
    verifyEmail: "",
    notes: "",
    termos: false,
  });

  const [passwordError, setPasswordError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [emailMatchError, setEmailMatchError] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (form) => {
    delete form.insta;
    delete form.notes;
    const isNotEmpty = Object.keys(form).every((key) => form[key]);
    if (!form.termos) {
      setError(
        "Por favor, aceite os termos e condições antes de enviar o formulário."
      );
    } else if (!isNotEmpty) {
      setError("Por favor, preencha os campos que faltam.");
    }
    return isNotEmpty;
  };

  const [errorCpf, setErrorCpf] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const result = validateForm({ ...formData });
    if (!result) {
      setIsLoading(false);
      return;
    }

    const dataToSend = {
      ...formData,
      notes: formData.notes || "",
      birthDate: new Date(formData.birthDate).toISOString(), // Convertir a formato ISO-8601
    };

    delete dataToSend.verifyEmail;
    delete dataToSend.verifyPassword;

    try {
      const response = await Api.post("/cadastro/lideres", dataToSend);
      router.push("../../obrigado-page");
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      if (error.response?.data?.message?.includes("CPF já cadastrado")) {
        setErrorCpf("Usuário já existe, CPF cadastrado");
        setError("Erro ao enviar os dados: CPF ja existe");
      } else if (
        error.response?.data?.message?.includes("E-mail já cadastrado")
      ) {
        setErrorEmail("Usuario já existe, Email cadastrado");
        setError("Erro ao enviar dados: Email cadastrado");
      } else {
        setError(
          "Erro ao enviar dados: " +
            (error.response?.data?.message || error.message)
        );
      }
    }
    setIsLoading(false);
  };

  const handleTermsChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.checked });
  };

  const handleDayChange = (index, event) => {
    const values = [...additionalDays];
    values[index][event.target.name] = event.target.value;
    setAdditionalDays(values);
    setFormData({ ...formData, additionalDays: values });
  };

  const addDay = () => {
    const newDays = [...additionalDays, { day: "", hour: "" }];
    setAdditionalDays(newDays);
    setFormData({ ...formData, additionalDays: newDays });
  };

  const removeDay = (index) => {
    const values = [...additionalDays];
    values.splice(index, 1);
    setAdditionalDays(values);
    setFormData({ ...formData, additionalDays: values });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "password") {
      validatePassword(value);
    }

    if (name === "verifyPassword") {
      setPasswordMatchError(
        value !== formData.password ? "As senhas não coincidem." : ""
      );
    }

    if (name === "verifyEmail") {
      setEmailMatchError(
        value !== formData.email ? "Os emails não coincidem." : ""
      );
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [showPasswordVerify, setShowPasswordVerify] = useState(false);
  const handleTogglePasswordVerify = () => {
    setShowPasswordVerify(!showPasswordVerify);
  };

  const validatePassword = (password) => {
    let errors = [];
    if (!/(?=.*[a-z])/.test(password)) errors.push("Falta minúscula.");
    if (!/(?=.*[A-Z])/.test(password)) errors.push("Falta maiúscula.");
    if (!/(?=.*\d)/.test(password)) errors.push("Falta número.");
    if (!/(?=.*[@#$%^&=])/.test(password))
      errors.push("Falta símbolo. (@#$%&=)");
    if (password.length < 8) errors.push("A senha deve conter 8 caracteres.");
    setPasswordError(errors);
  };

  return (
    <div className="App SV">
      <div className="App-header">
        <Header />
      </div>
      <div className="background-image"></div>
      <div className="container">
        <div className="container-titulo">
          <h2>SOS Rio Grande do Sul </h2>
          <h2>Cadastro Educador Social Voluntário</h2>
        </div>
        <form className="general-inputs">
          <div className="inputs formCadastro">
            <div className="input-field">
              <h4>
                1. Nome Completo<span>*</span>
              </h4>
              <input
                className="input-text"
                type="text"
                name="name"
                placeholder="Digite seu nome"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-field">
              <h4>
                2. CPF<span>*</span>
              </h4>
              <InputMask
                mask="999.999.999-99"
                value={formData.cpf}
                onChange={handleInputChange}
                placeholder="Digite seu CPF O valor deve ser numérico"
                required
                pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                className={`input-text ${error ? "error-border" : ""}`}
                name="cpf"
              />
              {errorCpf && <p style={{ color: "red" }}>{errorCpf}</p>}
            </div>
            <div className="input-field">
              <h4>
                3. Data de Nascimento<span>*</span>
              </h4>
              <input
                className="input-text"
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-field">
              <h4>
                4. Número do WhatsApp<span>*</span>
              </h4>
              <InputMask
                mask="(99) 99999-9999"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="(DDD) Digite o número"
                required
                pattern="\(\d{2}\) \d{5}-\d{4}"
                className="input-text"
                name="phoneNumber"
              />
            </div>
            <div className="input-field">
              <h4>5. Social Mídia (opcional)</h4>
              <input
                className="input-text"
                type="text"
                name="insta"
                placeholder="Digite o nome de usuário"
                value={formData.insta}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <h4>
                6. Profession<span>*</span>
              </h4>
              <input
                className="input-text"
                type="text"
                name="profession"
                placeholder="Educador"
                value={formData.profession}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-field">
              <h4>
                7. Certificado<span>*</span>
              </h4>
              <input
                type="text"
                name="certificate"
                value={formData.certificate}
                onChange={handleInputChange}
                placeholder="Digite seu certificado"
                required
                className="input-text"
              />
            </div>
            <div className="input-field">
              <h4>
                8. Estado <span>*</span>
              </h4>
              <select
                className="form-select"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
              >
                <option value="">-Selecione-</option>
                <option value="SP">SP</option>
                <option value="MT">MT</option>
                <option value="MG">MG</option>
                <option value="CE">CE</option>
                <option value="AC">AC</option>
                <option value="AM">AM</option>
                <option value="RS">RS</option>
                <option value="MA">MA</option>
                <option value="MS">MS</option>
                <option value="RJ">RJ</option>
                <option value="RO">RO</option>
                <option value="SC">SC</option>
                <option value="PA">PA</option>
                <option value="PB">PB</option>
                <option value="PE">PE</option>
                <option value="PI">PI</option>
                <option value="RR">RR</option>
                <option value="RN">RN</option>
                <option value="SE">SE</option>
                <option value="TO">TO</option>
                <option value="DF">DF</option>
                <option value="GO">GO</option>
              </select>
            </div>
            <div className="input-field">
              <h4>
                9. Cidade<span>*</span>
              </h4>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Digite a Cidade"
                required
                className="input-text"
              />
            </div>
            <div className="input-field">
              <h4>
                10. Bairro <span>*</span>
              </h4>
              <input
                type="text"
                name="neighborhood"
                value={formData.neighborhood}
                onChange={handleInputChange}
                placeholder="Digite o Bairro"
                required
                className="input-text"
              />
            </div>
          </div>
          <div className="form-group formulario">
            <h4>
              Disponibilidade para prestar serviço presencial na sua cidade ou
              bairro <span>*</span>
            </h4>
            <select
              className="form-select"
              name="availability"
              value={formData.availability}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecione</option>
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </select>
          </div>
          <div className="form-group formulario">
            <h4>Qual é a região da sua preferencia? (opcional)</h4>
            <input
              className="input-text"
              type="text"
              name="regiao"
              placeholder="Digite uma região válida"
              value={formData.regiao}
              onChange={handleInputChange}
            />
          </div>
          {additionalDays.map((additionalDay, index) => (
            <div className="form-group formulario" key={index}>
              <div className="dia-disponible">
                <div>
                  <h4>
                    Dia Disponível {index + 1}
                    <span>*</span>
                  </h4>
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
                    <option value="Sabado">Sabado</option>
                    <option value="Domingo">Domingo</option>
                  </select>
                </div>
                <div>
                  <h4>
                    Hora Disponível {index + 1}
                    <span>*</span>
                  </h4>
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
                  <FaTrash
                    onClick={() => removeDay(index)}
                    className="borrar"
                  />
                )}
                {index === additionalDays.length - 1 && (
                  <button type="button" onClick={() => addDay()}>
                    <FaPlus />
                  </button>
                )}
              </div>
            </div>
          ))}
          <div className="lembre-text">
            <h1>Lembre-se:</h1>
            <p>
              Seu e-mail e senha cadastrados serão seu login para o acesso na
              plataforma
            </p>
            <p>
              Após preencher todos os seus dados clique em{" "}
              <strong>Enviar</strong> e seu cadastro estará completo
            </p>
          </div>
          <div className="inputs formCadastro">
            <div className="input-field">
              <h4>
                Email para cadastro<span>*</span>
              </h4>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Digite o seu e-mail"
                required
                className="input-text"
              />
              {errorEmail && <p style={{ color: "red" }}>{errorEmail}</p>}
            </div>
            <div className="input-field">
              <h4>
                Verificação do Email<span>*</span>
              </h4>
              <input
                type="email"
                name="verifyEmail"
                value={formData.verifyEmail}
                onChange={handleInputChange}
                placeholder="Confirme o seu e-mail"
                required
                className="input-text"
              />
              {emailMatchError && (
                <p style={{ color: "#ae0000" }}>{emailMatchError}</p>
              )}
            </div>
            <div className="input-field">
              <h4>
                Senha<span>*</span>
              </h4>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Crie sua senha"
                required
                className={
                  passwordError ? "input-text error-border" : "input-text"
                }
                inputProps={{
                  pattern:
                    "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_{}|:;'<>/?~])[A-Za-z0-9!@#$%^&*()_{}|:;'<>/?~]{8}$",
                  maxLength: 8,
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {passwordError.length > 0 && (
                <ul className="error-message">
                  {passwordError.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="input-field">
              <h4>
                Verificação de Senha<span>*</span>
              </h4>
              <Input
                type={showPasswordVerify ? "text" : "password"}
                name="verifyPassword"
                value={formData.verifyPassword}
                onChange={handleInputChange}
                placeholder="Confirme a sua senha"
                required
                className="input-text"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVerify}>
                      {showPasswordVerify ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {passwordMatchError && (
                <p style={{ color: "#ae0000" }}>{passwordMatchError}</p>
              )}
            </div>
          </div>
          <div className="opcional">
            <h4>Observação (opcional)</h4>
            <textarea
              name="notes"
              cols="60"
              rows="10"
              placeholder="Sua mensagem"
              className="contact-inputs"
              value={formData.notes}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="legal">
            <input
              type="checkbox"
              id="termos"
              name="termos"
              onChange={handleTermsChange}
              required
              checked={formData.termos}
            />
            <label htmlFor="termos">
              Ao marcar esta caixa e clicar em Enviar, aceito o tratamento de
              meus dados pessoais por{" "}
              <a href="/avisoLegal" target="_blank">
                Toters do bem
              </a>{" "}
              conforme explicado no seu{" "}
              <a href="/avisoLegal" target="_blank">
                Aviso Legal de Proteção de Dados
              </a>
              , que inclui: 1) a coordenação e gestão de voluntários, e 2) a
              comunicação sobre atividades e oportunidades relacionadas.
            </label>
          </div>
          {error && (
            <p style={{ color: "#ae0000", marginBottom: "1rem" }}>{error}</p>
          )}
          <button
            className={`SV${isLoading ? " submit-disabled" : ""}`}
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Enviar
          </button>
        </form>
      </div>
      <footer className="App-footer"></footer>
    </div>
  );
}

export default FormularioEducadorSocial;
