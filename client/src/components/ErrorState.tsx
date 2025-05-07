import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  searchTerm: string;
  error: Error | null;
  onTryAgain: () => void;
}

export default function ErrorState({ searchTerm, error, onTryAgain }: ErrorStateProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-center py-16">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900 mb-6">
        <AlertTriangle className="h-8 w-8 text-red-500 dark:text-red-300" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
        No results found
      </h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
        We couldn't find "<span>{searchTerm}</span>" in our dictionary. Please check your spelling or try another word.
      </p>
      <div className="flex justify-center">
        <Button onClick={onTryAgain}>
          Try again
        </Button>
      </div>
    </div>
  );
}
