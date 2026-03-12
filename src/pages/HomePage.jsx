import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star } from 'lucide-react';
import basketImage from '../assets/images/categories/home1.png';
import man1Image from '../assets/images/categories/man1.png';
import plantainImage from '../assets/images/categories/plantain.png';
import joysnackImage from '../assets/images/categories/joysnack.jpeg';
import springRoll from '../assets/images/categories/spring roll.png';
import meatPie from '../assets/images/categories/meat pie.png';
import sobolo from '../assets/images/categories/sobolo.png';
import perfectNigerian from '../assets/images/categories/perfect-nigerian-meat-pie-filling 1.png';
import deliveryGuy from '../assets/images/categories/delivery guy.png';
import familyFood from '../assets/images/categories/family food.png';

const HomePage = () => {
  // State for the carousel
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  // Array of images for the carousel
  const carouselImages = [
    {
      id: 1,
      src: man1Image,
      alt: "Man in yellow background",
      title: "Discover Unique Flavors",
      description: "Explore an array of snacks from around the globe, featuring unique flavors that tantalize your taste buds. Each snack is carefully selected to ensure quality and satisfaction.",
      buttonText: "Learn More",
      buttonLink: "/products"
    },
    {
      id: 2,
      src: plantainImage,
      alt: "Plantain snacks",
      title: "Fresh and Quality Assured",
      description: "We prioritize freshness and quality in all our products. Our snacks are sourced from trusted producers who adhere to strict quality standards.",
      buttonText: "View Selection",
      buttonLink: "/products"
    },
    {
      id: 3,
      src: joysnackImage,
      alt: "Joy Snack packaged chips",
      title: "Convenient Online Shopping",
      description: "Enjoy a seamless online shopping experience with easy navigation, secure checkout, and prompt delivery right to your doorstep.",
      buttonText: "Start Shopping",
      buttonLink: "/products"
    }
  ];

  // Products for Screen 3
  const featuredProducts = [
    {
      id: 1,
      name: "Spring Roll",
      price: "GH₵10.00",
      image: springRoll,
      alt: "Delicious spring roll"
    },
    {
      id: 2,
      name: "Meat Pie",
      price: "GH₵5.00",
      image: meatPie,
      alt: "Savory meat pie"
    },
    {
      id: 3,
      name: "Sobolo Drink",
      price: "GH₵5.00",
      image: sobolo,
      alt: "Refreshing sobolo drink"
    }
  ];

  // Testimonials for Screen 4
  const testimonials = [
    {
      id: 1,
      name: "Perfect Nigerian",
      image: perfectNigerian,
      alt: "Happy customer with perfect Nigerian meat pie",
      quote: "Absolutely Delicious!",
      text: "The snacks from Joy Snack are a game changer! They're fresh and full of flavor. Highly recommend!",
      rating: 5
    },
    {
      id: 2,
      name: "Delivery Guy",
      image: deliveryGuy,
      alt: "Fast delivery service",
      quote: "Fast Delivery!",
      text: "The snacks from Joy Snack are a game changer! They're fresh and full of flavors. Highly recommend!",
      rating: 5
    },
    {
      id: 3,
      name: "Happy Family",
      image: familyFood,
      alt: "Family enjoying snacks",
      quote: "Great Variety",
      text: "Joy Snack offers a fantastic variety of snacks! There's something for everyone in my family.",
      rating: 5
    }
  ];

  // Functions to navigate between slides (manual control)
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div>
      {/* SCREEN 1: Colored Rectangle Section with Pulsing Get Started Button */}
      <div className="w-full" style={{ backgroundColor: '#E7D4A2' }}>
        <div className="container mx-auto px-4 py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
                Joy Snack <span className="text-orange-500">E-Commerce</span>
              </h1>
              <p className="text-gray-700 text-lg mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                At Joy Snack E-commerce, we believe in the joy that comes from sharing 
                delightful snacks. Our mission is to provide a curated selection of 
                high-quality, delicious snacks that cater to all tastes and preferences.
              </p>
              
              {/* Pulsing Get Started Button */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-4">
                <Link 
                  to="/signup" 
                  className="inline-flex items-center justify-center bg-orange-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-600 transition transform hover:scale-105 shadow-lg animate-pulse"
                >
                  Get Started
                  <ChevronRight className="ml-2" size={20} />
                </Link>
              </div>

              
            </div>
            
            <div className="flex-1">
              <div className="relative">
                <img 
                  src={basketImage} 
                  alt="Joy Snack Basket" 
                  className="w-full h-auto max-h-[500px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* White space between screens */}
      <div className="w-full h-16 bg-white"></div>

      {/* SCREEN 2: Auto-sliding Carousel Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-12">
            <div className="flex-1 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={carouselImages[currentSlide].src} 
                  alt={carouselImages[currentSlide].alt}
                  className="w-full h-[400px] object-cover transition-opacity duration-500"
                />
                
                {/* Optional: Add slide number indicator */}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentSlide + 1} / {carouselImages.length}
                </div>
              </div>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                {carouselImages[currentSlide].title}
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                {carouselImages[currentSlide].description}
              </p>
              
              {/* Dynamic button based on current slide */}
              <Link
                to={carouselImages[currentSlide].buttonLink}
                className="inline-flex items-center bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition transform hover:scale-105"
              >
                {carouselImages[currentSlide].buttonText}
                <ChevronRight className="ml-2" size={20} />
              </Link>
            </div>
          </div>

          {/* Navigation buttons (manual control) */}
          <div className="flex justify-center items-center space-x-4 mt-12">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`px-4 sm:px-8 py-3 font-semibold text-sm sm:text-lg transition ${
                  currentSlide === index 
                    ? 'bg-black text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {index === 0 ? 'Discover' : index === 1 ? 'Quality' : 'Shopping'}
              </button>
            ))}
          </div>

          {/* Circle indicators with auto-slide visual feedback */}
          <div className="flex justify-center mt-6 space-x-3">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 ${
                  currentSlide === index 
                    ? 'w-4 h-4 bg-black rounded-full relative' 
                    : 'w-2 h-2 bg-gray-400 rounded-full hover:bg-gray-600'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                {currentSlide === index && (
                  <span className="absolute inset-0 rounded-full bg-black animate-ping opacity-75"></span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* White space between screens */}
      <div className="w-full h-16 bg-white"></div>

      {/* SCREEN 3: Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Our Popular Snacks
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Try our customer favorites, made with love and the finest ingredients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:-translate-y-2"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.alt}
                    className="w-full h-full object-cover hover:scale-110 transition duration-500"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-2xl font-bold text-orange-500 mb-4">
                    {product.price}
                  </p>
                  <Link
                    to="/products"
                    className="inline-block bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
                  >
                    Order Now
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center text-orange-500 font-semibold text-lg hover:text-orange-600 transition group"
            >
              View All Products
              <ChevronRight className="ml-1 group-hover:translate-x-1 transition" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* White space between screens */}
      <div className="w-full h-16 bg-white"></div>

      {/* SCREEN 4: Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Join our community of snack lovers and see why they choose Joy Snack for their cravings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="bg-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                    <div className="flex text-yellow-400 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-xl font-bold text-gray-800 mb-2">"{testimonial.quote}"</p>
                  <p className="text-gray-600 italic">{testimonial.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* White space at the bottom */}
      <div className="w-full h-16 bg-white"></div>
    </div>
  );
};

export default HomePage;
