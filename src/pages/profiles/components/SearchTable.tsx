import React, { useState } from 'react';
import { Button, Flex, TextInput, Avatar, UnstyledButton, Group, Text, createStyles, Stack, ScrollArea, Paper, rem } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconSearch, IconMan, IconPhoneCall, IconAdjustments } from '@tabler/icons-react';
import { useStoreProfiles } from '../../../store/profilesStore';

const useStyles = createStyles((theme) => ({
  user: {
    display: 'block',
    width: '100%',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
  },

  item : {
    marginTop: 5,
    padding: 5,
    borderRadius: 5,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    border: `0.1px solid rgb(42, 42, 42, 1)`,

    '&:hover': {
      backgroundColor: '#17181b',
    },
  },

  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

const SearchTable = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query, 200);
  const { profiles, setProfile } = useStoreProfiles();
  const { classes } = useStyles();

  return (
    <Paper p='sm' withBorder style={{width: 365}}>
      <Flex gap="xs" justify="flex-start" align="center" direction="row" wrap="wrap" style={{marginBottom: 10}}>
        <TextInput
          placeholder="Search profiles..."
          icon={<IconSearch size={16} />}
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          w={240}
        />
        <Button variant="default" leftIcon={<IconAdjustments size={rem(14)} />}>
          Filter
        </Button>
      </Flex>
      <ScrollArea style={{ height: 820 }}>
        {profiles.map((profile) => (
          <Stack spacing="xs">
            <UnstyledButton className={classes.user} onClick={() => setProfile(profile)}>
              <Group className={classes.item}>
                <Avatar src={profile.image} size={62} radius={4} />
                <div>
                  <Text fz="sm" fw={500} className={classes.name}>
                   ({profile.citizenid}) {profile.firstname} {profile.lastname}
                  </Text>

                  <Group spacing={10} mt={3}>
                    <IconMan stroke={1.5} size="1rem" className={classes.icon} />
                    <Text fz="xs" c="dimmed">
                      {profile.gender}
                    </Text>
                  </Group>

                  <Group spacing={10} mt={5}>
                    <IconPhoneCall stroke={1.5} size="1rem" className={classes.icon} />
                    <Text fz="xs" c="dimmed">
                      {profile.phone}
                    </Text>
                  </Group>
                </div>
              </Group>
            </UnstyledButton>
          </Stack>
        ))}
      </ScrollArea>
    </Paper>
  )
}

export default SearchTable