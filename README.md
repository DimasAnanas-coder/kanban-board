# Kanban Board

Канбан-доска для управления задачами: колонки, карточки с drag & drop, изображения к задачам, светлая и тёмная темы, метрики для Prometheus.

## Стек

- **Frontend:** React 19, React Router 7, Vite 8, Tailwind CSS 3, dnd-kit, Axios
- **Backend:** Node.js 22, NestJS 11, TypeScript, class-validator
- **База данных:** PostgreSQL 16, Prisma 6
- **Мониторинг:** Prometheus, prom-client
- **Инфраструктура:** Docker, Docker Compose

## Архитектура

Проект разделён на слои. Backend построен по чистой архитектуре: `presentation` (контроллеры, DTO) → `application` (use cases, порты) ← `infrastructure` (Prisma, файловое хранилище). Frontend разделён на слои так: API-сервисы → хуки данных → хуки поведения → компоненты и страницы.

### Паттерны backend

- Clean Architecture / Ports & Adapters
- Dependency Injection
- Use Case
- Repository
- Unit of Work. Транзакции
- DTO + Mapper
- Exception Filter (единая обработка ошибок)
- Interceptor (метрики)

### Паттерны frontend

- Service Layer
- Custom Hooks
- Context Provider
- Optimistic UI с откатом
- Композиция компонентов

## Чему я научился

- Узнал TypeScript
- Узнал React, Tailwind и написал свой frontend с подключением своего API, хуками, версткой компонентов и страниц
- Укрепил знания Docker, REST API, Prisma, JS
- Построил backend по чистой слоистой архитектуре - упрощенный аналог DDD на Nest
- Использование метрик Prometheus для анализа работоспособности сайта

## Запуск

Всё окружение (PostgreSQL, backend, frontend, Prometheus) поднимается в Docker:

```bash
echo "VITE_API_URL=http://localhost:3010" > frontend/.env
npm run docker:up
npm run docker:migrate:deploy
```
Для локального теста:

- Frontend: http://localhost:5173
- Backend API: http://localhost:3010
- Prometheus: http://localhost:9090
