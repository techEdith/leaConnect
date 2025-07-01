import express from 'express';
import cors from 'cors';
import { storage } from './storage.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/languages', async (req, res) => {
  try {
    const languages = await storage.getLanguages();
    res.json(languages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch languages' });
  }
});

app.get('/api/languages/:id/dialects', async (req, res) => {
  try {
    const languageId = parseInt(req.params.id);
    const dialects = await storage.getDialectsByLanguage(languageId);
    res.json(dialects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dialects' });
  }
});

app.get('/api/user/:id/profile', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const profile = await storage.getUserProfile(userId);
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

app.get('/api/user/:id/family-members', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const familyMembers = await storage.getFamilyMembers(userId);
    res.json(familyMembers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch family members' });
  }
});

app.post('/api/user/:id/complete-onboarding', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const onboardingData = req.body;
    const profile = await storage.completeOnboarding(userId, onboardingData);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to complete onboarding' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});