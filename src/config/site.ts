export type Locale = 'uk' | 'en';

export const siteConfig = {
  name: 'Kyrylo Poidiuk',
  monogram: 'KP',
  role: 'Full-stack JavaScript developer',
  email: 'kirilpojduk@gmail.com',
  location: 'Kyiv, Ukraine',
  baseUrl: 'https://example.com', // TODO: replace before launch
  availability: true,
  responseTime: '1–2 business days',
  socials: {
    github: 'https://github.com/Wertoquri',
  },
  resumeUrl: '/resume-placeholder.html', // TODO: replace with final one-page résumé
} as const;

export const navigation = [
  { key: 'work', href: '/#work' },
  { key: 'services', href: '/#services' },
  { key: 'about', href: '/about' },
  { key: 'contact', href: '/contact' },
] as const;

export const services = [
  { key: 'landing', number: '01' },
  { key: 'tools', number: '02' },
  { key: 'commerce', number: '03' },
  { key: 'fixes', number: '04' },
] as const;

export const processSteps = ['discovery', 'scope', 'prototype', 'implementation', 'verification', 'handoff'] as const;

export const seo = {
  defaultTitle: 'Kyrylo Poidiuk — Full-stack JavaScript developer',
  titleTemplate: '%s — Kyrylo Poidiuk',
  description: 'Polished web products, business tools, e-commerce demos, and reliable JavaScript delivery.',
  image: '/og-default.svg',
} as const;

export const validateSiteConfig = () => ({
  hasValidEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(siteConfig.email),
  hasAbsoluteBaseUrl: /^https:\/\//.test(siteConfig.baseUrl),
  projectSlugsUnique: new Set(projects.map((project) => project.slug)).size === projects.length,
});

export type Project = {
  slug: string;
  name: string;
  year: string;
  index: string;
  type: string;
  role: string;
  stack: string[];
  liveUrl: string | null;
  repoUrl: string | null;
  screenshots: readonly [string, string];
  status: 'confirmed' | 'demo';
  facts: {
    uk: { summary: string; challenge: string; solution: string; outcome: string; responsibilities: string[]; flows: string[]; decisions: string[]; verification: string[] };
    en: { summary: string; challenge: string; solution: string; outcome: string; responsibilities: string[]; flows: string[]; decisions: string[]; verification: string[] };
  };
};

