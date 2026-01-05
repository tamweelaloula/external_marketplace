import FormikField from "@/components/shared/FormikFieldInput";
import FormikFieldSelect from "@/components/shared/FormikFieldSelect";
import { useTranslation } from "@/i18n";

export default function LoanDetails() {
    const { translate } = useTranslation()
    const tenureOptions = Array.from({ length: 10 }, (_, i) => {
        const value = (i + 1) * 6;
        return {
            id: Number(value),
            label: String(value),
        };
    });
    return (
        <>
            <FormikFieldSelect
                options={{ data: tenureOptions }}
                title={translate("LOAN.TENOR")}
                name="tenure"
                required
                optionValueKey="id"
                optionLabelKey="label"
            />

            <FormikField
                type="number"
                placeholder="500"
                title={translate("LOAN.BALLON_AMOUNT")}
                required
                name="balloonAmount"
            />

            <FormikField
                type="number"
                placeholder="500"
                title={translate("LOAN.DOWN_PAYMENT")}
                required
                name="requestedAmount"
            />
        </>
    );
}
