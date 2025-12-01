import { useState, useEffect } from 'react'
import { invoke } from '@tauri-apps/api/tauri'

const API_URL = 'http://localhost:8000'

function App() {
  const [prompt, setPrompt] = useState('')
  const [generatedImage, setGeneratedImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [backendReady, setBackendReady] = useState(false)
  const [systemInfo, setSystemInfo] = useState(null)
  const [deviceInfo, setDeviceInfo] = useState(null)

  // Settings
  const [width, setWidth] = useState(1024)
  const [height, setHeight] = useState(1024)
  const [steps, setSteps] = useState(9)
  const [seed, setSeed] = useState('')

  // Stats
  const [timeElapsed, setTimeElapsed] = useState(null)
  const [totalGenerated, setTotalGenerated] = useState(0)

  const examplePrompts = [
    "A futuristic cyberpunk city at night with neon lights reflecting on wet streets",
    "Young Chinese woman in red Hanfu with intricate embroidery and golden phoenix headdress",
    "Photorealistic portrait of a robot with human-like eyes, cinematic lighting",
    "Abstract geometric shapes in bold primary colors, neo-brutalist style",
    "Serene Japanese garden with cherry blossoms and traditional wooden bridge"
  ]

  // Check backend health periodically
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const healthy = await invoke('check_backend_health')
        setBackendReady(healthy)

        if (healthy && !deviceInfo) {
          // Get device info from backend
          const response = await fetch(`${API_URL}/health`)
          const data = await response.json()
          setDeviceInfo(data)
        }
      } catch (err) {
        setBackendReady(false)
      }
    }

    // Get system info
    invoke('get_system_info').then(setSystemInfo)

    // Check immediately and then every 3 seconds
    checkBackend()
    const interval = setInterval(checkBackend, 3000)

    return () => clearInterval(interval)
  }, [deviceInfo])

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt')
      return
    }

    if (!backendReady) {
      setError('Backend is starting... Please wait a moment')
      return
    }

    setLoading(true)
    setError(null)
    setGeneratedImage(null)
    const startTime = Date.now()

    try {
      const response = await fetch(`${API_URL}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          width: parseInt(width),
          height: parseInt(height),
          num_inference_steps: parseInt(steps),
          seed: seed ? parseInt(seed) : null,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Generation failed')
      }

      const data = await response.json()
      setGeneratedImage(data.image)
      setTimeElapsed(((Date.now() - startTime) / 1000).toFixed(2))
      setTotalGenerated(prev => prev + 1)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      generateImage()
    }
  }

  const useExamplePrompt = (examplePrompt) => {
    setPrompt(examplePrompt)
  }

  const saveImage = () => {
    if (!generatedImage) return
    const link = document.createElement('a')
    link.href = generatedImage
    link.download = `z-image-${Date.now()}.png`
    link.click()
  }

  return (
    <div className="app-container">
      {/* Header */}
      <div className="app-header">
        <h1>⚡ Z-IMAGE GENERATOR</h1>
        <div className="status-badge">
          <div
            className="status-indicator"
            style={{ background: backendReady ? '#00FF00' : '#FF0000' }}
          />
          <span>{backendReady ? 'READY' : 'STARTING...'}</span>
        </div>
      </div>

      <div className="app-body">
        {/* Sidebar */}
        <div className="sidebar">
          {/* Device Info */}
          {deviceInfo && (
            <div className="section" style={{ background: '#000', color: '#00FF00', borderBottom: '4px solid #00FF00' }}>
              <div className="section-title" style={{ color: '#00FF00' }}>
                SYSTEM STATUS
              </div>
              <p style={{ fontWeight: 900, fontSize: '0.9rem' }}>
                Device: {deviceInfo.device_name}
              </p>
              <p style={{ fontSize: '0.8rem', marginTop: '5px', opacity: 0.8 }}>
                Platform: {deviceInfo.platform} • {deviceInfo.architecture}
              </p>
            </div>
          )}

          {/* Privacy Notice */}
          <div className="section">
            <div className="info-box">
              <p>🔒 100% PRIVATE: All processing happens on your machine. No data leaves your computer.</p>
            </div>
          </div>

          {/* Prompt Input */}
          <div className="section">
            <div className="section-title">YOUR PROMPT</div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Describe the image you want to generate..."
              disabled={loading || !backendReady}
            />
            <p style={{ fontSize: '0.75rem', marginTop: '8px', opacity: 0.7 }}>
              Press {systemInfo?.is_macos ? 'Cmd' : 'Ctrl'}+Enter to generate
            </p>
          </div>

          {/* Controls */}
          <div className="section">
            <div className="section-title">SETTINGS</div>
            <div className="controls-grid">
              <div className="control-group">
                <label className="label">Width</label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  min="512"
                  max="2048"
                  step="64"
                  disabled={loading}
                />
              </div>
              <div className="control-group">
                <label className="label">Height</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  min="512"
                  max="2048"
                  step="64"
                  disabled={loading}
                />
              </div>
              <div className="control-group">
                <label className="label">Steps</label>
                <input
                  type="number"
                  value={steps}
                  onChange={(e) => setSteps(e.target.value)}
                  min="4"
                  max="50"
                  step="1"
                  disabled={loading}
                />
              </div>
              <div className="control-group">
                <label className="label">Seed</label>
                <input
                  type="number"
                  value={seed}
                  onChange={(e) => setSeed(e.target.value)}
                  placeholder="Random"
                  disabled={loading}
                />
              </div>
            </div>

            <button
              className="primary"
              onClick={generateImage}
              disabled={loading || !backendReady}
            >
              {loading ? '⚡ GENERATING...' : '⚡ GENERATE'}
            </button>

            {timeElapsed && (
              <div style={{
                marginTop: '15px',
                textAlign: 'center',
                fontSize: '1rem',
                fontWeight: 900,
                color: '#00FF00',
                background: '#000',
                padding: '10px',
                border: '3px solid #00FF00'
              }}>
                ⚡ {timeElapsed}s
              </div>
            )}
          </div>

          {/* Examples */}
          <div className="section">
            <div className="section-title">EXAMPLES</div>
            <div className="examples">
              {examplePrompts.map((example, idx) => (
                <button
                  key={idx}
                  className="example-btn"
                  onClick={() => useExamplePrompt(example)}
                  disabled={loading}
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {error && (
            <div style={{ padding: '20px' }}>
              <div className="error">
                ⚠️ {error}
              </div>
            </div>
          )}

          <div className="image-viewer">
            {loading && (
              <div className="loading">
                <div className="loading-text">⚡⚡⚡</div>
                <p style={{ fontWeight: 900, fontSize: '1.2rem' }}>
                  GENERATING YOUR IMAGE...
                </p>
              </div>
            )}

            {!loading && !generatedImage && !error && (
              <div className="placeholder">
                {backendReady
                  ? 'YOUR IMAGE WILL APPEAR HERE'
                  : 'STARTING BACKEND... PLEASE WAIT'}
              </div>
            )}

            {generatedImage && !loading && (
              <>
                <img src={generatedImage} alt="Generated" />
                <button
                  className="secondary"
                  onClick={saveImage}
                  style={{
                    position: 'absolute',
                    bottom: '30px',
                    right: '30px',
                    background: '#00FF00',
                    width: 'auto',
                    padding: '15px 30px'
                  }}
                >
                  ⬇ SAVE IMAGE
                </button>
              </>
            )}
          </div>

          {/* Stats Footer */}
          <div className="stats">
            <div className="stat-item">
              <div className="stat-value">{totalGenerated}</div>
              <div className="stat-label">Total Generated</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{timeElapsed || '—'}</div>
              <div className="stat-label">Last Time (s)</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{backendReady ? '●' : '○'}</div>
              <div className="stat-label">Backend Status</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
