import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigateAndClose = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems = [
    { label: "Home", path: "/" as const },
    { label: "About", path: "/about" as const },
    { label: "Courses", path: "/courses" as const },
    { label: "Faculty", path: "/faculty" as const },
    { label: "Gallery", path: "/gallery" as const },
    { label: "Certificates", path: "/certificates" as const },
    { label: "Admissions", path: "/admissions" as const },
    { label: "Contact", path: "/contact" as const },
    { label: "Admin", path: "/admin" as const },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/20">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => navigateAndClose("/")}
          className="text-2xl font-serif font-bold text-primary hover:text-accent transition-colors"
        >
          Sur Taal Sangeet Academy
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => {
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? "text-primary" : "text-foreground/80 hover:text-primary"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Button 
            onClick={() => navigateAndClose("/admissions")}
            className="bg-primary text-primary-foreground hover:bg-accent shadow-gold"
          >
            Enroll Now
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-primary"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-primary/20">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigateAndClose(item.path)}
                className={`text-left transition-colors py-2 ${
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button 
              onClick={() => navigateAndClose("/admissions")}
              className="bg-primary text-primary-foreground hover:bg-accent w-full"
            >
              Enroll Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
