import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, Send, Facebook, Twitter, Instagram, MessageCircle } from 'lucide-react';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [messageSent, setMessageSent] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // This will connect to backend later
    setMessageSent(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setMessageSent(false), 5000);
    console.log('Contact form submitted:', formData);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Contact <span className="text-orange-500">Us</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We'd love to hear from you! Whether you have a question about our snacks, 
            need help with an order, or just want to share your Joy Snack experience.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Contact Information */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
              
              {/* Contact Methods */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Phone className="text-orange-500" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Phone</h3>
                    <p className="text-gray-600">+233 (0) 123 456 789</p>
                    <p className="text-sm text-gray-500">Mon-Fri, 9am-6pm</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Mail className="text-orange-500" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                    <p className="text-gray-600">info@joysnack.com</p>
                    <p className="text-gray-600">support@joysnack.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <MapPin className="text-orange-500" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Visit Us</h3>
                    <p className="text-gray-600">123 Snack Street</p>
                    <p className="text-gray-600">Accra, Ghana</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Clock className="text-orange-500" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Business Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9am - 6pm</p>
                    <p className="text-gray-600">Saturday: 10am - 4pm</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition">
                    <Facebook size={20} />
                  </a>
                  <a href="#" className="bg-sky-500 text-white p-2 rounded-lg hover:bg-sky-600 transition">
                    <Twitter size={20} />
                  </a>
                  <a href="#" className="bg-pink-600 text-white p-2 rounded-lg hover:bg-pink-700 transition">
                    <Instagram size={20} />
                  </a>
                  <a href="#" className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition">
                    <MessageCircle size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
              
              {messageSent ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <div className="text-green-500 text-5xl mb-4">✓</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition flex items-center justify-center space-x-2"
                  >
                    <Send size={18} />
                    <span>Send Message</span>
                  </button>

                  <p className="text-xs text-gray-400 text-center">
                    By submitting this form, you agree to our Privacy Policy.
                  </p>
                </form>
              )}
            </div>

            {/* Map Section (placeholder) */}
            <div className="mt-8 bg-gray-100 rounded-xl h-64 flex items-center justify-center">
              <p className="text-gray-500">📍 Map will be integrated here</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-12 bg-gray-50 mt-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                q: "How long does delivery take?",
                a: "Delivery typically takes 1-2 business days within Accra, and 2-4 days for other regions."
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept mobile money (MTN, Vodafone, AirtelTigo), card payments, and cash on delivery."
              },
              {
                q: "Do you offer bulk orders for events?",
                a: "Yes! Contact us for special pricing on bulk orders for parties, weddings, and corporate events."
              },
              {
                q: "How should I store my snacks?",
                a: "Store in a cool, dry place. Most snacks stay fresh for up to 2 weeks when properly stored."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="font-semibold text-gray-800 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUsPage;