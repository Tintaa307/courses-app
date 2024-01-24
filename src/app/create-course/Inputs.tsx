import { cn } from "@/lib/utils"
import { Clapperboard, UploadCloud } from "lucide-react"
import Image from "next/image"
import React, { ChangeEvent } from "react"
import { CourseProps } from "@/types/types"
import { FieldErrors, UseFormRegister } from "react-hook-form"

type InputsProps = {
  type: string
  register: UseFormRegister<CourseProps>
  imageFileRef: React.MutableRefObject<HTMLInputElement | null>
  videoFileRef: React.MutableRefObject<HTMLInputElement | null>
  video_urlRef: React.MutableRefObject<HTMLVideoElement | null>
  handleVideoChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleFileChange: () => void
  imageUrl: string
  viewImageUrl: string
  video_url: File | null
  title: string | undefined
  setExampleData: React.Dispatch<
    React.SetStateAction<{
      title: string
      description: string
      category: string
      price: string
    }>
  >
  name: "title" | "category" | "price"
  errors: FieldErrors<CourseProps>
  placeholder: string | undefined
}

const Inputs = ({
  type,
  register,
  handleFileChange,
  handleVideoChange,
  imageFileRef,
  imageUrl,
  videoFileRef,
  video_url,
  video_urlRef,
  title,
  viewImageUrl,
  name,
  errors,
  setExampleData,
  placeholder,
}: InputsProps) => {
  return (
    <>
      {type === "text" && (
        <div className="w-full h-max flex items-start justify-start flex-col gap-1">
          <label className="text-white/90 text-base font-normal">{title}</label>
          <input
            {...register(name)}
            placeholder={placeholder}
            type={"text"}
            onChange={(e) =>
              setExampleData((prev) => ({ ...prev, [name]: e.target.value }))
            }
            className={cn(
              "w-full h-[50px] bg-input_color_dark rounded-md px-4 py-2 text-white placeholder-gray-400 outline-none focus:outline-2 transition-all focus:outline-input_color_dark duration-150"
            )}
          />
        </div>
      )}
      {name === "title" && errors.title?.message && (
        <div className="w-full h-max flex justify-start items-start">
          <p className="text-error_color">{errors.title.message}</p>
        </div>
      )}
      {name === "category" && errors.category?.message && (
        <div className="w-full h-max flex justify-start items-start">
          <p className="text-error_color">{errors.category.message}</p>
        </div>
      )}
      {name === "price" && errors.price?.message && (
        <div className="w-full h-max flex justify-start items-start">
          <p className="text-error_color">
            {errors.price.message === "Invalid input"
              ? "Complete this field and dont use ' , ' or letters here"
              : errors.price.message}
          </p>
        </div>
      )}

      {type === "textarea" && (
        <div className="w-full h-max flex items-start justify-start flex-col gap-1">
          <label className="text-white/90 text-base font-normal">
            Description (reccomended to do a good description)
          </label>
          <textarea
            {...register("description", { required: true })}
            maxLength={320}
            onChange={(e) => {
              setExampleData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }}
            placeholder="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero optio recusandae asperiores obcaecati beatae natus iusto cupiditate laboriosam, eligendi minima?"
            cols={30}
            rows={10}
            className={cn(
              "w-full h-[150px] bg-input_color_dark rounded-md px-4 py-2 text-white placeholder-gray-400 outline-none focus:outline-2 transition-all focus:outline-input_color_dark duration-150"
            )}
          />
        </div>
      )}
      {type === "textarea" && errors.description?.message && (
        <div className="w-full h-max flex justify-start items-start">
          <p className="text-error_color">
            {errors.description.message === "Invalid input"
              ? "You must write a description"
              : errors.description.message}
          </p>
        </div>
      )}
      {type === "preview" && (
        <div className="w-full h-max flex items-start justify-start flex-col gap-1">
          <label className="text-white/90 text-base font-normal">Preview</label>
          <input
            {...register("preview", { required: true })}
            accept="image/*"
            ref={imageFileRef}
            onChange={handleFileChange}
            type={"file"}
            className="hidden"
          />
          <div
            onClick={() => imageFileRef?.current?.click()}
            className="w-full h-[350px] bg-transparent border-dashed border-[2px] border-blue-400 rounded-md outline-none flex items-center justify-center flex-col gap-3 cursor-pointer hover:bg-blue-400 hover:bg-opacity-10 transition-colors duration-200"
          >
            {viewImageUrl ? (
              <Image
                src={viewImageUrl}
                alt="image-preview"
                width={350}
                height={350}
              />
            ) : (
              <>
                <UploadCloud size={50} className="text-blue-400" />
                <p className="text-white/90 text-base font-medium">
                  Click here to upload a preview
                </p>
              </>
            )}
          </div>
        </div>
      )}
      {type === "preview" && errors.preview?.message && (
        <div className="w-full h-max flex justify-start items-start">
          <p className="text-error_color">
            {errors.preview.message === "Invalid input"
              ? "You must upload a preview"
              : errors.preview.message}
          </p>
        </div>
      )}
      {type === "video" && (
        <div className="w-full h-max flex items-start justify-start flex-col gap-1">
          <label className="text-white/90 text-base font-normal">
            Upload the course
          </label>
          <input
            {...register("video_url", { required: true })}
            ref={videoFileRef}
            onChange={handleVideoChange}
            type={"file"}
            className="hidden"
            accept="video/*"
          />
          <div
            onClick={() => videoFileRef?.current?.click()}
            className={cn(
              "w-full h-[350px] bg-transparent rounded-md border-[2px] border-violet outline-none flex items-center justify-center flex-col gap-3 cursor-pointer hover:bg-violet hover:bg-opacity-10 transition-colors duration-200"
            )}
          >
            <video
              controls
              ref={video_urlRef}
              className={cn("w-full h-full hidden", {
                block: video_url,
              })}
            />
            {!video_url ? (
              <>
                <Clapperboard size={50} className="text-violet" />
                <p className="text-white/90 text-base font-medium">
                  Click here to upload the course
                </p>
              </>
            ) : null}
          </div>
        </div>
      )}
      {type === "video" && errors.video_url?.message && (
        <div className="w-full h-max flex justify-start items-start">
          <p className="text-error_color">
            {errors.video_url.message === "Invalid input"
              ? "You must upload a course"
              : errors.video_url.message}
          </p>
        </div>
      )}
    </>
  )
}

export default Inputs
