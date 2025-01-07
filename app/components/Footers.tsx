'use client'

import { SiX as XIcon, SiTiktok as TikTokIcon } from 'react-icons/si'
import { FaFacebookF as FacebookIcon } from 'react-icons/fa'
import { FaInstagram as InstagramIcon } from 'react-icons/fa'

export default function Footer() {
    return (
        <footer className="py-8 md:py-12">
            <div className="container mx-auto px-4">
                {/* Social Links */}
                <div className="flex justify-center gap-4 mb-8">
                    <a
                        href="https://www.tiktok.com/@justkuam?_t=ZM-8srbntfnSVh&_r=1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                    >
                        <TikTokIcon className="w-5 h-5 text-white" />
                    </a>
                    <a
                        href="https://facebook.com/justkuam"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                    >
                        <FacebookIcon className="w-5 h-5 text-white" />
                    </a>
                    <a
                        href="https://www.instagram.com/kuamgram?igsh=MW1kcGdpdWd4ZXJlcA=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                    >
                        <InstagramIcon className="w-5 h-5 text-white" />
                    </a>
                    <a
                        href="https://x.com/justkuam?s=11&t=xWEyAWsfJzCpSogstJp6hA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                    >
                        <XIcon className="w-5 h-5 text-white" />
                    </a>
                </div>

                {/* Copyright */}
                <div className="text-center text-white/60 text-sm">
                    <p>© {new Date().getFullYear()} kuam. all rights reserved.</p>
                    <p>powered by <a href="https://www.uvise.ng" target="_blank" rel="noopener noreferrer" className="text-white">uvise</a></p>
                </div>
            </div>
        </footer>
    )
}