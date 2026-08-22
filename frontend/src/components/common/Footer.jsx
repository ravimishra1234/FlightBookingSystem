import { Link } from 'react-router-dom';

const footerLinks = {
  'Our Network': ['South Asia', 'Middle East', 'Asia', 'Europe', 'North America'],
  'Book': ['Flights', 'Hotels ↗', 'Cars ↗', 'Travel Insurance'],
  'Manage': ['Change flights', 'Check-In', 'Extra baggage', 'Seat reservation', 'Refunds'],
  'Plan your trip': ['Travel requirements', 'Visa & permits', 'Baggage', 'Branded Fares'],
  'Experience': ['Business Class', 'Economy Class', 'In-flight Entertainment', 'Dining'],
  'Help': ['FAQ', 'Contact Us', 'Feedback', 'Lost & Found'],
};

const Footer = () => (
  <footer className="bg-white border-t border-gray-100">
    <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-14">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 mb-12">
        {/* Logo col */}
        <div className="col-span-2 lg:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <span className="text-2xl">✈</span>
            <span className="font-bold text-lg text-primary">
              Sky<span className="text-accent">Journey</span>
            </span>
          </Link>
          <p className="text-gray-400 text-xs leading-relaxed">
            Bengaluru's premium airline booking experience. Safe, reliable, luxurious.
          </p>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="text-sm font-bold text-primary mb-4">{title}</h4>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-gray-400 hover:text-accent transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-gray-400 text-xs">© 2025 SkyJourney. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="text-gray-400 text-xs hover:text-accent transition-colors">Privacy Policy</a>
          <a href="#" className="text-gray-400 text-xs hover:text-accent transition-colors">Terms of Use</a>
          <a href="#" className="text-gray-400 text-xs hover:text-accent transition-colors">Cookie Settings</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
