import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Courses } from "./components/Courses";
import { Faculty } from "./components/Faculty";
import { StudentsPerformance } from "./components/StudentsPerformance";
import { Gallery } from "./components/Gallery";
import { Certificates } from "./components/Certificates";
import { Admissions } from "./components/Admissions";
import { RegistrationForm } from "./components/RegistrationForm";
import { Testimonials } from "./components/Testimonials";
import { SocialMedia } from "./components/SocialMedia";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { WhatsAppFloat } from "./components/WhatsAppFloat";
import { AdminGallery } from "./components/AdminGallery";
import { AnalyticsTracker } from "./components/AnalyticsTracker";

function HomePage() {
  return (
    <>
      <Hero />
      <About preview />
      <Courses />
      <StudentsPerformance />
      <Gallery />
      <Certificates />
      <Testimonials />
      <Admissions />
    </>
  );
}

function AdmissionsPage() {
  return (
    <>
      <Admissions />
      <RegistrationForm />
    </>
  );
}

function ContactPage() {
  return (
    <>
      <Contact />
      <SocialMedia />
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-background">
      <AnalyticsTracker />
      <Navigation />
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/admissions" element={<AdmissionsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminGallery />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
      <WhatsAppFloat />
      
      <Toaster 
        theme="light" 
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'oklch(var(--card))',
            border: '1px solid oklch(var(--primary) / 0.2)',
            color: 'oklch(var(--foreground))',
          },
        }}
      />
    </div>
  );
}

export default App;
