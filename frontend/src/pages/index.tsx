import { Outlet } from 'react-router'

import { AppShell, Burger, Center, Flex, Title } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'

const MainLayout = () => {
  const breakpoint = 'sm'
  const isMobile = useMediaQuery(`max-width: ${breakpoint}`)

  const [opened, { toggle }] = useDisclosure(!isMobile)

  return <AppShell
    header={{ height: 60 }}
    navbar={{
      width: 300,
      breakpoint,
      collapsed: { desktop: !opened, mobile: !opened },
    }}
    padding="md"
  >
    <AppShell.Header>
      <Flex align="center" justify="space-between" h="100%">
        <Center flex="0 0 auto" pl="md">
          <Burger
            opened={opened}
            onClick={toggle}
            size={breakpoint}
          />
        </Center>
        <Center flex="1 0 0">
          <Title order={1}>Cardio</Title>
        </Center>
      </Flex>
    </AppShell.Header>

    <AppShell.Navbar p="md"></AppShell.Navbar>

    <AppShell.Main w="100%"><Outlet /></AppShell.Main>
  </AppShell>
}

export default MainLayout
