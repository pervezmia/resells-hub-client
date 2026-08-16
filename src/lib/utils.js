export function isValidImageUrl(url) {
  if (!url || typeof url !== "string") return false;
  return (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("/")
  );
}

// প্রজেক্ট জুড়ে ব্যবহারযোগ্য fallback placeholder
export const PLACEHOLDER_IMAGE = "/placeholder.png";

export function getSafeImage(url) {
  return isValidImageUrl(url) ? url : PLACEHOLDER_IMAGE;
}