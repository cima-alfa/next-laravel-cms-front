/**
 * Add an element into a multidimensional object using the dot notation.
 *
 * If `path = 'foo.bar'` and `value = 'new value'`, then the following is added to the object:
 *
 * `{ ..., foo: { bar: 'new value' } }`
 */
export const setObject = (
    object: { [key: string]: unknown },
    path: string,
    value: unknown
) => {
    const [current, ...rest] = path.split(".");

    object[current] =
        rest.length >= 1
            ? // @ts-expect-error empty object
              set(object[current] || {}, rest.join("."), value)
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
export const findInObject = (
    object: { [key: string]: unknown },
    path: string
) => {
    const keys = path.split(".");

    let value: unknown = object;

    keys.forEach((key) => {
        value = (value as typeof object)?.[key];
    });

    return value;
};
