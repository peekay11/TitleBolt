import { useState } from 'react'

const AppSimple = () => {
  const [count, setCount] = useState(0)

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'var(--bg-dark)',
      color: 'var(--text-primary)',
      fontFamily: 'system-ui'
    }}>
      <h1>TitleBolt - Simple Test</h1>
      <p>Count: {count}</p>
      <button 
        onClick={() => setCount(count + 1)}
        style={{
          padding: '10px 20px',
          background: 'var(--primary)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Click me
      </button>
    </div>
  )
}

export default AppSimple