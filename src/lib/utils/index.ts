import { setObject } from "@cms/helpers";

export const sleep = async (seconds: number) => {
    await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

export const formDataToObject = (formData: FormData, ...fields: string[]) => {
    let data: { [key: string]: unknown } = {};

    fields.forEach((field) => {
        data = setObject(data, field, formData.get(field));
    });

    return data;
};

export const formDataToJson = (formData: FormData, ...fields: string[]) => {
    return JSON.stringify(formDataToObject(formData, ...fields));
};
