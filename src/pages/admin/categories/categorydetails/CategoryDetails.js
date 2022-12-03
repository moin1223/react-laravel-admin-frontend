import React from 'react'
import { useParams } from 'react-router-dom';
import Loader from '../../../../components/shared/loader/Loader';
import { useGetCategoryQuery } from '../../../../features/api/apiSlice';

const CategoryDetails = () => {
    const { categoryId } = useParams();
    const { data: category, isLoading, isError, error} = useGetCategoryQuery(categoryId);
    console.log(category)

    let content = null;
    if (isLoading) {
        content = <Loader />
    }

    if (!isLoading && isError) {
        <p className='alert alert-danger text-center mt-5' role="alert">{error}</p>
    }

    if (!isLoading && !isError && category?.id) {
        content = <div>
            <h2 className="text-center">User Profile</h2>
            <div className="row justify-content-center">
                <div className="col-sm-6">
                    <div className="card p-4">
                        <h4>Name</h4>
                        <p>{category.category_name}</p>
                    </div>
                </div>

            </div>
        </div>
    }

    return (
        content
    )
}

export default CategoryDetails