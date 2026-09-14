import React, { useEffect, useState } from "react";
import ListLoading from "../../Shared/skeleton/ListLoading";
import { MdAccountCircle } from "react-icons/md";
import RoleManagementSettings from "./RoleManagementSettings";
import { useGetRolesQuery } from "../../../store/api/app/Roles/rolesApiSlice";

const RoleManagementList = () => {
  const { data, isError, isLoading } = useGetRolesQuery();

  const [clickedRoleId, setClickedRoleId] = useState(null);

  useEffect(() => {
    if (data?.data?.length > 0) {
      setClickedRoleId(data.data[0].id);
    }
  }, [data]);

  if (isLoading) return <ListLoading />;

  return (
    <div className="grid md:grid-cols-4 gap-5">
      <div className="">
        {data?.data?.map((role) => (
          <div
            key={role.id}
            className={`flex items-center gap-1 mb-3 border border-teal-100 px-5 py-5 rounded-xl cursor-pointer 
                                ${
                                  clickedRoleId === role.id
                                    ? "bg-teal-100"
                                    : "bg-white"
                                }`}
            onClick={() => setClickedRoleId(role?.id)}
          >
            <MdAccountCircle className="text-teal-500 text-3xl" />
            <h2 className="font-semibold text-gray-700">{role.name}</h2>
          </div>
        ))}
      </div>

      <div className="md:col-span-3">
        <RoleManagementSettings clickedRoleId={clickedRoleId} />
      </div>
    </div>
  );
};

export default RoleManagementList;
