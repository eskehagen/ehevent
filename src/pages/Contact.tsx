import React, { useState, useRef, useEffect } from 'react';
import { Mail, Phone, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/Reveal';
import { useSEO } from '../hooks/useSEO';

const TimeSelect = ({
  id, value, options, onChange
}: {
  id: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, []);

  useEffect(() => {
    if (open && listRef.current) {
      const active = listRef.current.querySelector('[data-active="true"]') as HTMLElement;
      if (active) active.scrollIntoView({ block: 'center' });
    }
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        id={id}
        onClick={() => setOpen(o => !o)}
        className="w-full bg-[#141414] border border-[rgba(232,98,26,0.18)] p-3 text-white text-left flex justify-between items-center focus:outline-none focus:border-[#e8621a] transition-colors"
      >
        <span>{value}</span>
        <ChevronDown
          size={16}
          className="text-[#b0a59d] transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>
      {open && (
        <div
          ref={listRef}
          className="absolute z-50 w-full border border-[rgba(232,98,26,0.35)] overflow-y-auto"
          style={{ background: '#1c1c1c', maxHeight: '200px', top: '100%' }}
        >
          {options.map(t => (
            <button
              key={t}
              type="button"
              data-active={t === value ? 'true' : 'false'}
              onClick={() => { onChange(t); setOpen(false); }}
              className="w-full px-4 py-2 text-left text-sm transition-colors"
              style={{
                color: t === value ? '#e8621a' : '#ffffff',
                background: t === value ? 'rgba(232,98,26,0.12)' : 'transparent',
              }}
              onMouseEnter={e => { if (t !== value) (e.currentTarget as HTMLElement).style.background = 'rgba(232,98,26,0.08)'; }}
              onMouseLeave={e => { if (t !== value) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              {t}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz9_bv9HVIWb-VWaZzFeaMtuC16mgpsAHSvjWEDCP0Yxge2hg7U-FmvkMRNFWB7X8xs/exec';
const SECURITY_TOKEN = 'EH-7291-SECURE-634';

export const Contact = () => {
  useSEO(
    'Book DJ – Kontakt Eske Hagen Events i Aarhus',
    'Kontakt Eske Hagen Events for at booke en professionel DJ til dit bryllup, firmafest eller event i Aarhus og omegn. Få et uforpligtende tilbud i dag.'
  );
  const times = Array.from({ length: 48 }, (_, i) => {
    const h = Math.floor(i / 2).toString().padStart(2, '0');
    const m = i % 2 === 0 ? '00' : '30';
    return `${h}:${m}`;
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    event: '',
    address: '',
    startTime: '22:00',
    endTime: '02:00',
    message: '',
    botField: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSendError('');
    try {
      const payload = { ...formData, token: SECURITY_TOKEN };
      const res = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error ?? 'Ukendt fejl');
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', date: '', event: '', address: '', startTime: '22:00', endTime: '02:00', message: '', botField: '' });
      setTimeout(() => setSubmitted(false), 8000);
    } catch (err: unknown) {
      setSendError(err instanceof Error ? err.message : 'Mailen kunne ikke sendes. Prøv igen eller kontakt mig direkte.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="contact-page pt-32 pb-20">
      <section id="kontakt">
        <div className="contact-inner">
          <Reveal>
            <div className="section-label" style={{ justifyContent: 'center' }}>Kontakt</div>
            <h2 className="contact-title">Lad os skabe<br /><em>noget sammen</em></h2>
            <p className="contact-sub">Send mig en besked, mail eller sms med dine ønsker for dit event. <br /> 
            Sammen tager vi en uforpligtende snak, så vi kan skræddersy den helt rigtige løsning eller tilbud til dig. <br /> 
            Jeg ser frem til at høre fra dig og vender tilbage hurtigst muligt.</p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-16 mt-16 text-left">
            <Reveal delay={0.2}>
              <div className="contact-info-block">
                <h3 className="text-2xl font-head mb-8">Kontaktoplysninger</h3>
                <div className="contact-links flex flex-col gap-6 items-start">
                  <a href="mailto:eskehagen@gmail.com" className="contact-link">
                    <Mail size={20} className="text-[#e8621a]" />
                    eskehagen@gmail.com
                  </a>
                  <a href="tel:+4550935952" className="contact-link">
                    <Phone size={20} className="text-[#e8621a]" />
                    +45 50935952
                  </a>
                </div>

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
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="contact-form-container">
                <h3 className="text-2xl font-head mb-3">Send en besked</h3>
                <p className="text-sm text-muted mb-3">Udfyld de felter du kan på nuværende tidspunkt – det vigtigste er dine kontaktoplysninger samt dato og sted for eventet. Resten finder vi ud af i en personlig samtale.</p>
                <p className="text-sm text-muted mb-8">
                  Ved at sende beskeden accepterer du {' '}
                  <Link to="/privatlivspolitik" className="text-gold hover:underline">privatlivspolitiken</Link>.
                  <br />
                  Læs også mine generelle {' '}
                  <Link to="/handelsbetingelser" className="text-gold hover:underline">handelsbetingelser</Link>{' '}.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div style={{ display: 'none' }} aria-hidden="true">
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.botField}
                      onChange={(e) => setFormData({...formData, botField: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name" className="block text-xs uppercase tracking-wider mb-2 text-muted">Navn</label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      className="w-full bg-bg3 border border-line p-3 text-cream focus:outline-none focus:border-gold transition-colors"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="block text-xs uppercase tracking-wider mb-2 text-muted">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      required
                      className="w-full bg-bg3 border border-line p-3 text-cream focus:outline-none focus:border-gold transition-colors"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone" className="block text-xs uppercase tracking-wider mb-2 text-muted">Telefonnummer</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      className="w-full bg-bg3 border border-line p-3 text-cream focus:outline-none focus:border-gold transition-colors"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-group">
                      <label htmlFor="date" className="block text-xs uppercase tracking-wider mb-2 text-muted">Dato</label>
                      <input 
                        type="date" 
                        id="date" 
                        className="w-full bg-bg3 border border-line p-3 text-cream focus:outline-none focus:border-gold transition-colors"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        onClick={(e) => {
                          const target = e.target as HTMLInputElement;
                          if (target && typeof target.showPicker === 'function') {
                            try {
                              target.showPicker();
                            } catch (err) {
                              console.warn('showPicker failed:', err);
                            }
                          }
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="event" className="block text-xs uppercase tracking-wider mb-2 text-muted">Eventtype</label>
                      <input 
                        type="text" 
                        id="event" 
                        placeholder="Fx Bryllup"
                        className="w-full bg-bg3 border border-line p-3 text-cream focus:outline-none focus:border-gold transition-colors"
                        value={formData.event}
                        onChange={(e) => setFormData({...formData, event: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="address" className="block text-xs uppercase tracking-wider mb-2 text-muted">Adresse for event</label>
                    <input
                      type="text"
                      id="address"
                      className="w-full bg-bg3 border border-line p-3 text-cream focus:outline-none focus:border-gold transition-colors"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-group">
                      <label htmlFor="startTime" className="block text-xs uppercase tracking-wider mb-2 text-muted">Starttidspunkt</label>
                      <TimeSelect
                        id="startTime"
                        value={formData.startTime}
                        options={times}
                        onChange={(val) => setFormData({...formData, startTime: val})}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="endTime" className="block text-xs uppercase tracking-wider mb-2 text-muted">Sluttidspunkt</label>
                      <TimeSelect
                        id="endTime"
                        value={formData.endTime}
                        options={times}
                        onChange={(val) => setFormData({...formData, endTime: val})}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message" className="block text-xs uppercase tracking-wider mb-2 text-muted">Besked</label>
                    <textarea 
                      id="message" 
                      placeholder="Beskriv dine ønsker for dit event..."
                      rows={5}
                      required
                      className="w-full bg-bg3 border border-line p-3 text-cream focus:outline-none focus:border-gold transition-colors resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                  </div>
                  {submitted && (
                    <div className="bg-green-500/10 border border-green-500/50 text-green-500 p-4 text-sm text-center">
                      Tak for din besked! En bekræftelse er sendt til din email, og jeg vender tilbage hurtigst muligt.
                    </div>
                  )}
                  {sendError && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 text-sm text-center">
                      {sendError}
                    </div>
                  )}
                  <button type="submit" className="btn-primary w-full mt-4" disabled={sending}>
                    {sending ? 'Sender...' : 'Send besked'}
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
};
