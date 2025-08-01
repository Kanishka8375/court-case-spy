import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Calendar, 
  FileText, 
  Download, 
  Clock, 
  AlertCircle,
  CheckCircle,
  ExternalLink
} from "lucide-react";
import { formatDistance } from "date-fns";

interface CaseData {
  caseNumber: string;
  caseType: string;
  filingYear: string;
  parties: {
    petitioner: string;
    respondent: string;
  };
  filingDate: string;
  nextHearingDate?: string;
  status: string;
  orders: Array<{
    id: string;
    date: string;
    title: string;
    type: string;
    pdfUrl?: string;
  }>;
  lastUpdated: string;
}

interface CaseResultsProps {
  caseData: CaseData;
  onDownloadPdf: (url: string, filename: string) => void;
}

export const CaseResults = ({ caseData, onDownloadPdf }: CaseResultsProps) => {
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'disposed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'disposed':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Case Header */}
      <Card className="border-2 shadow-elegant">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                Case {caseData.caseNumber}/{caseData.filingYear}
              </CardTitle>
              <CardDescription className="text-lg mt-1">
                {caseData.caseType} - Delhi High Court
              </CardDescription>
            </div>
            <Badge className={getStatusColor(caseData.status)} variant="outline">
              {getStatusIcon(caseData.status)}
              {caseData.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Parties */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Users className="h-4 w-4" />
                Petitioner
              </div>
              <p className="font-semibold text-foreground">{caseData.parties.petitioner}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Users className="h-4 w-4" />
                Respondent
              </div>
              <p className="font-semibold text-foreground">{caseData.parties.respondent}</p>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Filing Date
              </div>
              <p className="font-semibold">{new Date(caseData.filingDate).toLocaleDateString()}</p>
            </div>
            {caseData.nextHearingDate && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Next Hearing
                </div>
                <p className="font-semibold text-primary">
                  {new Date(caseData.nextHearingDate).toLocaleDateString()}
                  <span className="text-sm text-muted-foreground ml-2">
                    ({formatDistance(new Date(caseData.nextHearingDate), new Date(), { addSuffix: true })})
                  </span>
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Orders and Judgments */}
      <Card className="border-2 shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Orders & Judgments ({caseData.orders.length})
          </CardTitle>
          <CardDescription>
            Latest court orders and judgments for this case
          </CardDescription>
        </CardHeader>
        <CardContent>
          {caseData.orders.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No orders or judgments available yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {caseData.orders.map((order, index) => (
                <div 
                  key={order.id}
                  className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                    index === 0 ? 'bg-accent/50 border-primary/20' : 'bg-card border-border'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={index === 0 ? "default" : "secondary"} className="text-xs">
                          {order.type}
                        </Badge>
                        {index === 0 && (
                          <Badge variant="outline" className="text-xs bg-legal-gold/10 text-legal-gold border-legal-gold/20">
                            Latest
                          </Badge>
                        )}
                      </div>
                      <h4 className="font-semibold text-foreground mb-1">{order.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.date).toLocaleDateString()} • 
                        {formatDistance(new Date(order.date), new Date(), { addSuffix: true })}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {order.pdfUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDownloadPdf(order.pdfUrl!, `${caseData.caseNumber}_${order.date}_order.pdf`)}
                        >
                          <Download className="h-4 w-4" />
                          PDF
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Metadata */}
      <Card className="border shadow-sm">
        <CardContent className="pt-6">
          <div className="text-xs text-muted-foreground text-center">
            Last updated: {formatDistance(new Date(caseData.lastUpdated), new Date(), { addSuffix: true })} • 
            Data sourced from Delhi High Court official website
          </div>
        </CardContent>
      </Card>
    </div>
  );
};