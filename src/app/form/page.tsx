"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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

enum FormFieldType {
  text = "text",
  email = "email",
}

interface FormData {
  fieldName: string;
  fieldType: FormFieldType;
  label?: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  validationRules: z.ZodTypeAny;
}

interface FormGroup {
  groupName: string;
  formItems: FormData[];
}

interface FormPage {
  pageName: string;
  formGroups: FormGroup[];
}

const formData: FormPage[] = [
  {
    pageName: "Page 1",
    formGroups: [
      {
        groupName: "Interests and Expertise",
        formItems: [
          {
            fieldName: "areasOfInterest",
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
          {
            fieldName: "programmingLanguages",
            fieldType: FormFieldType.text,
            label: "Programming Languages",
            placeholder: "E.g., Python, Java, JavaScript",
            description: "List any programming languages you're familiar with.",
            required: false,
            validationRules: z.string().optional(),
          },
        ],
      },
    ],
  },
  {
    pageName: "Page 2",
    formGroups: [
      {
        groupName: "Event Expectations",
        formItems: [
          {
            fieldName: "eventExpectations",
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
          {
            fieldName: "preferredSessions",
            fieldType: FormFieldType.text,
            label: "Preferred Sessions",
            placeholder: "E.g., Tech Talk, Hackathon, Coding Workshop",
            description:
              "List any specific types of sessions or activities you'd be interested in attending during the event.",
            required: false,
            validationRules: z.string().optional(),
          },
        ],
      },
    ],
  },
  {
    pageName: "Page 3",
    formGroups: [
      {
        groupName: "Additional Information",
        formItems: [
          {
            fieldName: "otherComments",
            fieldType: FormFieldType.text,
            label: "Other Comments or Suggestions",
            description:
              "If you have any other comments, suggestions, or specific requirements for the event, please mention them here.",
            placeholder: "E.g., Accessibility concerns, preferred time slots",
            required: false,
            validationRules: z.string().optional(),
          },
        ],
      },
    ],
  },
];

// Generate the Zod schema from the formData
const FormSchema = z.object(
  formData.reduce((acc, page) => {
    const pageSchema = z.object(
      page.formGroups.reduce((groupAcc, group) => {
        const groupSchema = z.object(
          group.formItems.reduce((fieldAcc, formItem) => {
            fieldAcc[formItem.fieldName] = formItem.validationRules;
            return fieldAcc;
          }, {} as { [key: string]: z.ZodTypeAny })
        );
        groupAcc[group.groupName] = groupSchema;
        return groupAcc;
      }, {} as { [key: string]: z.ZodTypeAny })
    );
    acc[page.pageName] = pageSchema;
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

  const page = formData[currentPage];
  const pageZod = FormSchema.shape[page.pageName] as z.ZodObject<any>;

  formElements.push(
    <FormItem key={`page-${page.pageName}`}>{`Page ${page.pageName}`}</FormItem>
  );

  Object.entries(pageZod.shape).forEach(([groupName, groupSchema]) => {
    const groupZod = groupSchema as z.ZodObject<any>;
    formElements.push(
      <FormItem
        key={`group-${page.pageName}-${groupName}`}
      >{`Group ${groupName}`}</FormItem>
    );

    Object.entries(groupZod.shape).forEach(([fieldName, fieldSchema]) => {
      const fieldZod = fieldSchema as z.ZodTypeAny;
      const label = fieldName;
      const fieldValue = form.getValues(
        `${page.pageName}.${groupName}.${fieldName}`
      );

      formElements.push(
        <FormField
          key={`field-${page.pageName}-${groupName}-${fieldName}`}
          control={control}
          name={`${page.pageName}.${groupName}.${fieldName}`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input
                  type={
                    formData
                      .flatMap((page) => page.formGroups)
                      .flatMap((group) =>
                        group.formItems.filter(
                          (item) => item.fieldName === fieldName
                        )
                      )
                      .map((item) => item.fieldType)[0]
                  }
                  placeholder={label}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {
                  formData
                    .flatMap((page) => page.formGroups)
                    .flatMap((group) =>
                      group.formItems.filter(
                        (item) => item.fieldName === fieldName
                      )
                    )
                    .map((item) => item.description)[0]
                }
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    });
  });

  return formElements;
}

export function ProfileForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: formData.reduce((acc, page) => {
      page.formGroups.forEach((group) => {
        group.formItems.forEach((formItem) => {
          const fieldName = `${page.pageName}.${group.groupName}.${formItem.fieldName}`;
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
        {`${currentPage + 1}/${formData.length}`}
        {formElements}
        <div className="flex justify-between">
          {currentPage > 0 && (
            <Button type="button" onClick={handlePrevPage}>
              Previous
            </Button>
          )}
          {currentPage < formData.length - 1 ? (
            <Button type="button" onClick={handleNextPage}>
              Next
            </Button>
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </div>
      </form>
    </Form>
  );
}

export default function Page() {
  return (
    <div className="bg-backgroundPrimary flex flex-col overflow-x-hidden border-b border-borderPrimary">
      <div className="relative bg-backgroundEmPrimary bg-center bg-no-repeat bg-cover grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-y-6 md:gap-y-12 px-6 py-6 md:py-[84px] min-h-[50vh] justify-center">
        <div className=" text-center col-start-1 md:col-start-2 col-end-5 md:col-end-8 lg:col-end-12 flex flex-col gap-8 items-center justify-center">
          <div className="bg-slate-100 p-16">
            <ProfileForm />
          </div>
        </div>
      </div>
    </div>
  );
}
