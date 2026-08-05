<script setup lang="ts">
import { ref } from 'vue'

const isSlideoverOpen = ref(false)

const toggleSlideover = () => {
    isSlideoverOpen.value = !isSlideoverOpen.value
}
</script>

<template>
    <header>
        <div class="logo">
            <NuxtLink to="/" aria-label="Ir para a página inicial" class="logo-link">
                <img src="~/assets/img/logo_principal.svg" alt="Abertamente Logo">
            </NuxtLink>

            <!-- Elementos Desktop -->
            <div class="desktop-content">
                <SearchForm />
                <nav>
                    <ul>
                        <li><NuxtLink to="/">Home</NuxtLink></li>
                        <li><NuxtLink to="/posts">Posts</NuxtLink></li>
                    </ul>
                </nav>
            </div>

            <!-- Botões Mobile -->
            <div class="mobile-actions">
                <button aria-label="Abrir busca e menu" @click="toggleSlideover" class="icon-btn">
                    <!-- Ícone Lupa -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </button>
                <button aria-label="Menu" @click="toggleSlideover" class="icon-btn">
                    <!-- Ícone Hamburguer -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>
            </div>
        </div>

        <!-- Slideover Overlay (clique fora para fechar) -->
        <div class="slideover-overlay" v-if="isSlideoverOpen" @click="toggleSlideover"></div>

        <!-- Slideover Painel -->
        <div class="slideover-panel" :class="{ 'is-open': isSlideoverOpen }">
            <div class="slideover-header">
                <img src="~/assets/img/logo_negativo.svg" alt="Abertamente Logo" class="slideover-logo">
                <button aria-label="Fechar" @click="toggleSlideover" class="icon-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            
            <div class="slideover-body">
                <!-- Wrapper do formulário de busca com margem -->
                <div style="margin-bottom: 20px;">
                    <SearchForm />
                </div>
                <nav class="slideover-nav">
                    <ul>
                        <li><NuxtLink to="/" @click="toggleSlideover">Home</NuxtLink></li>
                        <li><NuxtLink to="/posts" @click="toggleSlideover">Posts</NuxtLink></li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
</template>

<style scoped lang="scss">
@use '~/assets/abstracts/mixins' as *;

header {
    width: 100%;
    height: auto;
    min-height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    
    .logo {
        width: 90%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: nowrap;
        gap: 15px;

        img {
            height: 60px;
            max-width: 190px;
        }

        .desktop-content {
            display: flex;
            align-items: center;
            gap: 20px;
            
            nav ul {
                list-style: none;
                display: flex;
                gap: 20px;
                li a {
                    text-decoration: none;
                    color: rgb(38, 116, 44);
                    font-weight: bold;
                    font-size: 18px;
                    &:hover { color: #385238; }
                }
            }

            @include respond-max('md') {
                display: none;
            }
        }

        .mobile-actions {
            display: none;
            align-items: center;
            gap: 10px;

            @include respond-max('md') {
                display: flex;
            }
        }
    }

    .icon-btn {
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 8px;
        color: rgb(38, 116, 44);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        transition: background-color 0.2s;
        
        &:hover {
            background-color: rgba(38, 116, 44, 0.1);
        }
    }

    /* Slideover */
    .slideover-overlay {
        position: fixed;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 40;
    }

    .slideover-panel {
        position: fixed;
        top: 0;
        right: 0;
        height: 100vh;
        width: 320px;
        max-width: 100vw;
        background: #034F04;
    background: linear-gradient(0deg, rgb(0, 9, 0) 0%, rgb(2, 42, 14) 100%);
        box-shadow: -4px 0 15px rgba(0, 0, 0, 0.1);
        z-index: 50;
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
        display: flex;
        flex-direction: column;

        &.is-open {
            transform: translateX(0);
        }

        .slideover-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 20px;
            border-bottom: 1px solid #e5e7eb;

            .slideover-logo {
                height: 25px;
            }
        }

        .slideover-body {
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 20px;

            .slideover-nav ul {
                list-style: none;
                display: flex;
                flex-direction: column;
                gap: 15px;
                padding: 0;
                margin: 0;
                width: 100%;

                li {
                    width: 100%;
                    text-align: left;
                }

                li a {
                    text-decoration: none;
                    color: #ffffff; /* Ajustado para fundo escuro */
                    font-weight: bold;
                    font-size: 18px;
                    display: block;
                    padding: 8px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    text-align: left;
                }
            }
        }
    }
}
</style>