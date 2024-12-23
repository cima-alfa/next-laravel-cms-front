import { twMerge } from "tailwind-merge";

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
    errors?: string[] | null;
}

export default function InputError({
    className,
    errors,
    ...rest
}: Readonly<Props>) {
    return (
        <div
            aria-live="polite"
            aria-atomic="true"
            className={twMerge(
                "empty:hidden text-sm text-red-600 dark:text-red-400 not-prose ",
                className
            )}
            {...rest}
        >
            {errors?.map((error, index) => (
                <p className="mt-2 leading-tight font-semibold" key={index}>
                    {error}
                </p>
            ))}
        </div>
    );
}
