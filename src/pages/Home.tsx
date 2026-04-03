import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
import { Reveal } from '../components/Reveal';

export const Home = () => {
  return (
    <div className="home-page">
      {/* ─── HERO ─── */}
      <section id="hero">
        <div className="hero-bg"></div>
        <div className="hero-grid"></div>

        <div className="hero-content">
          <motion.div 
            className="hero-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            DJ &amp; Events
          </motion.div>
          <motion.p 
            className="hero-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.65 }}
          >
            <strong>Den rigtige musik skaber stemningen!</strong> 
            <br />
            Med over 20 års DJ-erfaring skaber jeg altid den helt rigtige stemning, som passer præcis til dit event. 
            <br />
            Professionel løsning med kompromisløs kvalitet i centrum.
          </motion.p>
          <motion.div 
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.85 }}
          >
            <Link to="/kontakt" className="btn-primary">Book mig</Link>
            <Link to="/loesninger" className="btn-ghost">Se løsninger</Link>
          </motion.div>
        </div>

        <div className="hero-visual">
          <svg id="logo-svg" viewBox="0 0 560 480" xmlns="http://www.w3.org/2000/svg">
            <g id="vinyl-disc">
              <circle cx="280" cy="250" r="200" fill="#0f0e0c"/>
              <circle cx="280" cy="250" r="188" fill="none" stroke="#1c1a13" strokeWidth="1.8"/>
              <circle cx="280" cy="250" r="174" fill="none" stroke="#181611" strokeWidth="1.4"/>
              <circle cx="280" cy="250" r="159" fill="none" stroke="#1c1a13" strokeWidth="1.1"/>
              <circle cx="280" cy="250" r="143" fill="none" stroke="#181611" strokeWidth="1"/>
              <circle cx="280" cy="250" r="126" fill="none" stroke="#1c1a13" strokeWidth="0.9"/>
              <circle cx="280" cy="250" r="109" fill="none" stroke="#181611" strokeWidth="0.8"/>
              <circle cx="280" cy="250" r="91"  fill="none" stroke="#1c1a13" strokeWidth="0.7"/>

              <path d="M122 168 A185 185 0 0 1 148 113" fill="none" stroke="#E8621A" strokeWidth="5" strokeLinecap="round"/>
              <path d="M138 176 A169 169 0 0 1 162 124" fill="none" stroke="#E8621A" strokeWidth="3.4" strokeLinecap="round" opacity="0.65"/>
              <path d="M153 184 A154 154 0 0 1 175 135" fill="none" stroke="#E8621A" strokeWidth="2.1" strokeLinecap="round" opacity="0.4"/>

              <path d="M420 336 A185 185 0 0 1 398 388" fill="none" stroke="#d0c8b8" strokeWidth="4.4" strokeLinecap="round"/>
              <path d="M406 326 A169 169 0 0 1 386 375" fill="none" stroke="#d0c8b8" strokeWidth="3"   strokeLinecap="round" opacity="0.6"/>
              <path d="M392 316 A154 154 0 0 1 373 362" fill="none" stroke="#d0c8b8" strokeWidth="1.8" strokeLinecap="round" opacity="0.38"/>

              <circle cx="280" cy="250" r="72" fill="#E8621A"/>
              <circle cx="280" cy="250" r="59" fill="none" stroke="#be5010" strokeWidth="1.8" opacity="0.45"/>
              <circle cx="280" cy="250" r="44" fill="none" stroke="#be5010" strokeWidth="1.2" opacity="0.3"/>
              <circle cx="280" cy="250" r="10" fill="#0a0907"/>
            </g>

            <g id="hp-group">
              <path d="M68 250 C68 -20 492 -20 492 250" fill="none" stroke="#0c0b09" strokeWidth="40" strokeLinecap="round"/>
              <path d="M70 250 C70 2 488 2 488 250" fill="none" stroke="#1a1712" strokeWidth="27" strokeLinecap="round"/>
              <path d="M72 250 C72 20 484 20 484 250" fill="none" stroke="#252019" strokeWidth="13" strokeLinecap="round"/>

              <rect x="34" y="208" width="58" height="88" rx="24" fill="#0e0d0b" stroke="#272118" strokeWidth="1.8"/>
              <rect x="44" y="218" width="38" height="68" rx="16" fill="#17140f"/>
              <circle cx="63" cy="252" r="13" fill="#0d0c0a"/>
              <circle cx="63" cy="252" r="6"  fill="#131109"/>
              <rect x="36" y="210" width="54" height="84" rx="22" fill="none" stroke="#30281e" strokeWidth="1" opacity="0.7"/>

              <rect x="468" y="208" width="58" height="88" rx="24" fill="#0e0d0b" stroke="#272118" strokeWidth="1.8"/>
              <rect x="478" y="218" width="38" height="68" rx="16" fill="#17140f"/>
              <circle cx="497" cy="252" r="13" fill="#0d0c0a"/>
              <circle cx="497" cy="252" r="6"  fill="#131109"/>
              <rect x="470" y="210" width="54" height="84" rx="22" fill="none" stroke="#30281e" strokeWidth="1" opacity="0.7"/>
            </g>
          </svg>
          <motion.h1 
            className="hero-name text-center mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Eske Hagen<br /><em>Events</em>
          </motion.h1>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about">
        <div className="divider"></div>
        <div className="about-grid">
          <Reveal>
            <div className="section-label">Om mig</div>
            <h2 className="section-title">Musikken har<br />altid <em>drevet mig</em></h2>
            <div className="about-text">
              <p>Jeg hedder Eske Hagen Sinding. Jeg er 35 år og bor i Aarhus sammen med min familie. Musikken har altid været et centralt omdrejningspunkt i mit liv.</p>
              <p>Min erfaring spænder bredt fra årene med mobildiskotek til fast DJ på etablerede spillesteder i Aarhus og Randers. I dag fokuserer jeg udelukkende på events, som jeg planlægger i samarbejde med dig.</p>
              <p>Du får altid en professionel løsning, hvor kompromisløs kvalitet er i centrum. Overlad trygt ansvaret til mig og nyd en uforglemmelig tid med dine gæster.</p>
              <p>Jeg sikrer, at generationer mødes på dansegulvet og at musikken binder selskabet sammen. For at skabe den helt rigtige stemning medbringer jeg altid et kvalitetsbevidst og stilrent setup af lyd og lys.</p>
              <p>Det bedste resultat opstår i tæt dialog, og derfor tager jeg altid et personligt møde eller en snak med dig om dine forventninger, så vi sammen kan skræddersy dit event.</p>
            </div>
            <div className="about-stat-row">
              <div className="about-stat">
                <div className="about-stat-num">22+</div>
                <div className="about-stat-label">År som DJ</div>
              </div>
              <div className="about-stat">
                <div className="about-stat-num">10+</div>
                <div className="about-stat-label">Årlige events</div>
              </div>
              <div className="about-stat">
                <div className="about-stat-num">∞</div>
                <div className="about-stat-label">Glade gæster</div>
              </div>
            </div>
          </Reveal>

          <div className="about-right">
            <Reveal delay={0.2}>
              <blockquote className="about-quote">"Den rigtige musik skaber stemningen — og den rigtige stemning skaber minder."</blockquote>
            </Reveal>
            <Reveal delay={0.4}>
              <blockquote className="about-quote">"Special effekter - sætter prikken over i'et."</blockquote>
            </Reveal>
            <Reveal delay={0.6}>
              <div className="mt-10" style={{
                border: '2px solid #e8621a',
                boxShadow: '6px 6px 0px #e8621a',
                display: 'inline-block',
                lineHeight: 0,
              }}>
                <img
                  src="/images/eske1.jpg"
                  alt="Eske Hagen"
                  style={{ display: 'block', width: '100%', maxWidth: '360px' }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── UDSTYR ─── */}
      <section id="udstyr">
        <Reveal>
          <div className="section-label">Teknik &amp; Udstyr</div>
          <h2 className="section-title">Mere end<br />bare <em>musik</em></h2>
          <p className="contact-sub" style={{ textAlign: 'left', maxWidth: '700px', marginBottom: '3rem' }}>
            Jeg tilbyder mere end blot musik. Skal dit event være ekstraordinært tilbyder jeg alle former for special effekter samt større lysopsætninger.
            <br />
            <Link to="/loesninger" className="text-[#e8621a] hover:underline">Se alle mulighederne her.</Link>
          </p>
        </Reveal>

        <div className="gear-grid">
          {[
            { num: "01", name: "Konfetti", desc: "Konfetti der løfter festens højdepunkter. Perfekt til brudepar-indgangen, den store fødselsdagssang eller ekstra energi på dansegulvet." },
            { num: "02", name: "Special Effekter", desc: "Røg, CO2, gnister, bobler, sne og skum. Jeg tilbyder alle former for special effekter til dit event. Jeg har altid en løsning til dine ønsker." },
            { num: "03", name: "Lysopsætning", desc: "Professionel opsætning og afvikling af eventlys. Fra diskrete ambiente lys til fuldt showlys med bevægende effekter og farver der passer til stilen." },
          ].map((item, i) => (
            <div key={i}>
              <Reveal delay={i * 0.1}>
                <Link to="/loesninger" className="gear-item-link no-underline">
                  <div className="gear-item">
                    <div className="gear-num">{item.num}</div>
                    <div className="gear-name">{item.name}</div>
                    <p className="gear-desc">{item.desc}</p>
                  </div>
                </Link>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="kontakt">
        <div className="contact-inner">
          <Reveal>
            <div className="section-label" style={{ justifyContent: 'center' }}>Kontakt</div>
            <h2 className="contact-title">Lad os skabe<br /><em>noget sammen</em></h2>
            <p className="contact-sub">Send mig en besked, mail eller sms med dine ønsker for dit event. 
            <br />
            Sammen tager vi en uforpligtende snak, så vi kan skræddersy den helt rigtige løsning eller tilbud til dig.
            <br />
            Jeg ser frem til at høre fra dig og vender tilbage hurtigst muligt.</p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="contact-links items-center">
              <a href="mailto:eskehagen@gmail.com" className="contact-link">
                <Mail size={18} className="text-[#e8621a]" />
                eskehagen@gmail.com
              </a>
              <a href="tel:+4550935952" className="contact-link">
                <Phone size={18} className="text-[#e8621a]" />
                +45 50935952
              </a>
            </div>

            <Link to="/kontakt" className="btn-primary">Send en besked</Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
