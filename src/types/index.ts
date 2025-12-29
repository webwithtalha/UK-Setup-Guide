/**
 * UK Setup Guide - Core Type Definitions
 */

// ===========================================
// User & Profile Types
// ===========================================

export type UserRole = 'user' | 'admin' | 'moderator';

export type StatusType = 'student' | 'skilled_worker' | 'dependant' | 'graduate' | 'other';

export type Region = 'england' | 'scotland' | 'wales' | 'northern_ireland';

export type HousingStatus = 
  | 'searching' 
  | 'temporary' 
  | 'renting' 
  | 'owned' 
  | 'university_accommodation'
  | 'with_family';

export type WorkStatus = 
  | 'employed' 
  | 'self_employed' 
  | 'unemployed' 
  | 'student' 
  | 'not_permitted';

export type BudgetBand = 'tight' | 'moderate' | 'comfortable' | 'flexible';

export type ServiceNeed = 
  | 'bank_account'
  | 'gp_registration'
  | 'national_insurance'
  | 'biometric_card'
  | 'council_tax'
  | 'driving_license'
  | 'phone_sim'
  | 'housing'
  | 'utilities'
  | 'transport'
  | 'employment';

export interface UserProfile {
  userId: string;
  statusType: StatusType;
  region: Region;
  city?: string;
  postcodeArea?: string;
  arrivalDate?: Date;
  alreadyInUK: boolean;
  housingStatus: HousingStatus;
  workStatus: WorkStatus;
  budgetBand: BudgetBand;
  availableDocuments: string[];
  needs: ServiceNeed[];
  onboardingCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ===========================================
// Task & Roadmap Types
// ===========================================

export type TaskCategory = 
  | 'immigration'
  | 'banking'
  | 'healthcare'
  | 'housing'
  | 'employment'
  | 'utilities'
  | 'transport'
  | 'legal'
  | 'community';

export type TaskPriority = 'critical' | 'high' | 'medium' | 'low';

export type TaskStatus = 'not_started' | 'in_progress' | 'blocked' | 'completed' | 'skipped';

export interface TaskStep {
  order: number;
  title: string;
  description: string;
  isOptional?: boolean;
}

export interface TaskTemplate {
  id: string;
  title: string;
  slug: string;
  category: TaskCategory;
  description: string;
  detailedInstructions: string;
  priority: TaskPriority;
  estimatedDuration: string;
  
  // Eligibility rules
  regionRules: Region[];
  statusTypeRules: StatusType[];
  housingStatusRules?: HousingStatus[];
  workStatusRules?: WorkStatus[];
  needsRules?: ServiceNeed[];
  
  // Dependencies & relations
  dependsOnTemplateIds: string[];
  requiredDocuments: string[];
  linkedTemplateIds: string[];
  
  // Steps
  steps: TaskStep[];
  
