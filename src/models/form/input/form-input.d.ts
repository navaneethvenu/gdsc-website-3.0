import { FormPageInput } from "./form-page-input.d";

export interface FormInput {
    formDataInput: FormPageInput[];
    editable: boolean;
    customSubmissionTitle: string;
    customSubmissionMessage: string;
  }