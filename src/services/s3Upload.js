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

  await fetch(data.url, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  return data.url.split("?")[0];
}