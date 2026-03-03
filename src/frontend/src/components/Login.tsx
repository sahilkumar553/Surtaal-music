import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { login, sendPasswordReset } from "../lib/authStore";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return false;
    }
    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email");
      return false;
    }
    if (!formData.password) {
      toast.error("Please enter your password");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await login(formData.email, formData.password);
      toast.success("Logged in successfully!");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Login failed. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      await login("demo@surtaal.com", "demo123456");
      toast.success("Demo login successful!");
      setTimeout(() => navigate("/"), 1500);
    } catch {
      toast.error("Demo account not found. Please sign up first.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (!formData.email.trim()) {
      toast.error("Enter your email first");
      return;
    }
    try {
      await sendPasswordReset(formData.email);
      toast.success("Password reset email sent.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not send reset email");
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4">
      <div className="max-w-md mx-auto">
        <Card className="p-8 border border-primary/30 bg-card/50 shadow-gold">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-primary mb-2">
              Login
            </h1>
            <p className="text-foreground/70">
              Welcome back to Sur Taal Sangeet Academy
            </p>
          </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-background border-primary/30 text-foreground placeholder-foreground/50 focus:border-accent focus:ring-accent"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-background border-primary/30 text-foreground placeholder-foreground/50 focus:border-accent focus:ring-accent"
                />
                <div className="text-right">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs text-accent hover:text-accent/80"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground font-semibold py-2 rounded-lg transition duration-300"
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>

            {/* Demo Button */}
            <div className="mt-4">
              <Button
                onClick={handleDemoLogin}
                disabled={loading}
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary/10 font-semibold"
              >
                Try Demo Account
              </Button>
              <p className="text-xs text-foreground/50 mt-2 text-center">
                Demo: demo@surtaal.com / demo123456
              </p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-foreground/70">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/signup")}
                  className="text-accent hover:text-accent/80 font-semibold transition"
                >
                  Sign up here
                </button>
              </p>
            </div>
          </Card>
        </div>
      </div>
  );
}
