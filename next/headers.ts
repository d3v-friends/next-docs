import { headers } from "next/headers";

type Header = {
    host: string;
    userAgent: string;
    xForwardedHost: string;
    xForwardedPort: string;
    cookie: string;
};

export default function getHeaders(): Header {
    const header: any = headers();
    return {
        host: header.headers.host,
        userAgent: header.headers["user-agent"],
        xForwardedHost: header.headers["x-forwarded-host"],
        xForwardedPort: header.headers["x-forwarded-port"],
        cookie: header["cookie"] || "",
    };
}
