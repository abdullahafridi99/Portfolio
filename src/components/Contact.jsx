import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from "./Icons";
import confetti from "canvas-confetti";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle, submitting, success

  // Client-side validations
  const validateField = (name, value) => {
    let error = "";
    if (name === "name") {
      if (!value.trim()) error = "Name is required.";
      else if (value.trim().length < 2) error = "Name must be at least 2 characters.";
    }
    
    if (name === "email") {
      if (!value) error = "Email is required.";
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = "Please enter a valid email address.";
      }
    }

    if (name === "subject") {
      if (!value.trim()) error = "Subject is required.";
    }

    if (name === "message") {
      if (!value.trim()) error = "Message cannot be empty.";
      else if (value.trim().length < 10) error = "Message must be at least 10 characters.";
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields touched
    const allTouched = { name: true, email: true, subject: true, message: true };
    setTouched(allTouched);

    // Validate all fields
    const formErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) formErrors[key] = error;
    });

    setErrors(formErrors);

    // If there are errors, stop
    if (Object.keys(formErrors).length > 0) return;

    // Real full-stack form submission
    setStatus("submitting");
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit form.");
      }

      setStatus("success");
      
      // Delighted success micro-interaction: Pop confetti!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#00e5ff", "#10b981", "#4f46e5"]
      });

      // Clear form
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTouched({});
      
      // Reset back to idle status after a delay
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
      
    } catch (err) {
      console.error("Form submit error:", err);
      alert(err.message || "Failed to submit message. Please try again.");
      setStatus("idle");
    }
  };

  const getInputClass = (name) => {
    const defaultStyles = "w-full px-5 py-4 rounded-xl bg-dark-900 border border-dark-700/60 text-slate-100 placeholder-dark-500 font-light outline-none transition-all duration-300";
    
    if (!touched[name]) {
      return `${defaultStyles} focus:border-accent-cyan/80 focus:ring-2 focus:ring-accent-cyan/10`;
    }
    
    if (errors[name]) {
      return `${defaultStyles} border-red-500/80 focus:border-red-500 focus:ring-2 focus:ring-red-500/10`;
    }
    
    return `${defaultStyles} border-accent-emerald/80 focus:border-accent-emerald focus:ring-2 focus:ring-accent-emerald/10`;
  };

  return (
    <section id="contact" className="py-24 bg-dark-900 relative overflow-hidden">
      {/* Lights decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 blur-spotlight-cyan pointer-events-none" />
      <div className="absolute bottom-0 right-0 blur-spotlight-emerald pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="mb-16 md:mb-20 text-center flex flex-col items-center">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-[1px] w-8 bg-accent-cyan" />
            <span className="text-xs font-semibold uppercase tracking-wider text-accent-cyan">Get in Touch</span>
            <span className="h-[1px] w-8 bg-accent-cyan" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            Let's Build Something <span className="text-glow-cyan">Exceptional</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Information Cards */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h3 className="text-xl font-bold text-slate-100 mb-2">Contact Info</h3>
            <p className="text-dark-500 text-sm leading-relaxed font-light mb-4">
              Have a project, job opportunity, or just want to say hi? Feel free to reach out. I will get back to you within 24 hours.
            </p>

            {/* Email Card */}
            <div className="flex items-center gap-5 p-5 rounded-2xl glass-panel border-white/5 hover:border-accent-cyan/20 transition-all duration-300">
              <div className="p-3.5 rounded-xl bg-accent-cyan/10 text-accent-cyan">
                <Mail size={22} />
              </div>
              <div>
                <span className="text-xs text-dark-500 block font-medium uppercase tracking-wider">Email Me</span>
                <a
                  href="mailto:abdullahafridi12390@gmail.com"
                  className="text-sm md:text-base font-semibold text-slate-100 hover:text-accent-cyan transition-colors"
                  id="contact-email"
                >
                  abdullahafridi12390@gmail.com
                </a>
              </div>
            </div>

            {/* Phone Card */}
            <div className="flex items-center gap-5 p-5 rounded-2xl glass-panel border-white/5 hover:border-accent-cyan/20 transition-all duration-300">
              <div className="p-3.5 rounded-xl bg-accent-emerald/10 text-accent-emerald">
                <Phone size={22} />
              </div>
              <div>
                <span className="text-xs text-dark-500 block font-medium uppercase tracking-wider">Call Me</span>
                <a
                  href="tel:03285499805"
                  className="text-sm md:text-base font-semibold text-slate-100 hover:text-accent-emerald transition-colors"
                  id="contact-phone"
                >
                  03285499805
                </a>
              </div>
            </div>

            {/* Location Card */}
            <div className="flex items-center gap-5 p-5 rounded-2xl glass-panel border-white/5 hover:border-accent-cyan/20 transition-all duration-300">
              <div className="p-3.5 rounded-xl bg-accent-indigo/10 text-accent-indigo">
                <MapPin size={22} />
              </div>
              <div>
                <span className="text-xs text-dark-500 block font-medium uppercase tracking-wider">Location</span>
                <span className="text-sm md:text-base font-semibold text-slate-100">
                  Pakistan
                </span>
              </div>
            </div>
          </div>

          {/* Contact Form Panel */}
          <div className="lg:col-span-3">
            <div className="glass-panel p-8 md:p-10 rounded-3xl border-white/5">
              <form onSubmit={handleSubmit} className="space-y-6" id="contact-form">
                
                {/* Name field */}
                <div className="relative">
                  <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getInputClass("name")}
                    />
                    {touched.name && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
                        {errors.name ? (
                          <AlertCircle size={20} className="text-red-500" />
                        ) : (
                          <CheckCircle size={20} className="text-accent-emerald" />
                        )}
                      </div>
                    )}
                  </div>
                  {touched.name && errors.name && (
                    <span className="text-xs text-red-500 mt-1 block font-medium">{errors.name}</span>
                  )}
                </div>

                {/* Email field */}
                <div className="relative">
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getInputClass("email")}
                    />
                    {touched.email && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
                        {errors.email ? (
                          <AlertCircle size={20} className="text-red-500" />
                        ) : (
                          <CheckCircle size={20} className="text-accent-emerald" />
                        )}
                      </div>
                    )}
                  </div>
                  {touched.email && errors.email && (
                    <span className="text-xs text-red-500 mt-1 block font-medium">{errors.email}</span>
                  )}
                </div>

                {/* Subject field */}
                <div className="relative">
                  <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Subject
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="Project details, inquiry..."
                      value={formData.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getInputClass("subject")}
                    />
                    {touched.subject && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
                        {errors.subject ? (
                          <AlertCircle size={20} className="text-red-500" />
                        ) : (
                          <CheckCircle size={20} className="text-accent-emerald" />
                        )}
                      </div>
                    )}
                  </div>
                  {touched.subject && errors.subject && (
                    <span className="text-xs text-red-500 mt-1 block font-medium">{errors.subject}</span>
                  )}
                </div>

                {/* Message field */}
                <div className="relative">
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Message
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${getInputClass("message")} resize-none`}
                    />
                    {touched.message && (
                      <div className="absolute right-4 top-6 pointer-events-none flex items-center">
                        {errors.message ? (
                          <AlertCircle size={20} className="text-red-500" />
                        ) : (
                          <CheckCircle size={20} className="text-accent-emerald" />
                        )}
                      </div>
                    )}
                  </div>
                  {touched.message && errors.message && (
                    <span className="text-xs text-red-500 mt-1 block font-medium">{errors.message}</span>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === "submitting" || status === "success"}
                  className={`w-full py-4 px-6 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2.5 outline-none focus:ring-2 ${
                    status === "success"
                      ? "bg-accent-emerald text-dark-950 shadow-emerald-glow"
                      : "bg-gradient-to-r from-accent-cyan to-accent-indigo text-dark-950 shadow-cyan-glow hover:scale-[1.01] hover:shadow-lg focus:ring-accent-cyan/50"
                  }`}
                  id="contact-submit"
                >
                  {status === "idle" && (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                  {status === "submitting" && (
                    <>
                      Sending Message...
                      <Loader2 size={18} />
                    </>
                  )}
                  {status === "success" && (
                    <>
                      Message Sent Successfully!
                      <CheckCircle size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
