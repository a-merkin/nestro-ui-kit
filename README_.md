## ✍️ Typography

В Nestro UI Kit типографика построена на CSS-токенах и утилитах.  

---

### 🎨 Typography Tokens

#### Font family

| Token | Value |
|------|-------|
| `--font-family-base` | `'Montserrat', sans-serif` |

---

#### Font weights

| Token | Value | Usage |
|------|-------|-------|
| `--font-weight-regular` | 400 | Body text |
| `--font-weight-medium` | 500 | Buttons, labels |
| `--font-weight-semibold` | 600 | Subheadings |
| `--font-weight-bold` | 700 | Headings |

---

#### Font sizes

| Token | px | Usage |
|------|----|-------|
| `--font-size-xs` | 12px | Helper text |
| `--font-size-sm` | 14px | Body (default) |
| `--font-size-md` | 18px | Card titles |
| `--font-size-lg` | 22px | Section headers |
| `--font-size-xl` | 26px | Page headers |
| `--font-size-xxl` | 32px | Hero text |
| `--font-size-xxxl` | 40px | Marketing headlines |

---

#### Line heights

| Token | px |
|------|----|
| `--line-height-xs` | 16px |
| `--line-height-sm` | 20px |
| `--line-height-base` | 24px |
| `--line-height-lg` | 28px |
| `--line-height-xl` | 32px |
| `--line-height-xxl` | 40px |
| `--line-height-xxxl` | 48px |

---

### ⚡ Typography Utilities

| Class | Font-size | Line-height | Weight | Usage |
|------|-----------|-------------|--------|-------|
| `.text-xs` | `--font-size-xs` | `--line-height-xs` | regular | Helper text |
| `.text-sm` | `--font-size-sm` | `--line-height-sm` | regular | Body (default) |
| `.text-md` | `--font-size-md` | `--line-height-base` | regular | Card titles |
| `.text-lg` | `--font-size-lg` | `--line-height-lg` | semibold | Section headers |
| `.text-xl` | `--font-size-xl` | `--line-height-xl` | semibold | Page headers |
| `.text-xxl` | `--font-size-xxl` | `--line-height-xxl` | bold | Hero text |


## 🟢 Radius Tokens — Nestro UI Kit

Все радиусы кратны 4px для согласованной визуальной сетки.

### 🎯 Tokens

| Token              | Значение | Описание |
|-------------------|----------|----------|
| `--radius-sm`     | 4px      | Малые скругления (badge, input, tag) |
| `--radius-md`     | 8px      | Базовые элементы (кнопки, select, chip) |
| `--radius-lg`     | 12px     | Карточки, панели, секции |
| `--radius-xl`     | 16px     | Модальные окна, большие контейнеры |
| `--radius-round`  | 50%      | Круглые элементы (аватары, icon-button) |

---

### ⚡ Utilities

Готовые классы для быстрого применения:

| Class | Значение |
|-------|----------|
| `.radius-sm` | `border-radius: var(--radius-sm)` |
| `.radius-md` | `border-radius: var(--radius-md)` |
| `.radius-lg` | `border-radius: var(--radius-lg)` |
| `.radius-xl` | `border-radius: var(--radius-xl)` |
| `.radius-round` | `border-radius: var(--radius-round)` |

---

### 🛠 Использование в компонентах

```scss
.button {
  border-radius: var(--radius-md);
}

.card {
  border-radius: var(--radius-lg);
}

.modal {
  border-radius: var(--radius-xl);
}

.avatar {
  border-radius: var(--radius-round);
}
```

# 🎨 Color System — Nestro UI Kit

Цветовая система построена на **палитрах**, а не на семантических или компонентных токенах.  
Компоненты используют **только базовые токены**, что делает систему гибкой, масштабируемой и предсказуемой.

---

## 🧱 Принципы

