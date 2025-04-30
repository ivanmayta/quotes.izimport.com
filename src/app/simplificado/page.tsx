"use client"
import { TextField } from "@radix-ui/themes"
import { useState, useEffect } from "react"

//todo: include useMemo to avoid re-rendering
interface FormData {
    unit_price: number
    quantity: number
    fob_value: number
    international_freight: number
    freight_dot_fob: number
    comission_platform: number
    comission_total: number
    total_transfer: number
    seguro: number
    seguro_total: number
    valor_aduanas: number
    ad_valorem: number
    ipm: number
    igv: number
    total_tributos: number
    cost_administrative: number
    total: number
}
export default function Simplificado() {
    const [formData, setFormData] = useState<FormData>({
        unit_price: 0,
        quantity: 0,
        fob_value: 0,
        international_freight: 0,
        freight_dot_fob: 0,
        comission_platform: 0,
        comission_total: 0,
        total_transfer: 0,
        seguro: 0,
        seguro_total: 0,
        valor_aduanas: 0,
        ad_valorem: 0,
        ipm: 0,
        igv: 0,
        total_tributos: 0,
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
        const seguro_total = (fob_value / 100) * formData.seguro
        const valor_aduanas = freight_dot_fob + seguro_total
        const ad_valorem = valor_aduanas * 0.04
        const ipm = (valor_aduanas + ad_valorem) * 0.02
        const igv = (valor_aduanas + ad_valorem) * 0.16
        const total_tributos = ad_valorem + ipm + igv
        const total =
            total_transfer + total_tributos + formData.cost_administrative
        setFormData((prevData: any) => ({
            ...prevData,
            fob_value: fob_value.toFixed(2),
            freight_dot_fob: freight_dot_fob.toFixed(2),
            comission_total: comission_total.toFixed(2),
            total_transfer: total_transfer.toFixed(2),
            seguro_total: seguro_total.toFixed(2),
            valor_aduanas: total_tributos.toFixed(2),
            ad_valorem: ad_valorem.toFixed(2),
            ipm: ipm.toFixed(2),
            igv: igv.toFixed(2),
            total_tributos: total_tributos.toFixed(2),
            total: total.toFixed(2),
        }))
    }, [
        formData.unit_price,
        formData.quantity,
        formData.international_freight,
        formData.comission_platform,
        formData.seguro,
        formData.seguro_total,
        formData.valor_aduanas,
        formData.ad_valorem,
        formData.ipm,
        formData.igv,
        formData.cost_administrative,
        formData.total_tributos,
    ])

    const formatValue = (value: number) => (value === 0 ? "" : value.toString())

    return (
        <>
            <section className="max-w-6xl -mr-4  mx-auto pt-6 w-full h-full border-neutral-300 rounded-lg placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-300  dark:focus:ring-neutral-700 flex flex-col gap-4">
                <p className="text-zinc-800">
                    Importaciones entre 200 a 2000 dolares.
                </p>
                <form className="grid grid-cols-3 gap-5 items-center">
                    <label className="font-semibold">
                        Precio Unitario:
                        <TextField.Root
                            type="number"
                            name="unit_price"
                            onChange={handleChange}
                            value={formatValue(formData.unit_price)}
                            aria-label="Precio Unitario"
                        ></TextField.Root>
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
                        Seguro:
                        <TextField.Root
                            name="seguro"
                            type="number"
                            value={formatValue(formData.seguro)}
                            onChange={handleChange}
                            aria-label="Gastos Administrativos"
                            placeholder="0.75% - Impositivo Sunat"
                        />
                    </label>
                    <LabelResults title="Total Seguro">
                        {formatValue(formData.seguro_total)}
                    </LabelResults>
                    <h1 className="col-start-1 col-end-3 text-right font-semibold">
                        Valor Aduanas (CIF):
                    </h1>
                    <LabelResults title="Total">
                        {formatValue(formData.valor_aduanas)}
                    </LabelResults>

                    <h1 className="col-start-1 col-end-4 text-left font-semibold">
                        Tributos Aduaneros:
                    </h1>
                    <h1>AD. VALOREM</h1>
                    <p>4%</p>
                    <LabelResults>{formData.ad_valorem}</LabelResults>
                    <h1>IPM</h1>
                    <p>2%</p>
                    <LabelResults>{formData.ipm}</LabelResults>
                    <p>IGV</p>
                    <p>16%</p>
                    <LabelResults>{formData.igv}</LabelResults>
                    <h1 className="col-start-1 col-end-3 text-right font-semibold">
                        Total Tributos:
                    </h1>
                    <LabelResults>
                        {formatValue(formData.total_tributos)}
                    </LabelResults>
                    <h1 className="font-semibold">Gastos Administrativos</h1>

                    <label className={"col-span-1"}>
                        <TextField.Root
                            name="cost_administrative"
                            type="number"
                            value={formatValue(formData.cost_administrative)}
                            onChange={handleChange}
                            aria-label="Gastos Administrativos"
                        />
                    </label>
                    <span></span>

                    <h1 className="font-semibold text-xl">Costo total</h1>
                    <LabelResults>{formatValue(formData.total)}</LabelResults>
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
    title?: string
}) => {
    return (
        <label className="col-start-3 col-end-4 text-center place-items-center font-semibold">
            {title}
            <p className=" font-normal h-10 w-full rounded-md dark:bg-neutral-900/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium ">
                {children}
            </p>
        </label>
    )
}
