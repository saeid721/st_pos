import { Controller } from "react-hook-form";
import Select from "react-select";

const styles = {
  option: (provided, state) => ({
    ...provided,
    fontSize: "14px",
  }),
};

const CustomReactSelect = ({
  name,
  placeholder,
  label,
  required,
  options = [],
  control = () => { },
  isMulti,
  error,
  isLoading,
  isDisabled,
  isHighlight = false,
  isClearable = true,
  onSelectChange = () => { }, // Add a prop to pass selected value callback
}) => {
  return (
    <div>
      <div className="mb-1">
        <label
          htmlFor="custom-react-select"
          className="form-label font-semibold text-sm"
        >
          {label} {required && <span className="text-red-500 font-bold text-base">*</span>}
        </label>
      </div>
      <div
        className={`${error ? "has-error" : ""} ${isHighlight ? "shadow-sm shadow-blue-500/50" : ""
          }`}
      >
        <Controller
          name={name}
          control={control}
          // rules={{
          //   required: required ? `${label} is required!` : false,
          // }}
          render={({ field: { onChange, onBlur, value, name, ref } }) => (
            <Select
              isLoading={isLoading}
              loadingMessage={() => "Loading..."}
              placeholder={placeholder}
              className={`react-select`}
              classNamePrefix="select"
              value={
                isMulti
                  ? options?.filter((option) => value?.includes(option.value))
                  : options.find((option) => option.value === value)
              }
              onChange={(selectedOption) => {
                const finalValue = isMulti
                  ? selectedOption?.map((item) => item.value) || []
                  : selectedOption?.value || "";

                onChange(finalValue);
                onSelectChange(selectedOption);
              }}
              styles={styles}
              options={options}
              isClearable={isClearable}
              isMulti={isMulti}
              id="custom-react-select"
              isDisabled={isDisabled}
            />
          )}
        />
      </div>

      {error && (
        <div className="mt-2 text-red-500 block text-sm">
          {typeof error?.message === "string"
            ? error.message
            : "This field is required"}
        </div>
      )}
    </div>
  );
};

export default CustomReactSelect;
