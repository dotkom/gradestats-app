'use client';
import { SearchInput } from 'components/forms/SearchInput';
import { useRouter } from 'next/navigation';
import type { ChangeEvent } from 'react';

export default function FrontPageSearch() {
  const router = useRouter();

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    router.push(`/course/?query=${query}`);
  };

  return (
    <SearchInput
      id="search"
      placeholder="Søk i emner..."
      type="search"
      onChange={handleSearch}
      aria-label="Søk i emner"
    />
  );
}
