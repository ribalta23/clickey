<template>
  <transition name="modal-fade">
    <div v-if="props.isOpen" class="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md p-8 shadow-2xl transform transition-all" 
           :class="{'shake-animation': shakeAnimation}">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ mode === 'login' ? $t('login.loginTitle') : (mode === 'register' ? $t('login.registerTitle') : $t('login.resetTitle')) }}
          </h2>
          <button @click="emit('close')" class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <!-- Password Reset Form -->
        <div v-if="mode === 'reset'">
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">{{ $t('login.resetInstructions') }}</p>
          <form @submit.prevent="handlePasswordReset" class="space-y-4">
            <div>
              <label for="reset-email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ $t('login.email') }}</label>
              <input 
                id="reset-email" 
                v-model="email" 
                type="email" 
                required 
                class="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 dark:bg-gray-700 dark:text-white transition-colors"
              />
            </div>
            
            <div v-if="error" class="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-400 p-4 text-red-700 dark:text-red-300 text-sm rounded">
              {{ error }}
            </div>
            
            <div v-if="resetSuccess" class="bg-green-50 dark:bg-green-900/30 border-l-4 border-green-400 p-4 text-green-700 dark:text-green-300 text-sm rounded">
              {{ $t('login.resetSuccess') }}
            </div>
            
            <button 
              type="submit" 
              class="w-full py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
              :disabled="loading"
            >
              <span v-if="loading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ $t('login.loading') }}
              </span>
              <span v-else>{{ $t('login.resetButton') }}</span>
            </button>
          </form>
          
          <div class="mt-6 text-center">
            <button 
              type="button" 
              @click="mode = 'login'" 
              class="text-sm text-primary dark:text-primary-300 hover:text-primary-600 dark:hover:text-primary-200 transition-colors"
            >
              {{ $t('login.backToLogin') }}
            </button>
          </div>
        </div>
        
        <!-- Login/Register Form -->
        <div v-else>
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ $t('login.email') }}</label>
              <input 
                id="email" 
                v-model="email" 
                type="email" 
                required 
                :class="{'border-red-500 dark:border-red-500': validationErrors.email}"
                class="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 dark:bg-gray-700 dark:text-white transition-colors"
              />
              <p v-if="validationErrors.email" class="text-red-500 text-xs mt-1">{{ validationErrors.email }}</p>
            </div>
            
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ $t('login.password') }}</label>
              <div class="relative">
                <input 
                  id="password" 
                  v-model="password" 
                  :type="showPassword ? 'text' : 'password'" 
                  required 
                  :class="{'border-red-500 dark:border-red-500': validationErrors.password}"
                  class="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 dark:bg-gray-700 dark:text-white transition-colors pr-10"
                />
                <button 
                  type="button" 
                  @click="togglePasswordVisibility"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
                >
                  <svg v-if="showPassword" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </button>
              </div>
              <p v-if="validationErrors.password" class="text-red-500 text-xs mt-1">{{ validationErrors.password }}</p>
            </div>
            
            <div v-if="mode === 'login'" class="flex justify-between items-center">
              <label class="flex items-center">
                <input type="checkbox" v-model="rememberMe" class="rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"/>
                <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">{{ $t('login.rememberMe') }}</span>
              </label>
              <button 
                type="button"
                @click="mode = 'reset'"
                class="text-sm text-primary dark:text-primary-300 hover:text-primary-600 dark:hover:text-primary-200 transition-colors"
              >
                {{ $t('login.forgotPassword') }}
              </button>
            </div>
            
            <div v-if="error" class="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-400 p-4 text-red-700 dark:text-red-300 text-sm rounded">
              {{ error }}
            </div>
            
            <button 
              type="submit" 
              class="w-full py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
              :disabled="loading"
            >
              <span v-if="loading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ $t('login.loading') }}
              </span>
              <span v-else>{{ mode === 'login' ? $t('login.loginButton') : $t('login.registerButton') }}</span>
            </button>
          </form>
          
          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-3 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">{{ $t('login.orContinue') }}</span>
              </div>
            </div>
            
            <div class="mt-6 grid grid-cols-2 gap-3">
              <button 
                @click="signInWithGoogle" 
                class="flex items-center justify-center py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                :disabled="loading"
              >
                <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24" width="24" height="24">
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                    <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                    <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                    <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                  </g>
                </svg>
                Google
              </button>
              <button 
                @click="signInWithGithub" 
                class="flex items-center justify-center py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                :disabled="loading"
              >
                <svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                GitHub
              </button>
            </div>
          </div>
          
          <div class="mt-6 text-center">
            <button 
              type="button" 
              @click="switchMode" 
              class="text-sm text-primary dark:text-primary-300 hover:text-primary-600 dark:hover:text-primary-200 transition-colors"
            >
              {{ mode === 'login' ? $t('login.noAccount') : $t('login.hasAccount') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed } from 'vue';
import { supabase } from '@/supabase';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  isOpen: Boolean
});

