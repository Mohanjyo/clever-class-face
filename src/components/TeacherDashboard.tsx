import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar,
  Users, 
  UserCheck, 
  UserX, 
  TrendingUp, 
  Clock,
  BookOpen,
  Award
} from 'lucide-react';

interface AttendanceRecord {
  date: string;
  present: number;
  total: number;
  percentage: number;
}

const mockAttendanceData: AttendanceRecord[] = [
  { date: 'Mon', present: 28, total: 30, percentage: 93 },
  { date: 'Tue', present: 30, total: 30, percentage: 100 },
  { date: 'Wed', present: 27, total: 30, percentage: 90 },
  { date: 'Thu', present: 29, total: 30, percentage: 97 },
  { date: 'Fri', present: 25, total: 30, percentage: 83 },
];

const classStats = {
  totalStudents: 30,
  presentToday: 25,
  absentToday: 5,
  averageAttendance: 92.6,
  onTimeArrivals: 23,
  lateArrivals: 2
};

export const TeacherDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classStats.totalStudents}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-secondary" />
              Present Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{classStats.presentToday}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <UserX className="h-4 w-4 text-destructive" />
              Absent Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{classStats.absentToday}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-accent" />
              Avg. Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{classStats.averageAttendance}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Attendance Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Weekly Attendance Overview
          </CardTitle>
          <CardDescription>
            Attendance tracking for the current week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAttendanceData.map((record) => (
              <div key={record.date} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{record.date}</span>
                  <div className="text-right">
                    <span className="text-sm font-medium">{record.present}/{record.total}</span>
                    <Badge 
                      variant={record.percentage >= 90 ? "default" : record.percentage >= 80 ? "secondary" : "destructive"}
                      className="ml-2"
                    >
                      {record.percentage}%
                    </Badge>
                  </div>
                </div>
                <Progress value={record.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Punctuality Report
            </CardTitle>
            <CardDescription>
              Today's arrival time analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">On Time</span>
              <span className="font-medium text-secondary">{classStats.onTimeArrivals} students</span>
            </div>
            <Progress value={(classStats.onTimeArrivals / classStats.presentToday) * 100} className="h-2" />
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Late Arrivals</span>
              <span className="font-medium text-accent">{classStats.lateArrivals} students</span>
            </div>
            <Progress value={(classStats.lateArrivals / classStats.presentToday) * 100} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Class Performance
            </CardTitle>
            <CardDescription>
              Overall attendance metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">A+</div>
              <p className="text-sm text-muted-foreground">Class Grade</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">This Week</span>
                <span className="font-medium">92.6%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">This Month</span>
                <span className="font-medium">89.3%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">This Semester</span>
                <span className="font-medium">91.8%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>
            Latest attendance events and system activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { time: '10:35 AM', event: 'Emma Brown marked present', type: 'success' },
              { time: '10:30 AM', event: 'Alice Johnson marked present', type: 'success' },
              { time: '10:25 AM', event: 'Bob Smith marked present', type: 'success' },
              { time: '10:20 AM', event: 'Class session started', type: 'info' },
              { time: '10:15 AM', event: 'Camera system activated', type: 'info' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 animate-slide-in">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-secondary' : 
                  activity.type === 'info' ? 'bg-primary' : 'bg-muted-foreground'
                }`} />
                <div className="flex-1">
                  <p className="text-sm">{activity.event}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};