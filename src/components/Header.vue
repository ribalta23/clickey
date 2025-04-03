<template>
  <header class="bg-white dark:bg-gray-800 shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
      <div class="flex items-center">
        <router-link to="/" class="flex items-center gap-2 text-xl font-bold text-gray-800 dark:text-white">
          <div class="w-8 h-8 flex items-center justify-center">
            <img 
              src="@/assets/clickey_icon_white.svg" 
              alt="ClicKey Logo" 
              class="h-full w-auto object-contain dark:invert-0 invert"
            >
          </div>
          <span>ClicKey</span>
        </router-link>
      </div>
      
      <div class="flex items-center space-x-4">
        <button 
          @click="toggleTheme" 
          class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
          :title="currentTheme === 'dark' ? $t('theme.light') : $t('theme.dark')"
        >
          <svg v-if="currentTheme === 'dark'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
        <div class="relative language-dropdown">
          <button 
            @click="toggleLanguageDropdown" 
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none flex items-center space-x-1 text-gray-700 dark:text-gray-300"
          >
            <span class="text-sm font-medium">{{ currentLocale === 'es' ? 'ES' : 'EN' }}</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div 
            v-if="showLanguageDropdown" 
            class="absolute right-0 top-10 w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border dark:border-gray-700"
          >
            <a 
              @click="changeLanguage('es')" 
              class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              :class="{'font-medium': currentLocale === 'es'}"
            >
              {{ $t('language.es') }}
            </a>
            <a 
              @click="changeLanguage('en')" 
              class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              :class="{'font-medium': currentLocale === 'en'}"
            >
              {{ $t('language.en') }}
            </a>
          </div>
        </div>
        <div v-if="user" class="relative profile-dropdown">
          <button 
            @click="toggleDropdown" 
            class="flex items-center focus:outline-none"
          >
            <img 
              :src="avatarUrl" 
              alt="Avatar" 
              class="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
            />
          </button>
          <div 
            v-if="showDropdown" 
            class="absolute right-0 top-12 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border dark:border-gray-700"
          >
            <div class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b dark:border-gray-700">
              <div class="font-medium">{{ displayName }}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ user.email }}</div>
            </div>
            <a 
              @click="goToProfile" 
              class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              {{ $t('header.profile') }}
            </a>
            <a 
              @click="signOut" 
              class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              {{ $t('header.logout') }}
            </a>
          </div>
        </div>
        <template v-else>
          <button 
            @click="openModal" 
            class="bg-primary hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-md transition duration-300"
          >
            {{ $t('header.login') }}
          </button>
        </template>
      </div>
    </div>
    
    <LoginModal :is-open="isModalOpen" @close="closeModal" />
  </header>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { supabase } from '@/supabase';
import LoginModal from './LoginModal.vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { setLocale } from '@/i18n';
import { toggleTheme as toggleThemeService, getThemePreference } from '@/services/themeService';

const router = useRouter();
const { locale } = useI18n();
const isModalOpen = ref(false);
const user = ref(null);
const showDropdown = ref(false);
const showLanguageDropdown = ref(false);
const currentTheme = ref(getThemePreference());
const currentLocale = computed(() => locale.value);

onMounted(async () => {
  const { data } = await supabase.auth.getUser();
  user.value = data?.user || null;
  supabase.auth.onAuthStateChange((event, session) => {
    user.value = session?.user || null;
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.profile-dropdown')) {
      showDropdown.value = false;
    }
    if (!e.target.closest('.language-dropdown')) {
      showLanguageDropdown.value = false;
    }
  });
});

const avatarUrl = computed(() => {
  if (!user.value) return null;
  return user.value.user_metadata?.avatar_url || 
    user.value.user_metadata?.picture ||
    `https://www.gravatar.com/avatar/${btoa(user.value.email)}?d=mp&s=200`;
});

const displayName = computed(() => {
  if (!user.value) return '';
  return user.value.user_metadata?.name || user.value.email;
});

const toggleDropdown = (e) => {
  e.stopPropagation();
  showDropdown.value = !showDropdown.value;
};

const toggleLanguageDropdown = (e) => {
  e.stopPropagation();
  showLanguageDropdown.value = !showLanguageDropdown.value;
};

const changeLanguage = (lang) => {
  setLocale(lang);
  showLanguageDropdown.value = false;
};

const toggleTheme = () => {
  currentTheme.value = toggleThemeService();
};

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const goToProfile = () => {
  router.push('/profile');
  showDropdown.value = false;
};

const signOut = async () => {
  try {
    await supabase.auth.signOut();
    showDropdown.value = false;
    router.push('/');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};
</script>