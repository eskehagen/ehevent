import React from 'react';
import { Reveal } from './Reveal';
import type { FaqCategory as FaqCategoryData } from '../data/faq';

/**
 * Én kategori på FAQ-siden.
 *
 * Bygges af de SAMME objekter som FAQPage-JSON-LD'en (src/data/faq.ts).
 * Google afviser FAQ-markup, der ikke står ordret på siden, så de to må
 * ikke kunne drive fra hinanden.
 *
 * Bevidst <dl> og ikke sammenklappelige <details>: svarene skal stå åbent
 * i den prerenderede HTML, så både læsere og crawlere møder dem uden klik.
 * Reveal-div'en er selv gruppen i <dl>'en — et ekstra lag <div> udenom
 * <dt>/<dd> er ikke tilladt og blev fanget af Lighthouse.
 */
export const FaqCategory = ({ category }: { category: FaqCategoryData }) => (
  <div id={category.id} className="faq-category">
    <Reveal>
      <h2 className="subsection-title">{category.title}</h2>
    </Reveal>

    <dl className="faq-list">
      {category.items.map((item, i) => (
        <Reveal key={item.q} delay={Math.min(i * 0.06, 0.3)} className="faq-item">
          <dt className="faq-q">
            <h3>{item.q}</h3>
          </dt>
          <dd className="faq-a">{item.a}</dd>
        </Reveal>
      ))}
    </dl>
  </div>
);
