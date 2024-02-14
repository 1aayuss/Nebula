import Link from 'next/link'
import React from 'react'

const LandingFooter = () => {
    return (
        <footer className='px-4 w-full h-14 bottom-0 flex items-center justify-end bg-zinc-900 text-white space-x-6'>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/contact">Contact Us</Link>
        </footer>
    )
}

export default LandingFooter