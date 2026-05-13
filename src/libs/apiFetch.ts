const API_URL = process.env.API_URL!;


const apiKey = process.env.DISCORD_BOT_KEY
export async function apiFetch<T>(
    path: string,
    options?: RequestInit,
): Promise<T> {

    const response = await fetch(
        `${API_URL}${path}`,
        {
            ...options,

            headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey!,
                ...(options?.headers || {}),
            },
        }
    );

    if (!response.ok) {

        throw new Error(
            `API Error ${response.status}`
        );
    }

    return response.json();
}