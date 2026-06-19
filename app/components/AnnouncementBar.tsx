/**
 * AnnouncementBar — thin brand-gradient promo strip above the header.
 * Design source: docs/03 (global chrome) + docs/02 trust messaging.
 */
export function AnnouncementBar({
  message = 'Free shipping on AU orders over $60 · 30-day happiness guarantee',
}: {
  message?: string;
}) {
  return (
    <div className="bg-gradient-to-r from-brand to-brand-2 text-cream">
      <p className="mx-auto max-w-[1320px] px-[clamp(20px,4vw,60px)] py-2.5 text-center text-[13px] font-extrabold tracking-wide">
        {message}
      </p>
    </div>
  );
}
