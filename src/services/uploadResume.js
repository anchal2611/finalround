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

  const data =
    await response.json();

  if (!data.success) {
    throw new Error(
      data.error
    );
  }

  return data.url;
}