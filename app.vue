<script setup lang="ts">
const menuList = [
  {
    title: "Главная",
    link: "/",
  },
  {
    title: "Диаграмма",
    link: "/chart",
  },
];
</script>

<template>
  <div class="app">
    <header class="app__header">
      <nav class="app__nav nav">
        <ul class="nav__list">
          <li
            v-for="menuItem in menuList"
            class="nav__item"
            :key="menuItem.link"
          >
            <NuxtLink class="nav__link" :to="menuItem.link">
              {{ menuItem.title }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </header>
    <main class="app__main">
      <NuxtPage />
    </main>
  </div>
</template>

<style scoped>
.app {
  .app__header {
    position: sticky;
    top: 0;
    z-index: 2;
    width: 100%;
  }

  .nav {
    padding-top: 8px;
    padding-bottom: 8px;
    background-color: var(--accent-blue);

    .nav__list {
      display: flex;
      padding: 0;
      margin: 0 20px 0 20px;
      list-style: none;
    }

    .nav__item {
      margin-right: 16px;
    }

    .nav__item:last-child {
      margin-right: 0;
    }

    .nav__link {
      display: flex;
      text-decoration: none;
      padding: 16px 8px;
      font-size: var(--size-16);
      line-height: var(--size-20);
      font-weight: 600;

      transition: color ease-in-out 0.1s;
      color: var(--text-color-inverse);
    }

    .nav__link.router-link-exact-active {
      color: var(--accent-gray);
    }

    .nav__link:hover {
      color: var(--accent-gray-hover);
    }
  }

  .app__main {
    margin-right: 4px;
    margin-left: 4px;
    margin-top: 30px;
  }
}
</style>
