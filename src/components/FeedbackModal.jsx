import React, { useState } from 'react';
import { Star, X, Send } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';
import toast from 'react-hot-toast';

export default function FeedbackModal({ isOpen, onClose }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comments, setComments] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Please select a rating first');
      return;
    }

    setSubmitting(true);
    try {
      await axiosInstance.post('/feedback', { rating, comments });
      toast.success('Thank you for your feedback! 🙏');
      setRating(0);
      setComments('');
      onClose();
    } catch (error) {
      toast.error('Failed to submit feedback. Please try again.');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-md bg-stone-900 border border-orange-500/30 rounded-2xl p-6 shadow-sacred"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-orange-400 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-orange-200 mb-2">Feedback</h2>
          <p className="text-orange-400/60 text-sm">We value your thoughts to improve Purohit Darpan</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Star Rating */}
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                className="transition-transform hover:scale-110 focus:outline-none"
              >
                <Star 
                  size={32} 
                  className={`transition-colors ${
                    star <= (hoverRating || rating) 
                      ? 'fill-orange-400 text-orange-400' 
                      : 'text-stone-700'
                  }`} 
                />
              </button>
            ))}
          </div>

          {/* Comments Textarea */}
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Tell us what you love or what we can improve..."
            rows={4}
            className="w-full bg-stone-950/50 border border-orange-500/20 rounded-xl p-3 text-orange-100 placeholder-stone-500 focus:outline-none focus:border-orange-500/50 resize-none"
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-saffron text-white rounded-xl font-medium hover:shadow-glow disabled:opacity-50 transition-all"
          >
            {submitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Send size={18} />
                Submit Feedback
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
