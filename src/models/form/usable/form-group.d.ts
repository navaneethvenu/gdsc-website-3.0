import { FormGroupInput } from "../input/form-group-input.d";
import {FormItem} from "../usable/form-item.d"

export interface FormGroup extends Omit<FormGroupInput, "formItems"> {
  id: string;
  formItems: { [id: string]: FormItem };
}