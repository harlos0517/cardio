import { Card, Flex, Text } from '@mantine/core'
import { DateTime } from 'luxon'

export type PostProps = {
  username: string
  content: string
  date: DateTime
}

const Post = (prop: PostProps) => {
  const { username, content, date } = prop

  return <Card shadow="sm" radius="sm" withBorder>
    <Card.Section px=".5rem">
      <Flex justify="space-between" align="center">
        <Text size="md">@{username}</Text>
        <Text size="xs">{date.toRelative()}</Text>
      </Flex>
    </Card.Section>
    <Card.Section px=".5rem" py=".25rem" w="320px" h="180px" style={{ overflow: 'auto' }}>
      {content}
    </Card.Section>
  </Card>
}

export default Post
