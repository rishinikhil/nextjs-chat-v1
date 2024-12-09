'use client'

import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
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

import TabDrawer from './components/tabdrawer'
import { getAllUsers, getChatTable, getChatHistory } from '@/app/actions'

// Define the Column type without readonly
type Column = {
  header: string
  accessor: keyof UserAdminDisplay
}

// Define userColumns as a regular array, not readonly
const userColumns: Column[] = [
  { header: 'Index', accessor: 'index' },
  { header: 'ID', accessor: 'id' },
  { header: 'Email', accessor: 'email' }
]

interface UserAdminDisplay {
  index: number
  id: string
  email: string
}

interface ChatTableRow {
  index: number
  chatId: string
  userEmail: string
  createdAt: number
}

interface ChatHistory {
  chatId: string
  messages: {
    id: string
    role: 'user' | 'assistant'
    content: string
  }[]
}

// Update the TabDrawer component props type if needed
interface TabDrawerProps {
  title: string
  data: UserAdminDisplay[]
  columns: Column[] // Update this to accept readonly columns
}

export default function Page() {
  const [userDetails, setUserDetails] = useState<UserAdminDisplay[]>([])
  const [chatTableData, setChatTableData] = useState<ChatTableRow[]>([])
  const [selectedChatHistory, setSelectedChatHistory] =
    useState<ChatHistory | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        const [users, chats] = await Promise.all([
          getAllUsers(),
          getChatTable()
        ])
        setUserDetails(users)
        setChatTableData(chats)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const handleChatClick = async (chatId: string) => {
    try {
      const history = await getChatHistory(chatId)
      if (history) {
        setSelectedChatHistory(history)
        setIsDialogOpen(true)
      }
    } catch (error) {
      console.error('Error fetching chat history:', error)
    }
  }

  const filteredChats = chatTableData.filter(
    chat =>
      chat.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.chatId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel - Chat Details</h1>

      {/* Upper Cards Section */}
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
                {chatTableData.length}
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Chat Table Section */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Chat Log</CardTitle>
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-500" />
            <Input
              placeholder="Search by email or chat ID..."
              className="max-w-xs"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Index</TableHead>
                <TableHead>Chat ID</TableHead>
                <TableHead>User Email</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredChats.map(chat => (
                <TableRow key={chat.chatId}>
                  <TableCell>{chat.index}</TableCell>
                  <TableCell className="font-medium">{chat.chatId}</TableCell>
                  <TableCell>{chat.userEmail}</TableCell>
                  <TableCell>
                    {new Date(chat.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleChatClick(chat.chatId)}
                    >
                      View History
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Chat History Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chat History</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedChatHistory?.messages.map((message, index) => (
              <div
                key={message.id}
                className={`p-4 rounded-lg ${
                  message.role === 'user' ? 'bg-blue-50 ml-auto' : 'bg-gray-50'
                }`}
              >
                <div className="font-semibold mb-2">
                  {message.role === 'user' ? 'User' : 'Assistant'}:
                </div>
                <div className="whitespace-pre-wrap">{message.content}</div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
