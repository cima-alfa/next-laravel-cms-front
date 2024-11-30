import set from "lodash.set";

export const sleep = async (time: number) => {
    await new Promise((resolve) => setTimeout(resolve, time * 1000));
};

export const formDataToObject = (formData: FormData, ...fields: string[]) => {
    const data: { [key: string]: unknown } = {};

    fields.forEach((field) => {
        set(data, field, formData.get(field));
    });

    return data;
};

export const formDataToJson = (formData: FormData, ...fields: string[]) => {
    return JSON.stringify(formDataToObject(formData, ...fields));
};
