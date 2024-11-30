import { twMerge } from "tailwind-merge";

export default function TableContainer({
    children,
    className,
    ...rest
}: Readonly<React.TableHTMLAttributes<HTMLTableElement>>) {
    return (
        <div className="rounded overflow-y-hidden overflow-x-auto mt-8 mb-8 first:mt-0 last:mb-0">
            <table
                className={twMerge(
                    "my-0 [&_a]:no-underline [&_a]:font-normal hover:[&_a]:underline",
                    className
                )}
                {...rest}
            >
                {children}
            </table>
        </div>
    );
}
