export async function uploadResumeToS3(
  file
) {
  const response = await fetch(
    `/api/upload-url?fileName=${encodeURIComponent(
      file.name
    )}`
  );

  const data = await response.json();

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

  const text =
    await uploadResponse.text();

  console.log(
    "S3 Response:",
    uploadResponse.status,
    text
  );

  if (!uploadResponse.ok) {
    throw new Error(
      `S3 Upload Failed: ${uploadResponse.status}`
    );
  }

  return data.url.split("?")[0];
}