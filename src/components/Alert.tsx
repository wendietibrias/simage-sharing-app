"use client"
import { useAlertType } from "@/hooks/useAlert"
import useAlert from "@/hooks/useAlert"

const Alert = () => {
    const { message,variant,closeAlert } = useAlert(state=>state) as useAlertType;

    return (
        <div className={`w-full flex justify-between items-center py-2 mb-3 px-2 rounded-md ${variant === "error" ? "bg-rose-100 text-rose-500" : "bg-green-100 text-green-500"}`}>
           <h5 className={`font-semibold text-sm`}>{message}</h5>
           <button onClick={() => closeAlert()} className="font-bold text-md">x</button>
        </div>
    )
}

export default Alert;