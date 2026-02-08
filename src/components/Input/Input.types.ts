export type InputType = 'text' | 'password' | 'email' | 'number' | 'date';

export interface InputProps {
  modelValue: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  type?: InputType;
  name?: string;
  required?: boolean;
}
