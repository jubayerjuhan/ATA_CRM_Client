export interface InputField {
  type: string;
  id: string;
  label: string;
  placeholder?: string;
  value?: string;
  options?: { value: string; label: string }[]; // For select fields
}

export interface InputFormModalProps {
  children?: React.ReactNode;
  triggerBtnTitle: string;
  submitBtnTitle: string;
  modalTitle?: string;
  description?: string;
  fields: InputField[];
  dialogOpen?: boolean;
  submitHandler?: (data: Record<string, string>) => void;
}
