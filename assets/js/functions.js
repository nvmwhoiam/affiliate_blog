export default function generateSEOSafeProductName(productName) {
    // Convert to lowercase
    let seoSafeName = productName.toLowerCase();

    // Remove special characters using regular expression
    seoSafeName = seoSafeName.replace(/[^\w\s-]/g, '');

    // Replace spaces with dashes
    seoSafeName = seoSafeName.replace(/\s+/g, '-');

    // Trim spaces
    seoSafeName = seoSafeName.trim();

    // Optionally, shorten length
    seoSafeName = seoSafeName.substring(0, 256); // Limit to 50 characters

    return seoSafeName;
}