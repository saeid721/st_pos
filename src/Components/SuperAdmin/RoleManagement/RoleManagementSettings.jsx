import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import Switch from "react-switch";
import {
  useAssignRolePermissionsMutation,
  useGetRolesByIdQuery,
} from "../../../store/api/app/Roles/rolesApiSlice";
import useSubmit from "../../Shared/Constant/hooks/useSubmit";
import ListLoading from "../../Shared/skeleton/ListLoading";
import Button from "../../Shared/ui/Button";

const RoleManagementSettings = ({ clickedRoleId }) => {
  const [permissions, setPermissions] = useState([]);

  const { data, isLoading: singleRoleLoading } =
    useGetRolesByIdQuery(clickedRoleId);

  const {
    register,
    unregister,
    control,
    errors,
    reset,
    handleSubmit,
    onSubmit,
    watch,
    isLoading,
    setValue,
  } = useSubmit(
    clickedRoleId,
    clickedRoleId
      ? useAssignRolePermissionsMutation
      : useAssignRolePermissionsMutation,
    false
  );

  console.log("roleById", data);

  const permissionList = [
    {
      group: "ADMIN",
      permissions: [
        "CREATE_ADMIN", 
        "UPDATE_ADMIN", 
        "DELETE_ADMIN", 
        "READ_ADMIN"
      ],
    },
    {
      group: "Role",
      permissions: [
        "CREATE_ROLE",
        "UPDATE_ROLE",
        "DELETE_ROLE",
        "READ_ROLE",
        "READ_ROLE_PERMISSION",
        "ASSIGN_ROLE_PERMISSION",
      ],
    },
    {
      group: "FEATURE",
      permissions: [
        "CREATE_FEATURE",
        "UPDATE_FEATURE",
        "DELETE_FEATURE",
        "READ_FEATURE",
      ],
    },
    {
      group: "PLAN",
      permissions: [
        "CREATE_PLAN",
        "UPDATE_PLAN",
        "DELETE_PLAN",
        "READ_PLAN",
      ],
    },
    {
      group: "STORE",
      permissions: [
        "CREATE_STORE",
        "UPDATE_STORE",
        "DELETE_STORE",
        "READ_STORE",
      ],
    },
    // {
    //   group: "Subscription",
    //   permissions: [
    //     "CREATE_SUBSCRIPTION",
    //     "UPDATE_SUBSCRIPTION",
    //     "DELETE_SUBSCRIPTION",
    //     "READ_SUBSCRIPTION",
    //   ],
    // },

    // {
    //   group: "Subscriber",
    //   permissions: [
    //     "CREATE_SUBSCRIBER",
    //     "UPDATE_SUBSCRIBER",
    //     "DELETE_SUBSCRIBER",
    //     "READ_SUBSCRIBER",
    //   ],
    // },
    // {
    //   group: "Application Features",
    //   permissions: [
    //     "CREATE_APPLICATION_FEATURE",
    //     "UPDATE_APPLICATION_FEATURE",
    //     "DELETE_APPLICATION_FEATURE",
    //     "READ_APPLICATION_FEATURE",
    //   ],
    // },
    // {
    //   group: "Social",
    //   permissions: [
    //     "CREATE_SOCIAL",
    //     "UPDATE_SOCIAL",
    //     "DELETE_SOCIAL",
    //     "READ_SOCIAL",
    //   ],
    // },

    // {
    //   group: "Footer",
    //   permissions: [
    //     "CREATE_FOOTER",
    //     "UPDATE_FOOTER",
    //     "DELETE_FOOTER",
    //     "READ_FOOTER",
    //   ],
    // },

    // {
    //   group: "Application Settings",
    //   permissions: ["UPDATE_APPLICATION_SETTING", "READ_APPLICATION_SETTING"],
    // },
  ];

  const handleFormSubmit = async () => {
    const submissionData = {
      permissions,
    };

    // console.log("submissionData", submissionData);
    // return;
    await onSubmit(submissionData);
  };

  useEffect(() => {
    if (!!data?.data?.permissions?.length) {
      setPermissions([
        ...data?.data?.permissions?.map((permission) => permission.name),
      ]);
    } else {
      setPermissions([]); // Reset permissions when data is not available
    }
  }, [data, clickedRoleId]);

  if (singleRoleLoading) return <ListLoading />;

  return (
    <div className="border border-teal-100 shadow-md px-5 py-5 rounded-xl">
      <div>
        <h1 className="text-xl font-semibold text-gray-700">
          Role Management Settings
        </h1>

        <hr className="mt-5 mb-8" />

        <div className="">
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div>
              {permissionList.map((groupData, index) => (
                <div
                  key={index}
                  className="grid md:grid-cols-2 gap-5 py-3 border-t border-gray-200"
                >
                  <div>
                    <p className="font-semibold mb-3 text-gray-500">
                      {groupData.group}
                    </p>
                  </div>
                  <div>
                    {groupData.permissions.map((permission, idx) => (
                      <div key={idx} className="flex items-center mb-3 gap-3">
                        <Switch
                          // onChange={() => handleToggle(groupData.group, permission)}
                          onChange={() => {
                            setPermissions(
                              permissions.includes(permission)
                                ? permissions.filter((p) => p !== permission)
                                : [...permissions, permission]
                            );
                          }}
                          checked={permissions?.includes(permission)}
                          offColor="#f00"
                          onColor="#0f0"
                          height={20}
                          width={40}
                        />
                        <p className="text-gray-500 mr-3 text-sm">
                          {permission}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-3 rtl:space-x-reverse mt-6">
              <Button
                className="bg-[#FF5B14] text-white w-[90px] h-[38px] flex justify-center items-center"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#2377E7] text-white w-[90px] h-[38px] flex justify-center items-center"
                disabled={isLoading}
              >
                {isLoading ? <Loader /> : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RoleManagementSettings;
