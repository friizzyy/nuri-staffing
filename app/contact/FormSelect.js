'use client'

import { useState, useRef, useEffect } from 'react'

export default function FormSelect({ label, id, name, value, onChange, options, required, placeholder = 'Select...' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const selectedLabel = options.find(o => o.value === value)?.label || ''

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleSelect(val) {
    onChange({ target: { name, value: val } })
    setOpen(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') setOpen(false)
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpen(prev => !prev)
    }
  }

  return (
    <div className="form-field">
      <label className="form-label" htmlFor={id}>{label}</label>
      <div className={`custom-select${open ? ' open' : ''}`} ref={ref}>
        <button
          type="button"
          className={`custom-select-trigger${value ? '' : ' placeholder'}`}
          id={id}
          onClick={() => setOpen(prev => !prev)}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          {selectedLabel || placeholder}
          <svg className="custom-select-chevron" width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {open && (
          <ul className="custom-select-menu" role="listbox">
            {options.map(opt => (
              <li
                key={opt.value}
                role="option"
                aria-selected={opt.value === value}
                className={`custom-select-option${opt.value === value ? ' selected' : ''}`}
                onClick={() => handleSelect(opt.value)}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
        {/* Hidden native input for form validation */}
        {required && <input type="text" tabIndex={-1} value={value} required style={{ position: 'absolute', opacity: 0, height: 0, width: 0, pointerEvents: 'none' }} onChange={() => {}} />}
      </div>
    </div>
  )
}
