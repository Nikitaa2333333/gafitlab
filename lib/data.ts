import { Category, Subcategory, Product } from '../types';

export const CATEGORIES: Category[] = [
  { id: 'general-lab', name: 'Общелабораторное оборудование', span: '1x1' },
  { id: 'consumables', name: 'Расходные материалы', span: '1x1' },
  { id: 'analytical', name: 'Аналитическое оборудование', span: '1x1' },
  { id: 'thermo', name: 'Термостатирующее оборудование', span: '1x1' },
  { id: 'measuring', name: 'Измерительные приборы', span: '1x1' },
  { id: 'centrifuge', name: 'Центрифугирование', span: '1x1' },
  { id: 'distillation', name: 'Оборудование для перегонки', span: '1x1' },
  { id: 'pharmaceutical', name: 'Фармацевтическое оборудование', span: '1x1' },
  { id: 'microscopes', name: 'Микроскопы и оптика', span: '1x1' },
  { id: 'laminar', name: 'Ламинарные боксы', span: '1x1' },
  { id: 'cleaning', name: 'Чистка и стерилизация', span: '1x1' },
  { id: 'furniture', name: 'Мебель', span: '1x1' },
];

export const SUBCATEGORIES: Subcategory[] = [
  // general-lab
  { id: 'magnetic-stirrers', categoryId: 'general-lab', name: 'Магнитные мешалки' },
  { id: 'overhead-stirrers', categoryId: 'general-lab', name: 'Верхнеприводные мешалки' },
  { id: 'lab-baths', categoryId: 'general-lab', name: 'Лабораторные бани' },
  { id: 'vacuum-pumps', categoryId: 'general-lab', name: 'Вакуумные насосы' },

  // consumables
  { id: 'tips', categoryId: 'consumables', name: 'Наконечники для дозаторов' },
  { id: 'tubes', categoryId: 'consumables', name: 'Пробирки и микропробирки' },
  { id: 'gloves', categoryId: 'consumables', name: 'Перчатки' },

  // analytical
  { id: 'spectrophotometers', categoryId: 'analytical', name: 'Спектрофотометры' },
  { id: 'ph-meters', categoryId: 'analytical', name: 'pH-метры и иономеры' },
  { id: 'chromatography', categoryId: 'analytical', name: 'Хроматографы' },

  // thermo
  { id: 'incubators', categoryId: 'thermo', name: 'Термостаты и инкубаторы' },
  { id: 'ovens', categoryId: 'thermo', name: 'Сушильные шкафы' },

  // measuring
  { id: 'scales', categoryId: 'measuring', name: 'Весы' },
  { id: 'pipettes', categoryId: 'measuring', name: 'Дозаторы' },

  // centrifuge
  { id: 'micro-centrifuge', categoryId: 'centrifuge', name: 'Микроцентрифуги' },
  { id: 'lab-centrifuge', categoryId: 'centrifuge', name: 'Лабораторные центрифуги' },

  // distillation
  { id: 'rotary-evaporators', categoryId: 'distillation', name: 'Ротационные испарители' },
  { id: 'distillers', categoryId: 'distillation', name: 'Дистилляторы воды' },

  // pharmaceutical
  { id: 'tablet-press', categoryId: 'pharmaceutical', name: 'Таблеточные прессы' },
  { id: 'capsule-fillers', categoryId: 'pharmaceutical', name: 'Капсулонаполнители' },

  // microscopes
  { id: 'optical-microscopes', categoryId: 'microscopes', name: 'Оптические микроскопы' },
  { id: 'digital-microscopes', categoryId: 'microscopes', name: 'Цифровые микроскопы' },

  // laminar
  { id: 'laminar-vertical', categoryId: 'laminar', name: 'Вертикальные ламинарные боксы' },
  { id: 'laminar-horizontal', categoryId: 'laminar', name: 'Горизонтальные ламинарные боксы' },

  // cleaning
  { id: 'autoclaves', categoryId: 'cleaning', name: 'Автоклавы' },
  { id: 'ultrasonic', categoryId: 'cleaning', name: 'Ультразвуковые мойки' },

  // furniture
  { id: 'lab-tables', categoryId: 'furniture', name: 'Лабораторные столы' },
  { id: 'storage', categoryId: 'furniture', name: 'Шкафы и стеллажи' },
];

