// import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
// import { z } from "zod";

export const mappings = {
  "react.js": "react",
  reactjs: "react",
  react: "react",
  "next.js": "nextjs",
  nextjs: "nextjs",
  next: "nextjs",
  "vue.js": "vuejs",
  vuejs: "vuejs",
  vue: "vuejs",
  "express.js": "express",
  expressjs: "express",
  express: "express",
  "node.js": "nodejs",
  nodejs: "nodejs",
  node: "nodejs",
  mongodb: "mongodb",
  mongo: "mongodb",
  mongoose: "mongoose",
  mysql: "mysql",
  postgresql: "postgresql",
  sqlite: "sqlite",
  firebase: "firebase",
  docker: "docker",
  kubernetes: "kubernetes",
  aws: "aws",
  azure: "azure",
  gcp: "gcp",
  digitalocean: "digitalocean",
  heroku: "heroku",
  photoshop: "photoshop",
  "adobe photoshop": "photoshop",
  html5: "html5",
  html: "html5",
  css3: "css3",
  css: "css3",
  sass: "sass",
  scss: "sass",
  less: "less",
  tailwindcss: "tailwindcss",
  tailwind: "tailwindcss",
  bootstrap: "bootstrap",
  jquery: "jquery",
  typescript: "typescript",
  ts: "typescript",
  javascript: "javascript",
  js: "javascript",
  "angular.js": "angular",
  angularjs: "angular",
  angular: "angular",
  "ember.js": "ember",
  emberjs: "ember",
  ember: "ember",
  "backbone.js": "backbone",
  backbonejs: "backbone",
  backbone: "backbone",
  nestjs: "nestjs",
  graphql: "graphql",
  "graph ql": "graphql",
  apollo: "apollo",
  webpack: "webpack",
  babel: "babel",
  "rollup.js": "rollup",
  rollupjs: "rollup",
  rollup: "rollup",
  "parcel.js": "parcel",
  parceljs: "parcel",
  npm: "npm",
  yarn: "yarn",
  git: "git",
  github: "github",
  gitlab: "gitlab",
  bitbucket: "bitbucket",
  figma: "figma",
  prisma: "prisma",
  redux: "redux",
  flux: "flux",
  redis: "redis",
  selenium: "selenium",
  cypress: "cypress",
  jest: "jest",
  mocha: "mocha",
  chai: "chai",
  karma: "karma",
  vuex: "vuex",
  "nuxt.js": "nuxt",
  nuxtjs: "nuxt",
  nuxt: "nuxt",
  strapi: "strapi",
  wordpress: "wordpress",
  contentful: "contentful",
  netlify: "netlify",
  vercel: "vercel",
  "aws amplify": "amplify",
};

// export const interviewer: CreateAssistantDTO = {
//   name: "Interviewer",
//   firstMessage:
//     "Hello! Thank you for taking the time to speak with me today. I'm excited to learn more about you and your experience.",
//   transcriber: {
//     provider: "deepgram",
//     model: "nova-2",
//     language: "en",
//   },
//   voice: {
//     provider: "11labs",
//     voiceId: "sarah",
//     stability: 0.4,
//     similarityBoost: 0.8,
//     speed: 0.9,
//     style: 0.5,
//     useSpeakerBoost: true,
//   },
//   model: {
//     provider: "openai",
//     model: "gpt-4",
//     messages: [
//       {
//         role: "system",
//         content: `You are a professional job interviewer conducting a real-time voice interview with a candidate. Your goal is to assess their qualifications, motivation, and fit for the role.

// Interview Guidelines:
// Follow the structured question flow:
// {{questions}}

// Engage naturally & react appropriately:
// Listen actively to responses and acknowledge them before moving forward.
// Ask brief follow-up questions if a response is vague or requires more detail.
// Keep the conversation flowing smoothly while maintaining control.
// Be professional, yet warm and welcoming:

// Use official yet friendly language.
// Keep responses concise and to the point (like in a real voice interview).
// Avoid robotic phrasing—sound natural and conversational.
// Answer the candidate’s questions professionally:

// If asked about the role, company, or expectations, provide a clear and relevant answer.
// If unsure, redirect the candidate to HR for more details.

// Conclude the interview properly:
// Thank the candidate for their time.
// Inform them that the company will reach out soon with feedback.
// End the conversation on a polite and positive note.

// - Be sure to be professional and polite.
// - Keep all your responses short and simple. Use official language, but be kind and welcoming.
// - This is a voice conversation, so keep your responses short, like in a real conversation. Don't ramble for too long.`,
//       },
//     ],
//   },
// };

