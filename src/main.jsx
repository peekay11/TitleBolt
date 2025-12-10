import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import { PostHogProvider } from 'posthog-js/react'
import './index.css'
import App from './App.jsx'

// Use production key from environment variables
const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_cmVsYXRlZC1lZnQtNTAuY2xlcmsuYWNjb3VudHMuZGV2JA'

const posthogOptions = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
}

// Unregister any existing service workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => {
      registration.unregister();
    });
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PostHogProvider apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY} options={posthogOptions}>
      <ClerkProvider 
        publishableKey={CLERK_KEY}
        clerkJSUrl="https://cdn.clerk.com/npm/@clerk/clerk-js@5/dist/clerk.browser.js"
      >
        <App />
      </ClerkProvider>
    </PostHogProvider>
  </StrictMode>
)
