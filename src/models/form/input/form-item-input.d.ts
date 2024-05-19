import { FormOptionInput } from "./form-option-input.d";
import { FormFieldType } from "../form-field-type.d";

export interface FormItemInput {
    name: string;
    nameOverride?: string;
    fieldType: FormFieldType;
    placeholder?: string;
    description?: string;
    required?: boolean;
    defaultValue?: string | number | (string | number)[];
    options?: FormOptionInput[];
    min?: number;
    max?: number;
    step?: number;
    validationRules?: {
      validator: (data: any) => any;
      params?: { message?: string; path?: (string | number)[]; params?: object };
    };
  }