import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { useState, useEffect } from "react"; // Import useEffect hook

const TextInput = ({
  name,
  label,
  type,
  register,
  error,
  className,
  placeholder,
  required,
  isHighlight = false,
  imgUrl,
  width,
  height,
  value,
  defaultValue,
  readonly,
}) => {
  return (
    <div className="grid w-full items-center ">
      <Label htmlFor={name} className="mb-1">
        {label} {<span className={`text-red-500 font-bold text-base ${required ? "opacity-100" : "opacity-0"} `}>*</span>}{" "}
        {width || height ? `(Width: ${width}px, Height: ${height}px Required)` : ``}{" "}
      </Label>
      <Input
        readonly={readonly}
        type={type}
        id={name}
        placeholder={placeholder}
        step="any"
        className={`w-full ${className} ${isHighlight ? "shadow-sm shadow-blue-500/50" : ""} ${
          readonly === "readonly" && "bg-gray-200"
        }`}
        {...register(name, { required: required })}
        value={value}
        defaultValue={defaultValue}
        // {...register(name, )}
      />
      {error && <span>This field is required</span>}

      {type === "file" && imgUrl && <img className="w-52 mx-auto mt-4" src={import.meta.env.VITE_LOCAL_API_URL + imgUrl} />}
    </div>
  );
};

export default TextInput;
