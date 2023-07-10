import React, { useEffect, useState } from 'react'



function Countdown({data}) {
    let countdownTime_Target = new Date(data)
    let getTimeLeft = () => {
        const totalTimeLeft = countdownTime_Target - new Date();
        const Dias = Math.floor(totalTimeLeft / (1000 * 60 * 60 * 24));
        const Horas = Math.floor((totalTimeLeft / (1000 * 60 * 60)) % 24);
        const Minutos = Math.floor((totalTimeLeft / (1000 * 60)) % 60);
        const Segundos = Math.floor((totalTimeLeft / 1000) % 60);

        return { Dias, Horas, Minutos, Segundos }
    }
    const [timeLeft, setTimeLeft] = useState(() => getTimeLeft());


    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getTimeLeft());
        }, 1000);

        return () => {
            clearInterval(timer); 
        }
    }, []);
   
  return (
    <div className='countdown'>
        <div className='content'>
            {Object.entries(timeLeft).map((el) => {
                const label = el[0];
                const value2 = el[1];
                return (
                    <div className='box' key={label}>
                        <div className='value'>
                            <span>{value2}</span>
                        </div>
                        <span className='label'>{label}</span>
                    </div>
                );
            })}
            
            
        </div>
    </div>
  )
}

export default Countdown