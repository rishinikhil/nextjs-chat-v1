import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { auth } from '@/auth'
import { Button, buttonVariants } from '@/components/ui/button'
import { UserMenu } from '@/components/user-menu'
import { SidebarMobile } from './sidebar-mobile'
import { SidebarToggle } from './sidebar-toggle'
import { ChatHistory } from './chat-history'
import { Session } from '@/lib/types'
import Navbar from './Navbar'

async function UserOrLogin({ isLogo }: { isLogo?: boolean }) {
  const session = (await auth()) as Session

  if (isLogo) {
    return session?.user ? (
      <>
        <SidebarMobile>
          <ChatHistory userId={session.user.id} />
        </SidebarMobile>
        <SidebarToggle />
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

  return session?.user ? (
    <UserMenu user={session.user} />
  ) : (
    <a href="/login" className={cn(buttonVariants())}>
      <span>Login</span>
    </a>
  )
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
