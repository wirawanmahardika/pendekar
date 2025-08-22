// utils/fileToWebp.ts
export function fileToWebP(file: File, quality = 0.8): Promise<File> {
  return new Promise((resolve, reject) => {
    const imageURL = URL.createObjectURL(file);
    const img = new Image();
    img.src = imageURL;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas context not available"));
        return;
      }

      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Failed to convert image to WebP"));
            return;
          }

          const webpFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".webp", {
            type: "image/webp",
          });

          resolve(webpFile);
          URL.revokeObjectURL(imageURL); // cleanup
        },
        "image/webp",
        quality
      );
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };
  });
}
