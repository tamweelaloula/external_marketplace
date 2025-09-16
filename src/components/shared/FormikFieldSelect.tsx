import { Field, ErrorMessage } from "formik";

interface formikfield {
  title: string;
  options: any[];
  name: string;
  value: string;
  required?: boolean;
}
export default function FormikFieldSelect({
  title,
  options,
  name,
  value,
  required,
}: formikfield) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {title} {required && "*"}
      </label>
      <Field
        as="select"
        name={name}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-yellow-400 focus:border-yellow-400 text-sm"
      >
        <option value="">Select</option>
        {options.map((val) => (
          <option value={val}>{val}</option>
        ))}

        {/* <option>Military</option>
        <option>Government</option>
        <option>Private</option> */}
      </Field>
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-xs"
      />
    </div>
  );
}
