import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateHomeSectionMutation,
  useUpdateHomeSectionMutation,
} from "../../../store/api/app/HomeSection/homeSectionApiSlice";
import useSubmit from "../../Shared/Constant/hooks/useSubmit";
import CustomReactSelect from "../../Shared/Select/CustomReactSelect";
import TextInput from "../../Shared/TextInput/TextInput";
import Button from "../../Shared/ui/Button";
import { Card } from "../../ui/card";
import SiteLanguageSelector from "../../Shared/Select/SiteLanguageSelector";

const HomeSectionForm = ({ id, data }) => {
  const navigate = useNavigate();

  const [selectedSiteLanguage, setSelectedSiteLanguage] = useState("english");

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
    id ? useUpdateHomeSectionMutation : useCreateHomeSectionMutation
  );

  const sectionType = watch("section_type");
  const subSectionType = watch("sub_section_type");
  const seriesId = watch("series_id");

  console.log("seriesId", seriesId);










  const handleFormSubmit = async (formData) => {
    const submissionData = {
      ...formData,
      section_type: formData?.section_type,
      sort_order: Number(formData?.sort_order),
      sub_section_type: formData.sub_section_type,
    };

    // Remove movie_id if section_type is 'slider_poster' and sub_section_type is 'movie'
    if (formData?.section_type !== "slider_poster" && formData?.sub_section_type === 'movie') {
      submissionData.movie_id = formData?.movie_id;
    } else {
      delete submissionData.movie_id; // Explicitly remove movie_id
    }

    // Remove series_id if section_type is 'slider_poster' and sub_section_type is 'series'
    if (formData?.section_type !== "slider_poster" && formData?.sub_section_type === 'series') {
      submissionData.series_id = formData?.series_id;
    } else {
      delete submissionData.series_id; // Explicitly remove series_id
    }

    // Remove season_id if section_type is 'slider_poster' and sub_section_type is 'series'
    if (formData?.section_type !== "slider_poster" && formData?.sub_section_type === 'series') {
      submissionData.season_id = formData?.season_id;
    } else {
      delete submissionData.season_id; // Explicitly remove season_id
    }


    console.log("submittedData", submissionData);
    // return
    await onSubmit(submissionData);
  };


  const sectionTypeOptions = [
    { value: "recent", label: "Recent" },
    { value: "genres", label: "Genres" },
    { value: "upcoming", label: "Upcoming" },
    { value: "poster", label: "Poster" },
    { value: "all_movies", label: "All Movies" },
    { value: "all_series", label: "All Series" },
    { value: "top_movies", label: "Top Movies" },
    { value: "top_series", label: "Top Series" },
    { value: "selected_movies", label: "Selected Movies" },
    { value: "selected_series", label: "Selected Series" },
    { value: "slider_poster", label: "Slider Poster" },
    { value: "application_features", label: "Application Features" },
    { value: "favorite_personalities", label: "Favourite Personalities" },
    { value: "blogs", label: "Blogs" },
    { value: "continue_watch", label: "Continue Watch" },
  ];

  const subSectionTypeOptions = [
    { value: "movie", label: "Movie" },
    { value: "series", label: "Series" },
  ];

  useEffect(() => {
    if (data) {
      const sectionTypeOption = sectionTypeOptions.find(
        (option) => option.value === data?.section_type
      );
      reset({
        ...data,
        // section_type: sectionTypeOption,
      });
    }
  }, [data, reset]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Card className="mt-[40px] py-[30px] px-[20px]">

        <SiteLanguageSelector
          selectedSiteLanguage={selectedSiteLanguage}
          setSelectedSiteLanguage={setSelectedSiteLanguage}
        />

        <div className="grid grid-cols-1 gap-5">
          {selectedSiteLanguage === "english" && (
            <TextInput
              name="title"
              label="Enter Title (English)"
              type="text"
              register={register}
              error={errors.title}
              placeholder="Enter Title"
              isHighlight={true}
            />
          )}

          {selectedSiteLanguage === "bangla" && (
            <TextInput
              name="title_bn"
              label="Enter Title (Bangla)"
              type="text"
              register={register}
              error={errors.title_bn}
              placeholder="Enter Title"
              required={false}
              isHighlight={true}
            />
          )}

          {selectedSiteLanguage === "hindi" && (
            <TextInput
              name="title_hi"
              label="Enter Title (Hindi)"
              type="text"
              register={register}
              error={errors.title_hi}
              placeholder="Enter Title"
              required={false}
              isHighlight={true}
            />
          )}

          {selectedSiteLanguage === "arabic" && (
            <TextInput
              name="title_ar"
              label="Enter Title (Arabic)"
              type="text"
              register={register}
              error={errors.title_ar}
              placeholder="Enter Title"
              required={false}
              isHighlight={true}
            />
          )}

          <CustomReactSelect
            control={control}
            name="section_type"
            label="Section Type"
            placeholder="Select Section Type"
            options={sectionTypeOptions}
            error={errors.section_type}
            required={true}

          />

          {(sectionType === "poster" || sectionType === "slider_poster") && (
            <div>
              <CustomReactSelect
                control={control}
                name="sub_section_type"
                label="Sub Section Type"
                placeholder="Select Sub Section Type"
                options={subSectionTypeOptions}
                error={errors.sub_section_type}
                required={true}
              />
            </div>
          )}

          {subSectionType === "movie" && sectionType !== "slider_poster" && (
            <div className="mt-3">
              <CustomReactSelect
                control={control}
                error={errors?.movie_id}
                name={"movie_id"}
                label={"Movies"}
                placeholder={"Select Movies"}
                required={true}
                isMulti={false}
                options={
                  moviesData?.data?.map((item) => ({
                    value: item.id,
                    label: item.title,
                  })) || []
                }
                isLoading={isMoviesLoading}
              />
            </div>
          )}


          {subSectionType === "series" && sectionType !== "slider_poster" && (
            <div className="mt-3">
              <CustomReactSelect
                control={control}
                error={errors?.series_id}
                name={"series_id"}
                label={"Series"}
                placeholder={"Select Series"}
                required={true}
                isMulti={false}
                options={
                  seriesData?.data?.map((item) => ({
                    value: item.id,
                    label: item.title,
                  })) || []
                }
                isLoading={isSeriesLoading}
              />
            </div>
          )}


          {subSectionType === "series" && sectionType !== "slider_poster" && (
            <div className="mt-3">
              <CustomReactSelect
                control={control}
                error={errors?.season_id}
                name={"season_id"}
                label={"Season"}
                placeholder={"Select Season"}
                required={true}
                isMulti={false}
                options={
                  seasonData?.data?.map((item) => ({
                    value: item.id,
                    label: item.season_number,
                  })) || []
                }
                isLoading={seasonLoading}
              />
            </div>
          )}



          <TextInput
            name="sort_order"
            label="Sort Order"
            type="number"
            register={register}
            error={errors.sort_order}
            placeholder="Sort Order"
          />
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

export default HomeSectionForm;
