import { create } from 'zustand';

type openAlertParams = {
    message: string;
    variant: string;
    open: boolean;
}

export type useAlertType = {
    message:string;
    variant:string;
    open:boolean;
    openAlert:({ message,variant,open } : openAlertParams) => void,
    closeAlert:() => void
}

const useAlert = create((set) => ({
     message:"",
     variant:"",
     open:false,
     openAlert: (data : openAlertParams) => set((state : useAlertType) => ({
         message:data.message,
         variant:data.variant,
         open:data.open
     })),
     closeAlert: () => set((state : useAlertType) => ({
          open:false,
          message:"",
          variant:""
     }))
}));

export default useAlert;