"use client";

import React, { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react';

type NextAuthSessionProviderType = {
    children: ReactNode
}

export default function NextAuthSessionProvider({ children }: NextAuthSessionProviderType) {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}