export const PRODUCTS: Product[] = [
  // GENERAL LAB - Магнитные мешалки
  {
    id: 'mag-st-pro-x1',
    subcategoryId: 'magnetic-stirrers',
    name: 'Магнитная мешалка PRO X1',
    specs: ['Скорость: 100-1500 об/мин', 'Макс. объем: 20 л', 'Материал платформы: Керамика'],
    description: 'Профессиональная магнитная мешалка с подогревом до 350°C. Идеально подходит для длительных процессов синтеза.',
    inStock: true,
  },
  {
    id: 'mag-st-lite',
    subcategoryId: 'magnetic-stirrers',
    name: 'Магнитная мешалка Lite S',
    specs: ['Скорость: 50-1000 об/мин', 'Макс. объем: 2 л', 'Питание: USB-C'],
    description: 'Компактная мешалка для рутинных задач. Портативная и легкая.',
    inStock: true,
  },
  {
    id: 'mag-st-multi',
    subcategoryId: 'magnetic-stirrers',
    name: 'Многопозиционная мешалка Multi-5',
    specs: ['Позиций: 5', 'Скорость: 80-1200 об/мин', 'Независимое управление'],
    description: 'Одновременное перемешивание 5 образцов с индивидуальным контролем скорости.',
    inStock: true,
  },

  // Верхнеприводные мешалки
  {
    id: 'over-st-heavy',
    subcategoryId: 'overhead-stirrers',
    name: 'Верхнеприводная мешалка Heavy Duty',
    specs: ['Вязкость: до 50,000 мПа·с', 'Крутящий момент: 60 Н·см', 'Дисплей: OLED'],
    description: 'Мощная система для перемешивания высоковязких сред с цифровым контролем.',
    inStock: false,
  },
  {
    id: 'over-st-digital',
    subcategoryId: 'overhead-stirrers',
    name: 'Цифровая мешалка DigiStir D300',
    specs: ['Скорость: 20-2000 об/мин', 'Дисплей: LCD', 'Память: 10 программ'],
    description: 'Программируемая верхнеприводная мешалка с сохранением режимов работы.',
    inStock: true,
  },

  // Лабораторные бани
  {
    id: 'water-bath-wb20',
    subcategoryId: 'lab-baths',
    name: 'Водяная баня WB-20',
    specs: ['Объем: 20 л', 'Температура: 5-100°C', 'Точность: ±0.5°C'],
    description: 'Водяная баня с цифровым термостатом для точного контроля температуры.',
    inStock: true,
  },
  {
    id: 'oil-bath-ob10',
    subcategoryId: 'lab-baths',
    name: 'Масляная баня OB-10 Pro',
    specs: ['Объем: 10 л', 'Температура: до 300°C', 'Материал: Нержавеющая сталь'],
    description: 'Масляная баня для высокотемпературных процессов.',
    inStock: true,
  },

  // Вакуумные насосы
  {
    id: 'vacuum-pump-vp2',
    subcategoryId: 'vacuum-pumps',
    name: 'Вакуумный насос VP-2E',
    specs: ['Производительность: 2 л/мин', 'Вакуум: до 0.5 мбар', 'Безмасляный'],
    description: 'Компактный безмасляный вакуумный насос для фильтрации и дегазации.',
    inStock: true,
  },

  // CONSUMABLES - Наконечники
  {
    id: 'tips-10ul',
    subcategoryId: 'tips',
    name: 'Наконечники 10 мкл',
    specs: ['Объем: 10 мкл', 'Упаковка: 1000 шт', 'Стерильные'],
    description: 'Универсальные наконечники для микропипеток, стерильные.',
    inStock: true,
  },
  {
    id: 'tips-200ul',
    subcategoryId: 'tips',
    name: 'Наконечники 200 мкл желтые',
    specs: ['Объем: 200 мкл', 'Упаковка: 1000 шт', 'Цвет: желтый'],
    description: 'Желтые наконечники для дозаторов, стандарт ISO.',
    inStock: true,
  },

  // Пробирки
  {
    id: 'tubes-15ml',
    subcategoryId: 'tubes',
    name: 'Центрифужные пробирки 15 мл',
    specs: ['Объем: 15 мл', 'Материал: Полипропилен', 'Упаковка: 500 шт'],
    description: 'Конические центрифужные пробирки с винтовой крышкой.',
    inStock: true,
  },
  {
    id: 'tubes-micro',
    subcategoryId: 'tubes',
    name: 'Микропробирки 1.5 мл',
    specs: ['Объем: 1.5 мл', 'Упаковка: 1000 шт', 'Автоклавируемые'],
    description: 'Микроцентрифужные пробирки типа Эппендорф.',
    inStock: true,
  },

  // Перчатки
  {
    id: 'gloves-nitrile',
    subcategoryId: 'gloves',
    name: 'Перчатки нитриловые',
    specs: ['Размер: M', 'Упаковка: 100 шт', 'Без пудры'],
    description: 'Одноразовые нитриловые перчатки для лабораторных работ.',
    inStock: true,
  },

  // ANALYTICAL - Спектрофотометры
  {
    id: 'spec-uv-200',
    subcategoryId: 'spectrophotometers',
    name: 'Спектрофотометр UV-200',
    specs: ['Диапазон: 190-1100 нм', 'Точность: 0.5 нм', 'Экран: Сенсорный 7"'],
    description: 'Двухлучевой спектрофотометр для точного анализа.',
    inStock: true,
  },
  {
    id: 'spec-vis-300',
    subcategoryId: 'spectrophotometers',
    name: 'Спектрофотометр VIS-300',
    specs: ['Диапазон: 325-1000 нм', 'Точность: 1 нм', 'USB подключение'],
    description: 'Однолучевой спектрофотометр видимого диапазона.',
    inStock: true,
  },

  // pH-метры
  {
    id: 'ph-basic',
    subcategoryId: 'ph-meters',
    name: 'pH-метр Basic',
    specs: ['Диапазон pH: 0-14', 'Точность: 0.01', 'Автокалибровка'],
    description: 'Надежный лабораторный pH-метр.',
    inStock: true,
  },
  {
    id: 'ph-advanced',
    subcategoryId: 'ph-meters',
    name: 'pH-метр Advanced Pro',
    specs: ['Точность: 0.001 pH', 'Память: 1000 измерений', 'USB экспорт'],
    description: 'Профессиональный pH-метр с расширенным функционалом.',
    inStock: true,
  },

  // Хроматографы
  {
    id: 'hplc-basic',
    subcategoryId: 'chromatography',
    name: 'ВЭЖХ система ChromaLab 100',
    specs: ['Насос: бинарный', 'Детектор: УФ', 'Давление: до 400 бар'],
    description: 'Базовая система высокоэффективной жидкостной хроматографии.',
    inStock: false,
  },

  // THERMO - Инкубаторы
  {
    id: 'incubator-50l',
    subcategoryId: 'incubators',
    name: 'Термостат ТС-50',
    specs: ['Объем: 50 л', 'Температура: 5-80°C', 'Точность: ±0.3°C'],
    description: 'Лабораторный термостат с принудительной конвекцией.',
    inStock: true,
  },
  {
    id: 'incubator-co2',
    subcategoryId: 'incubators',
    name: 'CO₂-инкубатор IC-160',
    specs: ['Объем: 160 л', 'CO₂: 0-20%', 'Влажность: 95%'],
    description: 'Инкубатор для культивирования клеток с контролем CO₂.',
    inStock: true,
  },

  // Сушильные шкафы
  {
    id: 'oven-80l',
    subcategoryId: 'ovens',
    name: 'Сушильный шкаф СШ-80',
    specs: ['Объем: 80 л', 'Температура: до 300°C', 'Вентиляция'],
    description: 'Сушильный шкаф с естественной конвекцией.',
    inStock: true,
  },

  // MEASURING - Весы
  {
    id: 'scale-analytical',
    subcategoryId: 'scales',
    name: 'Аналитические весы AB-220',
    specs: ['Точность: 0.0001 г', 'Макс: 220 г', 'Калибровка: внутренняя'],
    description: 'Прецизионные аналитические весы с защитой от сквозняков.',
    inStock: true,
  },
  {
    id: 'scale-precision',
    subcategoryId: 'scales',
    name: 'Лабораторные весы LB-3000',
    specs: ['Точность: 0.01 г', 'Макс: 3000 г', 'Платформа: нержавеющая сталь'],
    description: 'Прецизионные весы для общелабораторного применения.',
    inStock: true,
  },

  // Дозаторы
  {
    id: 'pipette-variable',
    subcategoryId: 'pipettes',
    name: 'Дозатор переменного объема 10-100 мкл',
    specs: ['Диапазон: 10-100 мкл', 'Точность: ±1%', 'Автоклавируемый'],
    description: 'Одноканальный дозатор с регулируемым объемом.',
    inStock: true,
  },
  {
    id: 'pipette-multi8',
    subcategoryId: 'pipettes',
    name: 'Многоканальный дозатор 8-канальный',
    specs: ['Каналов: 8', 'Диапазон: 20-200 мкл', 'Шаг: 9 мм'],
    description: '8-канальный дозатор для работы с планшетами.',
    inStock: true,
  },

  // CENTRIFUGE - Микроцентрифуги
  {
    id: 'micro-centrifuge-mc12',
    subcategoryId: 'micro-centrifuge',
    name: 'Микроцентрифуга MC-12',
    specs: ['Скорость: до 15000 об/мин', 'Объем: 1.5-2 мл', 'Емкость: 12 проб'],
    description: 'Компактная микроцентрифуга для малых объемов.',
    inStock: true,
  },

  // Лабораторные центрифуги
  {
    id: 'lab-centrifuge-lc16',
    subcategoryId: 'lab-centrifuge',
    name: 'Центрифуга LC-16',
    specs: ['Скорость: до 5000 об/мин', 'Емкость: до 16 пробирок 15 мл', 'Таймер'],
    description: 'Универсальная лабораторная центрифуга с угловым ротором.',
    inStock: true,
  },

  // DISTILLATION - Ротационные испарители
  {
    id: 'rotavap-re2',
    subcategoryId: 'rotary-evaporators',
    name: 'Ротационный испаритель RE-2',
    specs: ['Объем колбы: 2 л', 'Скорость: 20-280 об/мин', 'Подъем автоматический'],
    description: 'Ротационный испаритель с водяной баней для упаривания растворителей.',
    inStock: true,
  },

  // Дистилляторы воды
  {
    id: 'distiller-wd10',
    subcategoryId: 'distillers',
    name: 'Дистиллятор воды WD-10',
    specs: ['Производительность: 10 л/час', 'Проводимость: <2 мкСм/см', 'Автоотключение'],
    description: 'Автоматический дистиллятор для получения деионизированной воды.',
    inStock: true,
  },

  // PHARMACEUTICAL - Таблеточные прессы
  {
    id: 'tablet-press-tp5',
    subcategoryId: 'tablet-press',
    name: 'Таблеточный пресс TP-5',
    specs: ['Производительность: 5000 таб/час', 'Диаметр: 6-12 мм', 'Сила: до 80 кН'],
    description: 'Односторонний ротационный таблеточный пресс.',
    inStock: false,
  },

  // Капсулонаполнители
  {
    id: 'capsule-filler-cf100',
    subcategoryId: 'capsule-fillers',
    name: 'Капсулонаполнитель CF-100',
    specs: ['Производительность: 100 капсул/цикл', 'Размер: 0-5', 'Полуавтомат'],
    description: 'Ручной капсулонаполнитель для малых партий.',
    inStock: true,
  },

  // MICROSCOPES - Оптические микроскопы
  {
    id: 'microscope-bio',
    subcategoryId: 'optical-microscopes',
    name: 'Биологический микроскоп BM-400',
    specs: ['Увеличение: 40-1000x', 'Подсветка: LED', 'Объективы: 4х, 10х, 40х, 100х'],
    description: 'Тринокулярный биологический микроскоп для образовательных и исследовательских целей.',
    inStock: true,
  },
  {
    id: 'microscope-stereo',
    subcategoryId: 'optical-microscopes',
    name: 'Стереомикроскоп SM-20',
    specs: ['Увеличение: 20x-40x', 'Подсветка: верхняя/нижняя LED', 'Рабочее расстояние: 100 мм'],
    description: 'Стереомикроскоп для наблюдения объемных образцов. Оснащен высококачественной оптикой и регулируемой системой освещения.',
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1579154273841-49113959563d?q=80&w=1200&auto=format&fit=crop'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=200&auto=format&fit=crop'
  },

  // Цифровые микроскопы
  {
    id: 'microscope-digital',
    subcategoryId: 'digital-microscopes',
    name: 'Цифровой микроскоп DM-500',
    specs: ['Камера: 5 Мп', 'Увеличение: 50-500x', 'Подключение: USB'],
    description: 'Цифровой USB-микроскоп с программным обеспечением для захвата изображений.',
    inStock: true,
  },

  // LAMINAR - Вертикальные боксы
  {
    id: 'laminar-vert-lv12',
    subcategoryId: 'laminar-vertical',
    name: 'Ламинарный бокс вертикальный LV-1.2',
    specs: ['Ширина: 1.2 м', 'Класс чистоты: ISO 5', 'HEPA-фильтр: 99.995%'],
    description: 'Вертикальный ламинарный бокс для микробиологических работ.',
    inStock: true,
  },

  // Горизонтальные боксы
  {
    id: 'laminar-horiz-lh15',
    subcategoryId: 'laminar-horizontal',
    name: 'Ламинарный бокс горизонтальный LH-1.5',
    specs: ['Ширина: 1.5 м', 'Класс чистоты: ISO 5', 'Подсветка: УФ + LED'],
    description: 'Горизонтальный ламинарный поток для работы с нестерильными материалами.',
    inStock: true,
  },

  // CLEANING - Автоклавы
  {
    id: 'autoclave-ac23',
    subcategoryId: 'autoclaves',
    name: 'Автоклав AC-23',
    specs: ['Объем: 23 л', 'Температура: 121-134°C', 'Вакуумная сушка'],
    description: 'Настольный паровой автоклав класса B для стерилизации инструментов.',
    inStock: true,
  },
  {
    id: 'autoclave-vertical',
    subcategoryId: 'autoclaves',
    name: 'Вертикальный автоклав AV-50',
    specs: ['Объем: 50 л', 'Давление: 0.22 МПа', 'Программы: 4'],
    description: 'Вертикальный лабораторный автоклав для стерилизации сред.',
    inStock: true,
  },

  // Ультразвуковые мойки
  {
    id: 'ultrasonic-us3',
    subcategoryId: 'ultrasonic',
    name: 'Ультразвуковая мойка US-3',
    specs: ['Объем: 3 л', 'Частота: 40 кГц', 'Нагрев: до 80°C'],
    description: 'Ультразвуковая ванна для очистки лабораторной посуды и инструментов.',
    inStock: true,
  },

  // FURNITURE - Лабораторные столы
  {
    id: 'table-chem',
    subcategoryId: 'lab-tables',
    name: 'Химический стол ХС-1500',
    specs: ['Размер: 1500x750 мм', 'Столешница: керамогранит', 'Полки: регулируемые'],
    description: 'Лабораторный стол с химически стойкой столешницей.',
    inStock: true,
  },
  {
    id: 'table-island',
    subcategoryId: 'lab-tables',
    name: 'Островной стол ОС-3000',
    specs: ['Размер: 3000x1500 мм', 'Розетки: 8 шт', 'Мойка: встроенная'],
    description: 'Центральный островной стол для лабораторий с коммуникациями.',
    inStock: true,
  },

  // Шкафы и стеллажи
  {
    id: 'cabinet-reagent',
    subcategoryId: 'storage',
    name: 'Шкаф для реактивов ШР-800',
    specs: ['Размеры: 800x400x1800 мм', 'Полки: 4', 'Замок: есть'],
    description: 'Металлический шкаф для хранения химических реактивов.',
    inStock: true,
  },
  {
    id: 'cabinet-glassware',
    subcategoryId: 'storage',
    name: 'Шкаф для посуды ШП-1000',
    specs: ['Размеры: 1000x400x2000 мм', 'Дверцы: стеклянные', 'Полки: регулируемые'],
    description: 'Шкаф-витрина для хранения лабораторной посуды.',
    inStock: true,
  },
];
