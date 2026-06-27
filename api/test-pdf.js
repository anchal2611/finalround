import pdf from "pdf-parse";

export default async function handler(req, res) {
  return res.status(200).json({
    success: true,
    pdf: typeof pdf,
  });
}