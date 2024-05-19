"use client";
import { ReactElement } from "react";
import Button from "@/components/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";

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
import { CommandList } from "cmdk";

import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { BodySmall, Heading2, Heading3 } from "@/components/type-styles";
import { ChevronsUpDown, Check } from "lucide-react";

import { FormFieldType } from "@/models/form/form-field-type.d";
import { FormPageMap } from "@/models/form/usable/form-page-map.d";

import { arrayRange } from "@/lib/utils/array-range";

export interface createFormElementsProps {
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

export function createFormElements({
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
      if (item.fieldType === FormFieldType.SLIDER)
        form.setValue(item.id, (item.defaultValue as number) ?? item.min ?? 0);
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
                ) : item.fieldType === FormFieldType.SLIDER ? (
                  <div className="flex flex-col gap-4">
                    <Slider
                      defaultValue={[
                        (item.defaultValue as number) ?? item.min ?? 0,
                      ]}
                      onValueChange={(vals) => {
                        form.setValue(item.id, vals);
                      }}
                      min={item.min ?? 0}
                      max={item.max}
                      step={item.step ?? 1}
                    ></Slider>
                    <div className="flex justify-between text-onBackgroundTertiary">
                      {arrayRange(item.min ?? 0, item.max!, item.step ?? 1).map(
                        (marker, markerIndex) => (
                          <BodySmall key={markerIndex}>{marker}</BodySmall>
                        )
                      )}
                      {/* <BodySmall>{item.min ?? 0}</BodySmall>
                                    <BodySmall>{item.max}</BodySmall> */}
                    </div>
                  </div>
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
