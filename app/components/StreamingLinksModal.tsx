'use client'

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Share2, X as CloseIcon, Copy, Check } from 'lucide-react'
import { SiX as XIcon, SiTiktok as TikTokIcon } from 'react-icons/si'
import { FaWhatsapp as WhatsAppIcon, FaSnapchatGhost as SnapchatIcon, FaInstagram as InstagramIcon } from 'react-icons/fa'
import { useState, useEffect, useRef } from 'react'

interface StreamingLinksModalProps {
    isOpen: boolean
    onClose: () => void
    songTitle: string
    artistName?: string
    coverArt?: string
    isAlbum?: boolean
    streamingLinks: {
        spotify: string
        appleMusic: string
        youtube: string
        audiomack: string
        boomplay: string
        deezer: string
        tidal: string
        amazonMusic: string
    }
}

const streamingPlatforms = [
    {
        name: "Spotify",
        icon: "/spotify.svg",
        key: "spotify",
        bgColor: "bg-[#1DB954]",
        hoverBg: "hover:bg-[#1DB954]/10"
    },
    {
        name: "Apple Music",
        icon: "/apple.svg",
        key: "appleMusic",
        bgColor: "bg-[#FA57C1]",
        hoverBg: "hover:bg-[#FA57C1]/10"
    },
    {
        name: "YouTube Music",
        icon: "/youtubemusic.png",
        key: "youtube",
        bgColor: "bg-[#FF0000]",
        hoverBg: "hover:bg-[#FF0000]/10"
    },
    {
        name: "Audiomack",
        icon: "/audiomack.svg",
        key: "audiomack",
        bgColor: "bg-[#FFA200]",
        hoverBg: "hover:bg-[#FFA200]/10"
    },
    {
        name: "Boomplay",
        icon: "/boomplay.png",
        key: "boomplay",
        bgColor: "hover:bg-[#E62E2E]/10"
    },
    {
        name: "Deezer",
        icon: "/deezer.png",
        key: "deezer",
        bgColor: "hover:bg-[#00C7F2]/10"
    },
    {
        name: "Tidal",
        icon: "/tidal.png",
        key: "tidal",
        bgColor: "hover:bg-[#000000]/10"
    },
    {
        name: "Amazon Music",
        icon: "/amazonmusic.png",
        key: "amazonMusic",
        bgColor: "hover:bg-[#00A8E1]/10"
    }
]

