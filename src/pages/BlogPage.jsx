import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ChevronRight, Clock, X, PenSquare } from 'lucide-react';

// Import blog images
import familyGameImg from '../assets/images/Blog/familyGame.png';
import celebrationImg from '../assets/images/Blog/celebration.png';
import snackImg from '../assets/images/Blog/snack.png';
import partyImg from '../assets/images/Blog/party.jpg';
import secretImg from '../assets/images/Blog/secret.jpg';
import soboloImg from '../assets/images/Blog/sobolo.jpg';

const BlogPage = () => {
  const [showAbout, setShowAbout] = useState(true);
  const [visiblePosts, setVisiblePosts] = useState(3);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // All blog posts data (expanded for load more)
  const allBlogPosts = [
    {
      id: 1,
      title: "Family Game Night Snack Favorites",
      image: familyGameImg,
      excerpt: "One of our customers shared their experience of turning family game nights into a delicious tradition with our snacks. They discovered that the right mix of savory and sweet can keep everyone energized and engaged. Their go-to snack mix has become a staple in their household, and they love sharing it with friends.",
      author: "Abena Owusu",
      date: "March 12, 2026",
      readTime: "5 min read",
      category: "Customer Stories"
    },
    {
      id: 2,
      title: "A Snack for Every Celebration",
      image: celebrationImg,
      excerpt: "Another customer recounted how our snacks have been a part of their celebrations, from birthday to holiday gatherings. They appreciate the variety and quality, making it easy to find something that everyone loves. Their story highlights how snacking can bring people together and create lasting memories.",
      author: "Kwame Asante",
      date: "March 10, 2026",
      readTime: "4 min read",
      category: "Celebrations"
    },
    {
      id: 3,
      title: "Movie Night Comfort Snacks",
      image: snackImg,
      excerpt: "One of our customers shared how JoySnack has become their go-to companion for relaxing evenings in front of the TV. They love pairing crispy spring rolls and savory samosas with their favorite shows, turning ordinary nights into cozy snack rituals.",
      author: "Esi Mensah",
      date: "March 8, 2026",
      readTime: "3 min read",
      category: "Lifestyle"
    },
    {
      id: 4,
      title: "How Sobolo Became Ghana's Favorite Drink",
      image: soboloImg,
      excerpt: "Discover the history and health benefits of Sobolo, the beloved hibiscus drink that has been a staple in Ghanaian households for generations. Our production team shares how we make it fresh daily.",
      author: "Production Team",
      date: "March 5, 2026",
      readTime: "6 min read",
      category: "Behind the Scenes"
    },
    {
      id: 5,
      title: "5 Tips for Hosting the Perfect Party",
      image: partyImg,
      excerpt: "From snack arrangements to drink pairings, learn how to host an unforgettable party with Joy Snack. Our party planning guide covers everything you need to know.",
      author: "Events Team",
      date: "March 1, 2026",
      readTime: "7 min read",
      category: "Tips"
    },
    {
      id: 6,
      title: "The Secret to Perfect Meat Pies",
      image: secretImg,
      excerpt: "Our head chef reveals the secrets behind our famous meat pies. Learn about the ingredients and techniques that make our pies so special.",
      author: "Chef Amoako",
      date: "February 25, 2026",
      readTime: "8 min read",
      category: "Recipes"
    }
  ];

  // Display only visible posts
  const displayedPosts = allBlogPosts.slice(0, visiblePosts);

  // Load more function
  const loadMore = () => {
    setVisiblePosts(prev => Math.min(prev + 3, allBlogPosts.length));
  };

  // Check if there are more posts to load
  const hasMore = visiblePosts < allBlogPosts.length;

  // Handle newsletter subscription
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      // Reset success message after 3 seconds
      setTimeout(() => setSubscribed(false), 3000);
      // Later: This will connect to your backend
      console.log('Newsletter subscription:', email);
    }
  };

  // Featured/Sidebar posts
  const featuredPosts = [
    {
      id: 4,
      title: "Traditional Ghanaian Snacks You Must Try",
      date: "March 5, 2026"
    },
    {
      id: 5,
      title: "The Art of Making Perfect Meat Pies",
      date: "March 1, 2026"
    },
    {
      id: 6,
      title: "Healthy Snacking: Tips and Tricks",
      date: "February 25, 2026"
    },
    {
      id: 7,
      title: "Behind the Scenes: How We Make Sobolo",
      date: "February 20, 2026"
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section with Write Post Button */}
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Welcome to Our <span className="text-orange-500">Snack Blog</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            Discover the world of snacks, tips, and stories from our community of snack lovers
          </p>
          
          {/* Write a Post Button */}
          <Link
            to="/blog/create"
            className="inline-flex items-center bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition shadow-lg hover:shadow-xl"
          >
            <PenSquare size={20} className="mr-2" />
            Share Your Snack Story
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Blog Posts */}
          <div className="lg:w-2/3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <span className="bg-orange-500 w-2 h-8 rounded-full mr-3"></span>
                Snack Tales from our Customers
              </h2>
              
              {/* Mobile Write Button */}
              <Link
                to="/blog/create"
                className="lg:hidden bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition shadow-md"
                title="Write a post"
              >
                <PenSquare size={20} />
              </Link>
            </div>
            
            <p className="text-gray-600 mb-8">
              Stay updated with our freshest insights and delicious recipes.
            </p>

            <div className="space-y-8">
              {displayedPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition border border-gray-100">
                  <div className="flex flex-col md:flex-row">
                    {/* Blog Image */}
                    <div className="md:w-2/5 h-48 md:h-auto overflow-hidden bg-gray-100">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-110 transition duration-500"
                      />
                    </div>

                    {/* Blog Content */}
                    <div className="md:w-3/5 p-5">
                      {/* Category */}
                      <div className="mb-2">
                        <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-2 py-1 rounded">
                          {post.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-gray-800 mb-2 hover:text-orange-500 transition">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                        {post.excerpt}
                      </p>

                      {/* Author and Date */}
                      <div className="flex items-center text-xs text-gray-500 mb-3">
                        <span className="font-medium text-gray-700">{post.author}</span>
                        <span className="mx-2">•</span>
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <span>{post.readTime}</span>
                      </div>

                      {/* Read More Link */}
                      <Link 
                        to={`/blog/${post.id}`}
                        className="inline-flex items-center text-orange-500 text-sm font-semibold hover:text-orange-600 transition group"
                      >
                        Read More
                        <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center mt-10">
                <button 
                  onClick={loadMore}
                  className="bg-black text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition"
                >
                  Load More Stories ({allBlogPosts.length - visiblePosts} remaining)
                </button>
              </div>
            )}

            {/* Show when all posts are loaded */}
            {!hasMore && visiblePosts > 3 && (
              <p className="text-center text-gray-500 text-sm mt-6">
                You've seen all our stories! Check back soon for more.
              </p>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Write a Post Card */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 mb-6 text-white shadow-lg">
              <PenSquare size={32} className="mb-3" />
              <h3 className="text-xl font-bold mb-2">Share Your Story</h3>
              <p className="text-sm text-orange-100 mb-4">
                Have a snack experience to share? We'd love to hear from you!
              </p>
              <Link
                to="/blog/create"
                className="inline-flex items-center bg-white text-orange-500 px-4 py-2 rounded-lg font-semibold hover:bg-orange-50 transition w-full justify-center"
              >
                Write a Post
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>

            {/* About Our Blog */}
            {showAbout && (
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 mb-6 sticky top-24 border border-orange-100 shadow-md">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-gray-800">About Our Blog</h3>
                  <button 
                    onClick={() => setShowAbout(false)}
                    className="text-gray-400 hover:text-gray-600 transition"
                  >
                    <X size={18} />
                  </button>
                </div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  Welcome to the Joy Snack blog! Here we share stories from our amazing customers, 
                  snack tips, recipes, and everything in between. Join our community of snack lovers 
                  and discover new ways to enjoy your favorite treats.
                </p>
                <div className="flex items-center space-x-2 text-orange-500">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                  <span className="w-2 h-2 bg-orange-300 rounded-full"></span>
                  <span className="text-xs font-semibold ml-2">Sharing the joy of snacking</span>
                </div>
              </div>
            )}

            {/* Featured Posts */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Featured Posts</h3>
              <div className="space-y-4">
                {featuredPosts.map((post) => (
                  <Link 
                    key={post.id}
                    to={`/blog/${post.id}`}
                    className="block group border-b border-gray-100 last:border-0 pb-3 last:pb-0"
                  >
                    <h4 className="font-semibold text-gray-700 group-hover:text-orange-500 transition text-sm mb-1">
                      {post.title}
                    </h4>
                    <p className="text-xs text-gray-500">{post.date}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter Signup - Updated with functionality */}
            <div className="bg-orange-500 rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Snack Newsletter</h3>
              <p className="text-sm text-orange-100 mb-4">
                Get weekly snack stories and recipes delivered to your inbox.
              </p>
              
              {subscribed ? (
                <div className="bg-green-500 text-white p-3 rounded-lg text-sm text-center animate-pulse">
                  🎉 Thanks for subscribing!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="w-full px-4 py-2 rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button 
                    type="submit"
                    className="w-full bg-white text-orange-500 py-2 rounded-lg text-sm font-semibold hover:bg-orange-50 transition"
                  >
                    Subscribe
                  </button>
                </form>
              )}

              <p className="text-xs text-orange-200 mt-3">
                No spam, unsubscribe anytime
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;