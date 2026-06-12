/* ===================================================
   DESIGN: Русский академизм с цифровым акцентом
   Цвета: тёмно-синий #1a2744 + золотой #c9a84c + кремовый #f5f0e8
   Шрифты: Playfair Display (заголовки) + PT Sans (тело)
   =================================================== */

import { useState, useRef, useEffect } from "react";
import { BookOpen, Video, MessageCircle, ChevronDown, Send, X, Menu, GraduationCap, Music, FileText, Star } from "lucide-react";

// ─── Данные курса ─────────────────────────────────────────────────────────────

const LESSONS = [
  {
    id: 1,
    number: "01",
    title: "А.С. Пушкин — поэт и прозаик",
    type: "Лекция",
    duration: "90 мин",
    description: "Биография Пушкина через призму мультисенсорного восприятия. Экранизации, романсы, визуальные образы. Связь музыкального образа и художественного текста.",
    outcomes: ["Называть форматы мультисенсорного освоения текста", "Объяснять связь музыкального образа и текста"],
    control: "Устный ответ: «Что удивило в поведении героев экранизации?»",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663755679029/HjeRxdZiGe7v83h2ieYN6A/pushkin-lecture-4Apxms5DeJ39uhHBsaeDzP.webp",
    videoUrl: "https://rutube.ru/video/private/a617f527e4e6086d1b9a8d9feb7ec7ce/?r=wd&p=Y4GVwT_b7RCosvAYnNizxw",
    embedId: "a617f527e4e6086d1b9a8d9feb7ec7ce",
    embedToken: "Y4GVwT_b7RCosvAYnNizxw",
    color: "from-amber-900/80 to-amber-800/60",
  },
  {
    id: 2,
    number: "02",
    title: "Лирика Пушкина через романс",
    type: "Семинар",
    duration: "90 мин",
    description: "Сопоставление поэтического текста и музыкальной интерпретации Свиридова. Построение ментальных карт в Miro: образ → мотив → биографический контекст.",
    outcomes: ["Использовать Miro для картирования лирического образа", "Сопоставлять текст и музыкальную интерпретацию"],
    control: "Ментальная карта в Miro: образ → мотив → биографический контекст",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663755679029/HjeRxdZiGe7v83h2ieYN6A/pushkin-seminar-VLyxttstcJfDjhtvqjsbc2.webp",
    videoUrl: "https://rutube.ru/video/private/783670adbd5cec52066fcc85d141e8a6/?r=wd&p=f-tclDwq7ZRMSLKEUbnTxw",
    embedId: "783670adbd5cec52066fcc85d141e8a6",
    embedToken: "f-tclDwq7ZRMSLKEUbnTxw",
    color: "from-blue-900/80 to-blue-800/60",
  },
  {
    id: 3,
    number: "03",
    title: "«Метель» — музыка и текст",
    type: "Практика",
    duration: "90 мин",
    description: "Создание Padlet-музея персонажей повести «Метель». Командная работа: карточки с цитатами, иллюстрациями и аудио-комментариями. Квест «Пушкинский код» в Kahoot.",
    outcomes: ["Оценивать приёмы работы с классическим текстом", "Создавать Padlet-музей персонажей"],
    control: "Padlet-музей персонажей + квест «Пушкинский код» (Kahoot)",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663755679029/HjeRxdZiGe7v83h2ieYN6A/pushkin-practice-GEqxSvqXg2GhJVyG3FRYhU.webp",
    videoUrl: "https://rutube.ru/video/private/0dd70e6c5c5bce21ed91e0734bf854ec/?r=wd&p=-Tg-w2C3CROrMweQig47hA",
    embedId: "0dd70e6c5c5bce21ed91e0734bf854ec",
    embedToken: "-Tg-w2C3CROrMweQig47hA",
    color: "from-indigo-900/80 to-indigo-800/60",
  },
];

const EXTRA_VIDEOS = [
  {
    id: 4,
    title: "Дополнительная лекция: Пушкин и музыка",
    videoUrl: "https://rutube.ru/video/private/f18bfc81e79216b1c56a711af5e0c126/?r=wd&p=c65_xw-l2T2UC_Pj3hhTwA",
    embedId: "f18bfc81e79216b1c56a711af5e0c126",
    embedToken: "c65_xw-l2T2UC_Pj3hhTwA",
  },
  {
    id: 5,
    title: "Дополнительная лекция: Цифровые инструменты",
    videoUrl: "https://rutube.ru/video/private/2ada68067ae8e5f5c61fc7ff67771206/?r=wd&p=8xRb3s4V4aza7hC5XwonNw",
    embedId: "2ada68067ae8e5f5c61fc7ff67771206",
    embedToken: "8xRb3s4V4aza7hC5XwonNw",
  },
];

