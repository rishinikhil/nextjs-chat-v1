'use client'
import { motion } from 'framer-motion'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import useLanguageStore from '@/app/store/useLanguageStore'
import AnimatedFooter from '@/components/animatedFooter'

export default function MonitoringComparison() {
  const { currentLanguage, translations } = useLanguageStore()
  const monitoringData = translations[currentLanguage].monitoringData

  return (
    <div className="min-h-screen bg-white p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-semibold">
          <span className="text-[#2E7D32]">
            {monitoringData.title.firstPart}
          </span>{' '}
          <span className="text-[#D32F2F]">
            {monitoringData.title.secondPart}
          </span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {monitoringData.introduction}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="overflow-x-auto my-12"
      >
        <Table className="w-full border border-gray-200 shadow-lg">
          <TableHeader>
            <TableRow className="bg-green-700 text-white">
              {monitoringData.headings.map((header, index) => (
                <TableHead key={index} className="p-4 text-white">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {monitoringData.rows.map((row, rowIndex) => (
              <TableRow key={rowIndex} className="border-b">
                {row.map((cell, cellIndex) => (
                  <TableCell key={cellIndex} className="p-4 text-gray-800">
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>

      <AnimatedFooter />
    </div>
  )
}
