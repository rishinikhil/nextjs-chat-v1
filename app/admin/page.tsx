'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import {
  chatLog,
  getAllChats,
  getAllChatsWithTimestamps,
  getAllUsers,
  getChats
} from '../actions'
import { ChatWithTimestamp } from '@/lib/types'
// Define a type for chat data
interface Chat {
  chatId: string
  createdAt: number
  user: string // Adjust the type based on your user structure
  message: string
}

// Define a type-safe AdminPanel component
const AdminPanel = () => {
  const [chatLogsValue, setChatLogsValue] = useState<Chat[]>([])
  const [userCount, setUserCount] = useState(0)
  const [chatCount, setChatCount] = useState(0)
  const [lastTextTime, setLastTextTime] = useState<
    ChatWithTimestamp | undefined
  >(undefined)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Fetch chat data client-side using useEffect
  useEffect(() => {
    async function userCountFunction() {
      const users = await getAllUsers()
      setUserCount(users.length)
      //   console.log('This is result:', result)
    }
    async function chatCountFunction() {
      const chats = await getAllChats()
      setChatCount(chats.length)
      //   console.log('This is result:', result)
    }
    async function lastTextGenerated() {
      const textTime = await getAllChatsWithTimestamps()
      // setLastTextTime(textTime[0])
      setLastTextTime(textTime[0])
      //   console.log('This is result:', result)
    }
    async function chatlog() {
      try {
        const response = await chatLog() // Call the chatLog function to get the chat logs
        const data: Chat[] = response // Ensure the response is typed as Chat[]
        setChatLogsValue(data) // Update the state with fetched chat logs
      } catch (error) {
        console.error('Error fetching chat logs:', error) // Log any errors that occur during the fetch
        // Optionally set an error state here if needed
      }
    }
    userCountFunction()
    chatCountFunction()
    lastTextGenerated()
    chatlog()
  }, [])

  console.log('Rendering AdminPanel')
  console.log(chatLogsValue)
  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel - Chat Details</h1>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Chat Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard title="Total Messages" value={userCount} />
            <StatCard title="Unique Users" value={chatCount} />
            <StatCard
              title="Last Activity"
              value={`${lastTextTime?.createdAt}`}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Chat Log</CardTitle>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="search"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <Button type="submit">
              <Search className="h-4 w-4" />
            </Button>
          </div>
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
      </Card>
    </div>
  )
}

// AdminPanel()
console.log('hehe')
// Define a type for StatCard props
type StatCardProps = {
  title: string
  value: number | string
}

// Make the StatCard component type-safe
function StatCard({ title, value }: StatCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  )
}

export default AdminPanel