// export const feedbackSchema = z.object({
//   totalScore: z.number(),
//   categoryScores: z.tuple([
//     z.object({
//       name: z.literal("Communication Skills"),
//       score: z.number(),
//       comment: z.string(),
//     }),
//     z.object({
//       name: z.literal("Technical Knowledge"),
//       score: z.number(),
//       comment: z.string(),
//     }),
//     z.object({
//       name: z.literal("Problem Solving"),
//       score: z.number(),
//       comment: z.string(),
//     }),
//     z.object({
//       name: z.literal("Cultural Fit"),
//       score: z.number(),
//       comment: z.string(),
//     }),
//     z.object({
//       name: z.literal("Confidence and Clarity"),
//       score: z.number(),
//       comment: z.string(),
//     }),
//   ]),
//   strengths: z.array(z.string()),
//   areasForImprovement: z.array(z.string()),
//   finalAssessment: z.string(),
// });

export const interviewCovers = [
  "/adobe.png",
  "/amazon.png",
  "/facebook.png",
  "/hostinger.png",
  "/pinterest.png",
  "/quora.png",
  "/reddit.png",
  "/skype.png",
  "/spotify.png",
  "/telegram.png",
  "/tiktok.png",
  "/yahoo.png",
];

export const dummyInterviews: Interview[] = [
  {
    id: "1",
    userId: "user1",
    role: "Frontend Developer",
    type: "Technical",
    techstack: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    level: "Junior",
    questions: ["What is React?"],
    finalized: false,
    createdAt: "2024-03-15T10:00:00Z",
  },
  {
    id: "2",
    userId: "user1",
    role: "Full Stack Developer",
    type: "Mixed",
    techstack: ["Node.js", "Express", "MongoDB", "React"],
    level: "Senior",
    questions: ["What is Node.js?"],
    finalized: false,
    createdAt: "2024-03-14T15:30:00Z",
  },
];

