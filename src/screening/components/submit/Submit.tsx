/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@scdr-app/utils/api";
import { Button } from "@ui-library/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui-library/components/ui/form";
import { Input } from "@ui-library/components/ui/input";
import { useForm } from "react-hook-form";
import React, { Children } from "react";
import { type SeverPatientSchema } from "@scdr-app/server/api/routers/patient";
import { useRouter } from "next/router";

const formSchema = z.object({
  firstname: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "Lastname must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Need to be a valid email" }),
  birth: z.string(),
  file: z.custom((blob) => blob),
});
type FormSchema = z.infer<typeof formSchema>;

const initalFormSchemaState: Partial<FormSchema> = {
  firstname: "",
  lastname: "",
  email: "",
  birth: undefined,
  file: "",
};
const formSchemaKeyList = Object.keys(initalFormSchemaState).map(
  (key) => key as keyof FormSchema,
);

const InputTypeList = {
  file: "file",
  firstname: "text",
  lastname: "text",
  email: "email",
  birth: "date",
};

const toPatientServerModel = (payload: FormSchema): SeverPatientSchema => {
  const date = new Date(payload.birth).toISOString();
  return {
    firstname: payload.firstname,
    lastname: payload.lastname,
    email: payload.email,
    birthdate: date,
    // amazon estupides si es desde front sino verlo en el back antes de mandar el payload a la DB
    status: true,
  };
};

export default function Submit() {
  const router = useRouter();
  const { mutate, error, isLoading, data, isSuccess } =
    api.patient.postUpsertPatient.useMutation();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initalFormSchemaState,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    mutate(toPatientServerModel(values));

    if (isSuccess) {
      await router.push(`/detail/${data.data.id}`);
    }
  }

  return (
    <Form {...form}>
      {error && (
        <p className="mb-9 text-white">Something went wrong! {error.message}</p>
      )}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full min-w-[190px] max-w-[350px] space-y-8"
      >
        {Children.map(formSchemaKeyList, (keyField) => (
          <FormField
            control={form.control}
            name={keyField}
            render={({ field }) => (
              <FormItem className="grid h-20 w-full">
                <FormLabel className="text-transform: pb-1 text-[15px] font-medium capitalize leading-[35px] text-white">
                  {keyField}
                </FormLabel>
                <FormControl>
                  <Input
                    accept="image/*"
                    size={4000}
                    type={InputTypeList[keyField]}
                    className="selection:color-white box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded-[4px] bg-blackA5 px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] shadow-blackA9 outline-none selection:bg-blackA9 hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
                    placeholder={`Enter a ${keyField}`}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="pt-2 text-[13px] text-white opacity-[0.8]" />
              </FormItem>
            )}
          />
        ))}

        <Button
          disabled={isLoading}
          className="mt-[40PX] box-border inline-flex h-[35px] w-full items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none text-violet11 shadow-[0_2px_10px] shadow-blackA7 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none disabled:bg-gray-400"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
