export async function uploadResume(file) {
  const formData = new FormData();

  formData.append("resume", file);

  const response = await fetch("/api/upload-resume", {
    method: "POST",
    body: formData,
  });

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error("Server returned an invalid response.");
  }

  if (!response.ok || !data.success) {
    throw new Error(
      data.error || "Resume upload failed."
    );
  }

  return data.url;
}