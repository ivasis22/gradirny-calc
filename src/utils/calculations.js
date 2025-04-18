// Утилиты для расчётов
export const calcGx = (g1) => {
  if (!g1) return 0;
  return g1 / 144;
};

export const calcGg = (g1, n) => {
  if (!g1 || !n) return 0;
  return g1 / n;
};

export const calcQ = (g1, t1, t2) => {
  if (!g1 || !t1 || !t2) return 0;
  return g1 * (t1 - t2) * 4.186 / 3600;
};

export const calcGy = (g1) => {
  if (!g1) return 0;
  return 0.0004 * g1;
};

export const calcGi = (gg, t1, t2) => {
  const cWater = 4.186; // удельная теплоёмкость воды, кДж/(кг·°C)
  const rEvaporation = 2260; // теплота парообразования, кДж/кг
  if (!gg || !t1 || !t2) return 0;
  return (gg * cWater * (t1 - t2)) / rEvaporation;
};

// Основная функция расчёта результатов
export const getCalculationResults = (values) => {
  if (!values) return {};
  
  const { g1, n, t1, t2 } = values.initialData || {};
  const { humidity, temperature_dry, barometric_press } = values.airParameters || {};
  const gg = calcGg(g1, n); // Добавляем расчёт gg
  
  return {
    "Производительность градирни (Gг)": `${g1 || 0} м³/ч`,
    "Количество секций (n)": `${n || 0}`,
    "Температура воды (t₁/t₂)": `${t1 || 0} °C / ${t2 || 0} °C`,
    "Gg (Производительность секции)": `${calcGg(g1, n).toFixed(2)} м³/ч`,
    "Gx (расход воды)": `${calcGx(g1).toFixed(2)} м³/ч`,
    "Q (тепловая нагрузка)": `${calcQ(g1, t1, t2).toFixed(2)} кВт`,
    "Влажность воздуха": `${humidity || 0}%`,
    "Температура по сухому термометру": `${temperature_dry || 0} °C`,
    "Барометрическое давление": `${barometric_press || 0} кПа`,
    "Потери на испарение": `${calcGi(gg, t1, t2).toFixed(2)} кг/ч`, // Исправлено с кПа на кг/ч!
    "Капельный унос": `${calcGy(g1).toFixed(2)} кг/ч` // Уточните единицы измерения!
  };
};

export const calculations = {
  calcGx,
  calcGg,
  calcQ,
  calcGy,
  calcGi,
  getCalculationResults
};