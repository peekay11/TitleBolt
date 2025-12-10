import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import { PostHogProvider } from 'posthog-js/react'
import './index.css'
import App from './App.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const posthogOptions = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PostHogProvider apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY} options={posthogOptions}>
      <ClerkProvider 
        publishableKey={PUBLISHABLE_KEY}
        clerkJSUrl="https://cdn.clerk.com/npm/@clerk/clerk-js@5/dist/clerk.browser.js"
      >
        <App />
      </ClerkProvider>
    </PostHogProvider>
  </StrictMode>,
)
