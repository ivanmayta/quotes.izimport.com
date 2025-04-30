"use client"
import { TextField } from "@radix-ui/themes"

import { useState, useEffect } from "react"

export default function Exonerado() {
    const [formData, setFormData] = useState({
        unit_price: 0,
        quantity: 0,
        fob_value: 0,
        international_freight: 0,
        freight_dot_fob: 0,
        comission_platform: 0,
        comission_total: 0,
        total_transfer: 0,
        cost_administrative: 0,
        total: 0,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        const numValue = value === "" ? 0 : parseFloat(value)
        setFormData((prevData) => ({
            ...prevData,
            [name]: numValue,
        }))
    }

    useEffect(() => {
        const fob_value = formData.unit_price * formData.quantity
        const freight_dot_fob = fob_value + formData.international_freight
        const comission_total =
            (freight_dot_fob * formData.comission_platform) / 100
        const total_transfer = freight_dot_fob + comission_total
        const total = total_transfer + formData.cost_administrative
        setFormData((prevData: any) => ({
            ...prevData,
            fob_value: fob_value.toFixed(2),
            freight_dot_fob: freight_dot_fob.toFixed(2),
            comission_total: comission_total.toFixed(2),
            total_transfer: total_transfer.toFixed(2),
            total: total.toFixed(2),
        }))
    }, [
        formData.unit_price,
        formData.quantity,
        formData.international_freight,
        formData.comission_platform,
        formData.cost_administrative,
    ])

    const formatValue = (value: number) => (value === 0 ? "" : value.toString())

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
                            onChange={handleChange}
                            aria-label="Precio Unitario"
                        />
                    </label>
                    <label className="font-semibold">
                        Cantidad:
                        <TextField.Root
                            name="quantity"
                            type="number"
                            value={formatValue(formData.quantity)}
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
                            aria-label="Gastos Administrativos"
                            placeholder="11.8 - dhl"
                        />
                    </label>
                    <LabelResults title="Costo Total: ">
                        {formatValue(formData.total)}
                    </LabelResults>
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
