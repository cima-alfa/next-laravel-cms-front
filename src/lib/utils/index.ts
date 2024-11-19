export const sleep = async (time: number) => {
    await new Promise((resolve) => setTimeout(resolve, time * 1000));
};

export const formDataToJson = (formData: FormData, ...fields: string[]) => {
    const data: { [key: string]: unknown } = {};

    fields.forEach((field) => {
        data[field] = formData.get(field);
    });

    return JSON.stringify(data);
};
