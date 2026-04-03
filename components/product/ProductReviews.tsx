export function ProductReviews({ title }: { title: string }) {
  // Mock data as specified: 5 most recent reviews from Judge.me API structure
  const reviews = [
    { id: 1, author: "Ahmed M.", rating: 5, date: "2 days ago", text: "Quality is brilliant. Matches my home aesthetic perfectly. Easy delivery.", verified: true },
    { id: 2, author: "Sarah K.", rating: 5, date: "1 week ago", text: "Very premium feel, exactly as described.", verified: true },
    { id: 3, author: "Faisal", rating: 4, date: "1 week ago", text: "Good product but took 3 days instead of 2. Still happy with it.", verified: true },
    { id: 4, author: "Reem", rating: 5, date: "2 weeks ago", text: "Amazing. The attention to detail is noticeable. Recommend 100%.", verified: true },
    { id: 5, author: "Omar D.", rating: 5, date: "1 month ago", text: "Top notch experience from ErgoAura. Live Aligned!", verified: true }
  ];

  return (
    <div className="w-full mt-10 md:mt-16 py-10 md:py-16 bg-ergo-surface px-4 md:px-8 border-y border-ergo-border" id="reviews">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-black text-ergo-navy-deep mb-8 flex items-center justify-between">
          Customer Reviews
          <div className="flex flex-col items-end gap-1">
            <span className="text-sm font-bold text-ergo-muted uppercase">Average Rating</span>
            <div className="flex items-center gap-1.5 text-yellow-400 text-lg">
              ★★★★<span className="relative">★<span className="absolute inset-0 text-gray-300 overflow-hidden" style={{ width: '20%' }}>★</span></span>
              <span className="text-ergo-navy-deep font-black text-xl ml-1">4.8</span>
            </div>
          </div>
        </h2>

        <div className="space-y-6">
          {reviews.map(review => (
            <div key={review.id} className="bg-white p-6 rounded-2xl shadow-sm border border-ergo-border hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ergo-navy-deep to-ergo-navy text-white font-bold flex items-center justify-center">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-ergo-navy-deep text-sm leading-tight flex items-center gap-1.5">
                      {review.author}
                      {review.verified && (
                        <span className="text-ergo-green group" title="Verified Buyer">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                          </svg>
                        </span>
                      )}
                    </h4>
                    <div className="text-yellow-400 text-xs mt-0.5">
                       {Array.from({ length: 5 }).map((_, i) => <span key={i}>{i < review.rating ? "★" : "☆"}</span>)}
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-ergo-muted">{review.date}</span>
              </div>
              <p className="text-ergo-text font-medium leading-relaxed mt-3">"{review.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
