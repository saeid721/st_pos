import ProgressBar from '@ramonak/react-progress-bar';
import axios from 'axios';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';
import { useEffect, useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import { Controller, useForm } from 'react-hook-form';
import { MdDeleteForever } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import envConfig from '../../../configs/envConfig';
import { useGetLanguagesQuery } from '../../../store/api/app/Languages/languagesApiSlice';

import useDelete from '../../Shared/Constant/hooks/useDelete';
import Player from '../../Shared/Player/Player';
import CustomReactSelect from '../../Shared/Select/CustomReactSelect';
import { Button } from '../../ui/button';
import { useDeleteSeasonTrailerMutation } from '../../../store/api/app/Series/seasonApiSlice';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const SeasonTrailerLanguageForm = ({ section, refetch, seasonData }) => {
	const { id, season_id } = useParams();
    
    const params = useParams();
    
    console.log("params", params);

	const { data: languagesData, isLoading: isLanguageLoading } =
		useGetLanguagesQuery();

	const { handleDelete: handleTrailerDelete } = useDelete(
		useDeleteSeasonTrailerMutation
	);

	const {
		control,
		formState: { errors },
		register,
		handleSubmit,
		reset,
	} = useForm();

	const [progress, setProgress] = useState(0);
	const [uploadComplete, setUploadComplete] = useState(false); // New state for upload completion
	const CHUNK_SIZE = 1024 * 1024 * 1; // 1MB

	const uploadFile = async (API_URL, file) => {
		const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

		// Loop through each chunk, uploading sequentially
		for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
			const start = chunkIndex * CHUNK_SIZE;
			const end = Math.min(file.size, start + CHUNK_SIZE);

			const chunk = file.slice(start, end);
			const base64Data = await readFileAsBase64(chunk);

			try {
				await uploadChunk(
					API_URL,
					base64Data,
					file.name,
					chunkIndex,
					totalChunks
				);
				const newProgress = ((chunkIndex + 1) / totalChunks) * 100;
				setProgress(newProgress);

				// If progress reaches 100, mark the upload as complete
				if (newProgress === 100) {
					setUploadComplete(true);
				}
			} catch (error) {
				toast.error(
					error?.response?.data?.message ||
						error?.message ||
						'Something went wrong!'
				);
				console.error('Error uploading chunk:', error);
				break; // Stop uploading if there's an error
			}
		}
	};

	const readFileAsBase64 = (fileChunk) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
			reader.readAsDataURL(fileChunk); // Read chunk as base64 with prefix
		});
	};

	const uploadChunk = async (
		API_URL,
		base64Data,
		filename,
		chunkIndex,
		totalChunks
	) => {
		// Ensure the chunk is sent in the correct sequence
		await axios.post(API_URL, base64Data, {
			headers: {
				'Content-Type': 'application/octet-stream',
			},
			params: {
				filename,
				currentChunkIndex: chunkIndex,
				totalChunks,
			},
		});
	};

	const onSubmit = async (data) => {
		const { language_id, movie_file } = data;

		const api = `${envConfig.apiUrl}/seasons/${season_id}/upload/trailer/languages/${language_id}`;

		setProgress(0); // Reset progress for new upload
		setUploadComplete(false); // Reset upload complete status
		await uploadFile(api, movie_file);
		await refetch();
	};

	useEffect(() => {
		if (section.is_existed) {
			reset({
				language_id: section.language_id,
			});
		}
	}, [section]);

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				key={section.id}
				className="shadow-sm shadow-teal-200 p-3 mb-4"
			>
				<CustomReactSelect
					control={control}
					error={errors?.language_id}
					name={'language_id'}
					label={'Language'}
					placeholder={'Select Language'}
					isDisabled={section.is_existed}
					required={true}
					options={
						languagesData?.data?.map((item) => ({
							value: item.id,
							label: item.name,
						})) || []
					}
					isLoading={isLanguageLoading}
				/>

				{/* FilePond for Movie Upload */}
				{section.is_existed ? (
					<div className="mt-4">
						<div className="flex justify-between align-top">
							<p className="text-sm font-semibold mb-2">Trailer</p>
							<MdDeleteForever
								className="text-red-500 text-3xl cursor-pointer"
								onClick={() => handleTrailerDelete(section.id)}
							/>
						</div>

						<Player
							poster={envConfig.apiUrl + seasonData?.thumbnail}
							video={`${envConfig.apiUrl}${section.url}`}
						/>
					</div>
				) : (
					<>
						{' '}
						<div className="mt-4">
							<p className="text-sm font-semibold mb-2">Upload Season Trailer</p>
							<Controller
								name="movie_file"
								control={control}
								render={({ field: { onChange, onBlur, value, name, ref } }) => (
									<FilePond
										allowMultiple={false}
										acceptedFileTypes={['video/*']}
										allowDrop={true}
										allowRemove={true}
										allowReplace={true}
										onupdatefiles={(fileItems) => {
											onChange(fileItems[0]?.file || null);
										}}
										disabled={progress > 0 && !uploadComplete} // Disable during upload unless complete
									/>
								)}
								rules={{
									required: 'Season is required!',
								}}
							/>
						</div>
						{errors.movie_file && (
							<div className={`mt-2 text-red-500 block text-sm`}>
								{errors.movie_file.message}
							</div>
						)}
						{/* Progress bar and completion message */}
						{progress > 0 && (
							<ProgressBar bgColor="#15803d" completed={Math.round(progress)} />
						)}
						{uploadComplete && (
							<p className="text-green-700 font-semibold mt-2">
								Upload Complete!
							</p>
						)}
						{/* Upload Button */}
						<Button
							className="bg-green-700 text-white mx-auto w-[90px] h-[38px] flex justify-center items-center mt-4"
							disabled={progress > 0 && !uploadComplete} // Disable button during upload unless complete
						>
							Upload
						</Button>
					</>
				)}
			</form>
		</>
	);
};

export default SeasonTrailerLanguageForm;
