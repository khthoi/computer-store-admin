import { SearchResultsPageInner } from "@/src/components/search/SearchResultsPageInner";
import {
  getSearchResults,
  SEARCH_FILTER_DEFINITIONS,
} from "./_mock_data";

export const dynamic = "force-dynamic";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

/**
 * /search — Search results page.
 *
 * Server component (force-dynamic — always fresh, never ISR cached).
 * Reads `q` from searchParams, looks up mock results, and delegates
 * all interactivity to SearchResultsPageInner.
 */
export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const results = getSearchResults(query);

  return (
    <SearchResultsPageInner
      key={query}
      results={results}
      query={query}
      filterDefinitions={SEARCH_FILTER_DEFINITIONS}
    />
  );
}
