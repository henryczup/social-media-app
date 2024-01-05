import { Metadata } from "next"


export const metadata: Metadata = {
    title: 'About',
    description: 'NextSpace is a social media app.',
  }
  
export default function About() {
    return (
        <main>
        <h1>About</h1>
        <p>NextSpace is a social media app.</p>
        </main>
    )
}