const OUTCOMES = [
  { level: "Запоминать", icon: "📖", text: "Называть форматы мультисенсорного освоения классического текста: романс, экранизация, визуальное картирование образа." },
  { level: "Понимать", icon: "🎵", text: "Раскрывать характер взаимодействия музыки Свиридова и поэтического текста Пушкина." },
  { level: "Применять", icon: "🖥️", text: "Использовать цифровые инструменты (Genially, Miro, Padlet) для аналитической работы с текстами." },
  { level: "Анализировать", icon: "🔍", text: "Сопоставлять художественный текст с музыкальной интерпретацией; выявлять смысловые параллели." },
  { level: "Оценивать", icon: "⚖️", text: "Обосновывать выбор методических приёмов работы с классическим текстом с учётом потребностей студентов с ОВЗ." },
  { level: "Создавать", icon: "🎨", text: "Проектировать цифровой образовательный продукт — Padlet-музей персонажей или ментальную карту текста." },
];

// ─── ИИ-ассистент (на основе VITE_FRONTEND_FORGE_API_KEY) ────────────────────

const SYSTEM_PROMPT = `Ты — учебный ассистент курса «Пушкин в интерактивных форматах», разработанного преподавателем Гусевым Никитой Владимировичем. 

Курс посвящён изучению творчества А.С. Пушкина через мультисенсорные и интерактивные форматы: музыку Свиридова, романсы и экранизации. Курс рассчитан на студентов вузов, в том числе с ООП и ОВЗ (ДЦП, СДВГ).

Структура курса:
1. Лекция: А.С. Пушкин — поэт и прозаик (биография, мультисенсорные форматы)
2. Семинар: Лирика Пушкина через романс (Свиридов, ментальные карты в Miro)
3. Практика: «Метель» — музыка и текст (Padlet-музей, квест «Пушкинский код»)

Инструменты курса: Genially, Miro, Padlet, Kahoot, Wordwall.

Ты помогаешь студентам:
- Разобраться в биографии и творчестве Пушкина
- Понять связь поэзии Пушкина и музыки Свиридова
- Освоить цифровые инструменты для работы с текстом
- Подготовиться к заданиям и проектам курса
- Ответить на вопросы о произведениях «Метель», лирике Пушкина

Отвечай тепло, академично, но доступно. Поддерживай студентов с трудностями. Отвечай на русском языке.`;

interface Message {
  role: "user" | "assistant";
  content: string;
}

// ─── Компоненты ───────────────────────────────────────────────────────────────

