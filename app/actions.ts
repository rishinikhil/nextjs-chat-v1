'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { kv } from '@vercel/kv'

import { auth } from '@/auth'
import { type Chat } from '@/lib/types'

export async function getAllUsers() {
  const session = await auth()
  const allowedEmails = ['nikhilrishi@gmail.com', 'one@gmail.com']

  if (!allowedEmails.includes(session?.user?.email!)) {
    return [] // Return empty or unauthorized response
  }

  try {
    const users = await kv.keys('user:*')
    const modifiedUsers = users
      .filter(user => user.includes('.com'))
      .map(user => user.replace('user:', ''))

    return modifiedUsers
  } catch (error) {
    return [] // Return an empty array in case of error
  }
}

export async function getAllChats() {
  const session = await auth()
  const allowedEmails = ['nikhilrishi@gmail.com', 'one@gmail.com']

  if (!allowedEmails.includes(session?.user?.email!)) {
    return [] // Return empty or unauthorized response
  }

  try {
    const chats = await kv.keys('chat:*')
    const modifiedChats = chats.map(chat => chat.replace('chat:', ''))
    return modifiedChats
  } catch (error) {
    return [] // Return an empty array in case of error
  }
}

export async function getAllChatsWithTimestamps() {
  const session = await auth()
  const allowedEmails = ['nikhilrishi@gmail.com', 'one@gmail.com']

  if (!session?.user?.email || !allowedEmails.includes(session.user.email)) {
    return [] // Return empty array for unauthorized access
  }

  try {
    const chats = await kv.keys('chat:*')
    const modifiedChats = chats.map(chat => chat.replace('chat:', ''))

    const chatsWithTimestamps = await Promise.all(
      modifiedChats.map(async chatId => {
        const chat = await kv.hgetall<Chat>(`chat:${chatId}`)
        if (chat && chat.createdAt) {
          return {
            chatId,
            createdAt: new Date(Number(chat.createdAt)) // Convert to Date
          }
        }
        return null
      })
    )

    const validChats = chatsWithTimestamps.filter(chat => chat !== null) as {
      chatId: string
      createdAt: Date
    }[]

    validChats.sort(
      (a, b) => (b.createdAt.getTime() || 0) - (a.createdAt.getTime() || 0)
    )
    return validChats
  } catch (error) {
    console.error('Error fetching chat timestamps:', error)
    return []
  }
}

export async function chatLog() {
  const session = await auth()
  const allowedEmails = ['nikhilrishi@gmail.com', 'one@gmail.com']

  if (!session?.user?.email || !allowedEmails.includes(session.user.email)) {
    return [] // Return empty array for unauthorized access
  }

  try {
    const chatKeys = await kv.keys('chat:*')
    const chatIds = chatKeys.map(chat => chat.replace('chat:', ''))

    const chatsWithTimestamps = await Promise.all(
      chatIds.map(async chatId => {
        try {
          const chat = await kv.hgetall<Chat>(`chat:${chatId}`)
          if (chat && chat.createdAt) {
            return {
              chatId,
              createdAt: Number(chat.createdAt) || 0,
              user: chat.userId,
              message: chat?.messages[0]?.content || ''
            }
          }
        } catch (error) {
          console.error(`Error fetching chat ${chatId}:`, error)
        }
        return null
      })
    )

    const validChats = chatsWithTimestamps.filter(
      (chat): chat is NonNullable<typeof chat> => chat !== null
    )

    validChats.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
    return validChats
  } catch (error) {
    console.error('Error fetching chat logs:', error)
    return []
  }
}

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
