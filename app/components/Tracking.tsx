'use client';
import {useEffect} from 'react';
export default function Tracking(){useEffect(()=>{const id=process.env.NEXT_PUBLIC_GA_ID;if(!id)return;const s=document.createElement('script');s.async=true;s.src=`https://www.googletagmanager.com/gtag/js?id=${id}`;document.head.appendChild(s);const inline=document.createElement('script');inline.innerHTML=`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${id}');`;document.head.appendChild(inline)},[]);return null}
