import { auth, createServerToken } from "./auth"

const API_URL = process.env.SERVER_URL || "http://localhost:4000"

type RequestOptions = {
  method?: string
  body?: unknown
}

const serverFetch = async (path: string, options: RequestOptions = {}) => {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const token = await createServerToken(session.user.id)

  const res = await fetch(`${API_URL}${path}`, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: "no-store",
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }))
    throw new Error(err.error || "Request failed")
  }

  return res.json()
}

export const publicFetch = async (path: string) => {
  const res = await fetch(`${API_URL}${path}`, { cache: "no-store" })
  if (!res.ok) throw new Error("Request failed")
  return res.json()
}

export const api = {
  get: (path: string) => serverFetch(path),
  post: (path: string, body?: unknown) => serverFetch(path, { method: "POST", body }),
  delete: (path: string) => serverFetch(path, { method: "DELETE" }),
}
