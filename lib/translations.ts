type TranslationKey = string
type LanguageCode = "en" | "fr" | "es" | "de" | "zh"

interface Translations {
  [key: TranslationKey]: {
    [lang in LanguageCode]: string
  }
}

export const translations: Translations = {
  "settings.title": {
    en: "Settings",
    fr: "Paramètres",
    es: "Configuración",
    de: "Einstellungen",
    zh: "设置",
  },
  "settings.theme": {
    en: "Theme",
    fr: "Thème",
    es: "Tema",
    de: "Thema",
    zh: "主题",
  },
  "settings.font": {
    en: "Font",
    fr: "Police",
    es: "Fuente",
    de: "Schriftart",
    zh: "字体",
  },
  "settings.language": {
    en: "Language",
    fr: "Langue",
    es: "Idioma",
    de: "Sprache",
    zh: "语言",
  },
  "settings.layout": {
    en: "Layout",
    fr: "Mise en page",
    es: "Diseño",
    de: "Layout",
    zh: "布局",
  },
  "settings.theme.select": {
    en: "Select Theme",
    fr: "Sélectionner un thème",
    es: "Seleccionar tema",
    de: "Thema auswählen",
    zh: "选择主题",
  },
  "settings.font.family": {
    en: "Font Family",
    fr: "Famille de police",
    es: "Familia de fuente",
    de: "Schriftfamilie",
    zh: "字体家族",
  },
  "settings.font.size": {
    en: "Font Size",
    fr: "Taille de police",
    es: "Tamaño de fuente",
    de: "Schriftgröße",
    zh: "字体大小",
  },
  "settings.font.preview": {
    en: "Preview",
    fr: "Aperçu",
    es: "Vista previa",
    de: "Vorschau",
    zh: "预览",
  },
  "settings.font.preview.text": {
    en: "This is how your selected font will look.",
    fr: "Voici à quoi ressemblera votre police sélectionnée.",
    es: "Así es como se verá la fuente seleccionada.",
    de: "So wird Ihre ausgewählte Schriftart aussehen.",
    zh: "这是您选择的字体的外观。",
  },
  "settings.font.preview.sample": {
    en: "The quick brown fox jumps over the lazy dog.",
    fr: "Le rapide renard brun saute par-dessus le chien paresseux.",
    es: "El rápido zorro marrón salta sobre el perro perezoso.",
    de: "Der schnelle braune Fuchs springt über den faulen Hund.",
    zh: "快速的棕色狐狸跳过懒狗。",
  },
  "settings.language.select": {
    en: "Select Language",
    fr: "Sélectionner la langue",
    es: "Seleccionar idioma",
    de: "Sprache auswählen",
    zh: "选择语言",
  },
  "settings.layout.mode": {
    en: "Layout Mode",
    fr: "Mode de mise en page",
    es: "Modo de diseño",
    de: "Layout-Modus",
    zh: "布局模式",
  },
  "settings.layout.fullWidth": {
    en: "Full Width",
    fr: "Pleine largeur",
    es: "Ancho completo",
    de: "Volle Breite",
    zh: "全宽",
  },
  "settings.layout.boxed": {
    en: "Boxed",
    fr: "En boîte",
    es: "En caja",
    de: "Begrenzt",
    zh: "盒装",
  },
  "settings.textDirection": {
    en: "Text Direction",
    fr: "Direction du texte",
    es: "Dirección del texto",
    de: "Textrichtung",
    zh: "文本方向",
  },
  "settings.textDirection.ltr": {
    en: "Left to Right (LTR)",
    fr: "De gauche à droite (LTR)",
    es: "De izquierda a derecha (LTR)",
    de: "Von links nach rechts (LTR)",
    zh: "从左到右 (LTR)",
  },
  "settings.textDirection.rtl": {
    en: "Right to Left (RTL)",
    fr: "De droite à gauche (RTL)",
    es: "De derecha a izquierda (RTL)",
    de: "Von rechts nach links (RTL)",
    zh: "从右到左 (RTL)",
  },
  "settings.sidebarPosition": {
    en: "Sidebar Position",
    fr: "Position de la barre latérale",
    es: "Posición de la barra lateral",
    de: "Seitenleistenposition",
    zh: "侧边栏位置",
  },
  "settings.sidebarPosition.left": {
    en: "Left",
    fr: "Gauche",
    es: "Izquierda",
    de: "Links",
    zh: "左",
  },
  "settings.sidebarPosition.right": {
    en: "Right",
    fr: "Droite",
    es: "Derecha",
    de: "Rechts",
    zh: "右",
  },
  "settings.accessibility": {
    en: "Accessibility",
    fr: "Accessibilité",
    es: "Accesibilidad",
    de: "Barrierefreiheit",
    zh: "无障碍",
  },
  "settings.accessibility.highContrast": {
    en: "High Contrast Mode",
    fr: "Mode à contraste élevé",
    es: "Modo de alto contraste",
    de: "Hochkontrastmodus",
    zh: "高对比度模式",
  },
  "settings.accessibility.reduceMotion": {
    en: "Reduce Motion",
    fr: "Réduire les animations",
    es: "Reducir movimiento",
    de: "Bewegungen reduzieren",
    zh: "减少动画",
  },
  "settings.accessibility.increaseSpacing": {
    en: "Increase Spacing",
    fr: "Augmenter l'espacement",
    es: "Aumentar espaciado",
    de: "Abstände vergrößern",
    zh: "增加间距",
  },
}

export function useTranslation(language: LanguageCode = "en") {
  const t = (key: TranslationKey): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language]
    }

    // Fallback to English
    if (translations[key] && translations[key]["en"]) {
      return translations[key]["en"]
    }

    // Return the key if no translation is found
    return key
  }

  return { t }
}
