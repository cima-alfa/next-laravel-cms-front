import RegisterForm from "@/front-ui/components/app/register/RegisterForm";

export default function Page() {
    return (
        <div className="prose prose-light dark:prose-dark max-w-lg mx-auto">
            <h1>Register</h1>

            <RegisterForm />
        </div>
    );
}
