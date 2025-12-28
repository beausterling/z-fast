import { useState, useRef } from 'react'

const API_URL = import.meta.env.VITE_API_URL || '/api'

function App() {
  const [prompt, setPrompt] = useState('')
  const [generatedImage, setGeneratedImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [width, setWidth] = useState(1024)
  const [height, setHeight] = useState(1024)
  const [steps, setSteps] = useState(9)
  const [seed, setSeed] = useState('')
  const [timeElapsed, setTimeElapsed] = useState(null)

  const examplePrompts = [
    "A futuristic cyberpunk city at night with neon lights reflecting on wet streets",
    "Young Chinese woman in red Hanfu with intricate embroidery and golden phoenix headdress",
    "A serene Japanese garden with cherry blossoms and a traditional wooden bridge",
    "Photorealistic portrait of a robot with human-like eyes, studio lighting",
    "Abstract geometric shapes in bold primary colors, neo-brutalist style"
  ]

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt')
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
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      generateImage()
    }
  }

  const useExamplePrompt = (examplePrompt) => {
    setPrompt(examplePrompt)
  }

  const downloadImage = () => {
    if (!generatedImage) return
    const link = document.createElement('a')
    link.href = generatedImage
    link.download = `z-image-${Date.now()}.png`
    link.click()
  }

  return (
    <div className="container">
      <header style={{ textAlign: 'center', marginBottom: '40px', marginTop: '20px' }}>
        <h1>⚡️ Z-IMAGE</h1>
        <p style={{ fontSize: '1.2rem', fontWeight: 900 }}>
          ULTRA-FAST AI IMAGE GENERATION
        </p>
        <div style={{ marginTop: '15px' }}>
          <span className="badge" style={{ background: '#00FF00' }}>SUB-SECOND</span>
          <span className="badge" style={{ background: '#00FFFF' }}>8 STEPS</span>
          <span className="badge" style={{ background: '#FF00FF' }}>6B MODEL</span>
        </div>
      </header>

      <div className="grid grid-2">
        <div>
          <div className="card">
            <h2>GENERATE</h2>

            <div className="input-group">
              <label className="label">YOUR PROMPT</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Describe the image you want to generate..."
                disabled={loading}
              />
              <p style={{ fontSize: '0.8rem', marginTop: '8px', opacity: 0.7 }}>
                Press Ctrl+Enter to generate
              </p>
            </div>

            <div className="controls">
              <div className="number-input">
                <label className="label">WIDTH</label>
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

              <div className="number-input">
                <label className="label">HEIGHT</label>
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

              <div className="number-input">
                <label className="label">STEPS</label>
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

              <div className="number-input">
                <label className="label">SEED (OPTIONAL)</label>
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
              onClick={generateImage}
              disabled={loading}
              style={{
                width: '100%',
                marginTop: '20px',
                fontSize: '1.5rem',
                padding: '25px',
              }}
            >
              {loading ? '⚡ GENERATING...' : '⚡ GENERATE IMAGE'}
            </button>

            {timeElapsed && (
              <div style={{
                marginTop: '15px',
                textAlign: 'center',
                fontSize: '1.1rem',
                fontWeight: 900,
                color: '#00FF00',
                background: '#000000',
                padding: '10px',
                border: '3px solid #000000'
              }}>
                ⚡ GENERATED IN {timeElapsed}s
              </div>
            )}
          </div>

          <div className="card" style={{ background: '#FFFF00' }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>EXAMPLE PROMPTS</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {examplePrompts.map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => useExamplePrompt(example)}
                  disabled={loading}
                  style={{
                    padding: '15px',
                    fontSize: '0.9rem',
                    textAlign: 'left',
                    background: '#FFFFFF',
                    textTransform: 'none',
                  }}
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          {error && (
            <div className="error">
              ⚠️ ERROR: {error}
            </div>
          )}

          <div className="card" style={{
            background: generatedImage ? '#FFFFFF' : '#F0F0F0',
            minHeight: '600px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {loading && (
              <div style={{ textAlign: 'center' }}>
                <div className="loading" style={{
                  fontSize: '3rem',
                  fontWeight: 900,
                  marginBottom: '20px'
                }}>
                  ⚡⚡⚡
                </div>
                <p style={{ fontSize: '1.5rem', fontWeight: 900 }}>
                  GENERATING YOUR IMAGE...
                </p>
              </div>
            )}

            {!loading && !generatedImage && !error && (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <p style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '20px' }}>
                  YOUR IMAGE WILL APPEAR HERE
                </p>
                <p style={{ fontSize: '1rem', opacity: 0.7 }}>
                  Enter a prompt and hit generate
                </p>
              </div>
            )}

            {generatedImage && (
              <>
                <img
                  src={generatedImage}
                  alt="Generated"
                  style={{
                    width: '100%',
                    height: 'auto',
                    marginBottom: '20px'
                  }}
                />
                <button
                  onClick={downloadImage}
                  style={{
                    background: '#00FF00',
                    width: '100%',
                    padding: '20px',
                    fontSize: '1.2rem'
                  }}
                >
                  ⬇ DOWNLOAD IMAGE
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <footer style={{
        textAlign: 'center',
        marginTop: '60px',
        marginBottom: '40px',
        padding: '30px',
        border: '4px solid #000000',
        background: '#000000',
        color: '#FFFF00'
      }}>
        <p style={{ fontSize: '1.2rem', fontWeight: 900 }}>
          POWERED BY Z-IMAGE-TURBO
        </p>
        <p style={{ fontSize: '0.9rem', marginTop: '10px', color: '#FFFFFF' }}>
          6B Parameter Model • 8 NFEs • Sub-Second Inference
        </p>
      </footer>
    </div>
  )
}

export default App
