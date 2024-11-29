const { VITE_BACKEND_HOST, VITE_BACKEND_PORT, DEV } = import.meta.env
const PROTOCOL = DEV ? 'http' : 'https'
const API_URL = `${PROTOCOL}://${VITE_BACKEND_HOST}:${VITE_BACKEND_PORT}`

export const fetchAPI = async(path: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_URL}/${path}`, {
    credentials: 'include',
    ...options,
  })

  if (!response.ok) throw new Error(response.statusText)

  return await response.json()
}
