const Joi = require('joi');

/**
 * Customer Validation Schemas
 * 
 * Defines Joi validation rules for customer-related requests.
 * These schemas ensure that incoming data matches the expected structure,
 * types, and constraints required for churn analytics.
 */

const baseCustomerSchema = {
  age: Joi.number().integer().min(0).max(120).messages({
    'number.base': 'Age must be a number',
    'number.min': 'Age cannot be negative',
    'number.max': 'Age cannot exceed 120',
  }),
  gender: Joi.string()
    .valid('Male', 'Female', 'Other', 'Non-binary', 'Prefer not to say')
    .messages({
      'any.only': 'Invalid gender selection',
    }),
  country: Joi.string().trim().messages({
    'string.empty': 'Country cannot be empty',
  }),
  city: Joi.string().trim().messages({
    'string.empty': 'City cannot be empty',
  }),
  membershipYears: Joi.number().min(0).default(0),
  loginFrequency: Joi.number().min(0).default(0),
  sessionDurationAvg: Joi.number().min(0).default(0),
  pagesPerSession: Joi.number().min(0).default(0),
  cartAbandonmentRate: Joi.number().min(0).max(100).default(0),
  wishlistItems: Joi.number().integer().min(0).default(0),
  totalPurchases: Joi.number().integer().min(0).default(0),
  averageOrderValue: Joi.number().min(0).default(0),
  daysSinceLastPurchase: Joi.number().min(0).default(0),
  discountUsageRate: Joi.number().min(0).max(100).default(0),
  returnsRate: Joi.number().min(0).max(100).default(0),
  emailOpenRate: Joi.number().min(0).max(100).default(0),
  customerServiceCalls: Joi.number().integer().min(0).default(0),
  productReviewsWritten: Joi.number().integer().min(0).default(0),
  socialMediaEngagementScore: Joi.number().min(0).max(100).default(0),
  mobileAppUsage: Joi.number().min(0).default(0),
  paymentMethodDiversity: Joi.number().integer().min(1).default(1),
  lifetimeValue: Joi.number().min(0),
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
