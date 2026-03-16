<template>
  <div ref="rootRef" class="date-picker">
    <label v-if="label" class="date-picker__label">{{ label }}</label>

    <div class="date-picker__trigger" :class="triggerClasses" @click="handleTriggerClick">
      <span class="date-picker__value" :class="{ 'date-picker__value--placeholder': !modelValue }">
        {{ displayValue }}
      </span>

      <div class="date-picker__actions">
        <button
          v-if="clearable && modelValue"
          class="date-picker__clear"
          type="button"
          @click.stop="handleClear"
        >
          <NIcon name="close" size="sm" />
        </button>
        <span class="date-picker__icon">
          <NIcon name="calendar" size="lg" />
        </span>
      </div>
    </div>

    <p v-if="error && errorMessage" class="date-picker__error">
      {{ errorMessage }}
    </p>

    <div v-if="isOpen" class="date-picker__popup">
      <div class="date-picker__header">
        <button class="date-picker__nav" type="button" @click="prevMonth">
          <NIcon name="arrow-left" size="sm" />
        </button>
        <span class="date-picker__month-year" @click="toggleYearSelect">
          {{ monthLabel }} {{ currentYear }}
        </span>
        <button class="date-picker__nav" type="button" @click="nextMonth">
          <NIcon name="arrow-right" size="sm" />
        </button>
      </div>

      <div v-if="showYearSelect" class="date-picker__years">
        <button
          v-for="year in yearRange"
          :key="year"
          class="date-picker__year-item"
          :class="{ 'date-picker__year-item--active': year === currentYear }"
          type="button"
          @click="selectYear(year)"
        >
          {{ year }}
        </button>
      </div>

      <template v-else>
        <div class="date-picker__weekdays">
          <span v-for="day in weekDays" :key="day" class="date-picker__weekday">{{ day }}</span>
        </div>

        <div class="date-picker__days">
          <button
            v-for="day in calendarDays"
            :key="day.key"
            class="date-picker__day"
            :class="getDayClasses(day)"
            :disabled="day.disabled"
            type="button"
            @click="selectDay(day)"
          >
            {{ day.date }}
          </button>
        </div>
      </template>

      <div class="date-picker__footer">
        <button class="date-picker__today" type="button" @click="goToday">Сегодня</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { DatePickerProps, DatePickerEmits } from './DatePicker.types';
import NIcon from '../Icon/Icon.vue';
import { toDateString, formatDate } from '@/utils/date';
import { useClickOutside } from '@/composables/useClickOutside';

defineOptions({ name: 'NDatePicker' });

const props = withDefaults(defineProps<DatePickerProps>(), {
  placeholder: 'Выберите дату',
  disabled: false,
  error: false,
  clearable: false,
  displayFormat: 'DD.MM.YYYY',
});

const emit = defineEmits<DatePickerEmits>();

const rootRef = ref<HTMLElement | null>(null);
const isOpen = ref(false);
const showYearSelect = ref(false);

const today = new Date();
const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());

const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const monthNames = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

const triggerClasses = computed(() => ({
  'date-picker__trigger--disabled': props.disabled,
  'date-picker__trigger--error': props.error,
  'date-picker__trigger--open': isOpen.value,
}));

const monthLabel = computed(() => monthNames[currentMonth.value]);

const yearRange = computed(() => {
  const years: number[] = [];
  for (let y = currentYear.value - 10; y <= currentYear.value + 10; y++) {
    years.push(y);
  }
  return years;
});

const displayValue = computed(() => {
  if (!props.modelValue) return props.placeholder;
  return formatDate(props.modelValue, props.displayFormat);
});

interface CalendarDay {
  key: string;
  date: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  disabled: boolean;
}

