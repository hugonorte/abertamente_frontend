<script setup lang="ts">
definePageMeta({
  layout: 'home'
});
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFetch } from '#app'

const route = useRoute()
const router = useRouter()

const query = computed(() => route.query.q as string || '')
const page = computed(() => parseInt(route.query.page as string) || 1)

interface Post {
  id: number
  title: string
  tldr: string
  slug: string
}

interface SearchResponse {
  current_page: number
  data: Post[]
  last_page: number
  per_page: number
  total: number
}

const config = useRuntimeConfig()

const { data, pending, error } = useFetch<SearchResponse>('/post/search', {
  baseURL: config.public.apiBaseUrl,
  query: {
    q: query,
    page: page
  },
  watch: [query, page]
})

const changePage = (newPage: number) => {
  router.push({
    path: '/search',
    query: {
      ...route.query,
      page: newPage.toString()
    }
  })
}

const totalPages = computed(() => {
  if (!data.value) return 0
  return data.value.last_page
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-2 text-green-800">
      Resultados da busca por: "<span class="italic">{{ query }}</span>"
    </h1>
    <p v-if="data && data.total > 0" class="text-gray-600 mb-8">
      {{ data.total }} {{ data.total === 1 ? 'resultado encontrado' : 'resultados encontrados' }}
    </p>
    
    <div v-if="pending" class="text-gray-500 my-8">
      Carregando resultados...
    </div>
    <div v-else-if="error" class="text-red-500 my-8">
      Ocorreu um erro ao buscar os resultados.
    </div>
    <div v-else-if="data?.data.length === 0" class="text-gray-600 my-8">
      Nenhum post encontrado para este termo.
    </div>
    
    <div v-else class="space-y-6">
      <article v-for="post in data?.data" :key="post.id" class="search-result-card">
        <h2 class="search-result-title">
          <NuxtLink :to="`/posts/${post.slug}`" class="search-result-link">
            {{ post.title }}
          </NuxtLink>
        </h2>
        <p class="search-result-tldr">{{ post.tldr }}</p>
      </article>

      <!-- Paginação -->
      <div v-if="totalPages > 1" class="flex justify-center mt-8 gap-2">
        <button 
          @click="changePage(page - 1)" 
          :disabled="page <= 1"
          class="px-4 py-2 border rounded-md"
          :class="page <= 1 ? 'text-gray-400 bg-gray-100 cursor-not-allowed' : 'text-green-700 hover:bg-green-50'"
        >
          Anterior
        </button>
        
        <span class="px-4 py-2 text-gray-700">
          Página {{ page }} de {{ totalPages }}
        </span>
        
        <button 
          @click="changePage(page + 1)" 
          :disabled="page >= totalPages"
          class="px-4 py-2 border rounded-md"
          :class="page >= totalPages ? 'text-gray-400 bg-gray-100 cursor-not-allowed' : 'text-green-700 hover:bg-green-50'"
        >
          Próxima
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.search-result-card {
  padding: 1.5rem;
  background-color: white;
  border: 1px solid #f3f4f6;
  border-radius: 0.75rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border-color: #bbf7d0;
    transform: translateY(-0.25rem);
  }

  .search-result-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.75rem;

    .search-result-link {
      color: #166534;
      transition: color 0.2s ease;
      text-decoration: none;

      &:hover {
        color: #16a34a;
      }
    }
  }

  .search-result-tldr {
    color: #4b5563;
    line-height: 1.625;
  }
}
</style>
