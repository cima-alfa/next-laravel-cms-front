import authMiddleware from "./default/authMiddleware";
import guestMiddleware from "./default/guestMiddleware";
import permalinkFrontpageMiddleware from "./default/permalinkFrontpageMiddleware";
import rolesMiddleware from "./default/rolesMiddleware";
import setHeadersMiddleware from "./default/setHeadersMiddleware";

export * from "./utils";

export const middlewareChain = [
    setHeadersMiddleware,
    permalinkFrontpageMiddleware,
    guestMiddleware,
    authMiddleware,
    rolesMiddleware,
];
