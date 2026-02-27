# Google reCAPTCHA v3 Setup Guide

## Overview
The feedback forum now includes Google reCAPTCHA v3 protection to prevent spam and abuse.

## Setup Instructions

### 1. Get Your reCAPTCHA Keys
1. Visit [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Click on the **+** button to register a new site
3. Fill in the form:
   - **Label**: Nearby Community Feedback Forum
   - **reCAPTCHA type**: Select **reCAPTCHA v3**
   - **Domains**: Add your domain(s):
     - `localhost` (for development)
     - `nearcomapp.com` (your production domain)
     - Any other domains where the app will be hosted
4. Accept the reCAPTCHA Terms of Service
5. Click **Submit**
6. Copy your **Site Key** and **Secret Key**

### 2. Configure the Site Key

Open `src/main.js` and replace the test site key with your actual site key:

```javascript
app.use(VueReCaptcha, {
    siteKey: 'YOUR_ACTUAL_SITE_KEY_HERE', // Replace this
    loaderOptions: {
        autoHideBadge: false,
        explicitRenderParameters: {
            badge: 'bottomright'
        }
    }
});
```

### 3. Backend Integration (Required for Production)

The current implementation stores messages locally. For production, you need to:

1. **Create a backend API endpoint** to receive feedback submissions
2. **Verify the reCAPTCHA token** on your server using the Secret Key

Example backend verification (Node.js/Express):

```javascript
const axios = require('axios');

app.post('/api/feedback', async (req, res) => {
    const { name, email, version, topic, message, recaptchaToken } = req.body;
    
    // Verify reCAPTCHA token
    try {
        const verifyResponse = await axios.post(
            'https://www.google.com/recaptcha/api/siteverify',
            null,
            {
                params: {
                    secret: 'YOUR_SECRET_KEY',
                    response: recaptchaToken
                }
            }
        );
        
        if (verifyResponse.data.success && verifyResponse.data.score >= 0.5) {
            // Token is valid and score is acceptable
            // Save the feedback to your database
            // ... your database logic here
            
            res.json({ success: true, message: 'Feedback received' });
        } else {
            res.status(400).json({ success: false, message: 'reCAPTCHA verification failed' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});
```

### 4. Update Feedback.vue for Production

In `src/views/Feedback.vue`, uncomment and configure the API call:

```javascript
// Replace the demo code with actual API call
const response = await fetch('/api/feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        name: this.name,
        email: this.email,
        version: this.version,
        topic: this.topic,
        message: this.message,
        recaptchaToken: token
    })
});

if (response.ok) {
    this.submitted = true;
} else {
    throw new Error('Failed to submit feedback');
}
```

## Testing

### Test Site Key (Currently Used)
- **Site Key**: `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI`
- This key always passes validation (for testing only)
- **DO NOT use in production**

### Testing the Implementation
1. Run the development server: `yarn dev`
2. Navigate to the Feedback page
3. Fill out the form with:
   - Name/Nickname
   - App Version
   - Topic (Feedback/Bug/Enhancement)
   - Message
4. Click "Post Message"
5. The reCAPTCHA will execute in the background
6. Message should be added to the forum

## Features Implemented

### Forum-like Interface
- ✅ Public message board showing all feedback
- ✅ Name/Nickname input (required)
- ✅ Version selector (1.0.0, 1.0.1, 1.1.0, 1.2.0, 2.0.0)
- ✅ Topic selector (Feedback, Bug, Enhancement)
- ✅ Email field (optional)
- ✅ Message textarea (required)

### Filtering System
- ✅ Filter by Version
- ✅ Filter by Topic
- ✅ Real-time filtering of messages

### Google reCAPTCHA v3
- ✅ Invisible reCAPTCHA integration
- ✅ Automatic token generation on form submission
- ✅ Error handling for failed verification
- ✅ User-friendly notices about reCAPTCHA protection

### UI/UX Features
- ✅ Responsive design for mobile, tablet, and desktop
- ✅ Dark mode compatible
- ✅ Message cards with author avatars
- ✅ Color-coded topic tags
- ✅ Version badges
- ✅ Relative timestamps (Today, Yesterday, X days ago)
- ✅ Success confirmation with option to add another message
- ✅ Form validation with helpful error messages
- ✅ Loading state during submission

### Internationalization
- ✅ Full English translations
- ✅ Full Hungarian translations
- ✅ All new fields and messages translated

## Security Considerations

1. **Never expose your Secret Key** in client-side code
2. **Always verify tokens on the server** - client-side verification is not secure
3. **Set appropriate score thresholds** (0.5 is recommended, adjust based on your needs)
4. **Monitor your reCAPTCHA dashboard** for suspicious activity
5. **Implement rate limiting** on your backend API
6. **Sanitize user input** before storing in database
7. **Use HTTPS** in production

## Troubleshooting

### reCAPTCHA Badge Not Showing
- Check that the site key is correct
- Ensure the domain is registered in reCAPTCHA admin
- Check browser console for errors

### Verification Always Failing
- Verify the Secret Key on your backend is correct
- Check that you're sending the token correctly
- Ensure your server can reach Google's verification endpoint

### Messages Not Persisting
- Current implementation uses localStorage (demo only)
- Implement backend API for production persistence
- Consider using a database (PostgreSQL, MongoDB, etc.)

## Additional Resources

- [Google reCAPTCHA v3 Documentation](https://developers.google.com/recaptcha/docs/v3)
- [vue-recaptcha-v3 Package](https://www.npmjs.com/package/vue-recaptcha-v3)
- [reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
