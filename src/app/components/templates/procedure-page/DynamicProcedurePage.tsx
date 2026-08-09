'use client'

import { useEffect, useState } from 'react'
import ProcedurePage from './ProcedurePage'
import type { ProcedureData, BeforeAfterCase, Video } from './types'

interface MediaResponse {
  infoImage: string | null
  videos: Video[] | null
  featuredCases: BeforeAfterCase[]
}

interface Props {
  data: ProcedureData
}

/**
 * Client wrapper that fetches DB-managed media and merges it
 * with the static ProcedureData. DB values override static ones.
 */
export default function DynamicProcedurePage({ data }: Props) {
  const [merged, setMerged] = useState(data)

  useEffect(() => {
    fetch(`/api/procedures/${data.slug}/media`)
      .then(r => r.json())
      .then((media: MediaResponse) => {
        const updated = { ...data }

        if (media.infoImage) {
          updated.info = { ...updated.info, image: media.infoImage }
        }

        if (media.videos && Array.isArray(media.videos) && media.videos.length > 0) {
          updated.videos = media.videos
        }

        if (media.featuredCases && media.featuredCases.length > 0) {
          updated.beforeAfter = media.featuredCases
        }

        setMerged(updated)
      })
      .catch(() => { /* use static data on error */ })
  }, [data])

  return <ProcedurePage data={merged} />
}
