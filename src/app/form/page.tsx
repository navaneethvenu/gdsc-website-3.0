"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Control, useForm } from "react-hook-form";
import { ZodSchema, z } from "zod";

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

enum FormFieldType {
  text = "text",
  email = "email",
  password = "password",
  number = "number",
  textarea = "textarea",
}

interface FormPageMap {
  [id: string]: FormPage;
}

interface FormItem {
  id: string;
  name: string;
  fieldType: FormFieldType;
  placeholder?: string;
  description?: string;
  required?: boolean;
  defaultValue?: string;
  validationRules: ZodSchema;
}

interface FormGroup {
  id: string;
  name?: string;
  formItems: { [id: string]: FormItem };
}

interface FormPage {
  id: string;
  name: string;
  formGroups: { [id: string]: FormGroup };
}

const formData: FormPageMap = {
  page1: {
    id: "page1",
    name: "Getting to Know",
    formGroups: {
      "page1-group1": {
        id: "page1-group1",
        name: "Interests and Expertise",
        formItems: {
          "page1-group1-item1": {
            id: "page1-group1-item1",
            fieldType: FormFieldType.text,
            name: "Areas of Interest",
            description:
              "Enter the fields or areas you're interested in (e.g., Web Development, Machine Learning, Cybersecurity, etc.).",
            placeholder: "E.g., Web Development, Data Science",
            defaultValue: "This is a test",
            required: true,
            validationRules: z.string().min(2, {
              message: "Please enter at least one area of interest.",
            }),
          },
          "page1-group1-item2": {
            id: "page1-group1-item2",
            fieldType: FormFieldType.text,
            name: "Programming Languages",
            placeholder: "E.g., Python, Java, JavaScript",
            description: "List any programming languages you're familiar with.",
            required: false,
            validationRules: z.string().optional(),
          },
        },
      },
      "page1-group2": {
        id: "page1-group2",
        name: "Interests and Expereeetise",
        formItems: {
          "page1-group2-item1": {
            id: "page1-group2-item1",
            fieldType: FormFieldType.text,
            name: "Areas of Interest",
            placeholder: "E.g., Web Development, Data Science",
            required: true,
            validationRules: z.string().min(2, {
              message: "Please enter at least one area of interest.",
            }),
          },
          "page1-group2-item2": {
            id: "page1-group2-item2",
            fieldType: FormFieldType.text,
            name: "Programming Languages",
            placeholder: "E.g., Python, Java, JavaScript",
            description: "List any programming languages you're familiar with.",
            required: false,
            validationRules: z.string().optional(),
          },
        },
      },
    },
  },
  page2: {
    id: "page2",
    name: "Page 2",
    formGroups: {
      "page2-group1": {
        id: "page2-group1",
        name: "Event Expectations",
        formItems: {
          "page2-group1-item1": {
            id: "page2-group1-item1",
            fieldType: FormFieldType.textarea,
            name: "Event Expectations",
            description:
              "What are your expectations from the 'Le Debut' freshers event? What would you like to learn or explore?",
            placeholder:
              "E.g., Learn about different career paths, network with industry professionals",
            required: true,
            validationRules: z
              .string()
              .min(10, { message: "Please provide a detailed response." }),
          },
          "page2-group1-item2": {
            id: "page2-group1-item2",
            fieldType: FormFieldType.text,
            name: "Preferred Sessions",
            placeholder: "E.g., Tech Talk, Hackathon, Coding Workshop",
            description:
              "List any specific types of sessions or activities you'd be interested in attending during the event.",
            required: false,
            validationRules: z.string().optional(),
          },
        },
      },
    },
  },
  page3: {
    id: "page3",
    name: "Page 3",
    formGroups: {
      "page3-group1": {
        id: "page3-group1",
        name: "Additional Information",
        formItems: {
          "page3-group1-item1": {
            id: "page3-group1-item1",
            fieldType: FormFieldType.text,
            name: "Other Comments or Suggestions",
            description:
              "If you have any other comments, suggestions, or specific requirements for the event, please mention them here.",
            placeholder: "E.g., Accessibility concerns, preferred time slots",
            required: true,
            validationRules: z.string().optional(),
          },
        },
      },
    },
  },
};

interface createFormElementsProps {
  control: Control<
    {
      [x: string]: any;
    },
    any
  >;
  currentPage: number;
  data: FormPageMap;
}

function createFormElements({
  control,
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
          control={control}
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
                <FormDescription>{item.description}</FormDescription>
              </div>

              <FormControl>
                {item.fieldType == FormFieldType.textarea ? (
                  <Textarea placeholder={item.placeholder} {...field} />
                ) : (
                  <Input
                    type={item.fieldType}
                    placeholder={item.placeholder}
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
          acc[fi.id] = fi.validationRules;
        });
      });
      return acc;
    }, {})
  );

  const defaultValues = Object.values(data).reduce((acc, page) => {
    Object.values(page.formGroups).forEach((group) => {
      Object.values(group.formItems).forEach((formItem) => {
        const fieldName = formItem.id;
        acc[fieldName] =
          formItem.defaultValue == undefined ? "" : formItem.defaultValue;
      });
    });
    return acc;
  }, {} as { [key: string]: string });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    setFormElements(
      createFormElements({ control: form.control, currentPage, data: data })
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
  return (
    <div className="bg-backgroundPrimary flex flex-col overflow-x-hidden border-b border-borderPrimary">
      <div className="relative bg-backgroundSecondary bg-center bg-no-repeat bg-cover grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-y-6 md:gap-y-12 px-6 py-6 md:py-[84px] min-h-[50vh] justify-center">
        <div className=" text-center col-start-1 md:col-start-2 col-end-5 md:col-end-8 lg:col-end-12 flex flex-col gap-8 items-center justify-center">
          <div className="bg-surfacePrimary px-8 py-12 sm:p-16 max-w-[600px] border borderPrimary rounded-lg min-h-[600px]">
            <GeneratedForm data={formData} />
          </div>
        </div>
      </div>
    </div>
  );
}
