import { useState, useEffect, FormEvent, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  onSearch: (term: string) => void;
  initialValue?: string;
}

export default function SearchBar({ onSearch, initialValue = "" }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Update searchTerm when initialValue changes
  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  // Sample suggestion functionality based on local dictionary
  // In a real app, this would be powered by an API
  const getSuggestions = (input: string) => {
    if (!input || input.length < 2) return [];
    
    const popularWords = [
      "hello", "dictionary", "serendipity", "ephemeral", "ubiquitous",
      "mellifluous", "quintessential", "peruse", "eloquent", "transcend"
    ];
    
    return popularWords
      .filter(word => word.toLowerCase().startsWith(input.toLowerCase()))
      .slice(0, 5);
  };

  const handleInputChange = (value: string) => {
    setSearchTerm(value);
    if (value.length >= 2) {
      setSuggestions(getSuggestions(value));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      setShowSuggestions(false);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setShowSuggestions(false);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  // Hide suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchInputRef.current && 
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mb-6 relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex shadow-sm rounded-md">
          <div className="relative flex-grow focus-within:z-10">
            <Input
              ref={searchInputRef}
              type="text"
              placeholder="Search for a word..."
              value={searchTerm}
              onChange={e => handleInputChange(e.target.value)}
              className="block w-full rounded-l-md border-gray-300 pl-4 pr-12 focus:border-primary focus:ring-primary sm:text-sm h-12"
              autoFocus
            />
            {searchTerm && (
              <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleClearSearch}
                  className="inline-flex items-center rounded px-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
          <Button
            type="submit"
            className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-primary bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
          >
            <Search className="h-5 w-5" />
            <span>Search</span>
          </Button>
        </div>
        
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-10 w-full bg-white dark:bg-gray-800 mt-1 shadow-lg rounded-md border border-gray-200 dark:border-gray-700">
            <ul className="max-h-60 overflow-y-auto py-1 text-base">
              {suggestions.map((suggestion, index) => {
                const matchPart = searchTerm.toLowerCase();
                const restPart = suggestion.slice(matchPart.length);
                
                return (
                  <li 
                    key={index}
                    className="cursor-pointer select-none px-4 py-2 hover:bg-primary-50 dark:hover:bg-gray-700"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <div className="flex items-center">
                      <span className="font-medium">{suggestion.slice(0, matchPart.length)}</span>
                      <span className="text-gray-500 dark:text-gray-400">{restPart}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
}