function NavBar({ activeSection, onNav }: { activeSection: string; onNav: (s: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { id: "about", label: "О курсе" },
    { id: "lessons", label: "Занятия" },
    { id: "videos", label: "Видеолекции" },
    { id: "outcomes", label: "Результаты" },
    { id: "assistant", label: "ИИ-ассистент" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a2744]/95 backdrop-blur-sm border-b border-[#c9a84c]/20">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#e2c46a] flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-[#1a2744]" />
          </div>
          <span className="font-display font-semibold text-white text-sm leading-tight hidden sm:block">
            Пушкин<br />
            <span className="text-[#c9a84c] font-normal text-xs">в интерактивных форматах</span>
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNav(item.id)}
              className={`px-3 py-1.5 rounded text-sm transition-all duration-150 font-body ${
                activeSection === item.id
                  ? "text-[#c9a84c] bg-[#c9a84c]/10"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile menu */}
        <button
          className="md:hidden text-white/80 hover:text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#1a2744] border-t border-[#c9a84c]/20 px-4 py-3 flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { onNav(item.id); setMenuOpen(false); }}
              className="text-left px-3 py-2 rounded text-sm text-white/80 hover:text-[#c9a84c] hover:bg-white/5 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function HeroSection({ onNav }: { onNav: (s: string) => void }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, #0d1829 0%, #1a2744 50%, #243358 100%)`,
      }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663755679029/HjeRxdZiGe7v83h2ieYN6A/pushkin-hero-oR2hw98ckqFwEkTjDvHBxR.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d1829]/90 via-[#1a2744]/60 to-transparent" />

      <div className="container relative z-10 py-32">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c9a84c]/40 bg-[#c9a84c]/10 mb-8 animate-fade-in-up">
            <GraduationCap className="w-4 h-4 text-[#c9a84c]" />
            <span className="text-[#c9a84c] text-sm font-body">Учебный курс · 3 занятия</span>
          </div>

          {/* Title */}
          <h1
            className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in-up"
            style={{ animationDelay: "80ms" }}
          >
            Пушкин
            <br />
            <span className="text-[#c9a84c] italic">в интерактивных</span>
            <br />
            форматах
          </h1>

          {/* Quote */}
          <blockquote
            className="border-l-2 border-[#c9a84c]/60 pl-5 mb-8 animate-fade-in-up"
            style={{ animationDelay: "160ms" }}
          >
            <p className="text-white/80 font-display italic text-lg leading-relaxed">
              «Я помню чудное мгновенье: передо мной явилась ты...»
            </p>
            <footer className="text-[#c9a84c]/70 text-sm mt-2 font-body">— А.С. Пушкин</footer>
          </blockquote>

          {/* Description */}
          <p
            className="text-white/70 text-lg font-body leading-relaxed mb-10 animate-fade-in-up"
            style={{ animationDelay: "240ms" }}
          >
            Курс посвящён изучению творчества Пушкина через мультисенсорные и интерактивные форматы.
            Музыка Свиридова, романсы, экранизации и цифровые инструменты — для всех студентов,
            включая студентов с ОВЗ.
          </p>

          {/* CTA buttons */}
          <div
            className="flex flex-wrap gap-4 animate-fade-in-up"
            style={{ animationDelay: "320ms" }}
          >
            <button
              onClick={() => onNav("lessons")}
              className="btn-gold px-8 py-3 rounded-lg text-sm font-bold tracking-wide"
            >
              Начать обучение
            </button>
            <button
              onClick={() => onNav("assistant")}
              className="px-8 py-3 rounded-lg border border-white/30 text-white/90 text-sm font-body hover:bg-white/10 transition-all duration-150"
            >
              <MessageCircle className="w-4 h-4 inline mr-2" />
              Спросить ИИ-ассистента
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
        <ChevronDown className="w-6 h-6" />
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[#f5f0e8]">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <p className="text-[#c9a84c] text-sm font-body tracking-widest uppercase mb-3">О курсе</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1a2744] mb-6">
              Описание дисциплины
            </h2>
            <div className="gold-divider max-w-xs mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="font-display text-2xl font-semibold text-[#1a2744] mb-4">
                Пушкин в интерактивных форматах
              </h3>
              <p className="text-[#3d3628] font-body leading-relaxed mb-6">
                Курс посвящён изучению творчества А.С. Пушкина через мультисенсорные и интерактивные форматы.
                Студенты входят в художественный мир классики через музыку Свиридова, романсы и экранизации.
              </p>
              <p className="text-[#3d3628] font-body leading-relaxed mb-6">
                Курс разработан с учётом потребностей студентов с ООП и ОВЗ — прежде всего с ДЦП
                и нарушениями концентрации внимания.
              </p>
              <div className="bg-white rounded-xl p-6 border border-[#c9a84c]/20 shadow-sm">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#1a2744]/10 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-4 h-4 text-[#1a2744]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#3d3628]/60 font-body">Объём курса</p>
                      <p className="text-sm font-semibold text-[#1a2744] font-body">3 занятия × 90 мин + итоговый проект</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#1a2744]/10 flex items-center justify-center flex-shrink-0">
                      <Video className="w-4 h-4 text-[#1a2744]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#3d3628]/60 font-body">Формат</p>
                      <p className="text-sm font-semibold text-[#1a2744] font-body">Очные занятия + цифровые инструменты</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#1a2744]/10 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-4 h-4 text-[#1a2744]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#3d3628]/60 font-body">Аудитория</p>
                      <p className="text-sm font-semibold text-[#1a2744] font-body">Студенты вузов, в т.ч. с ООП и ОВЗ</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-display text-xl font-semibold text-[#1a2744] mb-4">
                Инструменты курса
              </h3>
              <div className="space-y-3">
                {[
                  { name: "Genially", desc: "Интерактивные презентации и инфографика", color: "bg-purple-50 border-purple-200" },
                  { name: "Miro", desc: "Ментальные карты и визуальное картирование", color: "bg-yellow-50 border-yellow-200" },
                  { name: "Padlet", desc: "Командные доски и музей персонажей", color: "bg-green-50 border-green-200" },
                  { name: "Kahoot", desc: "Квест «Пушкинский код» — игровой контроль", color: "bg-blue-50 border-blue-200" },
                  { name: "Wordwall", desc: "Интерактивные упражнения и задания", color: "bg-red-50 border-red-200" },
                ].map((tool) => (
                  <div key={tool.name} className={`flex items-start gap-3 p-3 rounded-lg border ${tool.color}`}>
                    <div className="w-2 h-2 rounded-full bg-[#c9a84c] mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-[#1a2744] text-sm font-body">{tool.name}</p>
                      <p className="text-xs text-[#3d3628]/70 font-body">{tool.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LessonsSection() {
  const [activeLesson, setActiveLesson] = useState<number | null>(null);

  return (
    <section id="lessons" className="py-24 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-[#c9a84c] text-sm font-body tracking-widest uppercase mb-3">Программа</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1a2744] mb-6">
            Занятия курса
          </h2>
          <div className="gold-divider max-w-xs mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {LESSONS.map((lesson, idx) => (
            <div
              key={lesson.id}
              className="lesson-card rounded-2xl overflow-hidden shadow-md border border-[#ede5d8] cursor-pointer"
              onClick={() => setActiveLesson(activeLesson === lesson.id ? null : lesson.id)}
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              {/* Card image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={lesson.image}
                  alt={lesson.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${lesson.color}`} />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#c9a84c]/90 text-[#1a2744] text-xs font-bold font-body">
                    {lesson.type}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="font-display text-5xl font-bold text-white/20">{lesson.number}</span>
                </div>
              </div>

              {/* Card content */}
              <div className="p-6 bg-white">
                <h3 className="font-display text-xl font-semibold text-[#1a2744] mb-2 leading-tight">
                  {lesson.title}
                </h3>
                <p className="text-[#3d3628]/70 text-sm font-body leading-relaxed mb-4">
                  {lesson.description}
                </p>

                {/* Expanded content */}
                {activeLesson === lesson.id && (
                  <div className="mt-4 space-y-4 border-t border-[#ede5d8] pt-4">
                    <div>
                      <p className="text-xs font-bold text-[#c9a84c] uppercase tracking-wide font-body mb-2">
                        Образовательные результаты
                      </p>
                      <ul className="space-y-1">
                        {lesson.outcomes.map((o, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-[#3d3628] font-body">
                            <span className="text-[#c9a84c] mt-0.5">✦</span>
                            {o}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-[#f5f0e8] rounded-lg p-3">
                      <p className="text-xs font-bold text-[#1a2744] uppercase tracking-wide font-body mb-1">
                        Контроль
                      </p>
                      <p className="text-sm text-[#3d3628] font-body">{lesson.control}</p>
                    </div>
                    <a
                      href={lesson.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-[#1a2744] font-semibold font-body hover:text-[#c9a84c] transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Video className="w-4 h-4" />
                      Смотреть видеолекцию →
                    </a>
                  </div>
                )}

                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-[#3d3628]/50 font-body">{lesson.duration}</span>
                  <span className="text-xs text-[#c9a84c] font-body">
                    {activeLesson === lesson.id ? "Свернуть ↑" : "Подробнее ↓"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Assessment section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-[#1a2744] rounded-2xl p-8 text-white">
            <h3 className="font-display text-2xl font-semibold mb-6 text-[#c9a84c]">
              Итоговый проект
            </h3>
            <p className="font-body text-white/80 mb-6">
              Студенты самостоятельно создают собственную интерпретацию произведения Пушкина
              в удобном формате на выбор:
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: "✍️", title: "Эссе", desc: "Анализ текста и музыки с аргументацией" },
                { icon: "🖼️", title: "Padlet-проект", desc: "Цифровой музей с обоснованием выбора" },
                { icon: "🎤", title: "Устная защита", desc: "Презентация в паре с партнёром" },
              ].map((opt) => (
                <div key={opt.title} className="bg-white/10 rounded-xl p-4 border border-white/10">
                  <div className="text-2xl mb-2">{opt.icon}</div>
                  <p className="font-display font-semibold text-white mb-1">{opt.title}</p>
                  <p className="text-sm text-white/60 font-body">{opt.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VideosSection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const allVideos = [
    ...LESSONS.map((l) => ({ id: String(l.id), title: `Занятие ${l.number}: ${l.title}`, embedId: l.embedId, embedToken: l.embedToken, type: l.type })),
    ...EXTRA_VIDEOS.map((v) => ({ id: String(v.id), title: v.title, embedId: v.embedId, embedToken: v.embedToken, type: "Доп. материал" })),
  ];

  return (
    <section id="videos" className="py-24 bg-[#f5f0e8]">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-[#c9a84c] text-sm font-body tracking-widest uppercase mb-3">Видеоматериалы</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1a2744] mb-6">
            Видеолекции
          </h2>
          <div className="gold-divider max-w-xs mx-auto" />
          <p className="text-[#3d3628]/70 font-body mt-6 max-w-xl mx-auto">
            Все видеолекции курса размещены на платформе Rutube. Нажмите на карточку, чтобы посмотреть.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {allVideos.map((video) => (
            <div key={video.id}>
              <button
                className="w-full text-left bg-white rounded-xl overflow-hidden shadow-sm border border-[#ede5d8] lesson-card"
                onClick={() => setActiveVideo(activeVideo === video.id ? null : video.id)}
              >
                <div className="relative bg-[#1a2744] aspect-video flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#c9a84c]/20 border-2 border-[#c9a84c] flex items-center justify-center">
                    <Video className="w-6 h-6 text-[#c9a84c]" />
                  </div>
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-[#c9a84c]/90 text-[#1a2744] text-xs font-bold font-body">
                    {video.type}
                  </span>
                </div>
                <div className="p-4">
                  <p className="font-display font-semibold text-[#1a2744] text-sm leading-snug">
                    {video.title}
                  </p>
                  <p className="text-xs text-[#c9a84c] mt-2 font-body">
                    {activeVideo === video.id ? "Скрыть ↑" : "Смотреть ↓"}
                  </p>
                </div>
              </button>

              {activeVideo === video.id && (
                <div className="mt-2 rounded-xl overflow-hidden shadow-lg border border-[#ede5d8]">
                  <div className="aspect-video">
                    <iframe
                      src={`https://rutube.ru/play/embed/${video.embedId}/?p=${video.embedToken}`}
                      className="w-full h-full"
                      allow="clipboard-write; autoplay"
                      allowFullScreen
                      title={video.title}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OutcomesSection() {
  return (
    <section id="outcomes" className="py-24 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-[#c9a84c] text-sm font-body tracking-widest uppercase mb-3">Таксономия Блума</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1a2744] mb-6">
            Образовательные результаты
          </h2>
          <div className="gold-divider max-w-xs mx-auto" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {OUTCOMES.map((outcome, idx) => (
            <div
              key={outcome.level}
              className="bg-[#f5f0e8] rounded-xl p-6 border border-[#ede5d8] lesson-card"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{outcome.icon}</span>
                <div>
                  <p className="text-xs text-[#c9a84c] font-bold uppercase tracking-wide font-body">
                    Уровень {idx + 1}
                  </p>
                  <p className="font-display font-semibold text-[#1a2744]">{outcome.level}</p>
                </div>
              </div>
              <p className="text-sm text-[#3d3628] font-body leading-relaxed">{outcome.text}</p>
            </div>
          ))}
        </div>

        {/* Rubric preview */}
        <div className="mt-16 max-w-4xl mx-auto bg-[#f5f0e8] rounded-2xl p-8 border border-[#ede5d8]">
          <h3 className="font-display text-2xl font-semibold text-[#1a2744] mb-6">
            Критерии оценивания (формирующий контроль)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="border-b border-[#c9a84c]/30">
                  <th className="text-left py-3 pr-4 text-[#1a2744] font-semibold">Критерий</th>
                  <th className="text-center py-3 px-3 text-[#1a2744] font-semibold">2 балла</th>
                  <th className="text-center py-3 px-3 text-[#1a2744] font-semibold">1 балл</th>
                  <th className="text-center py-3 px-3 text-[#1a2744] font-semibold">0 баллов</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ede5d8]">
                {[
                  ["Полнота карты", "Все 5 элементов", "3–4 элемента", "Менее 3"],
                  ["Точность цитат", "Точно соответствуют", "1 частично", "Не соответствуют"],
                  ["Использование Miro", "Структурирована, читаема", "Связи не обозначены", "Карты нет"],
                  ["Сопоставление с музыкой", "Объясняет связь", "Упоминает без аргумента", "Связь не установлена"],
                ].map(([crit, two, one, zero]) => (
                  <tr key={crit}>
                    <td className="py-3 pr-4 text-[#1a2744] font-medium">{crit}</td>
                    <td className="py-3 px-3 text-center text-green-700 bg-green-50 rounded">{two}</td>
                    <td className="py-3 px-3 text-center text-yellow-700 bg-yellow-50 rounded">{one}</td>
                    <td className="py-3 px-3 text-center text-red-700 bg-red-50 rounded">{zero}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Здравствуйте! Я учебный ассистент курса «Пушкин в интерактивных форматах». Могу помочь разобраться в биографии и творчестве Пушкина, объяснить связь его поэзии с музыкой Свиридова, рассказать о цифровых инструментах курса или ответить на вопросы по произведениям. О чём вы хотите узнать?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_FRONTEND_FORGE_API_KEY;
      const apiUrl = import.meta.env.VITE_FRONTEND_FORGE_API_URL;

      const response = await fetch(`${apiUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gemini-2.0-flash",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
            userMsg,
          ],
          max_tokens: 800,
        }),
      });

      if (!response.ok) throw new Error("API error");

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content ?? "Извините, не удалось получить ответ.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Извините, произошла ошибка при обращении к ИИ. Попробуйте ещё раз или обратитесь к преподавателю.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const QUICK_QUESTIONS = [
    "Кто такой Свиридов и как он связан с Пушкиным?",
    "Что такое ментальная карта в Miro?",
    "Как создать Padlet-музей персонажей?",
    "Расскажи о повести «Метель»",
  ];

  return (
    <section id="assistant" className="py-24 bg-[#1a2744]">
      <div className="container">
        <div className="text-center mb-12">
          
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            ИИ-ассистент курса
          </h2>
          <p className="text-white/60 font-body max-w-lg mx-auto">
            Задайте вопрос по курсу — ассистент поможет разобраться в материале, ответит на вопросы
            о Пушкине, Свиридове и цифровых инструментах.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Chat window */}
          <div className="bg-[#243358] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#e2c46a] flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-[#1a2744]" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm font-body">Учебный ассистент</p>
                <p className="text-white/40 text-xs font-body">Курс «Пушкин в интерактивных форматах»</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-xs font-body">Онлайн</span>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-5 space-y-4 scrollbar-thin">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 text-sm font-body leading-relaxed ${
                      msg.role === "user" ? "chat-bubble-user" : "chat-bubble-ai"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="chat-bubble-ai px-4 py-3 text-sm font-body text-[#3d3628]/60">
                    <span className="inline-flex gap-1">
                      <span className="animate-bounce" style={{ animationDelay: "0ms" }}>•</span>
                      <span className="animate-bounce" style={{ animationDelay: "150ms" }}>•</span>
                      <span className="animate-bounce" style={{ animationDelay: "300ms" }}>•</span>
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick questions */}
            <div className="px-5 pb-3 flex flex-wrap gap-2">
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => { setInput(q); }}
                  className="text-xs px-3 py-1.5 rounded-full border border-[#c9a84c]/30 text-[#c9a84c]/80 hover:bg-[#c9a84c]/10 transition-colors font-body"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="px-4 pb-4">
              <div className="flex gap-2 bg-[#1a2744] rounded-xl border border-white/10 p-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Задайте вопрос по курсу..."
                  className="flex-1 bg-transparent text-white placeholder-white/30 text-sm font-body resize-none outline-none min-h-[40px] max-h-[120px] py-1 px-2"
                  rows={1}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className="w-9 h-9 rounded-lg bg-[#c9a84c] flex items-center justify-center flex-shrink-0 disabled:opacity-40 hover:bg-[#e2c46a] transition-colors self-end"
                >
                  <Send className="w-4 h-4 text-[#1a2744]" />
                </button>
              </div>
              <p className="text-white/20 text-xs font-body mt-2 text-center">
                ИИ-ассистент · Ответы носят учебный характер
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0d1829] py-10 border-t border-white/5">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#e2c46a] flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-[#1a2744]" />
            </div>
            <div>
              <p className="text-white font-display font-semibold text-sm">Пушкин в интерактивных форматах</p>
              <p className="text-white/40 text-xs font-body">Автор: Гусев Никита Владимирович</p>
            </div>
          </div>
          
          <div className="text-white/30 text-xs font-body text-right">
            <p>3 занятия · 90 мин каждое</p>
            <p>Для студентов с ОВЗ и ООП</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Главная страница ─────────────────────────────────────────────────────────

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 64;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setActiveSection(id);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "lessons", "videos", "outcomes", "assistant"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom > 80) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <NavBar activeSection={activeSection} onNav={scrollTo} />
      <HeroSection onNav={scrollTo} />
      <AboutSection />
      <LessonsSection />
      <VideosSection />
      <OutcomesSection />
      <AIAssistant />
      <Footer />
    </div>
  );
}
