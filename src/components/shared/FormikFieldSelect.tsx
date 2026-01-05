import { Field, ErrorMessage } from "formik";

interface FormikFieldSelectProps<T> {
  title: string;
  name: string;
  options: T[] | { data?: T[] };
  disabled?: boolean;
  required?: boolean;
  loading?: boolean;
  placeholder?: string;

  optionValueKey: keyof T;
  optionLabelKey: keyof T;
}

export default function FormikFieldSelect<T>({
  title,
  name,
  options,
  disabled = false,
  required = false,
  loading = false,
  placeholder = "Select",
  optionValueKey,
  optionLabelKey,
}: FormikFieldSelectProps<T>) {
  const isDisabled = disabled || loading;

  const normalizedOptions: T[] = Array.isArray(options)
    ? options
    : Array.isArray(options?.data)
    ? options.data
    : [];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {title} {required && <span className="text-red-500">*</span>}
      </label>

      <Field
        as="select"
        name={name}
        disabled={isDisabled}
        className={`w-full border border-gray-300 rounded-md px-3 py-2
          ${isDisabled ? "bg-[#E1E3E6] cursor-not-allowed" : ""}
          focus:ring-yellow-400 focus:border-yellow-400
          text-gray-500 text-sm`}
      >
        <option value="" disabled>
          {loading ? "Loading..." : placeholder}
        </option>

        {!loading &&
          normalizedOptions.map((option, index) => (
            <option
              key={`${String(option[optionValueKey])}-${index}`}
              value={String(option[optionValueKey])}
            >
              {String(option[optionLabelKey])}
            </option>
          ))}
      </Field>

      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-xs mt-1"
      />
    </div>
  );
}
