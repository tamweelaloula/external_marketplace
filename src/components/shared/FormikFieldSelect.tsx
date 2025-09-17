import { Field, ErrorMessage } from "formik";

interface formikfield {
  title: string;
  options: any[];
  name: string;
  disabled?: boolean;
  value: string;
  required?: boolean;
}
export default function FormikFieldSelect({
  title,
  options,
  name,
  value,
  disabled = false,
  required,
}: formikfield) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {title} {required && <span className="text-red-500">*</span>}
      </label>
      <Field
        as="select"
        name={name}
        disabled={disabled}
        className={`w-full ${disabled && "bg-[#E1E3E6]"} border border-gray-300 rounded-md px-3 py-2 focus:ring-yellow-400 focus:border-yellow-400 text-gray-500 text-sm`}
      >
        <option value="" className="text-inherit">Select</option>
        {options.map((val) => (
          <option key={val} value={val}>{val}</option>
        ))}
      </Field>
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-xs"
      />
    </div>
  );
}
