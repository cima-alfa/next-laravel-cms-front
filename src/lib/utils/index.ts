import { set } from "@/lib/utils/helpers/objects";

export const sleep = async (time: number) => {
    await new Promise((resolve) => setTimeout(resolve, time * 1000));
};

export const formDataToObject = (formData: FormData, ...fields: string[]) => {
    let data: { [key: string]: unknown } = {};

    fields.forEach((field) => {
        data = set(data, field, formData.get(field));
    });

    return data;
};

export const formDataToJson = (formData: FormData, ...fields: string[]) => {
    return JSON.stringify(formDataToObject(formData, ...fields));
};
