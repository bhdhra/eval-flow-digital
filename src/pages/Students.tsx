
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";

const Students = () => {
  return (
    <MainLayout>
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold mb-6">Students</h1>
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <p className="text-xl text-muted-foreground">
            Student management module coming soon...
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Students;
