import React, { useEffect, useRef, useState } from 'react'
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa'
import Wavesurfer from 'wavesurfer.js'

import { WaveSurferWrap } from './styles'

interface AudioWaveProps {
  audio: string
}

const AudioWave: React.FC<AudioWaveProps> = ({ audio }) => {
  const containerRef = useRef(null)
  const waveSurferRef = useRef<Wavesurfer>()
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const waveSurfer = Wavesurfer.create({
      container: containerRef.current || '',
      responsive: true,
      barWidth: 2,
      barHeight: 2,
      cursorWidth: 0,
      progressColor: '#ff9000'
    })

    waveSurfer.load(audio)

    waveSurfer.on('ready', () => {
      waveSurferRef.current = waveSurfer
    })
    waveSurfer.on('finish', () => {
      setIsPlaying(false)
    })

    return () => {
      waveSurfer.destroy()
    }
  }, [audio])

  const toggleIsPlaying = () => {
    setIsPlaying(!isPlaying)
  }

  const handleClickPlayPauseButton = () => {
    waveSurferRef.current?.playPause()
    toggleIsPlaying()
  }

  return (
    <WaveSurferWrap>
      <button onClick={handleClickPlayPauseButton} type="button">
        {isPlaying ? <FaPauseCircle size="3em" /> : <FaPlayCircle size="3em" />}
      </button>
      <div ref={containerRef} />
    </WaveSurferWrap>
  )
}

export default AudioWave
