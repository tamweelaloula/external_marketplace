import { Field } from "formik";

interface formikfield {
  title: string;
  name: string;
  value: string
  required?: boolean
}

export default function FormikFieldRadio({ title, name, value, required }: formikfield) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {title} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex gap-4">
        <label className="flex items-center gap-2 text-sm w-[138px] p-2 border-1 border-[383838] rounded-md">
          <Field type="radio" name={name} value="yes" className="text-yellow-400" /> Yes
        </label>
        <label className="flex items-center gap-2 text-sm w-[138px] p-2 border-1 border-[383838] rounded-md">
          <Field type="radio" name={name} value="no" className="text-yellow-400" /> No
        </label>
      </div>
    </div>
  );
}
