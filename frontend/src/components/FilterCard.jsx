import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
    },
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState(""); // State to track selected value
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        // If the clicked value is already selected, unselect it (show all jobs)
        if (selectedValue === value) {
            setSelectedValue(""); // Deselect the current selection
        } else {
            setSelectedValue(value); // Otherwise, select the new value
        }
    };

    useEffect(() => {
        // Dispatching the selected value to the redux store
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <div className="w-full bg-white p-5 rounded-2xl shadow-lg border border-gray-100 sticky top-24 md:top-20">
            <h1 className="text-xl font-bold text-gray-800 mb-4">Filter Jobs</h1>

            {/* Adding the Show All Jobs option inside the RadioGroup */}
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                <div className="mb-4">
                    <h2 className="text-md font-semibold text-gray-700 mb-2">Show All Jobs</h2>
                    <div className="flex items-center space-x-2 mb-4">
                        <RadioGroupItem value="" id="all-jobs" />
                        <Label htmlFor="all-jobs" className="text-gray-600">
                            All Jobs
                        </Label>
                    </div>
                </div>

                {/* Existing filter options */}
                {filterData.map((data, index) => (
                    <div key={index} className="mb-6">
                        <h2 className="text-md font-semibold text-gray-700 mb-2">{data.filterType}</h2>
                        {data.array.map((item, idx) => {
                            const itemId = `id${index}-${idx}`;
                            return (
                                <div className="flex items-center space-x-2 mb-2" key={itemId}>
                                    <RadioGroupItem value={item} id={itemId} />
                                    <Label htmlFor={itemId} className="text-gray-600">
                                        {item}
                                    </Label>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};

export default FilterCard;
