'use client';
 
import SensorPage from '@/app/pages/SensorPage';
import { useRouter } from 'next/navigation';
 
export default function Page({params} : {params: {location: string}}) {
  const location = params.location;

  return (<SensorPage location={location} />)
}