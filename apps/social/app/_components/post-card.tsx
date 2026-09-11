'use client';

import { useState } from 'react';
import { Avatar, Icon } from '@vision/ui';

export interface Post {
  id: string;
  author: {
    name: string;
    university: string;
    verified?: boolean;
  };
  time: string;
  text?: string;
  /** Gradient placeholder türü — 'photo' | 'event' | 'poll' | null */
  media?: 'photo' | 'event' | 'poll' | null;
  eventBadge?: { title: string; date: string; location: string };
  likes: number;
  comments: Array<{ author: string; text: string }>;
  saves?: number;
}

const gradients = {
  photo: 'from-social-500/60 via-social-400/30 to-hub-500/40',
  event: 'from-hub-500/60 via-hub-400/30 to-social-500/40',
  poll:  'from-vision-500/60 via-vision-400/30 to-hub-500/40',
} as const;

export function PostCard({ post }: { post: Post }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [saved, setSaved] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [comments, setComments] = useState(post.comments);
  const [draft, setDraft] = useState('');

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const addComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setComments([...comments, { author: 'Sen', text: draft.trim() }]);
    setDraft('');
  };

  const visibleComments = showAllComments ? comments : comments.slice(0, 2);

  return (
    <article className="rounded-2xl border border-border bg-surface overflow-hidden">
      {/* Header */}
      <header className="flex items-center gap-3 px-4 py-3">
        <Avatar name={post.author.name} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-sm">{post.author.name}</span>
            {post.author.verified && (
              <span className="text-social-500" title="Doğrulandı">
                <Icon.Check width={14} height={14} />
              </span>
            )}
          </div>
          <p className="text-[12px] text-fg-muted truncate">
            {post.author.university} · {post.time}
          </p>
        </div>
        <button className="text-fg-muted p-2 hover:text-fg" aria-label="Daha fazla">···</button>
      </header>

      {/* Text */}
      {post.text && <p className="px-4 pb-3 text-[15px] leading-relaxed whitespace-pre-wrap">{post.text}</p>}

      {/* Media */}
      {post.media && (
        <div className={`aspect-[4/3] w-full bg-gradient-to-br ${gradients[post.media]} relative`}>
          {post.media === 'event' && post.eventBadge && (
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-neutral-950/90 backdrop-blur rounded-xl p-4">
              <p className="text-[11px] uppercase tracking-wider text-social-500 font-semibold">
                Vision Social · Etkinlik
              </p>
              <p className="mt-1 font-semibold">{post.eventBadge.title}</p>
              <p className="text-sm text-fg-muted">
                {post.eventBadge.date} · {post.eventBadge.location}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 px-2 py-1">
        <ActionButton
          onClick={toggleLike}
          active={liked}
          activeColor="text-social-500"
          label="Beğen"
        >
          <HeartIcon filled={liked} />
        </ActionButton>
        <ActionButton label="Yorum yap">
          <Icon.Mail width={20} height={20} />
        </ActionButton>
        <ActionButton label="Paylaş">
          <ShareIcon />
        </ActionButton>
        <div className="ml-auto">
          <ActionButton
            onClick={() => setSaved(!saved)}
            active={saved}
            activeColor="text-fg"
            label="Kaydet"
          >
            <BookmarkIcon filled={saved} />
          </ActionButton>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 pb-1 text-sm">
        <span className="font-semibold">{likes.toLocaleString('tr-TR')} beğeni</span>
      </div>

      {/* Comments */}
      {visibleComments.length > 0 && (
        <div className="px-4 pb-2 space-y-1">
          {!showAllComments && comments.length > 2 && (
            <button
              onClick={() => setShowAllComments(true)}
              className="text-[13px] text-fg-muted"
            >
              {comments.length} yorumun tamamını gör
            </button>
          )}
          {visibleComments.map((c, i) => (
            <p key={i} className="text-sm">
              <span className="font-semibold mr-2">{c.author}</span>
              <span>{c.text}</span>
            </p>
          ))}
        </div>
      )}

      {/* Add comment */}
      <form onSubmit={addComment} className="flex items-center gap-3 px-4 py-3 border-t border-border">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Bir yorum ekle..."
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-fg-muted"
        />
        {draft.trim() && (
          <button type="submit" className="text-sm font-semibold text-social-500 hover:text-social-600">
            Yayınla
          </button>
        )}
      </form>
    </article>
  );
}

function ActionButton({
  children,
  label,
  onClick,
  active,
  activeColor,
}: {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
  activeColor?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`h-11 w-11 grid place-items-center rounded-full hover:bg-subtle transition-colors ${
        active ? activeColor ?? 'text-social-500' : 'text-fg-secondary'
      }`}
    >
      {children}
    </button>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20s-7-4.5-9.3-9A5.5 5.5 0 0 1 12 5a5.5 5.5 0 0 1 9.3 6C19 15.5 12 20 12 20Z" />
    </svg>
  );
}

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12v18l-6-4-6 4V3Z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 2-11 11M22 2l-7 20-4-9-9-4 20-7Z" />
    </svg>
  );
}
