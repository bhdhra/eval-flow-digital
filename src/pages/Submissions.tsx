
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronDown,
  Download,
  Filter,
  MoreHorizontal,
  Search,
  SlidersHorizontal,
} from "lucide-react";

const Submissions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data for submissions
  const submissionData = [
    {
      id: "SUB-2023-001",
      title: "Final Project",
      course: "Advanced Mathematics",
      student: "John Doe",
      date: "2023-04-27",
      status: "Pending",
    },
    {
      id: "SUB-2023-002",
      title: "Programming Assignment",
      course: "Computer Science",
      student: "Jane Smith",
      date: "2023-04-26",
      status: "Evaluated",
    },
    {
      id: "SUB-2023-003",
      title: "Lab Report",
      course: "Physics",
      student: "Robert Brown",
      date: "2023-04-26",
      status: "Pending",
    },
    {
      id: "SUB-2023-004",
      title: "Research Paper",
      course: "Chemistry",
      student: "Alice Johnson",
      date: "2023-04-25",
      status: "Evaluated",
    },
    {
      id: "SUB-2023-005",
      title: "Case Study",
      course: "Business Administration",
      student: "Michael Wilson",
      date: "2023-04-25",
      status: "Pending",
    },
    {
      id: "SUB-2023-006",
      title: "Essay",
      course: "English Literature",
      student: "Emily Davis",
      date: "2023-04-24",
      status: "Evaluated",
    },
    {
      id: "SUB-2023-007",
      title: "Term Paper",
      course: "History",
      student: "William Taylor",
      date: "2023-04-24",
      status: "Pending",
    },
  ];
  
  // Filter submissions based on search query
  const filteredSubmissions = submissionData.filter(
    (submission) =>
      submission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Submissions</h1>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>All Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search submissions..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Filter Status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="evaluated">Evaluated</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm">ID</th>
                    <th className="text-left py-3 px-4 text-sm">Title</th>
                    <th className="text-left py-3 px-4 text-sm">Course</th>
                    <th className="text-left py-3 px-4 text-sm">Student</th>
                    <th className="text-left py-3 px-4 text-sm">Date</th>
                    <th className="text-left py-3 px-4 text-sm">Status</th>
                    <th className="text-right py-3 px-4 text-sm"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubmissions.map((submission, index) => (
                    <tr key={index} className="hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm">{submission.id}</td>
                      <td className="py-3 px-4 text-sm font-medium">
                        {submission.title}
                      </td>
                      <td className="py-3 px-4 text-sm">{submission.course}</td>
                      <td className="py-3 px-4 text-sm">{submission.student}</td>
                      <td className="py-3 px-4 text-sm">{submission.date}</td>
                      <td className="py-3 px-4 text-sm">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs ${
                            submission.status === "Pending"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {submission.status}
                        </span>
                      </td>
                      <td className="py-2 px-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>
                              {submission.status === "Pending"
                                ? "Evaluate"
                                : "Edit Evaluation"}
                            </DropdownMenuItem>
                            <DropdownMenuItem>Download</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredSubmissions.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No submissions found matching your search criteria.
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-muted-foreground">
                Showing {filteredSubmissions.length} of {submissionData.length} submissions
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-secondary">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Submissions;
