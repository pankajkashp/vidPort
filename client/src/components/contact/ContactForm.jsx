// src/components/contact/ContactForm.jsx
import { useState, useRef, useEffect } from 'react';
import { gsap } from '../../animations/gsap.js';
import { SITE_CONFIG } from '../../utils/constants.js';

const FloatingInput = ({ label, type = 'text', name, value, onChange, required }) => (
  <div className="relative group">
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder=" "
      className="peer w-full bg-transparent border-b border-white/10 pb-3 pt-6 text-white font-satoshi text-sm outline-none focus:border-accent transition-colors duration-300 cursor-none"
    />
    <label
      htmlFor={name}
      className="absolute top-6 left-0 text-white/30 text-sm font-satoshi transition-all duration-300 pointer-events-none peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-accent peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-white/40"
    >
      {label}
    </label>
  </div>
);

const FloatingTextarea = ({ label, name, value, onChange, required }) => (
  <div className="relative group">
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      rows={4}
      placeholder=" "
      className="peer w-full bg-transparent border-b border-white/10 pb-3 pt-6 text-white font-satoshi text-sm outline-none focus:border-accent transition-colors duration-300 resize-none cursor-none"
    />
    <label
      htmlFor={name}
      className="absolute top-6 left-0 text-white/30 text-sm font-satoshi transition-all duration-300 pointer-events-none peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:text-accent peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-white/40"
    >
      {label}
    </label>
  </div>
);

const ContactForm = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [form, setForm] = useState({
    name: '',
    email: '',
    project: '',
    budget: '',
    message: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.form-item', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: formRef.current, start: 'top 80%' },
      });
    }, formRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // Replace with your actual API endpoint
      await new Promise((res) => setTimeout(res, 1500)); // Simulate API call
      setStatus('success');
      setForm({ name: '', email: '', project: '', budget: '', message: '' });

      // Success animation
      gsap.from('.success-msg', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      });
    } catch {
      setStatus('error');
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
      <div className="form-item grid grid-cols-1 md:grid-cols-2 gap-8">
        <FloatingInput label="Your Name" name="name" value={form.name} onChange={handleChange} required />
        <FloatingInput label="Email Address" type="email" name="email" value={form.email} onChange={handleChange} required />
      </div>

      <div className="form-item grid grid-cols-1 md:grid-cols-2 gap-8">
        <FloatingInput label="Project Type" name="project" value={form.project} onChange={handleChange} />
        <FloatingInput label="Budget Range" name="budget" value={form.budget} onChange={handleChange} />
      </div>

      <div className="form-item">
        <FloatingTextarea label="Tell me about your project..." name="message" value={form.message} onChange={handleChange} required />
      </div>

      {status === 'success' && (
        <div className="success-msg badge border-success text-success bg-success/5 py-2 px-4 text-sm">
          ✓ Message sent! I'll get back to you within 24 hours.
        </div>
      )}

      {status === 'error' && (
        <div className="badge border-red-500/30 text-red-400 bg-red-500/5 py-2 px-4 text-sm">
          Something went wrong. Please email me directly.
        </div>
      )}

      <div className="form-item pt-2">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-primary w-full md:w-auto px-10 py-4 text-sm justify-center cursor-none disabled:opacity-50"
        >
          {status === 'sending' ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Sending...
            </span>
          ) : (
            <>
              Send Message
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
