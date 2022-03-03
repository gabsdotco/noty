import type { NextPage } from 'next';
import { cloneDeep } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

import { Page } from '@/types';

import { Flex, Text } from '@/components/ui';

import { useLocalStorage } from '@/hooks/utils';

const Pages: NextPage = () => {
  const router = useRouter();

  const [pages, setPages] = useLocalStorage<Page[]>('noty:pages', []);

  const handlePageInsert = () => {
    const clonedPages = cloneDeep(pages);
    const newPage: Page = {
      id: uuidv4(),
      title: '',
      blocks: [],
    };

    clonedPages.push(newPage);
    setPages(clonedPages);

    router.push({
      pathname: '/pages/[pageId]',
      query: {
        pageId: newPage.id,
      },
    });
  };

  return (
    <Flex
      css={{
        width: '100%',
        height: '100%',
        background: '$gray900',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'auto',
        backgroundImage: 'radial-gradient(#131313 1px, transparent 0)',
        backgroundSize: '8px 8px',
        backgroundPosition: '-19px -19px',
        userSelect: 'none',
      }}
    >
      <Flex
        css={{
          width: '100%',
          height: '100%',
          maxWidth: '720px',
          padding: '$md',
          flexDirection: 'column',
          gridGap: '$md',
          overflow: 'auto',

          '@md': {
            padding: '$lg $md',
          },

          '&::-webkit-scrollbar': {
            width: '0px',
            background: '$transparent',
          },
        }}
      >
        <Flex css={{ flexDirection: 'column' }}>
          <Text weight="bold" size="lg" css={{ color: '$gray500' }}>
            Your pages
          </Text>
          <Text
            size="sm"
            css={{
              color: '$gray600',
            }}
          >
            Select or{' '}
            <Text
              size="sm"
              css={{
                color: '$gray500',
                cursor: 'pointer',
                textDecoration: 'underline',
                transitionDuration: '0.2s',

                '&:hover': {
                  color: '$gray400',
                },
              }}
              onClick={() => handlePageInsert()}
            >
              create a new page +
            </Text>
          </Text>
        </Flex>
        <Flex
          css={{
            width: '100%',
            height: '100%',
            gridGap: '$sm',
            flexDirection: 'column',
          }}
        >
          {pages?.length > 0 ? (
            pages.map((page, index) => (
              <NextLink passHref key={index} href={`/pages/${page.id}`}>
                <Flex
                  css={{
                    color: '$gray600',
                    cursor: 'pointer',
                    border: '1px solid $transparent',
                    gridGap: '$sm',
                    padding: '$sm $md',
                    alignItems: 'center',
                    transitionDuration: '0.2s',

                    '&:hover': {
                      border: '1px solid $gray800',
                    },
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 2.5C3 2.22386 3.22386 2 3.5 2H9.08579C9.21839 2 9.34557 2.05268 9.43934 2.14645L11.8536 4.56066C11.9473 4.65443 12 4.78161 12 4.91421V12.5C12 12.7761 11.7761 13 11.5 13H3.5C3.22386 13 3 12.7761 3 12.5V2.5ZM3.5 1C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V4.91421C13 4.51639 12.842 4.13486 12.5607 3.85355L10.1464 1.43934C9.86514 1.15804 9.48361 1 9.08579 1H3.5ZM4.5 4C4.22386 4 4 4.22386 4 4.5C4 4.77614 4.22386 5 4.5 5H7.5C7.77614 5 8 4.77614 8 4.5C8 4.22386 7.77614 4 7.5 4H4.5ZM4.5 7C4.22386 7 4 7.22386 4 7.5C4 7.77614 4.22386 8 4.5 8H10.5C10.7761 8 11 7.77614 11 7.5C11 7.22386 10.7761 7 10.5 7H4.5ZM4.5 10C4.22386 10 4 10.2239 4 10.5C4 10.7761 4.22386 11 4.5 11H10.5C10.7761 11 11 10.7761 11 10.5C11 10.2239 10.7761 10 10.5 10H4.5Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <Flex
                    css={{
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text css={{ color: '$gray600' }}>
                      {page?.title || 'Untitled'}
                    </Text>
                    <Text css={{ color: '$gray800' }}>
                      {page?.blocks?.length || 0} blocks
                    </Text>
                  </Flex>
                </Flex>
              </NextLink>
            ))
          ) : (
            <Text size="sm" css={{ color: '$gray700' }}>
              You don&apos;t have any pages yet.
            </Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Pages;
