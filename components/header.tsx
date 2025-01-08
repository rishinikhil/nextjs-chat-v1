'use client'

import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { auth } from '@/auth'
import { buttonVariants } from '@/components/ui/button'
import { UserMenu } from '@/components/user-menu'
import { SidebarMobile } from './sidebar-mobile'
import { SidebarToggle } from './sidebar-toggle'
import { ChatHistory } from './chat-history'
import { Session } from '@/lib/types'
import Navbar from './Navbar'
import useLanguageStore from '@/app/store/useLanguageStore'

// Separate the login button into its own component to use the hook
function LoginButton() {
  const { currentLanguage } = useLanguageStore()
  return (
    <a href="/login" className={cn(buttonVariants())}>
      <span>{currentLanguage === 'en' ? 'Login' : 'प्रवेश करें'}</span>
    </a>
  )
}

// Modified UserOrLogin component
async function UserOrLogin({ isLogo }: { isLogo?: boolean }) {
  let session: Session | null = null
  try {
    session = (await auth()) as Session
  } catch (error) {
    console.error('Authentication error:', error)
  }

  if (isLogo) {
    return session?.user ? (
      <>
        <SidebarMobile>
          <ChatHistory userId={session.user.id} />
        </SidebarMobile>
        <SidebarToggle />
        <Link href="/new" rel="nofollow">
          <img
            src="/biosarthi-logo.png"
            alt="BioSarthi Logo"
            className="h-7 w-auto ml-4"
          />
        </Link>
      </>
    ) : (
      <Link href="/new" rel="nofollow">
        <img
          src="/biosarthi-logo.png"
          alt="BioSarthi Logo"
          className="h-7 w-auto"
        />
      </Link>
    )
  }

  return session?.user ? <UserMenu user={session.user} /> : <LoginButton />
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center">
        <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
          <UserOrLogin isLogo />
        </React.Suspense>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <Navbar isAdmin={false} />
        <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
          <UserOrLogin />
        </React.Suspense>
      </div>
    </header>
  )
}