export default function StreamingLinksModal({
    isOpen,
    onClose,
    songTitle,
    artistName = "KUAM",
    coverArt = "/album-cover.png",
    isAlbum,
    streamingLinks
}: StreamingLinksModalProps) {
    const [copied, setCopied] = useState(false)
    const [shareMenuOpen, setShareMenuOpen] = useState(false)
    const shareMenuRef = useRef<HTMLDivElement>(null)

    const shareText = "Listen to KUAM's new release"
    const shareUrl = "https://kuam.uvise.media"

    const handleCopyLink = async () => {
        await navigator.clipboard.writeText(shareUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const shareOptions = [
        {
            name: 'Copy Link',
            icon: copied ? Check : Copy,
            action: handleCopyLink,
            className: 'bg-[#FF5757] hover:bg-[#FF5757]/90 col-span-2'
        },
        {
            name: 'TikTok',
            icon: TikTokIcon,
            action: () => window.open('https://vm.tiktok.com/ZMkynBMaP/'),
            className: 'bg-black hover:bg-black/80 text-white'
        },
        {
            name: 'X',
            icon: XIcon,
            action: () => window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`),
            className: 'bg-black hover:bg-black/80'
        },
        {
            name: 'Instagram',
            icon: InstagramIcon,
            action: () => window.open(`https://instagram.com/stories/create?url=${encodeURIComponent(shareUrl)}`),
            className: 'bg-[#E4405F]/80 hover:bg-[#E4405F]'
        },
        {
            name: 'WhatsApp',
            icon: WhatsAppIcon,
            action: () => window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`),
            className: 'bg-[#25D366]/80 hover:bg-[#25D366]'
        },
        {
            name: 'Snapchat',
            icon: SnapchatIcon,
            action: () => window.open(`https://www.snapchat.com/share?url=${encodeURIComponent(shareUrl)}`),
            className: 'bg-[#FFFC00]/80 hover:bg-[#FFFC00] text-black'
        }
    ]

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
                setShareMenuOpen(false)
            }
        }

        if (shareMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [shareMenuOpen])

    const availablePlatforms = ['spotify', 'appleMusic', 'audiomack']

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-[#FF5757]/5 backdrop-blur-xl z-50 flex items-center justify-center p-4 overflow-y-auto 
                    scrollbar-none"
                    style={{
                        msOverflowStyle: 'none',
                        scrollbarWidth: 'none'
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.95, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="bg-gradient-to-b from-[#FF5757]/10 to-white/5 backdrop-blur-md 
                        rounded-xl p-8 max-w-md w-full border border-white/10 shadow-2xl relative
                        my-8 max-h-[90vh] overflow-y-auto scrollbar-none"
                        style={{
                            msOverflowStyle: 'none',
                            scrollbarWidth: 'none'
                        }}
                    >
                        {/* Album Art and Title with Clean Hover Effect */}
                        <motion.div className="text-center mb-8 relative">
                            <motion.div
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", duration: 0.6 }}
                                className="relative mb-6 group"
                            >
                                <Image
                                    src={coverArt}
                                    width={240}
                                    height={240}
                                    alt="Album Cover"
                                    priority
                                    className="rounded-lg mx-auto shadow-2xl group-hover:shadow-[#FF5757]/20 
                                    transition-all duration-300 transform group-hover:scale-[1.02]"
                                />
                            </motion.div>
                            <motion.h2
                                className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent 
                                bg-gradient-to-r from-[#FF5757] to-white break-words pb-1"
                            >
                                {isAlbum ? "otilo & gbadun" : songTitle}
                            </motion.h2>
                            <motion.p className="text-gray-400 text-lg mb-2">{artistName}</motion.p>
                            {isAlbum && (
                                <motion.p className="text-sm text-gray-500">
                                    2 Songs • Album
                                </motion.p>
                            )}
                        </motion.div>

                        {/* Share Section with Better Spacing */}
                        <div className="relative" ref={shareMenuRef}>
                            <Button
                                onClick={() => setShareMenuOpen(!shareMenuOpen)}
                                className="w-full bg-[#FF5757] hover:bg-[#FF5757]/90 text-white group"
                            >
                                <Share2 className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                                Share with Friends
                            </Button>

                            <AnimatePresence>
                                {shareMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute top-full left-0 right-0 mt-4 p-4 bg-white 
                                        rounded-lg border border-white/10 z-10 shadow-xl"
                                    >
                                        <div className="grid grid-cols-2 gap-4">
                                            {shareOptions.map((option) => (
                                                <Button
                                                    key={option.name}
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        option.action()
                                                    }}
                                                    className={`${option.className} flex items-center justify-center 
                                                    gap-3 p-4 rounded-lg transition-all duration-300 hover:scale-105 
                                                    hover:shadow-lg ${option.name === 'Copy Link' ? 'col-span-2' : ''}`}
                                                >
                                                    {option.name === 'Copy Link' ? (
                                                        <option.icon className="w-6 h-6" />
                                                    ) : (
                                                        <div className="w-6 h-6 flex items-center justify-center">
                                                            <option.icon className="w-5 h-5" />
                                                        </div>
                                                    )}
                                                    <span className="font-medium">{option.name}</span>
                                                </Button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Separator */}
                        <div className="mb-8 border-t border-white/10" />

                        {/* Streaming Platforms with Better Spacing */}
                        <div className="space-y-4">
                            {streamingPlatforms.map((platform) => (
                                <motion.div key={platform.name} className="w-full">
                                    <Link
                                        href={streamingLinks[platform.key as keyof typeof streamingLinks]}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => {
                                            if (!availablePlatforms.includes(platform.key)) {
                                                e.preventDefault()
                                            }
                                        }}
                                        className={`w-full flex items-center justify-between p-3 md:p-4 rounded-xl 
                                        bg-black/20 hover:bg-black/30 transition-all duration-300 
                                        ${!availablePlatforms.includes(platform.key) && 'cursor-not-allowed'}`}
                                    >
                                        <div className="flex items-center gap-3 md:gap-4">
                                            <div className="p-1.5 md:p-2 bg-black rounded-full">
                                                <Image
                                                    src={platform.icon}
                                                    width={24}
                                                    height={24}
                                                    alt={platform.name}
                                                    className="w-5 h-5 md:w-6 md:h-6"
                                                />
                                            </div>
                                            <span className="font-medium text-base md:text-lg">
                                                {platform.name}
                                            </span>
                                        </div>
                                        <Button
                                            className={`bg-[#FF5757] hover:bg-[#FF5757]/90 text-white text-sm md:text-base
                                            px-3 py-1.5 md:px-4 md:py-2
                                            ${!availablePlatforms.includes(platform.key) && 'opacity-50 cursor-not-allowed'}`}
                                            disabled={!availablePlatforms.includes(platform.key)}
                                        >
                                            Listen Now
                                        </Button>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Close Button with Gradient Hover */}
                        <motion.button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 
                            rounded-full transition-all duration-300 hover:bg-gradient-to-r 
                            hover:from-[#FF5757]/20 hover:to-white/5"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <CloseIcon className="w-6 h-6" />
                        </motion.button>

                        {/* UVISE Footer with Gradient */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="mt-8 pt-4 border-t border-white/10 text-center"
                        >
                            <Link
                                href="https://uvise.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-[#FF5757] transition-colors"
                            >
                                Powered by UVISE
                            </Link>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
} 