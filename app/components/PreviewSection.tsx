'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { PlayCircle } from 'lucide-react'
import MusicPlayer from '@/app/components/MusicPlayer'
import { useState } from 'react'
import { lyrics } from '@/app/data/lyrics'
import StreamingLinksModal from '@/app/components/StreamingLinksModal'
import Image from 'next/image'
import { SiTiktok as TikTokIcon } from 'react-icons/si'

export default function PreviewSection() {
    const [currentTrack, setCurrentTrack] = useState<string | null>(null)
    const [currentLyrics, setCurrentLyrics] = useState<typeof lyrics['otilo'] | null>(null)
    const [currentLyricIndex, setCurrentLyricIndex] = useState(0)
    const [activeTrackId, setActiveTrackId] = useState<string | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedSingle, setSelectedSingle] = useState<typeof singles[0] | null>(null)

    const singles = [
        {
            title: "otilo",
            description: "a vibrant fusion of afrobeats and contemporary sounds that will get you moving.",
            duration: "2:47",
            audioUrl: "/otilo-preview.mp3",
            lyricsKey: "otilo",
            streamingLinks: {
                spotify: "https://open.spotify.com/album/5tj5yVUSdsSiVhCRWMClXu",
                youtube: "https://youtube.com/link-to-otilo",
                appleMusic: "https://music.apple.com/us/album/otilo-gbadun-single/1788782856?at=1001lry3&ct=dashboard&uo=4",
                audiomack: "https://audiomack.com/justkuam/album/otilo-gbadun-1",
                boomplay: "https://boomplay.com/link-to-otilo",
                deezer: "https://deezer.com/link-to-otilo",
                tidal: "https://tidal.com/link-to-otilo",
                amazonMusic: "https://music.amazon.com/link-to-otilo"
            }
        },
        {
            title: "gbadun",
            description: "an infectious melody with captivating rhythms that showcase kuam's unique style.",
            duration: "2:47",
            audioUrl: "/gbadun-preview.mp3",
            lyricsKey: "gbadun",
            streamingLinks: {
                spotify: "https://open.spotify.com/album/5tj5yVUSdsSiVhCRWMClXu",
                youtube: "https://youtube.com/link-to-gbadun",
                appleMusic: "https://music.apple.com/us/album/otilo-gbadun-single/1788782856?at=1001lry3&ct=dashboard&uo=4",
                audiomack: "https://audiomack.com/justkuam/album/otilo-gbadun-1",
                boomplay: "https://boomplay.com/link-to-gbadun",
                deezer: "https://deezer.com/link-to-gbadun",
                tidal: "https://tidal.com/link-to-gbadun",
                amazonMusic: "https://music.amazon.com/link-to-gbadun"
            }
        }
    ]

    const handlePlay = (audioUrl: string, lyricsKey: string, trackId: string) => {
        if (currentTrack === audioUrl) {
            setCurrentTrack(null)
            setCurrentLyrics(null)
            setActiveTrackId(null)
        } else {
            setCurrentTrack(audioUrl)
            setCurrentLyrics(lyrics[lyricsKey as keyof typeof lyrics])
            setCurrentLyricIndex(0)
            setActiveTrackId(trackId)
        }
    }

    const animationStyles = {
        fade: {
            initial: { opacity: 0, y: 20, scale: 0.95 },
            animate: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.4, ease: "easeOut" }
            },
            exit: {
                opacity: 0,
                y: -20,
                scale: 0.95,
                transition: { duration: 0.3, ease: "easeIn" }
            }
        },
        slide: {
            initial: { x: 50, opacity: 0 },
            animate: {
                x: 0,
                opacity: 1,
                transition: { duration: 0.4, ease: "backOut" }
            },
            exit: {
                x: -50,
                opacity: 0,
                transition: { duration: 0.3, ease: "backIn" }
            }
        },
        scale: {
            initial: { scale: 1.2, opacity: 0 },
            animate: {
                scale: 1,
                opacity: 1,
                transition: { duration: 0.4, ease: "anticipate" }
            },
            exit: {
                scale: 0.8,
                opacity: 0,
                transition: { duration: 0.3, ease: "anticipate" }
            }
        }
    }

    const currentAnimation = animationStyles.fade

    const handleOpenModal = (single: typeof singles[0]) => {
        setSelectedSingle(single)
        setIsModalOpen(true)
    }

    return (
        <section className="py-20 relative lowercase" id="preview">
            <div className="container mx-auto px-4">
                <motion.h2
                    className="text-4xl md:text-5xl font-bold text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    featured singles
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                    {singles.map((single, index) => (
                        <motion.div
                            key={single.title}
                            className="relative bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                            initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="space-y-4">
                                {/* Title */}
                                <h3 className="text-2xl font-bold">{single.title}</h3>

                                {/* Description */}
                                <p className="text-gray-300">{single.description}</p>

                                {/* Preview Button */}
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-[#FF5757]">duration: {single.duration}</span>
                                    <Button
                                        variant="ghost"
                                        className="text-white hover:text-[#FF5757] hover:bg-[#FF5757]/10"
                                        onClick={() => handlePlay(single.audioUrl, single.lyricsKey, single.title)}
                                    >
                                        <PlayCircle className="w-6 h-6 mr-2" />
                                        {currentTrack === single.audioUrl ? 'stop preview' : 'play preview'}
                                    </Button>
                                </div>

                                {/* Streaming Links */}
                                <div className="pt-4 border-t border-white/10">
                                    <p className="text-sm text-gray-400 mb-3">available on</p>
                                    <div className="flex gap-4">
                                        <motion.a
                                            href={single.streamingLinks.spotify}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.1 }}
                                            className="p-2 bg-black rounded-full group relative hover:bg-black/80 transition-colors"
                                        >
                                            <div className="absolute inset-0 bg-[#1DB954] rounded-full blur-md opacity-0 group-hover:opacity-20 transition-opacity" />
                                            <Image
                                                src="/spotify.svg"
                                                alt="Spotify"
                                                width={24}
                                                height={24}
                                                className="relative z-10"
                                            />
                                        </motion.a>
                                        <motion.a
                                            href={single.streamingLinks.audiomack}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.1 }}
                                            className="p-2 bg-black rounded-full group relative hover:bg-black/80 transition-colors"
                                        >
                                            <div className="absolute inset-0 bg-[#FFA200] rounded-full blur-md opacity-0 group-hover:opacity-20 transition-opacity" />
                                            <Image
                                                src="/audiomack.svg"
                                                alt="Audiomack"
                                                width={24}
                                                height={24}
                                                className="relative z-10"
                                            />
                                        </motion.a>
                                        <motion.a
                                            href={single.streamingLinks.appleMusic}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.1 }}
                                            className="p-2 bg-black rounded-full group relative hover:bg-black/80 transition-colors"
                                        >
                                            <div className="absolute inset-0 bg-[#FA57C1] rounded-full blur-md opacity-0 group-hover:opacity-20 transition-opacity" />
                                            <Image
                                                src="/apple.svg"
                                                alt="Apple Music"
                                                width={24}
                                                height={24}
                                                className="relative z-10"
                                            />
                                        </motion.a>
                                    </div>

                                    {/* TikTok Sound Button */}
                                    <motion.a
                                        href="https://vm.tiktok.com/ZMkynBMaP/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-6 block"
                                    >
                                        <div className="bg-black/20 backdrop-blur-sm p-4 rounded-xl border border-white/5 
                                        hover:bg-black/30 transition-all duration-300">
                                            <div className="flex items-center gap-3">
                                                <TikTokIcon className="w-4 h-4 text-white/70" />
                                                <span className="text-sm text-white/70">use this sound on tiktok</span>
                                            </div>
                                        </div>
                                    </motion.a>
                                </div>

                                {/* Show lyrics only for active track */}
                                {activeTrackId === single.title && (
                                    <AnimatePresence mode="wait">
                                        {currentLyrics && (
                                            <motion.div
                                                initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                                                animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
                                                exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                                                transition={{ duration: 0.5 }}
                                                className="fixed left-0 right-0 bottom-24 z-40 pointer-events-none"
                                            >
                                                <motion.div
                                                    initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
                                                    animate={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
                                                    exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
                                                    className="container mx-auto px-4"
                                                >
                                                    <div className="max-w-2xl mx-auto rounded-lg p-6">
                                                        <div className="relative h-20 flex items-center justify-center">
                                                            <AnimatePresence mode="wait">
                                                                <motion.p
                                                                    key={currentLyricIndex}
                                                                    variants={currentAnimation}
                                                                    initial="initial"
                                                                    animate={{
                                                                        ...currentAnimation.animate,
                                                                        backgroundPosition: ["0% 50%", "100% 50%"],
                                                                        transition: {
                                                                            ...currentAnimation.animate.transition,
                                                                            backgroundPosition: {
                                                                                duration: 2,
                                                                                ease: "linear",
                                                                                repeat: Infinity,
                                                                                repeatType: "reverse"
                                                                            }
                                                                        }
                                                                    }}
                                                                    exit="exit"
                                                                    className="text-2xl font-medium text-center absolute"
                                                                    style={{
                                                                        background: "linear-gradient(to right, #FF5757, #ffffff)",
                                                                        WebkitBackgroundClip: "text",
                                                                        WebkitTextFillColor: "transparent",
                                                                        backgroundSize: "200% 100%",
                                                                    }}
                                                                >
                                                                    {currentLyrics.lyrics[currentLyricIndex]?.text}
                                                                </motion.p>
                                                            </AnimatePresence>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                )}

                                {/* Add a Listen Now button */}
                                <Button
                                    variant="outline"
                                    onClick={() => handleOpenModal(single)}
                                    className="mt-4"
                                >
                                    Listen Now
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Music Player */}
                {currentTrack && (
                    <MusicPlayer
                        audioUrl={currentTrack}
                        onClose={() => {
                            setCurrentTrack(null)
                            setCurrentLyrics(null)
                            setActiveTrackId(null)
                        }}
                        autoPlay={true}
                        onTimeUpdate={(currentTime) => {
                            if (currentLyrics) {
                                const nextIndex = currentLyrics.lyrics.findIndex(
                                    lyric => lyric.time > currentTime
                                )
                                const newIndex = nextIndex === -1
                                    ? currentLyrics.lyrics.length - 1
                                    : nextIndex - 1

                                if (newIndex !== currentLyricIndex && newIndex >= 0) {
                                    setCurrentLyricIndex(newIndex)
                                }
                            }
                        }}
                    />
                )}

                {/* Modal */}
                <AnimatePresence>
                    {isModalOpen && selectedSingle && (
                        <StreamingLinksModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            songTitle={selectedSingle.title}
                            streamingLinks={selectedSingle.streamingLinks}
                            isAlbum={selectedSingle.title === "otilo" || selectedSingle.title === "gbadun"}
                            coverArt="/album-cover.png"
                        />
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
} 