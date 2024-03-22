import { readCSV } from "@/utils/csvReader";
import { useEffect, useRef, useState } from "react";
import GearSlider from "./Slider";

import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  getBarColor,
  getFlag,
  getRegion,
  mergeDuplicateData,
} from "@/utils/helpers";
import ChooseRegion from "./ChooseRegion";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const Chart = () => {
  const isMounted = useRef(false);

  const [isLoading, setIsLoading] = useState(true);
  const [defaultData, setDefaultData] = useState<any>([]);
  const [currentYear, setCurrentYear] = useState(0);
  const [total, setTotal] = useState(0);
  const [yearRange, setYearRange] = useState<any>({ min: 0, max: 0 });
  const [region, setRegion] = useState<string>("");
  const [autoRun, setAutoRun] = useState<boolean>(true);

  const [dataChart, setDataChart] = useState<any>({
    labels: [],
    data: [],
    background: [],
    images: [],
  });

  const getData = async () => {
    const data: any = await readCSV("/data/population-and-demography.csv");
    if (data) {
      const regionAll: any = await getRegion();

      // ลูปเพื่อหาปีทั้งหมด และ แทรก region เข้าไปในข้อมูล
      let years: any = data.map((value: any, index: number) => {
        const newRegion = regionAll.get(value["Country name"]);
        data[index].region = newRegion || null;

        return Number(value?.Year || 0);
      });
      years = mergeDuplicateData(years);

      // หาปีมากสุด และ ปีน้อยสุด
      const yearMin = Math.min(...years);
      setCurrentYear(yearMin);
      yearRange.min = yearMin;
      yearRange.max = Math.max(...years);
      setYearRange({ ...yearRange });

      setDefaultData([...data]);

      // เรียกใช้ฟังก์ชั่นเพื่อทำการจัด data ให้ chart
      getDataChart(data, yearMin, yearMin, "");
    }
  };

  const getDataChart = (
    data: any,
    newCurrentYear: number,
    yearMin: number,
    newRegion: string
  ) => {
    // filter เพื่อหาดาต้าที่ต้องการแสดง
    const currentData: any = data.filter((item: any) => {
      if (newRegion) {
        return (
          Number(item.Year) >= yearMin &&
          Number(item.Year) <= newCurrentYear &&
          item.region &&
          item.region === newRegion
        );
      }

      return (
        Number(item.Year) >= yearMin &&
        Number(item.Year) <= newCurrentYear &&
        item.region
      );
    });

    // maping data
    const newData: any = [];
    let newTotal = 0;
    currentData.map((value: any, index: number) => {
      newData[index] = {
        country: value["Country name"],
        population: Number(value.Population),
        region: value.region,
      };

      newTotal = newTotal + Number(value.Population);
    });

    setTotal(newTotal);

    // จัดการข้อมูลที่ซ้ำกัน
    const uniqueDataMap: any = new Map();
    newData.forEach((item: any) => {
      const key = `${item.country}-${item.region}`;
      if (!uniqueDataMap.has(key)) {
        uniqueDataMap.set(key, { ...item });
      } else {
        const existingItem = uniqueDataMap.get(key);
        existingItem.population += item.population;
      }
    });
    const mergedData: any = [...uniqueDataMap.values()];
    mergedData.sort((a: any, b: any) => b.population - a.population);

    // 12 อันดับแรก
    const top12Population = mergedData.slice(0, 12);

    // maping data chart
    const labels: any = [];
    const newDataChart: any = [];
    const background: any = [];
    const iamges: any = [];

    top12Population.forEach((item: any) => {
      labels.push(item.country);
      newDataChart.push(item.population);
      background.push(getBarColor(item.region || ""));
      iamges.push(getFlag(item.country));
    });

    dataChart.labels = labels;
    dataChart.data = newDataChart;
    dataChart.background = background;
    dataChart.iamges = iamges;

    setDataChart({ ...dataChart });
  };

  const componentDidMount = async () => {
    await new Promise((resolve) => resolve(true))
      .then(getData)
      .then(() => setIsLoading(false));
  };

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      componentDidMount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentYear > 0 && autoRun) {
      const newCurrentYear =
        currentYear >= yearRange.max ? yearRange.min : currentYear + 1;

      setTimeout(() => {
        setCurrentYear(newCurrentYear);
        getDataChart(defaultData, currentYear + 1, yearRange.min, region);
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentYear, autoRun]);

  const options = {
    indexAxis: "y" as const,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grace: "20%",
        grid: {
          display: false,
          drawBorder: false,
        },
        stacked: true,
      },
      x: {
        grace: "5%",
        position: "top" as const,
        stacked: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        anchor: "end" as const,
        align: "end" as const,
        formatter: (value: any) => {
          return value.toLocaleString();
        },
      },
    },
    animation: {
      duration: 1000,
    },
  };

  const data = {
    labels: dataChart.labels,
    datasets: [
      {
        label: "Population growth",
        data: dataChart.data,
        backgroundColor: dataChart.background,
        box: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      },
    ],
  };

  // const addImage: any = {
  //   id: "addImage",
  //   afterDatasetsDraw(chart: any, args: any, pluginOptions: any) {
  //     const { ctx, data } = chart;

  //     ctx.save();

  //     const barHeight = chart.getDatasetMeta(0).data[0].height;
  //     data.datasets[0].box.forEach((index: number) => {
  //       const image = new Image();
  //       image.src = dataChart.iamges[index];

  //       ctx.drawImage(
  //         image,
  //         chart.getDatasetMeta(0).data[index].x - 18,
  //         chart.getDatasetMeta(0).data[index].y - barHeight / 2,
  //         barHeight,
  //         barHeight
  //       );
  //     });
  //   },
  // };

  return (
    <>
      {!isLoading && (
        <>
          <ChooseRegion
            region={region}
            setRegion={(value) => {
              setRegion(value);
              getDataChart(defaultData, currentYear, yearRange.min, value);
            }}
          />

          <div className="relative mb-8 h-[30vh] md:h-[60vh]">
            <Bar data={data} options={options} />
            <div className="absolute bottom-0 right-0">
              <div className="text-right text-gray-500">
                <p className="text-xl lg:text-7xl font-medium">{currentYear}</p>
                <p className="text-lg lg:text-4xl font-light">
                  Total: {total.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <GearSlider
            startYear={yearRange.min}
            endYear={yearRange.max}
            currentYear={currentYear}
            setCurrentYear={(value) => {
              setCurrentYear(value);
              getDataChart(defaultData, value, yearRange.min, region);
            }}
            autoRun={autoRun}
            setAutoRun={setAutoRun}
          />

          <p className="text-sm mt-10">
            Source code:{" "}
            <a
              href="https://github.com/phanlakhon/population-chart"
              target="_blank"
              className="text-sky-600 hover:text-sky-400"
            >
              https://github.com/phanlakhon/population-chart
            </a>{" "}
          </p>
        </>
      )}
    </>
  );
};

export default Chart;
