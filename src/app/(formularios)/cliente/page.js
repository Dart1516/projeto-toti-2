'use client';

import '../../../assets/styles/App.css';
import '../../../assets/styles/SejaVoluntario.css';
import '../../../assets/styles/AtendimentoFormulario.css';
import { useForm, Controller } from 'react-hook-form';
import { novoClienteValidator } from './novoClienteValidator';
import { zodResolver } from '@hookform/resolvers/zod';

export default function FormCliente() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(novoClienteValidator),
  });

  function formatCPF(value) {
    const cleaned = ('' + value).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
    if (match) {
      return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
    }
    return value;
  }
  function formatPhoneNumber(value) {
    const cleaned = ('' + value).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{0,1})(\d{4})(\d{4})$/);
    if (match) {
      const areaCode = match[1];
      const firstDigit = match[2];
      const firstPart = match[3];
      const secondPart = match[4];

      if (firstDigit === '') {
        return `(${areaCode})${firstPart}-${secondPart}`;
      } else {
        return `(${areaCode}) ${firstDigit} ${firstPart}-${secondPart}`;
      }
    }
    return value;
  }

  function onSubmit({ cpf, nome, numero, email }) {
    console.log(cpf, nome, numero, email);
  }

  return (
    <div className='App SV'>
      <div className='wrapper'>
        <span className='background-image'></span>
        <div className='form-aside'>
          <div className='container-titulo'>
            <h2 style={{ color: 'black', fontSize: '32px' }}>
              Quero ser atendido{' '}
            </h2>
            <p style={{ textAlign: 'left' }}>
              Abaixo, você pode criar sua conta e receber ajuda para SOS Rio
              Grande do Sul.
            </p>
          </div>
          <div className='form-container'>
            <p className='form-title'>Dados pessoais</p>
            <form
              className='inputs-container'
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className='input-container'>
                <label htmlFor='cpf'>CPF</label>
                <Controller
                  name='cpf'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <input
                      placeholder='000.000.000-00'
                      className='input-reset'
                      max={14}
                      {...field}
                      onChange={(e) => {
                        const filteredValue = formatCPF(e.target.value);
                        field.onChange(filteredValue);
                      }}
                    />
                  )}
                />
                {errors.cpf && (
                  <p style={{ color: 'red', fontSize: '12px' }}>
                    {errors.cpf.message}
                  </p>
                )}
              </div>
              <div className='input-container'>
                <label htmlFor='nome'>Nome</label>
                <input
                  className='input-reset'
                  name='nome'
                  placeholder='Nome completo'
                  {...register('nome')}
                />
                {errors.nome && (
                  <p style={{ color: 'red', fontSize: '12px' }}>
                    {errors.nome.message}
                  </p>
                )}
              </div>
              <div className='input-container'>
                <label htmlFor='email'>Email</label>
                <input
                  className='input-reset'
                  name='email'
                  placeholder='fulano@gmail.com'
                  type='email'
                  {...register('email')}
                />
                {errors.email && (
                  <p style={{ color: 'red', fontSize: '12px' }}>
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className='input-container'>
                <label htmlFor='numero'>Telefone</label>
                <Controller
                  name='numero'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <input
                      placeholder='(00) 9 0000-0000'
                      className='input-reset'
                      type='tel'
                      {...field}
                      onChange={(e) => {
                        const filteredValue = formatPhoneNumber(e.target.value);
                        field.onChange(filteredValue);
                      }}
                    />
                  )}
                />
                {errors.numero && (
                  <p style={{ color: 'red', fontSize: '12px' }}>
                    {errors.numero.message}
                  </p>
                )}
              </div>
              <button className={`SV`} type='submit'>
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
