import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { evaluate } from 'mathjs';
import { Button } from 'react-bootstrap';
import { InitialDataSection  } from "./InitialDataSection";
import { ParametersOutdoorAirSection } from "./ParametersOutdoorAirSection";
import { CalculationIntermediateValuesSection } from "./CalculationIntermediateValuesSection";
import { useNavigate } from 'react-router-dom';

// Схема валидации
const validationSchema = Yup.object({
  initialData: Yup.object({
    g1: Yup.number().required("Обязательное поле").min(1000, "Минимум 1000 м³/ч"),
    n: Yup.number().required("Обязательное поле").min(1, "Минимум 1 секция"),
    t1: Yup.number().max(100, "Слишком высокая температура"),
    t2: Yup.number().max(100, "Слишком высокая температура"),
  }),
  airParameters: Yup.object({
    humidity: Yup.number().required("Укажите влажность").min(0, "Минимум 0%").max(100, "Максимум 100%"),
    // pressure: Yup.number().min(90).max(110),
  }),
  // IntermediateValues: Yup.object({
  //   humidity: Yup.number().required("Укажите влажность").min(0, "Минимум 0%").max(100, "Максимум 100%"),
  // }),
});

export const CalculationForm = () => {
  const navigate = useNavigate();
  const [autoResults, setAutoResults] = useState({
    gx: '0',
    q: '0'
  });

  const formik = useFormik({
    initialValues: {
      initialData: {
        g1: 7500,  // Производительность градирни
        n: 3, //Количество секций
        t1: 46,    // Температура входящей воды
        t2: 35,    // Температура охлаждённой воды
      },
      airParameters: {
        humidity: 60,  // Влажность воздуха
        // pressure: 101, // Атмосферное давление
      },
      IntermediateValues: {
        q1: 4.746,  // Материал оросителя
        // fanPower: 7.5,    // Мощность вентилятора
      },
      // advancedSettings: {
      //   isWinterMode: false, // Зимний режим
      //   correctionFactor: 1, // Поправочный коэффициент
      // },
    },
    validationSchema,
    onSubmit: (values) => {
      const results = calculateResults(values);
      navigate('/results-table', { state: { results } });
    },
  });

  useEffect(() => {
    if (formik.values.initialData?.g1 && 
        formik.values.initialData?.t1 && 
        formik.values.initialData?.t2) {
      const { g1, t1, t2 } = formik.values.initialData;
      setAutoResults({
        gx: (g1 / 144).toFixed(2),
        q: (g1 * (t1 - t2) * 4.186 / 3600).toFixed(2)
      });
    }
  }, [formik.values.initialData]); // Зависим только от нужных полей

  // Расчёт всех результатов
  const calculateResults = (values) => {
    const { initialData: { g1, n, t1, t2 }, airParameters: { humidity } } = values;
    return {
      "Производительность градирни (Gг)": `${g1} м³/ч`,
      "Количество секций (n)": `${n}`,
      "Температура входящей воды (t₁)": `${t1} °C`,
      "Температура охлаждённой воды (t₂)": `${t2} °C`,
      ...autoResults, // Добавляем автоматически рассчитанные значения
      "Влажность воздуха": `${humidity}%`
    };
  };

  return (
    <div className="container">

      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col">
            <h2 className="mb-2 text-light text-center">Теплотехнический расчёт градирни</h2>
            <InitialDataSection formik={formik} />
            <ParametersOutdoorAirSection formik={formik} />
          </div>
          <div className="col">
            <h2 className="mb-2 text-light text-center">Заказчик:</h2>
            <CalculationIntermediateValuesSection 
              formik={formik} 
              autoResults={autoResults} 
            />
          </div>
        </div>

        <Button type="submit" variant="primary" className="mt-3">
          Рассчитать
        </Button>
      </form>

    </div>
  );
};