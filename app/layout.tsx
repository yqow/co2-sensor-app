import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './components/Header'
import Footer from './components/Footer'
import { createContext, useState } from 'react'
import AcceptableRangeProvider from "./context/acceptableRangeContext"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CCS Sensor Data',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AcceptableRangeProvider>
          {children}
        </AcceptableRangeProvider>
      </body>
    </html>
  )
}
