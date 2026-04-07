import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { formatCurrency } from '../data/catalog';
import basketImage from '../assets/images/categories/home1.png';
import man1Image from '../assets/images/categories/man1.png';
import plantainImage from '../assets/images/categories/plantain.png';
import joysnackImage from '../assets/images/categories/joysnack.jpeg';
import perfectNigerian from '../assets/images/categories/perfect-nigerian-meat-pie-filling 1.png';
import deliveryGuy from '../assets/images/categories/delivery guy.png';
import familyFood from '../assets/images/categories/family food.png';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { hydratedProducts, productsLoading } = useAppData();

  const carouselImages = [
    {
      id: 1,
      src: man1Image,
      alt: 'Man in yellow background',
      title: 'Discover Unique Flavors',
      description:
        'Explore an array of snacks from around the globe, featuring unique flavors that tantalize your taste buds. Each snack is carefully selected to ensure quality and satisfaction.',
      buttonText: 'Learn More',
      buttonLink: '/products',
    },
    {
      id: 2,
      src: plantainImage,
      alt: 'Plantain snacks',
      title: 'Fresh and Quality Assured',
      description:
        'We prioritize freshness and quality in all our products. Our snacks are sourced from trusted producers who adhere to strict quality standards.',
      buttonText: 'View Selection',
      buttonLink: '/products',
    },
    {
      id: 3,
      src: joysnackImage,
      alt: 'Joy Snack packaged chips',
      title: 'Convenient Online Shopping',
      description:
        'Enjoy a seamless online shopping experience with easy navigation, secure checkout, and prompt delivery right to your doorstep.',
      buttonText: 'Start Shopping',
      buttonLink: '/products',
    },
  ];

  const featuredProducts = productsLoading 
    ? [] 
    : hydratedProducts
        .filter((product) => product.featured)
        .slice(0, 3)
        .map((product) => ({
          id: product.id,
          name: product.name,
          price: formatCurrency(product.sizes[0]?.price ?? 0),
          image: product.image,
          alt: product.name,
        }));

  const testimonials = [
    {
      id: 1,
      name: 'Perfect Nigerian',
      image: perfectNigerian,
      alt: 'Happy customer with perfect Nigerian meat pie',
      quote: 'Absolutely Delicious!',
      text: "The snacks from Joy Snack are a game changer! They're fresh and full of flavor. Highly recommend!",
      rating: 5,
    },
    {
      id: 2,
      name: 'Delivery Guy',
      image: deliveryGuy,
      alt: 'Fast delivery service',
      quote: 'Fast Delivery!',
      text: "The snacks from Joy Snack are a game changer! They're fresh and full of flavors. Highly recommend!",
      rating: 5,
    },
    {
      id: 3,
      name: 'Happy Family',
      image: familyFood,
      alt: 'Family enjoying snacks',
      quote: 'Great Variety',
      text: "Joy Snack offers a fantastic variety of snacks! There's something for everyone in my family.",
      rating: 5,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [carouselImages.length]);

  return (
    <div>
      <div className="w-full" style={{ backgroundColor: '#E7D4A2' }}>
        <div className="container mx-auto px-4 py-16 lg:py-20">
          <div className="flex flex-col items-center gap-12 lg:flex-row">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="mb-6 text-4xl font-bold text-gray-800 lg:text-5xl">
                Joy Snack <span className="text-orange-500">E-Commerce</span>
              </h1>
              <p className="mx-auto mb-8 max-w-xl text-lg leading-relaxed text-gray-700 lg:mx-0">
                At Joy Snack E-commerce, we believe in the joy that comes from sharing delightful snacks. Our mission is to provide a curated selection of high-quality, delicious snacks that cater to all tastes and preferences.
              </p>

              <div className="mb-4 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:scale-105 hover:bg-orange-600"
                >
                  Get Started
                  <ChevronRight className="ml-2" size={20} />
                </Link>
              </div>

              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 lg:justify-start">
                <span className="flex items-center">✓ Track Orders</span>
                <span className="flex items-center">✓ Save Favorites</span>
                <span className="flex items-center">✓ Faster Checkout</span>
                <span className="flex items-center">✓ Exclusive Offers</span>
              </div>
            </div>

            <div className="flex-1">
              <div className="relative">
                <img src={basketImage} alt="Joy Snack Basket" className="h-auto max-h-[500px] w-full object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-16 w-full bg-white"></div>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-col items-center gap-12 lg:flex-row">
            <div className="relative flex-1 overflow-hidden">
              <div className="relative h-[400px] overflow-hidden rounded-2xl shadow-xl">
                {carouselImages.map((image, index) => (
                  <div
                    key={image.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      currentSlide === index ? 'z-10 opacity-100' : 'z-0 opacity-0'
                    }`}
                  >
                    <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
                  </div>
                ))}

                <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
                  {currentSlide + 1} / {carouselImages.length}
                </div>
              </div>
            </div>

            <div className="flex-1 text-center lg:text-left">
              {carouselImages.map((image, index) => (
                <div
                  key={image.id}
                  className={`transition-opacity duration-1000 ease-in-out ${
                    currentSlide === index ? 'block' : 'hidden'
                  }`}
                >
                  <h2 className="mb-4 text-3xl font-bold text-gray-800 lg:text-4xl">{image.title}</h2>
                  <p className="mb-8 text-lg leading-relaxed text-gray-600">{image.description}</p>

                  <Link
                    to={image.buttonLink}
                    className="inline-flex items-center rounded-lg bg-black px-8 py-3 font-semibold text-white transition hover:scale-105 hover:bg-gray-800"
                  >
                    {image.buttonText}
                    <ChevronRight className="ml-2" size={20} />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex items-center justify-center space-x-4">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`cursor-pointer px-4 py-3 text-sm font-semibold transition-all duration-300 sm:px-8 sm:text-lg ${
                  currentSlide === index ? 'bg-black text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {index === 0 ? 'Discover' : index === 1 ? 'Quality' : 'Shopping'}
              </button>
            ))}
          </div>

          <div className="mt-6 flex justify-center space-x-3">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`cursor-pointer transition-all duration-300 focus:outline-none ${
                  currentSlide === index
                    ? 'relative h-4 w-4 rounded-full bg-black'
                    : 'h-2 w-2 rounded-full bg-gray-400 hover:bg-gray-600'
                }`}
              >
                {currentSlide === index && (
                  <span className="absolute inset-0 rounded-full bg-black opacity-75 animate-ping"></span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="h-16 w-full bg-white"></div>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800 lg:text-4xl">Our Popular Snacks</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Try our customer favorites, made with love and the finest ingredients.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {productsLoading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="h-64 bg-gray-300 rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))
            ) : (
              featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="overflow-hidden rounded-xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="h-64 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.alt}
                      className="h-full w-full object-cover transition duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="mb-2 text-xl font-bold text-gray-800">{product.name}</h3>
                    <p className="mb-4 text-2xl font-bold text-orange-500">{product.price}</p>
                    <Link
                      to={`/product/${product.id}`}
                      className="inline-block rounded-lg bg-black px-6 py-2 font-semibold text-white transition hover:bg-gray-800"
                    >
                      Order Now
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/products"
              className="inline-flex items-center text-lg font-semibold text-orange-500 transition hover:text-orange-600"
            >
              View All Products
              <ChevronRight className="ml-1" size={20} />
            </Link>
          </div>
        </div>
      </section>

      <div className="h-16 w-full bg-white"></div>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800 lg:text-4xl">What Our Customers Say</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Join our community of snack lovers and see why they choose Joy Snack for their cravings.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="rounded-xl bg-gray-50 p-6 shadow-lg transition duration-300 hover:shadow-xl">
                <div className="mb-4 flex items-center">
                  <div className="mr-4 h-16 w-16 overflow-hidden rounded-full">
                    <img src={testimonial.image} alt={testimonial.alt} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                    <div className="mt-1 flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, index) => (
                        <Star key={index} size={16} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="mb-2 text-xl font-bold text-gray-800">"{testimonial.quote}"</p>
                  <p className="italic text-gray-600">{testimonial.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-16 w-full bg-white"></div>
    </div>
  );
};

export default HomePage;
