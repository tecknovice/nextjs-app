"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { signup } from "@/services/auth"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"

const schema = z
  .object({
    email: z
      .string()
      .email("Invalid email format")
      .nonempty("Email is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .nonempty("Password is required"),
    passwordConfirm: z
      .string()
      .min(6, "Password Confirm must be at least 6 characters")
      .nonempty("Password Confirm is required"),
  })
  .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["passwordConfirm"],
      })
    }
  })

type FormData = z.infer<typeof schema>

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter()
  const [error, setError] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    // Handle API call or further actions
    const result = await signup(data)
    if (result.data) {
      //redirect to dashboard
      router.push("/signin")
    }
    if (result.error) {
      setError(result.error)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome</CardTitle>
          <CardDescription>Sign up to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="m@example.com"
                />
                {errors.email && <p>{errors.email.message}</p>}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && <p>{errors.password.message}</p>}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="passwordConfirm">Password Confirm</Label>
                </div>
                <Input
                  id="passwordConfirm"
                  type="password"
                  {...register("passwordConfirm")}
                />
                {errors.passwordConfirm && (
                  <p>{errors.passwordConfirm.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Sign up
              </Button>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/signin" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
