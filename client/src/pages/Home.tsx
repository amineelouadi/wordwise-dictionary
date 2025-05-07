import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import SearchHistory from "@/components/SearchHistory";
import WordDetails from "@/components/WordDetails";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import InitialState from "@/components/InitialState";
import { useDictionary } from "@/hooks/useDictionary";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Word, SearchResult } from "@shared/schema";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchHistory, setSearchHistory] = useState<SearchResult[]>([]);
  const { toast } = useToast();
  
  const { 
    data: wordDetails, 
    refetch,
    isLoading, 
    isError,
    error 
  } = useDictionary(searchTerm);

  // Get search history on component mount
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await apiRequest("GET", "/api/history", undefined);
        const data = await response.json();
        setSearchHistory(data);
      } catch (error) {
        console.error("Failed to fetch search history", error);
      }
    };
    
    fetchHistory();
  }, []);

  const handleSearch = async (term: string) => {
    if (!term.trim()) return;
    
    setSearchTerm(term);
    const result = await refetch();
    
    // Add to history after successful search
    if (result.data) {
      try {
        const response = await apiRequest("POST", "/api/history", { 
          word: term, 
          timestamp: new Date().toISOString() 
        });
        const data = await response.json();
        setSearchHistory(data);
      } catch (error) {
        console.error("Failed to save search history", error);
      }
    }
  };

  const handleClearHistory = async () => {
    try {
      await apiRequest("DELETE", "/api/history", undefined);
      setSearchHistory([]);
      toast({
        title: "History cleared",
        description: "Your search history has been cleared.",
      });
    } catch (error) {
      console.error("Failed to clear history", error);
      toast({
        title: "Error",
        description: "Failed to clear search history.",
        variant: "destructive",
      });
    }
  };

  const handleHistoryItemClick = (word: string) => {
    handleSearch(word);
  };

  const renderMainContent = () => {
    if (isLoading) {
      return <LoadingState searchTerm={searchTerm} />;
    }
    
    if (isError) {
      return <ErrorState searchTerm={searchTerm} error={error} onTryAgain={() => setSearchTerm("")} />;
    }
    
    if (wordDetails && searchTerm) {
      return <WordDetails word={wordDetails as Word} />;
    }
    
    return <InitialState onWordClick={handleSearch} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-800">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <aside className="hidden lg:block lg:col-span-3">
              <SearchHistory 
                history={searchHistory} 
                onItemClick={handleHistoryItemClick} 
                onClearHistory={handleClearHistory}
              />
            </aside>
            
            <div className="lg:col-span-9">
              <SearchBar onSearch={handleSearch} initialValue={searchTerm} />
              {renderMainContent()}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
