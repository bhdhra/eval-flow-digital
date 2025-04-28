
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudentTable } from "@/components/students/StudentTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Students = () => {
  return (
    <MainLayout>
      <div className="animate-fade-in space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Students</h1>
          <p className="text-muted-foreground">
            Manage student profiles and access
          </p>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Students</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <StudentTable />
          </TabsContent>
          
          <TabsContent value="active" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Students</CardTitle>
                <CardDescription>
                  View all currently active students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <p className="text-muted-foreground">Filter functionality coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inactive" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Inactive Students</CardTitle>
                <CardDescription>
                  View all inactive student accounts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <p className="text-muted-foreground">Filter functionality coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pending" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Students</CardTitle>
                <CardDescription>
                  Students with pending registration approval
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <p className="text-muted-foreground">Filter functionality coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Students;
