import { Link } from 'react-router-dom';

const footerCols = {
  Support: ['Manage your trips', 'Contact Customer Service', 'Safety resource centre'],
  Discover: ['Genius loyalty programme', 'Seasonal and holiday deals', 'Travel articles', 'BookMe.com for Business', 'Traveller Review Awards'],
  'Terms and settings': ['Privacy Notice', 'Terms of Service', 'Accessibility Statement', 'Grievance officer'],
  Partners: ['Extranet login', 'Partner help', 'List your property', 'Become an affiliate'],
  About: ['About BookMe.com', 'How we work', 'Sustainability', 'Press centre', 'Careers'],
};

const BookMeFooter = () => (
  <footer style={{ background: '#f5f5f5' }}>
    <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-12">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
        {Object.entries(footerCols).map(([title, links]) => (
          <div key={title}>
            <h4 className="text-primary font-bold text-sm mb-4">{title}</h4>
            <ul className="space-y-3">
              {links.map(link => (
                <li key={link}>
                  <a href="#" className="text-gray-700 text-sm hover:underline">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 mb-8">
        <span className="text-base">🇮🇳</span>
        <span className="text-sm font-medium text-primary">INR</span>
      </div>

      <div className="border-t border-gray-200 pt-6 text-center">
        <p className="text-xs text-gray-500 mb-1">
          BookMe.com is part of SkyJourney Holdings, in partnership with the world's leading travel network.
        </p>
        <p className="text-xs text-gray-500 mb-6">Copyright © 1996–2026 BookMe.com™. All rights reserved.</p>
        <div className="flex items-center justify-center gap-8 flex-wrap mb-6">
          <span className="font-bold text-base" style={{ color: '#003580' }}>BookMe<span className="text-yellow-500">.</span>com</span>
          <span className="font-semibold text-sm text-blue-500">priceline<sup>®</sup></span>
          <span className="font-bold text-sm bg-orange-500 text-white px-2 py-1 rounded">KAYAK</span>
          <span className="font-semibold text-sm text-gray-700">agoda</span>
          <span className="font-semibold text-sm text-red-500">● OpenTable</span>
        </div>
        <Link to="/" className="text-xs hover:underline" style={{ color: '#006ce4' }}>← Back to SkyJourney</Link>
      </div>
    </div>
  </footer>
);

export default BookMeFooter;
