import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CameraInterface } from './CameraInterface';
import { StudentDashboard } from './StudentDashboard';
import { TeacherDashboard } from './TeacherDashboard';
import { StudentRegistration } from './StudentRegistration';
import { Camera, Users, UserCheck, UserPlus } from 'lucide-react';

export const AttendanceSystem = () => {
  const [activeTab, setActiveTab] = useState('camera');

  return (
    <div className="min-h-screen bg-gradient-camera">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Smart Attendance System
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Advanced face detection technology for automated classroom attendance tracking
          </p>
        </div>

        {/* Main Interface */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl">Attendance Management</CardTitle>
            <CardDescription>
              Manage student attendance with real-time face detection and recognition
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="camera" className="flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  Live Camera
                </TabsTrigger>
                <TabsTrigger value="register" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Register
                </TabsTrigger>
                <TabsTrigger value="students" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Students
                </TabsTrigger>
                <TabsTrigger value="teacher" className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4" />
                  Dashboard
                </TabsTrigger>
              </TabsList>

              <div className="mt-6">
                <TabsContent value="camera" className="space-y-4">
                  <CameraInterface />
                </TabsContent>

                <TabsContent value="register" className="space-y-4">
                  <StudentRegistration />
                </TabsContent>

                <TabsContent value="students" className="space-y-4">
                  <StudentDashboard />
                </TabsContent>

                <TabsContent value="teacher" className="space-y-4">
                  <TeacherDashboard />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};