const emit = defineEmits(['close']);
const { t } = useI18n();

const mode = ref('login');
const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref(null);
const showPassword = ref(false);
const rememberMe = ref(false);
const resetSuccess = ref(false);
const shakeAnimation = ref(false);
const validationErrors = ref({});

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const switchMode = () => {
  mode.value = mode.value === 'login' ? 'register' : 'login';
  error.value = null;
  validationErrors.value = {};
};

const validateForm = () => {
  const errors = {};
  
  // Email validation
  if (!email.value) {
    errors.email = t('login.validation.emailRequired');
  } else if (!/\S+@\S+\.\S+/.test(email.value)) {
    errors.email = t('login.validation.emailValid');
  }
  
  // Password validation
  if (!password.value) {
    errors.password = t('login.validation.passwordRequired');
  } else if (mode.value === 'register' && password.value.length < 8) {
    errors.password = t('login.validation.passwordLength');
  }
  
  validationErrors.value = errors;
  return Object.keys(errors).length === 0;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    triggerShakeAnimation();
    return;
  }
  
  loading.value = true;
  error.value = null;
  
  try {
    if (mode.value === 'login') {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
      });
      
      if (signInError) throw signInError;
      
    } else {
      const { error: signUpError } = await supabase.auth.signUp({
        email: email.value,
        password: password.value
      });
      
      if (signUpError) throw signUpError;
    }
    email.value = '';
    password.value = '';
    emit('close');
  } catch (e) {
    error.value = e.message;
    triggerShakeAnimation();
  } finally {
    loading.value = false;
  }
};

const handlePasswordReset = async () => {
  if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
    error.value = t('login.validation.emailValid');
    triggerShakeAnimation();
    return;
  }
  
  loading.value = true;
  error.value = null;
  resetSuccess.value = false;
  
  try {
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.value, {
      redirectTo: `${window.location.origin}/reset-password`
    });
    
    if (resetError) throw resetError;
    resetSuccess.value = true;
    
  } catch (e) {
    error.value = e.message;
    triggerShakeAnimation();
  } finally {
    loading.value = false;
  }
};

const signInWithGoogle = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    const { error: googleError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`
      }
    });
    
    if (googleError) throw googleError;
    
  } catch (e) {
    error.value = e.message;
    loading.value = false;
  }
};

const signInWithGithub = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    const { error: githubError } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/`
      }
    });
    
    if (githubError) throw githubError;
    
  } catch (e) {
    error.value = e.message;
    loading.value = false;
  }
};

const triggerShakeAnimation = () => {
  shakeAnimation.value = true;
  setTimeout(() => {
    shakeAnimation.value = false;
  }, 500);
};
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.shake-animation {
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-3px, 0, 0); }
  40%, 60% { transform: translate3d(3px, 0, 0); }
}
</style>
