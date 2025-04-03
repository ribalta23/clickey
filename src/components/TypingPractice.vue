<template>
  <div class="typing-practice rounded-lg shadow-lg bg-white dark:bg-gray-800 p-6 w-full max-w-2xl mx-auto">
    <!-- Practice Header -->
    <div class="mb-4 flex justify-between items-center">
      <div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
          {{ mode === 'results' ? $t('practice.results') : $t('practice.tryIt') }}
        </h3>
        <p v-if="mode === 'ready'" class="text-sm text-gray-500 dark:text-gray-400">
          {{ $t('practice.instructions') }}
        </p>
      </div>
      <div v-if="mode === 'typing'" class="flex items-center">
        <div class="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-md text-sm font-medium">
          {{ formattedTime }}
        </div>
      </div>
      <div v-if="mode === 'results'" class="flex space-x-2">
        <div 
          class="flex flex-col items-center justify-center bg-primary bg-opacity-10 dark:bg-opacity-20 px-3 py-1 rounded-md"
          title="Words Per Minute"
        >
          <span class="text-xl font-bold text-primary dark:text-primary-400">{{ wpm }}</span>
          <span class="text-xs text-gray-600 dark:text-gray-400">WPM</span>
        </div>
        <div 
          class="flex flex-col items-center justify-center bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-md"
          title="Accuracy"
        >
          <span class="text-xl font-bold text-green-600 dark:text-green-400">{{ accuracy }}%</span>
          <span class="text-xs text-gray-600 dark:text-gray-400">{{ $t('practice.accuracy') }}</span>
        </div>
      </div>
    </div>

    <!-- Practice Text Display -->
    <div 
      class="practice-text mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-md font-mono text-lg leading-relaxed"
      v-show="mode !== 'results'"
    >
      <span 
        v-for="(char, index) in currentText" 
        :key="index"
        :class="{
          'text-green-600 dark:text-green-400': index < typedText.length && char === typedText[index],
          'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30': index < typedText.length && char !== typedText[index],
          'text-primary dark:text-primary-400': index === typedText.length,
          'text-gray-800 dark:text-gray-300': index > typedText.length
        }"
      >{{ char }}</span>
    </div>

    <!-- Practice Results -->
    <div v-if="mode === 'results'" class="practice-results mb-4">
      <div class="flex flex-col space-y-4">
        <div class="grid grid-cols-2 gap-3 mb-2">
          <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
            <div class="text-sm text-gray-500 dark:text-gray-400">{{ $t('practice.speed') }}</div>
            <div class="text-2xl font-bold text-gray-800 dark:text-white">{{ wpm }} <span class="text-sm font-normal">WPM</span></div>
          </div>
          <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
            <div class="text-sm text-gray-500 dark:text-gray-400">{{ $t('practice.accuracy') }}</div>
            <div class="text-2xl font-bold text-gray-800 dark:text-white">{{ accuracy }}%</div>
          </div>
          <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
            <div class="text-sm text-gray-500 dark:text-gray-400">{{ $t('practice.time') }}</div>
            <div class="text-2xl font-bold text-gray-800 dark:text-white">{{ totalTime }}s</div>
          </div>
          <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
            <div class="text-sm text-gray-500 dark:text-gray-400">{{ $t('practice.errors') }}</div>
            <div class="text-2xl font-bold text-gray-800 dark:text-white">{{ errors }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Practice Input -->
    <div class="practice-input relative">
      <textarea
        v-if="mode === 'typing'"
        ref="inputField"
        v-model="typedText"
        :placeholder="$t('practice.typingPlaceholder')"
        class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white resize-none"
        rows="3"
        @input="checkProgress"
        @focus="startTimer"
      ></textarea>
      
      <div v-if="mode === 'ready'" class="flex flex-col items-center">
        <button 
          @click="startPractice"
          class="px-6 py-2 bg-primary hover:bg-primary-600 text-white rounded-md transition-colors mb-3"
        >
          {{ $t('practice.start') }}
        </button>
        <div class="flex space-x-3 text-sm">
          <button 
            @click="changeLevel('beginner')"
            class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md transition-colors"
            :class="{'bg-primary/10 border-primary dark:bg-primary/20 dark:border-primary-400': level === 'beginner'}"
          >
            {{ $t('practice.levels.beginner') }}
          </button>
          <button 
            @click="changeLevel('intermediate')"
            class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md transition-colors"
            :class="{'bg-primary/10 border-primary dark:bg-primary/20 dark:border-primary-400': level === 'intermediate'}"
          >
            {{ $t('practice.levels.intermediate') }}
          </button>
          <button 
            @click="changeLevel('advanced')"
            class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md transition-colors"
            :class="{'bg-primary/10 border-primary dark:bg-primary/20 dark:border-primary-400': level === 'advanced'}"
          >
            {{ $t('practice.levels.advanced') }}
          </button>
        </div>
      </div>
      
      <div v-if="mode === 'results'" class="flex justify-center space-x-3">
        <button 
          @click="resetPractice"
          class="px-6 py-2 bg-primary hover:bg-primary-600 text-white rounded-md transition-colors"
        >
          {{ $t('practice.tryAgain') }}
        </button>
        <button 
          @click="$emit('practiceDone')"
          class="px-6 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
        >
          {{ $t('practice.done') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import { getRandomText } from '@/data/practiceTexts';

const { t, locale } = useI18n();

const props = defineProps({
  presetLevel: {
    type: String,
    default: 'beginner'
  }
});

const emit = defineEmits(['practiceDone']);

// State
const mode = ref('ready'); // ready, typing, results
const typedText = ref('');
const currentText = ref('');
const startTime = ref(null);
const currentTime = ref(0);
const timer = ref(null);
const level = ref(props.presetLevel);
const inputField = ref(null);

// Metrics
const totalTime = ref(0);
const wpm = ref(0);
const accuracy = ref(100);
const errors = ref(0);

// Methods
const startPractice = () => {
  let practiceText;
  
  // Get appropriate text based on the language
  if (locale.value === 'es' && level.value === 'beginner') {
    practiceText = getRandomText('spanish');
  } else {
    practiceText = getRandomText(level.value);
  }
  
  currentText.value = practiceText.text;
  mode.value = 'typing';
  typedText.value = '';
  
  // Focus on the input after the DOM updates
  nextTick(() => {
    if (inputField.value) {
      inputField.value.focus();
    }
  });
};

const resetPractice = () => {
  mode.value = 'ready';
  typedText.value = '';
  currentText.value = '';
  startTime.value = null;
  stopTimer();
};

const startTimer = () => {
  if (!startTime.value) {
    startTime.value = Date.now();
    timer.value = setInterval(() => {
      currentTime.value = Math.floor((Date.now() - startTime.value) / 1000);
    }, 1000);
  }
};

const stopTimer = () => {
  if (timer.value) {
    clearInterval(timer.value);
    timer.value = null;
  }
};

const calculateWPM = (text, timeInSeconds) => {
  // Standard formula: (characters typed / 5) / (time in minutes)
  const words = text.length / 5; // Assuming an average word is 5 characters
  const timeInMinutes = timeInSeconds / 60;
  return Math.round(words / timeInMinutes);
};

const calculateAccuracy = (original, typed) => {
  if (!typed) return 100;
  
  let correctChars = 0;
  for (let i = 0; i < typed.length; i++) {
    if (i < original.length && typed[i] === original[i]) {
      correctChars++;
    }
  }
  
  return Math.round((correctChars / typed.length) * 100);
};

const checkProgress = () => {
  // Check if the text is completed
  if (typedText.value.length >= currentText.value.length) {
    completeTyping();
  }
};

const completeTyping = () => {
  stopTimer();
  totalTime.value = Math.max(1, currentTime.value); // Ensure time is at least 1 second
  wpm.value = calculateWPM(currentText.value, totalTime.value);
  accuracy.value = calculateAccuracy(currentText.value, typedText.value);
  
  // Count errors
  errors.value = 0;
  for (let i = 0; i < typedText.value.length && i < currentText.value.length; i++) {
    if (typedText.value[i] !== currentText.value[i]) {
      errors.value++;
    }
  }
  
  mode.value = 'results';
};

const changeLevel = (newLevel) => {
  level.value = newLevel;
};

const formattedTime = computed(() => {
  const minutes = Math.floor(currentTime.value / 60);
  const seconds = currentTime.value % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

// Clean up timer on component unmount
onUnmounted(() => {
  stopTimer();
});

// Start with a default text if none provided
onMounted(() => {
  // Start in ready mode
});
</script>

<style scoped>
.practice-text {
  min-height: 5rem;
  word-wrap: break-word;
  white-space: pre-wrap;
}
</style>
