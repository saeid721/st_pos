import React, { useEffect } from "react";
import { Card } from "../../ui/card";
import TextInput from "../../Shared/TextInput/TextInput";
import Button from "../../Shared/ui/Button";
import { Loader } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import useSubmit from "../../Shared/Constant/hooks/useSubmit";

import CustomReactSelect from "../../Shared/Select/CustomReactSelect";
import {
  useCreateHomeSectionDetailsMutation,
  useUpdateHomeSectionDetailsMutation,
} from "../../../store/api/app/HomeSection/homeSectionDetailsApiSlice";
import { useGetHomeSectionByIdQuery } from "../../../store/api/app/HomeSection/homeSectionApiSlice";
import LanguageWiseInputBox from "../../Shared/Select/LanguageWiseInputBox";
import { toast } from "react-toastify";

const HomeSectionDetailsForm = ({ id, data }) => {
  const navigate = useNavigate();
  const { id: paramsID } = useParams();

  // Get Selected type based on section Type
  const { data: homeSection } = useGetHomeSectionByIdQuery(paramsID);

  console.log("homeSection", homeSection);

  const sectionType = homeSection?.data?.section_type;

  console.log("sectionType", sectionType);

  const {
    register,
    control,
    errors,
    reset,
    watch,
    handleSubmit,
    onSubmit,
    isLoading,
  } = useSubmit(
    id,
    id
      ? useUpdateHomeSectionDetailsMutation
      : useCreateHomeSectionDetailsMutation
  );

  const subSectionType = watch("sub_section_type");
  const seriesUploadType = watch('series_upload_type')
  const seriesId = watch('series_id')
  const seasonId = watch('season_id')

  console.log("seriesUploadType", seriesUploadType);



  // const handleFormSubmit = async (data) => {
  //   const payload = {
  //     ...data,
  //     home_section_id: parseInt(paramsID),
  //   };

  //   // Remove movie_id if section_type is 'slider_poster'
  //   if (data?.sub_section_type === "cast") {
  //     payload.cast_id = data?.cast_id;
  //     delete payload.director_id;
  //   } else {
  //     payload.director_id = data?.director_id;
  //     delete payload.cast_id;
  //   }

  //   // console.log("payload",payload);
  //   // return
  //   await onSubmit(payload);
  // };


  const handleFormSubmit = async (formData) => {
    const formDataToSubmit = new FormData();

    // Append all form data to the FormData object
    Object.keys(formData).forEach((key) => {
      if (["thumbnail"].includes(key)) {
        // Append file input (like thumbnail) if it exists
        if (formData[key]?.length > 0) {
          formDataToSubmit.append(key, formData[key][0]);
        }
      } else if (formData[key] !== undefined) {
        // Append other form fields
        formDataToSubmit.append(key, formData[key]);
      }
    });

    // Append the home section ID
    formDataToSubmit.append("home_section_id", parseInt(paramsID));

    // Handling cast_id and director_id based on sub_section_type
    if (formData?.sub_section_type === "cast") {
      formDataToSubmit.append("cast_id", formData?.cast_id);
    } else if (formData?.sub_section_type === "director") {
      formDataToSubmit.append("director_id", formData?.director_id);
    }

    try {
      // Submit the form data
      await onSubmit(formDataToSubmit);
    } catch (err) {
      console.error("Failed to submit form:", err);
      toast.error("Failed to submit form.");
    }
  };




  const subSectionTypeOptions = [
    { value: "movie", label: "Movie" },
    { value: "series", label: "series" },
    { value: "cast", label: "Cast" },
    { value: "director", label: "Director" },
  ];


  const seriesUploadTypeOptions = [
    { value: "seriesType", label: "Series" },
    { value: "seasonType", label: "Season" },
    { value: "episodeType", label: "Episode" },
  ];


  useEffect(() => {
    const { thumbnail, ...rest } = data || {};
    reset({ ...rest });
  }, [data, reset]);



  if (id && isLoadingMovies && isLoadingGenres) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Card className="mt-[40px] py-[30px] px-[20px]">
        <div className="grid grid-cols-1 gap-5">


          <div>
            { ( sectionType === "recent" || sectionType === "top_movies" || sectionType === "top_series"  ) && <LanguageWiseInputBox
              name="title"
              name_bn="title_bn"
              name_hi="title_hi"
              name_ar="title_ar"
              register={register}
              errors={errors}
            />}

            { ( sectionType === "recent" || sectionType === "top_movies" || sectionType === "top_series" ) && <div className="grid grid-cols-1 gap-4">
              <TextInput
                name="thumbnail"
                label="Upload Thumbnail"
                type="file"
                register={register}
                error={errors.thumbnail}
                imgUrl={data?.thumbnail}
              />
            </div>}


            {(sectionType === "recent" || sectionType === "favorite_personalities" ) && <CustomReactSelect
              control={control}
              name="sub_section_type"
              label="Sub Section Type"
              placeholder="Select Sub Section Type"
              options={subSectionTypeOptions}
              error={errors.sub_section_type}
              required={true}
            />}




            {(subSectionType === "series" || homeSection?.data?.sub_section_type === "series" ) && <CustomReactSelect
              control={control}
              error={errors?.series_upload_type}
              name="series_upload_type"
              label="Series Upload Type "
              placeholder="Series Upload Type"
              required={true}
              options={seriesUploadTypeOptions}
            />}


            {(seriesUploadType === "seriesType" || seriesUploadType === "seasonType" || seriesUploadType === "episodeType" || sectionType === "top_series") && (
              <CustomReactSelect
                control={control}
                error={errors?.series_id}
                name="series_id"
                label="Series"
                placeholder="Select Series"
                required={true}
                options={
                  seriesData?.data?.map((item) => ({
                    value: item.id,
                    label: item.title,
                  })) || []
                }
                isLoading={isLoadingSeries}
              />
            )}


            {(seriesUploadType === "seasonType" || seriesUploadType === "episodeType") &&
              <CustomReactSelect
                control={control}
                error={errors?.season_id}
                name="season_id"
                label="Season"
                placeholder="Select Season"
                required={true}
                options={
                  seasonsData?.data?.map((item) => ({
                    value: item.id,
                    label: item.season_number,
                  })) || []
                }
                isLoading={isLoadingSeasons}
              />
            }


            {(seriesUploadType === "episodeType") &&
              <CustomReactSelect
                control={control}
                error={errors?.episode_id}
                name="episode_id"
                label="Episode"
                placeholder="Select Episode"
                required={true}
                options={
                  episodesData?.data?.map((item) => ({
                    value: item.id,
                    label: item.title,
                  })) || []
                }
                isLoading={isLoadingEpisodes}
              />
            }

          </div>






          {sectionType === "genres" && (
            <div>
              <CustomReactSelect
                control={control}
                error={errors?.movie_id}
                name="genre_id"
                label="Genres"
                placeholder="Select Genre"
                required={true}
                options={
                  genresData?.data?.map((item) => ({
                    value: item.id,
                    label: item.name,
                  })) || []
                }
                isLoading={isLoadingGenres}
              />
            </div>
          )}

          {( sectionType === "selected_movies" || subSectionType === "movie" || sectionType === "top_movies" || ( sectionType === 'recent' && homeSection?.data?.sub_section_type === "movie") ||
            (sectionType === "slider_poster" &&
              homeSection?.data?.sub_section_type === "movie")) && (
              <div>
                <CustomReactSelect
                  control={control}
                  error={errors?.movie_id}
                  name="movie_id"
                  label="Movie"
                  placeholder="Select Movie"
                  required={true}
                  options={
                    moviesData?.data?.map((item) => ({
                      value: item.id,
                      label: item.title,
                    })) || []
                  }
                  isLoading={isLoadingMovies}
                />
              </div>
            )}

          {(sectionType === "selected_series" ||
            (sectionType === "slider_poster" &&
              homeSection?.data?.sub_section_type === "series")) && (
              <div>
                <CustomReactSelect
                  control={control}
                  error={errors?.movie_id}
                  name="series_id"
                  label="Series"
                  placeholder="Select Series"
                  required={true}
                  options={
                    seriesData?.data?.map((item) => ({
                      value: item.id,
                      label: item.title,
                    })) || []
                  }
                  isLoading={isLoadingSeries}
                />
              </div>
            )}



          {sectionType === "favorite_personalities" && (
            <div>


              <div>
                {subSectionType === "cast" && (
                  <div className="mt-5">
                    <CustomReactSelect
                      control={control}
                      error={errors?.cast_id}
                      name="cast_id"
                      label="Casts"
                      placeholder="Select Cast"
                      required={true}
                      options={
                        castsData?.data?.map((item) => ({
                          value: item.id,
                          label: item.name,
                        })) || []
                      }
                      isLoading={isLoadingCasts}
                    />
                  </div>
                )}

                {subSectionType === "director" && (
                  <div className="mt-5">
                    <CustomReactSelect
                      control={control}
                      error={errors?.director_id}
                      name="director_id"
                      label="Directors"
                      placeholder="Select Director"
                      required={true}
                      options={
                        directorsData?.data?.map((item) => ({
                          value: item.id,
                          label: item.name,
                        })) || []
                      }
                      isLoading={isLoadingDirectors}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="ltr:text-right rtl:text-left space-x-3 rtl:space-x-reverse mt-6">
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
      </Card>
    </form>
  );
};

export default HomeSectionDetailsForm;
