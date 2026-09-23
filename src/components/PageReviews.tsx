import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Quote } from 'lucide-react';
import { Reveal } from './Reveal';
import { REVIEWS } from '../data/reviews';

/**
 * Viser de ægte anmeldelser der passer til den aktuelle side.
 *
 * Filtreres på `event`-feltet i src/data/reviews.ts. Er der ingen træf,
 * vises sektionen slet ikke — vi opfinder aldrig en anmeldelse for at
 * fylde en side ud.
 */
export const PageReviews = ({
  match,
  title = 'Hvad kunderne siger',
}: {
  /** Regex mod review.event, fx /bryllup/i */
  match: RegExp;
  title?: string;
}) => {
  const items = REVIEWS.filter((r) => match.test(r.event));
  if (items.length === 0) return null;

  return (
    <section className="page-reviews" aria-labelledby="page-reviews-title">
      <Reveal>
        <div className="section-label">Anmeldelser</div>
        <h2 id="page-reviews-title" className="subsection-title">
          {title}
        </h2>
      </Reveal>

      <div className="reviews-grid">
        {items.map((r, i) => (
          <Reveal key={r.name} delay={Math.min(i * 0.08, 0.24)}>
            <div className="review-card">
              <Quote className="review-card-icon" size={28} aria-hidden="true" />
              <div className="review-card-stars" role="img" aria-label={`${r.rating} ud af 5 stjerner`}>
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    size={16}
                    fill={s < r.rating ? 'currentColor' : 'none'}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="review-card-text">{r.text}</p>
              <div className="review-card-footer">
                <div>
                  <div className="review-card-name">{r.name}</div>
                  <div className="review-card-event">{r.event}</div>
                </div>
                {r.date && <div className="review-card-date">{r.date}</div>}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <p className="prose" style={{ marginTop: '2rem' }}>
        Anmeldelserne er modtaget direkte fra kunderne efter deres event.{' '}
        <Link to="/anmeldelser">Læs alle anmeldelser</Link>
      </p>
    </section>
  );
};
