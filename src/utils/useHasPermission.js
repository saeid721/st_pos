import { useGetPermissionsQuery } from "../store/api/app/SuperAdmin/superAdminApiSlice";

const useHasPermission = (permission = "") => {
  const { data } = useGetPermissionsQuery();
  const permissions = data?.data?.map((perm) => perm.name.toUpperCase()) || [];

  if (Array.isArray(permission)) {
    return permission.some((perm) => permissions.includes(perm.toUpperCase()));
  }

  return permissions.includes(permission.toUpperCase());
};

export default useHasPermission;
