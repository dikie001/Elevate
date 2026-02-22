import { BackButton } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { subjects } from "@/jsons/subjects";
import { saveUserDetails } from "@/utils/firebaseFunctions";
import { 
  User, 
  GraduationCap, 
  BookOpen, 
  Heart, 
  Hash, 
  Lock, 
  Save, 
  Loader2,
  ChevronDown,
  Eye,
  EyeOff,
  CheckCircle2
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface UserData {
  id: string;
  name: string;
  grade: string;
  username: string;
  pin: string;
  hobby: string;
  subjects: string[];
  loginCount: number;
}

export default function EditProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [formData, setFormData] = useState<UserData>({
    id: "",
    name: "",
    grade: "",
    username: "",
    pin: "",
    hobby: "",
    subjects: [],
    loginCount: 0,
  });

  const grades = {
    jss: ["Grade 7", "Grade 8", "Grade 9"],
    sss: ["Grade 10", "Grade 11", "Grade 12"],
  };

  useEffect(() => {
    // Load existing user data
    const userInfo = localStorage.getItem("user-info");
    if (userInfo) {
      const parsed = JSON.parse(userInfo);
      setFormData({
        id: parsed.id || "",
        name: parsed.name || "",
        grade: parsed.grade || "",
        username: parsed.username || "",
        pin: parsed.pin || "",
        hobby: parsed.hobby || "",
        subjects: parsed.subjects || [],
        loginCount: parsed.loginCount || 0,
      });
    }
  }, []);

  const handleInputChange = (field: keyof UserData, value: string | string[]) => {
    if (field === "pin" && typeof value === "string") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 4) return;
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubjectToggle = (subject: string) => {
    setFormData((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter((s) => s !== subject)
        : [...prev.subjects, subject],
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim() || formData.name.length < 3) {
      return toast.error("Please enter a valid name (at least 3 characters)");
    }
    if (!formData.grade) {
      return toast.error("Please select your grade");
    }
    if (!formData.username.trim() || formData.username.length < 3) {
      return toast.error("Please enter a valid username");
    }
    if (formData.pin.length !== 4) {
      return toast.error("PIN must be exactly 4 digits");
    }
    if (!formData.hobby.trim() || formData.hobby.length < 3) {
      return toast.error("Please enter a valid hobby");
    }
    if (formData.subjects.length === 0) {
      return toast.error("Please select at least one subject");
    }

    setLoading(true);
    try {
      // Save to localStorage
      localStorage.setItem("user-info", JSON.stringify(formData));
      
      // Save to Firebase
      await saveUserDetails(formData as any);
      
      toast.success("Profile updated successfully!");
      setTimeout(() => {
        navigate("/settings");
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = 
    formData.name.trim().length >= 3 &&
    formData.grade &&
    formData.username.trim().length >= 3 &&
    formData.pin.length === 4 &&
    formData.hobby.trim().length >= 3 &&
    formData.subjects.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <BackButton />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Edit Profile</h1>
            <p className="text-muted-foreground">Update your personal information</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Your basic details and account information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="e.g. Kamau Juma"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Grade */}
              <div className="space-y-2">
                <Label>Grade Level</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-between ${!formData.grade && "text-muted-foreground"}`}
                    >
                      <span className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4" />
                        {formData.grade || "Select Grade"}
                      </span>
                      <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full min-w-[400px]">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>Junior Secondary</DropdownMenuLabel>
                      {grades.jss.map((g) => (
                        <DropdownMenuItem
                          key={g}
                          onClick={() => handleInputChange("grade", g)}
                        >
                          {g}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>Senior Secondary</DropdownMenuLabel>
                      {grades.sss.map((g) => (
                        <DropdownMenuItem
                          key={g}
                          onClick={() => handleInputChange("grade", g)}
                        >
                          {g}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <Separator className="my-4" />

              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <Hash className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="username"
                    placeholder="e.g. kamau123"
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              {/* PIN */}
              <div className="space-y-2">
                <Label htmlFor="pin">4-Digit PIN</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="pin"
                    type={showPin ? "text" : "password"}
                    inputMode="numeric"
                    maxLength={4}
                    placeholder="****"
                    value={formData.pin}
                    onChange={(e) => handleInputChange("pin", e.target.value)}
                    className="pl-9 pr-10 font-mono tracking-widest"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-0 top-0 h-10 w-10"
                  >
                    {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Used for account security and login
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Academic Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Academic Preferences
              </CardTitle>
              <CardDescription>
                Select the subjects you're currently studying
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subjects.map((subject) => (
                  <div
                    key={subject}
                    className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors"
                  >
                    <Checkbox
                      id={`subject-${subject}`}
                      checked={formData.subjects.includes(subject)}
                      onCheckedChange={() => handleSubjectToggle(subject)}
                    />
                    <label
                      htmlFor={`subject-${subject}`}
                      className="flex-1 text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {subject}
                    </label>
                    {formData.subjects.includes(subject) && (
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    )}
                  </div>
                ))}
              </div>
              {formData.subjects.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  Selected {formData.subjects.length} subject{formData.subjects.length !== 1 ? "s" : ""}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Personal Interests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Personal Interests
              </CardTitle>
              <CardDescription>
                Tell us about what you enjoy doing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="hobby">Favorite Hobby</Label>
                <div className="relative">
                  <Heart className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="hobby"
                    list="hobbies"
                    placeholder="e.g., Reading, Gaming, Drawing"
                    value={formData.hobby}
                    onChange={(e) => handleInputChange("hobby", e.target.value)}
                    className="pl-9"
                  />
                  <datalist id="hobbies">
                    <option value="Playing Football" />
                    <option value="Reading" />
                    <option value="Drawing" />
                    <option value="Dancing" />
                    <option value="Coding" />
                    <option value="Gaming" />
                    <option value="Swimming" />
                    <option value="Music" />
                  </datalist>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end sticky bottom-4 bg-background p-4 border rounded-lg shadow-lg">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/settings")}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid || loading}
              className="min-w-[120px]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
