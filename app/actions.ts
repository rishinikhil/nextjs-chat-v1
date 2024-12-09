'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { kv } from '@vercel/kv'

import { auth } from '@/auth'
import { type Chat } from '@/lib/types'

const allowedEmails = ['nikhilrishi@gmail.com', 'three@gmail.com']

type messageContent = {
  user: string
  role: string
}

type MessageResponse = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

type UserIdData = {
  id: string
  email: string
  messages: MessageResponse[]
}

interface ChatDetails {
  chatId: string
  userId: string
  title: string | null
  createdAt: number
  messages: MessageResponse[]
  path: string
  sharePath?: string
}

interface ChatDetailsError {
  error: string
}

export async function getAllUsers() {
  const session = await auth()

  if (!allowedEmails.includes(session?.user?.email!)) {
    return [] // Return empty or unauthorized response
  }
  try {
    // Retrieve all keys with the 'user:' prefix
    const userEmail = await kv.keys('user:*')

    // Filter keys to only include Gmail addresses
    const loggedInUsers = userEmail
      .map(userKey => userKey.replace('user:', ''))
      .filter(userKey => userKey.includes('.com'))

    // Map through each Gmail user to fetch userId
    const allUsers = await Promise.all(
      loggedInUsers.map(async (userEmail, index) => {
        // Extract userId using the email
        const userId = await kv.hgetall(`user:${userEmail}`) // Assuming `kv.get` retrieves userId from email key

        // Ensure userId exists before adding to result
        if (userId) {
          return {
            index: index + 1, // Indexing starts from 1
            id: userId.id,
            email: userId.email // Clean prefix if necessary
          }
        }

        return null // Filter out nulls for missing userIds
      })
    )

    // // Remove any null entries
    const filteredUsers = allUsers.filter(user => user !== null) as {
      index: number
      id: string
      email: string
    }[]

    return filteredUsers
  } catch (error) {
    console.error('Error fetching all users:', error)
    return []
  }
}

export async function registeredUsersEmail() {
  const session = await auth()

  if (!allowedEmails.includes(session?.user?.email!)) {
    return [] // Return empty or unauthorized response
  }
  try {
    // Retrieve all keys with the 'user:' prefix
    const userKeys = await kv.keys('user:*')

    // Filter keys to only include Gmail addresses
    const gmailUsers = userKeys
      .map(userKey => userKey.replace('user:', ''))
      .filter(userKey => userKey.includes('.com'))

    // Map through each Gmail user to fetch userId
    const allUsers = await Promise.all(
      gmailUsers.map(async (userEmail, index) => {
        // Extract userId using the email
        const userId = await kv.hgetall(`user:${userEmail}`) // Assuming `kv.get` retrieves userId from email key

        // Ensure userId exists before adding to result
        if (userId) {
          return {
            id: userId.id,
            email: userId.email // Clean prefix if necessary
          }
        }

        return null // Filter out nulls for missing userIds
      })
    )

    // // Remove any null entries
    const filteredUsers = allUsers.filter(user => user !== null) as {
      id: string
      email: string
    }[]

    return filteredUsers
  } catch (error) {
    console.error('Error fetching all users:', error)
    return []
  }
}

export async function chatLog() {
  const session = await auth()

  // Check if the user's email is authorized
  if (!allowedEmails.includes(session?.user?.email!)) {
    return [] // Return empty or unauthorized response
  }

  try {
    // Retrieve all keys with the 'chat:' prefix
    const userKeys = await kv.keys('chat:*')

    // Extract Gmail addresses by removing the 'chat:' prefix
    const chatDetails = userKeys.map(userKey => userKey.replace('chat:', ''))

    // Fetch user data and format it
    const allUsers = await Promise.all(
      chatDetails.map(async userEmail => {
        // Fetch the user data associated with the Gmail address
        const userIdData = (await kv.hgetall(
          `chat:${userEmail}`
        )) as UserIdData | null

        if (userIdData && userIdData.messages) {
          // Extract messages with necessary fields
          const chatData = userIdData.messages.map(msg => {
            return {
              chatId: msg.id,
              user: msg.role,
              message: msg.content,
              response: msg.role === 'assistant' ? msg.content : null // Use null for messages from 'user' role
            }
          })

          // Filter out entries where the response is null
          return chatData.filter(chat => chat.response !== null)
        }

        return null // Filter out users with missing or invalid data
      })
    )

    // Flatten the array and filter out null values
    return allUsers.flat().filter(chat => chat !== null)
  } catch (error) {
    console.error('Error fetching chats:', error)
    return [] // Return an empty array in case of an error
  }
}

