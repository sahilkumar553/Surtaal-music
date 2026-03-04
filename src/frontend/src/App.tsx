import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState, type ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Courses } from "./components/Courses";
import { Faculty } from "./components/Faculty";
import { Gallery } from "./components/Gallery";
import { Certificates } from "./components/Certificates";
import { Competitions } from "./components/Competitions";
import { StudentsPerformance } from "./components/StudentsPerformance";
import { Admissions } from "./components/Admissions";
import { RegistrationForm } from "./components/RegistrationForm";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { WhatsAppFloat } from "./components/WhatsAppFloat";
import { AdminGallery } from "./components/AdminGallery";
import { AdminCompetitions } from "./components/AdminCompetitions";
import { AnalyticsTracker } from "./components/AnalyticsTracker";
import { SocialMedia } from "./components/SocialMedia";
import { ToneBanner } from "./components/ToneBanner";
import { initializeAuth, isAdmin, onAuthUserChanged, type User } from "./lib/authStore";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";

function HomePage() {
  return (
    <>
      <Hero />
      <About preview />
      <Courses showPricing={false} />
      <StudentsPerformance />
      <Competitions />
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

function AboutPage() {
  return (
    <>
      <About />
      <SocialMedia />
    </>
  );
}

function ContactPage() {
  return (
    <>
      <Contact />
    </>
  );
}

function RequireAdmin({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsub = onAuthUserChanged(() => {});
    initializeAuth().then((restored) => {
      setUser(restored);
      setReady(true);
    });
    return unsub;
  }, []);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center text-foreground/70">
        Loading...
      </div>
    );
  }

  if (!user || !isAdmin(user)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function App() {
  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <div className="min-h-screen bg-background">
        <AnalyticsTracker />
        <ToneBanner />
      <Navigation />
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/competitions" element={<Competitions />} />
          <Route path="/admissions" element={<AdmissionsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminGallery />
              </RequireAdmin>
            }
          />
          <Route
            path="/admin/competitions"
            element={
              <RequireAdmin>
                <AdminCompetitions />
              </RequireAdmin>
            }
          />
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