
import { useState } from "react";
import { Mail, Github, ArrowRight, MapPin, Phone, Clock, Calendar, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Store message in localStorage for dashboard
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    const newMessage = {
      id: Date.now(),
      ...formData,
      timestamp: new Date().toISOString(),
      status: 'unread'
    };
    messages.push(newMessage);
    localStorage.setItem('messages', JSON.stringify(messages));

    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Message Sent Successfully! 🎉",
      description: "Thank you for reaching out. I'll get back to you within 24 hours!",
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "kyim@dev.com",
      action: "mailto:kyimshia@outlook.com",
      description: "Best way to reach me"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+92 325-7613860",
      action: "tel:+92325-7613860",
      description: "Available for consultations"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "University Of Mangement & Technology, Lahore",
      action: null,
      description: "Open to remote work"
    },
    {
      icon: Clock,
      label: "Response Time",
      value: "Within 24 hours",
      action: null,
      description: "Quick response guaranteed"
    }
  ];

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/kyim120",
      color: "hover:text-gray-300"
    },
  ];

  return (
    <div className="min-h-screen pt-16 relative">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1500673922987-e212871fec22?w=1920&h=1080&fit=crop')"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 to-blue-900/40 backdrop-blur-sm" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Let's Connect & Collaborate
          </h1>
          <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to bring your ideas to life? Let's discuss your project and create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-slate-600 shadow-2xl">
              <div className="flex items-center mb-6">
                <MessageSquare className="h-6 w-6 text-blue-400 mr-3" />
                <h2 className="text-xl lg:text-2xl font-bold text-blue-400">Send Message</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-700/60 border border-slate-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-700/60 border border-slate-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700/60 border border-slate-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                    placeholder="Project Collaboration / Consultation / General Inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-slate-700/60 border border-slate-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project, idea, or how I can help you..."
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending Message...
                    </div>
                  ) : (
                    <>
                      Send Message <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <div className="bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 border border-slate-600 shadow-2xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Mail className="h-5 w-5 text-blue-400 mr-2" />
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="group">
                    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-700/40 transition-all duration-300">
                      <div className="bg-blue-600/20 p-2 rounded-lg group-hover:bg-blue-600/30 transition-all duration-300">
                        <info.icon className="h-4 w-4 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-300">{info.label}</div>
                        {info.action ? (
                          <a 
                            href={info.action}
                            className="text-gray-400 hover:text-white transition-colors duration-300 font-medium text-sm"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <div className="text-gray-400 font-medium text-sm">{info.value}</div>
                        )}
                        <p className="text-xs text-gray-500 mt-1">{info.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 border border-slate-600 shadow-2xl">
              <h3 className="text-lg font-semibold mb-4">Follow Me</h3>
              <div className="space-y-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-3 p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-all duration-300 hover:scale-105 ${social.color} group`}
                  >
                    <social.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-medium">{social.name}</span>
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300 ml-auto" />
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-md rounded-2xl p-6 border border-blue-600/50 shadow-2xl">
              <h3 className="text-lg font-semibold mb-4 text-blue-300">Services Offered</h3>
              <div className="space-y-2">
                {[
                  "Data Science Consulting",
                  "Machine Learning Development", 
                  "Full-Stack Web Development",
                  "Data Visualization & Analytics",
                  "Technical Mentoring"
                ].map((service, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    {service}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
