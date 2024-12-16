import { Center, Container, Grid } from '@mantine/core'
import { DateTime } from 'luxon'

import Post from '@/components/post'


function Home() {
  const posts = [
    { username: 'test', content: 'This is the first post.', date: DateTime.now() },
    { username: 'test', content: 'This is the second post.', date: DateTime.now() },
    { username: 'test', content: 'This is the third post.', date: DateTime.now() },
    { username: 'test', content: 'This is the fourth post.', date: DateTime.now() },
    { username: 'test', content: 'This is the fifth post.', date: DateTime.now() },
    { username: 'test', content: 'This is the sixth post.', date: DateTime.now() },
    { username: 'test', content: 'This is the seventh post.', date: DateTime.now() },
    { username: 'test', content: 'This is the eighth post.', date: DateTime.now() },
    { username: 'test', content: 'This is the ninth post.', date: DateTime.now() },
    { username: 'test', content: 'This is the tenth post.', date: DateTime.now() },
  ]

  return <Center><Container size="1400px">
    <Grid gutter="md" justify="center">
      <Grid.Col span="content">
        <Post username='username' content='' date={DateTime.now()} isCreate/>
      </Grid.Col>
      {posts.map((post, index) =>
        <Grid.Col key={index} span="content">
          <Post {...post} />
        </Grid.Col>,
      )}
    </Grid>
  </Container></Center>
}

export default Home
