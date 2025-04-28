
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Clock, FileText, TrendingUp, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const Index = () => {
  // Mock data for the dashboard
  const stats = [
    { title: "Total Submissions", value: "2,457", icon: FileText, color: "text-eval-blue" },
    { title: "Pending Evaluations", value: "432", icon: Clock, color: "text-amber-500" },
    { title: "Completed", value: "1,867", icon: Check, color: "text-green-500" },
    { title: "Total Students", value: "876", icon: Users, color: "text-eval-purple" }
  ];
  
  const recentSubmissions = [
    { id: "SUB-2023-001", course: "Advanced Mathematics", student: "John Doe", date: "2023-04-27", status: "Pending" },
    { id: "SUB-2023-002", course: "Computer Science", student: "Jane Smith", date: "2023-04-26", status: "Evaluated" },
    { id: "SUB-2023-003", course: "Physics", student: "Robert Brown", date: "2023-04-26", status: "Pending" },
    { id: "SUB-2023-004", course: "Chemistry", student: "Alice Johnson", date: "2023-04-25", status: "Evaluated" },
  ];
  
  return (
    <MainLayout>
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-full bg-secondary flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Recent Submissions</CardTitle>
              <CardDescription>Latest student submissions requiring evaluation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm">ID</th>
                      <th className="text-left py-3 px-4 text-sm">Course</th>
                      <th className="text-left py-3 px-4 text-sm">Student</th>
                      <th className="text-left py-3 px-4 text-sm">Date</th>
                      <th className="text-left py-3 px-4 text-sm">Status</th>
                      <th className="text-left py-3 px-4 text-sm"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentSubmissions.map((sub, index) => (
                      <tr key={index} className="hover:bg-muted/50">
                        <td className="py-3 px-4 text-sm">{sub.id}</td>
                        <td className="py-3 px-4 text-sm">{sub.course}</td>
                        <td className="py-3 px-4 text-sm">{sub.student}</td>
                        <td className="py-3 px-4 text-sm">{sub.date}</td>
                        <td className="py-3 px-4 text-sm">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs 
                            ${sub.status === "Pending" ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"}`}>
                            {sub.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <Button variant="ghost" size="sm">View</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Evaluation Progress</CardTitle>
              <CardDescription>Current semester progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Mathematics</span>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Physics</span>
                    <span className="text-sm font-medium">40%</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Computer Science</span>
                    <span className="text-sm font-medium">90%</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Chemistry</span>
                    <span className="text-sm font-medium">60%</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                
                <Button className="w-full">View All Courses</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Evaluator Performance</CardTitle>
              <CardDescription>Average time and evaluation count</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">Dr. Sarah Williams</p>
                    <p className="text-sm text-muted-foreground">Computer Science</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">98 Evaluations</p>
                    <p className="text-sm text-muted-foreground">Avg. 12 mins</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">Prof. Robert Chen</p>
                    <p className="text-sm text-muted-foreground">Mathematics</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">76 Evaluations</p>
                    <p className="text-sm text-muted-foreground">Avg. 18 mins</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Dr. Emily Johnson</p>
                    <p className="text-sm text-muted-foreground">Physics</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">64 Evaluations</p>
                    <p className="text-sm text-muted-foreground">Avg. 15 mins</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest system activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm">Dr. Sarah Williams completed evaluation for <span className="font-medium">SUB-2023-001</span></p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm">Results published for <span className="font-medium">Computer Science 101</span></p>
                    <p className="text-xs text-muted-foreground">3 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm">New submission by <span className="font-medium">Jane Smith</span> in Physics</p>
                    <p className="text-xs text-muted-foreground">5 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Users className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm">New evaluator <span className="font-medium">Prof. Michael Brown</span> added to system</p>
                    <p className="text-xs text-muted-foreground">Yesterday</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
