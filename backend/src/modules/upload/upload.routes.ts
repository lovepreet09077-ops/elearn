import { Router } from "express";
import { upload } from "../../utils/upload";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { deleteFile } from "../../utils/file";

const router = Router();

router.post(
  "/video",
  authMiddleware,
  upload.single("video"),
  (req, res) => {
    const file = req.file;

    res.json({
      message: "Upload successful",
      videoUrl: `/videos/${file?.filename}`,
    });
  }
);
router.delete("/video", authMiddleware, (req, res) => {
  const { videoUrl } = req.body;

  if (!videoUrl) {
    return res.status(400).json({ message: "videoUrl required" });
  }

  deleteFile(videoUrl);

  res.json({ message: "File deleted successfully" });
});
export default router;