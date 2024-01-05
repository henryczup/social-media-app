'use client'
import Image from "next/image"; 
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link";


export function SignInButton() {
    const { data: session, status } = useSession();
    
    if (status === 'unauthenticated') {
        return (
            <Link href="/dashboard">
                <Image
                    src={session?.user?.image || '/avatar.png'}
                    alt={'your name'}
                    width={24}
                    height={24}
                />
            </Link>
        )
    }
    return <button onClick={() => signIn()}>Sign In</button>
}

export function SignOutButton() {
    return <button onClick={() => signOut()}>Sign Out</button>
}

