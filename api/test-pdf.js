import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export default async function handler(req, res) {
  try {
    const pdfUrl =
      "https://finalround-resumes-000363030480-ap-southeast-2-an.s3.ap-southeast-2.amazonaws.com/resumes/1782578739486-AnchalGupta_ResumeInternship_704.pdf";

    const response = await fetch(pdfUrl);

    if (!response.ok) {
      throw new Error(
        "Failed to download PDF."
      );
    }

    const arrayBuffer =
      await response.arrayBuffer();

    const pdf =
      await pdfjsLib.getDocument({
        data: arrayBuffer,
      }).promise;

    let text = "";

    for (
      let page = 1;
      page <= pdf.numPages;
      page++
    ) {
      const currentPage =
        await pdf.getPage(page);

      const content =
        await currentPage.getTextContent();

      text +=
        content.items
          .map((item) => item.str)
          .join(" ") + "\n";
    }

    return res.status(200).json({
      success: true,
      pages: pdf.numPages,
      characters: text.length,
      preview: text.slice(0, 1000),
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