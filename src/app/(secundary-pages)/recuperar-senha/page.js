"use client"
import React, { useState } from "react";
import Header from "../../../components/Header-NavMenu";
import "../../../assets/styles/Button.css";
import "../../../assets/styles/recuperarSenha.css"
import { Api } from "../../../services/api";
import { Typography} from "@mui/material";


const RecuperarSenha = () => {
  const [initialForm, setInitialForm] = useState({
    email: '',
    code: '',
    newPassword: '',
  });
  const [form, setForm] = useState(initialForm);
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [email, setEmailValidação] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const normalizedEmail = initialForm.email.toLowerCase();
        const response = await Api.post(`/recoverypassword/email?email=${normalizedEmail}`);
        console.log("dados enviados com sucesso:", response.data);
        setError('');
        setStep(2);
        setInitialForm("")
        console.log(normalizedEmail)
      if (response.data.length === 0) {
        setError("Usuário não encontrado.");
        setEmailValidação(response.data.email)
        return;
      }

    } catch (error) {
      console.error("Error al verificar usuário:", error);
      setError("Ocorreu um erro. Tente novamente.");
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };


  const handleVerifyCode = async () => {
    const { code, newPassword } = form;

    // Simulate verifying the code and resetting the password
    console.log(`Verifying code ${code} and setting new password to ${newPassword}`);
    setError('');
    setStep(3);
  };

  const handleNewPasswordSubmit = async () => {
    // Simulate submitting the new password
    console.log(`Submitting new password: ${form.newPassword}`);
    alert('Password successfully reset!');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="form-recovery-password">
            <h2>Recuperar senha</h2>
            <div className="form-method">
            <label htmlFor="email"  id="email-label">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              placeholder="Ingrese su correo electrónico"
              required
              className="input-method"
            />
             
            </div>
         
            <button  className="btnRecuperarSenha" onClick={handleSubmit}>Enviar código</button>
            {error && <p className="error">{error}</p>}
          </div>
        );
      case 2:
        return (
          <div className="form-recovery-password">
            <h2>Validar código</h2>
            <div className="form-method">
            <label htmlFor="code">Código:</label>
            <input
              type="text"
              id="code"
              name="code"
              value={form.code}
              onChange={handleInputChange}
              placeholder="Ingrese el código recibido"
              required
              className="input-method"
            />
           
            </div>
            <button className="btnRecuperarSenha" onClick={handleVerifyCode}>Validar código</button>
            {error && <p className="error">{error}</p>}
          <div className="form-method">
          <label htmlFor="newPassword">Nova Senha:</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={form.newPassword}
              onChange={handleInputChange}
              placeholder="Ingrese su nueva contraseña"
              required
              className="input-method"
            />
             
            
          </div>
          <button  className="btnRecuperarSenha" onClick={() => setStep(1)}>Voltar</button>
          </div>
        );
      case 3:
        return (
          <div className="form-recovery-password">
            <h2>Nova senha</h2>
            <p>Senha restablecida com sucesso.</p>
            <button  className="btnRecuperarSenha" onClick={handleNewPasswordSubmit}>Voltar para fazer login</button>
          <button className="btnRecuperarSenha" onClick={() => setStep(1)}>Voltar</button>

          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div id="" >
   <Header/>
   <div className="background-image"></div>
   <div id="container">
    <div id="body">
    <Typography variant="h4" color="black">Recuperar senha</Typography>
      {renderStep()}
    </div>

    </div>
    </div>
  );
};

export default RecuperarSenha;
