import { motion } from 'framer-motion'
import AnimatedFooter from '@/components/animatedFooter'
import useLanguageStore from '@/app/store/useLanguageStore'

// Define the expected shape of the copyright content

export const dynamic = 'force-dynamic'

const CopyrightPage: React.FC = () => {
  const { currentLanguage, translations } = useLanguageStore()
  const copyrightData = translations[currentLanguage].copyrightData

  return (
    <>
      <motion.div
        className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-2xl font-bold mb-4 text-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {copyrightData.title}
        </motion.h1>

        <motion.div
          className="text-gray-700 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {copyrightData.sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
            >
              <h2 className="text-xl font-semibold mb-2">{section.heading}</h2>
              <p className="text-sm">{section.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <AnimatedFooter />
    </>
  )
}

export default CopyrightPage
