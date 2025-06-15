import React from "react";
import { CiEdit } from "react-icons/ci"
import { HiOutlineTrash } from "react-icons/hi"
import { IoEyeOutline } from "react-icons/io5";

type IProps = {
    onEdit:()=>void;
    onDelete:()=>void;
    onView?:()=>void;
}

const ActionButtons:React.FC<IProps> = ({onEdit,onDelete,onView})=>{
    return(
        <div className="flex w-full justify-center gap-3">
            {onView && <IoEyeOutline size = {20} className="text-blue-500 cursor-pointer" onClick={onView} />}
            <CiEdit title="Edit" onClick={onEdit} size={20} className="text-blue-500 cursor-pointer"/>
            <HiOutlineTrash title="Delete" onClick={onDelete} size={20} className="text-red-500 cursor-pointer"/>
        </div>
    )
}

export default React.memo(ActionButtons)
