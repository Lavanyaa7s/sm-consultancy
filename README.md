# SM Consultancy Services — Website Handover Documentation

Welcome to your official website source code and deployment package. This guide outlines how your website is structured, how to host it on **Vercel** (or Netlify/Cloudflare), connect your custom domain, and manage future updates.

---

## 1. Project Overview & File Structure

This website is built with clean, standards-compliant **HTML5, CSS3 (Custom Luxury Design Tokens), and Vanilla JavaScript**. It requires no Node.js build step or complex server management—making it blazing fast, secure, and cost-free to host.

```
sm-consultancy/
├── index.html          # Homepage (Hero, About preview, 4 Practice Cards, Promo, Matrix, Stats, Testimonial, Trust bar)
├── about.html          # About Us (Company Story, 4 Core Values, Full Stats, Testimonial)
├── services.html       # Our Services (Jump Navigation, 5 Service Showcases, 4-Step Process)
├── industries.html     # Case Study / Who We Serve (Interactive Client Segment Cards)
├── faq.html            # FAQ (Single-open Smart Accordion)
├── contact.html        # Contact Us (Executive Form, Direct Cards, Office Hours, Google Maps)
├── style.css           # Master Stylesheet (Corporate Navy #0b2a5b, White, Gold #c9a227)
├── script.js           # Interactive Features (Counters, Scroll Reveal, Sticky Blur, FAQ Accordion)
├── vercel.json         # Vercel Configuration (Clean URLs without .html, Security Headers)
├── sitemap.xml         # Search Engine Sitemap for SEO
├── robots.txt          # Search Engine Crawler Directives
└── HANDOVER.md         # This Documentation Guide
```

---

## 2. Is Vercel Safe and Is There Enough Storage?

### ✅ Is Vercel Safe?
**Yes, exceptionally safe.**
- **Enterprise-Grade Infrastructure:** Vercel powers websites for global companies like OpenAI, Uber, Nike, and The Washington Post.
- **Immune to Database Hacks:** Because this website is a static build, there is no database server or WordPress backend that can be compromised via SQL injection or plugin vulnerabilities.
- **DDoS Mitigation & Edge CDN:** Global distribution across 100+ worldwide edge locations with automatic DDoS defense.
- **Free Automatic SSL/TLS:** Automatically provisions and renews SSL certificates (HTTPS) for your custom domain at no cost.

### 📦 Does Vercel Have Enough Storage?
**More than enough.**
- **Website Size:** This entire project is approximately **150 KB** (images load via high-performance CDN).
- **Vercel Free (Hobby) Allowance:**
  - **100 GB** bandwidth per month (sufficient for **200,000+ visitors** per month).
  - Maximum upload size per deployment: **100 MB** (your site is ~0.15 MB, meaning it uses less than 0.2% of the single-deploy limit).
  - **Storage and bandwidth are more than 1,000× what this website requires.**

---

## 3. Step-by-Step: How to Host on Vercel

### Method A: Quick Drag-and-Drop (No Git Required — 2 Minutes)
1. Go to [vercel.com](https://vercel.com) and sign up for a free account (using Email, GitHub, or Google).
2. Install the **Vercel CLI** or simply use the web dashboard:
   - Go to [vercel.com/new](https://vercel.com/new).
   - If using the CLI on Windows, open PowerShell in this folder and run:
     ```bash
     npm i -g vercel
     vercel
     ```
   - Follow the 3 prompts (Set up and deploy? **Yes**). Your site will be live instantly!

### Method B: Via GitHub (Recommended for Easy Updates)
1. Create a repository on GitHub (e.g. `sm-consultancy-website`).
2. Push this folder to your repository.
3. On [vercel.com](https://vercel.com), click **"Add New"** -> **"Project"**.
4. Import your GitHub repository.
5. Keep default settings (Framework Preset: **Other**) and click **"Deploy"**.
6. Every time you push changes to GitHub in the future, Vercel will automatically re-deploy your website within 10 seconds.

---

## 4. How to Connect Your Already-Bought Domain

Once your site is deployed on Vercel:

1. In the Vercel Dashboard, navigate to your project.
2. Click **Settings** (top tab) -> **Domains** (left sidebar).
3. Type your purchased domain (e.g., `smconsultancy.info` or `yourdomain.com`) and click **Add**.
4. Select the recommended option: `yourdomain.com` (with redirect from `www.yourdomain.com`).
5. Vercel will show two simple DNS records to add at your domain registrar (GoDaddy, Namecheap, Exabytes, Hostinger, etc.):

| Record Type | Name / Host | Value / Target | TTL |
|---|---|---|---|
| **A Record** | `@` (or blank) | `76.76.21.21` | Automatic / 3600 |
| **CNAME** | `www` | `cname.vercel-dns.com` | Automatic / 3600 |

6. Once added in your registrar's DNS manager, Vercel will automatically verify the connection and issue your **free SSL certificate** within 5 to 30 minutes.

---

## 5. Contact Form Handling Options

The contact form in `contact.html` is ready to collect inquiries. Depending on your host:

### Built-in Zero-Config Setup: Direct WhatsApp Auto-Send
The contact form on `contact.html` is configured to **automatically open WhatsApp with the client's filled inquiry details**:
1. When a visitor completes the form and clicks **"Send via WhatsApp"**, it automatically formats their Name, Phone, Email, Selected Service, and Message.
2. It opens a direct chat with your business WhatsApp (`+60 11-2926 2577` / `601129262577`) with the message pre-filled and ready to send.
3. This ensures:
   - **Zero lost leads** to spam filters.
   - **Instant mobile alert** directly to your phone.
   - **No complex email server or paid subscription required.**

### Alternative: Traditional Email Form (Web3Forms)
If you prefer submissions sent via email instead of WhatsApp:
1. Obtain a free key from [web3forms.com](https://web3forms.com) for `loogini@smconsultancy.info`.
2. Add `<input type="hidden" name="access_key" value="YOUR-KEY">` to the form in `contact.html`.

---

## 6. How to Edit Contact Info & Text in the Future

All contact information is clearly organized across the HTML files:
- **Phone / WhatsApp Number:** Search for `011-2926 2577` or `601129262577` to update.
- **Email Address:** Search for `loogini@smconsultancy.info` to update.
- **Office Address:** Search for `261-1, Jalan Satu Krubong` to update.
- **Colors:** Located at the top of `style.css` under `:root` (`--navy: #0b2a5b;`, `--gold: #c9a227;`).

---

*Handover prepared for SM Consultancy Services, Melaka.*
