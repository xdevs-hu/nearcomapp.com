# Admin Password Configuration

## Current Admin Password

The admin password for posting comments is currently hardcoded in [`src/views/Feedback.vue`](src/views/Feedback.vue:7):

```javascript
const ADMIN_PASSWORD = 'NearComApp2026!SecureAdmin#Password';
```

## Security Notice

⚠️ **IMPORTANT SECURITY CONSIDERATIONS:**

1. **Change the Default Password**: The current password is a placeholder. You MUST change it before deploying to production.

2. **This is NOT Production-Ready**: Hardcoded passwords in client-side code are NOT secure for production use. Anyone can view the source code and see the password.

3. **Recommended Production Approach**:
   - Implement proper backend authentication
   - Use JWT tokens or session-based authentication
   - Store passwords securely with hashing (bcrypt, argon2)
   - Never expose passwords in client-side code

## How to Change the Password

### Option 1: Quick Change (Development Only)

Edit [`src/views/Feedback.vue`](src/views/Feedback.vue:7) and change line 7:

```javascript
const ADMIN_PASSWORD = 'YOUR_NEW_SECURE_PASSWORD_HERE';
```

### Option 2: Environment Variable (Better)

1. Create a `.env` file in the project root:
```env
VITE_ADMIN_PASSWORD=your_secure_password_here
```

2. Update [`src/views/Feedback.vue`](src/views/Feedback.vue:7):
```javascript
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'fallback_password';
```

3. Add `.env` to your `.gitignore` file

### Option 3: Backend Authentication (Production)

For production, implement proper backend authentication:

```javascript
// Backend API endpoint
app.post('/api/admin/login', async (req, res) => {
    const { username, password } = req.body;
    
    // Verify credentials against database
    const admin = await Admin.findOne({ username });
    if (!admin || !await bcrypt.compare(password, admin.passwordHash)) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign({ id: admin.id, role: 'admin' }, SECRET_KEY, { expiresIn: '24h' });
    res.json({ token });
});

// Verify token for comment posting
app.post('/api/comments', authenticateToken, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
    }
    
    // Process comment...
});
```

## Password Requirements

For security, use a strong password that includes:
- At least 16 characters
- Uppercase and lowercase letters
- Numbers
- Special characters
- No dictionary words
- No personal information

## Example Strong Passwords

Generate a secure password using:
- Password managers (1Password, LastPass, Bitwarden)
- Command line: `openssl rand -base64 32`
- Online generators (use reputable sources only)

## Current Implementation Details

The admin password is used to:
1. Verify that only administrators can post comments
2. Protect against unauthorized responses to user feedback
3. Add an "Admin" badge to comments from verified administrators

When a user tries to post a comment:
1. They must enter the admin password
2. The password is verified client-side (line 7 in Feedback.vue)
3. If valid, reCAPTCHA is executed
4. The comment is posted with `isAdmin: true` flag

## Migration Path to Production

1. **Phase 1 (Current)**: Hardcoded password for development/testing
2. **Phase 2**: Move to environment variables
3. **Phase 3**: Implement backend authentication with JWT
4. **Phase 4**: Add role-based access control (RBAC)
5. **Phase 5**: Implement audit logging for admin actions

## Additional Security Measures

Consider implementing:
- Rate limiting on comment submissions
- IP-based blocking for repeated failed attempts
- Two-factor authentication (2FA) for admin access
- Session timeout after inactivity
- Audit logs for all admin actions
- Regular password rotation policy

## Support

If you need help implementing proper authentication, consider:
- Using authentication services (Auth0, Firebase Auth, AWS Cognito)
- Implementing OAuth 2.0 / OpenID Connect
- Consulting with a security professional
- Following OWASP authentication guidelines
