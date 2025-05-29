#!/usr/bin/env node

/**
 * PrepWise Testing Script
 * Run this script to verify that the application is working correctly
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 PrepWise Testing Script');
console.log('==========================\n');

// Test 1: Check environment variables
console.log('1. Checking environment configuration...');
const envPath = path.join(process.cwd(), '.env.local');
const envExamplePath = path.join(process.cwd(), '.env.example');

if (fs.existsSync(envPath)) {
  console.log('✅ .env.local file exists');
    const envContent = fs.readFileSync(envPath, 'utf8');
  const requiredVars = [
    'NEXT_PUBLIC_VAPI_WEB_TOKEN',
    'NEXT_PUBLIC_VAPI_WORKFLOW_ID',
    'NEXT_PUBLIC_BASE_URL'
  ];
  
  let missingVars = [];
  requiredVars.forEach(varName => {
    if (!envContent.includes(varName) || envContent.includes(`${varName}=your_`)) {
      missingVars.push(varName);
    }
  });
  
  if (missingVars.length === 0) {
    console.log('✅ All required environment variables are configured');
  } else {
    console.log('❌ Missing or unconfigured variables:', missingVars.join(', '));
    console.log('   Please update your .env.local file with actual Vapi credentials');
  }
} else {
  console.log('❌ .env.local file not found');
  if (fs.existsSync(envExamplePath)) {
    console.log('💡 Found .env.example - copy it to .env.local and configure your credentials');
  } else {
    console.log('❌ .env.example file not found either');
  }
}

// Test 2: Check key files
console.log('\n2. Checking key files...');
const keyFiles = [
  'components/agent.tsx',
  'constants/index.ts',
  'lib/vapi.sdk.ts',
  'app/interview/[id]/page.tsx',
  'package.json'
];

keyFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - missing`);
  }
});

// Test 3: Check dependencies
console.log('\n3. Checking dependencies...');
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const requiredDeps = [
    '@vapi-ai/web',
    'next',
    'react',
    'typescript'
  ];
  
  requiredDeps.forEach(dep => {
    if (packageJson.dependencies && packageJson.dependencies[dep]) {
      console.log(`✅ ${dep} v${packageJson.dependencies[dep]}`);
    } else if (packageJson.devDependencies && packageJson.devDependencies[dep]) {
      console.log(`✅ ${dep} v${packageJson.devDependencies[dep]} (dev)`);
    } else {
      console.log(`❌ ${dep} - not found`);
    }
  });
}

// Test 4: Check TypeScript configuration
console.log('\n4. Checking TypeScript configuration...');
const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
if (fs.existsSync(tsconfigPath)) {
  console.log('✅ tsconfig.json exists');
} else {
  console.log('❌ tsconfig.json missing');
}

// Test 5: Port availability
console.log('\n5. Checking port availability...');
const net = require('net');
const port = 3000;

const server = net.createServer();
server.listen(port, () => {
  console.log(`✅ Port ${port} is available`);
  server.close();
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`ℹ️  Port ${port} is in use (development server may be running)`);
  } else {
    console.log(`❌ Port ${port} error:`, err.message);
  }
});

// Test Results Summary
console.log('\n📋 Test Summary');
console.log('===============');
console.log('If all tests pass, run: npm run dev');
console.log('Then open: http://localhost:3000');
console.log('\n🔗 Testing Checklist:');
console.log('1. Navigate to /interview/new');
console.log('2. Test "Setup Interview" functionality');
console.log('3. Check if "Start Your Interview" button appears after setup');
console.log('4. Test keyboard shortcuts (Space to start/stop)');
console.log('5. Verify mobile responsiveness');
console.log('\n💡 If you encounter issues, check:');
console.log('- Browser console for errors');
console.log('- Microphone permissions');
console.log('- Vapi dashboard for API status');
console.log('- Network connectivity');
