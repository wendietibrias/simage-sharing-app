
type InputProps = {
    name:string;
    placeholder:string;
    type:string;
    register:any;
    error:boolean;
    showlable:boolean;
}

const Input = ({
   name,
   placeholder,
   type,
   register,
   error,
   showlable
} : InputProps) => {
   return (
      <div className="flex flex-col gap-y-2 w-full">
         {showlable && <label className="text-sm text-navy-700 dark:text-gray-500 font-semibold capitalize">{name}</label>}
         <input type={type} id={name} placeholder={placeholder} {...register(name,{ required:true })} name={name} className={` flex h-12 w-full items-center justify-center rounded-lg border bg-white/0 p-3 text-sm outline-none ${error ? "border-rose-500" : "border-gray-200"}`}/>
         {error && <p className="text-rose-500 text-[12px] font-semibold">{name} field is required</p>}
      </div>
   )
}

export default Input;