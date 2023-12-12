import { useSearchParams } from "react-router-dom";
import Select from "./Select";

const Filter = ({ filterKey, options, defaultValue }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterKey) || defaultValue;
  const onChange = (e) => {
    const selectedValue = e.target.value;
    const newSearchParams = new URLSearchParams(searchParams);

    if (selectedValue === defaultValue) {
      // Reset the filter to default
      newSearchParams.delete(filterKey);
    } else {
      newSearchParams.set(filterKey, selectedValue);
    }

    setSearchParams(newSearchParams);
  };
  return (
    <Select
      options={options}
      onChange={onChange}
      value={currentFilter}
    ></Select>
  );
};

export default Filter;
