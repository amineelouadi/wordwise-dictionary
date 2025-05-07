import { users, type User, type InsertUser, type SearchResult } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getSearchHistory(): Promise<SearchResult[]>;
  addSearchHistory(searchResult: Omit<SearchResult, "id">): Promise<SearchResult>;
  clearSearchHistory(): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private searchHistory: SearchResult[];
  currentId: number;
  currentSearchId: number;

  constructor() {
    this.users = new Map();
    this.searchHistory = [];
    this.currentId = 1;
    this.currentSearchId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getSearchHistory(): Promise<SearchResult[]> {
    // Return a copy of the array sorted by timestamp in descending order
    return [...this.searchHistory]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  async addSearchHistory(searchResult: Omit<SearchResult, "id">): Promise<SearchResult> {
    // Check if word already exists
    const existingIndex = this.searchHistory.findIndex(
      (item) => item.word.toLowerCase() === searchResult.word.toLowerCase()
    );
    
    if (existingIndex !== -1) {
      // Remove the existing entry
      this.searchHistory.splice(existingIndex, 1);
    }
    
    // Add new entry
    const id = this.currentSearchId++;
    const newSearchResult: SearchResult = { ...searchResult, id };
    this.searchHistory.push(newSearchResult);
    
    // Keep only the 20 most recent searches
    if (this.searchHistory.length > 20) {
      this.searchHistory = this.searchHistory
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 20);
    }
    
    return newSearchResult;
  }

  async clearSearchHistory(): Promise<void> {
    this.searchHistory = [];
  }
}

export const storage = new MemStorage();
