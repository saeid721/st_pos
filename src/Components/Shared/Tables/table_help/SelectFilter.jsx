import React from "react";
import Select from "react-select";

const SelectFilter = ({
  onFilter,
  selectedItem,
  setSelectedItem,
  uniqueData,
  defaultOptions = "Select All",
  htmlFor,
  width = "130px",
}) => {
  const options = [
    { value: "", label: defaultOptions },
    ...uniqueData?.map((item) => ({
      value: item,
      label: item,
    })),
  ];

  const handleChange = (selectedOption) => {
    const newValue = selectedOption ? selectedOption.value : "";
    setSelectedItem(newValue);
    onFilter(newValue);
  };

  const customStyles = {
    container: (provided) => ({
      ...provided,
      width: width,
    }),
  };

  return (
    <div className="flex flex-col justify-start my-2">
      <Select
        id={htmlFor}
        value={options.find((option) => option.value === selectedItem)} // Ensure this matches the selected item
        onChange={handleChange}
        options={options}
        placeholder={defaultOptions}
        className="mt-2 sm:mt-0"
        classNamePrefix="react-select"
        styles={customStyles}
      />
    </div>
  );
};

export default SelectFilter;
