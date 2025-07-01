import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserProfileSchema, insertFamilyMemberSchema, type OnboardingData } from "@shared/schema";
import { z } from "zod";

const onboardingDataSchema = z.object({
  nativeLanguage: z.string().min(1),
  dialect: z.string().optional(),
  familyMembers: z.array(z.object({
    name: z.string().min(1),
    relationship: z.string().min(1),
    proficiency: z.enum(["beginner", "intermediate", "advanced", "native"]),
  })),
  dailyGoal: z.number().min(1).max(50),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all languages
  app.get("/api/languages", async (req, res) => {
    try {
      const languages = await storage.getLanguages();
      res.json(languages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch languages" });
    }
  });

  // Get dialects for a language
  app.get("/api/languages/:languageId/dialects", async (req, res) => {
    try {
      const languageId = parseInt(req.params.languageId);
      if (isNaN(languageId)) {
        return res.status(400).json({ error: "Invalid language ID" });
      }

      const dialects = await storage.getDialectsByLanguage(languageId);
      res.json(dialects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch dialects" });
    }
  });

  // Get user profile
  app.get("/api/user/:userId/profile", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      const profile = await storage.getUserProfile(userId);
      if (!profile) {
        return res.status(404).json({ error: "User profile not found" });
      }

      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user profile" });
    }
  });

  // Get family members
  app.get("/api/user/:userId/family-members", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      const familyMembers = await storage.getFamilyMembers(userId);
      res.json(familyMembers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch family members" });
    }
  });

  // Complete onboarding
  app.post("/api/user/:userId/complete-onboarding", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      const validatedData = onboardingDataSchema.parse(req.body);
      const profile = await storage.completeOnboarding(userId, validatedData);

      res.json(profile);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid onboarding data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to complete onboarding" });
    }
  });

  // Create user (for demo purposes)
  app.post("/api/users", async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
      }

      const user = await storage.createUser({ username, password });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to create user" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}