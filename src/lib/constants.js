export const PRODUCT_CATEGORIES = [
  "Electronics",
  "Furniture",
  "Vehicles",
  "Fashion",
  "Mobile Phones",
];

export const PRODUCT_CONDITIONS = ["New", "Like New", "Good", "Refurbished"];


// আনুমানিক conversion rate — real project-এ live exchange rate API ব্যবহার করা ভালো,
// কিন্তু academic/demo প্রজেক্টে fixed rate যথেষ্ট
export const BDT_TO_USD_RATE = 0.0084; // ১ টাকা ≈ ০.০০৮৪ ডলার (আনুমানিক, ~119 টাকা = ১ ডলার)

export function convertToUSD(bdtAmount) {
  return Math.round(bdtAmount * BDT_TO_USD_RATE * 100) / 100; // ২ দশমিক পর্যন্ত round
}