import fs from "fs";
import path from "path";

export const deleteFile = (fileUrl: string) => {
  try {

    const filename = fileUrl.split("/videos/")[1];

    if (!filename) return;

    const filePath = path.join(
      "/var/www/uploads/videos",
      filename
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (err) {
    console.error("File delete error:", err);
  }
};