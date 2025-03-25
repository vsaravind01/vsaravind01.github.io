"use client";

import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, Loader2, Mail } from "lucide-react";
import { useRef, useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.subject.trim()) {
      newErrors.subject = "Please enter a subject";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Please enter a message";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Create mailto link with subject and body
      const mailtoLink = `mailto:vsaravind01@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message)}`;
      
      // Simulate a slight delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Open the user's email client
      window.open(mailtoLink, "_blank");
      
      setSubmitStatus("success");
      setFormData({ subject: "", message: "" });
      
      // Reset form status after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } catch (error) {
      console.error('Error processing form:', error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Pattern - matching the portfolio section's style */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/0 via-background to-background/80"></div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
           <span className="text-gradient bg-clip-text text-transparent"> Contact </span> Me
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-background/60 backdrop-blur-xl p-8 md:p-10 rounded-2xl shadow-xl border border-border hover:border-primary/50 transition-colors duration-300"
          >
            {submitStatus === "success" ? (
              <div className="text-center py-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6"
                >
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-2">Message Ready!</h3>
                <p className="text-foreground/80 mb-6">Your email client has been opened with your message. Just hit send!</p>
                <Button 
                  variant="outline" 
                  onClick={() => setSubmitStatus("idle")}
                  className="border-primary/20 hover:bg-primary/5 hover:text-primary"
                >
                  Write Another Message
                </Button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label 
                    htmlFor="subject" 
                    className="block text-foreground font-medium mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-background border ${
                      errors.subject ? "border-red-500" : "border-border"
                    } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                    placeholder="How can I help you?"
                    autoComplete="off"
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                  )}
                </div>
                
                <div>
                  <label 
                    htmlFor="message" 
                    className="block text-foreground font-medium mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={8}
                    className={`w-full px-4 py-3 rounded-lg bg-background border ${
                      errors.message ? "border-red-500" : "border-border"
                    } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                    placeholder="Your message here..."
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                  )}
                </div>
                
                <div className="flex justify-center pt-4">
                  <Button 
                    type="submit"
                    variant="gradient" 
                    size="lg"
                    disabled={isSubmitting || submitStatus === "error"}
                    className="text-white px-10 py-6 rounded-lg transition-all duration-300 relative overflow-hidden group"
                  >
                    <div className="relative z-10 flex items-center gap-2">
                      {isSubmitting ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Mail className="h-5 w-5" />
                      )}
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </div>
                  </Button>
                </div>
                
                {submitStatus === "error" && (
                  <div className="text-center mt-4">
                    <p className="text-red-500">
                      There was an error sending your message. Please try again later.
                    </p>
                  </div>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
} 