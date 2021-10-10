declare type UserModel = import("../models/UserModel").default;

let retryHandler: number = NaN;

export async function downloadUsers(
  baseURL: string,
  filename: string
): Promise<UserModel[] | null> {
  if (!Number.isNaN(retryHandler)) {
    window.clearTimeout(retryHandler);
    retryHandler = NaN;
  }
  try {
    const randomNumber = Math.ceil(Math.random() * 5);
    const response = await fetch(
      `${baseURL}/api/${filename}-${randomNumber}.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    const jsonData = await response.json();
    return withGeneratedID(jsonData);
  } catch (error) {
    console.error(error);
    console.warn("Retrying in 3 seconds...");
    await new Promise(resolve => {
      retryHandler = window.setTimeout(resolve, 3000);
    });
    return downloadUsers(baseURL, filename);
  }
}

function withGeneratedID(results: UserModel[]): UserModel[] {
  for (let eachResult of results) {
    eachResult.id = Math.ceil(Math.random() * (Number.MAX_SAFE_INTEGER - 1));
  }
  return results;
}
