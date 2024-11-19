export const getDisplayNameOptions = (
    firstName: string | null,
    secondName: string | null,
    lastName: string | null,
    username: string
) => {
    const displayNameOptions: string[] = [];

    if (firstName && secondName && lastName) {
        displayNameOptions.push("<first_name> <middle_name> <surname>");

        displayNameOptions.push("<surname>, <first_name> <middle_name>");
    }

    if (firstName && lastName) {
        displayNameOptions.push("<first_name> <surname>");

        displayNameOptions.push("<surname>, <first_name>");
    }

    if (secondName && lastName) {
        displayNameOptions.push("<middle_name> <surname>");

        displayNameOptions.push("<surname>, <middle_name>");
    }

    if (firstName && secondName) {
        displayNameOptions.push("<first_name> <middle_name>");
    }

    displayNameOptions.push("<username>");

    return displayNameOptions;
};
