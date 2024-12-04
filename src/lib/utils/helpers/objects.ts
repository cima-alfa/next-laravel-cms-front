export const set = (
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
