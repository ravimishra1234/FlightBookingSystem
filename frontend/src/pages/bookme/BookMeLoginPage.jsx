import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import BookMeNavbar from '../../components/bookme/BookMeNavbar';
import BookMeFooter from '../../components/bookme/BookMeFooter';

const BookMeLoginPage = () => {
  const [email, setEmail] = useState('');
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <BookMeNavbar />
      <div className="flex-1 flex items-center justify-center px-6 py-16" style={{ background: '#f5f5f5' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm w-full max-w-md p-8">
          <h1 className="text-2xl font-bold text-primary mb-2">Sign in or create an account</h1>
          <p className="text-sm text-gray-500 mb-6">It only takes a few seconds</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Email address</label>
              <input type="email" placeholder="Enter your email address" value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 text-sm text-primary rounded focus:outline-none focus:border-blue-500 placeholder:text-gray-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} placeholder="Enter your password"
                  className="w-full border border-gray-300 px-4 py-3 text-sm text-primary rounded focus:outline-none focus:border-blue-500 placeholder:text-gray-400 pr-12" />
                <button onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>
            <button className="w-full text-white font-bold py-3.5 text-sm rounded hover:opacity-90 transition-all" style={{ background: '#006ce4' }}>
              Continue
            </button>
          </div>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="space-y-3">
            <button className="w-full border border-gray-300 py-3 rounded text-sm font-medium text-primary hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
              <span className="text-base">G</span> Continue with Google
            </button>
            <button className="w-full border border-gray-300 py-3 rounded text-sm font-medium text-primary hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
              <span className="text-base">🍎</span> Continue with Apple
            </button>
          </div>

          <p className="text-xs text-gray-400 text-center mt-6">
            By signing in or creating an account, you agree with our{' '}
            <button className="underline hover:text-primary">Terms & conditions</button> and{' '}
            <button className="underline hover:text-primary">Privacy statement</button>
          </p>
          <p className="text-center text-sm mt-4">
            Don't have an account?{' '}
            <Link to="/bookme/register" className="font-medium hover:underline" style={{ color: '#006ce4' }}>Register</Link>
          </p>
        </motion.div>
      </div>
      <BookMeFooter />
    </div>
  );
};

export default BookMeLoginPage;
