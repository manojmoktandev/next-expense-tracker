/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllCategoryByUser } from "@/api/category.api";
import SelectInput from "./select-input";
import { useQuery } from "@tanstack/react-query";
import { ICategoryResponse } from "@/interfaces/category.interface";
import React from "react";
import { Controller } from "react-hook-form";
import { LuAsterisk } from "react-icons/lu";

interface IProps {
	control: any;
	required?: boolean;
	error?:string
    label:string;
    defaultValue?:string;
}

const SelectCategory: React.FC<IProps> = ({error, required = false,label, defaultValue,control }) => {
	const { data } = useQuery({
		queryFn: getAllCategoryByUser,
		queryKey: ["get-all-user-category"],
	});

	const options = data?.data.map((category: ICategoryResponse) => ({
		label: category.name,
		value: category.id,
	}));

    const setDefaultOption = {label:'Clothing',value:'6859b26c5b2b704b2c48ae57'}


	return (
		<div>
			<div className="flex  gap-1/2 mb-1">
				<label  className=" text-lg  ">
					{label}
				</label>
				{required && <LuAsterisk size={18} className="text-red-500" />}
			</div>

			<Controller
				control={control}
				name={"category"}
				render={({ field: { onChange }}) => (
					<SelectInput
						placeholder={"Select category"}
						onChange={onChange}
						options={options}
                        defaultValue={defaultValue}
						error={error}
					/>
				)}
			/>
		</div>
	);
};

export default SelectCategory;