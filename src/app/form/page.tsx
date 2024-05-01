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
        groupName: "Group 1",
        formItems: [
          {
            fieldName: "username",
            fieldType: FormFieldType.text,
            label: "Username",
            description: "This is your public display name.",
            placeholder: "Enter your username",
            required: false,
            validationRules: z
              .string()
              .min(2, { message: "Username must be at least 2 characters." }),
          },
          {
            fieldName: "email",
            fieldType: FormFieldType.email,
            label: "Email",
            placeholder: "Enter your email",
            description: "This is your public email address.",
            required: true,
            validationRules: z
              .string()
              .email({ message: "Invalid email address" }),
          },
        ],
      },
    ],
  },
  // Add more pages and groups as needed
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

function createFormData({ control, form }: { control: any; form: any }) {
  const formElements: ReactElement[] = [];

  Object.entries(FormSchema.shape).forEach(([pageName, pageSchema]) => {
    const pageZod = pageSchema as z.ZodObject<any>; // Cast pageSchema to ZodObject<any>
    formElements.push(
      <FormItem key={`page-${pageName}`}>{`Page ${pageName}`}</FormItem>
    );

    Object.entries(pageZod.shape).forEach(([groupName, groupSchema]) => {
      const groupZod = groupSchema as z.ZodObject<any>; // Cast groupSchema to ZodObject<any>
      formElements.push(
        <FormItem
          key={`group-${pageName}-${groupName}`}
        >{`Group ${groupName}`}</FormItem>
      );

      Object.entries(groupZod.shape).forEach(([fieldName, fieldSchema]) => {
        const fieldZod = fieldSchema as z.ZodTypeAny; // Cast fieldSchema to ZodTypeAny
        const label = fieldName;
        const fieldValue = form.getValues(
          `${pageName}.${groupName}.${fieldName}`
        );

        formElements.push(
          <FormField
            key={`field-${pageName}-${groupName}-${fieldName}`}
            control={control}
            name={`${pageName}.${groupName}.${fieldName}`}
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

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(JSON.stringify(data, null, 2));
  }

  const [formElements, setFormElements] = useState<ReactElement[]>([]);

  useEffect(() => {
    setFormElements(createFormData({ control: form.control, form }));
  }, [form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {formElements}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default function Page() {
  return (
    <div className="bg-backgroundPrimary flex flex-col overflow-x-hidden border-b border-borderPrimary">
      <div className="relative bg-backgroundEmPrimary bg-center bg-no-repeat bg-cover grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-y-6 md:gap-y-12 px-6 py-6 md:py-[84px] !pb-0 min-h-[50vh] justify-center">
        <div className=" text-center col-start-1 md:col-start-2 col-end-5 md:col-end-8 lg:col-end-12 flex flex-col gap-8 items-center justify-center">
          <ProfileForm />
        </div>
      </div>
    </div>
  );
}
