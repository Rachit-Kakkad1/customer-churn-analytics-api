const Customer = require("../models/customer.model");

/**
 * Analytics Service
 * Handles data aggregation and complex analytics queries
 */

const getCustomerAnalytics = async () => {
  const stats = await Customer.aggregate([
    {
      $match: {},
    },
    {
      $group: {
        _id: null,
        totalCustomers: { $sum: 1 },
        churnedCustomers: {
          $sum: { $cond: [{ $eq: ["$churned", true] }, 1, 0] },
        },
        averageAge: { $avg: "$age" },
        averagePurchases: { $avg: "$totalPurchases" },
      },
    },
    {
      $project: {
        _id: 0,
        totalCustomers: 1,
        churnedCustomers: 1,
        averageAge: { $round: ["$averageAge", 1] },
        averagePurchases: { $round: ["$averagePurchases", 2] },
      },
    },
  ]);

  return stats.length > 0
    ? stats[0]
    : {
        totalCustomers: 0,
        churnedCustomers: 0,
        averageAge: 0,
        averagePurchases: 0,
      };
};

module.exports = {
  getCustomerAnalytics,
};
