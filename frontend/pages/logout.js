import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { doLogout } from '../store/features/auth/AuthSlice'

function logut() {
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    dispatch(doLogout())
    router.push('/')
  }, [])

  return <div>logut</div>
}

export default logut
