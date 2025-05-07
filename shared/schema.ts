import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define the schema for search results
export const searchHistory = pgTable("search_history", {
  id: serial("id").primaryKey(),
  word: text("word").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const insertSearchHistorySchema = createInsertSchema(searchHistory).pick({
  word: true,
  timestamp: true,
});

export type SearchResult = {
  id: number;
  word: string;
  timestamp: string;
};

export type InsertSearchHistory = z.infer<typeof insertSearchHistorySchema>;

// Define the types for the Dictionary API response
export type Phonetic = {
  text?: string;
  audio?: string;
};

export type Definition = {
  definition: string;
  example?: string;
  synonyms?: string[];
  antonyms?: string[];
};

export type Meaning = {
  partOfSpeech: string;
  definitions: Definition[];
};

export type Word = {
  word: string;
  phonetic?: string;
  phonetics?: Phonetic[];
  origin?: string;
  meanings: Meaning[];
};

// Keep original User schema as required by the template
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
