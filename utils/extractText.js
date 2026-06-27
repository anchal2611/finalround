import pdf from "pdf-parse";

export async function extractTextFromBuffer(buffer) {
  try {
    const parsed = await pdf(buffer);

    return parsed.text
      .replace(/\r/g, "")
      .replace(/\n+/g, "\n")
      .trim();
  } catch (err) {
    console.error(err);
    throw new Error("Failed to parse PDF.");
  }
}