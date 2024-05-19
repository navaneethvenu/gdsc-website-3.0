"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Control, UseFormReturn, useForm } from "react-hook-form";
import { ZodArray, ZodNumber, ZodOptional, ZodSchema, ZodString, z } from "zod";

import Button from "@/components/Button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ReactElement, useEffect, useState } from "react";
import { BodySmall, Heading2, Heading3 } from "@/components/type-styles";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, Check } from "lucide-react";
import { CommandList } from "cmdk";

enum FormFieldType {
  TEXT = "text",
  EMAIL = "email",
  NUMBER = "number",
  TEXTAREA = "textarea",
  CHECKBOX = "checkbox",
  RADIO = "radio",
  DROPDOWN = "dropdown",
}

interface FormItemInput {
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
  validationRules?: {
    validator: (data: any) => any;
    params?: { message?: string; path?: (string | number)[]; params?: object };
  };
}

interface FormOptionInput {
  label?: string;
  value: string;
}

interface FormGroupInput {
  name: string;
  formItems: FormItemInput[];
}

interface FormPageInput {
  name: string;
  formGroups: FormGroupInput[];
}

interface FormPageMap {
  [id: string]: FormPage;
}

interface FormOption extends FormOptionInput {
  id: string;
}

interface FormItem extends Omit<FormItemInput, "options"> {
  id: string;
  options?: {
    [id: string]: FormOption;
  };
}

interface FormGroup extends Omit<FormGroupInput, "formItems"> {
  id: string;
  formItems: { [id: string]: FormItem };
}

interface FormPage extends Omit<FormPageInput, "formGroups"> {
  id: string;
  formGroups: { [id: string]: FormGroup };
}

