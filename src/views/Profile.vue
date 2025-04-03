<template>
  <div class="max-w-4xl mx-auto py-8 px-4 sm:px-6">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">{{ $t('profile.title') }}</h1>
    
    <div v-if="loading" class="flex justify-center my-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary dark:border-primary-300"></div>
    </div>
    
    <div v-else-if="user" class="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
      <div class="px-4 py-5 sm:px-6 flex items-center justify-between">
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">{{ $t('profile.userInfo') }}</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">{{ $t('profile.details') }}</p>
        </div>
        <img 
          :src="avatarUrl" 
          alt="Avatar" 
          class="w-20 h-20 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
        />
      </div>
      <div class="border-t border-gray-200 dark:border-gray-700">
        <dl>
          <div class="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-300">{{ $t('profile.name') }}</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">{{ displayName }}</dd>
          </div>
          <div class="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-300">{{ $t('profile.email') }}</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">{{ email }}</dd>
          </div>
          <div class="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-300">{{ $t('profile.memberSince') }}</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">{{ createdAt }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '@/supabase';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const { t } = useI18n();

const user = ref(null);
const loading = ref(true);
const avatarUrl = ref(null);
const displayName = ref('');
const email = ref('');
const provider = ref('');
const createdAt = ref('');

onMounted(async () => {
  loading.value = true;
  
  try {
    const { data: { user: userData }, error } = await supabase.auth.getUser();
    
    if (error || !userData) {
      throw new Error(t('profile.notAuthenticated'));
    }
    
    user.value = userData;
    email.value = userData.email;
    displayName.value = userData.user_metadata?.name || userData.email;
    avatarUrl.value = userData.user_metadata?.avatar_url || 
      userData.user_metadata?.picture ||
      `https://www.gravatar.com/avatar/${btoa(userData.email)}?d=mp&s=200`;
    if (userData.app_metadata?.provider) {
      provider.value = userData.app_metadata.provider;
    } else if (userData.email && !userData.identities.some(i => i.provider !== 'email')) {
      provider.value = 'email';
    } else {
      provider.value = 'desconocido';
    }
    if (userData.created_at) {
      const date = new Date(userData.created_at);
      createdAt.value = date.toLocaleDateString();
    }
    
  } catch (error) {
    console.error(`${t('profile.errorLoading')} ${error}`);
    router.push('/');
  } finally {
    loading.value = false;
  }
});
</script>
