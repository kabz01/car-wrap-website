# Email Setup Instructions

This application uses [Resend](https://resend.com) to send emails for car wrap quote requests.

## Setup Steps

### 1. Create a Resend Account
1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### 2. Get Your API Key
1. Log in to your Resend dashboard
2. Navigate to **API Keys** in the sidebar
3. Click **Create API Key**
4. Give it a name (e.g., "Millan Auto Customs")
5. Copy the API key (it starts with `re_`)

### 3. Add API Key to Your Project
1. Open the `.env.local` file in your project root
2. Replace `your_resend_api_key_here` with your actual API key:
   ```
   RESEND_API_KEY=re_your_actual_api_key_here
   ```
3. Save the file

### 4. Verify Your Domain (Optional but Recommended)
For production use, you should verify your own domain:

1. In the Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `millanautocustoms.com`)
4. Follow the DNS configuration instructions
5. Once verified, update the email sender in:
   - `app/api/send-quote-email/route.ts`
   - Change from: `'Millan Auto Customs <onboarding@resend.dev>'`
   - To: `'Millan Auto Customs <noreply@yourdomain.com>'`

### 5. Test the Email Functionality
1. Restart your development server: `npm run dev`
2. Go to the Car Wraps page
3. Complete a quote request
4. Check your email for the confirmation
5. Check `millanautocustoms@icloud.com` for the business notification

## Free Tier Limits
Resend's free tier includes:
- 3,000 emails per month
- 100 emails per day
- Perfect for testing and small businesses

## Troubleshooting
- **Emails not sending**: Check that your API key is correctly set in `.env.local`
- **Server needs restart**: After changing `.env.local`, restart your dev server
- **Check console**: Look for error messages in the terminal where your server is running

## Email Recipients
- **Business Email**: millanautocustoms@icloud.com (receives all quote requests)
- **Customer Email**: Sent to the email address provided in the quote form

## Support
If you need help, check the [Resend documentation](https://resend.com/docs) or contact Resend support.