export const projects: Project[] = [
  {
    slug: 'taskflow', name: 'TaskFlow', year: '2026', index: '01', type: 'Business operations',
    role: 'Full-stack development', stack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Redux'],
    liveUrl: 'https://taskflow-portfolio.onrender.com', repoUrl: 'https://github.com/Wertoquri/TaskFlow',
    screenshots: ['/projects/taskflow/login.png', '/projects/taskflow/dashboard.png'], status: 'confirmed',
    facts: {
      uk: {
        summary: 'Робочий простір для командних задач, відповідальності та операційної прозорості.',
        challenge: 'Звести щоденну роботу команди в один зрозумілий потік без перевантаженого інтерфейсу.',
        solution: 'Модульна дошка задач, ролі, фільтри та серверна модель даних із чіткими станами.',
        outcome: 'Підтверджено: робочий демонстраційний сценарій для створення, призначення та відстеження задач. Метрики не заявляються.',
        responsibilities: ['Продуктова структура', 'Frontend і керування станом', 'REST API та модель даних', 'Демо-сценарії'],
        flows: ['Створення робочого простору', 'Постановка та призначення задачі', 'Фільтрація і контроль статусу'],
        decisions: ['Стани задач обмежені явною моделлю', 'Критичні дії мають підтвердження', 'Демо-дані відокремлені від користувацьких'],
        verification: ['Живе full-stack демо працює на Render', 'PostgreSQL розгорнуто в Neon', 'Завантаження вкладень перевірено через Cloudinary'],
      },
      en: {
        summary: 'A workspace for team tasks, ownership, and operational visibility.',
        challenge: 'Unify daily team work in one legible flow without an overloaded interface.',
        solution: 'A modular task board, roles, filters, and a server data model with explicit states.',
        outcome: 'Confirmed: a working demo flow for creating, assigning, and tracking tasks. No performance metrics are claimed.',
        responsibilities: ['Product structure', 'Frontend and state management', 'REST API and data model', 'Demo flows'],
        flows: ['Create a workspace', 'Create and assign a task', 'Filter and review status'],
        decisions: ['Task states use an explicit model', 'Destructive actions require confirmation', 'Demo data stays separate from user data'],
        verification: ['Live full-stack demo is running on Render', 'PostgreSQL is deployed on Neon', 'Attachment uploads are verified through Cloudinary'],
      },
    },
  },
  {
    slug: 'archguard', name: 'ARCHGUARD', year: '2026', index: '02', type: 'Developer tooling',
    role: 'Product & engineering', stack: ['JavaScript', 'Node.js', 'Static analysis', 'Puppeteer'],
    liveUrl: 'https://archguard.vercel.app/', repoUrl: 'https://github.com/Wertoquri/ARCHGUARD',
    screenshots: ['/projects/archguard/overview.png', '/projects/archguard/policy-studio.png'], status: 'confirmed',
    facts: {
      uk: {
        summary: 'Інструмент аналізу кодової бази, що перетворює архітектурні сигнали на практичний звіт.',
        challenge: 'Показати складні технічні ризики так, щоб висновки можна було перевірити й використати.',
        solution: 'Пайплайн аналізу, пріоритизація знахідок і браузерний звіт із посиланням на докази.',
        outcome: 'Підтверджено: генерація звіту з аналізу локального проєкту. Повнота правил залежить від типу кодової бази.',
        responsibilities: ['Архітектура аналізатора', 'Модель правил', 'Інтерфейс звіту', 'Автоматизація перевірки'],
        flows: ['Вибір проєкту', 'Запуск аналізу', 'Перегляд доказів і рекомендацій'],
        decisions: ['Кожна знахідка містить джерело', 'Серйозність відділена від впевненості', 'Звіт залишається статичним і переносним'],
        verification: ['Живий інтерфейс перевірено у production', 'Публічний репозиторій доступний на GitHub', 'Огляд і Policy Studio зафіксовано скриншотами'],
      },
      en: {
        summary: 'A codebase analysis tool that turns architecture signals into an actionable report.',
        challenge: 'Present complex technical risks in a form that can be verified and acted on.',
        solution: 'An analysis pipeline, prioritised findings, and a browser report linked to evidence.',
        outcome: 'Confirmed: report generation from a local project. Rule coverage depends on the codebase type.',
        responsibilities: ['Analyzer architecture', 'Rule model', 'Report interface', 'Verification automation'],
        flows: ['Select a project', 'Run analysis', 'Review evidence and guidance'],
        decisions: ['Every finding points to its source', 'Severity is distinct from confidence', 'Reports stay static and portable'],
        verification: ['Live interface verified in production', 'Public repository is available on GitHub', 'Overview and Policy Studio captured in verified screenshots'],
      },
    },
  },
  {
    slug: 'webstore', name: 'WebStore', year: '2026', index: '03', type: 'E-commerce demo',
    role: 'Full-stack development', stack: ['React', 'Express', 'PostgreSQL', 'Styled Components'],
    liveUrl: 'https://webstore-portfolio.onrender.com/', repoUrl: 'https://github.com/Wertoquri/WEB-store',
    screenshots: ['/projects/web-store/home.png', '/projects/web-store/product.png'], status: 'demo',
    facts: {
      uk: {
        summary: 'Демонстраційний магазин із каталогом, кошиком та повним сценарієм оформлення.',
        challenge: 'Побудувати правдоподібний e-commerce досвід без видавання демо за реальний бізнес.',
        solution: 'Каталог із фільтрами, стабільний кошик і чітко позначене тестове оформлення замовлення.',
        outcome: 'Демо-контент: платіжна інтеграція та реальне виконання замовлень не підтверджені.',
        responsibilities: ['UX каталогу', 'Стан кошика', 'API товарів', 'Адаптивний інтерфейс'],
        flows: ['Пошук і фільтрація', 'Додавання до кошика', 'Демонстраційне оформлення'],
        decisions: ['Ціна зберігається як ціле число', 'Кошик переживає перезавантаження', 'Тестова оплата позначена явно'],
        verification: ['Frontend і backend доступні на Render', 'Каталог та сторінку товару перевірено у production', 'Публічний репозиторій доступний на GitHub'],
      },
      en: {
        summary: 'A demo storefront with catalog, cart, and a complete checkout path.',
        challenge: 'Build a credible commerce experience without presenting a demo as a real business.',
        solution: 'A filterable catalog, persistent cart, and clearly labelled test checkout.',
        outcome: 'Demo content: payment integration and real order fulfilment are not confirmed.',
        responsibilities: ['Catalog UX', 'Cart state', 'Product API', 'Responsive interface'],
        flows: ['Search and filter', 'Add to cart', 'Demo checkout'],
        decisions: ['Prices use integer minor units', 'Cart survives reloads', 'Test payment is labelled explicitly'],
        verification: ['Frontend and backend are available on Render', 'Catalog and product page verified in production', 'Public repository is available on GitHub'],
      },
    },
  },
  {
    slug: 'nordline-studio', name: 'Nordline Studio', year: '2026', index: '04', type: 'Creative studio landing',
    role: 'Design & frontend development', stack: ['React', 'Vite', 'Responsive UI', 'Motion'],
    liveUrl: 'https://nordline-studio-olive.vercel.app/', repoUrl: null,
    screenshots: ['/projects/nordline-studio/hero.png', '/projects/nordline-studio/projects.png'], status: 'demo',
    facts: {
      uk: {
        summary: 'Преміальний лендінг креативної студії з виразною типографікою, проєктною вітриною та адаптивною композицією.',
        challenge: 'Створити впізнавану студійну подачу без шаблонного SaaS-вигляду та зберегти швидку, зрозумілу навігацію.',
        solution: 'Редакційна сітка, контрастна арт-дирекція, контрольована анімація та окремі сценарії перегляду робіт.',
        outcome: 'Демонстраційний сайт розгорнуто на Vercel; головний екран і вітрину проєктів перевірено в production.',
        responsibilities: ['Арт-дирекція', 'Компонентна структура', 'Адаптивна верстка', 'Production deployment'],
        flows: ['Знайомство зі студією', 'Перегляд вибраних робіт', 'Перехід до контакту'],
        decisions: ['Типографіка формує головну ієрархію', 'Анімація не блокує навігацію', 'Контент позначено як портфоліо-демо'],
        verification: ['Живе демо доступне на Vercel', 'Hero перевірено у production', 'Секцію проєктів зафіксовано скриншотом'],
      },
      en: {
        summary: 'A premium creative-studio landing page with expressive typography, a project showcase, and responsive composition.',
        challenge: 'Create a recognisable studio presence without generic SaaS styling while keeping navigation fast and clear.',
        solution: 'An editorial grid, high-contrast art direction, restrained motion, and dedicated project-browsing flows.',
        outcome: 'The demo site is deployed on Vercel; its hero and project showcase were verified in production.',
        responsibilities: ['Art direction', 'Component architecture', 'Responsive implementation', 'Production deployment'],
        flows: ['Discover the studio', 'Browse selected work', 'Continue to contact'],
        decisions: ['Typography drives the hierarchy', 'Motion never blocks navigation', 'Content is labelled as a portfolio demo'],
        verification: ['Live demo is available on Vercel', 'Hero verified in production', 'Project section captured in a verified screenshot'],
      },
    },
  },
];
