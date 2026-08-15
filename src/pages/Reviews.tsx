import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { useSEO } from '../hooks/useSEO';
import { REVIEWS } from '../data/reviews';

const GOOGLE_REVIEW_URL = 'https://share.google/jyONMkaHh6qCOPWP2';

const Stars = ({ rating }: { rating: number }) => (
  <div className="review-card-stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={16} fill={i < rating ? 'currentColor' : 'none'} strokeWidth={1.5} />
    ))}
  </div>
);

export const Reviews = () => {
  useSEO(
    'Anmeldelser – Eske Hagen Events | DJ Aarhus',
    'Læs hvad tidligere kunder siger om Eske Hagen Events. Anmeldelser fra bryllupper, firmafester og private events i Aarhus og omegn.'
  );

  return (
    <div className="reviews-page pt-32 pb-20 min-h-screen">
      <section className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <Reveal>
            <div className="section-label justify-center">Anmeldelser</div>
            <h2 className="section-title">Hvad mine kunder<br /><em>siger om mig</em></h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-muted max-w-2xl mx-auto mt-6">
              Herunder kan du læse anmeldelser fra tidligere kunder om deres oplevelse med mig som DJ til deres event.
            </p>
          </Reveal>
        </div>

        <div className="reviews-grid">
          {REVIEWS.map((review, i) => (
            <Reveal key={i} delay={(i % 3) * 0.1}>
              <div className="review-card">
                <Quote className="review-card-icon" size={28} />
                <Stars rating={review.rating} />
                <p className="review-card-text">{review.text}</p>
                <div className="review-card-footer">
                  <div>
                    <div className="review-card-name">{review.name}</div>
                    <div className="review-card-event">{review.event}</div>
                  </div>
                  {review.date && <div className="review-card-date">{review.date}</div>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="reviews-cta-block">
            <div className="section-label" style={{ justifyContent: 'center' }}>Del din oplevelse</div>
            <h3 className="reviews-cta-title">Har du haft mig til dit event?</h3>
            <p className="text-muted max-w-xl mx-auto mt-4 mb-8">
              Jeg vil meget gerne høre om din oplevelse. Din anmeldelse hjælper fremtidige kunder med at finde den rette DJ til deres event.
            </p>
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Skriv en anmeldelse
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
};
