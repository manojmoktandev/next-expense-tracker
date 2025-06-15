import { jwtDecode } from "jwt-decode";
/* eslint-disable @typescript-eslint/no-explicit-any */

const ParseToken = (token:string)=>{
    try {
        const docoded:{exp:number,role:string} =  jwtDecode(token);
        const now =  Math.floor(Date.now()/1000);
        if(docoded?.exp && docoded?.exp < now){
            return {
                valid: false
            }
        }
        return {
            valid:true,
            role:docoded?.role
        }
        
    } catch (error:any) {
        return {
            valid:false
        }
    }
}
export default ParseToken