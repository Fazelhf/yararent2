import React, { useState } from 'react';
import { CARS_DATA } from './data/cars';
import { Car, BookingRequest, RentalType, CarCategory } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PopularCars } from './components/PopularCars';
import { WhyUs } from './components/WhyUs';
import { HowItWorks } from './components/HowItWorks';
import { FeaturedLuxurySection } from './components/FeaturedLuxurySection';
import { ServicesSection } from './components/ServicesSection';
import { TrustSection } from './components/TrustSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FAQSection } from './components/FAQSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { FloatingContact } from './components/FloatingContact';
import { CarsPage } from './components/CarsPage';
import { ServicesPage } from './components/ServicesPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { BookingModal } from './components/BookingModal';
import { VehicleDetailModal } from './components/VehicleDetailModal';
import { AdminDrawer } from './components/AdminDrawer';

export const App: React.FC = () => {
  // Navigation View State
  const [currentView, setCurrentView] = useState<'home' | 'cars' | 'services' | 'about' | 'contact' | 'faq'>('home');

  // Modal States
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedCarForBooking, setSelectedCarForBooking] = useState<Car | null>(null);
  const [detailModalCar, setDetailModalCar] = useState<Car | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Dynamic Fleet & Bookings State
  const [fleet, setFleet] = useState<Car[]>(CARS_DATA);
  const [bookings, setBookings] = useState<BookingRequest[]>([
    {
      id: 'MR-924182',
      carId: 'porsche-macan',
      carName: 'پورشه ماکان GTS',
      carImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      rentalType: 'without-driver',
      pickupCity: 'تهران - شعبه فرشته',
      returnCity: 'تهران - شعبه فرشته',
      pickupDate: '۱۴۰۳/۰۶/۲۸',
      returnDate: '۱۴۰۳/۰۷/۰۱',
      days: 3,
      insuranceTier: 'golden-cdw',
      customerName: 'محمدرضا سلطانی',
      customerPhone: '۰۹۱۲۲۳۳۴۴۵۵',
      nationalCode: '۰۰۱۲۳۴۵۶۷۸',
      notes: 'تحویل در پارکینگ برج فرشته رأس ساعت ۱۰ صبح',
      estimatedPrice: 70350000,
      depositAmount: 120000000,
      createdAt: '۱۴۰۳/۰۶/۲۴',
      status: 'pending'
    }
  ]);

  // Handle Search Widget from Hero
  const handleSearchSubmit = (searchParams: {
    city: string;
    pickupDate: string;
    returnDate: string;
    rentalType: RentalType;
  }) => {
    setCurrentView('cars');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select Car for Detail
  const handleSelectCar = (car: Car) => {
    setDetailModalCar(car);
  };

  // Trigger Booking flow for specific car
  const handleBookCar = (car: Car) => {
    setSelectedCarForBooking(car);
    setIsBookingOpen(true);
  };

  // Open generic booking
  const handleOpenGeneralBooking = () => {
    setSelectedCarForBooking(fleet[0]);
    setIsBookingOpen(true);
  };

  // Add newly created booking
  const handleBookingSubmitted = (newBooking: BookingRequest) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  // Admin Actions
  const handleToggleCarStock = (carId: string) => {
    setFleet((prev) =>
      prev.map((c) => (c.id === carId ? { ...c, inStock: !c.inStock } : c))
    );
  };

  const handleUpdateCarPrice = (carId: string, newPrice: number) => {
    setFleet((prev) =>
      prev.map((c) => (c.id === carId ? { ...c, dailyRate: newPrice } : c))
    );
  };

  const handleUpdateBookingStatus = (
    bookingId: string,
    status: 'approved' | 'rejected' | 'completed'
  ) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
    );
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view as any);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col selection:bg-[#D6B36A]/30 selection:text-white">
      {/* Top Glass Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenGeneralBooking}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content Area based on current view */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            {/* 01: Hero Section with 3D Car & Booking Search Widget */}
            <Hero
              onSearchSubmit={handleSearchSubmit}
              onExploreCars={() => handleNavigate('cars')}
              onOpenBooking={handleOpenGeneralBooking}
            />

            {/* 02: Popular Cars Horizontal Scroll Showcase */}
            <PopularCars
              cars={fleet}
              onSelectCar={handleSelectCar}
              onBookCar={handleBookCar}
              onViewAll={() => handleNavigate('cars')}
            />

            {/* 03: Why Mojtaba Rent (4 Pillars of Distinction) */}
            <WhyUs />

            {/* 04: How It Works (3 Steps to the Wheel) */}
            <HowItWorks onStartBooking={handleOpenGeneralBooking} />

            {/* 05: Featured Luxury Spotlight (Ultra-VIP collection) */}
            <FeaturedLuxurySection
              onSelectCar={handleSelectCar}
              onBookCar={handleBookCar}
            />

            {/* 06: Services Grid */}
            <ServicesSection
              onOpenBooking={handleOpenGeneralBooking}
              onNavigateToServices={() => handleNavigate('services')}
            />

            {/* 07: Trust & Track Record Statistics */}
            <TrustSection />

            {/* 08: Customer Reviews */}
            <ReviewsSection />

            {/* 09: FAQ Accordion */}
            <FAQSection />

            {/* 10: Final CTA */}
            <FinalCTA
              onExploreCars={() => handleNavigate('cars')}
              onContactUs={() => handleNavigate('contact')}
            />
          </>
        )}

        {currentView === 'cars' && (
          <CarsPage
            onSelectCar={handleSelectCar}
            onBookCar={handleBookCar}
          />
        )}

        {currentView === 'services' && (
          <ServicesPage
            onOpenBooking={handleOpenGeneralBooking}
            onContactUs={() => handleNavigate('contact')}
          />
        )}

        {currentView === 'about' && (
          <AboutPage
            onExploreCars={() => handleNavigate('cars')}
            onContactUs={() => handleNavigate('contact')}
          />
        )}

        {currentView === 'contact' && <ContactPage />}

        {currentView === 'faq' && (
          <div className="pt-24">
            <FAQSection />
          </div>
        )}
      </main>

      {/* Luxury Minimalist Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenGeneralBooking}
      />

      {/* Floating Action Menu + Mobile Sticky Bottom Bar */}
      <FloatingContact onOpenBooking={handleOpenGeneralBooking} />

      {/* 6-Step Guided Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedCar={selectedCarForBooking}
        onBookingSubmitted={handleBookingSubmitted}
      />

      {/* Vehicle In-Depth Specs & Terms Modal */}
      <VehicleDetailModal
        car={detailModalCar}
        onClose={() => setDetailModalCar(null)}
        onBookNow={handleBookCar}
      />

      {/* Admin Panel Drawer for Fleet & Reservations */}
      <AdminDrawer
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        cars={fleet}
        bookings={bookings}
        onToggleCarStock={handleToggleCarStock}
        onUpdateCarPrice={handleUpdateCarPrice}
        onUpdateBookingStatus={handleUpdateBookingStatus}
      />
    </div>
  );
};

export default App;
