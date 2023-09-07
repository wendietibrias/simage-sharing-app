"use client"
import { SessionProvider } from "next-auth/react";

type SessionWrapperProps = {
    children: React.ReactNode
}

const SessionWrapper = ({ children } : SessionWrapperProps) : React.ReactNode => {
    return (
       <SessionProvider>
         {children}
       </SessionProvider>
    )
}

export default SessionWrapper;