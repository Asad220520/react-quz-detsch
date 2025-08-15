# Deutsch Cards — React + Tailwind (RU UI)

Модульная версия вашего приложения: каждая часть вынесена в отдельный компонент/вью.
Стек: Vite, React 18, TailwindCSS, lucide-react.

## Структура
- `src/components` — общие компоненты (Topbar, Drawer, DeckBar, UI-примитивы)
- `src/views` — экраны:
  - `DecksView.jsx` — Наборы
  - `CardsView.jsx` — Карточки (flip)
  - `LearnView.jsx` — Учить (варианты)
  - `WriteView.jsx` — Письмо (экранная DE-клавиатура + Alt-шорткаты)
  - `MatchView.jsx` — Матч (таймер)
  - `TestView.jsx` — Тест (MCQ/TF/Write)
  - `ImportExportView.jsx` — Импорт / Экспорт
  - `SettingsView.jsx` — Настройки
- `src/lib` — утилиты, хранение в localStorage, озвучка
- `src/index.css` — Tailwind + минимальные глобальные стили (flip-карта и т.п.)

## Запуск
```bash
npm i
npm run dev
```

> Примечание: конфиг Vite минимальный (без plugin-react), современные Vite версии умеют JSX/React без доп. плагинов.
# react-quz-detsch
