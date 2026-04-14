<template>
  <div class="no-scrollbar relative z-20 max-h-[50vh] space-y-7 overflow-y-auto pb-7">
    <!-- User Message -->
    <div class="flex justify-end">
      <div
        class="shadow-theme-xs bg-brand-100 dark:bg-brand-500/20 max-w-[480px] rounded-xl rounded-tr-xs px-4 py-3"
      >
        <p class="text-left text-sm font-normal text-gray-800 dark:text-white/90">
          {{ userMessage }}
        </p>
      </div>
    </div>

    <!-- AI Response -->
    <div class="flex lg:justify-start">
      <div class="w-full flex-1">
        <div
          class="dark:bg-dark-primary shadow-theme-xs relative w-full rounded-[20px] border border-gray-200 bg-white lg:max-w-3xl dark:border-gray-800 dark:bg-white/[0.03]"
        >
          <div
            class="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-800"
          >
            <div class="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M5.0625 5.99976L2.0625 9.00003L5.0625 12M12.9375 5.99976L15.9375 9.00003L12.9375 12M10.3329 2.99994L7.66626 14.9999"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ codeTitle }}</p>
            </div>
            <div>
              <button
                @click="copyCode"
                class="copy-button flex h-8 items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-950 dark:hover:text-white/90"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M12.7412 12.7465H6.37939C5.75807 12.7465 5.25439 12.2428 5.25439 11.6215V5.2597M12.7412 12.7465L12.7412 13.8744C12.7412 14.4958 12.2375 14.9995 11.6162 14.9995H4.12647C3.50514 14.9995 3.00146 14.4958 3.00146 13.8745V6.3847C3.00146 5.76338 3.50514 5.2597 4.12646 5.2597H5.25439M12.7412 12.7465H13.8739C14.4952 12.7465 14.9989 12.2428 14.9989 11.6215L14.9989 4.12555C14.9989 3.50423 14.4952 3.00055 13.8739 3.00055H6.37939C5.75807 3.00055 5.25439 3.50423 5.25439 4.12555V5.2597"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <span class="copy-text">{{ copied ? 'Copied!' : 'Copy' }}</span>
              </button>
            </div>
          </div>
          <div class="custom-scrollbar max-h-[350px] w-full overflow-y-auto px-5 py-4">
            <pre><code ref="codeRef" :class="`language-${language}`" v-html="highlightedCode"></code></pre>
          </div>
        </div>
        <div class="mt-4">
          <p class="text-sm leading-5 text-gray-500 dark:text-gray-400">
            {{ description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import Prism from 'prismjs'
// Import additional languages
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-markdown'
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

// Props
const props = defineProps({
  userMessage: {
    type: String,
    default: 'Give me a login form code with google & github authentication',
  },
  codeTitle: {
    type: String,
    default: 'Login form code',
  },
  language: {
    type: String,
    default: 'html',
  },
  code: {
    type: String,
    default: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login Form</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      background-color: #f5f5f5;
    }
    .login-container {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
    }
    .login-form h2 {
      text-align: center;
      margin-bottom: 1.5rem;
      color: #333;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #555;
    }
    .form-group input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    .btn {
      width: 100%;
      padding: 0.75rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      margin-bottom: 1rem;
    }
    .btn-primary {
      background-color: #007bff;
      color: white;
    }
    .btn-google {
      background-color: #db4437;
      color: white;
    }
    .btn-github {
      background-color: #333;
      color: white;
    }
    .divider {
      text-align: center;
      margin: 1rem 0;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="login-container">
    <form class="login-form">
      <h2>Login</h2>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
      
      <div class="divider">Or continue with</div>
      
      <button type="button" class="btn btn-google" onclick="loginWithGoogle()">
        Login with Google
      </button>
      <button type="button" class="btn btn-github" onclick="loginWithGithub()">
        Login with GitHub
      </button>
    </form>
  </div>

  <script>
    function loginWithGoogle() {
      // Implement Google OAuth here
      console.log('Google login clicked');
    }
    
    function loginWithGithub() {
      // Implement GitHub OAuth here
      console.log('GitHub login clicked');
    }
  <\/script>
</body>
</html>`,
  },
  description: {
    type: String,
    default: 'Here is the code for login form with google and github authentication as described.',
  },
})

// Reactive data
const copied = ref(false)
const codeRef = ref(null)

// Computed
const highlightedCode = computed(() => {
  if (props.code && props.language) {
    try {
      return Prism.highlight(
        props.code,
        Prism.languages[props.language] || Prism.languages.html,
        props.language,
      )
    } catch (error) {
      console.warn('Prism highlighting failed:', error)
      return props.code
    }
  }
  return props.code
})

// Methods
const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy code: ', err)
  }
}

// Lifecycle
onMounted(() => {
  nextTick(() => {
    if (codeRef.value) {
      Prism.highlightElement(codeRef.value)
    }
  })
})

// Expose for parent components
defineExpose({
  copyCode,
  highlightedCode,
})
</script>
