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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
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
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length !== 10) {
      toast.error("Mobile number must be 10 digits");
      return false;
    }
    if (!acceptedTerms) {
      toast.error("Please accept the Terms & Conditions");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        course: formData.course,
      });
      toast.success("Account created successfully! Redirecting to registration form...");
      setTimeout(() => navigate("/admissions"), 800);
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
                  Phone (10 digits)
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  pattern="\d{10}"
                  maxLength={10}
                  placeholder="Enter 10 digit number"
                  value={formData.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setFormData((prev) => ({ ...prev, phone: value }));
                  }}
                  required
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
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-background border-primary/30 text-foreground placeholder-foreground/50 focus:border-accent focus:ring-accent pr-24"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-3 flex items-center text-sm font-semibold text-accent hover:text-accent/80"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="bg-background border-primary/30 text-foreground placeholder-foreground/50 focus:border-accent focus:ring-accent pr-24"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-3 flex items-center text-sm font-semibold text-accent hover:text-accent/80"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start gap-3">
                <input
                  id="terms"
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-primary/40 text-primary focus:ring-accent"
                  required
                />
                <Label htmlFor="terms" className="text-foreground/80 text-sm leading-relaxed">
                  I agree to the
                  {" "}
                  <button
                    type="button"
                    onClick={() => setShowTerms(true)}
                    className="text-accent hover:text-accent/80 font-semibold underline underline-offset-4"
                  >
                    Terms & Conditions
                  </button>
                  .
                </Label>
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

        {showTerms && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
            <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-primary/30 bg-card shadow-gold">
              <div className="flex items-center justify-between border-b border-primary/20 px-6 py-4">
                <h3 className="text-xl font-semibold text-primary">Terms & Conditions</h3>
                <button
                  type="button"
                  onClick={() => setShowTerms(false)}
                  className="text-foreground/70 hover:text-foreground"
                >
                  Close
                </button>
              </div>
              <div className="scrollbar-thin scrollbar-thumb-primary/40 scrollbar-track-transparent space-y-4 overflow-y-auto px-6 py-4 text-sm leading-relaxed text-foreground/90 flex-1">
                <p>
                  Sur Taal Sangeet Academy is an esteemed institution dedicated to nurturing musical talent with utmost care and attention. We offer a structured learning environment where students receive expert training in both classical and contemporary music, with the goal of developing them into professional performers.
                </p>
                <p className="font-semibold text-primary">Rules & Regulations – Sur Taal Sangeet Academy</p>
                <p>
                  By enrolling in Sur Taal Sangeet Academy (hereinafter referred to as “the school”), students and parents/guardians agree to abide by the following Rules & Regulations. Violation of any of these rules may result in disciplinary action, including dismissal from the program.
                </p>
                <ol className="list-decimal space-y-2 pl-6">
                  <li>
                    <span className="font-semibold">Attendance</span>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Regular attendance is mandatory for all students.</li>
                      <li>If a student is unable to attend a lesson, they must notify the instructor at least 24 hours in advance.</li>
                      <li>Absence for two consecutive weeks without prior notice may lead to review of enrolment.</li>
                    </ul>
                  </li>
                  <li>
                    <span className="font-semibold">Reporting Time</span>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Arrive at least 10 minutes before class and sign attendance at the start.</li>
                      <li>Late arrivals reduce available class time.</li>
                    </ul>
                  </li>
                  <li>
                    <span className="font-semibold">Practice</span>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Regular practice is expected; incomplete practice delays new assignments.</li>
                    </ul>
                  </li>
                  <li>
                    <span className="font-semibold">Behaviour & Discipline</span>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Maintain respect toward instructors and peers.</li>
                      <li>Keep mobile phones on silent during lessons.</li>
                      <li>Disruptive or disrespectful behavior is not tolerated.</li>
                    </ul>
                  </li>
                  <li>
                    <span className="font-semibold">Fees & Payment</span>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Fees are payable monthly in advance (cash or Phone Pay).</li>
                      <li>Late payments incur fines; unpaid fees beyond 10 days may bar class attendance.</li>
                      <li>Unpaid dues beyond 30 days may result in removal; re-admission requires clearing all dues and applicable fees.</li>
                      <li>Mid-month admissions pay from admission date; due date remains the same thereafter.</li>
                    </ul>
                  </li>
                  <li>
                    <span className="font-semibold">Communication Policy</span>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>No chatting or calls with other students without school permission.</li>
                      <li>Official WhatsApp groups are for academic communication only; respond within 6 hours.</li>
                      <li>Update status or share school content when instructed.</li>
                    </ul>
                  </li>
                  <li>
                    <span className="font-semibold">Performance & Events</span>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Opportunities for recitals, workshops, and events are provided; participation may be mandatory.</li>
                      <li>Uniform and travel costs are borne by students; paid performance terms may vary.</li>
                      <li>The school supports students creating personal albums.</li>
                    </ul>
                  </li>
                  <li>
                    <span className="font-semibold">Punctuality & Absenteeism</span>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Arriving 20+ minutes late without 48 hours’ notice marks the class as absent with no makeup.</li>
                      <li>Late/absent without notice is ineligible for rescheduling.</li>
                    </ul>
                  </li>
                  <li>
                    <span className="font-semibold">Study Materials</span>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Students procure their own books, instruments, and materials; bring the school diary to every class.</li>
                    </ul>
                  </li>
                  <li>
                    <span className="font-semibold">Safety & Conduct</span>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Follow safety guidelines; food and drinks are prohibited in classrooms.</li>
                      <li>Damage from negligence must be reimbursed.</li>
                    </ul>
                  </li>
                  <li>
                    <span className="font-semibold">Examinations & Evaluations</span>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Annual music exams are mandatory; certificates depend on performance.</li>
                      <li>Internal evaluations every three months; failure to pass may end enrolment.</li>
                    </ul>
                  </li>
                  <li>
                    <span className="font-semibold">Redressal & Disputes</span>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Approach the Discipline Committee for grievances; its decision is final.</li>
                    </ul>
                  </li>
                  <li>
                    <span className="font-semibold">Refund Policy</span>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Fees once paid are strictly non-refundable.</li>
                    </ul>
                  </li>
                  <li>
                    <span className="font-semibold">Online & Offline Classes</span>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Attendance in both online and offline classes is mandatory unless otherwise permitted by the school.</li>
                    </ul>
                  </li>
                </ol>
                <p>
                  At Sur Taal Sangeet Academy, we are committed to transforming our students into accomplished artists, equipped with the skills and knowledge necessary for success in the world of music.
                </p>
              </div>
              <div className="flex justify-end gap-3 border-t border-primary/20 px-6 py-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowTerms(false)}
                  className="text-foreground/80"
                >
                  Close
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setAcceptedTerms(true);
                    setShowTerms(false);
                  }}
                  className="bg-primary text-primary-foreground hover:bg-accent"
                >
                  Accept & Continue
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
  );
}
