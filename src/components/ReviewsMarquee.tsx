import React from 'react';
import { Star, Quote } from 'lucide-react';
import { REVIEWS } from '../data/reviews';

const Stars = ({ rating }: { rating: number }) => (
  <div className="review-chip-stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={14} fill={i < rating ? 'currentColor' : 'none'} strokeWidth={1.5} />
    ))}
  </div>
);

const ReviewChip = ({ review }: { review: (typeof REVIEWS)[number] }) => (
  <div className="review-chip">
    <Quote className="review-chip-icon" size={20} />
    <Stars rating={review.rating} />
    <p className="review-chip-text">{review.text}</p>
    <div className="review-chip-footer">
      <span className="review-chip-name">{review.name}</span>
      <span className="review-chip-event">{review.event}</span>
    </div>
  </div>
);

interface ReviewsMarqueeProps {
  reverseSecondRow?: boolean;
}

export const ReviewsMarquee = ({ reverseSecondRow = true }: ReviewsMarqueeProps) => {
  const half = Math.ceil(REVIEWS.length / 2);
  const rowA = REVIEWS.length > 1 ? REVIEWS.slice(0, half) : REVIEWS;
  const rowB = REVIEWS.length > 1 ? REVIEWS.slice(half) : REVIEWS;

  return (
    <div className="reviews-marquee-wrap">
      <div className="reviews-track">
        {[...rowA, ...rowA].map((review, i) => (
          <ReviewChip key={i} review={review} />
        ))}
      </div>
      <div className={`reviews-track ${reverseSecondRow ? 'reverse' : ''}`}>
        {[...rowB, ...rowB].map((review, i) => (
          <ReviewChip key={i} review={review} />
        ))}
      </div>
    </div>
  );
};
