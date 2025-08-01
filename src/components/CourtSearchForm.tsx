import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, FileText, Calendar, Hash, Scale } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SearchFormData {
  caseType: string;
  caseNumber: string;
  filingYear: string;
}

interface CourtSearchFormProps {
  onSearch: (data: SearchFormData) => void;
  isLoading: boolean;
}

const CASE_TYPES = [
  { value: "civil", label: "Civil Appeal" },
  { value: "criminal", label: "Criminal Appeal" },
  { value: "writ", label: "Writ Petition" },
  { value: "company", label: "Company Petition" },
  { value: "tax", label: "Tax Appeal" },
  { value: "service", label: "Service Matter" },
  { value: "matrimonial", label: "Matrimonial" },
  { value: "bail", label: "Bail Application" },
];

const FILING_YEARS = Array.from({ length: 10 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return { value: year.toString(), label: year.toString() };
});

export const CourtSearchForm = ({ onSearch, isLoading }: CourtSearchFormProps) => {
  const [formData, setFormData] = useState<SearchFormData>({
    caseType: "",
    caseNumber: "",
    filingYear: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.caseType || !formData.caseNumber || !formData.filingYear) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    onSearch(formData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-elegant border-2">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <FileText className="h-6 w-6 text-primary" />
          Case Search
        </CardTitle>
        <CardDescription>
          Enter case details to fetch court records and orders
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="caseType" className="flex items-center gap-2">
                <Scale className="h-4 w-4" />
                Case Type *
              </Label>
              <Select 
                value={formData.caseType} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, caseType: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select case type" />
                </SelectTrigger>
                <SelectContent>
                  {CASE_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="filingYear" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Filing Year *
              </Label>
              <Select 
                value={formData.filingYear} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, filingYear: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {FILING_YEARS.map((year) => (
                    <SelectItem key={year.value} value={year.value}>
                      {year.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="caseNumber" className="flex items-center gap-2">
              <Hash className="h-4 w-4" />
              Case Number *
            </Label>
            <Input
              id="caseNumber"
              type="text"
              placeholder="e.g., 1234/2024"
              value={formData.caseNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, caseNumber: e.target.value }))}
              className="font-mono"
            />
          </div>

          <Button 
            type="submit" 
            variant="legal" 
            size="lg" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent" />
                Fetching Case Data...
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                Search Court Records
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};