<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const searchQuery = ref('')
const router = useRouter()

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/search', query: { q: searchQuery.value.trim() } })
  }
}
</script>

<template>
    <div class="search-container">
        <form @submit.prevent="handleSearch" class="search-form">
            <input 
                type="search" 
                v-model="searchQuery" 
                placeholder="Buscar posts..." 
                class="search-input"
                aria-label="Buscar posts"
            />
            <button type="submit" class="search-button" aria-label="Buscar">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </button>
        </form>
    </div>
</template>

<style scoped lang="scss">
.search-container {
    display: flex;
    align-items: center;

    .search-form {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: stretch;
        height: 40px;
        gap: 0;
        margin: 0;
        padding: 0;

        .search-input {
            flex-grow: 1;
            flex-shrink: 1;
            min-width: 0;
            padding: 0 1rem;
            margin: 0;
            border: 1px solid #e5e7eb;
            border-right: none; /* Avoid double border */
            border-radius: 0.375rem 0 0 0.375rem;
            outline: none;
            font-size: 1rem;
            transition: border-color 0.2s, box-shadow 0.2s;
            height: 100%;
            background-color: white;

            &:focus {
                border-color: rgb(38, 116, 44);
                box-shadow: inset 0 0 0 1px rgb(38, 116, 44);
                /* Using inset box-shadow to prevent size change */
            }
        }

        .search-button {
            flex-shrink: 0;
            width: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
            margin: 0;
            background-color: rgb(38, 116, 44);
            color: white;
            border: 1px solid rgb(38, 116, 44);
            border-radius: 0 0.375rem 0.375rem 0;
            cursor: pointer;
            transition: background-color 0.2s, border-color 0.2s;
            height: 100%;

            &:hover, &:focus {
                background-color: #385238;
                border-color: #385238;
                outline: none;
            }
        }
    }
}
</style>
