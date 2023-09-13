import s from './Sort.module.scss';

const Sort = ({handleSortTask}) => {

  const toggleSortBtn = () => {
    handleSortTask()
  }

  return (
    <button
      className={s.sort}
      onClick={() => toggleSortBtn()}
    />
  )
}

export default Sort
