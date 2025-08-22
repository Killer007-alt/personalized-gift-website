'use client'

import { useState, useEffect } from 'react'
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
    "Snapchat-1220852962-2.jpg"
  ]

  const galleryPageIndex = 3
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedImage, setSelectedImage] = useState(images[0])

  // Auto slideshow
  useEffect(() => {
    if (currentPage !== galleryPageIndex) return
    const interval = setInterval(() => {
      const currentIndex = images.indexOf(selectedImage)
      const nextIndex = (currentIndex + 1) % images.length
      setSelectedImage(images[nextIndex])
    }, 3500)
    return () => clearInterval(interval)
  }, [selectedImage, currentPage])

  const handleNext = () => {
    if (currentPage === galleryPageIndex) {
      const currentIndex = images.indexOf(selectedImage)
      const nextIndex = (currentIndex + 1) % images.length
      setSelectedImage(images[nextIndex])
    } else {
      setCurrentPage(prev => Math.min(prev + 1, pages.length - 1))
    }
  }

  const handlePrev = () => {
    if (currentPage === galleryPageIndex) {
      const currentIndex = images.indexOf(selectedImage)
      const prevIndex = (currentIndex - 1 + images.length) % images.length
      setSelectedImage(images[prevIndex])
    } else {
      setCurrentPage(prev => Math.max(prev - 1, 0))
    }
  }

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
            priority
            width={176}
            height={176}
            className="object-cover w-full h-full"
          />
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-4 relative z-10">
          Our Special Story
        </h1>
        <div className="text-2xl md:text-3xl text-purple-700 mb-8 relative z-10">
          Hey Cutiepie, you are<br />my <FlipWords words={['sunshine', 'soulmate', 'everything', 'love', 'world']} className="text-nowrap" />
        </div>
      </div>
    </StoryPage>,

    // Journey Page
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
        ].map((item, index) => (
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

    // Gallery Page
    <StoryPage key="gallery" backgroundColor="bg-gradient-to-br from-yellow-200 to-pink-200">
      <div className="relative flex flex-col items-center justify-center h-full text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-6 relative z-20">Our Moments</h2>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="relative z-20 rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src={`/images/${selectedImage}`}
              alt={`Gallery image`}
              width={400}
              height={300}
              className="object-cover w-full h-full rounded-2xl"
            />
            <p className="mt-4 text-center text-gray-100 text-lg font-semibold drop-shadow-md">
              Moment {images.indexOf(selectedImage) + 1}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </StoryPage>
  ]

  return (
    <div className="w-full h-full relative">
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

      {/* Bottom Arrows */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex gap-8 z-50">
        <button
          onClick={handlePrev}
          className="w-14 h-14 flex items-center justify-center bg-pink-600 text-white rounded-full shadow-lg hover:shadow-pink-500/60 hover:scale-110 transition-all duration-300"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={handleNext}
          className="w-14 h-14 flex items-center justify-center bg-white text-pink-600 rounded-full shadow-lg hover:shadow-pink-500/40 hover:scale-110 transition-all duration-300"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  )
}            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="relative z-20 rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src={`/images/${selectedImage}`}
              alt={`Gallery image`}
              width={400}
              height={300}
              className="object-cover w-full h-full rounded-2xl"
            />
            <p className="mt-4 text-center text-gray-100 text-lg font-semibold drop-shadow-md">
              Moment {images.indexOf(selectedImage) + 1}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </StoryPage>
  ]

  return (
    <div className="w-full h-full relative">
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

      {/* Bottom Arrows */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex gap-8 z-50">
        <button
          onClick={handlePrev}
          className="w-14 h-14 flex items-center justify-center bg-pink-600 text-white rounded-full shadow-lg hover:shadow-pink-500/60 hover:scale-110 transition-all duration-300"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={handleNext}
          className="w-14 h-14 flex items-center justify-center bg-white text-pink-600 rounded-full shadow-lg hover:shadow-pink-500/40 hover:scale-110 transition-all duration-300"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  )
}            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="relative z-20 rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src={`/images/${selectedImage}`}
              alt={`Gallery image`}
              width={400}
              height={300}
              className="object-cover w-full h-full rounded-2xl"
            />
            <p className="mt-4 text-center text-gray-100 text-lg font-semibold drop-shadow-md">
              Moment {images.indexOf(selectedImage) + 1}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </StoryPage>
  ]

  return (
    <div className="w-full h-full relative">
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

      {/* Bottom Arrows */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex gap-8 z-50">
        <button
          onClick={handlePrev}
          className="w-14 h-14 flex items-center justify-center bg-pink-500 text-white rounded-full shadow-lg hover:shadow-pink-400/60 hover:scale-110 transition-all duration-300"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={handleNext}
          className="w-14 h-14 flex items-center justify-center bg-white text-pink-500 rounded-full shadow-lg hover:shadow-pink-400/40 hover:scale-110 transition-all duration-300"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  )
}        >
          <Image
            src="https://images.pexels.com/photos/371285/pexels-photo-371285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Heart icon"
            priority
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

    // Gallery Page
    <StoryPage key="gallery" backgroundColor="bg-gradient-to-br from-yellow-200 to-pink-200">
      <div className="relative flex flex-col items-center justify-center h-full text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-6 relative z-20">Our Moments</h2>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-10 rounded-2xl pointer-events-none"></div>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="relative z-20 rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src={`/images/${selectedImage}`}
              alt={`Gallery image`}
              width={400}
              height={300}
              className="object-cover w-full h-full rounded-2xl"
            />
            <p className="mt-4 text-center text-gray-100 text-lg font-semibold drop-shadow-md">
              Moment {images.indexOf(selectedImage) + 1}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </StoryPage>
  ]

  return (
    <div className="w-full h-full relative">
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

      {/* Bottom arrows */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex gap-8 z-50">
        <button
          onClick={handlePrev}
          className="w-14 h-14 flex items-center justify-center bg-pink-500 text-white rounded-full shadow-lg hover:shadow-pink-400/60 hover:scale-110 transition-all duration-300"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={handleNext}
          className="w-14 h-14 flex items-center justify-center bg-white text-pink-500 rounded-full shadow-lg hover:shadow-pink-400/40 hover:scale-110 transition-all duration-300"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  )
}            src="https://images.pexels.com/photos/371285/pexels-photo-371285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
      <div className="relative flex flex-col items-center justify-center h-full text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-6 relative z-20">Our Moments</h2>

        {/* Cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-10 rounded-2xl pointer-events-none"></div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="relative z-20 rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src={`/images/${selectedImage}`}
              alt={`Gallery image`}
              width={400}
              height={300}
              className="object-cover w-full h-full rounded-2xl"
            />
            <p className="mt-4 text-center text-gray-100 text-lg font-semibold drop-shadow-md">
              Moment {images.indexOf(selectedImage) + 1}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </StoryPage>
  ]

  return (
    <div className="w-full h-full relative">
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

      {/* Bottom Arrows Navigation */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex gap-8 z-50">
        {/* Previous Arrow */}
        <button
          onClick={handlePrev}
          className="w-14 h-14 flex items-center justify-center bg-pink-500 text-white rounded-full shadow-lg hover:shadow-pink-400/60 hover:scale-110 transition-all duration-300"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Next Arrow */}
        <button
          onClick={handleNext}
          className="w-14 h-14 flex items-center justify-center bg-white text-pink-500 rounded-full shadow-lg hover:shadow-pink-400/40 hover:scale-110 transition-all duration-300"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  )
}            src="https://images.pexels.com/photos/371285/pexels-photo-371285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
      <div className="relative flex flex-col items-center justify-center h-full text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-6 relative z-20">Our Moments</h2>

        {/* Cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-10 rounded-2xl pointer-events-none"></div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="relative z-20 rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src={`/images/${selectedImage}`}
              alt={`Gallery image`}
              width={400}
              height={300}
              className="object-cover w-full h-full rounded-2xl"
            />
            <p className="mt-4 text-center text-gray-100 text-lg font-semibold drop-shadow-md">
              Moment {images.indexOf(selectedImage) + 1}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </StoryPage>
  ]

  return (
    <div className="w-full h-full relative">
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

      {/* Bottom Arrows Navigation */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex gap-8 z-50">
        {/* Previous Arrow */}
        <button
          onClick={handlePrev}
          className="w-14 h-14 flex items-center justify-center bg-pink-500 text-white rounded-full shadow-lg hover:shadow-pink-400/60 hover:scale-110 transition-all duration-300"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Next Arrow */}
        <button
          onClick={handleNext}
          className="w-14 h-14 flex items-center justify-center bg-white text-pink-500 rounded-full shadow-lg hover:shadow-pink-400/40 hover:scale-110 transition-all duration-300"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  )
}    }
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
