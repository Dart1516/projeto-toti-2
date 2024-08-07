import React from "react";

const FormStepThree = ({ formData, handleInputChange, prevStep, handleSubmit }) => {
  return (
    <div>
      <h2>Step 3: Información de Contacto</h2>
      <div>
        <label>Email para Cadastro</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Verificação do Email</label>
        <input
          type="email"
          name="verifyEmail"
          value={formData.verifyEmail}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Senha</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Verificação de Senha</label>
        <input
          type="password"
          name="verifyPassword"
          value={formData.verifyPassword}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="termos"
            checked={formData.termos}
            onChange={handleInputChange}
            required
          />
          Aceito os termos de responsabilidade
        </label>
      </div>
      <button onClick={prevStep}>Back</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default FormStepThree;
