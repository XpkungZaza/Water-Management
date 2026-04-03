import { redirect } from 'next/navigation'

export default function Home() {
  // Redirect to site 1 by default
  redirect('/1')
  return null
}
