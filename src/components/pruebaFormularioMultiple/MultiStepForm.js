import React, { useState } from "react";
import FormStepOne from "./FormStepOne";
import FormStepTwo from "./FormStepTwo";
import FormStepThree from "./FormStepThree";

const MultiStepForm = ({ type }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    birthDate: "",
    phoneNumber: "",
    state: "",
    crp: "",
    specialization: "",
    certificate: "",
    profession: "",
    organization: "",
    cnpj: "",
    email: "",
    verifyEmail: "",
    password: "",
    verifyPassword: "",
    termos: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí envías los datos al servidor o haces lo que necesites con ellos
    console.log(formData);
  };

  switch (step) {
    case 1:
      return <FormStepOne formData={formData} handleInputChange={handleInputChange} nextStep={nextStep} />;
    case 2:
      return <FormStepTwo formData={formData} handleInputChange={handleInputChange} nextStep={nextStep} prevStep={prevStep} type={type} />;
    case 3:
      return <FormStepThree formData={formData} handleInputChange={handleInputChange} prevStep={prevStep} handleSubmit={handleSubmit} />;
    default:
      return <div>Error: Unknown step</div>;
  }
};

export default MultiStepForm;
