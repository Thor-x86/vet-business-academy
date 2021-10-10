let randomNames: string[] | null = null;

export async function init(baseURL: string): Promise<void> {
  randomNames = await downloadRandomNames(baseURL);
}

export function randomPickNames(count: number): string[] {
  if (randomNames == null) {
    throw new Error(
      "RandomNameAPI is either not initialized or has been disposed"
    );
  }
  let results: string[] = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * randomNames.length);
    results.push(randomNames[randomIndex]);
  }
  return results;
}

export function dispose(): void {
  randomNames = null;
}

async function downloadRandomNames(baseURL: string): Promise<string[]> {
  try {
    const response = await fetch(baseURL + "/api/fullnames.json", {
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
    return downloadRandomNames(baseURL);
  }
}
