## 📦 Установка

### npm
```bash
npm install nestro-ui-kit
```

### yarn
```bash
yarn add nestro-ui-kit
```

### pnpm
```bash
pnpm add nestro-ui-kit
```

## 🚀 Быстрый старт

### 1. Импорт стилей

В вашем главном файле (`main.ts` или `main.js`) импортируйте стили:

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import 'nestro-ui-kit/nestro-ui-kit.css'

createApp(App).mount('#app')
```

### 2. Использование компонентов

Импортируйте и используйте компоненты в ваших Vue-файлах:

```vue
<template>
  <div>
    <Button variant="primary" @click="handleClick">
      Нажми меня
    </Button>
    
    <Input 
      v-model="inputValue" 
      placeholder="Введите текст"
    />
    
    <Checkbox v-model="isChecked">
      Согласен с условиями
    </Checkbox>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Input, Checkbox } from 'nestro-ui-kit'

const inputValue = ref('')
const isChecked = ref(false)

const handleClick = () => {
  console.log('Кнопка нажата!')
}
</script>
```

## 📚 Компоненты

Библиотека включает следующие компоненты:

### Основные компоненты

- **Button** - Кнопка с различными вариантами стилей
- **Input** - Поле ввода с поддержкой иконок
- **Checkbox** - Чекбокс с кастомным дизайном
- **Switch** - Переключатель
- **RadioButton** - Радио-кнопка
- **RadioGroup** - Группа радио-кнопок
- **Icon** - Компонент для иконок

### Формы и выбор

- **Dropdown** - Выпадающий список с поиском
- **MultiSelect** - Множественный выбор
- **SegmentedControl** - Сегментированный контрол
- **RangeSlider** - Слайдер диапазона

### Индикаторы и обратная связь

- **Loader** - Индикатор загрузки
- **ProgressBar** - Прогресс-бар
- **Modal** - Модальное окно

### Отображение данных

- **Table** - Таблица с сортировкой и фильтрацией
- **ColorPalette** - Палитра цветов

### Специализированные компоненты

- **Workplace** - Компонент рабочего пространства
- **CurrentScenario** - Текущий сценарий
- **SectionWrapper** - Обертка для секций

## 📖 Storybook - Интерактивная документация

Storybook - это лучший способ изучить все компоненты библиотеки, их возможности и API. В Storybook вы найдете интерактивные примеры всех компонентов с возможностью изменения их свойств в реальном времени.

### Запуск Storybook локально

Если вы хотите изучить компоненты во время разработки:

```bash
# Клонируйте репозиторий
git clone <repository-url>
cd nestro-ui-kit

# Установите зависимости
npm install

