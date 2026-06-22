export async function uploadResumeToS3(file) {
  const response = await fetch(
    `/api/upload-url?fileName=${encodeURIComponent(
      file.name
    )}&fileType=${encodeURIComponent(
      file.type
    )}`
  );

  const data = await response.json();

  console.log("Signed URL:", data);

  if (!data.success) {
    throw new Error(
      data.error ||
        "Failed to generate upload URL"
    );
  }

  const uploadResponse =
    await fetch(data.url, {
      method: "PUT",
      body: file,
    });

  console.log(
    "Upload Response:",
    uploadResponse
  );

  if (!uploadResponse.ok) {
    throw new Error(
      `Upload failed: ${uploadResponse.status}`
    );
  }

  return data.url.split("?")[0];
}