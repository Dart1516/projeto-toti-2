import React from "react";

const FormStepTwo = ({
	formData,
	handleInputChange,
	nextStep,
	prevStep,
	type,
}) => {
	return (
		<div>
			<h2>Step 2: Información Específica</h2>
			{type === "psicologo" && (
				<>
					<div>
						<label>CRP</label>
						<input
							type="text"
							name="crp"
							value={formData.crp}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div>
						<label>Área de Especialización</label>
						<input
							type="text"
							name="specialization"
							value={formData.specialization}
							onChange={handleInputChange}
							required
						/>
					</div>
				</>
			)}
			{type === "educador" && (
				<>
					<div>
						<label>Certificado</label>
						<input
							type="text"
							name="certificate"
							value={formData.certificate}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div>
						<label>Profissão</label>
						<input
							type="text"
							name="profession"
							value={formData.profession}
							onChange={handleInputChange}
							required
						/>
					</div>
				</>
			)}
			{type === "lider" && (
				<>
					<div>
						<label>Organización</label>
						<input
							type="text"
							name="organization"
							value={formData.organization}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div>
						<label>CNPJ</label>
						<input
							type="text"
							name="cnpj"
							value={formData.cnpj}
							onChange={handleInputChange}
							required
						/>
					</div>
				</>
			)}
			<button onClick={prevStep}>Back</button>
			<button onClick={nextStep}>Next</button>
		</div>
	);
};

export default FormStepTwo;
