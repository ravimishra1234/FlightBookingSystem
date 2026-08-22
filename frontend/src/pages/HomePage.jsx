import MainLayout from '../layouts/MainLayout';
import HeroSlider from '../components/hero/HeroSlider';
import FloatingSearchCard from '../components/booking/FloatingSearchCard';
import BestFaresSection from '../components/home/BestFaresSection';
import PlanTripSection from '../components/home/PlanTripSection';
import RedeemMilesSection from '../components/home/RedeemMilesSection';
import ExceptionalSection from '../components/home/ExceptionalSection';
import ExploreSection from '../components/home/ExploreSection';
import SubscribeSection from '../components/home/SubscribeSection';

const HomePage = () => (
  <MainLayout>
    <HeroSlider />
    <FloatingSearchCard />
    <BestFaresSection />
    <PlanTripSection />
    <RedeemMilesSection />
    <ExceptionalSection />
    <ExploreSection />
    <SubscribeSection />
  </MainLayout>
);

export default HomePage;
