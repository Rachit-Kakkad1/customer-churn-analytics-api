const Joi = require('joi');

/**
 * Customer Validation Schemas
 * 
 * Defines Joi validation rules for customer-related requests.
 * These schemas ensure that incoming data matches the expected structure,
 * types, and constraints required for churn analytics.
 */

const commonRules = {
  nonNegative: (label) => Joi.number().min(0).messages({ 'number.min': `${label} cannot be negative` }),
  percentage: (label) => Joi.number().min(0).max(100).messages({ 'number.max': `${label} cannot exceed 100%` }),
};

const baseCustomerSchema = {
  age: Joi.number().integer().min(0).max(120).messages({
    'number.base': 'Age must be a number',
    'number.min': 'Age cannot be negative',
    'number.max': 'Age cannot exceed 120',
  }),
  gender: Joi.string()
    .valid('Male', 'Female', 'Other', 'Non-binary', 'Prefer not to say')
    .messages({ 'any.only': 'Invalid gender selection' }),
  country: Joi.string().trim().messages({ 'string.empty': 'Country cannot be empty' }),
  city: Joi.string().trim().messages({ 'string.empty': 'City cannot be empty' }),
  membershipYears: commonRules.nonNegative('Membership years').default(0),
  loginFrequency: commonRules.nonNegative('Login frequency').default(0),
  sessionDurationAvg: commonRules.nonNegative('Session duration').default(0),
  pagesPerSession: commonRules.nonNegative('Pages per session').default(0),
  cartAbandonmentRate: commonRules.percentage('Cart abandonment rate').default(0),
  wishlistItems: Joi.number().integer().min(0).default(0),
  totalPurchases: Joi.number().integer().min(0).default(0),
  averageOrderValue: commonRules.nonNegative('Average order value').default(0),
  daysSinceLastPurchase: commonRules.nonNegative('Days since last purchase').default(0),
  discountUsageRate: commonRules.percentage('Discount usage rate').default(0),
  returnsRate: commonRules.percentage('Returns rate').default(0),
  emailOpenRate: commonRules.percentage('Email open rate').default(0),
  customerServiceCalls: Joi.number().integer().min(0).default(0),
  productReviewsWritten: Joi.number().integer().min(0).default(0),
  socialMediaEngagementScore: commonRules.percentage('Social media engagement score').default(0),
  mobileAppUsage: commonRules.nonNegative('Mobile app usage').default(0),
  paymentMethodDiversity: Joi.number().integer().min(1).default(1),
  lifetimeValue: commonRules.nonNegative('Lifetime value'),
  creditBalance: Joi.number().default(0),
  churned: Joi.boolean().default(false),
  signupQuarter: Joi.string().valid('Q1', 'Q2', 'Q3', 'Q4').messages({
    'any.only': 'Signup quarter must be Q1, Q2, Q3, or Q4',
  }),
};

/**
 * Validation schema for creating a new customer
 */
const createCustomerSchema = Joi.object({
  ...baseCustomerSchema,
  age: baseCustomerSchema.age.required(),
  gender: baseCustomerSchema.gender.required(),
  country: baseCustomerSchema.country.required(),
  city: baseCustomerSchema.city.required(),
  membershipYears: baseCustomerSchema.membershipYears.required(),
  lifetimeValue: baseCustomerSchema.lifetimeValue.required(),
  signupQuarter: baseCustomerSchema.signupQuarter.required(),
}).options({ abortEarly: false });

/**
 * Validation schema for updating an existing customer
 * Supports partial updates
 */
const updateCustomerSchema = Joi.object({
  ...baseCustomerSchema,
})
  .min(1)
  .options({ abortEarly: false });

module.exports = {
  createCustomerSchema,
  updateCustomerSchema,
};
