import React from 'react';
import { Reveal } from './Reveal';
import type { FaqItem } from '../seo/faqs';

/**
 * Synlig FAQ.
 *
 * Bygges af de SAMME objekter som FAQPage-JSON-LD'en (src/seo/faqs.ts).
 * Google afviser FAQ-markup der ikke står ordret på siden, så de to må ikke
 * kunne drive fra hinanden.
 *
 * Bevidst <dl> og ikke <details>: et sammenklappet <details> er stadig i
 * DOM'en, men vi vil have svarene til at stå åbent i den prerenderede HTML,
 * så både læsere og crawlere møder dem uden at skulle klikke.
 */
export const FaqSection = ({
  items,
  title = 'Ofte stillede spørgsmål',
  id = 'faq',
}: {
  items: FaqItem[];
  title?: string;
  id?: string;
}) => (
  <section id={id} className="faq-section" aria-labelledby={`${id}-title`}>
    <Reveal>
      <div className="section-label">Spørgsmål og svar</div>
      <h2 id={`${id}-title`} className="section-title">
        {title}
      </h2>
    </Reveal>

    <dl className="faq-list">
      {items.map((item, i) => (
        <Reveal key={item.q} delay={Math.min(i * 0.06, 0.3)}>
          <div className="faq-item">
            <dt className="faq-q">
              <h3>{item.q}</h3>
            </dt>
            <dd className="faq-a">{item.a}</dd>
          </div>
        </Reveal>
      ))}
    </dl>
  </section>
);
