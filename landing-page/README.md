# 🎨 Z-Image Landing Page

High-converting Neo-Brutalist landing page for Z-Image Desktop App.

## 🎯 Purpose

Convert visitors into users with:
- Bold, attention-grabbing design
- Clear value proposition
- Strong calls-to-action
- Privacy-first messaging
- Social proof through stats

## 🚀 Quick Start

### Development

```bash
npm install
npm run dev
```

Open http://localhost:3001

### Production Build

```bash
npm run build
```

Built files in `dist/`

## 📦 Deploy to Netlify

### Via Netlify UI

1. Push to GitHub
2. Go to https://app.netlify.com
3. "Add new site" → "Import an existing project"
4. Configure:
   - Base directory: `landing-page`
   - Build command: `npm run build`
   - Publish directory: `landing-page/dist`
5. Deploy!

### Via CLI

```bash
npm install -g netlify-cli
netlify deploy --prod
```

## 🎨 Design Principles

### Neo-Brutalism
- **Bold & Stark**: High contrast, thick borders
- **No Animations**: Zero transitions for speed
- **Loud Typography**: Uppercase, heavy weights
- **Honest Design**: Raw, functional aesthetic

### Conversion Optimization
- **Clear CTAs**: Multiple prominent "Get It Now" buttons
- **Social Proof**: Stats, badges, testimonials (when available)
- **Scannability**: Clear sections, visual hierarchy
- **Speed Focus**: Emphasize sub-second generation
- **Privacy First**: Highlight local processing

## 📋 Sections

1. **Hero** - Massive headline + primary CTA
2. **Features** - 6-grid showcase of benefits
3. **Stats** - Numbers that impress
4. **Privacy** - Security messaging
5. **How It Works** - 3-step process
6. **Tech Stack** - Build trust with known tools
7. **Requirements** - Set expectations
8. **Final CTA** - Last chance conversion
9. **Footer** - Links and credits

## 🔗 Links

All CTAs currently point to GitHub repo. Update `GITHUB_REPO` constant in `src/App.jsx` when ready to link to download page.

```javascript
const GITHUB_REPO = 'https://github.com/beausterling/z-fast'
// Later: const DOWNLOAD_URL = 'https://your-domain.com/download'
```

## 🎨 Customization

### Colors

Edit `src/index.css`:

```css
:root {
  --yellow: #FFFF00;    /* Primary CTA */
  --cyan: #00FFFF;      /* Secondary CTA */
  --magenta: #FF00FF;   /* Badges */
  --green: #00FF00;     /* Stats */
  /* Customize! */
}
```

### Content

Edit `src/App.jsx`:
- Change headlines
- Add/remove features
- Update stats
- Modify CTAs

## 📊 Metrics to Track

Once deployed, track:
- Page views
- CTA click-through rate
- Scroll depth
- Time on page
- GitHub repo stars (proxy for conversions)

## 🚀 Performance

Optimized for speed:
- No external dependencies
- No images (emoji icons only)
- Zero animations/transitions
- Minified build
- Fast Netlify CDN

Expected Lighthouse score: 95-100 across all metrics.

## 📱 Responsive

Fully responsive design:
- Mobile: Single column
- Tablet: Flexible grid
- Desktop: Full multi-column layout

## 🔍 SEO

Includes:
- Semantic HTML
- Meta descriptions
- Descriptive title
- Proper heading hierarchy
- Fast loading (good for ranking)

## 🎯 Future Enhancements

- [ ] Add real user testimonials
- [ ] Include demo video/GIF
- [ ] A/B test CTA copy
- [ ] Add download analytics
- [ ] Create comparison table vs. competitors
- [ ] Add email capture for updates

---

**Built to convert. Designed to impress. ⚡**
