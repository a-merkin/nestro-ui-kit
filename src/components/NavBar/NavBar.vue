<template>
  <nav class="navbar">
    <ul class="navbar__list">
      <li
        v-for="(item, index) in items"
        :key="item.id"
        class="navbar__item-wrapper"
      >
        <!--
          "Connected active state" — перетекание активной кнопки в контент-область.
          Реализовано через ::before/::after на активной кнопке:
          1. Белый фон + border-radius только слева (правая сторона = 0).
          2. margin-right отрицательный — кнопка выезжает вправо, перекрывая шов.
          3. ::before / ::after рисуют инвертированные скругления ("ушки")
             через radial-gradient (прозрачный круг на белом фоне).
        -->
        <button
          :class="[
            'navbar__button',
            {
              'navbar__button--active': modelValue === item.id,
            },
          ]"
          :title="item.label"
          :aria-current="modelValue === item.id ? 'page' : undefined"
          type="button"
          @click="handleClick(item.id)"
        >
          <slot :name="`icon-${item.id}`" :item="item" :active="modelValue === item.id">
            <span class="navbar__icon-placeholder" />
          </slot>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import type { NavBarProps, NavBarEmits } from './NavBar.types';

defineOptions({ name: 'NNavBar' });

const props = withDefaults(defineProps<NavBarProps>(), {
  modelValue: '',
});

const emit = defineEmits<NavBarEmits>();

const handleClick = (id: string) => {
  emit('update:modelValue', id);
};
</script>

<style scoped>
/*
 * ============================================================
 * NavBar — вертикальный sidebar с neumorphism-эффектом
 * и "connected active state" перетеканием в контент-область
 *
 * Размеры выверены по Figma-макету (node 1:1499):
 *   кнопка 50×50, gap 16, radius 10, иконка 30×30, padding 10
 * ============================================================
 */

.navbar {
  --_ear-size: 16px;
  --_btn-size: 50px;
  --_sidebar-w: 78px;
  --_sidebar-pad-x: 14px;
  --_btn-radius: 10px;
}

.navbar {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: var(--_sidebar-w);
  height: 100%;
  padding: var(--space-8) 0 var(--space-6);
  box-sizing: border-box;

  /* Мягкий серо-голубой фон sidebar */
  background: linear-gradient(180deg, #d2dfe6 0%, #dde8ed 50%, #d2dfe6 100%);

  /* Скругления по правой стороне */
  border-radius: 0 var(--radius-xl) var(--radius-xl) 0;

  position: relative;
  z-index: var(--z-raised);
  flex-shrink: 0;
}

.navbar__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4); /* 16px — из Figma */
  width: 100%;
}

.navbar__item-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0 var(--_sidebar-pad-x);
  box-sizing: border-box;
}

/* ----------------------------------------------------------------
 * Кнопка — default (неактивный): мягкий neumorphism
 * Figma: bg #f4f7f8, 50×50, radius 10, padding 10, icon 30×30
 * ---------------------------------------------------------------- */
.navbar__button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--_btn-size);
  height: var(--_btn-size);
  border: none;
  cursor: pointer;
  position: relative;
  z-index: 1;
  padding: 10px;
  box-sizing: border-box;

  /* Figma: var(--background-secondary, #f4f7f8) */
  background: var(--color-blue-60, #f4f7f8);
  border-radius: var(--_btn-radius);

  /* Neumorphism: мягкая выпуклая тень (присутствует в макете, но не экспортируется Figma) */
  box-shadow:
    4px 4px 8px rgba(155, 172, 183, 0.5),
    -4px -4px 8px rgba(255, 255, 255, 0.8);

  color: #a0a8ae;

  transition:
    background var(--duration-normal) var(--easing-standard),
    box-shadow var(--duration-normal) var(--easing-standard),
    color var(--duration-normal) var(--easing-standard),
    border-radius var(--duration-normal) var(--easing-standard);
}

