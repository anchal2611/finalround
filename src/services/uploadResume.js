export async function uploadResume(
  file
) {
  const formData =
    new FormData();

  formData.append(
    "resume",
    file
  );

  const response =
    await fetch(
      "/api/upload-resume",
      {
        method: "POST",
        body: formData,
      }
    );

  const text =
    await response.text();

  console.log(
    "SERVER RESPONSE:",
    text
  );

  let data;

  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(
      `Server returned:\n${text}`
    );
  }

  if (
    !response.ok ||
    !data.success
  ) {
    throw new Error(
      data.error ||
        "Upload failed"
    );
  }

  return data.url;
}