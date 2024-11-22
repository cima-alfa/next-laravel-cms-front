export const formatPhoneNumber = (value: string) => {
    value = value.replace(/[^\d\s.,\-]+/g, "");

    const separator = value.match(/[\s,.\-]/)?.[0] ?? "";

    return value.replace(/[\s,.\-]+/g, separator);
};

export const formatPhoneCountryCode = (value: string) => {
    return value.replace(/[^\d]+/g, "");
};
