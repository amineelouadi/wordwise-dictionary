import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fetch from "node-fetch";
import { z } from "zod";
import { insertSearchHistorySchema, type Word } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Dictionary API
  app.get("/api/dictionary/:word", async (req, res) => {
    try {
      const word = req.params.word.toLowerCase().trim();
      
      if (!word) {
        return res.status(400).json({ message: "Word parameter is required" });
      }
      
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          return res.status(404).json({ message: "Word not found" });
        }
        throw new Error(`Dictionary API error: ${response.statusText}`);
      }
      
      const data = await response.json() as Word[];
      
      // Return the first result
      res.json(data[0]);
    } catch (error: any) {
      console.error("Error fetching word definition:", error);
      res.status(500).json({ message: error.message || "Failed to fetch word definition" });
    }
  });

  // Search History API
  app.get("/api/history", async (req, res) => {
    try {
      const history = await storage.getSearchHistory();
      res.json(history);
    } catch (error: any) {
      console.error("Error fetching search history:", error);
      res.status(500).json({ message: error.message || "Failed to fetch search history" });
    }
  });

  app.post("/api/history", async (req, res) => {
    try {
      const { word } = req.body;
      
      if (!word || typeof word !== 'string') {
        return res.status(400).json({ message: "Word is required and must be a string" });
      }
      
      await storage.addSearchHistory({
        word: word,
        timestamp: new Date().toISOString()
      });
      
      const history = await storage.getSearchHistory();
      res.json(history);
    } catch (error: any) {
      console.error("Error adding search history:", error);
      res.status(500).json({ message: error.message || "Failed to add search history" });
    }
  });

  app.delete("/api/history", async (req, res) => {
    try {
      await storage.clearSearchHistory();
      res.json({ message: "Search history cleared" });
    } catch (error: any) {
      console.error("Error clearing search history:", error);
      res.status(500).json({ message: error.message || "Failed to clear search history" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
