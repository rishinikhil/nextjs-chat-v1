import React, { useState } from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerTrigger
} from '@/components/ui/drawer'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList } from '@/components/ui/tabs'
import { ReactNode } from 'react'
import { UserAdminDisplay, Column } from '@/lib/admin-types'

interface TabDrawerProps {
  title: string
  data: UserAdminDisplay[]
  columns: Column[]
  icon?: ReactNode
  description?: string
}

const TabDrawer = ({
  title,
  data,
  columns,
  icon,
  description = 'Showing all items in the system'
}: TabDrawerProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Tabs defaultValue="tab" className="w-full">
      <TabsList className="w-full bg-white shadow-sm rounded-lg p-1 border">
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button
              variant="ghost"
              className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-50 rounded-md transition-colors"
            >
              <div className="flex items-center gap-2">
                {icon && <span className="text-gray-600">{icon}</span>}
                <span className="font-medium text-gray-800">{title}</span>
              </div>
              <span className="bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full text-sm font-medium">
                {data.length}
              </span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="bg-white">
            <DrawerHeader className="border-b">
              <DrawerTitle className="text-2xl font-semibold text-gray-900">
                {title}
              </DrawerTitle>
              <DrawerDescription className="text-gray-600">
                {description.replace('all', data.length.toString())}
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-6">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    {columns.map((column, index) => (
                      <TableHead
                        key={index}
                        className="font-semibold text-gray-700"
                      >
                        {column.header}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item: any, rowIndex: number) => (
                    <TableRow
                      key={rowIndex}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {columns.map((column, colIndex) => (
                        <TableCell
                          key={`${rowIndex}-${colIndex}`}
                          className="text-gray-700"
                        >
                          {item[column.accessor]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <DrawerFooter className="border-t bg-gray-50">
              <DrawerClose asChild>
                <Button
                  variant="outline"
                  className="hover:bg-white transition-colors"
                >
                  Close
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </TabsList>
    </Tabs>
  )
}

export default TabDrawer
