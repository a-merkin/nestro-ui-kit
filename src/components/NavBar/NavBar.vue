<template>
  <nav class="navbar">
    <ul class="navbar__list">
      <li
        v-for="(item, index) in items"
        :key="item.id"
        class="navbar__item-wrapper"
      >
        <!--
          === "Connected active state" — перетекание активного элемента в рабочую область ===

          Эффект достигается за счёт двух псевдоэлементов (::before / ::after),
          которые рисуют инвертированные скругления ("ушки") сверху и снизу
          активной кнопки. Они создают визуальное "слияние" белого фона кнопки
          с белым фоном контент-области справа.

          Как это работает:
          1. Активная кнопка получает белый фон и border-radius слева,
             а правая сторона — прямая (radius: 0), чтобы "слиться" с контентом.
          2. Кнопка выезжает на 1px вправо через margin-right: -1px + position: relative + z-index,
             чтобы перекрыть границу между sidebar и контентом (убирает шов).
          3. .navbar__item-wrapper у активного элемента получает ::before и ::after —
             два блока 16x16px с фоном sidebar, замаскированные через
             radial-gradient (прозрачный круг на цветном фоне).
             Это создаёт иллюзию вогнутых скруглений, плавно "перетекающих"
             из sidebar в белый фон активного пункта.
          4. z-index: активная кнопка выше sidebar-фона, но ниже контент-области,
             что обеспечивает правильное наложение.
        -->
        <button
          :class="[
            'navbar__button',
            {
              'navbar__button--active': modelValue === item.id,
              'navbar__button--before-active': isBeforeActive(index),
              'navbar__button--after-active': isAfterActive(index),
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
import { computed } from 'vue';
import type { NavBarProps, NavBarEmits } from './NavBar.types';

defineOptions({ name: 'NNavBar' });

const props = withDefaults(defineProps<NavBarProps>(), {
  modelValue: '',
});

const emit = defineEmits<NavBarEmits>();

const activeIndex = computed(() => props.items.findIndex((item) => item.id === props.modelValue));

const isBeforeActive = (index: number) => activeIndex.value >= 0 && index === activeIndex.value - 1;

const isAfterActive = (index: number) => activeIndex.value >= 0 && index === activeIndex.value + 1;

const handleClick = (id: string) => {
  emit('update:modelValue', id);
};
</script>

<style scoped>
/*
 * ============================================================
 * NavBar — вертикальный sidebar с neumorphism-эффектом
 * и "connected active state" перетеканием в контент-область
 * ============================================================
 */

.navbar {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 72px;
  height: 100%;
  padding: var(--space-3) 0;
  box-sizing: border-box;

  /* Мягкий серо-голубой фон sidebar (soft UI) */
  background: linear-gradient(180deg, #d6e2e8 0%, #e0eaef 50%, #d6e2e8 100%);

  /* Скругления по правой стороне */
  border-radius: 0 var(--radius-lg) var(--radius-lg) 0;

  position: relative;
  z-index: var(--z-raised);
  flex-shrink: 0;
}

.navbar__list {
  list-style: none;
  margin: 0;
  padding: var(--space-2) 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  width: 100%;
}

.navbar__item-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0 var(--space-2);
  box-sizing: border-box;
}

/* ----------------------------------------------------------------
 * Кнопка — default (неактивный): мягкий neumorphism
 * ---------------------------------------------------------------- */
.navbar__button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: none;
  cursor: pointer;
  position: relative;
  z-index: 1;
  padding: var(--space-3);
  box-sizing: border-box;

  /* Фон почти совпадает с sidebar */
  background: linear-gradient(145deg, #e4edf2, #d0dbe1);
  border-radius: var(--radius-md);

  /* Neumorphism: мягкая выпуклая тень */
  box-shadow:
    3px 3px 6px rgba(163, 180, 190, 0.5),
    -3px -3px 6px rgba(255, 255, 255, 0.7);

  color: var(--color-grey-80);

  transition:
    background var(--duration-normal) var(--easing-standard),
    box-shadow var(--duration-normal) var(--easing-standard),
    color var(--duration-normal) var(--easing-standard),
    border-radius var(--duration-normal) var(--easing-standard);
}

.navbar__button :deep(svg) {
  width: 24px;
  height: 24px;
  color: inherit;
  transition: color var(--duration-normal) var(--easing-standard);
}

/* Плейсхолдер если нет иконки */
.navbar__icon-placeholder {
  display: block;
  width: 24px;
  height: 24px;
  border-radius: var(--radius-sm);
  background: var(--color-grey-40);
  opacity: 0.4;
}

/* ----------------------------------------------------------------
 * Hover — чуть контрастнее, тень сильнее
 * ---------------------------------------------------------------- */
.navbar__button:hover:not(.navbar__button--active) {
  background: linear-gradient(145deg, #eaf2f6, #d6e1e7);
  box-shadow:
    4px 4px 8px rgba(163, 180, 190, 0.55),
    -4px -4px 8px rgba(255, 255, 255, 0.8);
  color: var(--color-grey-70);
}

/* ----------------------------------------------------------------
 * Active (выбранный) — ключевой эффект "connected state"
 *
 * Белый фон, скруглён только слева; справа прямой + margin-right: -1px
 * перекрывает границу sidebar → контент.
 * ---------------------------------------------------------------- */
.navbar__button--active {
  background: var(--color-white);

  /* Скругления только слева; справа — 0, чтобы "слиться" с контент-областью */
  border-radius: var(--radius-md) 0 0 var(--radius-md);

  /* Убираем neumorphism-тень, добавляем мягкую "плавающую" */
  box-shadow: -3px 0 8px rgba(163, 180, 190, 0.25);

  color: var(--color-grey-70);

  /* Выезд вправо: перекрываем границу sidebar ↔ контент */
  margin-right: calc(-1 * var(--space-2));
  padding-right: calc(var(--space-3) + var(--space-2));
  width: calc(48px + var(--space-2));
  z-index: 2;
}

.navbar__button--active:hover {
  background: var(--color-white);
  box-shadow: -3px 0 8px rgba(163, 180, 190, 0.25);
}

/* ----------------------------------------------------------------
 * Инвертированные скругления ("ушки") — псевдоэлементы
 *
 * Рисуем на wrapper-е элементов ДО и ПОСЛЕ активного.
 * Используем radial-gradient: прозрачный круг на фоне sidebar,
 * что создаёт визуальный "вырез" / вогнутое скругление.
 * Позиционируем у правого края, точно в углу,
 * чтобы вогнутость стыковалась с белым фоном активной кнопки.
 * ---------------------------------------------------------------- */

/* "Ушко" снизу у элемента ПЕРЕД активным */
.navbar__button--before-active::after {
  content: '';
  position: absolute;
  bottom: -16px;
  right: 0;
  width: 16px;
  height: 16px;
  background: radial-gradient(circle at 0% 0%, transparent 16px, var(--color-white) 16px);
  z-index: 2;
  pointer-events: none;
}

/* "Ушко" сверху у элемента ПОСЛЕ активного */
.navbar__button--after-active::before {
  content: '';
  position: absolute;
  top: -16px;
  right: 0;
  width: 16px;
  height: 16px;
  background: radial-gradient(circle at 0% 100%, transparent 16px, var(--color-white) 16px);
  z-index: 2;
  pointer-events: none;
}

/* "Ушко" сверху на самом активном элементе (если он первый) */
.navbar__button--active::before {
  content: '';
  position: absolute;
  top: -16px;
  right: 0;
  width: 16px;
  height: 16px;
  background: radial-gradient(circle at 0% 100%, transparent 16px, var(--color-white) 16px);
  z-index: 2;
  pointer-events: none;
}

/* "Ушко" снизу на самом активном элементе (если он последний) */
.navbar__button--active::after {
  content: '';
  position: absolute;
  bottom: -16px;
  right: 0;
  width: 16px;
  height: 16px;
  background: radial-gradient(circle at 0% 0%, transparent 16px, var(--color-white) 16px);
  z-index: 2;
  pointer-events: none;
}
</style>
