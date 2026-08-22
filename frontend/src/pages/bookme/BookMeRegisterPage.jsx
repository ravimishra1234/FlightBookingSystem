import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BookMeNavbar from '../../components/bookme/BookMeNavbar';
import BookMeFooter from '../../components/bookme/BookMeFooter';

const BookMeRegisterPage = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <BookMeNavbar />
      <div className="flex-1 flex items-center justify-center px-6 py-16" style={{ background: '#f5f5f5' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm w-full max-w-md p-8">
          <h1 className="text-2xl font-bold text-primary mb-2">Create your account</h1>
          <p className="text-sm text-gray-500 mb-6">Sign up with your email address</p>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">First name</label>
                <input type="text" placeholder="First name" value={form.firstName}
                  onChange={e => setForm({ ...form, firstName: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-3 text-sm rounded focus:outline-none focus:border-blue-500 placeholder:text-gray-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">Last name</label>
                <input type="text" placeholder="Last name" value={form.lastName}
                  onChange={e => setForm({ ...form, lastName: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-3 text-sm rounded focus:outline-none focus:border-blue-500 placeholder:text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Email address</label>
              <input type="email" placeholder="Enter your email" value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full border border-gray-300 px-4 py-3 text-sm rounded focus:outline-none focus:border-blue-500 placeholder:text-gray-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Password</label>
              <input type="password" placeholder="Create a password" value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                className="w-full border border-gray-300 px-4 py-3 text-sm rounded focus:outline-none focus:border-blue-500 placeholder:text-gray-400" />
              <p className="text-xs text-gray-400 mt-1">Use 8+ characters with a mix of letters and numbers</p>
            </div>
            <button className="w-full text-white font-bold py-3.5 text-sm rounded hover:opacity-90 transition-all" style={{ background: '#006ce4' }}>
              Create account
            </button>
          </div>

          <p className="text-xs text-gray-400 text-center mt-5">
            By creating an account, you agree with our{' '}
            <button className="underline hover:text-primary">Terms & conditions</button> and{' '}
            <button className="underline hover:text-primary">Privacy statement</button>
          </p>
          <p className="text-center text-sm mt-4">
            Already have an account?{' '}
            <Link to="/bookme/login" className="font-medium hover:underline" style={{ color: '#006ce4' }}>Sign in</Link>
          </p>
        </motion.div>
      </div>
      <BookMeFooter />
    </div>
  );
};

export default BookMeRegisterPage;
