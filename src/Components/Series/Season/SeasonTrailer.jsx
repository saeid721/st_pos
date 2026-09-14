import React, { useEffect, useState } from 'react';
import { Button } from '../../ui/button';
import MovieTrailerLanguageForm from '../../Pages/Movie/MovieTrailerLanguageForm';
import SeasonTrailerLanguageForm from './SeasonTrailerLanguageForm';


const SeasonTrailer = ({ seasonData, refetch }) => {
    const [forms, setForms] = useState([{ id: Date.now() }]);

    useEffect(() => {
        if (seasonData?.trailers) {
            setForms(
                seasonData?.trailers?.map((item) => ({
                    id: item.id,
                    language_id: item.language_id,
                    url: item.url,
                    is_existed: true,
                }))
            );
        }
    }, [seasonData]);

    return (
        <div className=" border border-green-300  p-4 rounded-md shadow shadow-green-300">
            <h2 className="font-semibold text-white bg-green-500 text-center py-2">Upload Trailer</h2>
            <hr className="mt-3" />
            <div  className='grid md:grid-cols-2 md:gap-3'>
                {forms?.map((section) => (
                    <SeasonTrailerLanguageForm
                        section={section}
                        refetch={refetch}
                        seasonData={seasonData}
                    />
                ))}
            </div>

            <Button
                type="button"
                className="bg-[#2377E7] text-white w-[90px] h-[38px] flex justify-center items-center mt-4"
                onClick={() => setForms([...forms, { id: Date.now(), file: null }])}
            >
                Add More
            </Button>
        </div>
    );
};

export default SeasonTrailer;
