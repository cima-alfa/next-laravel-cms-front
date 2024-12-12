export type Object = { [key: string]: unknown };

/**
 * Add an element into a multidimensional object using the dot notation.
 *
 * If `path = 'foo.bar'` and `value = 'new value'`, then the following is added to the object:
 *
 * `{ ..., foo: { bar: 'new value' } }`
 */
export const setObject = (
    object: Object,
    path: string,
    value: unknown
): Object => {
    const [current, ...rest] = path.split(".");

    object[current] =
        rest.length >= 1
            ? // @ts-expect-error empty object
              setObject(object[current] || {}, rest.join("."), value)
            : value;

    return object;
};

/**
 * Find a value in a multidimensional object using the dot notation.
 *
 * If `object = { foo: { bar: 'value' } }` and `path = 'foo.bar'`, then `'value'` is returned.
 *
 * If path is incorrect, `undefined` is returned.
 */
export const findInObject = (object: Object, path: string) => {
    const keys = path.split(".");

    let value: unknown = object;

    keys.forEach((key) => {
        value = (value as typeof object)?.[key];
    });

    return value;
};

export const formDataToObject = (formData: FormData, ...fields: string[]) => {
    let data: Object = {};

    fields.forEach((field) => {
        const values = formData.getAll(field);

        for (let index = 0; index < values.length; index++) {
            data = setObject(
                data,
                field.replace("*", index.toString()),
                values[index].toString()
            );
        }
    });

    return data;
};

export const formDataToJson = (formData: FormData, ...fields: string[]) => {
    return JSON.stringify(formDataToObject(formData, ...fields));
};
