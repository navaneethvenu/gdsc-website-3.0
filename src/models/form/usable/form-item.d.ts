import { FormOption } from "./form-option.d";
import { FormItemInput } from "../input/form-item-input.d";

export interface FormItem extends Omit<FormItemInput, "options"> {
    id: string;
    options?: {
      [id: string]: FormOption;
    };
  }