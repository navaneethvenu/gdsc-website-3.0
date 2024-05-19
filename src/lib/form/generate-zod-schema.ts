import { FormFieldType } from "@/models/form/form-field-type.d";
import { FormItem } from "@/models/form/usable/form-item.d";
import { ZodArray, ZodNumber, ZodSchema, ZodString, z } from "zod";

export function generateZodSchema(item: FormItem): ZodSchema {
    let baseSchema: ZodSchema;
  
    switch (item.fieldType) {
      case FormFieldType.TEXT:
      case FormFieldType.TEXTAREA:
      case FormFieldType.EMAIL:
        baseSchema = z.string();
        break;
      case FormFieldType.NUMBER:
        baseSchema = z.coerce.number({
          required_error: `${item.name} cannot be empty`,
          invalid_type_error: `${item.name} cannot be empty`, //when it recieves NaN
        });
        break;
      case FormFieldType.CHECKBOX:
        baseSchema = z.array(z.string());
  
        break;
      case FormFieldType.RADIO:
      case FormFieldType.DROPDOWN:
        baseSchema = z.string();
        break;
      case FormFieldType.SLIDER:
        baseSchema = z.coerce.number();
        break;
      default:
        throw new Error(`Unsupported field type: ${item.fieldType}`);
    }
  
    if (
      item.fieldType === FormFieldType.TEXT ||
      item.fieldType === FormFieldType.TEXTAREA
    ) {
      baseSchema = (baseSchema as ZodString).trim();
      if (item.required)
        baseSchema = (baseSchema as ZodString).min(1, {
          message: `${item.nameOverride ?? item.name} cannot be empty.`,
        });
  
      if (item.required && item.min !== undefined && item.min !== null) {
        baseSchema = (baseSchema as ZodString).min(
          item.min,
          `${item.nameOverride ?? item.name} must be at minimum ${
            item.min
          } characters long`
        );
      }
  
      if (item.max !== undefined && item.max !== null) {
        baseSchema = (baseSchema as ZodString).max(
          item.max,
          `${item.nameOverride ?? item.name} must be at most ${
            item.max
          } characters long`
        );
      }
    }
  
    if (item.fieldType === FormFieldType.NUMBER) {
      if (item.required && item.min !== undefined && item.min !== null) {
        baseSchema = (baseSchema as ZodNumber).min(
          item.min,
          `${item.nameOverride ?? item.name} cannot be lesser than ${item.min}`
        );
      }
  
      if (item.max !== undefined && item.max !== null) {
        baseSchema = (baseSchema as ZodNumber).max(
          item.max,
          `${item.nameOverride ?? item.name} cannot be greater than ${item.max}`
        );
      }
  
      if (item.required)
        baseSchema = z.preprocess(
          (a) => parseInt(z.string().parse(a), 10),
          baseSchema
        );
      else
        baseSchema = z
          .literal("")
          .transform(() => undefined)
          .or(baseSchema)
          .optional();
  
      return baseSchema;
    }
  
    if (item.fieldType === FormFieldType.EMAIL) {
      if (item.required)
        baseSchema = (baseSchema as ZodString).email({
          message: `${
            item.nameOverride ?? item.name
          } must be a valid email address.`,
        });
    }
  
    if (item.fieldType === FormFieldType.CHECKBOX) {
      if (item.required) {
        baseSchema = (baseSchema as ZodArray<ZodString>).min(1, {
          message: `You must choose at least one value.`,
        });
  
        if (item.min && item.min !== undefined)
          baseSchema = (baseSchema as ZodArray<ZodString>).min(item.min, {
            message: `You must choose at least ${item.min} values.`,
          });
  
        if (item.max && item.max !== undefined)
          baseSchema = (baseSchema as ZodArray<ZodString>).max(item.max, {
            message: `You can choose at most ${item.max} values.`,
          });
      }
    }
  
    if (
      item.fieldType === FormFieldType.DROPDOWN ||
      item.fieldType === FormFieldType.RADIO
    ) {
      if (item.required)
        baseSchema = (baseSchema as ZodArray<ZodString>).min(1, {
          message: `${item.nameOverride ?? item.name} cannot be empty.`,
        });
    }
  
    if (item.validationRules && item.required) {
      baseSchema = baseSchema.refine(
        item.validationRules.validator,
        item.validationRules.params
      );
    }
  
    if (!item.required) {
      baseSchema = baseSchema.optional();
    }
  
    return baseSchema;
  }