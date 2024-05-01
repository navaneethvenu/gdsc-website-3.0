"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button as OldButton } from "@/components/ui/button";
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

enum FormFieldType {
  text = "text",
  email = "email",
}

interface FormData {
  id: string;
  fieldType: FormFieldType;
  label: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  validationRules: z.ZodTypeAny;
}

interface FormGroup {
  id: string;
  name?: string;
  formItems: { [id: string]: FormData };
}

interface FormPage {
  id: string;
  name: string;
  formGroups: { [id: string]: FormGroup };
}

const formData: { [key: string]: FormPage } = {
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
            label: "Areas of Interest",
            description:
              "Enter the fields or areas you're interested in (e.g., Web Development, Machine Learning, Cybersecurity, etc.).",
            placeholder: "E.g., Web Development, Data Science",
            required: true,
            validationRules: z.string().min(2, {
              message: "Please enter at least one area of interest.",
            }),
          },
          "page1-group1-item2": {
            id: "page1-group1-item2",
            fieldType: FormFieldType.text,
            label: "Programming Languages",
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
            label: "Areas of Interest",
            placeholder: "E.g., Web Development, Data Science",
            required: true,
            validationRules: z.string().min(2, {
              message: "Please enter at least one area of interest.",
            }),
          },
          "page1-group2-item2": {
            id: "page1-group2-item2",
            fieldType: FormFieldType.text,
            label: "Programming Languages",
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
            fieldType: FormFieldType.text,
            label: "Event Expectations",
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
            label: "Preferred Sessions",
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
            label: "Other Comments or Suggestions",
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

// Generate the Zod schema from the formData
const FormSchema = z.object(
  Object.values(formData).reduce((acc, page) => {
    const pageSchema = z.object(
      Object.values(page.formGroups).reduce((groupAcc, group) => {
        const groupSchema = z.object(
          Object.values(group.formItems).reduce((fieldAcc, formItem) => {
            fieldAcc[formItem.id] = formItem.validationRules;
            return fieldAcc;
          }, {} as { [key: string]: z.ZodTypeAny })
        );
        groupAcc[group.id] = groupSchema;
        return groupAcc;
      }, {} as { [key: string]: z.ZodTypeAny })
    );
    acc[page.id] = pageSchema;
    return acc;
  }, {} as { [key: string]: z.ZodTypeAny })
);

function createFormData({
  control,
  form,
  currentPage,
}: {
  control: any;
  form: any;
  currentPage: number;
}) {
  const formElements: ReactElement[] = [];

  const pageChildren: ReactElement[] = [];

  const page = formData[`page${currentPage + 1}`];
  const pageZod = FormSchema.shape[page.id] as z.ZodObject<any>;

  const formDataPage = page;

  Object.entries(pageZod.shape).forEach(([id, groupSchema]) => {
    const groupChildren: ReactElement[] = [];
    const groupZod = groupSchema as z.ZodObject<any>;
    const formDataGroup = formDataPage.formGroups[id];
    const groupName = formDataGroup.name;

    Object.entries(groupZod.shape).forEach(([id, fieldSchema]) => {
      const fieldZod = fieldSchema as z.ZodTypeAny;
      const formDataItem = formDataGroup.formItems[id];
      const label = formDataItem.label;

      groupChildren.push(
        <FormField
          key={formDataItem.id}
          control={control}
          name={formDataItem.id}
          render={({ field }) => (
            <FormItem
              className={`flex flex-col ${
                formDataItem.description !== undefined ? "gap-2" : ""
              }`}
            >
              <div>
                <FormLabel className="grow-0">
                  {label!}{" "}
                  <span className="text-red-500">
                    {formDataItem.required! ? "*" : ""}
                  </span>
                </FormLabel>
                <FormDescription>{formDataItem.description}</FormDescription>
              </div>

              <FormControl>
                <Input
                  type={formDataItem.fieldType}
                  placeholder={formDataItem.placeholder}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    });

    pageChildren.push(
      <div className="flex flex-col gap-12 align-start text-left">
        {formDataGroup.name !== undefined && <Heading3>{groupName}</Heading3>}
        <div className="flex flex-col gap-8">{groupChildren}</div>
      </div>
    );
  });

  formElements.push(
    <div className="flex flex-col gap-24 pb-16 align-start text-center">
      <div className="flex flex-col gap-2">
        <BodySmall className="text-onBackgroundTertiary">
          {`${currentPage + 1}/${Object.values(formData).length}`}
        </BodySmall>
        <Heading2>{page.name}</Heading2>
      </div>
      <div className="flex flex-col gap-20">{pageChildren}</div>
    </div>
  );

  return formElements;
}

function ProfileForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: Object.values(formData).reduce((acc, page) => {
      Object.values(page.formGroups).forEach((group) => {
        Object.values(group.formItems).forEach((formItem) => {
          const fieldName = formItem.id;
          acc[fieldName] = "";
        });
      });
      return acc;
    }, {} as { [key: string]: string }),
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [formElements, setFormElements] = useState<ReactElement[]>([]);

  useEffect(() => {
    setFormElements(
      createFormData({ control: form.control, form, currentPage })
    );
  }, [form, currentPage]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(JSON.stringify(data, null, 2));
  }

  function handleNextPage() {
    setCurrentPage((prevPage) => prevPage + 1);
  }

  function handlePrevPage() {
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
              type="submit"
              variant="secondary"
              onClick={handlePrevPage}
            >
              Previous
            </Button>
          )}
          {currentPage < Object.values(formData).length - 1 ? (
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
            <ProfileForm />
          </div>
        </div>
      </div>
    </div>
  );
}