export async function getAllChats() {
  const session = await auth()

  // Check if the user's email is authorized
  if (!allowedEmails.includes(session?.user?.email!)) {
    return [] // Return empty or unauthorized response
  }

  try {
    // Retrieve all keys with the 'chat:' prefix
    const userKeys = await kv.keys('chat:*')

    // Extract Gmail addresses by removing the 'chat:' prefix
    const chatDetails = userKeys.map(userKey => userKey.replace('chat:', ''))

    // Map through each Gmail user to fetch userId and filter by registered users
    const allUsers = await Promise.all(
      chatDetails.map(async (userEmail, index) => {
        // Fetch the user data associated with the Gmail address
        const userIdData = (await kv.hgetall(
          `chat:${userEmail}`
        )) as UserIdData | null
        if (userIdData) {
          // Assuming `userIdData.messages` is an array of messages

          return {
            index: index + 1, // Indexing starts from 1
            id: userIdData.id,
            messages: userIdData.messages
          }
        }

        return null // Filter out users that don't match registered users or have missing data
      })
    )
    return allUsers.filter(user => user !== null)
  } catch (error) {
    console.error('Error fetching chats:', error)
    return [] // Return an empty array in case of an error
  }
}

// export async function chatLog() {
//   const session = await auth()
//   const allowedEmails = ['nikhilrishi@gmail.com', 'one@gmail.com']

//   if (!session?.user?.email || !allowedEmails.includes(session.user.email)) {
//     return [] // Return empty array for unauthorized access
//   }

//   try {
//     const chatKeys = await kv.keys('chat:*')
//     const chatIds = chatKeys.map(chat => chat.replace('chat:', ''))

//     const chatsWithTimestamps = await Promise.all(
//       chatIds.map(async chatId => {
//         try {
//           const chat = await kv.hgetall<Chat>(`chat:${chatId}`)
//           if (chat && chat.createdAt) {
//             return {
//               chatId,
//               createdAt: Number(chat.createdAt) || 0,
//               user: chat.userId,
//               message: chat?.messages[0]?.content || ''
//             }
//           }
//         } catch (error) {
//           console.error(`Error fetching chat ${chatId}:`, error)
//         }
//         return null
//       })
//     )

//     const validChats = chatsWithTimestamps.filter(
//       (chat): chat is NonNullable<typeof chat> => chat !== null
//     )

//     validChats.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
//     return validChats
//   } catch (error) {
//     console.error('Error fetching chat logs:', error)
//     return []
//   }
// }

export async function getChats(userId?: string | null) {
  const session = await auth()

  if (!userId) {
    return []
  }

  if (userId !== session?.user?.id) {
    return {
      error: 'Unauthorized'
    }
  }

  try {
    const pipeline = kv.pipeline()
    const chats: string[] = await kv.zrange(`user:chat:${userId}`, 0, -1, {
      rev: true
    })

    for (const chat of chats) {
      pipeline.hgetall(chat)
    }

    const results = await pipeline.exec()

    return results as Chat[]
  } catch (error) {
    return []
  }
}

export async function getChat(id: string, userId: string) {
  const session = await auth()

  if (userId !== session?.user?.id) {
    return {
      error: 'Unauthorized'
    }
  }

  const chat = await kv.hgetall<Chat>(`chat:${id}`)

  if (!chat || (userId && chat.userId !== userId)) {
    return null
  }

  return chat
}

export async function removeChat({ id, path }: { id: string; path: string }) {
  const session = await auth()

  if (!session) {
    return {
      error: 'Unauthorized'
    }
  }

  // Convert uid to string for consistent comparison with session.user.id
  const uid = String(await kv.hget(`chat:${id}`, 'userId'))

  if (uid !== session?.user?.id) {
    return {
      error: 'Unauthorized'
    }
  }

  await kv.del(`chat:${id}`)
  await kv.zrem(`user:chat:${session.user.id}`, `chat:${id}`)

  revalidatePath('/')
  return revalidatePath(path)
}

