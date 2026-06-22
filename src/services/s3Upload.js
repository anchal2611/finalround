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
      data.error ||
        "Failed to generate upload URL"
    );
  }

  const uploadResponse =
    await fetch(data.url, {
      method: "PUT",
      body: file,
    });

  if (!uploadResponse.ok) {
    const text =
      await uploadResponse.text();

    console.error(
      "S3 Error:",
      text
    );

    throw new Error(
      `S3 Upload Failed: ${uploadResponse.status}`
    );
  }

  return data.url.split("?")[0];
}