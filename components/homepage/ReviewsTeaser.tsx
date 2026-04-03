export function ReviewsTeaser() {
  // Mock data representing standard Judge.me API response structure
  const recentReviews = [
    {
      id: 1,
      author: "Ahmed M.",
      rating: 5,
      date: "2 days ago",
      text: "The quality is outstanding. Delivery to Dubai was super fast. Highly recommended!",
      verified: true
    },
    {
      id: 2,
      author: "Sarah K.",
      rating: 5,
      date: "1 week ago",
      text: "Exactly what I was looking for. The design is so sleek and modern.",
      verified: true
    },
    {
      id: 3,
      author: "Mohammed A.",
      rating: 5,
      date: "2 weeks ago",
      text: "Great customer service and the product is genuine. Will buy again.",
      verified: true
    }
  ];

  return (
    <section className="w-full py-12 md:py-16 bg-white border-b border-ergo-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-1 text-yellow-400 text-2xl lg:text-3xl mb-3">
            ★★★★★
          </div>
          <h2 className="text-xl md:text-3xl font-black text-ergo-navy-deep">
            Loved by 10,000+ customers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentReviews.map((review) => (
            <div key={review.id} className="bg-ergo-surface p-6 rounded-2xl border border-ergo-border/50 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-yellow-400 text-sm">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                  ))}
                </div>
                <span className="text-ergo-muted text-xs font-medium">{review.date}</span>
              </div>
              
              <p className="text-ergo-text text-sm md:text-base mb-6 flex-grow font-medium leading-relaxed">
                "{review.text}"
              </p>
              
              <div className="flex items-center gap-2 mt-auto">
                <div className="w-8 h-8 rounded-full bg-ergo-navy text-white flex items-center justify-center font-bold text-sm">
                  {review.author.charAt(0)}
                </div>
                <div>
                  <div className="text-ergo-navy-deep font-bold text-sm">{review.author}</div>
                  {review.verified && (
                    <div className="text-ergo-green text-[10px] font-bold uppercase flex items-center gap-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                        <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                      Verified Buyer
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
