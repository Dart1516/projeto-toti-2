import React from "react";

const FormStepOne = ({ formData, handleInputChange, nextStep }) => {
  return (
    <div>
      <h2>Step 1: Información General</h2>
      <div>
        <label>Nome Completo</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>CPF</label>
        <input
          type="text"
          name="cpf"
          value={formData.cpf}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Data de Nascimento</label>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Número do WhatsApp</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Estado</label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleInputChange}
          required
        />
      </div>
      <button onClick={nextStep}>Next</button>
    </div>
  );
};

export default FormStepOne;
