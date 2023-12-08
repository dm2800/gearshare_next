import useAppStore from "@/app/store/useAppStore";
import { useEffect } from "react";

import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

const DateSelect = () => {

    const {date, setDate, daysTotal, setDaysTotal} = useAppStore(); 


    const calculateRate = () => {
        const startDate = date[0].startDate;
        const endDate = date[0].endDate;
        const diffTime = Math.abs(endDate - startDate);

        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        console.log(diffDays);

        setDaysTotal(diffDays);
    };

    useEffect(() => {
        if (date[0].endDate !== null) {
            calculateRate();
            console.log(date); 
        }
    }, [date]);

    //disabled dates test:

    // const disabledDates = [new Date(2023, 11, 15), new Date(2023, 11, 17)];

    return (
        <div className="text-center desc_card2">
            <h1 className="text-[30px] text-indigo-900 my-3"> Select Dates</h1>
            <DateRange
                editableDateInputs={true}
                onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                disabledDates={[]}
                rangeColors={["#8742f5", "#8742f5"]}
            />
            <section className="flex mx-auto mt-4 w-3/4 justify-around">
                <div className="date_box">
                    <p className="font-semibold">Start Date:</p>

                    <p>{date[0].startDate.toLocaleDateString()}</p>
                </div>
                <div className="date_box">
                    <p className="font-semibold">End Date:</p>

                    <p>
                        {date[0].endDate
                            ? date[0].endDate.toLocaleDateString()
                            : "-"}
                    </p>
                </div>
            </section>
        </div>
    );
};

export default DateSelect;
