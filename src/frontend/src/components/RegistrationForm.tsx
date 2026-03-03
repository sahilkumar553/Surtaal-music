import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser"; // FIXED import
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";

export function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    courseInterest: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.courseInterest) {
      toast.error("Please fill in all required fields");
      return;
    }

    // EmailJS config
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const userId = import.meta.env.VITE_EMAILJS_USER_ID;

    if (!serviceId || !templateId || !userId) {
      toast.error("Email service is not configured yet. Please try again later.");
      return;
    }

    setIsSubmitting(true);

    // Prepare template params
    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      course_interest: formData.courseInterest,
      message: formData.message,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, userId);
      toast.success("Registration details sent to Director's email.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        courseInterest: "",
        message: "",
      });
    } catch (error) {
      toast.error("Could not send registration email.");
      console.error("EmailJS error:", error);
    }
    setIsSubmitting(false);
  };

  const courses = [
    "Vocal Music (Classical)",
    "Vocal Music (Light Music)",
    "Tabla",
    "Guitar",
    "Classical Dance",
    "Bollywood Dance",
    "Folk Dance",
    "Semi-Classical Dance",
  ];

  return (
    <section id="registration" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-card/50 border-primary/20 shadow-gold-lg">
            <CardHeader className="text-center border-b border-primary/20">
              <div className="inline-block p-3 bg-primary/10 rounded-full border border-primary/30 mb-4 mx-auto">
                <Send className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                Registration <span className="text-primary">Form</span>
              </CardTitle>
              <p className="text-foreground/70 mt-2">
                Fill in your details and we'll get back to you shortly
              </p>
            </CardHeader>
            
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">
                    Full Name <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-background border-primary/30 focus:border-primary text-foreground"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    Email <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-background border-primary/30 focus:border-primary text-foreground"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">
                    Phone Number <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-background border-primary/30 focus:border-primary text-foreground"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                {/* Course Interest */}
                <div className="space-y-2">
                  <Label htmlFor="course" className="text-foreground">
                    Course Interest <span className="text-primary">*</span>
                  </Label>
                  <Select
                    value={formData.courseInterest}
                    onValueChange={(value) => setFormData({ ...formData, courseInterest: value })}
                    required
                  >
                    <SelectTrigger 
                      id="course"
                      className="bg-background border-primary/30 focus:border-primary text-foreground"
                    >
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-primary/30">
                      {courses.map((course) => (
                        <SelectItem key={course} value={course} className="focus:bg-primary/20">
                          {course}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground">
                    Message (Optional)
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-background border-primary/30 focus:border-primary text-foreground min-h-32"
                    placeholder="Any questions or special requirements?"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-accent text-lg py-6 shadow-gold-lg disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Submit Registration
                    </>
                  )}
                </Button>

                <p className="text-sm text-center text-foreground/60">
                  By submitting this form, you agree to be contacted by our team
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
