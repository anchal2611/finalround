export async function uploadResumeToS3(file) {
  const response = await fetch(
    `/api/upload-url?fileName=${encodeURIComponent(
      file.name
    )}&fileType=${encodeURIComponent(
      file.type
    )}`
  );

  const data = await response.json();

  if (!data.success) {
    throw new Error(
      data.error || "Failed to get upload URL"
    );
  }

  const uploadResponse = await fetch(
    data.url,
    {
      method: "PUT",
      body: file,
    }
  );

  if (!uploadResponse.ok) {
    throw new Error(
      `S3 Upload Failed: ${uploadResponse.status}`
    );
  }

  return data.url.split("?")[0];
}