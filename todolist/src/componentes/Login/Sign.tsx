import { AppContext } from "../../App";
import { useContext, useEffect } from "react";
import { Signup } from "./Signup";
import { Signin } from "./Signin";
export const Sign = () => 
{
    const {optionUser} = useContext(AppContext);
    useEffect(() => 
    {
        localStorage.removeItem('token')
    }, [])
    return (
        <div className="main-conteiner">
            {optionUser == false && <Signup/>}
            {optionUser == true && <Signin/>}
        </div>
    );
}