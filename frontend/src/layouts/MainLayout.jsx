import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import AssistanceModal from '../components/common/AssistanceModal';
import ChatbotWidget from '../components/common/ChatbotWidget';
import useAssistanceTimer from '../hooks/useAssistanceTimer';
import { useFareAlertChecker } from '../hooks/useFareAlerts';
import { motion } from 'framer-motion';

const MainLayout = ({ children, hideFooter = false }) => {
  const { show, dismiss } = useAssistanceTimer(30000);
  useFareAlertChecker(); // silently checks active fare alerts a few seconds after any page loads

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex-1"
      >
        {children}
      </motion.main>
      {!hideFooter && <Footer />}
      <AssistanceModal show={show} onDismiss={dismiss} />
      <ChatbotWidget />
    </div>
  );
};

export default MainLayout;
