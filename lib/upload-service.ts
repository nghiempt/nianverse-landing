// Image Upload Service
const UPLOAD_API_URL = process.env.NEXT_PUBLIC_UPLOAD_API_URL || "";
const UPLOAD_AUTH_TOKEN = process.env.NEXT_PUBLIC_UPLOAD_AUTH_TOKEN || "";
const UPLOAD_API_KEY = process.env.NEXT_PUBLIC_UPLOAD_API_KEY || "";

export interface UploadResponse {
  success: boolean;
  url?: string;
  error?: string;
  message?: string;
}

class UploadService {
  /**
   * Upload an image file
   */
  async uploadImage(
    file: File,
    folderName: string = "CHAT_DEFAULT"
  ): Promise<UploadResponse> {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("FolderName", folderName);

      const response = await fetch(UPLOAD_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${UPLOAD_AUTH_TOKEN}`,
          api_key: UPLOAD_API_KEY,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }

      const data = await response.json();

      // Handle different response formats
      if (data.url || data.data?.url || data.URL || data.data?.URL) {
        return {
          success: true,
          url: data.url || data.data?.url || data.URL || data.data?.URL,
        };
      }

      // If response contains a path or filePath, construct full URL
      if (data.path || data.data?.path || data.filePath || data.data?.filePath) {
        const path = data.path || data.data?.path || data.filePath || data.data?.filePath;
        // Assuming the upload service returns a path we can construct URL from
        return {
          success: true,
          url: `http://125.212.248.52:3003${path}`,
        };
      }

      // Return the whole data object in case the structure is different
      return {
        success: true,
        url: JSON.stringify(data), // Fallback - you can adjust this based on actual API response
      };
    } catch (error: unknown) {
      console.error("Upload failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Upload failed",
      };
    }
  }

  /**
   * Upload multiple images
   */
  async uploadMultipleImages(
    files: File[],
    folderName: string = "CHAT_DEFAULT"
  ): Promise<UploadResponse[]> {
    const uploadPromises = files.map((file) =>
      this.uploadImage(file, folderName)
    );
    return Promise.all(uploadPromises);
  }

  /**
   * Validate file before upload
   */
  validateFile(file: File): { valid: boolean; error?: string } {
    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return {
        valid: false,
        error: "File quá lớn. Kích thước tối đa là 10MB.",
      };
    }

    // Check file type
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "application/pdf",
    ];
    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: "Định dạng file không được hỗ trợ. Chỉ chấp nhận: JPG, PNG, WEBP, PDF",
      };
    }

    return { valid: true };
  }

  /**
   * Validate multiple files
   */
  validateFiles(files: File[]): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    files.forEach((file, index) => {
      const validation = this.validateFile(file);
      if (!validation.valid && validation.error) {
        errors.push(`File ${index + 1} (${file.name}): ${validation.error}`);
      }
    });

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

export const uploadService = new UploadService();
