import { Shield, FileText, Globe, CheckCircle, AlertTriangle, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Source {
  title: string;
  url: string;
  credibility: 'high' | 'medium' | 'low';
  lastUpdated: string;
}

interface ResponseData {
  query: string;
  officialSources: {
    summary: string;
    sources: Source[];
    confidence: number;
  };
  crowdSources: {
    summary: string;
    sources: Source[];
    confidence: number;
  };
  comparison: {
    alignment: 'high' | 'medium' | 'low';
    keyDifferences: string[];
  };
  conclusion: {
    recommendation: string;
    confidence: number;
    riskLevel: 'low' | 'medium' | 'high';
  };
}

const mockData: ResponseData = {
  query: "What are the GDPR requirements for data retention in cloud storage?",
  officialSources: {
    summary: "GDPR Article 5(1)(e) states that personal data must be kept for no longer than necessary for the purposes for which it was collected. Cloud storage providers must implement technical measures to ensure data deletion after retention periods.",
    sources: [
      { title: "GDPR Official Text - Article 5", url: "https://gdpr.eu/article-5", credibility: 'high', lastUpdated: "2024-01-15" },
      { title: "European Data Protection Board Guidelines", url: "https://edpb.europa.eu", credibility: 'high', lastUpdated: "2024-02-10" }
    ],
    confidence: 95
  },
  crowdSources: {
    summary: "Community discussions suggest retention periods vary by industry: 7 years for financial, 3 years for marketing data. Many organizations struggle with automated deletion in cloud environments.",
    sources: [
      { title: "Privacy Community Forum", url: "https://privacy-forum.org", credibility: 'medium', lastUpdated: "2024-03-01" },
      { title: "StackOverflow Discussion", url: "https://stackoverflow.com", credibility: 'medium', lastUpdated: "2024-02-28" }
    ],
    confidence: 78
  },
  comparison: {
    alignment: 'medium',
    keyDifferences: [
      "Official sources focus on legal obligations, community sources provide practical implementation challenges",
      "Retention periods: Official sources emphasize 'necessary duration', crowd sources suggest specific timeframes",
      "Technical implementation details are more detailed in community discussions"
    ]
  },
  conclusion: {
    recommendation: "Follow GDPR Article 5 requirements for data minimization, but consider industry-specific retention periods (3-7 years) with automated deletion policies in cloud storage.",
    confidence: 87,
    riskLevel: 'medium'
  }
};

const CredibilityBadge = ({ level }: { level: 'high' | 'medium' | 'low' }) => {
  const variants = {
    high: 'bg-accent/10 text-accent border-accent/20',
    medium: 'bg-warning/10 text-warning-foreground border-warning/20',
    low: 'bg-destructive/10 text-destructive border-destructive/20'
  };
  
  return (
    <Badge variant="outline" className={variants[level]}>
      {level} credibility
    </Badge>
  );
};

const ConfidenceBar = ({ confidence }: { confidence: number }) => (
  <div className="flex items-center gap-2 text-sm text-muted-foreground">
    <span>Confidence:</span>
    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
      <div 
        className="h-full bg-primary transition-all duration-300"
        style={{ width: `${confidence}%` }}
      />
    </div>
    <span className="font-medium">{confidence}%</span>
  </div>
);

export const QueryResponse = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Query Header */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader className="pb-3">
          <div className="flex items-start gap-3">
            <Shield className="h-6 w-6 text-primary mt-1" />
            <div className="flex-1">
              <CardTitle className="text-lg mb-2">Security & Compliance Query</CardTitle>
              <p className="text-muted-foreground">{mockData.query}</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Sources Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Official Sources */}
        <Card className="border-l-4 border-l-official">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-official" />
              <CardTitle className="text-official">Official Documents</CardTitle>
            </div>
            <ConfidenceBar confidence={mockData.officialSources.confidence} />
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed">{mockData.officialSources.summary}</p>
            
            <div className="space-y-3">
              {mockData.officialSources.sources.map((source, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-official-light border border-official/20">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-medium text-sm">{source.title}</h4>
                    <CredibilityBadge level={source.credibility} />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Updated: {source.lastUpdated}</span>
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                      View <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Crowd Sources */}
        <Card className="border-l-4 border-l-crowd">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-crowd" />
              <CardTitle className="text-crowd">Community Sources</CardTitle>
            </div>
            <ConfidenceBar confidence={mockData.crowdSources.confidence} />
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed">{mockData.crowdSources.summary}</p>
            
            <div className="space-y-3">
              {mockData.crowdSources.sources.map((source, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-crowd-light border border-crowd/20">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-medium text-sm">{source.title}</h4>
                    <CredibilityBadge level={source.credibility} />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Updated: {source.lastUpdated}</span>
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                      View <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Comparison Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Comparative Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-medium">Source Alignment:</span>
            <Badge variant="outline" className={
              mockData.comparison.alignment === 'high' ? 'border-accent text-accent' :
              mockData.comparison.alignment === 'medium' ? 'border-warning text-warning-foreground' :
              'border-destructive text-destructive'
            }>
              {mockData.comparison.alignment} alignment
            </Badge>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Key Differences:</h4>
            <ul className="space-y-2">
              {mockData.comparison.keyDifferences.map((diff, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <AlertTriangle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                  <span>{diff}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Conclusion */}
      <Card className="border-l-4 border-l-conclusion bg-conclusion-light/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-conclusion" />
            <CardTitle className="text-conclusion">Bottom Line Recommendation</CardTitle>
          </div>
          <div className="flex items-center gap-4">
            <ConfidenceBar confidence={mockData.conclusion.confidence} />
            <Badge variant="outline" className={
              mockData.conclusion.riskLevel === 'low' ? 'border-accent text-accent' :
              mockData.conclusion.riskLevel === 'medium' ? 'border-warning text-warning-foreground' :
              'border-destructive text-destructive'
            }>
              {mockData.conclusion.riskLevel} risk
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="font-medium leading-relaxed">{mockData.conclusion.recommendation}</p>
        </CardContent>
      </Card>
    </div>
  );
};