const mongoose = require('mongoose');

/**
 * Customer Schema
 * 
 * This schema defines the structure for e-commerce customers, specifically tailored 
 * for churn analytics and reporting. It includes demographic data, engagement metrics, 
 * and financial indicators.
 */
const customerSchema = new mongoose.Schema(
  {
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: [0, 'Age cannot be negative'],
      max: [120, 'Age cannot exceed 120'],
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: {
        values: ['Male', 'Female', 'Other', 'Non-binary', 'Prefer not to say'],
        message: '{VALUE} is not a supported gender',
      },
      trim: true,
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true,
      index: true,
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
      index: true,
    },
    membershipYears: {
      type: Number,
      required: [true, 'Membership years is required'],
      min: [0, 'Membership years cannot be negative'],
      default: 0,
    },
    loginFrequency: {
      type: Number,
      default: 0,
      min: [0, 'Login frequency cannot be negative'],
    },
    sessionDurationAvg: {
      type: Number,
      default: 0,
      min: [0, 'Session duration cannot be negative'],
    },
    pagesPerSession: {
      type: Number,
      default: 0,
      min: [0, 'Pages per session cannot be negative'],
    },
    cartAbandonmentRate: {
      type: Number,
      default: 0,
      min: [0, 'Cart abandonment rate cannot be negative'],
      max: [100, 'Cart abandonment rate cannot exceed 100'],
    },
    wishlistItems: {
      type: Number,
      default: 0,
      min: [0, 'Wishlist items cannot be negative'],
    },
    totalPurchases: {
      type: Number,
      default: 0,
      min: [0, 'Total purchases cannot be negative'],
      index: true,
    },
    averageOrderValue: {
      type: Number,
      default: 0,
      min: [0, 'Average order value cannot be negative'],
    },
    daysSinceLastPurchase: {
      type: Number,
      default: 0,
      min: [0, 'Days since last purchase cannot be negative'],
    },
    discountUsageRate: {
      type: Number,
      default: 0,
      min: [0, 'Discount usage rate cannot be negative'],
      max: [100, 'Discount usage rate cannot exceed 100'],
    },
    returnsRate: {
      type: Number,
      default: 0,
      min: [0, 'Returns rate cannot be negative'],
      max: [100, 'Returns rate cannot exceed 100'],
    },
    emailOpenRate: {
      type: Number,
      default: 0,
      min: [0, 'Email open rate cannot be negative'],
      max: [100, 'Email open rate cannot exceed 100'],
    },
    customerServiceCalls: {
      type: Number,
      default: 0,
      min: [0, 'Customer service calls cannot be negative'],
    },
    productReviewsWritten: {
      type: Number,
      default: 0,
      min: [0, 'Product reviews written cannot be negative'],
    },
    socialMediaEngagementScore: {
      type: Number,
      default: 0,
      min: [0, 'Engagement score cannot be negative'],
      max: [100, 'Engagement score cannot exceed 100'],
    },
    mobileAppUsage: {
      type: Number,
      default: 0,
      min: [0, 'Mobile app usage cannot be negative'],
      index: true,
    },
    paymentMethodDiversity: {
      type: Number,
      default: 1,
      min: [1, 'At least one payment method is required'],
    },
    lifetimeValue: {
      type: Number,
      required: [true, 'Lifetime value is required'],
      min: [0, 'Lifetime value cannot be negative'],
      index: true,
    },
    creditBalance: {
      type: Number,
      default: 0,
    },
    churned: {
      type: Boolean,
      default: false,
      index: true,
    },
    signupQuarter: {
      type: String,
      required: [true, 'Signup quarter is required'],
      enum: {
        values: ['Q1', 'Q2', 'Q3', 'Q4'],
        message: '{VALUE} is not a valid quarter',
      },
      trim: true,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for common analytics queries
customerSchema.index({ country: 1, churned: 1 });
customerSchema.index({ signupQuarter: 1, churned: 1 });
customerSchema.index({ lifetimeValue: -1 });
customerSchema.index({ totalPurchases: -1 });

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
