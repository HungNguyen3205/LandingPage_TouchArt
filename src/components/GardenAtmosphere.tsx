import {useEffect,useId,useState} from 'react';
import {Pause,Play} from 'lucide-react';
import type {Locale} from '../data/content';
function LeafShape({id}:{id:string}){return <svg viewBox="0 0 100 170" fill="none"><defs><linearGradient id={id} x1="13" y1="10" x2="82" y2="150" gradientUnits="userSpaceOnUse"><stop stopColor="#abc38a"/><stop offset=".43" stopColor="#658853"/><stop offset="1" stopColor="#294d35"/></linearGradient></defs><path d="M49 154C-8 132 5 48 71 8C94 62 109 125 49 154Z" fill={`url(#${id})`}/><path d="M48 169C43 117 59 60 71 8M48 140L23 107M49 118L18 76M53 95L30 51M58 73L45 32M48 137L78 112M50 113L88 83M54 91L88 60M60 65L82 39" stroke="#d6dfad" strokeOpacity=".45" strokeWidth="1.1"/><path d="M49 154C-8 132 5 48 71 8" stroke="#d0dcb2" strokeOpacity=".25"/></svg>}
export function GardenBranch({className=''}:{className?:string}){
  const id = useId().replace(/:/g, '');
  return (
    <svg className={`garden-branch ${className}`} viewBox="0 0 450 720" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-stem`} x1="40" y1="720" x2="380" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#224c36" stopOpacity="0.4"/>
          <stop offset="0.5" stopColor="#5f8356" stopOpacity="0.55"/>
          <stop offset="1" stopColor="#c5ab78" stopOpacity="0.7"/>
        </linearGradient>
        <linearGradient id={`${id}-leaf`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8ea87d" stopOpacity="0.5"/>
          <stop offset="60%" stopColor="#4a6f47" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#1e4430" stopOpacity="0.2"/>
        </linearGradient>
        <linearGradient id={`${id}-gold-leaf`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d4be88" stopOpacity="0.55"/>
          <stop offset="100%" stopColor="#8d7442" stopOpacity="0.25"/>
        </linearGradient>
      </defs>

      {/* Main graceful undulating botanical stem */}
      <path 
        d="M 60 720 C 130 570, 95 380, 240 210 C 290 150, 340 100, 395 35" 
        stroke={`url(#${id}-stem)`} 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      
      {/* Delicate secondary branch curving off */}
      <path 
        d="M 125 460 C 185 410, 260 415, 320 440" 
        stroke={`url(#${id}-stem)`} 
        strokeWidth="1.2" 
        strokeLinecap="round" 
        strokeDasharray="2 1"
      />

      {/* Elegant, widely spaced individual leaves (no interlocking or braided pattern) */}
      {/* Leaf 1 - lower stem, gentle left curve */}
      <path d="M 75 640 C 20 625, 5 570, 35 550 C 65 570, 75 615, 75 640 Z" fill={`url(#${id}-leaf)`}/>
      
      {/* Leaf 2 - lower right */}
      <path d="M 98 560 C 155 545, 175 495, 145 470 C 118 495, 102 535, 98 560 Z" fill={`url(#${id}-leaf)`}/>
      
      {/* Leaf 3 - mid left, elongated */}
      <path d="M 115 480 C 45 460, 20 405, 50 375 C 85 405, 108 450, 115 480 Z" fill={`url(#${id}-gold-leaf)`}/>

      {/* Secondary branch leaves */}
      <path d="M 210 425 C 220 375, 265 355, 280 375 C 265 410, 230 425, 210 425 Z" fill={`url(#${id}-leaf)`}/>
      <path d="M 320 440 C 355 420, 390 435, 395 455 C 365 465, 335 455, 320 440 Z" fill={`url(#${id}-leaf)`}/>

      {/* Leaf 4 - middle stem right */}
      <path d="M 175 330 C 240 315, 265 260, 235 235 C 200 260, 180 305, 175 330 Z" fill={`url(#${id}-leaf)`}/>

      {/* Leaf 5 - upper mid left, champagne touched */}
      <path d="M 225 240 C 170 215, 160 160, 190 140 C 220 165, 225 210, 225 240 Z" fill={`url(#${id}-gold-leaf)`}/>

      {/* Leaf 6 - upper right */}
      <path d="M 290 155 C 350 135, 370 85, 345 65 C 315 90, 298 130, 290 155 Z" fill={`url(#${id}-leaf)`}/>

      {/* Leaf 7 - delicate tip leaf */}
      <path d="M 370 70 C 390 30, 420 20, 425 35 C 415 60, 385 70, 370 70 Z" fill={`url(#${id}-gold-leaf)`}/>

      {/* Floating drifting leaves / petals (bay bổng, phiêu lãng) */}
      <g transform="translate(340 260) rotate(25)">
        <path d="M 0 0 C -25 -15, -30 -40, -10 -45 C 5 -30, 8 -10, 0 0 Z" fill={`url(#${id}-gold-leaf)`} opacity="0.6"/>
      </g>
      <g transform="translate(80 280) rotate(-35)">
        <path d="M 0 0 C 25 -12, 35 -35, 18 -42 C 2 -32, 2 -12, 0 0 Z" fill={`url(#${id}-leaf)`} opacity="0.45"/>
      </g>
      <g transform="translate(180 100) rotate(15)">
        <path d="M 0 0 C -20 -10, -25 -30, -8 -35 C 4 -25, 6 -8, 0 0 Z" fill={`url(#${id}-gold-leaf)`} opacity="0.5"/>
      </g>
    </svg>
  );
}
export default function GardenAtmosphere({locale}:{locale:Locale}){const [paused,setPaused]=useState(()=>typeof matchMedia!=='undefined'&&matchMedia('(prefers-reduced-motion: reduce)').matches);const id=useId().replace(/:/g,'');const vi=locale==='vi';useEffect(()=>{const media=matchMedia('(prefers-reduced-motion: reduce)');const handler=()=>setPaused(media.matches);media.addEventListener('change',handler);return()=>media.removeEventListener('change',handler)},[]);useEffect(()=>{document.documentElement.dataset.gardenPaused=String(paused);const visibility=()=>{document.documentElement.dataset.gardenPaused=String(paused||document.hidden)};document.addEventListener('visibilitychange',visibility);return()=>{document.removeEventListener('visibilitychange',visibility);delete document.documentElement.dataset.gardenPaused}},[paused]);return <><div className="garden-atmosphere" aria-hidden="true"><div className="falling-leaf leaf-main"><div className="leaf-tumble"><LeafShape id={'leaf-'+id}/></div></div><div className="falling-leaf leaf-far"><div className="leaf-tumble"><LeafShape id={'far-'+id}/></div></div></div><button className="garden-motion-control" onClick={()=>setPaused(!paused)} aria-pressed={paused} aria-label={paused?(vi?'Tiếp tục chuyển động':'Resume gentle motion'):(vi?'Dừng chuyển động':'Pause gentle motion')} title={paused?(vi?'Tiếp tục chuyển động':'Resume gentle motion'):(vi?'Dừng chuyển động':'Pause gentle motion')}>{paused?<Play size={14}/>:<Pause size={14}/>}<span>{vi?'Một nhịp chậm':'A slower rhythm'}</span></button></>}
