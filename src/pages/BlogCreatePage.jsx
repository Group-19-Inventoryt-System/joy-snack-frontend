import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, PenSquare, Heart, Clock, Image as ImageIcon } from 'lucide-react';

const BlogCreatePage = () => {
  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Back button */}
        <Link 
          to="/blog" 
          className="inline-flex items-center text-gray-600 hover:text-orange-500 mb-6 transition"
        >
          <ChevronLeft size={20} />
          <span className="ml-1">Back to Blog</span>
        </Link>

        {/* Coming Soon Card */}
        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl shadow-xl overflow-hidden border border-orange-100">
          {/* Header */}
          <div className="bg-orange-500 px-6 py-4">
            <h1 className="text-2xl font-bold text-white flex items-center">
              <PenSquare className="mr-2" size={24} />
              Share Your Snack Story
            </h1>
          </div>

          {/* Content */}
          <div className="p-8 text-center">
            {/* Icon */}
            <div className="inline-block p-4 bg-orange-100 rounded-full mb-6">
              <Heart className="text-orange-500" size={48} />
            </div>

            {/* Message */}
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Coming Soon!
            </h2>
            
            <p className="text-gray-600 text-lg mb-6 max-w-lg mx-auto">
              We're working on something exciting! Soon you'll be able to share your own snack stories, 
              photos, and experiences with the Joy Snack community.
            </p>

            {/* Features Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-orange-500 font-bold text-xl mb-2">📝</div>
                <h3 className="font-semibold text-gray-800 mb-1">Write Stories</h3>
                <p className="text-xs text-gray-500">Share your snack experiences</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-orange-500 font-bold text-xl mb-2">📸</div>
                <h3 className="font-semibold text-gray-800 mb-1">Upload Photos</h3>
                <p className="text-xs text-gray-500">Show off your snack moments</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-orange-500 font-bold text-xl mb-2">💬</div>
                <h3 className="font-semibold text-gray-800 mb-1">Get Feedback</h3>
                <p className="text-xs text-gray-500">Connect with other snack lovers</p>
              </div>
            </div>

            {/* Notify Me Button */}
            <button 
              className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition shadow-lg hover:shadow-xl"
              onClick={() => alert("Thanks! We'll notify you when this feature launches.")}
            >
              Notify Me When Ready
            </button>

            <p className="text-sm text-gray-400 mt-4">
              Feature coming soon to Joy Snack Blog
            </p>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-center text-sm text-gray-500">
              <Clock size={16} className="mr-1" />
              Expected launch: Coming Soon
            </div>
          </div>
        </div>

        {/* Preview of what's coming */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
              <ImageIcon size={16} className="mr-1 text-orange-500" />
              What you'll be able to share:
            </h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                Your favorite snack combinations
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                Party and celebration photos
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                Recipes and snack ideas
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                Reviews of our products
              </li>
            </ul>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
            <h3 className="font-semibold text-gray-800 mb-2">Why share?</h3>
            <p className="text-sm text-gray-600">
              Your stories inspire other snack lovers and help us improve. 
              Plus, featured posts win free snacks! 🎉
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCreatePage;