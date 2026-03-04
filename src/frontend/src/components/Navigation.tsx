import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut } from "lucide-react";
import { getCurrentUser, logout, onAuthUserChanged } from "../lib/authStore";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(getCurrentUser());
  const navigate = useNavigate();
  const location = useLocation();

  // Re-render whenever Firebase auth state changes (including after refresh)
  useEffect(() => {
    return onAuthUserChanged((u) => setUser(u));
  }, []);

  const navigateAndClose = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigateAndClose("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navItems = [
    { label: "Home", path: "/" as const },
    { label: "About", path: "/about" as const },
    { label: "Courses", path: "/courses" as const },
    { label: "Faculty", path: "/faculty" as const },
    { label: "Gallery", path: "/gallery" as const },
    { label: "Competitions", path: "/competitions" as const },
    { label: "Certificates", path: "/certificates" as const },
    { label: "Admissions", path: "/admissions" as const },
    { label: "Contact", path: "/contact" as const },
  ];

  const adminItems = [
    { label: "Admin", path: "/admin" as const },
    { label: "Admin: Competitions", path: "/admin/competitions" as const },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-md border-b border-primary/20">
      <nav className="container mx-auto px-2 sm:px-3 py-2 sm:py-3 flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => navigateAndClose("/")}
          className="flex items-center hover:opacity-80 transition-opacity flex-shrink-0"
          title="Sur Taal Sangeet Academy"
        >
          <img 
            src="/image/logo.png" 
            alt="Sur Taal Sangeet Academy" 
            className="h-8 sm:h-10 md:h-12 w-auto object-contain"
          />
        </button>
        <p>Sur Taal Sangeet Academy</p>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => {
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={({ isActive }) =>
                `text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive ? "text-primary" : "text-foreground/80 hover:text-primary"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          {user && user.isAdmin &&
            adminItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={({ isActive }) =>
                  `text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive ? "text-primary" : "text-foreground/80 hover:text-primary"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

          {/* Auth Buttons */}
          {user ? (
            <div className="flex items-center gap-2 xl:gap-3 border-l border-primary/20 pl-2 xl:pl-4">
              <button
                onClick={() => navigateAndClose("/profile")}
                className="text-xs sm:text-sm font-medium text-primary hover:text-accent transition-colors whitespace-nowrap"
              >
                {user.name}
              </button>
              <Button
                onClick={handleLogout}
                size="sm"
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-500/10 h-7 text-xs px-2"
              >
                <LogOut size={14} />
              </Button>
            </div>
          ) : (
            <>
              <Button
                onClick={() => navigateAndClose("/login")}
                className="bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-full shadow-lg hover:from-accent hover:to-primary transition-all duration-200 h-8 text-sm px-5 border-2 border-primary"
              >
                Login
              </Button>
              <Button
                onClick={() => navigateAndClose("/signup")}
                className="bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-full shadow-lg hover:from-accent hover:to-primary transition-all duration-200 h-8 text-sm px-5 border-2 border-primary ml-2"
              >
                Sign Up
              </Button>
            </>
          )}

          {/* Enroll button removed as requested */}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-primary"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-primary/20">
          <div className="container mx-auto px-3 py-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigateAndClose(item.path)}
                className={`text-left transition-colors py-2 text-sm ${
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
                }`}
              >
                {item.label}
              </button>
            ))}
            {user && user.isAdmin &&
              adminItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigateAndClose(item.path)}
                  className={`text-left transition-colors py-2 text-sm ${
                    location.pathname === item.path
                      ? "text-primary"
                      : "text-foreground/80 hover:text-primary"
                  }`}
                >
                  {item.label}
                </button>
              ))}

            {/* Mobile Auth Section */}
            <div className="border-t border-primary/20 pt-3 mt-3">
              {user ? (
                <>
                  <button
                    onClick={() => navigateAndClose("/profile")}
                    className="w-full text-left py-2 text-sm text-primary font-medium"
                  >
                    Profile: {user.name}
                  </button>
                  <Button
                    onClick={handleLogout}
                    size="sm"
                    variant="outline"
                    className="w-full border-red-500 text-red-500 hover:bg-red-500/10 mt-2 text-xs"
                  >
                    <LogOut size={14} /> Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => navigateAndClose("/login")}
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary/10 mb-2 text-xs"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => navigateAndClose("/signup")}
                    className="w-full bg-primary text-primary-foreground hover:bg-accent text-xs"
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>

            <Button 
              onClick={() => navigateAndClose("/admissions")}
              className="w-full bg-primary text-primary-foreground hover:bg-accent text-xs mt-2"
            >
              Enroll Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
