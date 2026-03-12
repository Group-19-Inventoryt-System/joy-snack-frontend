import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, Calendar, User, Clock, ChevronRight } from 'lucide-react';

// Import blog images
import familyGameImg from '../assets/images/Blog/familyGame.png';
import celebrationImg from '../assets/images/Blog/celebration.png';
import snackImg from '../assets/images/Blog/snack.png';
import partyImg from '../assets/images/Blog/party.jpg';
import secretImg from '../assets/images/Blog/secret.jpg';
import soboloImg from '../assets/images/Blog/sobolo.jpg';

const BlogPostPage = () => {
  const { id } = useParams();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // All blog posts data
  const blogPosts = {
    1: {
      title: "Family Game Night Snack Favorites",
      image: familyGameImg,
      fullContent: `
        <p class="mb-4">Every Friday night, my family gathers for game night, and Joy Snack has become an essential part of our tradition. The kids love the spring rolls, while the adults can't get enough of the spicy meat pies. It's amazing how the right snacks can turn a simple game night into something everyone looks forward to all week!</p>
        
        <p class="mb-4">We started this tradition about two years ago, and it has grown from just immediate family to including neighbors and friends. The secret? Having a variety of snacks that appeal to everyone. Joy Snack offers so many options that there's always something for every taste.</p>
        
        <p class="mb-4">Our go-to selection includes: crispy spring rolls for the kids, spicy meat pies for the adults, and sobolo drink for everyone to share. The portion sizes are perfect for sharing, and the quality is consistently excellent.</p>
        
        <p class="mb-4">If you're looking to start your own family game night tradition, I highly recommend stocking up on Joy Snack products. They've made our Friday nights something truly special!</p>
        
        <h3 class="text-xl font-bold mt-6 mb-3">Tips for Your Game Night:</h3>
        <ul class="list-disc pl-5 mb-4">
          <li class="mb-2">Mix savory and sweet options for variety</li>
          <li class="mb-2">Have plenty of drinks available (Sobolo is always a hit!)</li>
          <li class="mb-2">Arrange snacks in shared platters for easy access</li>
          <li class="mb-2">Don't forget to order extra - they go fast!</li>
        </ul>
        
        <p class="mb-4">Have you tried Joy Snack for your family gatherings? Share your experience in the comments below!</p>
      `,
      author: "Abena Owusu",
      date: "March 12, 2026",
      readTime: "5 min read",
      category: "Customer Stories",
      location: "Accra, Ghana"
    },
    2: {
      title: "A Snack for Every Celebration",
      image: celebrationImg,
      fullContent: `
        <p class="mb-4">For my daughter's 10th birthday party, I ordered a variety of snacks from Joy Snack, and they were the highlight of the party! The samosas disappeared within minutes, and several parents asked where I got them. From birthday parties to holiday gatherings, Joy Snack has made every celebration more delicious and memorable.</p>
        
        <p class="mb-4">What I love most is the variety. For kids' parties, the spring rolls and mini meat pies are perfect. For adult gatherings, the spicier options and refreshing drinks are always a hit. The packaging is also beautiful and presentable for any occasion.</p>
        
        <p class="mb-4">Last Christmas, I ordered a mixed platter for our family gathering, and it was the talk of the evening. Even my grandmother, who is particular about traditional recipes, approved of the quality and taste. It's rare to find snacks that appeal to all age groups, but Joy Snack manages to do just that.</p>
        
        <h3 class="text-xl font-bold mt-6 mb-3">Celebration Packages:</h3>
        <div class="bg-orange-50 p-4 rounded-lg mb-4">
          <p class="font-semibold mb-2">Birthday Package (serves 10-15)</p>
          <p class="text-sm">Mixed spring rolls, meat pies, samosas + 2 drinks</p>
        </div>
        <div class="bg-orange-50 p-4 rounded-lg mb-4">
          <p class="font-semibold mb-2">Holiday Package (serves 20-25)</p>
          <p class="text-sm">Large assortment including all favorites + 4 drinks</p>
        </div>
        
        <p class="mb-4">Next time you're planning a celebration, let Joy Snack handle the food. Your guests will thank you!</p>
      `,
      author: "Kwame Asante",
      date: "March 10, 2026",
      readTime: "4 min read",
      category: "Celebrations",
      location: "Kumasi, Ghana"
    },
    3: {
      title: "Movie Night Comfort Snacks",
      image: snackImg,
      fullContent: `
        <p class="mb-4">There's nothing better than settling in for a movie with a spread of Joy Snack treats. The crispy plantain chips and refreshing Sobolo drink have become my go-to combination. Even my friends who are picky eaters have found something they love. It's turned ordinary weekends into something special.</p>
        
        <p class="mb-4">I work long hours during the week, so weekends are my time to relax and unwind. A good movie and great snacks are essential. Since discovering Joy Snack, my movie nights have gone from ordinary to extraordinary. The quality is consistent, and the flavors are always on point.</p>
        
        <p class="mb-4">My current favorites: plantain chips for something crunchy, spring rolls for something savory, and sobolo to wash it all down. It's the perfect combination!</p>
        
        <h3 class="text-xl font-bold mt-6 mb-3">My Movie Night Menu:</h3>
        <table class="w-full mb-4">
          <tr class="border-b">
            <td class="py-2">Crispy Spring Rolls</td>
            <td class="py-2">GH₵ 18 (6 pieces)</td>
          </tr>
          <tr class="border-b">
            <td class="py-2">Plantain Chips</td>
            <td class="py-2">GH₵ 20 (Mini pack)</td>
          </tr>
          <tr class="border-b">
            <td class="py-2">Sobolo Drink</td>
            <td class="py-2">GH₵ 4 (250ml)</td>
          </tr>
        </table>
        
        <p class="mb-4">What's your favorite movie night snack from Joy Snack? Let me know in the comments!</p>
      `,
      author: "Esi Mensah",
      date: "March 8, 2026",
      readTime: "3 min read",
      category: "Lifestyle",
      location: "Takoradi, Ghana"
    },
    4: {
      title: "How Sobolo Became Ghana's Favorite Drink",
      image: soboloImg,
      fullContent: `
        <p class="mb-4">Sobolo, also known as hibiscus tea, has been a beloved beverage in Ghana for generations. Made from dried hibiscus flowers, ginger, and cloves, this deep red drink is not only refreshing but also packed with health benefits.</p>
        
        <p class="mb-4">At Joy Snack, we've perfected the art of making Sobolo. We source our hibiscus from local farmers, ensuring the highest quality. The flowers are carefully dried to preserve their natural flavor and nutrients.</p>
        
        <h3 class="text-xl font-bold mt-6 mb-3">Health Benefits of Sobolo:</h3>
        <ul class="list-disc pl-5 mb-4">
          <li class="mb-2">Rich in antioxidants</li>
          <li class="mb-2">Helps lower blood pressure</li>
          <li class="mb-2">Boosts immune system</li>
          <li class="mb-2">Aids digestion</li>
        </ul>
        
        <p class="mb-4">Whether you prefer it sweetened or unsweetened, hot or cold, Sobolo is a drink that brings joy to every occasion. Try our freshly made Sobolo today!</p>
      `,
      author: "Production Team",
      date: "March 5, 2026",
      readTime: "6 min read",
      category: "Behind the Scenes",
      location: "Accra, Ghana"
    },
    5: {
      title: "5 Tips for Hosting the Perfect Party",
      image: partyImg,
      fullContent: `
        <p class="mb-4">Hosting a party can be stressful, but with the right planning and snacks, it can be a breeze. Here are our top 5 tips for hosting an unforgettable event with Joy Snack.</p>
        
        <h3 class="text-xl font-bold mt-6 mb-3">1. Plan Your Snack Variety</h3>
        <p class="mb-4">Offer a mix of savory and sweet options. Our spring rolls, meat pies, and samosas are perfect for savory lovers, while our fruit drinks satisfy sweet cravings.</p>
        
        <h3 class="text-xl font-bold mt-6 mb-3">2. Consider Dietary Restrictions</h3>
        <p class="mb-4">Always ask guests about allergies or dietary preferences. We offer options that cater to various needs.</p>
        
        <h3 class="text-xl font-bold mt-6 mb-3">3. Presentation Matters</h3>
        <p class="mb-4">Arrange snacks on beautiful platters. The visual appeal makes food taste even better!</p>
        
        <h3 class="text-xl font-bold mt-6 mb-3">4. Don't Forget Drinks</h3>
        <p class="mb-4">Pair your snacks with refreshing Sobolo, pineapple juice, or ginger drinks. A good drink selection elevates any party.</p>
        
        <h3 class="text-xl font-bold mt-6 mb-3">5. Order in Advance</h3>
        <p class="mb-4">Place your Joy Snack order at least 48 hours before your event to ensure availability.</p>
        
        <p class="mb-4">Follow these tips and your party will be the talk of the town!</p>
      `,
      author: "Events Team",
      date: "March 1, 2026",
      readTime: "7 min read",
      category: "Tips",
      location: "Accra, Ghana"
    },
    6: {
      title: "The Secret to Perfect Meat Pies",
      image: secretImg,
      fullContent: `
        <p class="mb-4">Our head chef, Chef Amoako, is revealing the secrets behind Joy Snack's famous meat pies. It's all about quality ingredients and traditional techniques.</p>
        
        <h3 class="text-xl font-bold mt-6 mb-3">The Perfect Pastry</h3>
        <p class="mb-4">We use a special blend of flour and butter to create a flaky, golden crust that melts in your mouth. The secret is keeping everything cold and not overworking the dough.</p>
        
        <h3 class="text-xl font-bold mt-6 mb-3">The Filling</h3>
        <p class="mb-4">Our filling is made with 100% Ghanaian beef, mixed with potatoes, carrots, and a blend of local spices. We slow-cook the filling to develop deep, rich flavors.</p>
        
        <h3 class="text-xl font-bold mt-6 mb-3">Baking Technique</h3>
        <p class="mb-4">We bake our pies at the perfect temperature to ensure the crust is golden and the filling is piping hot. An egg wash gives that beautiful shine.</p>
        
        <p class="mb-4">Want to try making them at home? Stay tuned for our upcoming recipe post!</p>
      `,
      author: "Chef Amoako",
      date: "February 25, 2026",
      readTime: "8 min read",
      category: "Recipes",
      location: "Accra, Ghana"
    }
  };

  // Handle newsletter subscription
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
      console.log('Newsletter subscription:', email);
    }
  };

  const post = blogPosts[id];
  
  // Related posts (excluding current)
  const relatedPosts = Object.entries(blogPosts)
    .filter(([key]) => key !== id)
    .slice(0, 2)
    .map(([key, value]) => ({ id: key, ...value }));

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
          <Link to="/blog" className="text-orange-500 hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back button */}
        <Link 
          to="/blog" 
          className="inline-flex items-center text-gray-600 hover:text-orange-500 mb-6 transition"
        >
          <ChevronLeft size={20} />
          <span className="ml-1">Back to Blog</span>
        </Link>

        {/* Blog Post */}
        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Featured Image */}
          <div className="h-96 overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Category */}
            <div className="mb-4">
              <span className="inline-block bg-orange-100 text-orange-600 text-sm font-semibold px-3 py-1 rounded-full">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6 pb-6 border-b border-gray-200">
              <span className="flex items-center mr-4">
                <User size={16} className="mr-1 text-orange-400" />
                {post.author}
              </span>
              <span className="flex items-center mr-4">
                <Calendar size={16} className="mr-1 text-orange-400" />
                {post.date}
              </span>
              <span className="flex items-center mr-4">
                <Clock size={16} className="mr-1 text-orange-400" />
                {post.readTime}
              </span>
              <span className="text-gray-400">{post.location}</span>
            </div>

            {/* Full Content */}
            <div 
              className="prose max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.fullContent }}
            />

            {/* Share Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-3">Share this story:</p>
              <div className="flex space-x-3">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">Facebook</button>
                <button className="bg-sky-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-sky-600">Twitter</button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700">WhatsApp</button>
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4">You Might Also Like</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related.id}
                      to={`/blog/${related.id}`}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-orange-50 transition"
                    >
                      <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                        <img src={related.image} alt={related.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-gray-800">{related.title}</h4>
                        <p className="text-xs text-gray-500">{related.readTime}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Newsletter Signup - Updated with functionality */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="bg-orange-500 rounded-xl p-6 text-white">
                <h3 className="text-lg font-bold mb-2">Love Snack Stories?</h3>
                <p className="text-sm text-orange-100 mb-4">
                  Subscribe to our newsletter for more delicious content!
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
        </article>

        {/* Comments Section (placeholder) */}
        <div className="mt-8 bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Comments (0)</h3>
          <p className="text-gray-500 text-sm">Be the first to share your thoughts!</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;