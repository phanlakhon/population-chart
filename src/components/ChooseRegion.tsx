interface ChooseRegionProps {
  region: string;
  setRegion: (region: string) => void;
}

const ChooseRegion: React.FC<ChooseRegionProps> = ({ region, setRegion }) => {
  const regionList: any = [
    { name: "Asia", color: "bg-Asia" },
    { name: "Europe", color: "bg-Europe" },
    { name: "Africa", color: "bg-Africa" },
    { name: "Oceania", color: "bg-Oceania" },
    { name: "Americas", color: "bg-Americas" },
  ];

  const handleClick = (value: string) => {
    if (value !== region) setRegion(value);
    else setRegion("");
  };

  return (
    <div className="mb-10">
      <p className="text-lg lg:text-3xl font-semibold">
        Population growth per country, 1950 to 2021
      </p>
      <p className="text-md lg:text-lg mb-4">
        Click on the legend below to filter by continent{" "}
      </p>
      <div className="block md:flex">
        <p className="font-semibold mr-2">Region: </p>
        {regionList.map((item: any, index: number) => {
          return (
            <div
              className={`flex items-center mr-2 hover:text-blue-500 
              ${region === item.name ? "text-blue-500 border-blue-500" : ""}
              border-b border-transparent hover:border-b hover:border-blue-500 text-sm lg:text-md cursor-pointer`}
              key={index}
            >
              <div
                className={`w-[10px] h-[10px] mr-1 rounded-sm ${item.color}`}
              />
              <button onClick={() => handleClick(item.name)}>
                {item.name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChooseRegion;
