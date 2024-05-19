import { FormPageInput } from "../input/form-page-input.d"
import { FormGroup } from "./form-group.d"

export interface FormPage extends Omit<FormPageInput, "formGroups"> {
    id: string;
    formGroups: { [id: string]: FormGroup };
  }