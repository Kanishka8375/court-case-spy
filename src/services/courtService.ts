import { CaseData, SearchFormData } from "@/types/court";

// Mock service for demonstration - In production, this would call a Supabase Edge Function
// that handles the actual court website scraping
export class CourtService {
  static async searchCase(searchData: SearchFormData): Promise<CaseData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
    
    // Mock data based on search parameters
    const mockCaseData: CaseData = {
      caseNumber: searchData.caseNumber,
      caseType: this.formatCaseType(searchData.caseType),
      filingYear: searchData.filingYear,
      parties: {
        petitioner: this.generatePetitionerName(searchData.caseType),
        respondent: this.generateRespondentName(searchData.caseType)
      },
      filingDate: this.generateFilingDate(searchData.filingYear),
      nextHearingDate: this.generateNextHearingDate(),
      status: this.generateStatus(),
      orders: this.generateOrders(searchData),
      lastUpdated: new Date().toISOString(),
      searchQuery: searchData
    };

    // Simulate random failures for demonstration
    if (Math.random() < 0.1) {
      throw new Error("Court website temporarily unavailable");
    }

    return mockCaseData;
  }

  private static formatCaseType(type: string): string {
    const typeMap: Record<string, string> = {
      civil: "Civil Appeal",
      criminal: "Criminal Appeal", 
      writ: "Writ Petition",
      company: "Company Petition",
      tax: "Income Tax Appeal",
      service: "Service Matter",
      matrimonial: "Matrimonial Dispute",
      bail: "Bail Application"
    };
    return typeMap[type] || "Civil Matter";
  }

  private static generatePetitionerName(caseType: string): string {
    const names = [
      "Rajesh Kumar Singh",
      "Priya Sharma vs State of Delhi", 
      "ABC Corporation Ltd.",
      "Municipal Corporation of Delhi",
      "Sunita Devi",
      "Delhi Development Authority"
    ];
    return names[Math.floor(Math.random() * names.length)];
  }

  private static generateRespondentName(caseType: string): string {
    const respondents = [
      "State of Delhi",
      "Central Government of India",
      "Delhi Police Commissioner",
      "Registrar General, Delhi High Court",
      "Union of India & Ors.",
      "XYZ Industries Pvt. Ltd."
    ];
    return respondents[Math.floor(Math.random() * respondents.length)];
  }

  private static generateFilingDate(year: string): string {
    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${year}-12-31`);
    const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
    return new Date(randomTime).toISOString();
  }

  private static generateNextHearingDate(): string | undefined {
    if (Math.random() < 0.3) return undefined; // 30% chance no next hearing
    
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + Math.floor(Math.random() * 90) + 7);
    return futureDate.toISOString();
  }

  private static generateStatus(): string {
    const statuses = ["Pending", "Disposed", "Part Heard", "Reserved for Orders"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  }

  private static generateOrders(searchData: SearchFormData) {
    const orderCount = Math.floor(Math.random() * 5) + 1;
    const orders = [];
    
    for (let i = 0; i < orderCount; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (i * 30 + Math.floor(Math.random() * 20)));
      
      orders.push({
        id: `order_${i + 1}`,
        date: date.toISOString(),
        title: this.generateOrderTitle(i === 0),
        type: this.generateOrderType(),
        pdfUrl: `https://example.com/orders/${searchData.caseNumber}_${i + 1}.pdf`
      });
    }
    
    return orders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  private static generateOrderTitle(isLatest: boolean): string {
    const titles = [
      "Order on admission and notice",
      "Interim relief granted",
      "Counter affidavit filed",
      "Arguments heard - reserved for orders",
      "Final judgment and order",
      "Clarification on previous order",
      "Stay granted pending final disposal"
    ];
    
    if (isLatest) {
      return titles[Math.floor(Math.random() * 3)]; // More recent-sounding orders
    }
    
    return titles[Math.floor(Math.random() * titles.length)];
  }

  private static generateOrderType(): string {
    const types = ["Order", "Judgment", "Notice", "Direction", "Clarification"];
    return types[Math.floor(Math.random() * types.length)];
  }
}