const calendarDays = computed((): CalendarDay[] => {
  const year = currentYear.value;
  const month = currentMonth.value;

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  let startWeekday = firstDay.getDay() - 1;
  if (startWeekday < 0) startWeekday = 6;

  const days: CalendarDay[] = [];

  const prevMonthLast = new Date(year, month, 0);
  for (let i = startWeekday - 1; i >= 0; i--) {
    const d = prevMonthLast.getDate() - i;
    const m = month === 0 ? 11 : month - 1;
    const y = month === 0 ? year - 1 : year;
    days.push(makeDay(d, m, y, false));
  }

  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(makeDay(d, month, year, true));
  }

  const remaining = 42 - days.length;
  for (let d = 1; d <= remaining; d++) {
    const m = month === 11 ? 0 : month + 1;
    const y = month === 11 ? year + 1 : year;
    days.push(makeDay(d, m, y, false));
  }

  return days;
});

function makeDay(date: number, month: number, year: number, isCurrentMonth: boolean): CalendarDay {
  const dateStr = toDateString(year, month, date);
  const todayStr = toDateString(today.getFullYear(), today.getMonth(), today.getDate());

  return {
    key: dateStr,
    date,
    month,
    year,
    isCurrentMonth,
    isToday: dateStr === todayStr,
    isSelected: dateStr === props.modelValue,
    disabled: isDateDisabled(dateStr),
  };
}

function isDateDisabled(dateStr: string): boolean {
  if (props.minDate && dateStr < props.minDate) return true;
  if (props.maxDate && dateStr > props.maxDate) return true;
  return false;
}

function handleTriggerClick() {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
  showYearSelect.value = false;

  if (isOpen.value && props.modelValue) {
    const [y, m] = props.modelValue.split('-').map(Number);
    currentYear.value = y;
    currentMonth.value = m - 1;
  }
}

function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
}

function toggleYearSelect() {
  showYearSelect.value = !showYearSelect.value;
}

function selectYear(year: number) {
  currentYear.value = year;
  showYearSelect.value = false;
}

function selectDay(day: CalendarDay) {
  if (day.disabled) return;
  const value = day.key;
  emit('update:modelValue', value);
  emit('change', value);
  isOpen.value = false;
}

function goToday() {
  const todayStr = toDateString(today.getFullYear(), today.getMonth(), today.getDate());
  if (!isDateDisabled(todayStr)) {
    emit('update:modelValue', todayStr);
    emit('change', todayStr);
  }
  currentMonth.value = today.getMonth();
  currentYear.value = today.getFullYear();
  isOpen.value = false;
}

function handleClear() {
  if (props.disabled) return;
  emit('update:modelValue', null);
  emit('change', null);
  emit('clear');
}

function getDayClasses(day: CalendarDay) {
  return {
    'date-picker__day--other': !day.isCurrentMonth,
    'date-picker__day--today': day.isToday,
    'date-picker__day--selected': day.isSelected,
    'date-picker__day--disabled': day.disabled,
  };
}

useClickOutside(rootRef, () => {
  isOpen.value = false;
  showYearSelect.value = false;
});
</script>

