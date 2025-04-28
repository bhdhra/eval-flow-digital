
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Clock, Check, AlertTriangle, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

// Define types for our evaluations
interface PendingEvaluation {
  id: string;
  title: string;
  course: string;
  student: string;
  dateAssigned: string;
  deadline: string;
  type: string;
  isUrgent?: boolean;
}

interface CompletedEvaluation {
  id: string;
  title: string;
  course: string;
  student: string;
  dateEvaluated: string;
  grade: string;
  score: string;
}

const Evaluations = () => {
  // State for the evaluation dialog
  const [isEvaluationDialogOpen, setIsEvaluationDialogOpen] = useState(false);
  const [currentEvaluation, setCurrentEvaluation] = useState<PendingEvaluation | null>(null);
  const [grade, setGrade] = useState("B");
  const [score, setScore] = useState("85");
  const [comments, setComments] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock evaluation data
  const [pendingEvaluations, setPendingEvaluations] = useState<PendingEvaluation[]>([
    {
      id: "SUB-2023-001",
      title: "Final Project",
      course: "Advanced Mathematics",
      student: "John Doe",
      dateAssigned: "2023-04-27",
      deadline: "2023-05-05",
      type: "PDF Document",
    },
    {
      id: "SUB-2023-003",
      title: "Lab Report",
      course: "Physics",
      student: "Robert Brown",
      dateAssigned: "2023-04-26",
      deadline: "2023-05-03",
      type: "Word Document",
    },
    {
      id: "SUB-2023-005",
      title: "Case Study",
      course: "Business Administration",
      student: "Michael Wilson",
      dateAssigned: "2023-04-25",
      deadline: "2023-05-02",
      type: "PDF Document",
    },
    {
      id: "SUB-2023-007",
      title: "Term Paper",
      course: "History",
      student: "William Taylor",
      dateAssigned: "2023-04-24",
      deadline: "2023-05-01",
      type: "PDF Document",
      isUrgent: true,
    },
  ]);

  const [completedEvaluations, setCompletedEvaluations] = useState<CompletedEvaluation[]>([
    {
      id: "SUB-2023-002",
      title: "Programming Assignment",
      course: "Computer Science",
      student: "Jane Smith",
      dateEvaluated: "2023-04-28",
      grade: "A",
      score: "92/100",
    },
    {
      id: "SUB-2023-004",
      title: "Research Paper",
      course: "Chemistry",
      student: "Alice Johnson",
      dateEvaluated: "2023-04-27",
      grade: "B+",
      score: "87/100",
    },
    {
      id: "SUB-2023-006",
      title: "Essay",
      course: "English Literature",
      student: "Emily Davis",
      dateEvaluated: "2023-04-26",
      grade: "A-",
      score: "90/100",
    },
  ]);

  // Function to handle opening the evaluation dialog
  const handleEvaluate = (evaluation: PendingEvaluation) => {
    setCurrentEvaluation(evaluation);
    setIsEvaluationDialogOpen(true);
  };

  // Function to handle submission of an evaluation
  const handleSubmitEvaluation = () => {
    if (!currentEvaluation) return;

    // Create a new completed evaluation
    const newCompletedEvaluation: CompletedEvaluation = {
      id: currentEvaluation.id,
      title: currentEvaluation.title,
      course: currentEvaluation.course,
      student: currentEvaluation.student,
      dateEvaluated: new Date().toISOString().split('T')[0],
      grade: grade,
      score: `${score}/100`,
    };

    // Add to completed evaluations
    setCompletedEvaluations([newCompletedEvaluation, ...completedEvaluations]);

    // Remove from pending evaluations
    setPendingEvaluations(pendingEvaluations.filter(e => e.id !== currentEvaluation.id));

    // Close the dialog and reset the form
    setIsEvaluationDialogOpen(false);
    setCurrentEvaluation(null);
    setGrade("B");
    setScore("85");
    setComments("");

    // Show a success toast
    toast.success("Evaluation submitted successfully!");
  };

  // Filter evaluations based on search query
  const filteredPendingEvaluations = pendingEvaluations.filter(
    (eval) =>
      eval.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eval.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eval.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eval.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCompletedEvaluations = completedEvaluations.filter(
    (eval) =>
      eval.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eval.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eval.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eval.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Evaluations</h1>
          <Button>Start New Evaluation</Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>My Evaluations</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pending" className="w-full">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <TabsList>
                  <TabsTrigger value="pending" className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    Pending
                    <Badge variant="secondary" className="ml-2">
                      {filteredPendingEvaluations.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="completed" className="flex items-center">
                    <Check className="mr-2 h-4 w-4" />
                    Completed
                    <Badge variant="secondary" className="ml-2">
                      {filteredCompletedEvaluations.length}
                    </Badge>
                  </TabsTrigger>
                </TabsList>

                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search evaluations..."
                    className="pl-10 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <TabsContent value="pending" className="mt-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead>Assigned</TableHead>
                        <TableHead>Deadline</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="text-right"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPendingEvaluations.map((evaluation) => (
                        <TableRow key={evaluation.id} className="hover:bg-muted/50">
                          <TableCell>{evaluation.id}</TableCell>
                          <TableCell className="font-medium flex items-center">
                            {evaluation.isUrgent && (
                              <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                            )}
                            {evaluation.title}
                          </TableCell>
                          <TableCell>{evaluation.course}</TableCell>
                          <TableCell>{evaluation.student}</TableCell>
                          <TableCell>{evaluation.dateAssigned}</TableCell>
                          <TableCell>{evaluation.deadline}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{evaluation.type}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button size="sm" onClick={() => handleEvaluate(evaluation)}>
                              Evaluate
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="completed" className="mt-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead>Date Evaluated</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead className="text-right"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCompletedEvaluations.map((evaluation) => (
                        <TableRow key={evaluation.id} className="hover:bg-muted/50">
                          <TableCell>{evaluation.id}</TableCell>
                          <TableCell className="font-medium">{evaluation.title}</TableCell>
                          <TableCell>{evaluation.course}</TableCell>
                          <TableCell>{evaluation.student}</TableCell>
                          <TableCell>{evaluation.dateEvaluated}</TableCell>
                          <TableCell>
                            <Badge
                              className={`${
                                evaluation.grade.startsWith("A")
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : evaluation.grade.startsWith("B")
                                  ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                  : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                              }`}
                              variant="secondary"
                            >
                              {evaluation.grade}
                            </Badge>
                          </TableCell>
                          <TableCell>{evaluation.score}</TableCell>
                          <TableCell className="text-right">
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Evaluation Dialog */}
      <Dialog open={isEvaluationDialogOpen} onOpenChange={setIsEvaluationDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Evaluate Submission</DialogTitle>
            <DialogDescription>
              {currentEvaluation && (
                <div className="flex items-center mt-2">
                  <FileText className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">{currentEvaluation.title}</span>
                  <span className="mx-2 text-muted-foreground">•</span>
                  <span>{currentEvaluation.student}</span>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="grade" className="text-sm font-medium">
                  Grade
                </label>
                <select
                  id="grade"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                >
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="B-">B-</option>
                  <option value="C+">C+</option>
                  <option value="C">C</option>
                  <option value="C-">C-</option>
                  <option value="D">D</option>
                  <option value="F">F</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="score" className="text-sm font-medium">
                  Score (out of 100)
                </label>
                <Input
                  id="score"
                  type="number"
                  min="0"
                  max="100"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="comments" className="text-sm font-medium">
                Feedback Comments
              </label>
              <textarea
                id="comments"
                className="h-32 w-full rounded-md border border-input bg-background px-3 py-2"
                placeholder="Provide detailed feedback on the submission..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEvaluationDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmitEvaluation}>Submit Evaluation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Evaluations;
