import Header from '@/components/Header';
import Hero from '@/components/Hero';
import OurSpecialties from '@/components/OurSpecialties';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import { colors } from '@/constants/colors';

export default function Home() {
  return (
    <div 
      className="min-h-screen w-full"
      style={{ backgroundColor: colors.background }}
    >
      <Header />
      
      <main style={{ margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <Hero />
        </div>
        <OurSpecialties />
        <Testimonials />
      </main>
      
      <Footer />
    </div>
  );
}