export async function clearChats() {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: 'Unauthorized'
    }
  }

  const chats: string[] = await kv.zrange(`user:chat:${session.user.id}`, 0, -1)
  if (!chats.length) {
    return redirect('/')
  }
  const pipeline = kv.pipeline()

  for (const chat of chats) {
    pipeline.del(chat)
    pipeline.zrem(`user:chat:${session.user.id}`, chat)
  }

  await pipeline.exec()

  revalidatePath('/')
  return redirect('/')
}

export async function getSharedChat(id: string) {
  const chat = await kv.hgetall<Chat>(`chat:${id}`)

  if (!chat || !chat.sharePath) {
    return null
  }

  return chat
}

export async function shareChat(id: string) {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: 'Unauthorized'
    }
  }

  const chat = await kv.hgetall<Chat>(`chat:${id}`)

  if (!chat || chat.userId !== session.user.id) {
    return {
      error: 'Something went wrong'
    }
  }

  const payload = {
    ...chat,
    sharePath: `/share/${chat.id}`
  }

  await kv.hmset(`chat:${chat.id}`, payload)

  return payload
}

export async function saveChat(chat: Chat) {
  const session = await auth()

  if (session && session.user) {
    const pipeline = kv.pipeline()
    pipeline.hmset(`chat:${chat.id}`, chat)
    pipeline.zadd(`user:chat:${chat.userId}`, {
      score: Date.now(),
      member: `chat:${chat.id}`
    })
    await pipeline.exec()
  } else {
    return
  }
}

export async function refreshHistory(path: string) {
  redirect(path)
}

export async function getMissingKeys() {
  const keysRequired = ['OPENAI_API_KEY']
  return keysRequired
    .map(key => (process.env[key] ? '' : key))
    .filter(key => key !== '')
}

// Type definitions
interface ChatTableRow {
  index: number
  chatId: string
  userEmail: string
  createdAt: number
}

interface ChatHistory {
  chatId: string
  messages: MessageResponse[]
}

// Replace the existing chat table functions with these:
export async function getChatTable(): Promise<ChatTableRow[]> {
  const session = await auth()

  if (!allowedEmails.includes(session?.user?.email!)) {
    return []
  }

  try {
    const chatKeys = await kv.keys('chat:*')

    const chatTableData = await Promise.all(
      chatKeys.map(async chatKey => {
        const chat = await kv.hgetall<Chat>(chatKey)

        if (!chat) return null

        // First try to get the user data directly
        const userData = await kv.hgetall<{ email: string }>(
          `user:${chat.userId}`
        )

        // If no user data found, try to get from registered users
        if (!userData?.email) {
          const registeredUsers = await registeredUsersEmail()
          const userMatch = registeredUsers.find(
            user => user.id === chat.userId
          )
          if (userMatch) {
            return {
              index: 0, // We'll set the correct index after sorting
              chatId: chat.id,
              userEmail: userMatch.email,
              createdAt:
                typeof chat.createdAt === 'number' ? chat.createdAt : Date.now()
            } satisfies ChatTableRow
          }
        }

        return {
          index: 0, // We'll set the correct index after sorting
          chatId: chat.id,
          userEmail: userData?.email || 'Unknown User',
          createdAt:
            typeof chat.createdAt === 'number' ? chat.createdAt : Date.now()
        } satisfies ChatTableRow
      })
    )

    // Filter out null values, sort by createdAt (newest first), and add indices
    return chatTableData
      .filter((item): item is ChatTableRow => item !== null)
      .sort((a, b) => b.createdAt - a.createdAt)
      .map((item, idx) => ({
        ...item,
        index: idx + 1
      }))
  } catch (error) {
    console.error('Error fetching chat table:', error)
    return []
  }
}

export async function getChatHistory(
  chatId: string
): Promise<ChatHistory | null> {
  const session = await auth()

  if (!allowedEmails.includes(session?.user?.email!)) {
    return null
  }

  try {
    const chat = await kv.hgetall<Chat>(`chat:${chatId}`)

    if (!chat) return null

    // Filter and transform messages to match MessageResponse type
    const filteredMessages = chat.messages
      .filter(
        (msg): msg is MessageResponse =>
          msg.role === 'user' || msg.role === 'assistant'
      )
      .map(msg => ({
        id: msg.id,
        role: msg.role,
        content: msg.content
      }))

    return {
      chatId: chat.id,
      messages: filteredMessages
    }
  } catch (error) {
    console.error('Error fetching chat history:', error)
    return null
  }
}
