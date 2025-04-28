
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { PlusCircle, Search, Edit, Trash2 } from "lucide-react";

interface Student {
  id: string;
  student_id: string;
  institution: string;
  program: string;
  grade_level: string;
  status: string;
  profile: {
    full_name: string;
    avatar_url: string | null;
  };
}

interface StudentFormValues {
  full_name: string;
  student_id: string;
  institution: string;
  program: string;
  grade_level: string;
  status: string;
}

export const StudentTable = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const { toast } = useToast();

  const form = useForm<StudentFormValues>({
    defaultValues: {
      full_name: "",
      student_id: "",
      institution: "",
      program: "",
      grade_level: "",
      status: "active",
    },
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (currentStudent) {
      form.reset({
        full_name: currentStudent.profile?.full_name || "",
        student_id: currentStudent.student_id,
        institution: currentStudent.institution || "",
        program: currentStudent.program || "",
        grade_level: currentStudent.grade_level || "",
        status: currentStudent.status || "active",
      });
    } else {
      form.reset({
        full_name: "",
        student_id: "",
        institution: "",
        program: "",
        grade_level: "",
        status: "active",
      });
    }
  }, [currentStudent, form]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("students")
        .select(`
          *,
          profile: profiles(full_name, avatar_url)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setStudents(data || []);
    } catch (error) {
      console.error("Error fetching students:", error);
      toast({
        title: "Error",
        description: "Failed to load students data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter((student) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      student.profile?.full_name?.toLowerCase().includes(searchLower) ||
      student.student_id?.toLowerCase().includes(searchLower) ||
      student.institution?.toLowerCase().includes(searchLower) ||
      student.program?.toLowerCase().includes(searchLower)
    );
  });

  const onSubmit = async (values: StudentFormValues) => {
    // This is a placeholder - in a real app, you would implement the creation/update logic
    // You would need to create auth user, profile, and student record
    toast({
      title: "Info",
      description: "Student management requires user authentication implementation",
    });
    setIsDialogOpen(false);
  };

  const handleEdit = (student: Student) => {
    setCurrentStudent(student);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    // This is a placeholder - in a real app with auth, you would implement delete logic
    toast({
      title: "Info",
      description: "Student deletion requires user authentication implementation",
    });
  };

  const handleAddNew = () => {
    setCurrentStudent(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Button onClick={handleAddNew}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Student
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-10">Loading students data...</div>
      ) : filteredStudents.length > 0 ? (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Student ID</TableHead>
                <TableHead>Institution</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Grade Level</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.profile?.full_name || "N/A"}</TableCell>
                  <TableCell>{student.student_id}</TableCell>
                  <TableCell>{student.institution}</TableCell>
                  <TableCell>{student.program}</TableCell>
                  <TableCell>{student.grade_level}</TableCell>
                  <TableCell>
                    <Badge variant={student.status === "active" ? "default" : "secondary"}>
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(student)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(student.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-10 border rounded-md bg-muted/20">
          No students found{searchQuery ? " matching your search" : ""}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {currentStudent ? "Edit Student" : "Add New Student"}
            </DialogTitle>
            <DialogDescription>
              {currentStudent
                ? "Update the details for this student"
                : "Enter the details for the new student"}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="student_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student ID</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="institution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institution</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="program"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="grade_level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grade Level</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit">
                  {currentStudent ? "Save Changes" : "Add Student"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
