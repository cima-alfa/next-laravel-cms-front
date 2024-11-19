import dateFormat from "dateformat";

interface Props extends React.HtmlHTMLAttributes<HTMLTimeElement> {
    date: string;
    format?: string;
    formatDisplay: string;
}

export default function DateTime({
    className,
    date,
    format = "yyyy-mm-dd HH:MM",
    formatDisplay,
    ...rest
}: Readonly<Props>) {
    return (
        <time
            dateTime={dateFormat(date, format)}
            className={className}
            {...rest}
        >
            {dateFormat(date, formatDisplay)}
        </time>
    );
}
