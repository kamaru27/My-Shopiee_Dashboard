"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";
import { brandApi } from "@/api/brandApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { serialize } from "object-to-formdata";
import DropzoneWrapper from "@/components/file-upload/dropZone";
import { Typography } from "@mui/material";
import FileUploaderSingle from "@/components/file-upload/singleFileUpload";
import { PackageNavigation } from "@/types/packageNavigation";

const mySchema = z.object({
  brandName: string().trim().min(1, { message: "Brand Name is required." }),
  brandDescription: string().trim(),
  brandLogo: z.union([z.any().refine((file) => file?.size <= MAX_FILE_SIZE, 'Max image size is 5MB.')
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."),z.string()])
});
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png","image/webp"];

type Props = {
  getBrand: any;
  brandId: string;
};

type TMySchema = z.infer<typeof mySchema>;

const packageData: PackageNavigation[] = [
  {
    name:'Dashboard / ',
    link:'/'
  },
  {
    name:'Brands /  ',
    link:'/admin/brands'
  },
  {
    name:'Update ',
    link:''
  },
];

const BrandForm = ({brandId,getBrand}:Props) => {
 
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TMySchema>({ resolver: zodResolver(mySchema) ,
    defaultValues:{
      brandName:getBrand.brandName,
      brandDescription:getBrand.brandDescription,
      brandLogo:getBrand.brandLogo
    }
  });

  const submitData = async (data: any) => {
try {
  const formData = serialize(data)
  const response = await brandApi.updateBrand(brandId, formData);
  // console.log(response)
  if(response.data.success){
    toast.success(response.data.message)
    router.push("/admin/brands");
  }
} catch (error:any) {
  toast.error(error.message)
}
  };

  return (
    <>
      <Breadcrumb pageName="EDIT FORM" navigation={packageData}/>

      <div className="gap-9 sm:grid-cols-2">
        <form onSubmit={handleSubmit(submitData)}>
          <div className="flex flex-col gap-9">
            {/* <!-- Input Fields --> */}
            <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
              <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
                <h3 className="font-medium text-dark dark:text-white">
                  Update Brand
                </h3>
              </div>
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Brand Name
                  </label>
                  <input
                    {...register("brandName")}
                    type="text"
                    placeholder="Brand Name"
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                  />
                  {errors.brandName && (
                    <p className="text-sm text-red-600">
                      {errors.brandName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Brand Description
                  </label>
                  <textarea
                    {...register("brandDescription")}
                    rows={6}
                    placeholder="Product Description"
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                  ></textarea>
                  {errors.brandDescription && (
                    <p className="text-sm text-red-600">
                      {errors.brandDescription.message}
                    </p>
                  )}
                </div>

                {/* <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Disabled label
                </label>
                <input
                  type="text"
                  placeholder="Disabled label"
                  disabled
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary dark:disabled:bg-dark"
                />
              </div> */}

                <div>
                <DropzoneWrapper>
                  <Typography variant='text-body-sm' fontWeight={500} color="textPrimary" sx={{ mb: 2.5 }}>
                    Brand Logo
                    {!!errors.brandLogo && (
                      <span style={{ color: 'red', fontSize: '14px' ,position:'absolute',right:'65px'}}>Invalid Image format {!!errors.brandLogo}</span>
                    )}
                  </Typography>
                  <Controller
                    name='brandLogo'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <div>
                        <FileUploaderSingle file={field.value} setFile={field.onChange} error={errors.brandLogo} />
                      </div>
                    )}
                  />
                </DropzoneWrapper>
                  {/* <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Brand Logo
                  </label>
                  <input
                    {...register("brandLogo")}
                    type="file"
                    className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#E2E8F0] file:px-6.5 file:py-[13px] file:text-body-sm file:font-medium file:text-dark-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-dark dark:border-dark-3 dark:bg-dark-2 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  /> */}
                </div>
                {/* <Link href={"/"}> */}
                <button
                  className="h-10 w-[10%] items-start rounded-lg bg-black text-white dark:bg-white dark:text-black"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
                {/* </Link> */}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default BrandForm;
