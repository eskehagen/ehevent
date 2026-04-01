import React, { useState } from 'react';
import { Mail, Phone } from 'lucide-react';
import { Reveal } from '../components/Reveal';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    event: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to a server
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', date: '', event: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
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
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="contact-form-container">
                <h3 className="text-2xl font-head mb-8">Send en besked</h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                        placeholder="F.eks. Bryllup"
                        className="w-full bg-bg3 border border-line p-3 text-cream focus:outline-none focus:border-gold transition-colors"
                        value={formData.event}
                        onChange={(e) => setFormData({...formData, event: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message" className="block text-xs uppercase tracking-wider mb-2 text-muted">Besked</label>
                    <textarea 
                      id="message" 
                      rows={5}
                      required
                      className="w-full bg-bg3 border border-line p-3 text-cream focus:outline-none focus:border-gold transition-colors resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                  </div>
                  {submitted && (
                    <div className="bg-green-500/10 border border-green-500/50 text-green-500 p-4 text-sm text-center">
                      Tak for din besked! Jeg vender tilbage hurtigst muligt.
                    </div>
                  )}
                  <button type="submit" className="btn-primary w-full mt-4">Send besked</button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
};
