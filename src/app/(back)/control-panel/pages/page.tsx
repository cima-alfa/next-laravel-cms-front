export default async function Page() {
    const test = await fetch("http://127.0.0.1:8000/api/test", {
        headers: {
            Http_Referrer: "http://127.0.0.1:3000",
        },
    });

    console.log(await test.json());

    return <div>Page Listing</div>;
}