  // Metadata
  officialLinks: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserTask {
  id: string;
  userId: string;
  templateId: string;
  template?: TaskTemplate;
  
  status: TaskStatus;
  completedSteps: number[];
  
  // Blocking info
  blockedByTaskIds: string[];
  blockedReason?: string;
  
  // Evidence & notes
  evidenceFileIds: string[];
  userNotes?: string;
  
  // Dates
  dueDate?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ===========================================
// Scam Shield Types
// ===========================================

export type ScamCategory = 
  | 'rental'
  | 'job'
  | 'money_mule'
  | 'visa_fraud'
  | 'fake_agency'
  | 'phishing'
  | 'other';

export type RiskLevel = 'low' | 'medium' | 'high';

export interface RedFlag {
  code: string;
  title: string;
  description: string;
  severity: 'warning' | 'danger';
  category: ScamCategory;
}

export interface ScamAssessment {
  id: string;
  userId: string;
  
  // Input
  inputType: 'text' | 'url' | 'email';
  inputContent: string;
  
  // Analysis
  riskScore: number; // 0-100
  riskLevel: RiskLevel;
  category: ScamCategory;
  redFlags: RedFlag[];
  safeNextSteps: string[];
  
  // User actions
  reportedToAuthorities: boolean;
  
  createdAt: Date;
}

// ===========================================
// Template Document Types
// ===========================================

export type TemplateDocCategory = 
  | 'landlord'
  | 'bank'
  | 'employer'
  | 'university'
  | 'complaint'
  | 'follow_up'
  | 'general';

export interface TemplateVariable {
  key: string;
  label: string;
  source: 'profile' | 'manual';
  placeholder: string;
  required: boolean;
}

export interface TemplateDoc {
  id: string;
  title: string;
  slug: string;
  category: TemplateDocCategory;
  description: string;
  content: string;
  variables: TemplateVariable[];
  tags: string[];
  usageCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ===========================================
// Document Vault Types
// ===========================================

export type DocumentType = 
  | 'passport'
  | 'visa'
  | 'brp'
  | 'share_code'
  | 'tenancy_agreement'
  | 'bank_statement'
  | 'employment_letter'
  | 'university_letter'
  | 'utility_bill'
  | 'other';

export interface Document {
  id: string;
  userId: string;
  
  fileName: string;
  fileType: string;
  fileSize: number;
  documentType: DocumentType;
  
  // Storage
  storageKey: string;
  thumbnailKey?: string;
  
  // Sharing
  shareLinks: ShareLink[];
  
  // Metadata
  description?: string;
  expiryDate?: Date;
  
  createdAt: Date;
  updatedAt: Date;
}

export interface ShareLink {
  id: string;
  token: string;
  expiresAt: Date;
  accessCount: number;
  maxAccess?: number;
  password?: string;
  isActive: boolean;
  createdAt: Date;
}

// ===========================================
// Resource Types
// ===========================================

export type ResourceCategory = 
  | 'healthcare'
  | 'housing'
  | 'legal'
  | 'emergency'
  | 'community'
  | 'government'
  | 'financial';

export type SourceType = 'official' | 'community' | 'verified_partner';

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  sourceType: SourceType;
  
  // Location
  region?: Region;
  city?: string;
  postcodeArea?: string;
  isNationwide: boolean;
  
  // Contact
  website?: string;
  phone?: string;
  email?: string;
  address?: string;
  
  // Metadata
  tags: string[];
  isVerified: boolean;
  verifiedAt?: Date;
  isActive: boolean;
  
  createdAt: Date;
  updatedAt: Date;
}

// ===========================================
// Subscription Types
// ===========================================

export type SubscriptionTier = 'free' | 'pro' | 'arrival_pack';
export type SubscriptionStatus = 'active' | 'cancelled' | 'past_due' | 'trialing';

export interface Subscription {
  id: string;
  userId: string;
  
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  
  // Stripe
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  stripePriceId?: string;
  
  // Dates
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
  cancelAtPeriodEnd: boolean;
  
  createdAt: Date;
  updatedAt: Date;
}

export interface FeatureAccess {
  basicRoadmap: boolean;
  fullRoadmap: boolean;
  limitedScamChecks: boolean;
  unlimitedScamChecks: boolean;
  limitedTemplates: boolean;
  fullTemplates: boolean;
  documentVault: boolean;
  reminders: boolean;
  shareLinks: boolean;
  pdfExport: boolean;
}

// ===========================================
// Report Types
// ===========================================

export type ReportStatus = 'pending' | 'reviewing' | 'verified' | 'rejected';
export type ReportType = 'scam' | 'safe_agent' | 'safe_landlord';

export interface Report {
  id: string;
  userId: string;
  
  type: ReportType;
  status: ReportStatus;
  
  // Subject
  subjectName?: string;
  subjectContact?: string;
  subjectUrl?: string;
  
  // Details
  description: string;
  evidenceFileIds: string[];
  category?: ScamCategory;
  
  // Moderation
  moderatorId?: string;
  moderatorNotes?: string;
  reviewedAt?: Date;
  
  createdAt: Date;
  updatedAt: Date;
}

// ===========================================
// Notification Types
// ===========================================

export type NotificationType = 
  | 'task_reminder'
  | 'deadline_alert'
  | 'scam_alert'
  | 'system'
  | 'welcome';

export interface Notification {
  id: string;
  userId: string;
  
  type: NotificationType;
  title: string;
  message: string;
  
  // Link to related item
  actionUrl?: string;
  actionLabel?: string;
  
  isRead: boolean;
  readAt?: Date;
  
  createdAt: Date;
}

// ===========================================
// Audit Log Types
// ===========================================

export type AuditAction = 
  | 'user_created'
  | 'user_updated'
  | 'profile_updated'
  | 'task_completed'
  | 'document_uploaded'
  | 'document_shared'
  | 'scam_assessed'
  | 'report_submitted'
  | 'subscription_changed'
  | 'admin_action';

export interface AuditLog {
  id: string;
  userId: string;
  action: AuditAction;
  targetType?: string;
  targetId?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

// ===========================================
// API Response Types
// ===========================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ===========================================
// Form Types
// ===========================================

export interface OnboardingFormData {
  statusType: StatusType;
  region: Region;
  city?: string;
  postcodeArea?: string;
  arrivalDate?: string;
  alreadyInUK: boolean;
  housingStatus: HousingStatus;
  workStatus: WorkStatus;
  budgetBand: BudgetBand;
  availableDocuments: string[];
  needs: ServiceNeed[];
}

