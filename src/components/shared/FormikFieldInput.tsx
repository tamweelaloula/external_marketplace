import { Field, ErrorMessage } from "formik";

interface formikfield {
  title: string;
  type: string;
  name: string;
  disabled?: boolean
  placeholder: string;
  required?: boolean
}
export default function FormikField({
  title,
  type,
  name,
  placeholder,
  disabled = false,
  required
}: formikfield) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {title} {required && <span className="text-red-500">*</span>}
      </label>
      <Field
        type={type}
        name={name}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full ${disabled && "bg-[#E1E3E6]"} border border-gray-300 rounded-md px-3 py-2 focus:ring-yellow-400 focus:border-yellow-400 text-sm`}
      />
      {required && <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-xs"
      />}
    </div>
  );
}
