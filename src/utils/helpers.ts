export function mergeDuplicateData(data: any) {
  const newData = data.reduce((accumulator: any, item: number) => {
    if (item && !accumulator.includes(item)) accumulator.push(item);

    return accumulator;
  }, []);

  return newData;
}

export async function getRegion() {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/all`);
    const countriesData = await response.json();
    const countriesMap = new Map();

    countriesData.forEach((country: any) => {
      countriesMap.set(country.name.common, country.region);
    });

    return countriesMap;
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    return null;
  }
}

export function getBarColor(region: string) {
  let color;
  switch (region) {
    case "Asia":
      color = "rgba(96, 71, 236, 1)";
      break;
    case "Europe":
      color = "rgba(166, 109, 232, 1)";
      break;
    case "Americas":
      color = "rgba(253, 205, 70, 1)";
      break;
    case "Africa":
      color = "rgba(185, 90, 111, 1)";
      break;
    case "Oceania":
      color = "rgba(224, 128, 44, 1)";
      break;
    default:
      color = "rgba(100, 149, 237, 1)";
      break;
  }
  return color;
}

export function getFlag(region: string) {
  let flag;
  switch (region) {
    case "China":
      flag =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/150px-Flag_of_the_People%27s_Republic_of_China.svg.png";
      break;
    case "India":
      flag =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_India.svg/150px-Flag_of_India.svg.png";
      break;
    case "United States":
      flag =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/150px-Flag_of_the_United_States.svg.png";
      break;
    case "Russia":
      flag =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/150px-Flag_of_Russia.svg.png";
      break;
    case "Japan":
      flag =
        "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/120px-Flag_of_Japan.svg.png?20111003030759";
      break;
    case "Germany":
      flag =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/120px-Flag_of_Germany.svg.png";
      break;
    case "Indonesia":
      flag =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_Indonesia.svg/150px-Flag_of_Indonesia.svg.png";
      break;
    case "Brazil":
      flag =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/80px-Flag_of_Brazil.svg.png";
      break;
    case "United Kingdom":
      flag =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Flag_of_the_United_Kingdom.png/120px-Flag_of_the_United_Kingdom.png";
      break;
    case "Italy":
      flag =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Italy_%281946%E2%80%932003%29.svg/150px-Flag_of_Italy_%281946%E2%80%932003%29.svg.png";
      break;
    case "France":
      flag =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Flag_of_France.png/120px-Flag_of_France.png";
      break;
    case "Bangladesh":
      flag =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Flag_of_Bangladesh_%281971_reverse%29.svg/150px-Flag_of_Bangladesh_%281971_reverse%29.svg.png";
      break;

    default:
      flag =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/150px-Flag_of_the_People%27s_Republic_of_China.svg.png";
      break;
  }
  return flag;
}
