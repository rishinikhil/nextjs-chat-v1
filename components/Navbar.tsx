'use client'
import useLanguageStore from '@/app/store/useLanguageStore'
import Link from 'next/link'

const Navbar = ({ isAdmin }: { isAdmin: boolean }) => {
  const { currentLanguage, translations } = useLanguageStore()

  return (
    <nav className="p-4 text-black">
      <div className="container mx-auhref flex justify-between items-center">
        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link href="/" className="hover:text-[#22520F]">
            {currentLanguage === 'en' ? 'Home' : 'होम '}
          </Link>
          <Link href="/about-us" className="hover:text-[#22520F]">
            {currentLanguage === 'en' ? 'About-us' : 'हमारे बारे में'}
          </Link>
          <Link href="/contact-us" className="hover:text-[#22520F]">
            {currentLanguage === 'en' ? 'Contact-us' : 'संपर्क करें'}
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
