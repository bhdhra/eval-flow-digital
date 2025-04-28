
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
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { PlusCircle, Search, Edit, Trash2 } from "lucide-react";

interface Evaluator {
  id: string;
  specialization: string;
  institution: string;
  contact_email: string;
  status: string;
  profile: {
    full_name: string;
    avatar_url: string | null;
  };
}

interface EvaluatorFormValues {
  full_name: string;
  specialization: string;
  institution: string;
  contact_email: string;
  status: string;
}

export const EvaluatorTable = () => {
  const [evaluators, setEvaluators] = useState<Evaluator[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentEvaluator, setCurrentEvaluator] = useState<Evaluator | null>(null);
  const { toast } = useToast();

  const form = useForm<EvaluatorFormValues>({
    defaultValues: {
      full_name: "",
      specialization: "",
      institution: "",
      contact_email: "",
      status: "active",
    },
  });

  useEffect(() => {
    fetchEvaluators();
  }, []);

  useEffect(() => {
    if (currentEvaluator) {
      form.reset({
        full_name: currentEvaluator.profile?.full_name || "",
        specialization: currentEvaluator.specialization || "",
        institution: currentEvaluator.institution || "",
        contact_email: currentEvaluator.contact_email || "",
        status: currentEvaluator.status || "active",
      });
    } else {
      form.reset({
        full_name: "",
        specialization: "",
        institution: "",
        contact_email: "",
        status: "active",
      });
    }
  }, [currentEvaluator, form]);

  const fetchEvaluators = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("evaluators")
        .select(`
          *,
          profile: profiles(full_name, avatar_url)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setEvaluators(data || []);
    } catch (error) {
      console.error("Error fetching evaluators:", error);
      toast({
        title: "Error",
        description: "Failed to load evaluators data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredEvaluators = evaluators.filter((evaluator) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      evaluator.profile?.full_name?.toLowerCase().includes(searchLower) ||
      evaluator.specialization?.toLowerCase().includes(searchLower) ||
      evaluator.institution?.toLowerCase().includes(searchLower) ||
      evaluator.contact_email?.toLowerCase().includes(searchLower)
    );
  });

  const onSubmit = async (values: EvaluatorFormValues) => {
    // This is a placeholder - in a real app, you would implement the creation/update logic
    // You would need to create auth user, profile, and evaluator record
    toast({
      title: "Info",
      description: "Evaluator management requires user authentication implementation",
    });
    setIsDialogOpen(false);
  };

  const handleEdit = (evaluator: Evaluator) => {
    setCurrentEvaluator(evaluator);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    // This is a placeholder - in a real app with auth, you would implement delete logic
    toast({
      title: "Info",
      description: "Evaluator deletion requires user authentication implementation",
    });
  };

  const handleAddNew = () => {
    setCurrentEvaluator(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search evaluators..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Button onClick={handleAddNew}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Evaluator
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-10">Loading evaluators data...</div>
      ) : filteredEvaluators.length > 0 ? (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Institution</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvaluators.map((evaluator) => (
                <TableRow key={evaluator.id}>
                  <TableCell>{evaluator.profile?.full_name || "N/A"}</TableCell>
                  <TableCell>{evaluator.specialization}</TableCell>
                  <TableCell>{evaluator.institution}</TableCell>
                  <TableCell>{evaluator.contact_email}</TableCell>
                  <TableCell>
                    <Badge variant={evaluator.status === "active" ? "default" : "secondary"}>
                      {evaluator.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(evaluator)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(evaluator.id)}>
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
          No evaluators found{searchQuery ? " matching your search" : ""}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {currentEvaluator ? "Edit Evaluator" : "Add New Evaluator"}
            </DialogTitle>
            <DialogDescription>
              {currentEvaluator
                ? "Update the details for this evaluator"
                : "Enter the details for the new evaluator"}
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
                name="specialization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specialization</FormLabel>
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
                name="contact_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit">
                  {currentEvaluator ? "Save Changes" : "Add Evaluator"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