/* Figma: icon 30×30 */
.navbar__button :deep(svg) {
  width: 30px;
  height: 30px;
  color: inherit;
  opacity: 0.4;
  transition:
    color var(--duration-normal) var(--easing-standard),
    opacity var(--duration-normal) var(--easing-standard);
}

/* Плейсхолдер если нет иконки */
.navbar__icon-placeholder {
  display: block;
  width: 30px;
  height: 30px;
  border-radius: var(--radius-sm);
  background: var(--color-grey-40);
  opacity: 0.3;
}

/* ----------------------------------------------------------------
 * Hover — чуть контрастнее, тень сильнее
 * ---------------------------------------------------------------- */
.navbar__button:hover:not(.navbar__button--active) {
  background: #f8fbfc;
  box-shadow:
    5px 5px 10px rgba(155, 172, 183, 0.5),
    -5px -5px 10px rgba(255, 255, 255, 0.9);
  color: var(--color-grey-70);
}

.navbar__button:hover:not(.navbar__button--active) :deep(svg) {
  opacity: 0.6;
}

/* ----------------------------------------------------------------
 * Active (выбранный) — ключевой эффект "connected state"
 *
 * Figma: bg white, radius 10, icon полная непрозрачность
 * Белый фон, скруглён только слева; справа = 0 + выезд вправо
 * через отрицательный margin, чтобы перекрыть границу sidebar ↔ контент.
 * ---------------------------------------------------------------- */
.navbar__button--active {
  background: var(--color-white);

  /* Скругления только слева; справа — 0, чтобы "слиться" с контент-областью */
  border-radius: var(--_btn-radius) 0 0 var(--_btn-radius);

  /* Убираем neumorphism-тень, мягкая тень только слева */
  box-shadow: -3px 0 8px rgba(150, 168, 180, 0.18);

  color: var(--color-grey-70);

  /*
   * Выезд вправо: кнопка расширяется на величину правого padding sidebar,
   * чтобы её правый край совпал с правым краем navbar.
   * Это "стирает" шов между sidebar и контентом.
   */
  margin-right: calc(-1 * var(--_sidebar-pad-x));
  padding-right: calc(10px + var(--_sidebar-pad-x));
  width: calc(var(--_btn-size) + var(--_sidebar-pad-x));
  z-index: 2;
}

/* Активная иконка — полная непрозрачность (Figma: opacity 1) */
.navbar__button--active :deep(svg) {
  opacity: 1;
}

.navbar__button--active:hover {
  background: var(--color-white);
  box-shadow: -3px 0 8px rgba(150, 168, 180, 0.18);
}

/* ----------------------------------------------------------------
 * Инвертированные скругления ("ушки") — ::before / ::after
 *
 * Рисуются на самой активной кнопке.
 * Используем radial-gradient: прозрачный круг на белом фоне.
 * Это создаёт "вогнутое" скругление, визуально соединяющее
 * белый фон кнопки с белым контентом справа,
 * при этом плавно "перетекая" из фона sidebar.
 *
 * Размер = 16px (совпадает с gap между кнопками).
 * ---------------------------------------------------------------- */
.navbar__button--active::before {
  content: '';
  position: absolute;
  top: calc(-1 * var(--_ear-size));
  right: 0;
  width: var(--_ear-size);
  height: var(--_ear-size);
  background: radial-gradient(
    circle at 0% 100%,
    transparent var(--_ear-size),
    var(--color-white) var(--_ear-size)
  );
  z-index: 2;
  pointer-events: none;
}

.navbar__button--active::after {
  content: '';
  position: absolute;
  bottom: calc(-1 * var(--_ear-size));
  right: 0;
  width: var(--_ear-size);
  height: var(--_ear-size);
  background: radial-gradient(
    circle at 0% 0%,
    transparent var(--_ear-size),
    var(--color-white) var(--_ear-size)
  );
  z-index: 2;
  pointer-events: none;
}
</style>
