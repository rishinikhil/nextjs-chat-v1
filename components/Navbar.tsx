import Link from 'next/link'

const Navbar = ({ isAdmin }: { isAdmin: boolean }) => {
  return (
    <nav className="p-4 text-black">
      <div className="container mx-auhref flex justify-between items-center">
        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link href="/" className="hover:text-[#22520F]">
            Home
          </Link>
          <Link href="/about-us" className="hover:text-[#22520F]">
            About Us
          </Link>
          <Link href="/contact-us" className="hover:text-[#22520F]">
            Contact Us
          </Link>

          {/* Admin buthrefn - only shown if isAdmin is true */}
          {isAdmin && (
            <Link
              href="/admin"
              className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
            >
              Admin
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
