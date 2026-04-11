'use client'

import { useState, useRef, useEffect } from 'react'

export default function FormSelect({ label, id, name, value, onChange, options, required, placeholder = 'Select...', multi = false, exclusiveValue }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleKeyDown(e) {
    if (e.key === 'Escape') setOpen(false)
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpen(prev => !prev)
    }
  }

  // --- Multi-select logic ---
  if (multi) {
    const selected = Array.isArray(value) ? value : []

    function isSelected(opt) {
      return selected.includes(opt.label)
    }

    function handleMultiSelect(opt) {
      let next
      if (exclusiveValue && opt.label === exclusiveValue) {
        // Clicking the exclusive option toggles it and clears the rest
        next = isSelected(opt) ? [] : [opt.label]
      } else {
        // Clicking a normal option removes the exclusive one if present
        const withoutExclusive = selected.filter(s => s !== exclusiveValue)
        if (isSelected(opt)) {
          next = withoutExclusive.filter(s => s !== opt.label)
        } else {
          next = [...withoutExclusive, opt.label]
        }
      }
      onChange({ target: { name, value: next } })
    }

    const displayContent = selected.length === 0 ? null
      : selected.length === 1 ? <span className="custom-select-trigger-text">{selected[0]}</span>
      : <><span className="custom-select-trigger-text">{selected[0]}</span><span className="custom-select-count">+{selected.length - 1}</span></>

    return (
      <div className="form-field">
        <label className="form-label" htmlFor={id}>{label}</label>
        <div className={`custom-select${open ? ' open' : ''}`} ref={ref}>
          <button
            type="button"
            className={`custom-select-trigger${selected.length ? '' : ' placeholder'}`}
            id={id}
            onClick={() => setOpen(prev => !prev)}
            onKeyDown={handleKeyDown}
            aria-haspopup="listbox"
            aria-expanded={open}
          >
            {displayContent || <span className="custom-select-trigger-text">{placeholder}</span>}
            <svg className="custom-select-chevron" width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {open && (
            <ul className="custom-select-menu" role="listbox" aria-multiselectable="true">
              {options.map(opt => (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected(opt)}
                  className={`custom-select-option${isSelected(opt) ? ' selected' : ''}`}
                  onClick={() => handleMultiSelect(opt)}
                >
                  <span className="custom-select-check">{isSelected(opt) ? '✓' : ''}</span>
                  {opt.label}
                </li>
              ))}
            </ul>
          )}
          {required && <input type="text" tabIndex={-1} value={selected.join(', ')} required style={{ position: 'absolute', opacity: 0, height: 0, width: 0, pointerEvents: 'none' }} onChange={() => {}} />}
        </div>
      </div>
    )
  }

  // --- Single-select logic (unchanged) ---
  const selectedLabel = options.find(o => o.value === value || o.label === value)?.label || ''

  function handleSelect(opt) {
    onChange({ target: { name, value: opt.label } })
    setOpen(false)
  }

  const selectEl = (
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
              aria-selected={opt.label === value || opt.value === value}
              className={`custom-select-option${(opt.label === value || opt.value === value) ? ' selected' : ''}`}
              onClick={() => handleSelect(opt)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
      {required && <input type="text" tabIndex={-1} value={value || ''} required style={{ position: 'absolute', opacity: 0, height: 0, width: 0, pointerEvents: 'none' }} onChange={() => {}} />}
    </div>
  )

  if (!label) return selectEl

  return (
    <div className="form-field">
      <label className="form-label" htmlFor={id}>{label}</label>
      {selectEl}
    </div>
  )
}