✅ Нет токенов под конкретные компоненты (`button-*`, `card-*`)  
✅ Нет дублирующих semantic-цветов (`background-primary`, `text-secondary`)  
✅ Все цвета — чистые палитры  
✅ Компоненты собираются через composition  

---

## 🎯 Base Colors

| Token | Value |
|-------|-------|
| `--color-white` | `#FFFFFF` |
| `--color-black` | `#000000` |

---

## 🟢 Green Palette

| Token | Value |
|-------|-------|
| `--color-green-100` | `#097F2D` |
| `--color-green-90` | `#009639` |
| `--color-green-80` | `#72CA94` |
| `--color-green-50` | `#009639` |

---

## 🔵 Blue Palette

| Token | Value |
|-------|-------|
| `--color-blue-70` | `#E2E9EC` |
| `--color-blue-60` | `#F4F7F8` |
| `--color-blue-50` | `#AABDC7` |
| `--color-blue-40` | `#D3DDE2` |
| `--color-blue-30` | `#CFD7DB` |

---

## ⚫ Grey Palette

| Token | Value |
|-------|-------|
| `--color-grey-100` | `#000000` |
| `--color-grey-80` | `#999999` |
| `--color-grey-70` | `#464E56` |
| `--color-grey-50` | `#F9F9F9` |
| `--color-grey-40` | `#CDCDCD` |
| `--color-grey-20` | `#D9D9D9` |

---

## 🟠 Accent

| Token | Value |
|-------|-------|
| `--color-orange` | `#ED6E1C` |

---

## ⚡ Использование в CSS

```css
.button {
  background: var(--color-green-90);
  color: var(--color-white);
  border: 1px solid var(--color-blue-30);
}

```

## 🟣 Size Tokens — Nestro UI Kit

Токены размеров управляют:
- высотой контролов (Button, Input, Select)
- горизонтальными отступами
- размерами иконок
- touch-area для доступности

---

### 📏 Control heights

| Token | Значение | Описание |
|-------|----------|----------|
| `--size-control-sm` | 32px | Малые контролы |
| `--size-control-md` | 40px | Базовый размер |
| `--size-control-lg` | 48px | Крупные контролы |

---

### 📐 Control paddings

| Token | Значение |
|-------|----------|
| `--size-control-padding-sm` | `0 12px` |
| `--size-control-padding-md` | `0 16px` |
| `--size-control-padding-lg` | `0 20px` |

---

### 🎯 Icon sizes

| Token | Значение |
|-------|----------|
| `--size-icon-sm` | 16px |
| `--size-icon-md` | 20px |
| `--size-icon-lg` | 24px |

---

### 🖐 Touch targets

| Token | Значение |
|-------|----------|
| `--size-touch-sm` | 40px |
| `--size-touch-md` | 44px |
| `--size-touch-lg` | 48px |

---

## ⚡ Utilities

```html
<button class="h-control-md px-control-md">Button</button>
<input class="h-control-md px-control-md" />
<Icon class="icon-md" />
```

## 🟤 Z-Index Tokens — Nestro UI Kit

Токены слоёв управляют порядком наложения компонентов:
dropdown → tooltip → modal → toast → system overlays.

---

### 📚 Layers

| Token | Значение | Использование |
|-------|----------|---------------|
| `--z-base` | 0 | Базовый слой |
| `--z-raised` | 10 | Поднятые элементы |
| `--z-dropdown` | 100 | Select, Menu |
| `--z-sticky` | 200 | Sticky headers |
| `--z-header` | 300 | Fixed navbars |
| `--z-tooltip` | 1000 | Tooltip |
| `--z-popover` | 1100 | Popover, DatePicker |
| `--z-modal` | 1200 | Dialog, Drawer |
| `--z-toast` | 1300 | Notifications |
| `--z-overlay` | 1400 | Global overlays |
| `--z-max` | 9999 | Emergency override |

---

## ⚡ Utilities

```html
<div class="z-dropdown">...</div>
<div class="z-modal">...</div>
```
