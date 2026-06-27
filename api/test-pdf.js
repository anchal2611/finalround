import {
  extractTextFromBuffer,
} from "../utils/extractText.js";

export default async function handler(
  req,
  res
) {
  return res.status(200).json({
    success: true,
    message: "extractText loaded",
  });
}