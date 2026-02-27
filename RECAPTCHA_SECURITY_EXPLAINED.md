# reCAPTCHA Security: Site Key vs Secret Key

## Is it Normal for the Site Key to be Public?

**YES! It's completely normal and expected.** The reCAPTCHA site key is designed to be public.

## Understanding reCAPTCHA Keys

### 🔓 Site Key (Public)
- **Purpose**: Used in client-side code (browser/frontend)
- **Visibility**: Meant to be publicly visible
- **Location**: In your JavaScript/HTML code
- **Security**: NOT sensitive - can be seen by anyone
- **Function**: Tells Google which site is making the request

**Current site key in [`src/main.js`](src/main.js:14)**:
```javascript
siteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
```

### 🔐 Secret Key (Private)
- **Purpose**: Used in server-side code (backend)
- **Visibility**: MUST be kept secret
- **Location**: On your server, never in client code
- **Security**: HIGHLY sensitive - never expose
- **Function**: Verifies the reCAPTCHA token with Google

## How reCAPTCHA Security Works

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Browser   │         │  Your Server │         │   Google    │
│  (Client)   │         │  (Backend)   │         │  reCAPTCHA  │
└─────────────┘         └──────────────┘         └─────────────┘
       │                        │                        │
       │ 1. Load page with      │                        │
       │    Site Key (public)   │                        │
       │◄───────────────────────┤                        │
       │                        │                        │
       │ 2. User submits form   │                        │
       ├────────────────────────►                        │
       │                        │                        │
       │ 3. Execute reCAPTCHA   │                        │
       │    with Site Key       │                        │
       ├────────────────────────┼───────────────────────►│
       │                        │                        │
       │ 4. Receive token       │                        │
       │◄───────────────────────┼────────────────────────┤
       │                        │                        │
       │ 5. Send token to       │                        │
       │    your server         │                        │
       ├────────────────────────►                        │
       │                        │                        │
       │                        │ 6. Verify token with   │
       │                        │    Secret Key (private)│
       │                        ├───────────────────────►│
       │                        │                        │
       │                        │ 7. Validation result   │
       │                        │◄───────────────────────┤
       │                        │                        │
       │ 8. Response to user    │                        │
       │◄───────────────────────┤                        │
       │                        │                        │
```

## Why This Design is Secure

### 1. **Two-Key System**
- Site key identifies your website (public)
- Secret key proves you're the real owner (private)
- Both are needed for complete verification

### 2. **Token-Based Verification**
- User interaction generates a one-time token
- Token is only valid for a few minutes
- Token must be verified server-side with secret key
- Token can only be used once

### 3. **Server-Side Validation**
- Even if someone sees your site key, they can't:
  - Bypass reCAPTCHA verification
  - Generate valid tokens without user interaction
  - Verify tokens without your secret key
  - Submit fake verification results

### 4. **Domain Restrictions**
- Site key is tied to specific domains
- Google only accepts requests from registered domains
- Prevents unauthorized use of your site key

## What Attackers CANNOT Do

Even with your public site key, attackers cannot:

❌ Bypass reCAPTCHA protection
❌ Generate valid tokens programmatically
❌ Verify tokens (requires secret key)
❌ Use your site key on their own domains (domain-locked)
❌ Spam your forms without detection
❌ Impersonate legitimate users

## What You MUST Keep Secret

### ⚠️ NEVER expose these:

1. **Secret Key** - Used for server-side verification
2. **Admin Passwords** - Currently hardcoded (see [`ADMIN_PASSWORD.md`](ADMIN_PASSWORD.md:1))
3. **API Keys** - For databases, services, etc.
4. **Environment Variables** - Containing sensitive data
5. **Private Keys** - For encryption, signing, etc.

## Current Implementation Status

### ✅ Secure (Public)
- Site key in [`src/main.js`](src/main.js:14) - **This is fine!**
- Client-side code visible in browser - **This is normal!**

### ⚠️ Needs Backend (Not Yet Implemented)
- Secret key verification - **Must be on server**
- Token validation - **Must be server-side**
- Database operations - **Must be server-side**

### ❌ Not Secure (Current Demo)
- Admin password in client code - **Change for production!**
- No server-side verification - **Implement backend!**
- LocalStorage for data - **Use database in production!**

## Example: Proper Backend Verification

```javascript
// ❌ WRONG - Never do this (secret key in client)
const SECRET_KEY = 'your_secret_key'; // NEVER in client code!

// ✅ CORRECT - Server-side verification
// Backend API (Node.js/Express example)
app.post('/api/verify-recaptcha', async (req, res) => {
    const { token } = req.body;
    
    try {
        const response = await axios.post(
            'https://www.google.com/recaptcha/api/siteverify',
            null,
            {
                params: {
                    secret: process.env.RECAPTCHA_SECRET_KEY, // From environment variable
                    response: token
                }
            }
        );
        
        if (response.data.success && response.data.score >= 0.5) {
            // Token is valid
            res.json({ valid: true, score: response.data.score });
        } else {
            // Token is invalid
            res.json({ valid: false });
        }
    } catch (error) {
        res.status(500).json({ error: 'Verification failed' });
    }
});
```

## Real-World Examples

Major websites with visible site keys:
- Google Forms
- WordPress login pages
- E-commerce checkout pages
- Contact forms across the internet

You can inspect any website using reCAPTCHA and see their site key in the HTML/JavaScript - this is by design!

## Best Practices

### ✅ DO:
- Keep site key in client-side code
- Register specific domains for your site key
- Verify tokens server-side with secret key
- Store secret key in environment variables
- Monitor reCAPTCHA admin dashboard for abuse
- Set appropriate score thresholds (0.5 recommended)

### ❌ DON'T:
- Put secret key in client code
- Skip server-side verification
- Trust client-side validation alone
- Share your secret key publicly
- Commit secret keys to version control
- Use the same keys for dev and production

## Testing Your Setup

### Current Test Key (Development)
```javascript
siteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
```
- This is Google's official test key
- Always passes validation
- Use for development/testing only
- Replace with your real key for production

### Production Keys
1. Get from [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Register your domain(s)
3. Use site key in client code (public)
4. Use secret key in server code (private)

## Summary

| Key Type | Visibility | Location | Security Level |
|----------|-----------|----------|----------------|
| **Site Key** | Public | Client-side | Not sensitive |
| **Secret Key** | Private | Server-side | Highly sensitive |

**Bottom Line**: Your site key being visible in [`src/main.js`](src/main.js:14) is **completely normal and secure**. The security comes from server-side verification with the secret key, which should never be exposed.

## Additional Resources

- [Google reCAPTCHA v3 Documentation](https://developers.google.com/recaptcha/docs/v3)
- [reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
- [Best Practices Guide](https://developers.google.com/recaptcha/docs/v3#best_practices)
- [Server-Side Verification](https://developers.google.com/recaptcha/docs/verify)
