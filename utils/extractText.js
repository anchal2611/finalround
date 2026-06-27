import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export async function extractTextFromBuffer(buffer) {
  try {
    const uint8Array = new Uint8Array(buffer);

    const loadingTask =
      pdfjsLib.getDocument({
        data: uint8Array,
      });

    const pdf =
      await loadingTask.promise;

    let text = "";

    for (
      let pageNum = 1;
      pageNum <= pdf.numPages;
      pageNum++
    ) {
      const page =
        await pdf.getPage(pageNum);

      const content =
        await page.getTextContent();

      const pageText =
        content.items
          .map((item) => item.str)
          .join(" ");

      text += pageText + "\n";
    }

    text = text
      .replace(/\r/g, "")
      .replace(/\t/g, " ")
      .replace(/\n{2,}/g, "\n")
      .replace(/[ ]{2,}/g, " ")
      .trim();

    if (!text) {
      throw new Error(
        "No text found in PDF."
      );
    }

    return text;

  } catch (err) {
    console.error(err);

    throw new Error(
      "Failed to extract text from PDF."
    );
  }
}