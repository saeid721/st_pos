import { useGetPermissionsQuery } from '../store/api/app/SuperAdmin/superAdminApiSlice';

const hasPermission = (permission = '') => {
	const { data } = useGetPermissionsQuery();
	const permissions = data?.data?.map((permission) => permission.name) || [];

	if (Array.isArray(permission)) {
		return permission.some((permission) =>
			permissions.includes(permission.toUpperCase())
		);
	}

	return permissions.includes(permission.toUpperCase());
};

export default hasPermission;