export const generator = {
  name: "Interview",
  nodes: [
    {
      name: "start_node",
      type: "start",
      metadata: {
        position: {
          x: 5.333333333333332,
          y: -120.5,
        },
      },
    },
    {
      name: "conversation_1748501660424",
      type: "conversation",
      metadata: {
        position: {
          x: -96,
          y: 41.5,
        },
      },
      prompt: "Greet the user and help them create a new Ai interviewer",
      model: {
        model: "gpt-4o",
        provider: "openai",
        maxTokens: 1000,
        temperature: 0.7,
      },
      voice: {
        voiceId: "Rohan",
        provider: "vapi",
      },
      variableExtractionPlan: {
        output: [
          {
            enum: ["entry", "mid", "senior"],
            type: "string",
            title: "level",
            description: "The job experience level.",
          },
          {
            enum: [],
            type: "number",
            title: "amount",
            description: "How many questions would you like to generate?",
          },
          {
            enum: [],
            type: "string",
            title: "techstack",
            description:
              "A list of technologies to cover during the job interview. For example, React, Next.js, Express.js, Node and so on…",
          },
          {
            enum: [],
            type: "string",
            title: "role",
            description:
              "What role would you like to train for? For example Frontend, Backend, Fullstack, Design, UX?",
          },
          {
            enum: ["behavioral", "technical", "mixed"],
            type: "string",
            title: "type",
            description: "What type of the interview should it be? ",
          },
        ],
      },
      messagePlan: {
        firstMessage:
          "Hello! I'm here to help you set up a personalized AI interview. Let me gather some information about the role you'd like to practice for. What position are you preparing for?",
      },
    },
    {
      name: "conversation_1748502666438",
      type: "conversation",
      metadata: {
        position: {
          x: -96,
          y: 291.5,
        },
      },
      prompt: "say that the interview will be generated shortly",
      model: {
        model: "gpt-4o",
        provider: "openai",
        maxTokens: 1000,
        temperature: 0.7,
      },
      messagePlan: {
        firstMessage:
          "Perfect! I have all the information I need. Let me generate your personalized interview questions now. This will just take a moment...",
      },
    },
    {
      name: "API Request",
      type: "tool",
      metadata: {
        position: {
          x: -96,
          y: 541.5,
        },
      },
      tool: {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/vapi/generate`,
        body: {
          type: "object",
          required: ["amount", "level", "techstack", "role", "type", "userid"],
          properties: {
            role: {
              type: "string",
              value: "{{role}}",
              description: "",
            },
            type: {
              enum: ["behavioral", "technical", "mixed"],
              type: "string",
              value: "{{type}}",
              description: "",
            },
            level: {
              enum: ["entry", "mid", "senior"],
              type: "string",
              value: "{{level}}",
              description: "",
            },
            amount: {
              type: "number",
              value: "{{amount}}",
              description: "",
            },
            userid: {
              type: "string",
              value: "{{userid}}",
              description: "",
            },
            techstack: {
              type: "string",
              value: "{{techstack}}",
              description: "",
            },
          },
        },
        type: "apiRequest",
        method: "POST",
        function: {
          name: "untitled_tool",
          parameters: {
            type: "object",
            required: [],
            properties: {},
          },
        },
      },
    },
    {
      name: "conversation_1748503736254",
      type: "conversation",
      metadata: {
        position: {
          x: -96,
          y: 791.5,
        },
      },
      prompt:
        "Thank the user and let them know that the interview has been generated",
      model: {
        model: "gpt-4o",
        provider: "openai",
        maxTokens: 1000,
        temperature: 0.7,
      },
      messagePlan: {
        firstMessage:
          "Excellent! Your interview has been successfully generated and saved. You can now start practicing with your personalized AI interviewer. Good luck with your preparation!",
      },
    },
    {
      name: "hangup_1748503825256",
      type: "tool",
      metadata: {
        position: {
          x: -101.57681159420287,
          y: 1071.9927536231883,
        },
      },
      tool: {
        type: "endCall",
      },
    },
  ],
  edges: [
    {
      from: "start_node",
      to: "conversation_1748501660424",
      condition: {
        type: "ai",
        prompt: "if the user said yes",
      },
    },
    {
      from: "conversation_1748501660424",
      to: "conversation_1748502666438",
      condition: {
        type: "ai",
        prompt: "If the user provided all the variables\n",
      },
    },
    {
      from: "conversation_1748502666438",
      to: "API Request",
      condition: {
        type: "ai",
        prompt: "if the user said yes",
      },
    },
    {
      from: "API Request",
      to: "conversation_1748503736254",
      condition: {
        type: "ai",
        prompt: "If the user has provided all the required information",
      },
    },
    {
      from: "conversation_1748503736254",
      to: "hangup_1748503825256",
      condition: {
        type: "ai",
        prompt: "if the user said yes",
      },
    },
  ],
  model: {
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content:
          "## Identity\n\nYou are a voice assistant helping with creating new AI interviewers. Your task is to collect data from the user. Remember that this is a voice conversation - do not use any special characters.",
      },
    ],
    provider: "openai",
    temperature: 0.7,
  },
};

// Interview Assistant Configuration for actual interviews
export const createInterviewAssistant = (interviewData: any) => ({
  name: `${interviewData.role} Interview Assistant`,
  firstMessage: `Hello! I'm your AI interviewer for the ${
    interviewData.role
  } position. I'll be conducting a ${
    interviewData.type
  } interview focusing on ${interviewData.techstack.join(
    ", "
  )}. Are you ready to begin?`,
  transcriber: {
    provider: "deepgram" as const,
    model: "nova-2",
    language: "en-US",
  },
  voice: {
    provider: "11labs" as const,
    voiceId: "sarah",
    stability: 0.4,
    similarityBoost: 0.8,
    speed: 0.9,
    style: 0.5,
    useSpeakerBoost: true,
  },
  model: {
    provider: "openai" as const,
    model: "gpt-4",
    messages: [
      {
        role: "system" as const,
        content: `You are a professional job interviewer conducting a real-time voice interview for a ${
          interviewData.role
        } position.

Interview Details:
- Role: ${interviewData.role}
- Experience Level: ${interviewData.level}
- Interview Type: ${interviewData.type}
- Tech Stack: ${interviewData.techstack.join(", ")}

Questions to Ask:
${interviewData.questions
  .map((q: string, i: number) => `${i + 1}. ${q}`)
  .join("\n")}

Interview Guidelines:
- Follow the structured question flow above
- Ask one question at a time and wait for a complete response
- Listen actively and acknowledge responses before moving forward
- Ask brief follow-up questions if a response is vague or needs clarification
- Keep the conversation flowing smoothly while maintaining control
- Be professional, yet warm and welcoming
- Use official yet friendly language
- Keep responses concise and to the point (like in a real voice interview)
- Avoid robotic phrasing—sound natural and conversational

Scoring Focus Areas:
- Technical Knowledge (for technical questions)
- Communication Skills
- Problem Solving Approach
- Cultural Fit
- Confidence and Clarity

Important:
- This is a voice conversation, so keep your responses short and natural
- Don't ramble for too long
- End the interview after all questions are covered
- Thank the candidate and let them know they'll hear back soon`,
      },
    ],
    temperature: 0.7,
  },
});
