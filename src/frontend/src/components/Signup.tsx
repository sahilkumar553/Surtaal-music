import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { signup } from "../lib/authStore";
import { toast } from "sonner";

// Get courses from the Courses component
const courses = [
  "Vocal Training",
  "Tabla",
  "Harmonium",
  "Guitar",
  "Keyboard",
  "Classical Dance",
  "Bollywood Dance",
];

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    course: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return false;
    }
    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email");
      return false;
    }
    if (!formData.password) {
      toast.error("Please enter a password");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        course: formData.course,
      });
      toast.success("Account created successfully!");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Signup failed. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4">
      <div className="max-w-md mx-auto">
        <Card className="p-8 border border-primary/30 bg-card/50 shadow-gold">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-primary mb-2">
              Sign Up
            </h1>
            <p className="text-foreground/70">
              Join Sur Taal Sangeet Academy
            </p>
          </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-background border-primary/30 text-foreground placeholder-foreground/50 focus:border-accent focus:ring-accent"
                />
              </div>

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

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground">
                  Phone (Optional)
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-background border-primary/30 text-foreground placeholder-foreground/50 focus:border-accent focus:ring-accent"
                />
              </div>

              {/* Course */}
              <div className="space-y-2">
                <Label htmlFor="course" className="text-foreground">
                  Interested Course (Optional)
                </Label>
                <select
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-background border border-primary/30 text-foreground rounded-md focus:border-accent focus:ring-1 focus:ring-accent cursor-pointer"
                >
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
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
                  placeholder="At least 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-background border-primary/30 text-foreground placeholder-foreground/50 focus:border-accent focus:ring-accent"
                />
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="bg-background border-primary/30 text-foreground placeholder-foreground/50 focus:border-accent focus:ring-accent"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground font-semibold py-2 rounded-lg transition duration-300"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-foreground/70">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-accent hover:text-accent/80 font-semibold transition"
                >
                  Login here
                </button>
              </p>
            </div>
          </Card>
        </div>
      </div>
  );
}
