import { useGetStoreUserPermissionsQuery } from '../store/api/app/StoreUser/StoreUserApiSlice';

const hasStorePermission = (permission = '') => {
	const { data } = useGetStoreUserPermissionsQuery();
	const permissions = data?.data?.map((permission) => permission.name) || [];

	// console.log("permissions:", permissions);


	if (Array.isArray(permission)) {
		return permission.some((permission) =>
			permissions.includes(permission.toUpperCase())
		);
	}

	return permissions.includes(permission.toUpperCase());
};

export default hasStorePermission;
