import { FormFieldType } from "@/models/form/form-field-type.d";
import { FormInput } from "@/models/form/input/form-input.d";
import { FormPageInput } from "@/models/form/input/form-page-input.d";

const formDataInput: FormPageInput[] = [
    {
      name: "Getting to Know",
      formGroups: [
        {
          name: "Interests and Expertise",
          formItems: [
            {
              fieldType: FormFieldType.SLIDER,
              name: "Areas of Interest",
              description:
                "Enter the fields or areas you're interested in (e.g., Web Development, Machine Learning, Cybersecurity, etc.).",
              placeholder: "E.g., Web Development, Data Science",
              defaultValue:4,
              max: 6,
              min: 2,
              step: 2,
              // defaultValue: 1,
              required: true,
            },
            {
              fieldType: FormFieldType.EMAIL,
              name: "Programming Email",
              placeholder: "E.g., Python, Java, JavaScript",
              description: "List any programming languages you're familiar with.",
              required: false,
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
              required: false,
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
              required: false,
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
              required: false,
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
              required: false,
            },
          ],
        },
      ],
    },
  ];
  
export const formInput: FormInput = {
    formDataInput: formDataInput,
    editable: true,
    customSubmissionTitle: "Thank you for your submission!",
    customSubmissionMessage:
      "We will review your submission and get back to you shortly.",
  };