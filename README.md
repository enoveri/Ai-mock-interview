# PrepWise - AI-Powered Interview Practice Platform

PrepWise is a cutting-edge AI interview practice platform that uses voice interaction to help candidates prepare for technical and behavioral interviews. Built with Next.js 15 and integrated with Vapi AI for natural voice conversations.

## 🌟 Features

### ✅ Completed Features

- **Voice-First Interview Experience**: Real-time voice interaction with AI interviewer
- **Dual-Mode Agent System**:
  - Setup mode for interview configuration
  - Interview mode for actual practice sessions
- **Dynamic Interview Generation**: AI creates personalized questions based on user preferences
- **Real-time Transcription**: Live conversation transcripts during interviews
- **Mobile-Responsive Design**: Optimized for all device sizes
- **Keyboard Shortcuts**: Space bar to start/stop calls
- **Error Handling**: Comprehensive error management with user-friendly messages
- **Environment Validation**: Automatic configuration checking

### 🎯 Interview Types Supported

- Technical interviews (role-specific)
- Behavioral interviews
- Mixed interview formats
- Multiple experience levels (junior, mid, senior)
- Various tech stacks (React, Python, Java, etc.)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Vapi.ai account with API credentials
- Modern web browser with microphone support

### Installation

1. **Clone and Install**

   ```bash
   cd voice_agent
   npm install
   ```

2. **Configure Environment**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your Vapi credentials:

   ```env
   NEXT_PUBLIC_VAPI_WEB_TOKEN=pk_your_actual_token_here
   NEXT_PUBLIC_VAPI_WORKFLOW_ID=your_workflow_id_here
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

3. **Get Vapi Credentials**

   - Sign up at [Vapi.ai](https://dashboard.vapi.ai)
   - Create a new workflow for interview setup
   - Copy your Web Token and Workflow ID

4. **Start Development Server**

   ```bash
   npm run dev
   ```

5. **Open Application**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Quick Test

```bash
node test-setup.js
```

## 📁 Project Structure

```
voice_agent/
├── app/                          # Next.js 15 app directory
│   ├── interview/[id]/          # Dynamic interview pages
│   │   └── page.tsx             # Main interview interface
│   ├── api/                     # API routes
│   └── layout.tsx               # Root layout
├── components/
│   ├── agent.tsx                # Core voice interaction component
│   ├── ui/                      # Reusable UI components
│   └── client/                  # Client-side components
├── lib/
│   ├── vapi.sdk.ts             # Vapi AI SDK configuration
│   └── env-validator.ts        # Environment validation
├── constants/
│   └── index.ts                # Vapi assistant configurations
├── types/
│   └── vapi.d.ts               # TypeScript definitions
└── public/                     # Static assets
```

## 🎭 How It Works

### Interview Setup Flow

1. User clicks "Setup Interview"
2. AI voice assistant guides through setup questions:
   - Target role (e.g., "Frontend Developer")
   - Experience level (junior/mid/senior)
   - Tech stack preferences
   - Interview type (technical/behavioral/mixed)
3. AI generates personalized interview questions
4. Setup completion triggers "Start Your Interview" button

### Interview Execution Flow

1. User clicks "Start Your Interview"
2. AI interviewer begins with role-specific questions
3. Real-time voice interaction with live transcription
4. Natural conversation flow with follow-up questions
5. Interview completion with feedback (planned feature)

## 🛠️ Technical Implementation

### Key Technologies

- **Frontend**: Next.js 15, React 19, TypeScript
- **Voice AI**: Vapi.ai Web SDK v2.3.1
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React hooks with proper cleanup
- **Error Handling**: Comprehensive validation and user feedback

### Core Components

#### Agent Component (`components/agent.tsx`)

- Manages Vapi SDK integration
- Handles dual-mode operation (setup vs interview)
- Real-time event processing
- Error boundary implementation
- Keyboard shortcut support

#### Interview Page (`app/interview/[id]/page.tsx`)

- Dynamic routing for interview sessions
- Mobile-responsive layout
- Loading and error states
- Interview metadata display

#### Vapi SDK (`lib/vapi.sdk.ts`)

- Environment validation
- SDK initialization
- Development-friendly error messages

### Environment Configuration

The application requires these environment variables:

- `NEXT_PUBLIC_VAPI_WEB_TOKEN`: Your Vapi web token
- `NEXT_PUBLIC_VAPI_WORKFLOW_ID`: Interview setup workflow ID
- `NEXT_PUBLIC_BASE_URL`: Application base URL

## 🧪 Testing

### Manual Testing Checklist

- [ ] Environment variables properly configured
- [ ] Setup interview voice interaction works
- [ ] Interview generation completes successfully
- [ ] "Start Your Interview" button appears after setup
- [ ] Actual interview can be started
- [ ] Keyboard shortcuts function (Space bar)
- [ ] Mobile responsiveness
- [ ] Error handling for various scenarios
- [ ] Microphone permissions handling

### Automated Testing

```bash
# Run the setup validation script
node test-setup.js

# Check TypeScript compilation
npm run build

# Lint code
npm run lint
```

## 🐛 Troubleshooting

### Common Issues

**"Vapi configuration missing" Error**

- Solution: Check `.env.local` file exists with correct values
- Restart development server after environment changes

**Voice Call Won't Start**

- Check browser microphone permissions
- Try different browser (Chrome recommended)
- Verify Vapi dashboard shows active API status

**Setup Doesn't Complete**

- Check browser console for function call logs
- Verify Vapi workflow is properly configured
- Ensure assistant supports function calling

**Mobile Issues**

- Test on actual mobile devices
- Check responsive design breakpoints
- Verify touch interactions work properly

### Error Handling Features

- Environment validation on startup
- User-friendly error messages
- Automatic retry mechanisms
- Development vs production error display
- Browser compatibility warnings

## 🚧 Development Notes

### Current Implementation Status

✅ **Complete**: Core voice interaction, dual-mode agents, mobile responsiveness, error handling
⏳ **In Progress**: Performance optimization, advanced error tracking
📋 **Planned**: Interview analytics, user authentication, interview history

### Architecture Decisions

- **Client-side voice processing**: Using Vapi Web SDK for real-time interaction
- **Function calling**: Setup assistant generates interview data via function calls
- **State management**: React hooks with proper cleanup and event handling
- **Error boundaries**: Comprehensive error handling at multiple levels
- **Mobile-first**: Responsive design with touch-friendly interactions

### Performance Considerations

- Vapi SDK lazy loading
- Event listener cleanup
- Memory leak prevention
- Optimized re-renders

## 📚 Additional Resources

- [Vapi.ai Documentation](https://docs.vapi.ai/)
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Setup Guide](./SETUP_GUIDE.md) - Detailed setup instructions
- [Environment Example](./.env.example) - Environment variables template

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly (including voice interactions)
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter issues:

1. Check the [Setup Guide](./SETUP_GUIDE.md)
2. Run the test script: `node test-setup.js`
3. Check browser console for errors
4. Verify Vapi dashboard status
5. Test microphone permissions

---

**PrepWise** - Revolutionizing interview preparation through AI-powered voice interaction. 🎯🚀
