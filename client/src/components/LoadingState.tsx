import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  searchTerm: string;
}

export default function LoadingState({ searchTerm }: LoadingStateProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-center py-16">
      <div className="inline-flex items-center justify-center space-x-2 mb-4">
        <Loader2 className="w-16 h-16 text-primary animate-spin" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
        Searching for "<span>{searchTerm}</span>"
      </h3>
      <p className="text-gray-500 dark:text-gray-400">
        Looking through our dictionary...
      </p>
    </div>
  );
}
