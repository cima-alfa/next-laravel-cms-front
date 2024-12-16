import { SimpleObject } from "@cms/helpers";

export type FormMessage = {
    message?: string;
};

export type FormErrors = {
    errors?: SimpleObject<string[]>;
};

export type FormState =
    | (SimpleObject & FormMessage & FormErrors)
    | null
    | undefined;
