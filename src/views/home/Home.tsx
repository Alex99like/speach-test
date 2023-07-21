import { FormEvent } from 'react'
import styles from './Home.module.scss'

export const Home = () => {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <section className={styles.wrapper}>
      <form onSubmit={onSubmit} className={styles.form}>
        <textarea></textarea>
        <button className={styles.speech}>SPEECH</button>
      </form>
     
    </section>
  )
}
