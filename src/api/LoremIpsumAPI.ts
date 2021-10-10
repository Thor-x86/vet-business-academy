let loremIpsums: string[] | null = null;

export async function init(baseURL: string): Promise<void> {
  loremIpsums = await downloadLoremIpsums(baseURL);
}

export function randomPickSentence(): string {
  if (loremIpsums == null) {
    throw new Error(
      "LoremIpsumAPI is either not initialized or has been disposed"
    );
  }
  const index = Math.floor(Math.random() * loremIpsums.length);
  return loremIpsums[index];
}

export function randomPickWord(sentence?: string): string {
  let loremIpsum;
  if (sentence) {
    loremIpsum = sentence;
  } else {
    loremIpsum = randomPickSentence();
  }
  const splitted = loremIpsum.split(" ");
  const randomIndex = Math.floor(Math.random() * splitted.length);
  return splitted[randomIndex];
}

export function randomPickWords(count: number, sentence?: string): string[] {
  let words: string[];
  if (sentence) {
    words = sentence.split(" ");
  } else {
    words = randomPickSentence().split(" ");
  }
  count = Math.min(words.length, count);
  let results: string[] = [];
  for (let i = 0; i < count; i++) {
    let eachRandom;
    do {
      const randomIndex = Math.floor(Math.random() * words.length);
      eachRandom = words[randomIndex];
    } while (results.includes(eachRandom));
    results.push(eachRandom);
  }
  return results;
}

export function dispose(): void {
  loremIpsums = [];
}

async function downloadLoremIpsums(baseURL: string): Promise<string[]> {
  try {
    const response = await fetch(baseURL + "/api/loremipsum.json", {
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
    return downloadLoremIpsums(baseURL);
  }
}
