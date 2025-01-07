'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
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

export default function Hero() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden lowercase">
            {/* Background with parallax effect */}
            <motion.div
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
                className="absolute inset-0 z-0"
            >
                <Image
                    src="/kuam-background.jpg"
                    alt="kuam background"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10"></div>

            <div className="container mx-auto px-4 z-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="space-y-12"
                >
                    <motion.h1
                        className="text-7xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF5757] to-white"
                        whileHover={{ scale: 1.05 }}
                    >
                        kuam
                    </motion.h1>

                    <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-[#FF5757]">
                            otilo & gbadun
                        </h2>
                        <p className="text-xl text-gray-300">out now</p>
                    </motion.div>

                    <motion.a
                        onClick={() => setIsModalOpen(true)}
                        className="inline-block bg-[#FF5757] hover:bg-[#FF7777] text-white 
                        font-bold py-4 px-8 rounded-full text-lg transition-colors cursor-pointer"
                        whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgb(255,87,87)" }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        listen now
                    </motion.a>
                </motion.div>
            </div>

            {/* Album Streaming Links Modal */}
            <StreamingLinksModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                songTitle="otilo & gbadun"
                artistName="kuam"
                coverArt="/album-cover.png"
                isAlbum={true}
                streamingLinks={albumLinks}
            />

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
                </div>
            </motion.div>
        </section>
    )
}

