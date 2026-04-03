export function TrustBar() {
  const trustItems = [
    {
      icon: "🚚",
      title: "Free Delivery",
      subtitle: "Over $50"
    },
    {
      icon: "↩️",
      title: "Easy Returns",
      subtitle: "30-day guarantee"
    },
    {
      icon: "🔒",
      title: "Secure Payment",
      subtitle: "100% protected"
    },
    {
      icon: "💬",
      title: "24/7 Support",
      subtitle: "Always here for you"
    }
  ];

  return (
    <section className="w-full bg-ergo-surface py-10 border-b border-ergo-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-x-0 md:divide-x divide-ergo-border/50">
          {trustItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center px-4">
              <span className="text-3xl md:text-4xl mb-3 filter drop-shadow-sm">{item.icon}</span>
              <h4 className="text-ergo-navy-deep font-bold text-sm md:text-base leading-tight mb-1">
                {item.title}
              </h4>
              <p className="text-ergo-muted text-xs md:text-sm font-medium">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
