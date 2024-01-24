import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { CourseSchema } from "@/lib/validators/schemas"
import { CourseProps } from "@/types/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { Toaster, toast } from "sonner"
import Button from "../button/Button"
import Inputs from "@/app/create-course/Inputs"
import { v4 as uuid } from "uuid"
import { SessionContext } from "@/context/SessionContext"

type InputsTypeProps = {
  title?: string
  type: string
  name?: string
  placeholder?: string
}

type ShowExampleDataProps = {
  title: string
  description: string
  category: string
  price: string
}

type CourseExampleDataProps = {
  setExampleData: React.Dispatch<React.SetStateAction<ShowExampleDataProps>>
}

const CourseForm = ({ setExampleData }: CourseExampleDataProps) => {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const imageFileRef = useRef<HTMLInputElement>(null)
  const videoFileRef = useRef<HTMLInputElement>(null)
  const video_urlRef = useRef<HTMLVideoElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string>("")
  const [video_url, setVideo_url] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { publicUser } = useContext(SessionContext)

  const inputsType = [
    {
      title: "Course title",
      type: "text",
      name: "title",
      placeholder: "Learn how to code with React",
    },
    {
      title: "Description (reccomended to do a good description)",
      type: "textarea",
    },
    {
      title: "Category",
      type: "text",
      name: "category",
      placeholder: "Web development",
    },
    {
      title: "Price",
      type: "text",
      name: "price",
      placeholder: "19.99",
    },
    {
      type: "preview",
    },
    {
      type: "video",
    },
  ] as InputsTypeProps[]

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CourseProps>({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      price: "",
      preview: "",
      video_url: "",
    },
    resolver: zodResolver(CourseSchema),
  })

  const onSubmit: SubmitHandler<CourseProps> = async (data) => {
    setIsLoading(true)
    const courseId = uuid()
    try {
      const { error } = await supabase.from("courses").insert([
        {
          id: courseId,
          title: data.title,
          description: data.description,
          category: data.category,
          price: data.price,
          preview: "",
          user_id: publicUser?.id,
        },
      ])

      if (error) {
        console.log(error)
        toast.error("Error creating course")
      } else {
        const { data: storageData, error: storageErrors } =
          await supabase.storage
            .from("courses-previews")
            .upload(`${courseId}/${data.title}`, file as File)

        if (storageErrors) {
          console.log(storageErrors)
          toast.error("Error creating course")
        } else {
          if (storageData) {
            const { data, error } = await supabase
              .from("courses")
              .update({
                preview: `https://rlxbrphnzphwkmiojwmt.supabase.co/storage/v1/object/public/courses-previews/${storageData.path}`,
              })
              .eq("id", courseId)

            if (error) {
              console.log(error)
              toast.error("Error creating course")
            } else {
              console.log(data)
              toast.success("Course created successfully")
              setTimeout(() => {
                router.push("/")
              }, 2000)
            }
          }
        }
      }
    } catch (error) {
      console.log(error)
      toast.error("Error creating course")
    }
  }

  const handleFileChange = () => {
    if (imageFileRef.current && imageFileRef.current.files) {
      setFile(imageFileRef.current.files[0])
      const objectUrl = URL.createObjectURL(imageFileRef.current.files[0])
      setImageUrl(objectUrl)
    }
  }

  const handleVideoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target

    if (fileInput.files && fileInput.files[0]) {
      const newVideoFile = fileInput.files[0]

      if (newVideoFile.type.startsWith("video/")) {
        setVideo_url(newVideoFile)
      } else {
        toast.warning("The file must be a video")
      }
    }
  }

  useEffect(() => {
    console.log(video_url, video_urlRef.current)
    if (video_url && video_urlRef.current) {
      const videoUrl = URL.createObjectURL(video_url)
      video_urlRef.current.src = videoUrl
    }
  }, [video_url])

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full flex items-start justify-start flex-col gap-4"
    >
      <Toaster richColors position="top-center" duration={3000} />
      {inputsType.map((input, index) => (
        <Inputs
          key={index}
          type={input.type}
          name={input.name as "title" | "category" | "price"}
          placeholder={input.placeholder}
          title={input.title}
          register={register}
          errors={errors}
          viewImageUrl={imageUrl}
          setExampleData={setExampleData}
          imageFileRef={imageFileRef}
          videoFileRef={videoFileRef}
          video_urlRef={video_urlRef}
          imageUrl={imageUrl}
          video_url={video_url}
          handleVideoChange={handleVideoChange}
          handleFileChange={handleFileChange}
        />
      ))}
      <Button
        text="Create course"
        className="w-full mb-4 flex items-center justify-center flex-row gap-2"
        isLoading={isLoading}
      />
    </form>
  )
}

export default CourseForm
