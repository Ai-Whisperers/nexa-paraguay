# Nexa Paraguay — Integration Setup Guide
## For Kiki Weiss / Nexa team

This guide explains what accounts you need to create and what information to send us so we can connect everything.

---

## 1. Google Analytics (GA4) — Required

**What it does:** Tracks website visitors, page views, conversions, and ad performance.

### Step-by-step

1. Go to https://analytics.google.com
2. Sign in with your Google account (or create one)
3. Click **Start measuring** → Create a new property
4. Property name: **Nexa Paraguay Website**
5. Reporting time zone: **America/Asuncion**
6. Currency: **USD**
7. Click **Create**
8. Select **Web** as the platform
9. Website URL: **https://nexaparaguay.com**
10. Click **Create stream**
11. Copy the **Measurement ID** (looks like `G-XXXXXXXXXX`)

### Send us

```
Measurement ID: G-____________
```

---

## 2. HubSpot CRM — Required

**What it does:** Captures contact form submissions, stores leads, sends automated emails.

### Step-by-step

1. Go to https://www.hubspot.com/products/crm
2. Sign up for a **Free CRM** account
3. After setup, go to your HubSpot dashboard
4. Click the gear icon (Settings) → **Tracking & Analytics** → **Tracking Code**
5. Copy your **Hub ID** (a number like `123456789`)

### Create a Contact Form

1. In HubSpot, go to **Marketing** → **Lead Capture** → **Forms**
2. Click **Create form**
3. Choose **Embedded form**
4. Add these fields:
   - First name (required)
   - Last name (required)
   - Email (required)
   - Phone (optional)
   - Country of residence (dropdown: Netherlands, Germany, Spain, Belgium, Other)
   - Program interest (dropdown: Base, Business, Investor, Land, Not sure)
   - Message (textarea, optional)
5. Click **Update options** → set submission action to **"Show thank you message"**
6. Publish the form
7. Copy the **Form ID** from the URL or embed code (looks like `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

### Send us

```
HubSpot Portal ID: _______________
Contact Form ID:   _______________
HubSpot account email: ___________
```

---

## 3. Mailchimp — Recommended

**What it does:** Manages email newsletter subscribers and sends email campaigns.

### Step-by-step

1. Go to https://mailchimp.com
2. Create a free account
3. Once logged in, go to **Audience** → **Manage Audience** → **Settings**
4. Find your **Audience ID** (in the URL or under "Audience name and defaults")

### Create a Signup Form (optional but recommended)

1. Go to **Audience** → **Signup forms**
2. Choose **Embedded form**
3. Customize fields (Name, Email)
4. Copy the form action URL

### Send us

```
Mailchimp Audience ID:  audience-_________
Mailchimp API Key:      ___________
```

---

## 4. Calendly — Already set up

**Status: ✅ Already done**

Your Calendly is configured at:
```
https://calendly.com/nexaparaguay/consulta
```

If you need to change the booking URL, send us the new one.

---

## 5. WhatsApp Business — Already set up

**Status: ✅ Already done**

Your WhatsApp number:
```
+595 982 515 138
```

If this changes, let us know.

---

## 6. Social Media Accounts

### Instagram — Already set up
```
https://instagram.com/nexaparaguay
```

### LinkedIn — Already set up
Appears to exist but no URL is configured. Send us:
```
LinkedIn URL: https://www.linkedin.com/company/___________
```

### Facebook — Not set up
If you have a Facebook page, send us:
```
Facebook URL: https://facebook.com/___________
```
If not, we'll remove the Facebook link from the footer.

---

## Summary — What to Send Us

Copy and fill this out:

```
--- GOOGLE ANALYTICS ---
Measurement ID: G-_______________

--- HUBSPOT ---
Portal ID: _____________________
Form ID:   _____________________

--- MAILCHIMP (if using) ---
Audience ID:  audience-_________
API Key:      __________________

--- SOCIAL MEDIA ---
LinkedIn: https://www.linkedin.com/company/_________
Facebook: https://facebook.com/_________  (or "No Facebook page")
Instagram: ✅ Already set

--- CONTACT — please confirm ---
WhatsApp:  +595 982 515 138  (correct? Y/N)
Email:     hola@nexaparaguay.com  (correct? Y/N)
Address:   Asunción, Villa Morra  (correct? Y/N)

--- PHOTOS (for site launch) ---
Team photos ready?     Y/N — when? ___
Office photos ready?   Y/N — when? ___
Real testimonials?     Y/N — when? ___

--- TRANSLATIONS ---
German review done?    Y/N — when? ___
Dutch review done?     Y/N — when? ___
```

---

## What Happens Next (after we receive credentials)

| Integration | What we do | Time |
|-------------|-----------|------|
| GA4 | Insert ID into site.json + verify data appears in GA dashboard | 15 min |
| HubSpot | Create contact form component + API route that posts to HubSpot | 2-3 hrs |
| Mailchimp | Add subscribe endpoint → newsletter signup on Resources page | 2-3 hrs |
| Calendly embed | Replace text link with inline calendar widget on Contact page | 30 min |
| Social links | Add LinkedIn + Facebook to footer and schema | 15 min |
| Photos | Replace AI placeholders with real images | — (asap) |
| Translation review | Fix German/Dutch flagged issues | — (asap) |

**Send the filled form back to us (Ivan / Sunstein) and we'll implement everything.**
