"use client"
import { TextField } from "@radix-ui/themes"
import { RefreshCcw } from "lucide-react"
import { useState, useEffect } from "react"

interface FormData {
    unit_price: number | string
    quantity: number | string
    fob_value: number
    international_freight: number | string
    freight_dot_fob: number
    comission_platform: number | string
    comission_total: number
    total_transfer: number
    cost_administrative: number | string
    total: number
    // Rentabilidad
    exchange_rate: number | string
    total_cost_soles: number
    unit_price_final: number
    unit_price_final_soles: number
    sale_price_soles: number | string
    sale_price_dollars: number
    income_soles: number
    income_dollars: number
    profit_soles: number
    profit_dollars: number
}

export default function Exonerado() {
    const [formData, setFormData] = useState<FormData>({
        unit_price: "",
        quantity: "",
        fob_value: 0,
        international_freight: "",
        freight_dot_fob: 0,
        comission_platform: "",
        comission_total: 0,
        total_transfer: 0,
        cost_administrative: "",
        total: 0,
        // Rentabilidad
        exchange_rate: "",
        total_cost_soles: 0,
        unit_price_final: 0,
        unit_price_final_soles: 0,
        sale_price_soles: "",
        sale_price_dollars: 0,
        income_soles: 0,
        income_dollars: 0,
        profit_soles: 0,
        profit_dollars: 0,
    })

    const handleChange = (name: keyof FormData, value: string) => {
        if (value === "") {
            setFormData((prevData) => ({
                ...prevData,
                [name]: "",
            }))
            return
        }

        const numericRegex = /^\d*\.?\d*$/
        if (!numericRegex.test(value)) {
            return
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const toNumber = (value: number | string): number => {
        if (typeof value === "string") {
            return value === "" ? 0 : parseFloat(value) || 0
        }
        return value
    }

    useEffect(() => {
        const unit_price = toNumber(formData.unit_price)
        const quantity = toNumber(formData.quantity)
        const international_freight = toNumber(formData.international_freight)
        const comission_platform = toNumber(formData.comission_platform)
        const cost_administrative = toNumber(formData.cost_administrative)
        const exchange_rate = toNumber(formData.exchange_rate)
        const sale_price_soles = toNumber(formData.sale_price_soles)

        const fob_value = unit_price * quantity
        const freight_dot_fob = fob_value + international_freight
        const comission_total = (freight_dot_fob * comission_platform) / 100
        const total_transfer = freight_dot_fob + comission_total
        const total = total_transfer + cost_administrative

        // Rentabilidad calculations
        const unit_price_final = quantity > 0 ? total / quantity : 0
        const total_cost_soles = total * exchange_rate
        const unit_price_final_soles = unit_price_final * exchange_rate
        const sale_price_dollars =
            exchange_rate > 0 ? sale_price_soles / exchange_rate : 0
        const income_soles = quantity * sale_price_soles
        const income_dollars =
            exchange_rate > 0 ? income_soles / exchange_rate : 0
        const profit_dollars = income_dollars - total
        const profit_soles = profit_dollars * exchange_rate

        setFormData((prevData) => ({
            ...prevData,
            fob_value: Number(fob_value.toFixed(2)),
            freight_dot_fob: Number(freight_dot_fob.toFixed(2)),
            comission_total: Number(comission_total.toFixed(2)),
            total_transfer: Number(total_transfer.toFixed(2)),
            total: Number(total.toFixed(2)),
            // Rentabilidad
            unit_price_final: Number(unit_price_final.toFixed(2)),
            total_cost_soles: Number(total_cost_soles.toFixed(2)),
            unit_price_final_soles: Number(unit_price_final_soles.toFixed(2)),
            sale_price_dollars: Number(sale_price_dollars.toFixed(2)),
            income_soles: Number(income_soles.toFixed(2)),
            income_dollars: Number(income_dollars.toFixed(2)),
            profit_soles: Number(profit_soles.toFixed(2)),
            profit_dollars: Number(profit_dollars.toFixed(2)),
        }))
    }, [
        formData.unit_price,
        formData.quantity,
        formData.international_freight,
        formData.comission_platform,
        formData.cost_administrative,
        formData.exchange_rate,
        formData.sale_price_soles,
    ])

    const formatValue = (value: number | string) => {
        if (value === 0 || value === "") return ""
        return value.toString()
    }

    const resetForm = () => {
        setFormData({
            unit_price: "",
            quantity: "",
            fob_value: 0,
            international_freight: "",
            freight_dot_fob: 0,
            comission_platform: "",
            comission_total: 0,
            total_transfer: 0,
            cost_administrative: "",
            total: 0,
            // Rentabilidad
            exchange_rate: "",
            total_cost_soles: 0,
            unit_price_final: 0,
            unit_price_final_soles: 0,
            sale_price_soles: "",
            sale_price_dollars: 0,
            income_soles: 0,
            income_dollars: 0,
            profit_soles: 0,
            profit_dollars: 0,
        })
    }

    return (
        <>
            <section className="max-w-6xl -mr-4  mx-auto pt-6 w-full h-full border-neutral-300 rounded-lg placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-300  dark:focus:ring-neutral-700 flex flex-col gap-4">
                <p className="text-zinc-800">
                    Importaciones hasta 200 dolares.
                </p>
                <form className="grid grid-cols-3 gap-5 items-center">
                    <label className="font-semibold">
                        Precio Unitario:
                        <TextField.Root
                            name="unit_price"
                            type="number"
                            value={formatValue(formData.unit_price)}
                            onChange={(e) =>
                                handleChange("unit_price", e.target.value)
                            }
                            aria-label="Precio Unitario"
                        />
                    </label>
                    <label className="font-semibold">
                        Cantidad:
                        <TextField.Root
                            name="quantity"
                            type="number"
                            value={formatValue(formData.quantity)}
                            onChange={(e) =>
                                handleChange("quantity", e.target.value)
                            }
                            aria-label="Cantidad"
                        />
                    </label>

                    <LabelResults title="Valor FOB: ">
                        {formatValue(formData.fob_value)}
                    </LabelResults>

                    <label className={"col-span-2 font-semibold"}>
                        Flete Internacional:
                        <TextField.Root
                            name="international_freight"
                            type="number"
                            value={formatValue(formData.international_freight)}
                            onChange={(e) =>
                                handleChange(
                                    "international_freight",
                                    e.target.value
                                )
                            }
                            aria-label="Flete Internacional"
                        />
                    </label>
                    <LabelResults title="Flete + FOB: ">
                        {formatValue(formData.freight_dot_fob)}
                    </LabelResults>
                    <label className={"col-span-2 font-semibold"}>
                        Comision de plataforma:
                        <TextField.Root
                            name="comission_platform"
                            type="number"
                            value={formatValue(formData.comission_platform)}
                            onChange={(e) =>
                                handleChange(
                                    "comission_platform",
                                    e.target.value
                                )
                            }
                            aria-label="Comision de plataforma"
                            placeholder="2.99% - alibaba"
                        />
                    </label>
                    <LabelResults title="Comisión">
                        {formatValue(formData.comission_total)}
                    </LabelResults>

                    <LabelResults title="Transferir">
                        {formatValue(formData.total_transfer)}
                    </LabelResults>

                    <label className={"col-span-2 font-semibold"}>
                        Gastos Administrativos:
                        <TextField.Root
                            name="cost_administrative"
                            type="number"
                            value={formatValue(formData.cost_administrative)}
                            onChange={(e) =>
                                handleChange(
                                    "cost_administrative",
                                    e.target.value
                                )
                            }
                            aria-label="Gastos Administrativos"
                            placeholder="11.8 - dhl"
                        />
                    </label>
                    <LabelResults title="Costo Total: ">
                        {formatValue(formData.total)}
                    </LabelResults>

                    {/* Línea divisoria */}
                    <div className="col-span-3 border-t-1 border-zinc-300 mt-8 mb-6"></div>

                    {/* Sección de Rentabilidad */}
                    <h1 className="col-span-3 text-center font-bold text-zinc-600 text-xl mb-6">
                        Rentabilidad
                    </h1>

                    {/* Tipo de cambio */}
                    <label className="font-semibold">Tipo de cambio:</label>
                    <label className="font-semibold">
                        <TextField.Root
                            type="number"
                            name="exchange_rate"
                            onChange={(e) =>
                                handleChange("exchange_rate", e.target.value)
                            }
                            value={formatValue(formData.exchange_rate)}
                            aria-label="Tipo de cambio"
                            placeholder="3.75"
                        />
                    </label>
                    <div className="text-center place-items-center font-semibold">
                        <p className="font-semibold h-10 w-full rounded-md dark:bg-neutral-900/50 px-3 py-2 text-sm ring-offset-background text-green-600">
                            $1.00
                        </p>
                    </div>

                    {/* Costo Total en ambas monedas */}
                    <label className="font-semibold">Costo Total:</label>
                    <RentabilityResult>
                        S/{formatValue(formData.total_cost_soles)}
                    </RentabilityResult>
                    <RentabilityResult>
                        ${formatValue(formData.total)}
                    </RentabilityResult>

                    {/* Precio unitario en ambas monedas */}
                    <label className="font-semibold">Precio unitario:</label>
                    <RentabilityResult>
                        S/{formatValue(formData.unit_price_final_soles)}
                    </RentabilityResult>
                    <RentabilityResult>
                        ${formatValue(formData.unit_price_final)}
                    </RentabilityResult>

                    {/* Precio de venta */}
                    <label className="font-semibold">Precio de venta:</label>
                    <label className="font-semibold">
                        <TextField.Root
                            type="number"
                            name="sale_price_soles"
                            onChange={(e) =>
                                handleChange("sale_price_soles", e.target.value)
                            }
                            value={formatValue(formData.sale_price_soles)}
                            aria-label="Precio de venta"
                            placeholder="S/ 0.00"
                        />
                    </label>
                    <RentabilityResult>
                        ${formatValue(formData.sale_price_dollars)}
                    </RentabilityResult>

                    {/* Ingresos */}
                    <label className="font-semibold">Ingresos:</label>
                    <RentabilityResult>
                        S/{formatValue(formData.income_soles)}
                    </RentabilityResult>
                    <RentabilityResult>
                        ${formatValue(formData.income_dollars)}
                    </RentabilityResult>

                    {/* Ganancias */}
                    <label className="font-semibold">Ganancia:</label>
                    <div className="text-center place-items-center font-semibold">
                        <p
                            className={`font-bold h-10 w-full rounded-md dark:bg-neutral-900/50 px-3 py-2 text-sm ring-offset-background ${
                                formData.profit_soles > 0
                                    ? "text-green-600"
                                    : formData.profit_soles < 0
                                    ? "text-red-600"
                                    : ""
                            }`}
                        >
                            {formData.profit_soles !== 0
                                ? `S/${formatValue(formData.profit_soles)}`
                                : "---"}
                        </p>
                    </div>
                    <div className="text-center place-items-center font-semibold">
                        <p
                            className={`font-bold h-10 w-full rounded-md dark:bg-neutral-900/50 px-3 py-2 text-sm ring-offset-background ${
                                formData.profit_dollars > 0
                                    ? "text-green-600"
                                    : formData.profit_dollars < 0
                                    ? "text-red-600"
                                    : ""
                            }`}
                        >
                            {formData.profit_dollars !== 0
                                ? `$${formatValue(formData.profit_dollars)}`
                                : "---"}
                        </p>
                    </div>

                    {/* Botón de reset */}
                    <div className="col-span-3 flex  justify-center mt-8">
                        <button
                            type="button"
                            onClick={resetForm}
                            className="  font-semibold py-2 px-6 rounded-lg transition-colors flex items-center gap-2 bg-zinc-200 hover:bg-zinc-300 border-zinc-300 border-1"
                        >
                            <RefreshCcw className="w-4 h-4" />
                            volver a cotizar
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

const LabelResults = ({
    children,
    title,
}: {
    children: React.ReactNode
    title: string
}) => {
    return (
        <label className="col-start-3 col-end-4 text-center font-semibold">
            {title}
            <p className="font-normal h-10 w-full rounded-md px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium ">
                {children}
            </p>
        </label>
    )
}

const RentabilityResult = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="text-center place-items-center font-semibold">
            <p className="font-normal h-10 w-full rounded-md dark:bg-neutral-900/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium">
                {children}
            </p>
        </div>
    )
}
