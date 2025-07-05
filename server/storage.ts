import { users, userProfiles, familyMembers, languages, dialects, type User, type InsertUser, type UserProfile, type InsertUserProfile, type FamilyMember, type InsertFamilyMember, type Language, type InsertLanguage, type Dialect, type InsertDialect, type OnboardingData } from "../shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // User profile operations
  getUserProfile(userId: number): Promise<UserProfile | undefined>;
  createUserProfile(profile: InsertUserProfile): Promise<UserProfile>;
  updateUserProfile(userId: number, profile: Partial<InsertUserProfile>): Promise<UserProfile>;

  // Family member operations
  getFamilyMembers(userId: number): Promise<FamilyMember[]>;
  createFamilyMember(member: InsertFamilyMember): Promise<FamilyMember>;
  deleteFamilyMember(id: number): Promise<void>;

  // Language operations
  getLanguages(): Promise<Language[]>;
  getLanguageByCode(code: string): Promise<Language | undefined>;
  createLanguage(language: InsertLanguage): Promise<Language>;

  // Dialect operations
  getDialectsByLanguage(languageId: number): Promise<Dialect[]>;
  createDialect(dialect: InsertDialect): Promise<Dialect>;

  // Onboarding operations
  completeOnboarding(userId: number, data: OnboardingData): Promise<UserProfile>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private userProfiles: Map<number, UserProfile>;
  private familyMembers: Map<number, FamilyMember[]>;
  private languages: Map<number, Language>;
  private dialects: Map<number, Dialect[]>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.userProfiles = new Map();
    this.familyMembers = new Map();
    this.languages = new Map();
    this.dialects = new Map();
    this.currentId = 1;

    // Initialize with sample languages
    this.initializeLanguages();
  }

  private initializeLanguages() {
    const sampleLanguages: Language[] = [
      { id: 1, name: "English", nativeName: "English", flag: "🇺🇸", code: "en" },
      { id: 2, name: "French", nativeName: "Français", flag: "🇫🇷", code: "fr" },
      { id: 3, name: "Arabic", nativeName: "العربية", flag: "🇸🇦", code: "ar" },
      { id: 4, name: "Mandarin", nativeName: "普通话", flag: "🇨🇳", code: "zh" },
      { id: 5, name: "Spanish", nativeName: "Español", flag: "🇪🇸", code: "es" },
    ];

    sampleLanguages.forEach(lang => {
      this.languages.set(lang.id, lang);
    });

    // Initialize dialects
    this.dialects.set(1, [
      { id: 1, languageId: 1, name: "Swahili", description: "Tanzania Swahili", region: "Tanzania" },
      { id: 2, languageId: 1, name: "Lingala", description: "Lingala", region: "Se" },
      { id: 3, languageId: 1, name: "Wolof", description: "Wolof", region: "Senegal and Gambia" },
      { id: 4, languageId: 1, name: "Yorùbá", description: "Yorùbá", region: "Nigeria" }
    ]);

    this.dialects.set(2, [
      { id: 4, languageId: 2, name: "Baoule", description: "West African dialect", region: "Cote d'Ivoire" },
      { id: 5, languageId: 2, name: "Bete", description: "West African dialect", region: "Cote d'Ivoire" },
      { id: 6, languageId: 2, name: "Gouro", description: "West African dialect", region: "Cote d'Ivoire" },
    ]);
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
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }

  async getUserProfile(userId: number): Promise<UserProfile | undefined> {
    return this.userProfiles.get(userId);
  }

  async createUserProfile(profile: InsertUserProfile): Promise<UserProfile> {
    const id = this.currentId++;
    const userProfile: UserProfile = { 
      id,
      userId: profile.userId,
      nativeLanguage: profile.nativeLanguage,
      dialect: profile.dialect || null,
      dailyGoal: profile.dailyGoal || 5,
      onboardingCompleted: profile.onboardingCompleted || false,
      createdAt: new Date(), 
      updatedAt: new Date()
    };
    this.userProfiles.set(profile.userId, userProfile);
    return userProfile;
  }

  async updateUserProfile(userId: number, profile: Partial<InsertUserProfile>): Promise<UserProfile> {
    const existing = this.userProfiles.get(userId);
    if (!existing) {
      throw new Error("User profile not found");
    }
    const updated: UserProfile = { 
      ...existing, 
      ...profile, 
      updatedAt: new Date() 
    };
    this.userProfiles.set(userId, updated);
    return updated;
  }

  async getFamilyMembers(userId: number): Promise<FamilyMember[]> {
    return this.familyMembers.get(userId) || [];
  }

  async createFamilyMember(member: InsertFamilyMember): Promise<FamilyMember> {
    const id = this.currentId++;
    const familyMember: FamilyMember = { 
      ...member, 
      id, 
      createdAt: new Date() 
    };

    const existing = this.familyMembers.get(member.userId) || [];
    existing.push(familyMember);
    this.familyMembers.set(member.userId, existing);

    return familyMember;
  }

  async deleteFamilyMember(id: number): Promise<void> {
    for (const [userId, members] of Array.from(this.familyMembers.entries())) {
      const index = members.findIndex((m: FamilyMember) => m.id === id);
      if (index !== -1) {
        members.splice(index, 1);
        this.familyMembers.set(userId, members);
        return;
      }
    }
  }

  async getLanguages(): Promise<Language[]> {
    return Array.from(this.languages.values());
  }

  async getLanguageByCode(code: string): Promise<Language | undefined> {
    return Array.from(this.languages.values()).find(lang => lang.code === code);
  }

  async createLanguage(language: InsertLanguage): Promise<Language> {
    const id = this.currentId++;
    const newLanguage: Language = { ...language, id };
    this.languages.set(id, newLanguage);
    return newLanguage;
  }

  async getDialectsByLanguage(languageId: number): Promise<Dialect[]> {
    return this.dialects.get(languageId) || [];
  }

  async createDialect(dialect: InsertDialect): Promise<Dialect> {
    const id = this.currentId++;
    const newDialect: Dialect = {
      ...dialect,
      id,
      description: dialect.description ?? null,
      region: dialect.region ?? null,
    };

    const existing = this.dialects.get(dialect.languageId) || [];
    existing.push(newDialect);
    this.dialects.set(dialect.languageId, existing);

    return newDialect;
  }

  async completeOnboarding(userId: number, data: OnboardingData): Promise<UserProfile> {
    // Create or update user profile
    const existingProfile = await this.getUserProfile(userId);
    let profile: UserProfile;

    if (existingProfile) {
      profile = await this.updateUserProfile(userId, {
        nativeLanguage: data.nativeLanguage,
        dialect: data.dialect,
        dailyGoal: data.dailyGoal,
        onboardingCompleted: true,
      });
    } else {
      profile = await this.createUserProfile({
        userId,
        nativeLanguage: data.nativeLanguage,
        dialect: data.dialect,
        dailyGoal: data.dailyGoal,
        onboardingCompleted: true,
      });
    }

    // Add family members
    for (const member of data.familyMembers) {
      await this.createFamilyMember({ ...member, userId });
    }

    return profile;
  }
}

export const storage = new MemStorage();