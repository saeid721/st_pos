import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const useSubmit = (id, hook, redirect) => {
	const navigate = useNavigate();
	const { id: series_id, season_id } = useParams();

	const {
		register,
		unregister,
		control,
		formState: { errors },
		reset,
		handleSubmit,
		setValue,
		watch,
	} = useForm();

	const [submit, { isLoading, isSuccess, isError, error }] = hook();

	const onSubmit = async (preparedData) => {
		try {
			// const { data } = await (id
			// 	? submit({ id, data: preparedData })
			// 	: submit(preparedData));

			const response = id
				? await submit({ id, data: preparedData }).unwrap()
				: await submit(preparedData).unwrap();

			const data = response?.data;


			console.log("response::", response);
			console.log("helloData:::::", data);
			console.log("preparedData", preparedData);

			if (response?.status !== 'success') {
				throw new Error(response?.message || 'Error occurred from server!');
			}

			navigate(redirect ? redirect : -1);
			reset();
			toast.success(response?.message);
			return true;
		}
		catch (error) {
			console.log('Error:', error);
			const message =
				error?.data?.message ||
				error?.error ||
				error?.message ||
				'Something went wrong!';
			toast.error(message);
			return false;
		}
	};

	return {
		register,
		unregister,
		control,
		errors,
		reset,
		handleSubmit,
		watch,
		setValue,
		onSubmit,
		isLoading,
	};
};

export default useSubmit;
