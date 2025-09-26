import { QueryResponse } from "@/components/QueryResponse";

const Index = () => {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            AI Security & Compliance Assistant
          </h1>
          <p className="text-muted-foreground">
            Comprehensive analysis from official documents and community insights
          </p>
        </header>
        
        <QueryResponse />
      </div>
    </div>
  );
};

export default Index;
