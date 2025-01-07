'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, X, Volume2, VolumeX, Rewind, FastForward } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface MusicPlayerProps {
    audioUrl: string
    onClose: () => void
    autoPlay?: boolean
    onTimeUpdate?: (currentTime: number) => void
}

export default function MusicPlayer({ audioUrl, onClose, autoPlay = true, onTimeUpdate }: MusicPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(autoPlay)
    const [progress, setProgress] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [isMuted, setIsMuted] = useState(false)
    const [volume, setVolume] = useState(1)
    const audioRef = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const updateProgress = () => {
            setCurrentTime(audio.currentTime)
            setProgress((audio.currentTime / audio.duration) * 100)
            onTimeUpdate?.(audio.currentTime)
        }

        if (autoPlay) {
            audio.play().catch(() => setIsPlaying(false))
            setIsPlaying(true)
        }

        audio.addEventListener('timeupdate', updateProgress)
        audio.addEventListener('loadedmetadata', () => setDuration(audio.duration))
        audio.addEventListener('ended', () => setIsPlaying(false))

        return () => {
            audio.removeEventListener('timeupdate', updateProgress)
            audio.removeEventListener('loadedmetadata', () => { })
            audio.removeEventListener('ended', () => { })
        }
    }, [audioUrl, autoPlay, onTimeUpdate])

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause()
            } else {
                audioRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const audio = audioRef.current
        if (!audio) return

        const bounds = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - bounds.left
        const width = bounds.width
        const percentage = x / width
        const newTime = percentage * audio.duration

        audio.currentTime = newTime
        setProgress(percentage * 100)
    }

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value)
        setVolume(newVolume)
        if (audioRef.current) {
            audioRef.current.volume = newVolume
            setIsMuted(newVolume === 0)
        }
    }

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }

    const seek = (seconds: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.max(0, Math.min(audioRef.current.currentTime + seconds, duration))
        }
    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-white/10 p-4 z-50"
        >
            <audio ref={audioRef} src={audioUrl} />

            <div className="max-w-4xl mx-auto">
                {/* Progress Bar */}
                <div
                    className="relative h-1 bg-gray-600 rounded-full cursor-pointer mb-4 group"
                    onClick={handleProgressClick}
                >
                    <div
                        className="absolute h-full bg-[#FF5757] rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                    <div
                        className="absolute h-3 w-3 bg-white rounded-full -top-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
                    />
                </div>

                <div className="flex items-center justify-between gap-4">
                    {/* Time Display */}
                    <div className="text-sm text-gray-400 w-20">
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </div>

                    {/* Playback Controls */}
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => seek(-10)}
                            className="text-white hover:text-[#FF5757] hover:bg-white/5"
                        >
                            <Rewind className="w-5 h-5" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={togglePlay}
                            className="text-white hover:text-[#FF5757] hover:bg-white/5"
                        >
                            {isPlaying ?
                                <Pause className="w-6 h-6" /> :
                                <Play className="w-6 h-6" />
                            }
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => seek(10)}
                            className="text-white hover:text-[#FF5757] hover:bg-white/5"
                        >
                            <FastForward className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Volume Control */}
                    <div className="flex items-center gap-2 group w-32">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleMute}
                            className="text-white hover:text-[#FF5757] hover:bg-white/5"
                        >
                            {isMuted ?
                                <VolumeX className="w-5 h-5" /> :
                                <Volume2 className="w-5 h-5" />
                            }
                        </Button>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={isMuted ? 0 : volume}
                            onChange={handleVolumeChange}
                            className="w-full accent-[#FF5757] bg-gray-600 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                    </div>

                    {/* Close Button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="text-white hover:text-[#FF5757] hover:bg-white/5"
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </motion.div>
    )
} 