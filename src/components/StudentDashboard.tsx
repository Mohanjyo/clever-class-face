import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Users, UserCheck, UserX, Edit, Trash2 } from 'lucide-react';

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  studentId: string;
  email: string;
  grade: string;
  section: string;
  photo?: string;
  isPresent: boolean;
  lastSeen?: string;
}

const mockStudents: Student[] = [
  {
    id: '1',
    firstName: 'Alice',
    lastName: 'Johnson',
    studentId: 'ST001',
    email: 'alice.johnson@school.edu',
    grade: '11',
    section: 'A',
    isPresent: true,
    lastSeen: '10:30 AM'
  },
  {
    id: '2',
    firstName: 'Bob',
    lastName: 'Smith',
    studentId: 'ST002',
    email: 'bob.smith@school.edu',
    grade: '11',
    section: 'A',
    isPresent: true,
    lastSeen: '10:25 AM'
  },
  {
    id: '3',
    firstName: 'Carol',
    lastName: 'Davis',
    studentId: 'ST003',
    email: 'carol.davis@school.edu',
    grade: '11',
    section: 'B',
    isPresent: false,
    lastSeen: 'Yesterday'
  },
  {
    id: '4',
    firstName: 'David',
    lastName: 'Wilson',
    studentId: 'ST004',
    email: 'david.wilson@school.edu',
    grade: '10',
    section: 'A',
    isPresent: false,
    lastSeen: '2 days ago'
  },
  {
    id: '5',
    firstName: 'Emma',
    lastName: 'Brown',
    studentId: 'ST005',
    email: 'emma.brown@school.edu',
    grade: '12',
    section: 'C',
    isPresent: true,
    lastSeen: '10:35 AM'
  }
];

export const StudentDashboard = () => {
  const [students] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'present' | 'absent'>('all');

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filterStatus === 'all' ||
      (filterStatus === 'present' && student.isPresent) ||
      (filterStatus === 'absent' && !student.isPresent);
    
    return matchesSearch && matchesFilter;
  });

  const presentCount = students.filter(s => s.isPresent).length;
  const absentCount = students.filter(s => !s.isPresent).length;

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-secondary" />
              Present Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{presentCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <UserX className="h-5 w-5 text-destructive" />
              Absent Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{absentCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Student Management</CardTitle>
          <CardDescription>View and manage all registered students</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, ID, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('all')}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={filterStatus === 'present' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('present')}
                size="sm"
              >
                Present
              </Button>
              <Button
                variant={filterStatus === 'absent' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('absent')}
                size="sm"
              >
                Absent
              </Button>
            </div>
          </div>

          {/* Student List */}
          <div className="space-y-3">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors animate-slide-in"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={student.photo} alt={`${student.firstName} ${student.lastName}`} />
                    <AvatarFallback>
                      {student.firstName[0]}{student.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium">
                        {student.firstName} {student.lastName}
                      </h3>
                      <Badge variant={student.isPresent ? 'default' : 'secondary'}>
                        {student.isPresent ? 'Present' : 'Absent'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>ID: {student.studentId}</span>
                      <span>Grade {student.grade}-{student.section}</span>
                      {student.lastSeen && (
                        <span>Last seen: {student.lastSeen}</span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {student.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            {filteredStudents.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground">No students found</h3>
                <p className="text-sm text-muted-foreground">
                  {searchTerm ? 'Try adjusting your search criteria' : 'No students match the current filter'}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};