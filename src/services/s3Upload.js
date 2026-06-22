export async function uploadResumeToS3(file) {
  const response = await fetch(
    `/api/upload-url?fileName=${encodeURIComponent(
      file.name
    )}&fileType=${encodeURIComponent(
      file.type
    )}`
  );

  const { url } = await response.json();

  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  return url.split("?")[0];
}