import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchResult } from "@shared/schema";

interface SearchHistoryProps {
  history: SearchResult[];
  onItemClick: (word: string) => void;
  onClearHistory: () => void;
}

export default function SearchHistory({ 
  history, 
  onItemClick, 
  onClearHistory 
}: SearchHistoryProps) {
  const formatTimestamp = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (error) {
      return "some time ago";
    }
  };

  return (
    <div className="sticky top-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
          Recent Searches
        </h2>
        
        <ScrollArea className="space-y-2 max-h-96">
          {history.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-4">
              No recent searches yet
            </p>
          ) : (
            <div className="space-y-2">
              {history.map((item, index) => (
                <button
                  key={index}
                  onClick={() => onItemClick(item.word)}
                  className="w-full text-left p-2 rounded-md hover:bg-primary-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center justify-between group"
                >
                  <span className="truncate">{item.word}</span>
                  <span className="text-gray-400 dark:text-gray-500 text-xs hidden group-hover:inline">
                    {formatTimestamp(item.timestamp)}
                  </span>
                </button>
              ))}
            </div>
          )}
        </ScrollArea>
        
        {history.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearHistory}
              className="text-primary hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium flex items-center"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear history
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
