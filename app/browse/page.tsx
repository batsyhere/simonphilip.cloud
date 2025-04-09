"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import NetflixBrowse from "@/components/netflix-browse"
import LoadingScreen from "@/components/loading-screen"

export default function BrowsePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if a profile has been selected
    const selectedProfile = localStorage.getItem("selectedProfile")

    if (!selectedProfile) {
      router.push("/")
      return
    }

    setProfile(selectedProfile)

    // Simulate Netflix loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  if (loading || !profile) {
    return <LoadingScreen />
  }

  return <NetflixBrowse profileType={profile} />
}
