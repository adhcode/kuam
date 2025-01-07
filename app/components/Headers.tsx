'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import StreamingLinksModal from './StreamingLinksModal'

const albumLinks = {
  spotify: "https://open.spotify.com/album/your_album_id",
  youtube: "https://music.youtube.com/playlist/your_album_id",
  appleMusic: "https://music.apple.com/album/your_album_id",
  audiomack: "https://audiomack.com/album/your_album_id",
  boomplay: "https://www.boomplay.com/albums/your_album_id",
  deezer: "https://www.deezer.com/album/your_album_id",
  tidal: "https://tidal.com/album/your_album_id",
  amazonMusic: "https://music.amazon.com/albums/your_album_id"
}

export default function Headers() {
  const [scrolled, setScrolled] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { title: 'singles', href: '#preview' },
    {
      title: 'listen now',
      action: () => setIsModalOpen(true),
      isButton: true
    }
  ]

  return (
    <>
      <motion.header
        className={`fixed w-full z-50 transition-all duration-500 lowercase ${scrolled
          ? 'bg-black/80 backdrop-blur-md py-4'
          : 'bg-transparent py-6'
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <nav className="container mx-auto flex justify-between items-center px-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/"
              className="text-2xl md:text-3xl font-bold tracking-wider hover:text-[#FF5757] transition-colors"
            >
              kuam
            </Link>
          </motion.div>

          <ul className="flex space-x-8">
            {menuItems.map((item) => (
              <motion.li
                key={item.title}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.isButton ? (
                  <button
                    onClick={item.action}
                    className="relative group"
                  >
                    <span className="text-sm md:text-base hover:text-[#FF5757] transition-colors">
                      {item.title}
                    </span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF5757] transition-all duration-300 group-hover:w-full"></span>
                  </button>
                ) : (
                  <Link
                    href={item.href || '#'}
                    className="relative group"
                  >
                    <span className="text-sm md:text-base hover:text-[#FF5757] transition-colors">
                      {item.title}
                    </span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF5757] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                )}
              </motion.li>
            ))}
          </ul>
        </nav>
      </motion.header>

      <StreamingLinksModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        songTitle="otilo & gbadun"
        artistName="kuam"
        coverArt="/album-cover.jpg"
        isAlbum={true}
        streamingLinks={albumLinks}
      />
    </>
  )
}

