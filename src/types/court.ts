export interface SearchFormData {
  caseType: string;
  caseNumber: string;
  filingYear: string;
}

export interface CaseData {
  id?: string;
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
  rawResponse?: string;
  searchQuery?: SearchFormData;
  createdAt?: string;
}

export interface CourtQuery {
  id: string;
  searchParams: SearchFormData;
  response: CaseData | null;
  error?: string;
  timestamp: string;
  processingTime?: number;
}