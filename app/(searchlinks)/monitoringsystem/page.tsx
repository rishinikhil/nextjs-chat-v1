'use client'

import React, { useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import AnimatedFooter from '@/components/animatedFooter'

const Carousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  // Destructure as [ref, instanceRef]
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1 },
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel)
    }
  })

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        {/* Carousel container: custom height, rounded corners */}
        <div
          ref={sliderRef}
          className="keen-slider w-[50vw] border border-black py-5 max-w-3xl h-[78vh] rounded-2xl overflow-hidden shadow-lg"
        >
          <div className="keen-slider__slide">
            <img
              src="/sliderImage1.png"
              alt="Slide 1"
              className="object-contain w-full h-full"
            />
          </div>
          <div className="keen-slider__slide">
            <img
              src="/sliderImage2.png"
              alt="Slide 2"
              className="object-contain w-full h-full"
            />
          </div>
          <div className="keen-slider__slide">
            <img
              src="/sliderImage3.png"
              alt="Slide 3"
              className="object-contain w-full h-full"
            />
          </div>
          <div className="keen-slider__slide">
            <img
              src="/sliderImage4.png"
              alt="Slide 4"
              className="object-contain w-full h-full"
            />
          </div>
        </div>

        {/* Navigation and Download PDF button */}
        <div className="mt-4 w-full max-w-3xl flex justify-start space-x-2">
          <button
            onClick={() => instanceRef.current?.prev()}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
          >
            Prev
          </button>
          <button
            onClick={() => instanceRef.current?.next()}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
          >
            Next
          </button>
          <a
            href="/BioSarthi_flyer.pdf"
            download
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
          >
            Download PDF
          </a>
        </div>
      </div>
      <AnimatedFooter />
    </>
  )
}

export default Carousel
