import { Avatar, Button, Card, Center, Group, Stack, Text } from '@mantine/core'
import { useEffect, useState } from 'react'

import { getUserInfo } from '@/actions/user'

const UserPage = () => {
  const [user, setUser] = useState<null | { id: string, username: string, avatar: string }>(null)

  // Fetch user info when the component mounts
  useEffect(() => {
    getUserInfo().then(setUser).catch(console.error)
  }, [])

  const handleLogin = () => {
    window.location.href = 'http://localhost:6789/auth/discord' // Redirect to Discord login
  }

  const handleLogout = () => {
    fetch('http://localhost:6789/auth/logout', {
      method: 'DELETE',
      credentials: 'include',
    }).then(() => setUser(null))
      .catch(error => {
        console.error('Error logging out:', error)
      })
  }

  return (
    <Center>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        {!user ? (
          <Stack align="center">
            <Text size="lg">You are not logged in.</Text>
            <Button onClick={handleLogin} variant="outline" color="blue">
              Login with Discord
            </Button>
          </Stack>
        ) : (
          <Stack align="center">
            <Group>
              <Avatar
                alt="User avatar"
                radius="xl"
                size="lg"
              />
              <Text size="lg">{user.username}</Text>
            </Group>
            <Button onClick={handleLogout} variant="outline" color="red">
              Logout
            </Button>
          </Stack>
        )}
      </Card>
    </Center>
  )
}

export default UserPage
