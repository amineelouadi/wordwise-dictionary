import { useQuery } from "@tanstack/react-query";
import { Word } from "@shared/schema";

export const useDictionary = (word: string) => {
  return useQuery<Word>({
    queryKey: [word ? `/api/dictionary/${word}` : null],
    enabled: !!word,
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: false,
  });
};
