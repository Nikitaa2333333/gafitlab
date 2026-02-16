import { Category, Subcategory, Product } from './types';
import { SCRAPED_PRODUCTS } from './products_scraped';

export const CATEGORIES: Category[] = [
  {
    id: 'centrifuge',
    name: 'Центрифугирование',
    description: 'Профессиональное оборудование Yingtai Instrument',
    icon: 'Activity'
  }
];

export const SUBCATEGORIES: Subcategory[] = [
  { id: 'blood-bank-centrifuge', categoryId: 'centrifuge', name: 'Центрифуги для банков крови' },
  { id: 'high-speed-centrifuge', categoryId: 'centrifuge', name: 'Высокоскоростные центрифуги' },
  { id: 'high-speed-refrigerated-centrifuge', categoryId: 'centrifuge', name: 'Высокоскоростные с охлаждением' },
  { id: 'large-capacity-refrigerated-centrifuge', categoryId: 'centrifuge', name: 'Большой емкости с охлаждением' },
  { id: 'low-speed-centrifuge', categoryId: 'centrifuge', name: 'Низкоскоростные центрифуги' },
  { id: 'low-speed-refrigerated-centrifuge', categoryId: 'centrifuge', name: 'Низкоскоростные с охлаждением' },
  { id: 'mini-centrifuge', categoryId: 'centrifuge', name: 'Микроцентрифуги' },
  { id: 'prp--cgf-stem-cell-centrifuge', categoryId: 'centrifuge', name: 'PRP / CGF центрифуги' },
  { id: 'gel-card-centrifuge-incubator', categoryId: 'centrifuge', name: 'Гель-карты: Центрифуги/Инкубаторы' },
  { id: 'cell-washer-centrifuge', categoryId: 'centrifuge', name: 'Центрифуги для мойки клеток' },
  { id: 'cyto-smear-liquid-centrifuge', categoryId: 'centrifuge', name: 'Цитологические центрифуги' },
  { id: 'hematocrit-centrifuge', categoryId: 'centrifuge', name: 'Гематокритные центрифуги' },
  { id: 'oil-test-centrifuge', categoryId: 'centrifuge', name: 'Центрифуги для нефтепродуктов' },
  { id: 'incubator', categoryId: 'centrifuge', name: 'Инкубаторы' },
  { id: 'centrifugal-tubes---bottles', categoryId: 'centrifuge', name: 'Пробирки и бутыли' },
  { id: 'vacuum-freezer-dryer-lyophilizer', categoryId: 'centrifuge', name: 'Лиофильные сушилки' },
  { id: 'autoclave', categoryId: 'centrifuge', name: 'Автоклавы' },
  { id: 'centrifuge-rotor', categoryId: 'centrifuge', name: 'Роторы (Общий раздел)' },
  { id: 'microscope', categoryId: 'centrifuge', name: 'Микроскопы' },
  { id: 'tube-sealer', categoryId: 'centrifuge', name: 'Запайщики трубок' },
  { id: 'vacuum-centrifugal-concentrator', categoryId: 'centrifuge', name: 'Вакуумные концентраторы' },
  { id: 'floor-standing-centrifuge', categoryId: 'centrifuge', name: 'Напольные центрифуги' },
  { id: 'floor-standing-centrifuge-rotor', categoryId: 'centrifuge', name: 'Напольные роторы' },
  { id: 'gel-card-centrifuge-rotor', categoryId: 'centrifuge', name: 'Роторы для гель-карт' },
  { id: 'low-speed-centrifuge-rotor', categoryId: 'centrifuge', name: 'Низкоскоростные роторы' },
  { id: 'micro-centrifuge-rotor', categoryId: 'centrifuge', name: 'Микророторы' },
  { id: 'microplate-rotor', categoryId: 'centrifuge', name: 'Роторы для планшет' },
  { id: 'prp-centrifuge-rotor', categoryId: 'centrifuge', name: 'PRP роторы' },
  { id: 'special-rotor', categoryId: 'centrifuge', name: 'Специальные роторы' },
  { id: 'swing-buckets-rotor', categoryId: 'centrifuge', name: 'Swing Buckets роторы' },
  { id: 'swing-rotor', categoryId: 'centrifuge', name: 'Bucket-роторы' },
  { id: 'table-top-centrifuge-rotor', categoryId: 'centrifuge', name: 'Настольные роторы' }
];

export const PRODUCTS: Product[] = [...SCRAPED_PRODUCTS];
