
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Clock, Check, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Evaluations = () => {
  // Mock evaluation data
  const pendingEvaluations = [
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
  ];

  const completedEvaluations = [
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
  ];

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
                      {pendingEvaluations.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="completed" className="flex items-center">
                    <Check className="mr-2 h-4 w-4" />
                    Completed
                    <Badge variant="secondary" className="ml-2">
                      {completedEvaluations.length}
                    </Badge>
                  </TabsTrigger>
                </TabsList>

                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search evaluations..."
                    className="pl-10 w-full"
                  />
                </div>
              </div>

              <TabsContent value="pending" className="mt-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr>
                        <th className="text-left py-3 px-4 text-sm">ID</th>
                        <th className="text-left py-3 px-4 text-sm">Title</th>
                        <th className="text-left py-3 px-4 text-sm">Course</th>
                        <th className="text-left py-3 px-4 text-sm">Student</th>
                        <th className="text-left py-3 px-4 text-sm">Assigned</th>
                        <th className="text-left py-3 px-4 text-sm">Deadline</th>
                        <th className="text-left py-3 px-4 text-sm">Type</th>
                        <th className="text-right py-3 px-4 text-sm"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingEvaluations.map((evaluation, index) => (
                        <tr key={index} className="hover:bg-muted/50">
                          <td className="py-3 px-4 text-sm">{evaluation.id}</td>
                          <td className="py-3 px-4 text-sm font-medium flex items-center">
                            {evaluation.isUrgent && (
                              <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                            )}
                            {evaluation.title}
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {evaluation.course}
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {evaluation.student}
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {evaluation.dateAssigned}
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {evaluation.deadline}
                          </td>
                          <td className="py-3 px-4 text-sm">
                            <Badge variant="outline">{evaluation.type}</Badge>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button size="sm">Evaluate</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="completed" className="mt-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr>
                        <th className="text-left py-3 px-4 text-sm">ID</th>
                        <th className="text-left py-3 px-4 text-sm">Title</th>
                        <th className="text-left py-3 px-4 text-sm">Course</th>
                        <th className="text-left py-3 px-4 text-sm">Student</th>
                        <th className="text-left py-3 px-4 text-sm">
                          Date Evaluated
                        </th>
                        <th className="text-left py-3 px-4 text-sm">Grade</th>
                        <th className="text-left py-3 px-4 text-sm">Score</th>
                        <th className="text-right py-3 px-4 text-sm"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {completedEvaluations.map((evaluation, index) => (
                        <tr key={index} className="hover:bg-muted/50">
                          <td className="py-3 px-4 text-sm">{evaluation.id}</td>
                          <td className="py-3 px-4 text-sm font-medium">
                            {evaluation.title}
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {evaluation.course}
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {evaluation.student}
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {evaluation.dateEvaluated}
                          </td>
                          <td className="py-3 px-4 text-sm">
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
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {evaluation.score}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Evaluations;
