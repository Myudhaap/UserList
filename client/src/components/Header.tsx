import {useEffect, useState, useRef} from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
  const [isSticky, setIsSticky] = useState<boolean>(false)
  const header = useRef<HTMLElement>(null)
  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
  
  const onScroll = () => {
    const scrollTop: number = window.scrollY
    const headerOffset = header.current?.offsetHeight || 0
    const sticky = scrollTop - headerOffset > 0 ? true : false
    setIsSticky(sticky)
  }

  return (
    <header ref={header} className={`header ${isSticky ? "isSticky" : ''} px-4 py-6 bg-slate-700`}>
      <div className="heder__logo text-2xl font-bold tracking-wide">
        <Link to={'/'}>
          <h1>Practice GraphQl</h1>
        </Link>
      </div>
    </header>
  )
}

export default Header