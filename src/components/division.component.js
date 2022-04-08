import React, { useState, useEffect  } from 'react';
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';


export default function Division() {
    const [fuels, setFuels] = useState([]);
    const [divisions, setDivisions] = useState([]);


    useEffect(()=>{
        UserService.getUserBoard().then(
            (response)=>{
                setFuels(JSON.parse(JSON.stringify(response.data.Fuels)));
                setDivisions(JSON.parse(JSON.stringify(response.data.Divisions)));
            },
            (error)=>{
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                if (error.response && error.response.status === 403) {
                    AuthService.logout();
                    window.open("/login");
                    window.location.reload();
                }
            }
        );
    },[])

    const varChange = (index,type,value)=>{
        const newState = divisions.map((item, i) => {
            if (i === index) {
                return {...item, [type]: value};
            }
            return item;
        });
        setDivisions(newState);
    }


    return (
        <div>
            {divisions.length>0&&<div>
                <div>
                    <p>Please type a day:</p>
                    <DayPickerInput onDayChange={day => console.log(day)} />
                </div>
                <table className="table table-bordered">
                <thead>
            <tr>
                <th>#</th>
                <th>Подразделение</th>
                <th>Последние показания</th>
                <th>Ежесуточный расход</th>
                <th>Топливо</th>
            </tr>
            </thead>
                <tbody>
                    {divisions.map((x,index)=>{
                    return <tr key={x.IdDivision}>
                        <td>{index+1}</td>
                    <td>{x.NameDivision}</td>
                    <td><input onChange={(e)=>varChange(index,"Balance",e.target.value)} className="form-control" type="number" value={x.Balance}></input></td>
                    <td><input onChange={(e)=>varChange(index,"Consumption",e.target.value)} className="form-control" type="number" value={x.Consumption}></input></td>
                        <td><select className="form-select" aria-label="Default select example">
                            {fuels.map(function ({Fuel, IdFuel}) {
                                if (x.Kind === IdFuel) {
                                    return <option selected={IdFuel}>{Fuel}</option>
                                } else
                                    return <option value={IdFuel}>{Fuel}</option>
                            })}
                        </select></td>
                    </tr>})}
                </tbody>
            </table>
                <button type="button" className="btn btn-primary">Primary</button>
            </div>}
        </div>
    );
}