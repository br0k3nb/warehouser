import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

type Props = {
    children: ReactNode
}

export default async function layout({ children }: Props) {
    const session = await getServerSession(nextAuthOptions);

    if(!session) return redirect('/');

    return <> {children} </>
}