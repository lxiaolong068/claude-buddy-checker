/**
 * useQueryFilters — Sync blog filter state with URL query parameters
 *
 * Reads initial state from URL on mount, and pushes state changes back
 * to the URL via history.replaceState (no full navigation).
 * Supports browser back/forward via popstate listener.
 *
 * Query params:
 *   ?q=<search>&sort=<newest|oldest|titleAZ|titleZA>&type=<guides|deep-dives|lore>&tag=<tagname>
 */

import { useState, useEffect, useCallback, useRef } from "react";
import type { DiscussionCategory } from "@/lib/blog-data";

type SortMode = "newest" | "oldest" | "titleAZ" | "titleZA";

const VALID_SORTS: SortMode[] = ["newest", "oldest", "titleAZ", "titleZA"];
const VALID_CATEGORIES: DiscussionCategory[] = ["guides", "deep-dives", "lore"];

function parseParams(search: string) {
  const params = new URLSearchParams(search);
  const q = params.get("q") || "";
  const sortRaw = params.get("sort");
  const sort: SortMode = VALID_SORTS.includes(sortRaw as SortMode)
    ? (sortRaw as SortMode)
    : "newest";
  const typeRaw = params.get("type");
  const category: DiscussionCategory | null = VALID_CATEGORIES.includes(
    typeRaw as DiscussionCategory
  )
    ? (typeRaw as DiscussionCategory)
    : null;
  const tag = params.get("tag") || null;
  return { q, sort, category, tag };
}

function buildSearch(state: {
  q: string;
  sort: SortMode;
  category: DiscussionCategory | null;
  tag: string | null;
}): string {
  const params = new URLSearchParams();
  if (state.q) params.set("q", state.q);
  if (state.sort !== "newest") params.set("sort", state.sort);
  if (state.category) params.set("type", state.category);
  if (state.tag) params.set("tag", state.tag);
  const str = params.toString();
  return str ? `?${str}` : "";
}

export function useQueryFilters(allTags: string[]) {
  // Parse initial state from URL
  const initial = parseParams(window.location.search);

  const [searchQuery, setSearchQuery] = useState(initial.q);
  const [debouncedQuery, setDebouncedQuery] = useState(initial.q);
  const [sortMode, setSortMode] = useState<SortMode>(initial.sort);
  const [activeCategory, setActiveCategory] = useState<DiscussionCategory | null>(initial.category);
  const [activeTag, setActiveTag] = useState<string | null>(() => {
    if (!initial.tag) return null;
    // Case-insensitive tag matching (URL may have uppercase tags from UI display)
    const normalizedTag = initial.tag.toLowerCase();
    return allTags.find((t) => t.toLowerCase() === normalizedTag) || null;
  });

  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Track whether we're responding to a popstate event to avoid pushing state back
  const isPopstateRef = useRef(false);

  // Debounced search
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      setDebouncedQuery(value);
    }, 200);
  }, []);

  // Cleanup debounce timer
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, []);

  // Sync state → URL (replaceState to avoid flooding history)
  // Use pushState only for meaningful filter changes
  const prevSearchRef = useRef(window.location.search);

  useEffect(() => {
    if (isPopstateRef.current) {
      isPopstateRef.current = false;
      return;
    }
    const newSearch = buildSearch({
      q: debouncedQuery,
      sort: sortMode,
      category: activeCategory,
      tag: activeTag,
    });
    const currentSearch = window.location.search || "";
    if (newSearch !== currentSearch) {
      const newUrl = window.location.pathname + newSearch;
      // Use pushState for filter changes so back/forward works
      // Use replaceState for the initial render or same-state updates
      if (prevSearchRef.current === currentSearch && currentSearch === "") {
        // First filter change from clean state → push
        window.history.pushState(null, "", newUrl);
      } else {
        // Subsequent changes → replace to avoid too many history entries
        // But if the change is "significant" (different from prev), push
        const prevParams = parseParams(prevSearchRef.current);
        const newParams = parseParams(newSearch);
        const isSignificant =
          prevParams.category !== newParams.category ||
          prevParams.tag !== newParams.tag ||
          prevParams.sort !== newParams.sort ||
          (prevParams.q === "" && newParams.q !== "") ||
          (prevParams.q !== "" && newParams.q === "");

        if (isSignificant) {
          window.history.pushState(null, "", newUrl);
        } else {
          window.history.replaceState(null, "", newUrl);
        }
      }
      prevSearchRef.current = newSearch;
    }
  }, [debouncedQuery, sortMode, activeCategory, activeTag]);

  // Listen for popstate (browser back/forward)
  useEffect(() => {
    const handlePopstate = () => {
      isPopstateRef.current = true;
      const parsed = parseParams(window.location.search);
      setSearchQuery(parsed.q);
      setDebouncedQuery(parsed.q);
      setSortMode(parsed.sort);
      setActiveCategory(parsed.category);
      const normalizedTag = parsed.tag?.toLowerCase();
      setActiveTag(
        normalizedTag
          ? allTags.find((t) => t.toLowerCase() === normalizedTag) || null
          : null
      );
      prevSearchRef.current = window.location.search || "";
    };
    window.addEventListener("popstate", handlePopstate);
    return () => window.removeEventListener("popstate", handlePopstate);
  }, [allTags]);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setDebouncedQuery("");
  }, []);

  const clearAll = useCallback(() => {
    setSearchQuery("");
    setDebouncedQuery("");
    setActiveTag(null);
    setActiveCategory(null);
    setSortMode("newest");
  }, []);

  return {
    searchQuery,
    debouncedQuery,
    sortMode,
    activeCategory,
    activeTag,
    handleSearchChange,
    setSortMode,
    setActiveCategory,
    setActiveTag,
    clearSearch,
    clearAll,
    debounceTimerRef,
  };
}
