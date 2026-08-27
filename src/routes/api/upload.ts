/**
 * Server function for uploading images to Cloudinary.
 * Stores the image URL in Neon (not base64).
 */
import { createServerFn } from "@tanstack/react-start";

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME ?? "";
const API_KEY = process.env.CLOUDINARY_API_KEY ?? "";
const API_SECRET = process.env.CLOUDINARY_API_SECRET ?? "";

function isConfigured(): boolean {
  return Boolean(CLOUD_NAME && API_KEY && API_SECRET);
}

/**
 * Upload a base64 image to Cloudinary and return the URL.
 * Falls back to returning the base64 string if Cloudinary is not configured.
 */
export const uploadImage = createServerFn({ method: "POST" })
  .validator(
    (data: {
      base64: string;
      folder?: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    // If Cloudinary not configured, return base64 as-is (fallback)
    if (!isConfigured()) {
      return { url: data.base64, provider: "base64" as const };
    }

    // Dynamic import to avoid issues if cloudinary is not installed
    const { v2: cloudinary } = await import("cloudinary");

    cloudinary.config({
      cloud_name: CLOUD_NAME,
      api_key: API_KEY,
      api_secret: API_SECRET,
    });

    // Determine resource type from base64 header
    const isVideo = data.base64.includes("video/");
    const resourceType = isVideo ? "video" : "image";

    // Upload using upload_stream
    const result = await new Promise<{
      secure_url: string;
      public_id: string;
    }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: data.folder || "giong-vn",
          resource_type: resourceType,
          transformation: [
            { width: 1200, height: 1200, crop: "limit" }, // Max 1200px
            { quality: "auto" }, // Auto compress
          ],
        },
        (error, result) => {
          if (error) reject(error);
          else
            resolve({
              secure_url: result!.secure_url,
              public_id: result!.public_id,
            });
        },
      );

      // Send the base64 data
      stream.end(Buffer.from(data.base64.split(",")[1], "base64"));
    });

    return { url: result.secure_url, provider: "cloudinary" as const };
  });

/**
 * Delete an image from Cloudinary by URL.
 */
export const deleteImage = createServerFn({ method: "POST" })
  .validator((data: { url: string }) => data)
  .handler(async ({ data }) => {
    if (!isConfigured()) return { deleted: false };

    const { v2: cloudinary } = await import("cloudinary");
    cloudinary.config({
      cloud_name: CLOUD_NAME,
      api_key: API_KEY,
      api_secret: API_SECRET,
    });

    // Extract public_id from URL
    // URL format: https://res.cloudinary.com/CLOUD/image/upload/v123/folder/file.jpg
    const parts = data.url.split("/");
    const uploadIdx = parts.indexOf("upload");
    if (uploadIdx === -1) return { deleted: false };

    const publicId = parts
      .slice(uploadIdx + 1)
      .filter((p) => !p.startsWith("v"))
      .join("/")
      .replace(/\.[^.]+$/, ""); // Remove extension

    try {
      await cloudinary.uploader.destroy(publicId);
      return { deleted: true };
    } catch {
      return { deleted: false };
    }
  });
