
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EvaluatorTable } from "@/components/evaluators/EvaluatorTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Evaluators = () => {
  return (
    <MainLayout>
      <div className="animate-fade-in space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Evaluators</h1>
          <p className="text-muted-foreground">
            Manage evaluator profiles and access
          </p>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Evaluators</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <EvaluatorTable />
          </TabsContent>
          
          <TabsContent value="active" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Evaluators</CardTitle>
                <CardDescription>
                  View all currently active evaluators
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
                <CardTitle>Inactive Evaluators</CardTitle>
                <CardDescription>
                  View all inactive evaluator accounts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <p className="text-muted-foreground">Filter functionality coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="performance" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Evaluator Performance</CardTitle>
                <CardDescription>
                  View evaluator performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <p className="text-muted-foreground">Performance metrics coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Evaluators;
