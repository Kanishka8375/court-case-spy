import { useState } from "react";
import { CourtHeader } from "@/components/CourtHeader";
import { CourtSearchForm } from "@/components/CourtSearchForm";
import { CaseResults } from "@/components/CaseResults";
import { CourtService } from "@/services/courtService";
import { CaseData, SearchFormData } from "@/types/court";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Database, Clock } from "lucide-react";

const Index = () => {
  const [caseData, setCaseData] = useState<CaseData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<SearchFormData[]>([]);
  const { toast } = useToast();

  const handleSearch = async (searchData: SearchFormData) => {
    setIsLoading(true);
    setError(null);
    setCaseData(null);

    try {
      console.log("Searching for case:", searchData);
      const result = await CourtService.searchCase(searchData);
      
      setCaseData(result);
      setSearchHistory(prev => [searchData, ...prev.slice(0, 4)]); // Keep last 5 searches
      
      toast({
        title: "Case Found",
        description: `Successfully retrieved data for case ${searchData.caseNumber}/${searchData.filingYear}`,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch case data";
      setError(errorMessage);
      toast({
        title: "Search Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPdf = (url: string, filename: string) => {
    // In a real implementation, this would download the PDF
    toast({
      title: "Download Started",
      description: `Downloading ${filename}`,
    });
    
    // Simulate download
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <CourtHeader />
        
        <div className="space-y-8">
          <CourtSearchForm onSearch={handleSearch} isLoading={isLoading} />
          
          {error && (
            <Card className="border-destructive/50 bg-destructive/5">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 text-destructive">
                  <AlertCircle className="h-5 w-5" />
                  <div>
                    <p className="font-semibold">Search Error</p>
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {caseData && (
            <CaseResults 
              caseData={caseData} 
              onDownloadPdf={handleDownloadPdf}
            />
          )}
          
          {searchHistory.length > 0 && !isLoading && (
            <Card className="border-muted">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-semibold text-sm">Recent Searches</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {searchHistory.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(search)}
                      className="px-3 py-1 text-xs bg-muted hover:bg-muted/80 rounded-full transition-colors"
                      disabled={isLoading}
                    >
                      {search.caseNumber}/{search.filingYear}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Footer */}
        <footer className="mt-16 pt-8 border-t text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Database className="h-4 w-4" />
            <span>Delhi High Court Data Fetcher</span>
          </div>
          <p>
            This system fetches public court records from Delhi High Court. 
            Data accuracy depends on court website availability.
          </p>
          <p className="mt-1 text-xs">
            Built with React, TypeScript, and Supabase • Educational/Research Use Only
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
