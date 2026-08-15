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

export const ReviewsMarquee = () => {
  // Duplicate reviews multiple times to ensure seamless infinite loop
  const duplicatedReviews = Array.from({ length: 4 }, () => REVIEWS).flat();

  return (
    <div className="reviews-marquee-wrap">
      <div className="reviews-track">
        {duplicatedReviews.map((review, i) => (
          <ReviewChip key={i} review={review} />
        ))}
      </div>
    </div>
  );
};
