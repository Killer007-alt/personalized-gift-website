'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import StoryPage from './StoryPage'
import { TimeCounter } from './TimeCounter'
import { FlipWords } from './ui/flip-words'

export default function MainContent() {
  const images = [
    "Snapchat-261752186.jpg",
    "Snapchat-1679300968.jpg",
    "Snapchat-217559804.jpg",
    "Snapchat-1230080118.jpg",
    "Snapchat-1681876362.jpg",
    "Snapchat-1389843033.jpg",
    "Snapchat-1754831128.jpg",
    "Snapchat-1220852962~2.jpg"
  ]

  const [currentPage, setCurrentPage] = useState(0)
  const [selectedImage, setSelectedImage] = useState(null)

  const galleryPageIndex = 3 // index of gallery page in pages array

  const pages = [
    // Cover Page
    <StoryPage key="cover" backgroundColor="bg-gradient-to-br from-rose-200 to-purple-200">
      <div className="flex flex-col items-center justify-center h-full text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-44 h-44 mb-8 rounded-full overflow-hidden shadow-md"
        >
          <Image
            src="https://images.pexels.com/photos/371285/pexels-photo-371285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Heart icon"
            priority={true}
            width={176}
            height={176}
            className="object-cover w-full h-full"
          />
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-4 relative z-10">
          Our Special Story
        </h1>
        <div className="text-2xl md:text-3xl text-purple-700 mb-8 relative z-10">
          Hey Cutiepie, you are<br />my<FlipWords words={['sunshine', 'soulmate', 'everything', 'love', 'world']} className="text-nowrap" />
        </div>
      </div>
    </StoryPage>,

    // Our Journey Page
    <StoryPage key="journey" backgroundColor="bg-gradient-to-br from-blue-200 to-green-200">
      <h2 className="text-3xl font-bold text-blue-600 mb-6 relative z-10">Our Journey</h2>
      <div className="space-y-4 flex-1 overflow-y-auto overflow-x-hidden rounded-xl custom-scrollbar">
        {[
          { date: 'July, 2024', event: 'Our Journey Began', emoji: '❤️' },
          { date: 'Yet To Happen', event: 'First Movie Together', emoji: '🎬' },
          { date: '10 July, 2024', event: 'First Hug', emoji: '🤗' },
          { date: 'Loading....', event: 'First Trip Together', emoji: '✈️' },
          { date: '08 August, 2024', event: 'First Fight & Patch-up', emoji: '💬' },
          { date: '25 December, 2024', event: 'First Christmas Together', emoji: '🎄' },
        ]
          .map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-md"
            >
              <span className="text-3xl">{item.emoji}</span>
              <div className='relative z-10'>
                <p className="font-medium text-gray-800">{item.event}</p>
                <p className="text-sm text-gray-500">{item.date}</p>
              </div>
            </motion.div>
          ))}
      </div>
    </StoryPage>,

    // Time Together Page
    <StoryPage key="time" backgroundColor="bg-gradient-to-br from-pink-200 to-purple-200">
      <div className="flex flex-col items-center justify-center h-full text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6 relative z-10">Our Time Together</h2>
        <div className="w-full max-w-md space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TimeCounter startDate="2025-04-01" label="As Friends" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <TimeCounter startDate="2024-07-01" label="As a Couple" />
          </motion.div>
        </div>
      </div>
    </StoryPage>,

    // Snapchat Gallery Page
    <StoryPage key="gallery" backgroundColor="bg-gradient-to-br from-yellow-200 to-pink-200">
      <div className="flex flex-col items-center justify-center h-full text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-6 relative z-10">Our Moments</h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImage ?? images[0]}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl overflow-hidden shadow-lg"
          >
            <Image
              src={`/images/${selectedImage ?? images[0]}`}
              alt={`Gallery image`}
              width={400}
              height={300}
              className="object-cover w-full h-full rounded-2xl"
            />
            <p className="mt-4 text-center text-gray-700">
              Moment {images.indexOf(selectedImage ?? images[0]) + 1}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </StoryPage>
  ]

  // Bottom button handlers
  const handleNext = () => {
    if (currentPage === galleryPageIndex) {
      const currentIndex = images.indexOf(selectedImage ?? images[0])
      const nextIndex = (currentIndex + 1) % images.length
      setSelectedImage(images[nextIndex])
    } else {
      setCurrentPage(prev => Math.min(prev + 1, pages.length - 1))
    }
  }

  const handlePrev = () => {
    if (currentPage === galleryPageIndex) {
      const currentIndex = images.indexOf(selectedImage ?? images[0])
      const prevIndex = (currentIndex - 1 + images.length) % images.length
      setSelectedImage(images[prevIndex])
    } else {
      setCurrentPage(prev => Math.max(prev - 1, 0))
    }
  }

  return (
    <div className="w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          {pages[currentPage]}
        </motion.div>
      </AnimatePresence>

      {/* Bottom Navigation Buttons */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4 z-50">
        <button
          onClick={handlePrev}
          className="px-4 py-2 bg-blue-500 text-white rounded flex items-center gap-2"
        >
          <ChevronLeft size={24} /> Previous
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-500 text-white rounded flex items-center gap-2"
        >
          Next <ChevronRight size={24} />
        </button>
      </div>
    </div>
  )
}
