export default function StarRating({
  rating,
  reviewCount,
}: {
  rating: number;
  reviewCount: number;
}) {
  return (
    <p className="font-sans text-sm text-ink-muted">
      <span className="text-gold">★</span> {rating.toFixed(1)}{" "}
      <span className="text-ink-muted/80">· {reviewCount} reviews</span>
    </p>
  );
}
