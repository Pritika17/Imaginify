import Header from '@/components/shared/Header'
import React from 'react'
import { transformationTypes } from '@/constants'
import TransformationForm from '@/components/shared/TransformationForm'
import { getUserById } from '@/lib/actions/user.action'
import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'

const AddTransformationsTypePage = async ({ params: { type } }: SearchParamProps) => {
  const user = await currentUser()

  if (!user) redirect('/sign-in')

  const dbUser = await getUserById(user.id)
  const transformation = transformationTypes[type]

  return (
    <>
      <Header
        title={transformation.title}
        subtitle={transformation.subTitle}
      />

      <section className='mt-10'>
        <TransformationForm
          action='Add'
          userId={dbUser._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={dbUser.creditBalance}
        />
      </section>
    </>
  )
}

export default AddTransformationsTypePage