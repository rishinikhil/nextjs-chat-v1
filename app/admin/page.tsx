'use client'

import { useEffect, useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

import TabDrawer from './components/tabdrawer'
import { chatLog, getAllChats, getAllUsers } from '@/app/actions'
import { ChatWithTimestamp } from '@/lib/types'

// Define TypeScript types for the data structures
interface Chat {
  chatId: string
  user: string
  message: string
}

interface UserAdminDisplay {
  index: number
  id: string
  email: string
}

interface ChatAdminMessageContent {
  // role: string
  content: string
}

interface ChatAdminDisplay {
  index: number
  id: string
  messages: ChatAdminMessageContent[]
}

// Define columns structure type for Table
type Column = {
  header: string
  accessor: keyof UserAdminDisplay | keyof ChatAdminDisplay
}

// Column definitions
const userColumns: Column[] = [
  { header: 'Index', accessor: 'index' },
  { header: 'ID', accessor: 'id' },
  { header: 'Email', accessor: 'email' }
]

const chatColumns: Column[] = [
  { header: 'Index', accessor: 'index' },
  { header: 'ID', accessor: 'id' }
  // { header: 'messages', accessor: 'messages' }
]

export default function Page() {
  // State variables with proper typing
  const [chatLogsValue, setChatLogsValue] = useState<Chat[]>([])
  const [selectedChat, setSelectedChat] = useState(null)
  const [userDetails, setUserDetails] = useState<UserAdminDisplay[]>([])
  const [chatDetails, setChatDetails] = useState<ChatAdminDisplay[]>([])

  useEffect(() => {
    // Fetch user details
    async function userCountFunction() {
      try {
        const users: UserAdminDisplay[] = await getAllUsers()
        setUserDetails(users)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    // Fetch chat details
    async function userChatCountFunction() {
      try {
        const chats: ChatAdminDisplay[] = await getAllChats()
        setChatDetails(chats)
      } catch (error) {
        console.error('Error fetching chats:', error)
      }
    }

    // Fetch chat logs
    async function chatlog() {
      try {
        const response = await chatLog()

        // Map response data, ensuring each `message` is a string
        const data: Chat[] = response.map(
          (chat: any): Chat => ({
            chatId: chat.chatId,
            user: chat.user,
            message:
              typeof chat.message === 'string'
                ? chat.message
                : JSON.stringify(chat.message) // Safeguard for non-string messages
          })
        )

        setChatLogsValue(data)
      } catch (error) {
        console.error('Error fetching chat logs:', error)
      }
    }

    // Invoke all data-fetching functions
    userCountFunction()
    userChatCountFunction()
    chatlog()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel - Chat Details</h1>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Chat Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TabDrawer title="Users" data={userDetails} columns={userColumns} />
            <Button
              variant="ghost"
              className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-50 rounded-md transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-800">Chats</span>
              </div>
              <span className="bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full text-sm font-medium">
                {chatDetails.length}
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* <Card>
        <CardHeader>
          <CardTitle>Chat Log</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {chatLogsValue.map(chat => (
                <TableRow key={chat.chatId}>
                  <TableCell>{chat.chatId}</TableCell>
                  <TableCell>{chat.user}</TableCell>
                  <TableCell>{chat.message}</TableCell>
                  <TableCell>
                    {new Date(chat.createdAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card> */}

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Chat Log</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {chatLogsValue.map(chat => (
                <Dialog key={chat.chatId}>
                  <DialogTrigger asChild>
                    <TableRow
                      className="cursor-pointer hover:bg-gray-100"
                      // onClick={() => setSelectedChat(chat)}
                    >
                      <TableCell>{chat.chatId}</TableCell>
                      <TableCell>{chat.user}</TableCell>
                      <TableCell>{chat.message}</TableCell>
                    </TableRow>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="flex gap-2">
                        <span className="font-semibold">User Question:</span>
                        {chat.message}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">
                        Assistant Response:
                      </h4>
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {/* {getAssistantResponse(chat.chatId)} */}
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
