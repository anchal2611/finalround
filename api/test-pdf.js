import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export default async function handler(req, res) {
  try {
    console.log("Loading PDF.js...");

    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array([
        37, 80, 68, 70, 45, 49, 46, 52,
      ]), // Just a dummy PDF header
    });

    return res.status(200).json({
      success: true,
      message: "pdfjs-dist imported successfully!",
      version: pdfjsLib.version,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      error: err.message,
      stack: err.stack,
    });
  }
}