<style scoped lang="scss">
.date-picker {
  $self: &;
  position: relative;
  width: 100%;
  box-sizing: border-box;

  &__label {
    display: block;
    margin-bottom: var(--space-2);
    color: var(--color-grey-70);
    font-size: var(--font-size-sm);
    line-height: var(--line-height-sm);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: var(--size-height-md);
    padding: 0 var(--space-3) 0 var(--size-padding-horizontal-md);
    background: var(--color-bg-input);
    border: 1px solid var(--color-stroke-primary);
    border-radius: 60px;
    color: var(--color-grey-100);
    font-family: var(--font-family-base);
    font-size: var(--font-size-sm);
    cursor: pointer;
    transition: all 0.2s ease;
    box-sizing: border-box;
    overflow: hidden;

    &--disabled {
      background: var(--color-bg-input-disabled);
      border-color: var(--color-stroke-disabled);
      color: var(--color-text-disabled);
      cursor: not-allowed;
    }

    &--error {
      border-color: var(--color-stroke-error);
    }

    &--open {
      border-color: var(--color-green-90);
    }
  }

  &__value {
    flex: 1;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &--placeholder {
      color: var(--color-text-placeholder);
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin-left: var(--space-2);
    flex-shrink: 0;
  }

  &__clear {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--size-icon-md);
    height: var(--size-icon-md);
    border: none;
    background: none;
    cursor: pointer;
    color: var(--color-grey-80);
    border-radius: var(--radius-round);
    transition: transform 0.15s ease;
    padding: 0;
    flex-shrink: 0;

    &:hover {
      transform: scale(1.1);
    }

    &:active {
      transform: scale(0.95);
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-grey-80);
    width: fit-content;
  }

  &__error {
    margin-top: var(--space-1);
    padding-left: var(--size-padding-horizontal-md);
    font-size: var(--font-size-xs);
    color: var(--color-text-error);
  }

  &__popup {
    position: absolute;
    top: calc(100% + var(--space-2));
    left: 0;
    width: 280px;
    background: var(--color-white);
    border: 1px solid var(--color-blue-40);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    z-index: var(--z-dropdown);
    padding: var(--space-4);
    animation: datepicker-fade-in 0.15s ease;
    box-sizing: border-box;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--space-3);
  }

  &__nav {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--size-height-sm);
    height: var(--size-height-sm);
    border: none;
    background: none;
    cursor: pointer;
    color: var(--color-grey-70);
    border-radius: var(--radius-round);
    transition: background-color 0.15s ease;
    padding: 0;

    &:hover {
      background: var(--color-blue-60);
    }
  }

  &__month-year {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    color: var(--color-grey-100);
    cursor: pointer;
    user-select: none;
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-sm);
    transition: background-color 0.15s ease;

    &:hover {
      background: var(--color-blue-60);
    }
  }

  &__years {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-1);
    max-height: 240px;
    overflow-y: auto;
    padding: var(--space-2) 0;
  }

  &__year-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--size-height-sm);
    border: none;
    background: none;
    cursor: pointer;
    font-size: var(--font-size-sm);
    font-family: var(--font-family-base);
    color: var(--color-grey-100);
    border-radius: var(--radius-sm);
    transition:
      background-color 0.15s ease,
      color 0.15s ease;

    &:hover {
      background: var(--color-green-50);
      color: var(--color-white);
    }

    &--active {
      background: var(--color-green-90);
      color: var(--color-white);
    }
  }

  &__weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin-bottom: var(--space-1);
  }

  &__weekday {
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--size-height-sm);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
    color: var(--color-grey-80);
    user-select: none;
  }

  &__days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 1px;
  }

  &__day {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    aspect-ratio: 1;
    border: none;
    background: none;
    cursor: pointer;
    font-size: var(--font-size-sm);
    font-family: var(--font-family-base);
    color: var(--color-grey-100);
    border-radius: var(--radius-round);
    transition:
      background-color 0.15s ease,
      color 0.15s ease;

    &:hover:not(&--disabled):not(&--selected) {
      background: var(--color-blue-60);
    }

    &--other {
      color: var(--color-grey-40);
    }

    &--today {
      font-weight: var(--font-weight-bold);
      box-shadow: inset 0 0 0 1px var(--color-green-90);
    }

    &--selected {
      background: var(--color-green-90);
      color: var(--color-white);
      font-weight: var(--font-weight-semibold);
    }

    &--disabled {
      color: var(--color-grey-40);
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  &__footer {
    display: flex;
    justify-content: center;
    margin-top: var(--space-3);
    padding-top: var(--space-3);
    border-top: 1px solid var(--color-blue-70);
  }

  &__today {
    border: none;
    background: none;
    cursor: pointer;
    font-size: var(--font-size-sm);
    font-family: var(--font-family-base);
    font-weight: var(--font-weight-medium);
    color: var(--color-green-90);
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius-sm);
    transition: background-color 0.15s ease;

    &:hover {
      background: var(--color-blue-60);
    }
  }
}

@keyframes datepicker-fade-in {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
