import { Scale, Shield } from "lucide-react";

export const CourtHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-3 rounded-full bg-gradient-to-r from-primary to-primary-glow">
          <Scale className="h-8 w-8 text-primary-foreground" />
        </div>
        <Shield className="h-6 w-6 text-legal-gold" />
      </div>
      <h1 className="text-4xl font-bold text-legal-dark mb-2">
        Court Data Fetcher
      </h1>
      <p className="text-lg text-muted-foreground mb-2">
        Delhi High Court Case Information System
      </p>
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full">
        <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
        <span className="text-sm font-medium text-accent-foreground">
          System Online
        </span>
      </div>
    </div>
  );
};