export interface PublicUserData {
  id: string
  name: string
  phone: string
  user_role: string
  avatar_url: string
  createdAt: string
}

export interface CartItemProps {
  id: string
  title: string
  price: number
  author: string
  preview: string
  category: string
}

export interface CourseProps {
  id: string
  title: string
  price: string
  preview: string
  category: string
  description: string
  video_url: string
}
