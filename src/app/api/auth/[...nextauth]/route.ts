import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

import api from "@/services/api";
import { toastAlert } from "@/components/ui/alert";
import { parse } from "cookie";

const nextAuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const { data: ip } = await api.get('https://whats-my-ip-delta.vercel.app/');
                    const { data: { _id, name, token }, headers } = await api.post('/sign-in', {
                        email: credentials?.email,
                        password: credentials?.password,
                        identifier: ip
                    });

                    const apiCookies = headers['set-cookie'];

                    if (apiCookies && apiCookies.length > 0) {
                        apiCookies.forEach((cookie) => {
                            const parsedCookie = parse(cookie);
                            const [cookieName, cookieValue] = Object.entries(parsedCookie)[0];
                            const httpOnly = cookie.includes("httponly;");

                            cookies().set({
                                name: cookieName,
                                value: cookieValue,
                                httpOnly: httpOnly,
                                maxAge: parseInt(parsedCookie["Max-Age"]),
                                path: parsedCookie.path,
                                expires: new Date(parsedCookie.expires),
                                secure: true,
                            });
                        });
                    }

                    const user = { id: _id, name, db_jwt: token };

                    return user;
                } catch (err: any) {
                    toastAlert({ icon: 'error', title: err.message, timer: 2000 });
                    console.log(err);
                    return null;
                }
            },
        }),
    ],
    pages: { signIn: '/' }
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions }