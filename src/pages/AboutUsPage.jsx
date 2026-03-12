import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Heart, Shield, Users, Award } from 'lucide-react';

// Import local images
import aboutHero from '../assets/images/About/delivery.webp';
import storyImage from '../assets/images/About/about.jpg';
import qualityImage from '../assets/images/About/quaitySnacks.jpeg';
import communityImage from '../assets/images/About/supportUs.webp';
import dedsecImage from '../assets/images/About/dedsec.jpg';
import obuabengImage from '../assets/images/About/obuabeng.jpeg';
import jamesImage from '../assets/images/About/james.jpg';

const AboutUsPage = () => {
  // Team members with your images
  const teamMembers = [
    {
      name: 'Michael Anarfo',
      role: 'Project Manager & Full Stack Developer',
      image: dedsecImage,
      bio: 'Leading the development team with passion and technical expertise to bring Joy Snack to life.'
    },
    {
      name: 'James Osei Amaniampong Agyemang',
      role: 'Frontend Developer',
      image: jamesImage,
      bio: 'Crafting beautiful and responsive user interfaces for the best shopping experience.'
    },
    {
      name: 'Obuabang King David',
      role: 'Frontend Developer',
      image: obuabengImage,
      bio: 'Ensuring project success through careful planning and execution.'
    }
  ];

  const values = [
    {
      icon: <Heart className="text-orange-500" size={32} />,
      title: 'Made with Love',
      description: 'Every snack is prepared with care and passion, just like mom used to make.'
    },
    {
      icon: <Shield className="text-orange-500" size={32} />,
      title: 'Quality Assured',
      description: 'We source only the finest ingredients from trusted local farmers.'
    },
    {
      icon: <Users className="text-orange-500" size={32} />,
      title: 'Community First',
      description: 'Supporting local Ghanaian businesses and families.'
    },
    {
      icon: <Award className="text-orange-500" size={32} />,
      title: 'Authentic Taste',
      description: 'Traditional recipes passed down through generations.'
    }
  ];

  const stats = [
    { number: '5000+', label: 'Happy Customers' },
    { number: '50+', label: 'Local Suppliers' },
    { number: '100+', label: 'Snack Varieties' },
    { number: '24/7', label: 'Customer Support' }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section - Updated with delivery.webp */}
      <div className="relative h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${aboutHero})`,
            filter: 'brightness(0.7)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl lg:text-6xl font-bold mb-4">
              About <span className="text-orange-400">Joy Snack</span>
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Bringing the authentic taste of Ghanaian snacks to your doorstep with love and quality assurance.
            </p>
            <Link 
              to="/products"
              className="inline-flex items-center bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              Explore Our Snacks
              <ChevronRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Our Story Section - Updated with about.jpg */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                Our <span className="text-orange-500">Story</span>
              </h2>
              <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                Joy Snack was born from a simple idea: to share the delicious, authentic snacks of Ghana with everyone. What started as a small kitchen in Accra has grown into a beloved brand that brings joy to thousands of homes across the country.
              </p>
              <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                We work directly with local farmers and producers to ensure every ingredient is fresh, authentic, and supports our Ghanaian community. Our recipes are inspired by generations of family traditions, passed down and perfected over time.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Today, we're proud to offer over 100 different snack varieties, all made with the same love and care that started it all.
              </p>
            </div>
            <div className="flex-1">
              <img 
                src={storyImage}
                alt="Ghanaian food makers"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-orange-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-4">
            Our <span className="text-orange-500">Values</span>
          </h2>
          <p className="text-gray-600 text-center text-lg mb-12 max-w-2xl mx-auto">
            What drives us to bring you the best snacks every single day
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition">
                <div className="inline-block p-4 bg-orange-100 rounded-full mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Section - Updated with quaitySnacks.jpeg */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                Quality You Can <span className="text-orange-500">Trust</span>
              </h2>
              <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                We take quality seriously. Every snack that leaves our kitchen goes through rigorous quality checks to ensure it meets our high standards.
              </p>
              <ul className="space-y-3">
                {[
                  'Fresh ingredients sourced from local Ghanaian farms',
                  'Hygienic preparation in certified kitchens',
                  'Regular quality testing and taste checks',
                  'Proper packaging to maintain freshness'
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-orange-500 font-bold">✓</span>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1">
              <img 
                src={qualityImage}
                alt="Fresh Ghanaian produce"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team - Updated with your team members */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-4">
            Meet Our <span className="text-orange-500">Team</span>
          </h2>
          <p className="text-gray-600 text-center text-lg mb-12 max-w-2xl mx-auto">
            The passionate people behind Joy Snack
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="h-80 overflow-hidden">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-110 transition duration-500"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-orange-500 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section - Updated with supportUs.webp */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <img 
                src={communityImage}
                alt="Supporting our community"
                className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                Supporting Our <span className="text-orange-500">Community</span>
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                At Joy Snack, we believe in giving back. We work with local women's cooperatives, support community events, and ensure fair wages for all our producers.
              </p>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-2xl font-bold text-orange-500">50+</div>
                  <div className="text-sm text-gray-600">Women Employed</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-2xl font-bold text-orange-500">20+</div>
                  <div className="text-sm text-gray-600">Local Communities</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Taste the Joy?
          </h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Explore our wide range of authentic Ghanaian snacks and experience the joy of quality, fresh snacks delivered to your door.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Shop Now
            <ChevronRight size={20} className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;