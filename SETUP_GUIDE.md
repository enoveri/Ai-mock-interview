# PrepWise Setup & Testing Guide

## Quick Start

### 1. Environment Setup

1. Copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

2. Get your Vapi.ai credentials:

   - Go to [Vapi Dashboard](https://dashboard.vapi.ai)
   - Copy your **Web Token** and **Workflow ID**
   - Update `.env.local` with your actual values

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

### 2. Testing the Interview Flow

#### A. Setup Interview (Voice Configuration)

1. Navigate to `/interview/new` or any interview page
2. Click **"Setup Interview"** to configure voice settings
3. **Expected Behavior:**
   - Voice call starts with setup assistant
   - You'll be guided through interview preferences
   - System generates interview questions based on your input
   - Call ends automatically when setup is complete
   - "Start Your Interview" button appears

#### B. Actual Interview

1. After setup completion, click **"Start Your Interview"**
2. **Expected Behavior:**
   - New voice call starts with interview assistant
   - AI conducts the actual interview
   - Questions are asked based on your setup preferences
   - Call can be ended manually or automatically

### 3. Keyboard Shortcuts

- **Spacebar**: Start/Stop voice calls
- **Escape**: End current call (if implemented)

## Technical Testing Checklist

### Core Functionality

- [ ] Environment variables are properly loaded
- [ ] Vapi SDK initializes without errors
- [ ] Setup interview starts and voice works
- [ ] Setup completion triggers state change
- [ ] "Start Your Interview" button appears after setup
- [ ] Actual interview can be started
- [ ] Error handling works for failed calls
- [ ] Function call results are captured (interview generation)

### User Experience

- [ ] Loading states are clear
- [ ] Error messages are user-friendly
- [ ] Voice quality is good
- [ ] UI is responsive on mobile
- [ ] Instructions are clear
- [ ] Call status updates are visible

### Edge Cases

- [ ] Missing environment variables show proper errors
- [ ] Network failures are handled gracefully
- [ ] Permission denials (microphone) are handled
- [ ] Multiple rapid clicks don't break the flow
- [ ] Browser compatibility (Chrome, Safari, Firefox)

## Common Issues & Solutions

### 1. "Vapi configuration missing" Error

**Cause**: Missing or incorrect environment variables
**Solution**:

- Check `.env.local` exists with correct values
- Restart development server after env changes
- Verify Vapi dashboard credentials

### 2. Voice Call Won't Start

**Cause**: Browser permissions or audio issues
**Solution**:

- Check browser microphone permissions
- Try in incognito/private mode
- Test on different browsers
- Check browser console for errors

### 3. Setup Doesn't Complete

**Cause**: Function calls not being handled properly
**Solution**:

- Check browser console for function call logs
- Verify Vapi workflow configuration
- Check if assistant is properly configured for function calling

### 4. Interview Button Doesn't Appear

**Cause**: Setup completion not detected
**Solution**:

- Check if function call results contain interview ID
- Verify state management in Agent component
- Check console logs for completion events

## Development Notes

### File Structure

- `components/agent.tsx` - Main voice integration component
- `constants/index.ts` - Vapi assistant configurations
- `app/interview/[id]/page.tsx` - Interview page UI
- `lib/vapi.sdk.ts` - Vapi SDK initialization

### Key Features Implemented

- Dual-mode agent (setup vs interview)
- Function call result handling
- Error boundary with user feedback
- Keyboard shortcuts
- State management for flow control
- Router integration for navigation

### Next Steps for Production

1. Add environment variable validation on startup
2. Implement proper error tracking (Sentry, etc.)
3. Add loading skeletons and better UX
4. Add mobile-specific optimizations
5. Implement interview data persistence
6. Add user authentication integration
7. Add interview history and analytics

## Support

If you encounter issues:

1. Check the browser console for errors
2. Verify environment variables
3. Test microphone permissions
4. Try a different browser
5. Check Vapi dashboard for API status
