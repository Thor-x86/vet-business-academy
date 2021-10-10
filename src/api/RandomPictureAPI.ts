let pictures: string[] | null = null;

export async function init(baseURL: string): Promise<void> {
  pictures = await downloadPictures(baseURL);
}

export function randomPickPictures(count: number): string[] {
  if (pictures == null) {
    throw new Error(
      "RandomPictureAPI is either not initialized or has been disposed"
    );
  }
  let results: string[] = [];
  count = Math.min(pictures.length, count);
  for (let i = 0; i < count; i++) {
    let eachRandom: string;
    do {
      const randomIndex = Math.floor(Math.random() * pictures.length);
      eachRandom = pictures[randomIndex];
    } while (results.includes(eachRandom));
    results.push(eachRandom);
  }
  return results;
}

export function dispose(): void {
  pictures = null;
}

async function downloadPictures(baseURL: string): Promise<string[]> {
  try {
    const response = await fetch(baseURL + "/api/pictures.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    console.warn("Retrying in 3 seconds...");
    await new Promise(resolve => {
      window.setTimeout(resolve, 3000);
    });
    return downloadPictures(baseURL);
  }
}
