import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Camera, Upload, UserPlus, Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface StudentForm {
  firstName: string;
  lastName: string;
  studentId: string;
  email: string;
  grade: string;
  section: string;
  photo: string;
}

export const StudentRegistration = () => {
  const [form, setForm] = useState<StudentForm>({
    firstName: '',
    lastName: '',
    studentId: '',
    email: '',
    grade: '',
    section: '',
    photo: ''
  });
  
  const [isCapturing, setIsCapturing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!form.firstName || !form.lastName || !form.studentId || !form.grade) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Simulate saving student
    toast({
      title: "Student Registered",
      description: `${form.firstName} ${form.lastName} has been successfully registered`,
    });

    // Reset form
    setForm({
      firstName: '',
      lastName: '',
      studentId: '',
      email: '',
      grade: '',
      section: '',
      photo: ''
    });
  };

  const capturePhoto = async () => {
    setIsCapturing(true);
    
    try {
      // Simulate photo capture
      setTimeout(() => {
        setForm(prev => ({ ...prev, photo: '/placeholder.svg' }));
        setIsCapturing(false);
        
        toast({
          title: "Photo Captured",
          description: "Student photo has been captured successfully",
        });
      }, 2000);
    } catch (error) {
      setIsCapturing(false);
      toast({
        title: "Capture Failed",
        description: "Unable to capture photo. Please try again.",
        variant: "destructive",
      });
    }
  };

  const uploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setForm(prev => ({ ...prev, photo: e.target?.result as string }));
        toast({
          title: "Photo Uploaded",
          description: "Student photo has been uploaded successfully",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Register New Student
          </CardTitle>
          <CardDescription>
            Add a new student to the attendance system with face recognition setup
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Photo Section */}
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-32 h-32">
                <AvatarImage src={form.photo} alt="Student photo" />
                <AvatarFallback className="text-2xl">
                  {form.firstName?.[0]}{form.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={capturePhoto}
                  disabled={isCapturing}
                  className="flex items-center gap-2"
                >
                  <Camera className="h-4 w-4" />
                  {isCapturing ? 'Capturing...' : 'Capture Photo'}
                </Button>
                
                <label>
                  <Button type="button" variant="outline" className="flex items-center gap-2" asChild>
                    <span>
                      <Upload className="h-4 w-4" />
                      Upload Photo
                    </span>
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={uploadPhoto}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Student Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={form.firstName}
                  onChange={(e) => setForm(prev => ({ ...prev, firstName: e.target.value }))}
                  placeholder="Enter first name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={form.lastName}
                  onChange={(e) => setForm(prev => ({ ...prev, lastName: e.target.value }))}
                  placeholder="Enter last name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID *</Label>
                <Input
                  id="studentId"
                  value={form.studentId}
                  onChange={(e) => setForm(prev => ({ ...prev, studentId: e.target.value }))}
                  placeholder="Enter student ID"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter email address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="grade">Grade *</Label>
                <Select value={form.grade} onValueChange={(value) => setForm(prev => ({ ...prev, grade: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9">Grade 9</SelectItem>
                    <SelectItem value="10">Grade 10</SelectItem>
                    <SelectItem value="11">Grade 11</SelectItem>
                    <SelectItem value="12">Grade 12</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="section">Section</Label>
                <Select value={form.section} onValueChange={(value) => setForm(prev => ({ ...prev, section: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Section A</SelectItem>
                    <SelectItem value="B">Section B</SelectItem>
                    <SelectItem value="C">Section C</SelectItem>
                    <SelectItem value="D">Section D</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => setForm({
                firstName: '',
                lastName: '',
                studentId: '',
                email: '',
                grade: '',
                section: '',
                photo: ''
              })}>
                Clear Form
              </Button>
              <Button type="submit" className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Register Student
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};