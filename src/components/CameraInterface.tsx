import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, CameraOff, Users, UserCheck } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface DetectedFace {
  id: string;
  name: string;
  confidence: number;
  position: { x: number; y: number; width: number; height: number };
}

export const CameraInterface = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [detectedFaces, setDetectedFaces] = useState<DetectedFace[]>([]);
  const [attendanceMarked, setAttendanceMarked] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsStreaming(true);
        
        toast({
          title: "Camera Started",
          description: "Face detection is now active",
        });

        // Simulate face detection for demo
        setTimeout(() => {
          simulateFaceDetection();
        }, 2000);
      }
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsStreaming(false);
    setDetectedFaces([]);
    
    toast({
      title: "Camera Stopped",
      description: "Face detection has been disabled",
    });
  };

  const simulateFaceDetection = () => {
    // Simulate detecting known students
    const mockStudents = [
      { id: '1', name: 'Alice Johnson', confidence: 0.95 },
      { id: '2', name: 'Bob Smith', confidence: 0.89 },
      { id: '3', name: 'Carol Davis', confidence: 0.92 }
    ];

    const randomStudent = mockStudents[Math.floor(Math.random() * mockStudents.length)];
    
    const newFace: DetectedFace = {
      ...randomStudent,
      position: {
        x: Math.random() * 400 + 100,
        y: Math.random() * 300 + 100,
        width: 120,
        height: 150
      }
    };

    setDetectedFaces([newFace]);
    
    // Mark attendance automatically
    setTimeout(() => {
      markAttendance(newFace.id, newFace.name);
    }, 1500);
  };

  const markAttendance = (studentId: string, studentName: string) => {
    if (!attendanceMarked.includes(studentId)) {
      setAttendanceMarked(prev => [...prev, studentId]);
      
      toast({
        title: "Attendance Marked",
        description: `${studentName} has been marked present`,
      });

      // Clear detection after marking
      setTimeout(() => {
        setDetectedFaces([]);
        
        // Simulate next detection
        if (isStreaming) {
          setTimeout(simulateFaceDetection, 3000);
        }
      }, 2000);
    }
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Today's Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{attendanceMarked.length}</div>
            <p className="text-sm text-muted-foreground">Students Present</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-secondary" />
              Detection Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">95%</div>
            <p className="text-sm text-muted-foreground">Accuracy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Camera className="h-5 w-5 text-accent" />
              Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant={isStreaming ? "default" : "secondary"} className="text-sm">
              {isStreaming ? "Active" : "Inactive"}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Camera Feed */}
      <Card className="shadow-camera">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Live Camera Feed
            </span>
            <div className="flex gap-2">
              {!isStreaming ? (
                <Button onClick={startCamera} variant="default">
                  <Camera className="h-4 w-4 mr-2" />
                  Start Camera
                </Button>
              ) : (
                <Button onClick={stopCamera} variant="outline">
                  <CameraOff className="h-4 w-4 mr-2" />
                  Stop Camera
                </Button>
              )}
            </div>
          </CardTitle>
          <CardDescription>
            Real-time face detection and attendance marking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative bg-muted rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              muted
              className="w-full h-96 object-cover"
              style={{ maxHeight: '400px' }}
            />
            
            {/* Face Detection Overlays */}
            {detectedFaces.map((face) => (
              <div
                key={face.id}
                className="absolute border-2 border-primary rounded-lg animate-pulse-detection"
                style={{
                  left: `${face.position.x}px`,
                  top: `${face.position.y}px`,
                  width: `${face.position.width}px`,
                  height: `${face.position.height}px`,
                }}
              >
                <div className="absolute -top-8 left-0 bg-primary text-primary-foreground px-2 py-1 rounded text-sm font-medium">
                  {face.name} ({Math.round(face.confidence * 100)}%)
                </div>
              </div>
            ))}

            {!isStreaming && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
                <div className="text-center">
                  <Camera className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-medium text-muted-foreground">
                    Camera is not active
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Click "Start Camera" to begin face detection
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Attendance */}
      {attendanceMarked.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Attendance</CardTitle>
            <CardDescription>Students marked present today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {attendanceMarked.map((studentId, index) => (
                <div key={studentId} className="flex items-center justify-between p-3 bg-muted rounded-lg animate-slide-in">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                      <UserCheck className="h-4 w-4 text-secondary-foreground" />
                    </div>
                    <span className="font-medium">Student {studentId}</span>
                  </div>
                  <Badge variant="outline" className="bg-secondary/10 text-secondary">
                    Present
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};