import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { getCurrentUser, logout, type User } from "../lib/authStore";
import { toast } from "sonner";
import { LogOut, User as UserIcon } from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setUser(currentUser);
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    setTimeout(() => navigate("/"), 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-12 px-4">
        <div className="max-w-2xl mx-auto text-center text-foreground/70">
          Loading...
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 border border-primary/30 bg-card/50 shadow-gold">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-primary">
                My Profile
              </h1>
              <p className="text-foreground/70 mt-2">
                Manage your account information
              </p>
            </div>
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30">
              <UserIcon className="w-8 h-8 text-primary" />
            </div>
          </div>

          {/* User Information */}
          <div className="space-y-6 mb-8">
            {/* Full Name */}
            <div className="bg-card/50 border border-primary/20 rounded-lg p-4">
              <p className="text-foreground/60 text-sm uppercase tracking-wide">
                Full Name
              </p>
              <p className="text-primary text-lg font-semibold mt-1">
                {user.name}
              </p>
            </div>

            {/* Email */}
            <div className="bg-card/50 border border-primary/20 rounded-lg p-4">
              <p className="text-foreground/60 text-sm uppercase tracking-wide">
                Email
              </p>
              <p className="text-foreground text-lg font-semibold mt-1">
                {user.email}
              </p>
            </div>

            {/* Phone */}
            {user.phone && (
              <div className="bg-card/50 border border-primary/20 rounded-lg p-4">
                <p className="text-foreground/60 text-sm uppercase tracking-wide">
                  Phone
                </p>
                <p className="text-foreground text-lg font-semibold mt-1">
                  {user.phone}
                </p>
              </div>
            )}

            {/* Course */}
            {user.course && (
              <div className="bg-card/50 border border-primary/20 rounded-lg p-4">
                <p className="text-foreground/60 text-sm uppercase tracking-wide">
                  Interested Course
                </p>
                <p className="text-foreground text-lg font-semibold mt-1">
                  {user.course}
                </p>
              </div>
            )}

            {/* Member Since */}
            <div className="bg-card/50 border border-primary/20 rounded-lg p-4">
              <p className="text-foreground/60 text-sm uppercase tracking-wide">
                Member Since
              </p>
              <p className="text-foreground text-lg font-semibold mt-1">
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="flex-1 border-primary text-primary hover:bg-primary/10 font-semibold"
            >
              Back to Home
            </Button>
            <Button
              onClick={handleLogout}
              className="flex-1 bg-destructive text-destructive-foreground hover:bg-destructive/90 font-semibold flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
