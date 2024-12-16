import { Button, Card, Flex, Text, Textarea } from '@mantine/core'
import { DateTime } from 'luxon'
import { useState } from 'react'

import { createPost } from '@/actions/post'

import styles from './post.module.scss'

export type PostProps = {
  username: string
  content: string
  date: DateTime
  isCreate?: boolean
  createCallback?: (_isSuccess: boolean) => void
}

const Post = (prop: PostProps) => {
  const { username, content, date, isCreate = false, createCallback } = prop

  const [editableContent, setEditableContent] = useState(content)
  const [editable, setEditable] = useState(true)

  const handlePost = async() => {
    try {
      setEditable(false)
      await createPost(editableContent)
      setEditableContent('')
      setEditable(true)
      createCallback?.(true)
    } catch (e) {
      console.error(e)
      createCallback?.(false)
    }
  }

  return <Card shadow="sm" radius="sm" withBorder>
    <Card.Section px=".5rem">
      <Flex justify="space-between" align="center">
        <Text size="sm">@{username}</Text>
        {isCreate
          ? <Button
            size="xs"
            variant="light"
            onClick={handlePost}
          >Post</Button>
          : <Text size="sm">{date.toRelative()}</Text>
        }
      </Flex>
    </Card.Section>
    <Card.Section px=".5rem" py=".25rem" w="320px" h="180px" style={{ overflow: 'auto' }}>
      {isCreate
        ? <Textarea
          classNames={{
            root: styles['post-textarea'],
            input: styles['post-textarea-input'],
          }}
          value={editableContent}
          onChange={e => setEditableContent(e.currentTarget.value)}
          disabled={!editable}
          autosize
          style={{ overflow: 'auto', border: 'none' }}
        />
        : <Text size="sm">content</Text>
      }
    </Card.Section>
  </Card>
}

export default Post