function generateZodSchema(item: FormItem): ZodSchema {
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
    baseSchema = (baseSchema as ZodString).email({
      message: `${
        item.nameOverride ?? item.name
      } must be a valid email address.`,
    });
  }

  if (item.fieldType === FormFieldType.CHECKBOX) {
    if (item.required)
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

  if (
    item.fieldType === FormFieldType.DROPDOWN ||
    item.fieldType === FormFieldType.RADIO
  ) {
    if (item.required)
      baseSchema = (baseSchema as ZodArray<ZodString>).min(1, {
        message: `${item.nameOverride ?? item.name} cannot be empty.`,
      });
  }

  if (item.validationRules) {
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

const formDataInput: FormPageInput[] = [
  {
    name: "Getting to Know",
    formGroups: [
      {
        name: "Interests and Expertise",
        formItems: [
          {
            fieldType: FormFieldType.NUMBER,
            name: "Areas of Interest",
            description:
              "Enter the fields or areas you're interested in (e.g., Web Development, Machine Learning, Cybersecurity, etc.).",
            placeholder: "E.g., Web Development, Data Science",
            max: 4,
            // defaultValue: 1,
            required: false,
          },
          {
            fieldType: FormFieldType.EMAIL,
            name: "Programming Email",
            placeholder: "E.g., Python, Java, JavaScript",
            description: "List any programming languages you're familiar with.",
            required: true,
            validationRules: {
              validator: (value) => value.endsWith("gmail.com"),
              params: {
                message: "email must end in gmail",
              },
            },
          },
        ],
      },
      {
        name: "Interests and Expereeetise",
        formItems: [
          {
            fieldType: FormFieldType.CHECKBOX,
            name: "Choose Areas of Interest",
            placeholder: "E.g., Web Development, Data Science",
            required: true,
            min: 2,
            max: 2,
            options: [
              {
                value: "Web Development",
              },
              {
                value: "App Development",
              },
              {
                label: "Test",
                value: "Data Science",
              },
            ],
            defaultValue: ["page1-group2-item1-option1"],
          },
          {
            fieldType: FormFieldType.TEXT,
            name: "Programming Languages",
            description: "List any programming languages you're familiar with.",
            placeholder: "E.g., Python, Java, JavaScript",
            required: false,
          },
          {
            fieldType: FormFieldType.DROPDOWN,
            name: "Choose Areas of Interest",
            nameOverride: "Areas of Interest",
            placeholder: "E.g., Web Development, Data Science",
            required: true,
            options: [
              {
                value: "Web Development",
              },
              {
                value: "App Development",
              },
              {
                label: "Test",
                value: "Data Science",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Page 2",
    formGroups: [
      {
        name: "Event Expectations",
        formItems: [
          {
            fieldType: FormFieldType.TEXTAREA,
            name: "Event Expectations",
            description:
              "What are your expectations from the 'Le Debut' freshers event? What would you like to learn or explore?",
            placeholder:
              "E.g., Learn about different career paths, network with industry professionals",
            required: true,
            max: 12,
          },
          {
            fieldType: FormFieldType.TEXT,
            name: "Preferred Sessions",
            placeholder: "E.g., Tech Talk, Hackathon, Coding Workshop",
            description:
              "List any specific types of sessions or activities you'd be interested in attending during the event.",
            required: false,
          },
        ],
      },
    ],
  },
  {
    name: "Page 3",
    formGroups: [
      {
        name: "Additional Information",
        formItems: [
          {
            fieldType: FormFieldType.TEXT,
            name: "Other Comments or Suggestions",
            description:
              "If you have any other comments, suggestions, or specific requirements for the event, please mention them here.",
            placeholder: "E.g., Accessibility concerns, preferred time slots",
            required: true,
          },
        ],
      },
    ],
  },
];

const generateFormPageMap = (formDataInput: FormPageInput[]): FormPageMap => {
  const formPageMap: FormPageMap = {};

  formDataInput.forEach((page, pageIndex) => {
    const pageId = `page${pageIndex + 1}`;
    formPageMap[pageId] = {
      id: pageId,
      name: page.name,
      formGroups: {},
    };
    page.formGroups.forEach((group, groupIndex) => {
      const groupId = `${pageId}-group${groupIndex + 1}`;
      formPageMap[pageId].formGroups[groupId] = {
        id: groupId,
        name: group.name,
        formItems: {},
      };

      group.formItems.forEach((item, itemIndex) => {
        const itemId = `${groupId}-item${itemIndex + 1}`;
        formPageMap[pageId].formGroups[groupId].formItems[itemId] = {
          id: itemId,
          ...item,
          options: undefined,
        };

        if (item.options) {
          formPageMap[pageId].formGroups[groupId].formItems[itemId].options =
            {};
          item.options.forEach((option, optionIndex) => {
            const optionId = `${itemId}-option${optionIndex + 1}`;
            formPageMap[pageId].formGroups[groupId].formItems[itemId].options![
              optionId
            ] = {
              id: optionId,
              ...option,
            };
          });
        }
      });
    });
  });

  return formPageMap;
};

interface createFormElementsProps {
  form: UseFormReturn<
    {
      [x: string]: any;
    },
    any,
    undefined
  >;
  currentPage: number;
  data: FormPageMap;
}

function createFormElements({
  form,
  currentPage,
  data,
}: createFormElementsProps) {
  const formElements: ReactElement[] = [];
  const pageElements: ReactElement[] = [];

  const page = data[`page${currentPage + 1}`];

  Object.entries(page.formGroups).forEach(([id, group]) => {
    const groupElements: ReactElement[] = [];

    Object.entries(group.formItems).forEach(([id, item]) => {
      groupElements.push(
        <FormField
          key={item.id}
          control={form.control}
          name={item.id}
          render={({ field }) => (
            <FormItem
              className={`flex flex-col ${
                item.description !== undefined ? "gap-2" : ""
              }`}
            >
              <div>
                <FormLabel className="grow-0">
                  {item.name}{" "}
                  <span className="text-onBackgroundTertiary">
                    {item.required! ? "" : " (optional)"}
                  </span>
                </FormLabel>
                <FormDescription className="text-onBackgroundSecondary">
                  {item.description}
                </FormDescription>
              </div>

              <FormControl>
                {item.fieldType === FormFieldType.TEXTAREA ? (
                  <Textarea
                    placeholder={item.placeholder}
                    className="max-h-64 bg-surfaceSecondary"
                    {...field}
                  />
                ) : item.fieldType === FormFieldType.CHECKBOX ? (
                  <div className="flex flex-col gap-2">
                    {Object.values(item.options!).map((option) => (
                      <FormField
                        key={option.id}
                        control={form.control}
                        name={item.id}
                        render={({ field }) => (
                          <FormItem
                            key={option.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                className="data-[state=checked]:bg-onBackgroundEmPrimary data-[state=checked]:border-onBackgroundEmPrimary"
                                checked={field.value?.includes(option.id)}
                                onCheckedChange={(checked: any) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        option.id,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value: string) => value !== option.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {option.label !== undefined
                                ? option.label
                                : option.value}
                            </FormLabel>
                          </FormItem>
                        )}
                      ></FormField>
                    ))}
                  </div>
                ) : item.fieldType === FormFieldType.RADIO ? (
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col gap-2"
                  >
                    {Object.values(item.options!).map((option) => (
                      <FormItem
                        key={option.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem
                            className="data-[state=checked]:text-onBackgroundEmPrimary data-[state=checked]:border-onBackgroundEmPrimary"
                            value={option.id}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {option.label !== undefined
                            ? option.label
                            : option.value}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                ) : item.fieldType === FormFieldType.DROPDOWN ? (
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <div>
                          <Button
                            variant="secondary"
                            role="combobox"
                            className={cn(
                              "rounded-lg bg-surfaceSecondary border-borderSecondary",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <div className="flex gap-2 items-center">
                              {field.value
                                ? Object.values(item.options!).find(
                                    (option) => option.id === field.value
                                  )?.value
                                : item.placeholder}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </div>
                          </Button>
                        </div>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command className="bg-surfaceSecondary text-onBackgroundPrimary border-borderSecondary">
                        <CommandInput
                          className="placeholder:text-onBackgroundTertiary"
                          placeholder={item.placeholder}
                        />
                        <CommandEmpty>No options found.</CommandEmpty>
                        <CommandGroup>
                          <CommandList>
                            {[
                              ...Object.values(item.options!),
                              {
                                id: "clear",
                                value: "clear",
                                label: "Clear",
                              },
                            ].map((option) => (
                              <CommandItem
                                className="aria-selected:bg-onBackgroundEmPrimary text-onBackgroundSecondary aria-selected:text-onBackgroundPrimary data-[disabled]:opacity-100"
                                value={option.value}
                                key={option.id}
                                onSelect={() => {
                                  console.log(item.id + option.id);
                                  form.setValue(item.id, option.id);

                                  if (option.id === "clear")
                                    form.resetField(item.id);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    option.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {option.label !== undefined
                                  ? option.label
                                  : option.value}
                              </CommandItem>
                            ))}
                          </CommandList>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                ) : (
                  <Input
                    autoComplete="on"
                    type={item.fieldType}
                    placeholder={item.placeholder}
                    className="bg-surfaceSecondary border-borderSecondary focus-visible:ring-onBackgroundEmPrimary"
                    {...field}
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    });

    pageElements.push(
      <div
        className="flex flex-col gap-12 align-start text-left"
        key={group.id}
      >
        {group.name !== undefined && <Heading3>{group.name}</Heading3>}
        <div className="flex flex-col gap-8">{groupElements}</div>
      </div>
    );
  });

  formElements.push(
    <div
      className="flex flex-col gap-24 pb-16 align-start text-center"
      key={page.id}
    >
      <div className="flex flex-col gap-2">
        <BodySmall className="text-onBackgroundTertiary">
          {`${currentPage + 1}/${Object.values(data).length}`}
        </BodySmall>
        <Heading2>{page.name}</Heading2>
      </div>
      <div className="flex flex-col gap-20">{pageElements}</div>
    </div>
  );

  return formElements;
}

interface GeneratedFormProps {
  data: FormPageMap;
}

function GeneratedForm({ data }: GeneratedFormProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [formElements, setFormElements] = useState<ReactElement[]>([]);

  const FormSchema = z.object(
    Object.values(data).reduce((acc: { [id: string]: ZodSchema }, page) => {
      Object.values(page.formGroups).forEach((fg) => {
        Object.values(fg.formItems).forEach((fi) => {
          acc[fi.id] = generateZodSchema(fi);
        });
      });
      return acc;
    }, {})
  );

  const defaultValues = Object.values(data).reduce((acc, page) => {
    Object.values(page.formGroups).forEach((group) => {
      Object.values(group.formItems).forEach((formItem) => {
        const fieldName = formItem.id;
        acc[fieldName] = formItem.defaultValue || "";
      });
    });
    return acc;
  }, {} as { [key: string]: string | number | (string | number)[] });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    setFormElements(
      createFormElements({ form: form, currentPage, data: data })
    );
  }, [form, currentPage, data]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(JSON.stringify(data, null, 2));
  }

  async function handleNextPage(e: React.SyntheticEvent<HTMLButtonElement>) {
    e.preventDefault();
    const currentPagefields = Object.values(
      data[`page${currentPage + 1}`].formGroups
    ).flatMap((fg) => Object.values(fg.formItems).flatMap((fi) => fi.id));
    const output = await form.trigger(currentPagefields, { shouldFocus: true }); // Validate fields in the current page
    if (!output) return;
    setCurrentPage((prevPage) => prevPage + 1);
  }

  async function handlePrevPage(e: React.SyntheticEvent<HTMLButtonElement>) {
    e.preventDefault();
    setCurrentPage((prevPage) => prevPage - 1);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {formElements}
        <div className="flex justify-between gap-4">
          {currentPage > 0 && (
            <Button
              className="w-full"
              variant="secondary"
              onClick={handlePrevPage}
            >
              Previous
            </Button>
          )}
          {currentPage < Object.values(data).length - 1 ? (
            <Button className="w-full" onClick={handleNextPage}>
              Next
            </Button>
          ) : (
            <Button className="w-full" type="submit">
              Submit
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}

export default function Page() {
  const [formData, setFormData] = useState<FormPageMap>();

  useEffect(() => {
    setFormData(generateFormPageMap(formDataInput));
  }, []);
  return (
    <div className="bg-backgroundPrimary flex flex-col overflow-x-hidden border-b border-borderPrimary">
      <div className="relative bg-backgroundSecondary bg-center bg-no-repeat bg-cover grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-y-6 md:gap-y-12 px-6 py-6 md:py-[84px] min-h-[50vh] justify-center">
        <div className=" text-center col-start-1 md:col-start-2 col-end-5 md:col-end-8 lg:col-end-12 flex flex-col gap-8 items-center justify-center">
          <div className="bg-surfacePrimary px-8 py-12 sm:p-16 max-w-[600px] border border-borderPrimary rounded-lg min-h-[600px]">
            {formData !== undefined && <GeneratedForm data={formData} />}
            {/* {JSON.stringify(formData)} */}
          </div>
        </div>
      </div>
    </div>
  );
}
