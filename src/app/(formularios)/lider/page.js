"use client";
/* Formulario com Resolver (React Hoork From + ZOD)*/
import React, { useState } from "react";
import InputMask from "react-input-mask";
import "../../../assets/styles/App.css";
import "../../../assets/styles/SejaVoluntario.css";
import VisibilityOff from "@mui/icons-material/VisibilityOffOutlined";
import Visibility from "@mui/icons-material/VisibilityOutlined";
// import { IconButton, InputAdornment } from "@mui/material";
import { useRouter } from "next/navigation";
import { Api, ApiBrasil } from "../../../services/api";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import bcrypt from 'bcryptjs';

function validateCNPJ(cnpj) {
  //Algoritmo dos dígitos verificadores CNPJ
  cnpj = cnpj.replace(/\D/g, "");
  if (cnpj.length !== 14) {
    return false;
  }
  if (/^(\d)\1{13}$/.test(cnpj)) {
    return false;
  }
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(0)) {
    return false;
  }
  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(1)) {
    return false;
  }

  return true;
}

function validateCPF(cpf) {
  //Algoritmo dos dígitos verificadores CPF
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length !== 11) {
    return false;
  }
  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }
  let soma = 0;
  let resto;
  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(cpf.substring(9, 10))) {
    return false;
  }

  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(cpf.substring(10, 11))) {
    return false;
  }

  // Se chegou até aqui, o CPF é válido
  return true;
}

async function isCEPValid(state) {
  //Verifica o CEP na API Brasil
  try {
    const resp = await ApiBrasil.get(`/${state}`);
    return !resp.data.erro;
  } catch (error) {
    return false;
  }
}

const createFormDataSchema = z.object({
  // Validação com zod
  organization: z
    .string()
    .nonempty("A organização é obrigatório")
    .min(3, "A organização precisa no mínimo 3 carateres")
    .max(100, "A organização precisa no máximo 100 carateres"),
  cnpj: z
    .string()
    .nonempty("CNPJ é obrigatório")
    .regex(
      /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
      "CNPJ inválido. Exemplo: 99.999.999/9999-99"
    )
    .refine(validateCNPJ, "CNPJ inválido"),
  name: z
    .string()
    .nonempty("O Nome é obrigatório")
    .min(3, "O Nome precisa no mínimo 3 carateres")
    .max(50, "O Nome precisa no máximo 50 carateres"),
  cpf: z
    .string()
    .nonempty("CPF é obrigatório")
    .regex(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      "CPF inválido. Exemplo: 999.999.999-99"
    )
    .refine(validateCPF, "CPF inválido"),
  phoneNumber: z
    .string()
    .nonempty("O número de telefone é obrigatório")
    .regex(
      /^\(\d{2}\)\d{5}-\d{4}$/,
      "Número de telefone inválido. Exemplo: (99)99999-9999"),
  area: z
    .string()
    .nonempty("A é obrigatório")
    .min(3, "A precisa no mínimo 3 carateres")
    .max(100, "A precisa no máximo 100 carateres"),
  state: z
    .string()
    .nonempty("O CEP é obrigatório")
    .regex(/^\d{5}-\d{3}$/, "CEP inválido. Exemplo: 99999-999")
    .refine(isCEPValid, "CEP inválido"),
  address: z.string().optional(),
  email: z
    .string()
    .nonempty("O e-mail é obrigatório")
    .email("Formato de e-mail inválido"),
  verifyEmail: z
    .string()
    .nonempty("A verificação do e-mail é obrigatório")
    .email("Formato de e-mail inválido"),
  password: z
    .string()
    .nonempty("A senha é obrigatório")
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%;])(?!.*[#*+&=,.]).{8,}$/,
      "A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número, um caractere especial (@$%;), evite (#*+&=)"
    ),
  verifyPassword: z
    .string()
    .nonempty("A senha é obrigatório")
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%;])(?!.*[#*+&=,.]).{8,}$/,
      "A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número, um caractere especial (@$%;), evite (#*+&=),"
    ),
  notes: z.string().optional(),
  termos: z
    .boolean()
    .refine((value) => value, "Você precisa concordar com os termos"),
});

