import { useState } from 'react'
import styles from './Select.module.scss'

interface Option {
  name: string
  value: string
}

interface ISelect {
  options: Option[]
  selected: string
  changeValue: (val: string) => void
}

export const Select = ({ options, selected, changeValue }: ISelect) => {
  const [toggle, setToggle] = useState(false)


  return (
    <div className={styles.wrapper} onClick={() => setToggle((prev) => !prev)}>
      <h3 className={styles.title}>{options.find(el => el.value === selected)?.name}</h3>
      <div className={styles.container}>
        {toggle && ( 
          options.map(el => {
          if (el.value === selected) return
  
          return (
            <div 
              onClick={() => changeValue(el.value)} 
              className={styles.option}>{el.name}
            </div>
          )
        }))}
      </div>
    </div>
  )
}