# Запустите Storybook
npm run storybook
```

Storybook откроется по адресу [http://localhost:6006](http://localhost:6006)

### Что вы найдете в Storybook

#### 1. **Интерактивные примеры**
Каждый компонент представлен с различными вариантами использования:
- Базовые примеры
- Различные состояния (disabled, loading, error и т.д.)
- Варианты стилей
- Примеры с разными пропсами

#### 2. **Панель Controls**
Позволяет динамически изменять пропсы компонента и видеть результат в реальном времени:
- Изменяйте текст, цвета, размеры
- Включайте/выключайте состояния
- Тестируйте различные комбинации параметров

#### 3. **Автоматическая документация**
Для каждого компонента доступна документация, включающая:
- Описание всех props с типами
- Доступные события (events)
- Слоты (slots)
- Значения по умолчанию

#### 4. **Actions**
Отслеживайте события компонентов (клики, изменения значений и т.д.) в панели Actions

#### 5. **Код примеров**
Просматривайте код каждого примера, чтобы понять, как его реализовать в вашем проекте

### Навигация по Storybook

Компоненты организованы по категориям в боковой панели:

```
UI/
├── Button
├── Input
├── Checkbox
├── Switch
├── Dropdown
├── Modal
├── Loader
└── ...
```

### Примеры использования Storybook

#### Изучение компонента Button

1. Откройте Storybook (`npm run storybook`)
2. В боковой панели выберите `UI → Button`
3. Вы увидите различные варианты кнопок:
   - Primary - основная кнопка
   - Secondary - вторичная кнопка
   - Text - текстовая кнопка
   - Circle - круглая кнопка
   - Disabled - отключенная кнопка
   - Loading - кнопка в состоянии загрузки
   - WithIcons - кнопка с иконками

4. В панели Controls внизу измените параметры:
   - `variant` - выберите другой вариант
   - `disabled` - включите/выключите
   - `loading` - включите индикатор загрузки
   - `default` - измените текст кнопки

5. Во вкладке "Docs" найдете полную документацию по API компонента

#### Тестирование Dropdown с поиском

1. Выберите `UI → Dropdown` в боковой панели
2. Найдите пример "Searchable"
3. В панели Controls:
   - Установите `searchable: true`
   - Добавьте `clearable: true`
   - Измените `placeholder`
4. Протестируйте поведение компонента прямо в браузере
5. Посмотрите код примера, чтобы понять, как это реализовать

#### Просмотр всех состояний Input

1. Откройте `UI → Input`
2. Просмотрите различные примеры:
   - Basic - базовое поле ввода
   - WithIcons - с иконками
   - Error - с ошибкой
   - Disabled - отключенное
   - Different types - различные типы (password, email, date и т.д.)
3. Используйте эти примеры как референс для вашего кода

### Сборка Storybook для продакшена

Если вы хотите развернуть Storybook как статический сайт:

```bash
npm run build-storybook
```

Результат будет в папке `storybook-static/`, который можно развернуть на любом хостинге.

## 📦 Экспорты

### Компоненты

```typescript
import {
  Button,
  Icon,
  Table,
  Dropdown,
  Checkbox,
  Switch,
  Input,
  RangeSlider,
  ProgressBar,
  Loader,
  Workplace,
  ColorPalette,
  MultiSelect,
  CurrentScenario,
  SegmentedControl,
  RadioButton,
  RadioGroup,
  Modal
} from 'nestro-ui-kit'
```

### Типы

```typescript
import type {
  SegmentedControlOption,
  RadioGroupOption
} from 'nestro-ui-kit'
```

### Стили

```typescript
import 'nestro-ui-kit/nestro-ui-kit.css'
```

## 🎨 Кастомизация

### CSS переменные

Компоненты используют CSS переменные для настройки цветов и стилей. Вы можете переопределить их в вашем приложении:

```css
:root {
  /* Цвета текста */
  --color-text-primary: #222c37;
  --color-text-secondary: #464e56;
  --color-text-tertiary: #7897a6;
  --color-text-disabled: #e1e1e1;
  --color-text-error: #ed6e1c;
  
  /* Цвета обводки */
  --color-stroke-primary: rgba(162, 177, 184, 0.51);
  --color-stroke-error: #ed6e1c;
}
```

### Типографика

Библиотека включает шрифт Montserrat. Стили типографики автоматически применяются при импорте CSS файла.

## 🛠️ Разработка

### Установка зависимостей

```bash
npm install
```

### Запуск в режиме разработки

```bash
npm run dev
```

### Линтинг

```bash
npm run lint
```

### Форматирование кода

```bash
npm run format
```

### Сборка библиотеки

```bash
npm run build
```

Результат сборки будет находиться в директории `dist/`:
- `nestro-ui-kit.es.js` - ES модуль
- `nestro-ui-kit.umd.js` - UMD модуль
- `nestro-ui-kit.css` - Стили
- `index.d.ts` - TypeScript определения

## 📁 Структура проекта

```
nestro-ui-kit/
├── src/
│   ├── components/      # Компоненты
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Dropdown/
│   │   └── ...
│   ├── stories/         # Storybook stories
│   ├── styles/          # Глобальные стили
│   │   ├── colors.css
│   │   └── typography.css
│   ├── assets/          # Ресурсы (иконки, изображения)
│   └── index.ts         # Главный экспорт
├── dist/                # Собранная библиотека
├── public/              # Публичные ресурсы
├── vite.config.ts       # Конфигурация Vite
├── tsconfig.json        # Конфигурация TypeScript
└── package.json
```

## 📝 TypeScript

Библиотека полностью написана на TypeScript и включает все необходимые типы. При использовании компонентов в TypeScript проектах вы получите полную поддержку автодополнения и проверки типов.

```typescript
import { Button, Input, Dropdown } from 'nestro-ui-kit'
import type { SegmentedControlOption, RadioGroupOption } from 'nestro-ui-kit'
```

## 🌐 Браузерная поддержка

- Chrome (последние 2 версии)
- Firefox (последние 2 версии)
- Safari (последние 2 версии)
- Edge (последние 2 версии)
