"use client";

import { ReactElement, useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ZodSchema, z } from "zod";

import Button from "@/components/Button";

import { Form } from "@/components/ui/form";

import { Body, Heading2 } from "@/components/type-styles";

import { FormPageMap } from "@/models/form/usable/form-page-map.d";
import { FormOutput } from "@/models/form/output/form-output.d";

import { generateZodSchema } from "@/lib/form/generate-zod-schema";

import { formInput } from "@/data/form-input";
import { generateFormPageMap } from "@/lib/form/generate-form-page-map";
import { createFormElements } from "../../lib/form/create-form-elements";

const formOutput: FormOutput = {
  formDataOutput: [],
};

interface GeneratedFormProps {
  data: FormPageMap;
}

function GeneratedForm({ data }: GeneratedFormProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [formElements, setFormElements] = useState<ReactElement[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    formOutput.formDataOutput.push({
      timestamp: Date.now().toString(),
      formData: JSON.parse(JSON.stringify(data)),
    });
    console.log(formOutput.formDataOutput.at(-1)?.formData);
    setIsSubmitted(true);
    setCurrentPage(0);
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
      {!isSubmitted ? (
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
      ) : (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <Heading2>
              {formInput.customSubmissionTitle ??
                "Thank you for your submission!"}
            </Heading2>
            <Body className="text-onBackgroundSecondary">
              {formInput.customSubmissionMessage ??
                "Your response has been recorded!"}
            </Body>
          </div>

          {formInput.editable ? (
            <Button className="w-full" onClick={() => setIsSubmitted(false)}>
              Edit Response
            </Button>
          ) : (
            <Button className="w-full" href="/">
              Return Home
            </Button>
          )}
        </div>
      )}
    </Form>
  );
}

export default function Page() {
  const [formData, setFormData] = useState<FormPageMap>();

  useEffect(() => {
    setFormData(generateFormPageMap(formInput.formDataInput));
  }, []);
  return (
    <div className="bg-backgroundPrimary flex flex-col overflow-x-hidden border-b border-borderPrimary">
      <div className="relative bg-backgroundSecondary bg-center bg-no-repeat bg-cover grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-y-6 md:gap-y-12 px-6 py-6 md:py-[84px] min-h-[50vh] justify-center">
        <div className=" text-center col-start-1 md:col-start-2 col-end-5 md:col-end-8 lg:col-end-12 flex flex-col gap-8 items-center justify-center">
          <div className="bg-surfacePrimary px-8 py-12 sm:p-16 max-w-[600px] border border-borderPrimary rounded-lg">
            {formData !== undefined && <GeneratedForm data={formData} />}
          </div>
        </div>
      </div>
    </div>
  );
}
