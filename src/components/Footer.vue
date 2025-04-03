<template>
  <footer class="bg-gray-100 dark:bg-gray-800 py-12 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
        <div>
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 flex items-center justify-center">
              <img 
                src="@/assets/clickey_icon_white.svg" 
                alt="ClicKey Logo" 
                class="h-full w-auto object-contain dark:invert-0 invert"
              >
            </div>
            <span class="text-xl font-bold text-gray-800 dark:text-white">ClicKey</span>
          </div>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {{ $t('footer.tagline') }}
          </p>
        </div>
        
        <div class="grid grid-cols-2 gap-8 sm:gap-16">
          <div>
            <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
              {{ $t('header.home') }}
            </h3>
            <ul class="space-y-2">
              <li>
                <a href="#" class="text-base text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-400">
                  {{ $t('footer.links.about') }}
                </a>
              </li>
              <li>
                <a href="#" class="text-base text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-400">
                  {{ $t('footer.links.contact') }}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
              {{ $t('header.login') }}
            </h3>
            <ul class="space-y-2">
              <li>
                <a href="#" class="text-base text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-400">
                  {{ $t('footer.links.privacy') }}
                </a>
              </li>
              <li>
                <a href="#" class="text-base text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-400">
                  {{ $t('footer.links.terms') }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
        <p class="text-sm text-center text-gray-600 dark:text-gray-400">
          {{ $t('footer.copyright') }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
