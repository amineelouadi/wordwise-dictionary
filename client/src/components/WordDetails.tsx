import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Bookmark, Share2, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Word } from "@shared/schema";

interface WordDetailsProps {
  word: Word;
}

export default function WordDetails({ word }: WordDetailsProps) {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();
  
  const audioUrl = word.phonetics?.find(p => p.audio)?.audio || "";
  
  const handlePlayAudio = () => {
    if (!audioRef.current || !audioUrl) return;
    
    if (audioPlaying) {
      audioRef.current.pause();
      setAudioPlaying(false);
    } else {
      audioRef.current.play().catch(error => {
        console.error("Error playing audio:", error);
        toast({
          title: "Audio playback failed",
          description: "Could not play the pronunciation audio.",
          variant: "destructive",
        });
      });
      setAudioPlaying(true);
    }
  };
  
  const handleAudioEnded = () => {
    setAudioPlaying(false);
  };

  const handleSaveWord = () => {
    toast({
      title: "Word saved",
      description: `${word.word} has been added to your saved words.`,
    });
  };

  const handleShareWord = () => {
    if (navigator.share) {
      navigator.share({
        title: `WordWise: ${word.word}`,
        text: `Check out the definition of "${word.word}" on WordWise!`,
        url: `${window.location.origin}/?word=${word.word}`,
      }).catch(error => {
        console.error("Error sharing:", error);
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`${window.location.origin}/?word=${word.word}`);
      toast({
        title: "Link copied",
        description: "Word link copied to clipboard.",
      });
    }
  };

  return (
    <div>
      {/* Word Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 font-serif">
            {word.word}
          </h1>
          <div className="flex items-center mt-1 text-gray-600 dark:text-gray-300">
            <span className="text-lg font-serif italic">{word.phonetic}</span>
            {audioUrl && (
              <Button
                variant="outline"
                size="sm"
                onClick={handlePlayAudio}
                className="ml-3 bg-primary-50 hover:bg-primary-100 text-primary-700 dark:bg-gray-800 dark:text-primary-400 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                {audioPlaying ? (
                  <div className="sound-wave flex h-4 items-end space-x-0.5">
                    <div style={{ animationDelay: "0s" }}></div>
                    <div style={{ animationDelay: "0.1s" }}></div>
                    <div style={{ animationDelay: "0.2s" }}></div>
                    <div style={{ animationDelay: "0.3s" }}></div>
                    <div style={{ animationDelay: "0.4s" }}></div>
                  </div>
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </Button>
            )}
            <audio 
              ref={audioRef} 
              src={audioUrl} 
              onEnded={handleAudioEnded} 
              className="hidden"
            />
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveWord}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <Bookmark className="h-4 w-4 mr-1" />
            Save
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleShareWord}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>
      </div>

      {/* Word Origin */}
      {word.origin && (
        <div className="bg-primary-50 dark:bg-gray-800 border border-primary-100 dark:border-gray-700 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-primary-800 dark:text-primary-300 mb-1">
            Origin
          </h3>
          <p className="text-primary-900 dark:text-gray-300 text-sm font-serif">
            {word.origin}
          </p>
        </div>
      )}

      {/* Word Meanings */}
      <div className="space-y-8">
        {word.meanings.map((meaning, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center">
              <div className="flex items-center">
                <span className="text-lg font-medium text-gray-900 dark:text-gray-100 font-serif capitalize">
                  {meaning.partOfSpeech}
                </span>
                <div className="ml-3 px-2 py-1 bg-orange-500 bg-opacity-10 rounded text-orange-500 text-xs font-medium uppercase">
                  part of speech
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-6 py-5 space-y-5">
              {meaning.definitions.map((definition, defIndex) => (
                <div 
                  key={defIndex} 
                  className={`${defIndex < meaning.definitions.length - 1 ? 'border-b border-gray-100 dark:border-gray-800 pb-5' : ''}`}
                >
                  <div className="flex">
                    <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-primary-100 dark:bg-gray-700 text-primary-800 dark:text-primary-300 font-medium text-sm">
                      {defIndex + 1}
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-800 dark:text-gray-200 font-serif">
                        {definition.definition}
                      </p>
                      
                      {definition.example && (
                        <div className="mt-2 italic text-gray-600 dark:text-gray-400 pl-4 border-l-2 border-gray-200 dark:border-gray-700 font-serif">
                          "{definition.example}"
                        </div>
                      )}
                      
                      {definition.synonyms && definition.synonyms.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Synonyms:
                          </span>
                          {definition.synonyms.map((synonym, synIndex) => (
                            <a 
                              key={synIndex} 
                              href="#" 
                              onClick={(e) => {
                                e.preventDefault();
                                // Can handle synonym click for new search
                              }}
                              className="text-sm text-primary dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300"
                            >
                              {synonym}
                            </a>
                          ))}
                        </div>
                      )}
                      
                      {definition.antonyms && definition.antonyms.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Antonyms:
                          </span>
                          {definition.antonyms.map((antonym, antIndex) => (
                            <a 
                              key={antIndex} 
                              href="#" 
                              onClick={(e) => {
                                e.preventDefault();
                                // Can handle antonym click for new search
                              }}
                              className="text-sm text-primary dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300"
                            >
                              {antonym}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Related Words */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-4">
          You might also be interested in
        </h3>
        <div className="flex flex-wrap gap-2">
          {["hi", "greet", "welcome", "salutation", "greeting"].map((relatedWord) => (
            <Button
              key={relatedWord}
              variant="outline"
              size="sm"
              onClick={() => {
                // Handle related word search
              }}
              className="px-3 py-1.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 text-sm"
            >
              {relatedWord}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