function FormularioLiderImigrante() {
  const router = useRouter();

  const [output, setOutput] = useState("");
  const [isCepFocused, setIsCepFocused] = useState(false);
  const [addressAPi, setAddressAPi] = useState({
    state: "",
    street: "",
    neighborhood: "",
    city: "",
    cep: "",
    address: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const dataSuperRefineSchema = createFormDataSchema.superRefine(
    (data, ctx) => {
      if (data.email !== data.verifyEmail) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Os emails não coincidem",
          path: ["verifyEmail"],
        });
      }
      if (data.password !== data.verifyPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "As senhas não coincidem",
          path: ["verifyPassword"],
        });
      }
    }
  );

  const {
    register,
    handleSubmit,
    formState: { isLoading, errors },
  } = useForm({
    resolver: zodResolver(dataSuperRefineSchema),
  });

  async function handleCEPApi(e) {
    //Usando a API Brasil para trouxer o endereço
    const cepcode = e.target.value;

    if (cepcode === "") {
      setAddressAPi({
        state: "",
        street: "",
        neighborhood: "",
        city: "",
        cep: "",
        address: "",
      });
    }
    setIsCepFocused(false);
    try {
      const resp = await ApiBrasil.get(`/${cepcode}`);
      setIsCepFocused(true);
      setAddressAPi({
        state: resp.data.state,
        street: resp.data.street,
        neighborhood: resp.data.neighborhood,
        city: resp.data.city,
        cep: resp.data.cep,
        address: `${resp.data.street}, ${resp.data.neighborhood}, ${resp.data.state}, ${resp.data.cep}`,
      });
      setFormData({
        ...formData,
        address: `${resp.data.street}, ${resp.data.neighborhood}, ${resp.data.state}, ${resp.data.cep}`,
      });
    } catch (error) {
      console.error("Erro na API do CEP", error);
      setAddressAPi({
        state: "",
        street: "",
        neighborhood: "",
        city: "",
        cep: "",
        address: "",
      });
    }
  }

  function createData(formData) {
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(formData.password, saltRounds);
    formData.password = hashedPassword;
    setOutput(JSON.stringify(formData, null, 2));
    console.log(formData);
    alert('Chamar a API para Guardar os dados')
    /*  Ver dados em page da pasta lider-2*/
  }

  return (
    <div className="App SV">
      <div className="background-image" />
      <div className="container">
        <div className="container-titulo">
          <h2>SOS Rio Grande do Sul </h2>
          <h2>
            Cadastro de Liderança de ONG para Imigrantes, Refugiados e Apátridas
          </h2>
        </div>
        <form onSubmit={handleSubmit(createData)} className="general-inputs">
          <div className="inputs formCadastro">
            {/* Organização */}
            <div className="input-field">
              <p htmlFor="organization">
                1. Nome da ONG que representa
                <span className="errorChar"> * </span>
              </p>
              <input
                className={`input-text ${
                  errors.organization ? "invalid" : "valid"
                }`}
                type="text"
                placeholder="Digite o nome da ONG"
                {...register("organization")}
              />
              <ErrorMessage
                className="error-message"
                errors={errors}
                name="organization"
                as="p"
              />
            </div>

            {/* CNPJ*/}
            <div className="input-field">
              <p htmlFor="cnpj">
                2. CNPJ da ONG
                <span className="errorChar"> * </span>
              </p>
              <InputMask
                mask="99.999.999/9999-99"
                className={`input-text ${errors.cnpj ? "invalid" : "valid"}`}
                placeholder="Digite o CNPJ, um valor numérico"
                {...register("cnpj")}
              />
              <ErrorMessage
                className="error-message"
                errors={errors}
                name="cnpj"
                as="p"
              />
            </div>

            {/* Nome */}
            <div className="input-field">
              <p htmlFor="name">
                3. Nome Completo do Representante Legal
                <span className="errorChar"> * </span>
              </p>
              <input
                className={`input-text ${errors.name ? "invalid" : "valid"}`}
                type="text"
                placeholder="Digite seu nome completo"
                {...register("name")}
              />
              <ErrorMessage
                className="error-message"
                errors={errors}
                name="name"
                as="p"
              />
            </div>

            {/* CPF*/}
            <div className="input-field">
              <p htmlFor="cpf">
                4. CPF do Representante Legal
                <span className="errorChar"> * </span>
              </p>
              <InputMask
                mask="999.999.999-99"
                className={`input-text ${errors.cpf ? "invalid" : "valid"}`}
                placeholder="Digite o CPF, um valor numérico"
                {...register("cpf")}
              />
              <ErrorMessage
                className="error-message"
                errors={errors}
                name="cpf"
                as="p"
              />
            </div>

            {/* Telefone*/}
            <div className="input-field">
              <p htmlFor="phoneNumber">
                5. Número do WhatsApp
                <span className="errorChar"> * </span>
              </p>
              <InputMask
                mask="(99)99999-9999"
                className={`input-text ${
                  errors.phoneNumber ? "invalid" : "valid"
                }`}
                placeholder="Digite seu número"
                {...register("phoneNumber")}
              />
              <ErrorMessage
                className="error-message"
                errors={errors}
                name="phoneNumber"
                as="p"
              />
            </div>

            {/* Area */}
            <div className="input-field">
              <p htmlFor="area">
                6. Área em que trabalha
                <span className="errorChar"> * </span>
              </p>
              <input
                className={`input-text ${errors.area ? "invalid" : "valid"}`}
                type="text"
                placeholder="Digite a área em que trabalha"
                {...register("area")}
              />
              <ErrorMessage
                className="error-message"
                errors={errors}
                name="area"
                as="p"
              />
            </div>

            {/* CEP */}
            <div className="input-field">
              <p htmlFor="state">
                7. CEP
                <span className="errorChar"> * </span>
              </p>
              <InputMask
                mask="99999-999"
                className={`input-text ${errors.state ? "invalid" : "valid"}`}
                placeholder="Digite seu CEP, um valor numérico"
                {...register("state")}
                onBlur={handleCEPApi}
              />
              <ErrorMessage
                className="error-message"
                errors={errors}
                name="state"
                as="p"
              />
            </div>

            {/* Endereço */}
            <div className="input-field">
              <p htmlFor="address">
                8. Endereço
                <span className="errorChar"> * </span>
              </p>
              <input
                className={`input-text ${errors.address ? "invalid" : "valid"}`}
                type="text"
                placeholder="Preencha o CEP"
                {...register("address")}
              />
              <ErrorMessage
                className="error-message"
                errors={errors}
                name="address"
                as="p"
              />
            </div>
          </div>

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
            {/* Email */}
            <div className="input-field">
              <p htmlFor="email">
                Email para cadastro
                <span className="errorChar"> * </span>
              </p>
              <input
                className={`input-text ${errors.email ? "invalid" : "valid"}`}
                type="email"
                placeholder="Digite seu e-mail"
                {...register("email")}
              />
              <ErrorMessage
                className="error-message"
                errors={errors}
                name="email"
                as="p"
              />
            </div>

            {/* Verifique Email */}
            <div className="input-field">
              <p htmlFor="verifyEmail">
                Verificação do Email
                <span className="errorChar"> * </span>
              </p>
              <input
                className={`input-text ${
                  errors.verifyEmail ? "invalid" : "valid"
                }`}
                type="email"
                placeholder="Confirme seu e-mail"
                {...register("verifyEmail")}
              />
              <ErrorMessage
                className="error-message"
                errors={errors}
                name="verifyEmail"
                as="p"
              />
            </div>

            {/* Senha */}
            <div className="input-field">
              <p htmlFor="password">
                Senha
                <span className="errorChar"> * </span>
              </p>
              <div className="input-container">
                <input
                  className={`input-text ${
                    errors.password ? "invalid" : "valid"
                  }`}
                  type={showPassword ? "text" : "password"}
                  placeholder="Crie uma senha"
                  {...register("password")}
                />
                <button
                  className="visibility-icon"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </button>
              </div>
              <ErrorMessage
                className="error-message"
                errors={errors}
                name="password"
                as="p"
              />
            </div>

            {/* Confirmar Senha */}
            <div className="input-field">
              <p htmlFor="verifyPassword">
                Verificação de senha
                <span className="errorChar"> * </span>
              </p>
              <div className="input-container">
                <input
                  className={`input-text ${
                    errors.verifyPassword ? "invalid" : "valid"
                  }`}
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirme sua senha"
                  {...register("verifyPassword")}
                />
                <button
                  className="visibility-icon"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </button>
              </div>
              <ErrorMessage
                className="error-message"
                errors={errors}
                name="verifyPassword"
                as="p"
              />
            </div>
          </div>

          {/* Observações */}
          <div className="opcional">
            <p htmlFor="notes">Observações (opcional)</p>

            <textarea
              className="contact-inputs"
              {...register("notes")}
              cols="60"
              rows="10"
              placeholder="Digite suas observações aqui..."
            />
          </div>

          {/* Termoslegais */}
          <div>
            <div className="legal">
              <input type="checkbox" {...register("termos")} />
              <label htmlFor="termos">
                Ao marcar esta caixa e clicar em Enviar, aceito o tratamento de
                meus dados pessoais por{" "}
                <a href="/avisoLegal" target="_blank" rel="noreferrer">
                  Toters do Bem
                </a>{" "}
                conforme explicado no seu{" "}
                <a href="/avisoLegal" target="_blank" rel="noreferrer">
                  Aviso Legal de Proteção de Dados
                </a>
                , que inclui: 1) a coordenação e gestão de voluntários, e 2) a
                comunicação sobre atividades e oportunidades relacionadas.
              </label>
            </div>
            <div className="errorTermo">
              <ErrorMessage
                className="error-message"
                errors={errors}
                name="termos"
                as="p"
              />
            </div>
          </div>

          <button
            className={`SV${isLoading ? " submit-disabled" : ""}`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Carregando..." : "Enviar"}
          </button>
          <pre>{output}</pre>
        </form>
      </div>
      <footer className="App-footer" />
    </div>
  );
}

export default FormularioLiderImigrante;
