import { chain } from "@/lib/middleware/_chain";
import { isAuthenticated } from "@/lib/middleware/isAuthenticated";
// import { setCookies } from "@/lib/middleware/setCookies";

export default chain([isAuthenticated]);

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
