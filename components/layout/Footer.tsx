"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-ergo-border pt-14 pb-12 mt-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12 mb-12">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-1">
              <span className="text-2xl font-black tracking-tight text-ergo-navy-deep">
                Ergo
              </span>
              <span className="text-2xl font-black tracking-tight text-ergo-green">
                Aura
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
              UAE&apos;s premium destination for viral, high-quality dropshipping products. Designed to upgrade your home, health, and daily life.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-ergo-navy hover:border-ergo-navy transition-all shadow-sm">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-ergo-navy hover:border-ergo-navy transition-all shadow-sm">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-ergo-navy hover:border-ergo-navy transition-all shadow-sm">
                <span className="sr-only">TikTok</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.78-1.15 5.54-3.33 7.37-1.87 1.58-4.34 2.34-6.75 2.14-2.86-.25-5.5-1.74-7.23-3.95-1.75-2.26-2.5-5.26-1.92-8.08.62-3.08 2.68-5.74 5.38-7.14 2.22-1.16 4.8-1.5 7.22-1.07v4.18c-1.57-.49-3.39-.33-4.8.44-1.22.65-2.18 1.75-2.6 3.09-.44 1.4-.29 3.01.44 4.3.76 1.34 2.18 2.22 3.73 2.44 1.57.23 3.25-.13 4.54-1.1 1.21-.92 1.95-2.36 2.1-3.85.04-.38.05-.76.05-1.14v-14.53z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-4 md:px-8 shrink-0">
            <h3 className="font-bold text-ergo-text text-base">Quick Links</h3>
            <ul className="flex flex-col gap-3 text-sm text-gray-500">
              <li>
                <Link href="/collections/deals" className="hover:text-ergo-orange transition-colors">
                  Today&apos;s Deals
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-ergo-navy transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/pages/return-policy" className="hover:text-ergo-navy transition-colors">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link href="/pages/shipping" className="hover:text-ergo-navy transition-colors">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link href="/pages/contact" className="hover:text-ergo-navy transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-ergo-text text-base">Stay in the loop</h3>
            <p className="text-sm text-gray-500 mb-2">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form className="flex flex-col sm:flex-row gap-2" onSubmit={(e) => { e.preventDefault(); }}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                required
                className="w-full flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-ergo-navy focus:ring-1 focus:ring-ergo-navy text-sm shadow-sm"
              />
              <button 
                type="submit" 
                className="w-full sm:w-auto px-6 py-3 bg-ergo-navy hover:bg-ergo-navy-deep text-white font-bold rounded-xl text-sm transition-colors shadow-sm whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-ergo-border text-xs text-gray-400">
          <p>© {new Date().getFullYear()} ErgoAura LLC. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/pages/privacy" className="hover:text-ergo-text transition-colors">Privacy Policy</Link>
            <Link href="/pages/terms" className="hover:text-ergo-text transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
