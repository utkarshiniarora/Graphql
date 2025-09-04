"use client";
import { useEffect, useRef, useCallback } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_POSTS, SUB_NEW_POST } from "./gql";
import PostCard from "./PostCard";
import styles from "@/styles/feed.module.css";

const PAGE_SIZE = 10;

export default function FeedList() {
  const { data, loading, error, fetchMore, subscribeToMore } = useQuery(GET_POSTS, {
    variables: { page: 1, limit: PAGE_SIZE },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: SUB_NEW_POST,
      updateQuery(prev, { subscriptionData }) {
        const newPost = subscriptionData.data?.newPost;
        if (!newPost) return prev;
        return {
          posts: [newPost, ...(prev?.posts ?? [])]
        };
      },
    });
    return () => unsubscribe();
  }, [subscribeToMore]);

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const pageRef = useRef(1);

  const onIntersect = useCallback(async (entries: IntersectionObserverEntry[]) => {
    const first = entries[0];
    if (first.isIntersecting && !loading) {
      pageRef.current += 1;
      await fetchMore({ variables: { page: pageRef.current, limit: PAGE_SIZE } });
    }
  }, [fetchMore, loading]);

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, { rootMargin: "200px" });
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [onIntersect]);

  if (error) return <div role="alert">Failed to load feed.</div>;

  return (
    <section className={styles.feed} aria-live="polite">
      {(data?.posts ?? []).map((p: any) => <PostCard key={p.id} post={p} />)}
      <div ref={sentinelRef} className={styles.sentinel} aria-hidden="true" />
      {loading && <div className={styles.loader} aria-label="Loading more">Loading…</div>}
      {!loading && (data?.posts?.length ?? 0) === 0 && <div className={styles.empty}>No posts yet.</div>}
    </section>
  );
}
