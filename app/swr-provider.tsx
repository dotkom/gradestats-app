'use client';
import { requests } from 'common/requests';
import type { FC } from 'react';
import React from 'react';
import { SWRConfig } from 'swr';

export const SWRProvider: FC<React.PropsWithChildren> = ({ children }) => {
  return <SWRConfig value={{ fetcher: requests.get }}>{children}</SWRConfig>;
};
