import set from "lodash/fp/set";

export const sleep = async (time: number) => {
    await new Promise((resolve) => setTimeout(resolve, time * 1000));
};

export const formDataToObject = (formData: FormData, ...fields: string[]) => {
    let data: { [key: string]: unknown } = {};

    fields.forEach((field) => {
        data = set(field, formData.get(field), data);
    });

    return data;
};

export const formDataToJson = (formData: FormData, ...fields: string[]) => {
    return JSON.stringify(formDataToObject(formData, ...fields));
};
