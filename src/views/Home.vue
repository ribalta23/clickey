<template>
  <!-- Hero Section -->
  <section class="py-16 md:py-24 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="grid md:grid-cols-2 gap-8 items-center mb-16">
        <div>
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {{ $t('home.hero.title') }}
          </h1>
          <p class="text-xl text-gray-700 dark:text-gray-300 mb-8">
            {{ $t('home.hero.subtitle') }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <button 
              @click="toggleTypingPractice"
              class="bg-primary hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-lg transition duration-300 text-lg flex items-center justify-center"
            >
              <span>{{ $t('home.hero.cta') }}</span>
              <svg v-if="!showTypingPractice" class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
              <svg v-else class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
              </svg>
            </button>
            <button class="border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-white font-medium py-3 px-6 rounded-lg transition duration-300 text-lg">
              {{ $t('home.hero.learnMore') }}
            </button>
          </div>
        </div>
        <div class="hidden md:block">
          <div class="relative">
            <div class="w-full h-64 md:h-96 bg-gradient-to-br from-primary-100 to-primary-500 dark:from-primary-900 dark:to-primary-700 rounded-lg flex items-center justify-center">
              <div class="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-sm mx-auto">
                <div class="text-3xl font-mono font-bold mb-4 text-primary dark:text-primary-400">88 WPM</div>
                <div class="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full mb-6">
                  <div class="h-2 bg-primary dark:bg-primary-400 rounded-full" style="width: 75%"></div>
                </div>
                <div class="font-mono text-gray-700 dark:text-gray-300">{{ $t('home.hero.typingExample') }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Typing Practice Demo (Collapsible) -->
      <transition 
        name="practice-expand"
        @enter="setMaxHeight"
        @leave="setMaxHeight"
      >
        <div v-if="showTypingPractice" class="typing-demo-container mt-12 overflow-hidden" ref="practiceContainer">
          <div class="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 shadow-inner">
            <h2 class="text-2xl text-center font-bold mb-8 text-gray-900 dark:text-white">
              {{ $t('practice.demoTitle') }}
            </h2>
            <TypingPractice @practiceDone="toggleTypingPractice(false)" />
            
            <div class="flex justify-center mt-6">
              <button 
                @click="toggleTypingPractice(false)" 
                class="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-400 transition-colors text-sm font-medium"
              >
                <span>{{ $t('practice.hideTypingTest') }}</span>
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </section>

  <!-- Features Section -->
  <section class="py-16 bg-gray-50 dark:bg-gray-800 px-4">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-16">
        {{ $t('home.features.title') }}
      </h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="(feature, index) in 3" :key="index" class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
          <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-primary dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
              <path v-if="index === 0" fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              <path v-if="index === 1" fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
              <path v-if="index === 2" fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {{ $t(`home.features.feature${index + 1}.title`) }}
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            {{ $t(`home.features.feature${index + 1}.description`) }}
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- How It Works Section -->
  <section class="py-16 px-4">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-16">
        {{ $t('home.howItWorks.title') }}
      </h2>
      <div class="grid md:grid-cols-4 gap-8">
        <div v-for="step in 4" :key="step" class="text-center">
          <div class="w-16 h-16 bg-primary dark:bg-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
            {{ step }}
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {{ $t(`home.howItWorks.step${step}.title`) }}
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            {{ $t(`home.howItWorks.step${step}.description`) }}
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Stats Section -->
  <section class="py-16 bg-gray-50 dark:bg-gray-800 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="stat in 3" :key="stat" class="text-center p-6">
          <div class="text-4xl font-bold text-primary dark:text-primary-400 mb-2">
            {{ $t(`home.stats.stat${stat}.value`) }}
          </div>
          <p class="text-xl text-gray-700 dark:text-gray-300">
            {{ $t(`home.stats.stat${stat}.label`) }}
          </p>
        </div>
      </div>
    </div>
  </section>
  
  <!-- CTA Section -->
  <section class="py-16 px-4">
    <div class="max-w-3xl mx-auto text-center">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        {{ $t('home.cta.title') }}
      </h2>
      <p class="text-xl text-gray-700 dark:text-gray-300 mb-8">
        {{ $t('home.cta.subtitle') }}
      </p>
      <button class="bg-primary hover:bg-primary-600 text-white font-medium py-3 px-8 rounded-lg transition duration-300 text-lg">
        {{ $t('home.cta.button') }}
      </button>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import TypingPractice from '@/components/TypingPractice.vue';

const { t } = useI18n();
const showTypingPractice = ref(false);
const practiceContainer = ref(null);

const toggleTypingPractice = (value = null) => {
  showTypingPractice.value = value !== null ? value : !showTypingPractice.value;
  
  if (showTypingPractice.value) {
    // Scroll to the practice section with animation when it's opened
    setTimeout(() => {
      if (practiceContainer.value) {
        practiceContainer.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }
};

// This function helps with the height animation
const setMaxHeight = (el) => {
  // Force repaint to ensure the animation works
  const height = el.scrollHeight;
  el.style.maxHeight = height === 0 ? '0' : `${height}px`;
};
</script>

<style scoped>
.practice-expand-enter-active,
.practice-expand-leave-active {
  transition: max-height 0.5s ease, opacity 0.5s ease;
  max-height: 1000px;
  overflow: hidden;
}

.practice-expand-enter-from,
.practice-expand-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>