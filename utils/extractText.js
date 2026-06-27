import pdf from "pdf-parse";

export async function extractTextFromBuffer(buffer) {
  try {
    const data = await pdf(buffer);

    const cleanedText = data.text
      .replace(/\r/g, "")
      .replace(/\t/g, " ")
      .replace(/\n{2,}/g, "\n")
      .replace(/[ ]{2,}/g, " ")
      .trim();

    if (!cleanedText) {
      throw new Error("No text found in PDF.");
    }

    return cleanedText;
  } catch (error) {
    console.error("PDF Parse Error:", error);

    throw new Error(
      "Failed to extract text from resume."
    );
  }
}