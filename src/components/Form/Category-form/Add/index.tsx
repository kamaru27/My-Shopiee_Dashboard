"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CheckboxFive from "@/components/FormElements/Checkboxes/CheckboxFive";
import CheckboxFour from "@/components/FormElements/Checkboxes/CheckboxFour";
import CheckboxOne from "@/components/FormElements/Checkboxes/CheckboxOne";
import CheckboxThree from "@/components/FormElements/Checkboxes/CheckboxThree";
import CheckboxTwo from "@/components/FormElements/Checkboxes/CheckboxTwo";
import SwitcherFour from "@/components/FormElements/Switchers/SwitcherFour";
import SwitcherOne from "@/components/FormElements/Switchers/SwitcherOne";
import SwitcherThree from "@/components/FormElements/Switchers/SwitcherThree";
import SwitcherTwo from "@/components/FormElements/Switchers/SwitcherTwo";
import DatePickerTwo from "@/components/FormElements/DatePicker/DatePickerTwo";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import MultiSelect from "@/components/FormElements/MultiSelect";
import SelectGroupTwo from "@/components/FormElements/SelectGroup/SelectGroupTwo";
import { appendErrors, Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { any, string, z } from "zod";
import { useState } from "react";
import { brandApi } from "@/api/brandApi";
import { categoryApi } from "@/api/categoryApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { serialize } from "object-to-formdata";
import DropzoneWrapper from "@/components/file-upload/dropZone";
import { Typography } from "@mui/material";
import FileUploaderSingle from "@/components/file-upload/singleFileUpload";
import { PackageNavigation } from "@/types/packageNavigation";

const mySchema = z.object({
  categoryName: string().trim().min(1, { message: "Product Name is required." }),
  categoryDescription: string().trim(),
  categoryImage: any().refine((file) => file?.size <= MAX_FILE_SIZE, 'Max image size is 5MB.')
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    "Only .jpg, .jpeg, .png and .webp formats are supported."),
});

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png","image/webp"];

type TMySchema = z.infer<typeof mySchema>;

const packageData: PackageNavigation[] = [
  {
    name:'Dashboard / ',
    link:'/'
  },
  {
    name:'Categories / ',
    link:'/admin/categories'
  },
  {
    name:'Add ',
    link:''
  },
];

const CategoryAddForm = () => {
  //     const [tasks, setTask] = useState([])
  //   const [input, setInput] = useState()

  //   function click() {
  //     if (input) {
  //       let array = [...tasks, input];
  //       setTask(array);
  //       setInput();
  //     }
  //   }

  const [internal, setInternal] = useState(false);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TMySchema>({ resolver: zodResolver(mySchema) });

  const submitData = async (data: any) => {
    try {
      const formData = serialize(data)
      const response = await categoryApi.createCategory(formData);

      if (response.data.success == true) {
        toast.success(response.data.message);
        router.push("/admin/categories");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Breadcrumb pageName="ADD FORM" navigation={packageData}/>
      <div className="gap-9 sm:grid-cols-2">
        <form onSubmit={handleSubmit(submitData)}>
          <div className="flex flex-col gap-9">
            {/* <!-- Input Fields --> */}
            <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
              <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
                <h3 className="font-medium text-dark dark:text-white">
                  Add Category
                </h3>
              </div>
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Category Name
                  </label>
                  <input
                    {...register("categoryName")}
                    type="text"
                    placeholder="Category Name"
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                  />
                  {errors.categoryName && (
                    <p className="text-sm text-red-600">
                      {errors.categoryName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Category Description
                  </label>
                  <textarea
                    {...register("categoryDescription")}
                    rows={6}
                    placeholder="Product Description"
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                  ></textarea>
                  {errors.categoryDescription && (
                    <p className="text-sm text-red-600">
                      {errors.categoryDescription.message}
                    </p>
                  )}
                </div>
                <div>
                <DropzoneWrapper>
                  <Typography variant='text-body-sm' fontWeight={500} color="textPrimary" sx={{ mb: 2.5 }}>
                    Category Image
                    {!!errors.categoryImage && (
                      <span style={{ color: 'red', fontSize: '14px',position:'absolute',right:'65px' }}>Invalid Image format {!!errors.categoryImage}</span>
                    )}
                  </Typography>
                  <Controller
                    name='categoryImage'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <div>
                        <FileUploaderSingle file={field.value} setFile={field.onChange} error={errors.categoryImage} />
                      </div>
                    )}
                  />
                </DropzoneWrapper>
                  {/* <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Product Image
                  </label>
                  <input
                    {...register("categoryImage")}
                    type="file"
                    className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#E2E8F0] file:px-6.5 file:py-[13px] file:text-body-sm file:font-medium file:text-dark-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-dark dark:border-dark-3 dark:bg-dark-2 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  /> */}
                </div>
                <button
                  className="h-10 w-[10%] items-start rounded-lg bg-black text-white dark:bg-white dark:text-black"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CategoryAddForm;
