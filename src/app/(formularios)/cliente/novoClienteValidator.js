import { z } from 'zod';

export const novoClienteValidator = z.object({
  cpf: z
    .string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
    .refine(
      (value) => {
        const cpfDigits = value.replace(/[^\d]/g, ''); // Remove caracteres não numéricos
        let sum = 0;
        let mod;

        // Verifica se todos os dígitos são iguais
        if (/^(\d)\1+$/.test(cpfDigits)) return false;

        // Verifica o primeiro dígito verificador
        for (let i = 1; i <= 9; i++) {
          sum += parseInt(cpfDigits.substring(i - 1, i)) * (11 - i);
        }
        mod = (sum * 10) % 11;
        if (mod === 10 || mod === 11) mod = 0;
        if (mod !== parseInt(cpfDigits.substring(9, 10))) return false;

        // Verifica o segundo dígito verificador
        sum = 0;
        for (let i = 1; i <= 10; i++) {
          sum += parseInt(cpfDigits.substring(i - 1, i)) * (12 - i);
        }
        mod = (sum * 10) % 11;
        if (mod === 10 || mod === 11) mod = 0;
        if (mod !== parseInt(cpfDigits.substring(10, 11))) return false;

        return true;
      },
      { message: 'CPF inválido' }
    ),
  nome: z.string().min(1),
  email: z.string().email(),
  numero: z.string().regex(/^\(\d{2}\) \d{0,1} \d{4}-\d{4}$/),
});
