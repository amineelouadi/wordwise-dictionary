import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface InitialStateProps {
  onWordClick: (word: string) => void;
}

const popularWords = [
  "hello", "serendipity", "ephemeral", "ubiquitous", "mellifluous"
];

export default function InitialState({ onWordClick }: InitialStateProps) {
  return (
    <Card className="p-8 text-center py-16 border border-gray-200 dark:border-gray-700">
      <CardContent className="pt-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-16 h-16 mx-auto mb-6 text-primary"
        >
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          <path d="M8 7h6" />
          <path d="M8 11h8" />
          <path d="M8 15h6" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          WordWise Dictionary
        </h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
          Enter a word in the search box above to find its definition, pronunciation, and examples.
        </p>
        <div className="flex flex-wrap justify-center gap-2 text-sm">
          {popularWords.map((word) => (
            <Button
              key={word}
              variant="outline"
              className="px-3 py-1.5 bg-primary-50 dark:bg-gray-700 text-primary-700 dark:text-primary-300 rounded-full hover:bg-primary-100 dark:hover:bg-gray-600"
              onClick={() => onWordClick(word)}
            >
              {word}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
